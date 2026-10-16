// Focus a comet, then pull back far enough that the tail is outside NASA's
// 40,000 km near-field cull, and screenshot.
const fs=require('fs'),http=require('http'),{spawn}=require('child_process'),WS=require('ws');
const PORT=Number(process.env.CDP_PORT||9408);
const id=process.argv[2]||'67p_churyumov_gerasimenko';
const out=process.argv[3]||'/tmp/comet.png';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const getJSON=(p,m='GET')=>new Promise((res,rej)=>{const rq=http.request({host:'127.0.0.1',port:PORT,path:p,method:m},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error('bad json'))}})});rq.on('error',rej);rq.end()});
(async()=>{
 const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--use-gl=swiftshader','--enable-unsafe-swiftshader',`--remote-debugging-port=${PORT}`,'--user-data-dir=/tmp/comet-shot-profile','--window-size=1600,1000','about:blank'],{stdio:'ignore'});
 for(let i=0;i<60;i++){try{await getJSON('/json/version');break}catch{await sleep(250)}}
 const tab=await getJSON('/json/new?about:blank','PUT');
 const ws=new WS(tab.webSocketDebuggerUrl,{perMessageDeflate:false});
 let id2=0;const pending=new Map();
 const send=(m,p={})=>new Promise(res=>{const i=++id2;pending.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
 await new Promise(r=>ws.on('open',r));
 ws.on('message',raw=>{const msg=JSON.parse(raw);
  if(msg.method==='Runtime.exceptionThrown'){const d=msg.params.exceptionDetails;console.log('EXC:',(d.exception?.description||d.text||'').split('\n')[0].slice(0,150));}
  if(msg.id&&pending.has(msg.id)){pending.get(msg.id)(msg);pending.delete(msg.id)}});
 await send('Runtime.enable');await send('Page.enable');
 await send('Page.navigate',{url:'http://localhost:4310'});
 await sleep(36000);
 const r=await send('Runtime.evaluate',{expression:`(()=>{
   const d = window.__solarDebug;
   d.focus(${JSON.stringify(id)});
   // Then push the camera well beyond the 400,000 km fade distance.
   return 'focused';
 })()`,returnByValue:true});
 console.log('focus ->', r.result?.result?.value);
 await sleep(2500);
 // Wheel out to get past the cull.
 for (let i=0;i<14;i++){
   await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:800,y:400,deltaX:0,deltaY:120});
   await sleep(220);
 }
 await sleep(2500);
 const info=await send('Runtime.evaluate',{expression:`(()=>{
   const sc=window.__solarDebug.scene(); const found=[];
   sc.traverse(o=>{ if(o.name&&o.name.startsWith('cometTail')) found.push(o.name.split(':')[2]+':'+o.visible); });
   return JSON.stringify({cam: window.__solarDebug.camera().camRadius, tails: found});
 })()`,returnByValue:true});
 console.log(info.result?.result?.value);
 await sleep(1200);
 const shot=await send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
 console.log('screenshot ->',out);
 chrome.kill();process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
