// Screenshot the reference (cloned) NASA Eyes for side-by-side comparison.
// Usage: node tools/capture-ref.cjs [routeHash] [out]
const fs=require('fs'),http=require('http'),{spawn}=require('child_process'),WS=require('ws');
const [, , hash='#/earth', out='/tmp/ref.png']=process.argv;
const PORT=Number(process.env.CDP_PORT||9395);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const getJSON=(p,m='GET')=>new Promise((res,rej)=>{const rq=http.request({host:'127.0.0.1',port:PORT,path:p,method:m},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})});rq.on('error',rej);rq.end()});
(async()=>{
 const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--use-gl=swiftshader','--enable-unsafe-swiftshader',`--remote-debugging-port=${PORT}`,'--user-data-dir=/tmp/capture-ref-profile','--window-size=1600,1000','about:blank'],{stdio:'ignore'});
 for(let i=0;i<60;i++){try{await getJSON('/json/version');break}catch{await sleep(250)}}
 const tab=await getJSON('/json/new?about:blank','PUT');
 const ws=new WS(tab.webSocketDebuggerUrl,{perMessageDeflate:false});
 let id=0;const pending=new Map();
 const send=(m,p={})=>new Promise(res=>{const i=++id;pending.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
 await new Promise(r=>ws.on('open',r));
 ws.on('message',raw=>{const msg=JSON.parse(raw);if(msg.id&&pending.has(msg.id)){pending.get(msg.id)(msg);pending.delete(msg.id)}});
 await send('Page.enable');
 await send('Page.navigate',{url:`http://localhost:8099/apps/solar-system/index.html${hash}`});
 await sleep(28000);
 // Hide only the UI chrome; `#pioneer` is the WebGL canvas and must stay.
 await send('Runtime.evaluate',{expression:`(()=>{
   for(const s of ['#ui','#dynamic-ui','#loading-screen','#embed-overlay']){const e=document.querySelector(s);if(e)e.style.display='none';}
 })()`,returnByValue:true});
 await sleep(1500);
 const shot=await send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
 console.log('reference ->',out);
 chrome.kill();process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
