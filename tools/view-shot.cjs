// Screenshot our app at a given zoom preset or focused body.
// Usage: node tools/view-shot.cjs <preset|focus:id> <out.png>
const fs=require('fs'),http=require('http'),{spawn}=require('child_process'),WS=require('ws');
const [, , mode='inner', out='/tmp/view.png']=process.argv;
const PORT=Number(process.env.CDP_PORT||9399);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const getJSON=(p,m='GET')=>new Promise((res,rej)=>{const rq=http.request({host:'127.0.0.1',port:PORT,path:p,method:m},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})});rq.on('error',rej);rq.end()});
(async()=>{
 const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--use-gl=swiftshader','--enable-unsafe-swiftshader',`--remote-debugging-port=${PORT}`,'--user-data-dir=/tmp/view-shot-profile','--window-size=1600,1000','about:blank'],{stdio:'ignore'});
 for(let i=0;i<60;i++){try{await getJSON('/json/version');break}catch{await sleep(250)}}
 const tab=await getJSON('/json/new?about:blank','PUT');
 const ws=new WS(tab.webSocketDebuggerUrl,{perMessageDeflate:false});
 let id=0;const pending=new Map();
 const send=(m,p={})=>new Promise(res=>{const i=++id;pending.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
 await new Promise(r=>ws.on('open',r));
 ws.on('message',raw=>{const msg=JSON.parse(raw);if(msg.id&&pending.has(msg.id)){pending.get(msg.id)(msg);pending.delete(msg.id)}});
 await send('Page.enable');
 await send('Page.navigate',{url:'http://localhost:4310'});
 await sleep(20000);
 const expr = mode.startsWith('focus:')
   ? `window.__solarDebug.focus(${JSON.stringify(mode.slice(6))})`
   : `window.__solarDebug.setZoom(${JSON.stringify(mode)})`;
 const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true});
 console.log('mode ->', mode, '| hook present:', !r.result?.exceptionDetails);
 await sleep(4000);
 const info=await send('Runtime.evaluate',{expression:`JSON.stringify(window.__solarDebug.camera())`,returnByValue:true});
 console.log('camera ->', info.result?.result?.value);
 const shot=await send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
 console.log('screenshot ->',out);
 chrome.kill();process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
