// Interrogate OUR running app on :4310, the same way probe-app.cjs does for the
// reference. Usage: node tools/probe-ours.cjs "<expression>"
const http=require('http'),{spawn}=require('child_process'),WS=require('ws');
const PORT=Number(process.env.CDP_PORT||9402);
const expr=process.argv[2]||'1';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const getJSON=(p,m='GET')=>new Promise((res,rej)=>{const rq=http.request({host:'127.0.0.1',port:PORT,path:p,method:m},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error('bad json: '+d.slice(0,80)))}})});rq.on('error',rej);rq.end()});
(async()=>{
 const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--disable-gpu','--no-sandbox','--no-first-run','--use-gl=swiftshader','--enable-unsafe-swiftshader',`--remote-debugging-port=${PORT}`,'--user-data-dir=/tmp/probe-ours-profile','--window-size=1600,1000','about:blank'],{stdio:'ignore'});
 for(let i=0;i<60;i++){try{await getJSON('/json/version');break}catch{await sleep(250)}}
 const tab=await getJSON('/json/new?about:blank','PUT');
 const ws=new WS(tab.webSocketDebuggerUrl,{perMessageDeflate:false});
 let id=0;const pending=new Map();
 const send=(m,p={})=>new Promise(res=>{const i=++id;pending.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
 await new Promise(r=>ws.on('open',r));
 ws.on('message',raw=>{const msg=JSON.parse(raw);
   if(msg.method==='Runtime.exceptionThrown'){const d=msg.params.exceptionDetails;console.log('EXC:',(d.exception?.description||d.text||'').split('\n')[0].slice(0,200));}
   if(msg.method==='Runtime.consoleAPICalled'){console.log('LOG:',(msg.params.args||[]).map(a=>a.value??a.description).join(' ').slice(0,200));}
   if(msg.id&&pending.has(msg.id)){pending.get(msg.id)(msg);pending.delete(msg.id)}});
 await send('Runtime.enable');await send('Page.enable');
 await send('Page.navigate',{url:'http://localhost:4310'});
 await sleep(22000);
 const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true});
 console.log('RESULT:', r.result?.result?.value);
 if(r.result?.exceptionDetails) console.log('EVAL EXC:', r.result.exceptionDetails.exception?.description?.split('\n')[0]);
 chrome.kill();process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
