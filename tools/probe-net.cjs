// 用 CDP 打开 NASA Eyes，记录全部网络请求（URL、类型、状态），特别是 .dyn。
const http=require('http');
const {spawn}=require('child_process');
const fs=require('fs');
const WS=require('ws');

const PORT=9333;
const chrome=spawn('/usr/bin/google-chrome',[
  '--headless=new','--disable-gpu','--no-sandbox','--no-first-run',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/nasa-chrome-profile',
  '--window-size=1600,1000',
  'about:blank'
],{stdio:'ignore'});

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function getJSON(path,method='GET'){return new Promise((res,rej)=>{const req=http.request({host:'127.0.0.1',port:PORT,path,method},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{try{res(JSON.parse(d));}catch(e){rej(new Error(d.slice(0,80)));}});});req.on('error',rej);req.end();});}

(async()=>{
  // 等 devtools 起来
  for(let i=0;i<40;i++){try{await getJSON('/json/version');break;}catch{await sleep(250);}}
  const tab=await getJSON('/json/new?https://eyes.nasa.gov/apps/solar-system/%23/home','PUT');
  console.log('target id:',tab.id);
  const ws=new WS(tab.webSocketDebuggerUrl,{perMessageDeflate:false});
  const reqs=[];const idmap=new Map();let id=0;
  const send=(method,params={})=>{const _id=++id;ws.send(JSON.stringify({id:_id,method,params}));return _id;};
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{
    const msg=JSON.parse(m);
    if(msg.method==='Network.requestWillBeSent'){
      const u=msg.params.request.url;
      if(!u.startsWith('data:'))reqs.push({t:'req',u,type:msg.params.type});
    }
    if(msg.method==='Network.responseReceived'){
      const u=msg.params.response.url;
      if(!u.startsWith('data:'))reqs.push({t:'res',u,status:msg.params.response.status,mime:msg.params.response.mimeType,size:msg.params.response.encodedDataLength});
    }
    if(msg.id&&idmap.has(msg.id)){idmap.get(msg.id)(msg);idmap.delete(msg.id);}
  });
  send('Network.enable');
  send('Page.enable');
  send('Page.navigate',{url:'https://eyes.nasa.gov/apps/solar-system/#/home'});
  await sleep(25000); // 让它加载并跑动画

  fs.writeFileSync('/tmp/nasa-net.json',JSON.stringify(reqs,null,1));
  console.log('记录请求总数:',reqs.length);
  const dyn=reqs.filter(r=>/\.dyn($|\?)/i.test(r.u));
  console.log('.dyn 请求:',dyn.length);
  const hosts={};reqs.forEach(r=>{try{const h=new URL(r.u).host;hosts[h]=(hosts[h]||0)+1;}catch{}});
  console.log('主机分布:',JSON.stringify(hosts,null,1));
  chrome.kill();process.exit(0);
})().catch(e=>{console.error('ERR',e.message);chrome.kill();process.exit(1);});
