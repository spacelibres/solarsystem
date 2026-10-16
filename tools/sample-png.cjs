// Sample the centre pixels of a screenshot to see whether anything was drawn.
const fs = require('fs');
const zlib = require('zlib');

const file = process.argv[2] || '/tmp/galaxy.png';
const buf = fs.readFileSync(file);

// Minimal PNG decoder for 8-bit RGB/RGBA, non-interlaced.
let pos = 8;
let width = 0, height = 0, colorType = 0;
const idat = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  if (type === 'IHDR') {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    colorType = data[9];
  } else if (type === 'IDAT') {
    idat.push(data);
  } else if (type === 'IEND') break;
  pos += 12 + len;
}

const channels = colorType === 6 ? 4 : 3;
const raw = zlib.inflateSync(Buffer.concat(idat));
const stride = width * channels;
const pixels = Buffer.alloc(height * stride);

// Undo per-scanline filters.
for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)];
  const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
  for (let x = 0; x < stride; x++) {
    const a = x >= channels ? pixels[y * stride + x - channels] : 0;
    const b = y > 0 ? pixels[(y - 1) * stride + x] : 0;
    const c = x >= channels && y > 0 ? pixels[(y - 1) * stride + x - channels] : 0;
    let v = line[x];
    if (filter === 1) v += a;
    else if (filter === 2) v += b;
    else if (filter === 3) v += (a + b) >> 1;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
    }
    pixels[y * stride + x] = v & 0xff;
  }
}

function sample(x, y) {
  const o = y * stride + x * channels;
  return [pixels[o], pixels[o + 1], pixels[o + 2]];
}

console.log(`${file}: ${width}x${height}, colourType ${colorType}`);
const pts = [
  ['centre', Math.floor(width / 2), Math.floor(height / 2)],
  ['centre-left', Math.floor(width * 0.4), Math.floor(height / 2)],
  ['centre-right', Math.floor(width * 0.6), Math.floor(height / 2)],
  ['upper-mid', Math.floor(width / 2), Math.floor(height * 0.3)],
  ['lower-mid', Math.floor(width / 2), Math.floor(height * 0.7)],
];
for (const [name, x, y] of pts) {
  console.log(`  ${name.padEnd(13)} (${x},${y}) rgb(${sample(x, y).join(',')})`);
}

// Count non-black pixels in the central region (excluding the UI panels).
let lit = 0, total = 0, maxV = 0;
for (let y = Math.floor(height * 0.1); y < Math.floor(height * 0.8); y += 3) {
  for (let x = Math.floor(width * 0.32); x < Math.floor(width * 0.95); x += 3) {
    const [r, g, b] = sample(x, y);
    const v = Math.max(r, g, b);
    if (v > maxV) maxV = v;
    if (v > 12) lit++;
    total++;
  }
}
console.log(`  lit pixels: ${lit}/${total} (${((lit / total) * 100).toFixed(1)}%), max channel ${maxV}`);
