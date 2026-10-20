const finiteVector = (value, length) => Array.isArray(value) && value.length === length && value.every(Number.isFinite);
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const subtract = (a,b) => a.map((value,index)=>value-b[index]);
const normalize = value => {
  const length=Math.hypot(...value);
  if(!Number.isFinite(length)||length<1e-12)throw new RangeError('Invalid sky direction');
  return value.map(component=>component/length);
};
/** Affine image plane through the three unit star directions, normalized onto
 * the celestial sphere. The image Y convention is supplied by the anchors. */
export function createRegistration(anchors) {
  if(!Array.isArray(anchors)||anchors.length!==3)throw new TypeError('Three stellar anchors required');
  for(const anchor of anchors)if(!finiteVector(anchor?.pixel,2)||!finiteVector(anchor?.direction,3))throw new TypeError('Malformed stellar anchor');
  const [a,b,c]=anchors, directions=anchors.map(anchor=>normalize(anchor.direction));
  const ab=subtract(b.pixel,a.pixel), ac=subtract(c.pixel,a.pixel), determinant=ab[0]*ac[1]-ab[1]*ac[0];
  const scale=Math.hypot(...ab)*Math.hypot(...ac);
  if(scale===0||Math.abs(determinant)<scale*1e-10)throw new RangeError('Collinear image anchors');
  const db=subtract(directions[1],directions[0]),dc=subtract(directions[2],directions[0]);
  const normal=cross(db,dc);
  if(Math.hypot(...normal)<1e-10||Math.abs(normal.reduce((sum,value,index)=>sum+value*directions[0][index],0))<1e-12)throw new RangeError('Degenerate stellar anchors');
  return (x,y) => {
    if(!Number.isFinite(x)||!Number.isFinite(y))throw new TypeError('Invalid image sample');
    const dx=x-a.pixel[0],dy=y-a.pixel[1],u=(dx*ac[1]-dy*ac[0])/determinant,v=(ab[0]*dy-ab[1]*dx)/determinant;
    return normalize(directions[0].map((value,index)=>value+u*db[index]+v*dc[index]));
  };
}
export function createArtworkPatch(artwork, subdivisions=16) {
  if(!Number.isFinite(artwork?.width)||artwork.width<=0||!Number.isFinite(artwork?.height)||artwork.height<=0)throw new RangeError('Invalid artwork dimensions');
  if(!Number.isInteger(subdivisions)||subdivisions<1||subdivisions>254)throw new RangeError('Invalid artwork subdivision');
  const sample=createRegistration(artwork.anchors),stride=subdivisions+1;
  const positions=new Float32Array(stride*stride*3),uvs=new Float32Array(stride*stride*2),indices=new Uint16Array(subdivisions*subdivisions*6);
  for(let y=0;y<=subdivisions;y++)for(let x=0;x<=subdivisions;x++){
    const index=y*stride+x,u=x/subdivisions,v=y/subdivisions;
    positions.set(sample(u*artwork.width,v*artwork.height),index*3);uvs.set([u,1-v],index*2);
  }
  let offset=0;
  for(let y=0;y<subdivisions;y++)for(let x=0;x<subdivisions;x++){
    const a=y*stride+x,b=a+1,c=a+stride,d=c+1;
    indices.set([a,c,b,b,c,d],offset);offset+=6;
  }
  return {positions,uvs,indices};
}
