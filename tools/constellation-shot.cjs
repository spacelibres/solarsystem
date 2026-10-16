// Turn on the constellations layer and screenshot the sky.
const fs=require('fs'),http=require('http'),{spawn}=require('child_process'),WS=require('ws');
const PORT=Number(process.env.CDP_PORT||9405);
const out=process.argv[2]||'/tmp/constellations.png';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const getJSON=(p,m='GET')=>new Promise((res,rej)=>{const rq=http.request({host:'127.0.0.1',port:PORT,path:p,method:m},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error('bad json: '+d.slice(0,60)))}})});rq.on('error',rej);rq.end()});
(async()=>{
 const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--use-gl=swiftshader','--enable-unsafe-swiftshader',`--remote-debugging-port=${PORT}`,'--user-data-dir=/tmp/constellation-profile','--window-size=1600,1000','about:blank'],{stdio:'ignore'});
 for(let i=0;i<60;i++){try{await getJSON('/json/version');break}catch{await sleep(250)}}
 const tab=await getJSON('/json/new?about:blank','PUT');
 const ws=new WS(tab.webSocketDebuggerUrl,{perMessageDeflate:false});
 let id=0;const pending=new Map();
 const send=(m,p={})=>new Promise(res=>{const i=++id;pending.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
 await new Promise(r=>ws.on('open',r));
 ws.on('message',raw=>{const msg=JSON.parse(raw);
  if(msg.method==='Runtime.exceptionThrown'){const d=msg.params.exceptionDetails;console.log('EXC:',(d.exception?.description||d.text||'').split('\n')[0].slice(0,160));}
  if(msg.id&&pending.has(msg.id)){pending.get(msg.id)(msg);pending.delete(msg.id)}});
 await send('Runtime.enable');await send('Page.enable');
 await send('Page.navigate',{url:'http://localhost:4310'});
 await sleep(20000);
 // Pull the camera out so the whole sky is in view, then enable constellations.
 const r=await send('Runtime.evaluate',{expression:`(()=>{
   window.__solarDebug.setZoom('outer');
   const sc = window.__solarDebug.scene();
   let names = [];
   sc.traverse(o => { if (o.name === 'constellations') names.push(o.type + ' verts=' + o.geometry.attributes.position.count); });
   window.__solarDebug.setLayers({ constellations: true, stars: true });
   return JSON.stringify({ found: names });
 })()`,returnByValue:true});
 console.log('constellations ->', r.result?.result?.value);
 await sleep(3000);
 const shot=await send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
 console.log('screenshot ->',out);
 chrome.kill();process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
