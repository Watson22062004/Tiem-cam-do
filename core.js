/* core.js — lõi game (state, vẽ, logic chính, UI). Load TRƯỚC các module khác */
const DEBUG=false;window.DEBUG=DEBUG;
const $=s=>document.querySelector(s),rnd=(a,b)=>Math.floor(a+Math.random()*(b-a+1)),pick=a=>a[rnd(0,a.length-1)],r10=v=>Math.max(10,Math.round(v/10)*10),fm=n=>Math.round(n).toLocaleString('vi-VN')+'k',cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const T={
watch:{n:'Đồng hồ cơ',i:'\uE000',b:1200,m:{gear:1,oil:1,screw:2},s:'Kiểm tra,Tháo vỏ,Vệ sinh,Thay bánh răng,Tra dầu,Căn chỉnh,Chạy thử'},
camera:{n:'Máy ảnh phim',i:'\uE001',b:1800,m:{film:1,cleaner:1,screw:2},s:'Kiểm tra,Tháo thân máy,Vệ sinh,Thay dây film,Sửa màn trập,Chỉnh nét,Chụp thử'},
radio:{n:'Radio cổ',i:'\uE002',b:1500,m:{cap:2,wire:1,part:1},s:'Kiểm tra điện,Mở vỏ,Hàn tụ điện,Nối dây đồng,Thay linh kiện,Bật thử'},
teddy:{n:'Gấu bông',i:'\uE003',b:400,m:{cloth:1,thread:1,cotton:1},s:'Kiểm tra,Tháo đường may,Nhồi bông,Vá vải,Khâu lại,Giặt sạch'},
ring:{n:'Nhẫn bạc',i:'\uE004',b:2200,m:{metal:1,gem:1,polish:1},s:'Soi kính lúp,Tháo đá,Nắn kim loại,Gắn đá,Đánh bóng'},
guitar:{n:'Guitar',i:'\uE005',b:2500,m:{string:2,wood:1},s:'Kiểm tra,Tháo dây,Vá thân gỗ,Chỉnh cần,Lên dây,Chỉnh âm'},
phone:{n:'Điện thoại cũ',i:'\uE006',b:700,m:{battery:1,screen:1,screw:1},s:'Kiểm tra,Tháo máy,Thay pin,Thay màn hình,Lắp lại,Test'},
vase:{n:'Bình gốm cổ',i:'\uE007',b:2000,m:{glue:1,polish:1,cloth:1},s:'Kiểm tra vết nứt,Vệ sinh,Dán mảnh vỡ,Trám men,Đánh bóng'},
violin:{n:'Đàn violin',i:'\uE008',b:3000,m:{string:2,wood:1,polish:1},s:'Kiểm tra,Tháo dây,Vá thân gỗ,Đánh bóng,Lên dây,Thử âm'},
gameboy:{n:'Máy game cầm tay',i:'\uE009',b:900,m:{battery:1,screen:1,part:1},s:'Kiểm tra,Tháo vỏ,Thay pin,Thay màn hình,Lắp lại,Chơi thử'},
typew:{n:'Máy chữ cổ',i:'\uE00A',b:1600,m:{gear:1,oil:1,metal:1},s:'Kiểm tra,Tháo phím,Thay bánh răng,Tra dầu,Gõ thử'}};
const M={gear:['\uE023','Bánh răng',60],oil:['\uE024','Dầu máy',30],screw:['\uE025','Ốc nhỏ',10],film:['\uE026','Dây film',80],cleaner:['\uE027','Dd vệ sinh',40],cap:['\uE028','Tụ điện',35],wire:['\uE029','Dây đồng',25],part:['\uE02A','Linh kiện',50],cloth:['\uE02B','Vải',20],thread:['\uE02C','Chỉ',10],cotton:['\uE02D','Bông',15],metal:['\uE02E','Kim loại',90],gem:['\uE02F','Đá quý',150],polish:['\uE030','Nước đánh bóng',40],string:['\uE031','Dây đàn',45],wood:['\uE032','Gỗ',60],battery:['\uE033','Pin',80],screen:['\uE034','Màn hình',200],glue:['\uE035','Keo dán',25]};
const NPCS=[
{n:'Minh (sinh viên)',col:'#5aa0d0',hair:'#222',ask:.6,flex:.55,say:'Em đang cần tiền gấp, anh/chị xem giúp em món này.'},
{n:'Bác Tư',col:'#a0785a',hair:'#ddd',ask:.8,flex:.7,say:'Đồ ông nhà tôi để lại đấy, xem giá giúp tôi.'},
{n:'Cô Lan',col:'#d070a0',hair:'#4a2a1a',ask:.9,flex:.8,say:'Chào chủ tiệm, tôi muốn bán món này.'},
{n:'Hùng thương lái',col:'#7a7a3a',hair:'#111',ask:1,flex:.85,say:'Hàng ngon đây, giá phải chăng thôi nhé.'},
{n:'Thảo',col:'#b070d0',hair:'#a05020',ask:.75,flex:.65,say:'Mình dọn nhà, có món này muốn nhượng lại.'},
{n:'Ông Sáu (nóng tính)',col:'#c05040',hair:'#eee',ask:1.1,flex:.9,say:'Nói giá cho đàng hoàng, đừng có ép tôi!'},
{n:'Nam (khó tính)',col:'#4a8a6a',hair:'#333',ask:1,flex:.88,say:'Tôi biết giá thị trường đấy, đừng có trả thấp.'},
{n:'Mai (sưu tầm)',col:'#e0a040',hair:'#6a3a1a',ask:.85,flex:.75,say:'Tôi đang tìm người hiểu đồ cũ để nhượng lại.'}].map(n=>({...n,aff:0,visits:0}));
const EV=[{t:'Hôm nay trời mưa, đường phố khá vắng.',m:.95,rain:1},{t:'Khu phố đông người, khách liên tục ghé tiệm.',m:1.7},{t:'Có tin đồn về đồ cổ, nhiều người mang đồ đến bán.',m:1.3,sb:.85},{t:'Hôm nay vắng khách.',m:.9},{t:'Nhiều người đang cần tiền gấp, họ mang đồ đến bán.',m:1.2,sb:.85},{t:'Một ngày yên ả ở khu phố.',m:1.45},{t:'Lễ hội khu phố! Người dân đi dạo rất đông.',m:1.6,sb:.3}];
const RV={5:['Chủ tiệm nhiệt tình, giá hợp lý. Sẽ quay lại!','Tiệm xinh, chủ tiệm dễ thương, 10 điểm!'],4:['Ổn áp, giá tạm được.','Phục vụ tốt, chỉ tiếc chút về giá.'],3:['Bình thường, không có gì đặc biệt.','Giá hơi chát nhưng tạm chấp nhận.'],2:['Trả giá thấp quá, hơi buồn.','Thái độ hơi khó chịu.'],1:['Tệ! Sẽ không quay lại.','Trả giá như ép người ta, thất vọng!']};
const LV=[['🏚️ Tiệm nhỏ',0,8,2],['🛠️ Tiệm + xưởng',3000,14,4],['🏺 Tiệm đồ cổ',9000,24,6]];
let uid=0,G={money:2500,rep:70,day:1,min:480,open:false,lv:1,inv:[],mats:{},rev:[],pawns:[],notes:[],log:[],tot:{rev:0,cost:0},q:[],tl:{scr:1,pli:1,lup:1},pm:{until:0,mul:1,neon:0}},S,ev=EV[5],queue=[],gone=[],cur=null,mode='main',fx=[],working=null,confirmC=false,summ=null,rf=0;
/* Mỗi khách chỉ được có 1 mục trong hàng; luôn giữ khách đang ở quầy (cur) */
function dedupeQueue(){
  const seen=new Set();
  if(cur&&cur.npc&&cur.npc.n)seen.add(cur.npc.n);
  queue=queue.filter(q=>{
    if(q===cur)return true;
    const name=q&&q.npc&&q.npc.n;
    if(!name)return true;
    if(seen.has(name))return false;
    seen.add(name);
    return true;
  });
}
const newS=()=>({rev:0,buy:0,mats:0,cust:0,deals:0,bought:[],sold:[],rep0:G.rep,st:[],fixed:0});S=newS();
const TM=[1,1.35,2.2,3.6,6,10],TN=[['Thường','#8a7a6a','⚪'],['Tốt','#3a9a4a','🟢'],['Hiếm','#2a6ab0','💎'],['Quý hiếm','#8a3ac0','🔮'],['Cổ vật','#d08a10','🏺'],['Báu vật','#d02a4a','👑']],tr=i=>i.tier==null?(i.rare?2:0):(i.rare?i.tier:Math.min(i.tier,1)),QL=i=>{const n=TN[tr(i)];return`<b style="color:${n[1]}">${n[2]}${n[0]}</b>`};const est=i=>r10(T[i.type].b*(G.mk&&G.mk[i.type]||1)*(.25+.75*i.cond/100)*(1+i.age/200)),tv=i=>r10(est(i)*TM[tr(i)]*(i.fake?.15:1)),vis=i=>i.known?tv(i):est(i);
function genItem(){const k=pick(Object.keys(T)),t=T[k];return{id:++uid,type:k,name:t.n,icon:t.i,age:rnd(5,80),cond:rnd(15,85),rare:Math.random()<(ev.deal?.2:0)+.1+.06*(G.lv-1)+G.rep/1000,fake:Math.random()<.12,cost:0,orig:rnd(70,100),repairs:0,price:0,shown:false,known:false}}
for(let k=0;k<2;k++){const i=genItem();i.fake=i.rare=false;i.cond=70;i.cost=300;i.price=r10(est(i)*1.1);i.shown=true;G.inv.push(i)}
/* ===== âm thanh ===== */
let AC,mute=false;const SN={coin:[[988,.07],[1319,.15]],bad:[[160,.18,'sawtooth'],[110,.22,'sawtooth']],door:[[440,.08],[330,.14]],click:[[1480,.035,'sine'],[880,.07,'sine']],star:[[880,.06],[1175,.06],[1568,.12]],tick:[[300,.04,'square']],done:[[523,.1],[659,.1],[784,.1],[1047,.25]],up:[[392,.1],[523,.1],[659,.1],[784,.1],[1047,.3]],day:[[659,.12],[523,.12],[784,.25]]};
let _sndT=0,_sndK='';function snd(k){if(mute||!SN[k])return;const n=performance.now();if(k==='click'&&n-_sndT<100)return;if(n-_sndT<40&&_sndK===k)return;_sndT=n;_sndK=k;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();let t=AC.currentTime;SN[k].forEach(([f,d,w])=>{const o=AC.createOscillator(),v=AC.createGain();o.type=w||'triangle';o.frequency.value=f;v.gain.setValueAtTime(k==='click'?.05:.1,t);v.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(v);v.connect(AC.destination);o.start(t);o.stop(t+d);t+=d*.9})}catch(e){}}

const QT=[['buy',1,'Mua 1 món đồ cũ',{m:150}],['sell',1,'Bán 1 món đồ',{m:120}],['fix',1,'Hoàn thành 1 lần sửa',{m:100,mat:'screw'}],['earn',800,'Kiếm 800k doanh thu',{r:2}],['clean',3,'Phục vụ 3 khách không bị chê',{r:3}]];
function genQ(){G.q=QT.filter(q=>q[0]!='fix'||G.lv>1).sort(()=>Math.random()-.5).slice(0,3).map(q=>({k:q[0],n:q[1],d:q[2],rw:q[3],done:false}))}
const qp=q=>({buy:S.bought.filter(x=>x[0]!='(').length,sell:S.sold.filter(x=>x[0]!='(').length,fix:S.fixed,earn:S.rev,clean:S.st.length>=3&&S.st.every(x=>x>=3)?3:0})[q.k];
const qr=q=>[q.rw.m?fm(q.rw.m):'',q.rw.r?'+'+q.rw.r+' uy tín':'',q.rw.mat?'+2 '+M[q.rw.mat][1]:''].join(' ');
const REP=(k,v)=>(k=='npc'||k=='cust')&&v&&v.n?(NPCS.includes(v)?{__n:v.n}:{__x:{...v}}):v;
function trimG(){try{if(G.rev&&G.rev.length>5000)G.rev.length=5000;if(G.log&&G.log.length>5000)G.log.length=5000;if(G.notes&&G.notes.length>50)G.notes.splice(0,G.notes.length-50);if(fx.length>100)fx=fx.slice(-100);if(gone.length>100)gone=gone.slice(-100);if(!isFinite(G.money))G.money=0}catch(e){}}
function save(){trimG();try{const s=JSON.stringify({v:8,G,S,e:EV.indexOf(ev),u:uid,m:mute,a:NPCS.map(n=>[n.aff,n.visits])},REP);window.__saveRaw=s;TCD.commit(s)}catch(e){console.error('save',e)}}
const FBN=n=>({n:n||'Khách quen',col:'#8a8a8a',hair:'#222',aff:0,visits:0,ask:1,flex:.8});
try{const d=JSON.parse(localStorage.getItem('tcd1'),(k,v)=>v&&v.__x?v.__x:v&&v.__n?(NPCS.find(n=>n.n==v.__n)||FBN(v.__n)):v);if(d&&d.G){G=Object.assign(G,d.G);S=Object.assign(S||{},d.S||{});ev=EV[d.e]||ev;uid=d.u||uid;mute=!!d.m;if(Array.isArray(d.a))d.a.forEach((a,i)=>{if(NPCS[i]){NPCS[i].aff=a[0];NPCS[i].visits=a[1]}})}}catch(e){}
/* dọn dữ liệu cũ: bỏ mục hỏng để không làm treo qua ngày */
if(!Array.isArray(G.inv))G.inv=[];
G.inv=G.inv.filter((item,index,self)=>item&&self.findIndex(x=>x&&x.id===item.id)===index);
[G.pawns,G.jobs].forEach(a=>{if(!a)return;for(let i=a.length-1;i>=0;i--){const e=a[i];if(!e||!(e.item||e.it))a.splice(i,1);else if(!e.npc)e.npc=FBN()}});(G.rev||[]).forEach(r=>{if(r&&!r.npc)r.npc=FBN(r.n)});
G.mk=G.mk||{};G.mh=G.mh||{};G.tl=Object.assign({scr:1,pli:1,lup:1,sol:1,pol:1},G.tl||{});G.q=Array.isArray(G.q)?G.q:[];G.inv=Array.isArray(G.inv)?G.inv:[];G.mats=G.mats&&typeof G.mats==='object'?G.mats:{};G.rev=Array.isArray(G.rev)?G.rev:[];G.pawns=Array.isArray(G.pawns)?G.pawns:[];G.notes=Array.isArray(G.notes)?G.notes:[];G.log=Array.isArray(G.log)?G.log:[];G.tot=Object.assign({rev:0,cost:0},G.tot||{});G.pm=Object.assign({until:0,mul:1,neon:0},G.pm||{});if(!G.q.length)genQ();/* ===== vẽ ===== */
const c=$('#cv'),g=c.getContext('2d');g.imageSmoothingEnabled=false;
const R=(x,y,w,h,f)=>{g.fillStyle=f;g.fillRect(x|0,y|0,w|0,h|0)},E=(s,x,y,z=10)=>{g.font=z+'px serif';g.textAlign='center';g.fillStyle='#000';g.fillText(s,x|0,y|0)},TX=(s,x,y,z,f)=>{g.font='700 '+Math.round(z*.68)+'px "Be Vietnam Pro",sans-serif';g.textAlign='center';g.fillStyle=f;g.fillText(s,x|0,y|0)};
function person(x,y,col,hair,bob,em,arm){const sk=em=='angry'?'#f0a080':'#f2c9a0',b=y-29+bob,ey=b+4;R(x-7,y-1,14,2,'rgba(0,0,0,.28)');R(x-4,y-8,3,8,'#33334f');R(x+1,y-8,3,8,'#33334f');R(x-5,y-2,4,2,'#2a1a0c');R(x+1,y-2,4,2,'#2a1a0c');
R(x-5,y-20+bob,10,13,col);R(x-5,y-20+bob,10,2,'rgba(255,255,255,.25)');R(x-5,y-9+bob,10,2,'rgba(0,0,0,.2)');R(x-7,y-19+bob-(arm?4:0),2,8,col);R(x+5,y-19+bob,2,8,col);R(x-7,y-12+bob-(arm?4:0),2,2,sk);R(x+5,y-12+bob,2,2,sk);R(x-4,b,9,9,sk);R(x-5,b-2,11,4,hair);R(x-5,b,2,4,hair);
if(em=='happy'){R(x-3,ey,2,1,'#222');R(x+2,ey,2,1,'#222');R(x-2,ey+3,5,1,'#a33');R(x-3,ey+2,1,1,'#a33');R(x+3,ey+2,1,1,'#a33');R(x-4,ey+2,2,1,'#f5a0a0');R(x+3,ey+2,2,1,'#f5a0a0')}
else if(em=='angry'){R(x-4,ey-1,3,1,'#222');R(x+2,ey-1,3,1,'#222');R(x-3,ey+1,1,1,'#222');R(x+3,ey+1,1,1,'#222');R(x-2,ey+3,5,1,'#700');R(x-3,ey+4,1,1,'#700');R(x+3,ey+4,1,1,'#700')}
else if(em=='sad'||em=='cry'){R(x-3,ey,1,2,'#222');R(x+3,ey,1,2,'#222');R(x-4,ey-1,2,1,'#222');R(x+3,ey-1,2,1,'#222');R(x-1,ey+3,3,1,'#a33');R(x-2,ey+4,1,1,'#a33');R(x+2,ey+4,1,1,'#a33');if(em=='cry'){const d=Math.floor(performance.now()/120)%4;R(x-3,ey+2+d,1,2,'#4ac0ff');R(x+3,ey+2+(d+2)%4,1,2,'#4ac0ff')}}
else{R(x-2,ey,1,2,'#222');R(x+2,ey,1,2,'#222');R(x-1,ey+3,3,1,'#b55')}}
function draw(t){const L0=G.lv,L=Math.min(L0,3),H=G.min/60,night=H>=18||H<7,dusk=H>=16.5&&!night;
R(0,0,320,100,['#f1e0b4','#ead6a6','#35604a'][L-1]);R(0,70,320,30,['#c89f62','#b98a4c','#20402f'][L-1]);R(0,70,320,2,'#0003');
if(!window.__floor){const c=document.createElement('canvas');c.width=320;c.height=80;const x=c.getContext('2d');x.fillStyle='#a3763f';x.fillRect(0,0,320,80);x.fillStyle='#7a5228';for(let y=0;y<80;y+=10){x.fillRect(0,y,320,1);for(let i=((y/10)%2)*20;i<320;i+=40)x.fillRect(i,y,1,10)}window.__floor=c}g.drawImage(window.__floor,0,100);R(0,98,320,3,'#5a3a1a');
if(L>1){R(70,136,180,36,L==2?'#557a3a':'#7a2020');R(73,139,174,30,L==2?'#7aa055':'#a03838');R(80,145,160,18,L==2?'#557a3a':'#7a2020')}
R(246,18,52,46,'#5a3a1a');R(249,21,46,40,night?'#1b2246':dusk?'#f2b070':'#a5dcf5');
if(night)[[255,28],[280,34],[265,50],[287,26]].forEach(p=>R(p[0],p[1],1,1,'#fff'));else{R(254,30,12,4,'#fff');R(272,27,14,4,'#fff')}
if(ev.rain)for(let i=0;i<14;i++)R(250+(i*7+t/20)%44,22+(i*13+t/8)%36,1,4,'#6a90c8');
R(271,21,2,40,'#5a3a1a');R(249,40,46,2,'#5a3a1a');R(243,64,58,4,'#7a4a20');
R(66,8,112,22,'#6b4220');R(68,10,108,18,'#e8c070');if(G.pm.neon){R(64,6,116,2,'#ff5ac8');R(64,30,116,2,'#ff5ac8')}TX(nm(),122,24,Math.min(15,Math.floor(250/Math.max(1,nm().length))),'#4a2810');
const dOpen=G.open&&(queue.some(q=>q.x<60)||gone.some(q=>q.x<60));
R(12,34,38,66,'#5a3a1a');if(dOpen){R(15,37,32,60,night?'#233':'#ffe9b0');R(15,37,7,60,'#8b5a2b')}else{R(15,37,32,60,'#8b5a2b');R(20,42,22,22,night?'#1b2246':'#a5dcf5');R(20,70,22,22,'#7a4a20');R(42,72,3,3,'#f0c040')}
R(22,78,18,10,G.open?'#5f9445':'#b04040');TX(G.open?'MỞ':'ĐÓNG',31,86,10,'#fff');
/* kệ / tủ */
const cols=L==3?3:2,rows=L==1?1:2,x0=[68,64,56][L-1],y0=L==1?46:34,w=cols*26+12,h=rows*26+8;
R(x0,y0,w,h,'#6b4220');R(x0+3,y0+3,w-6,h-6,L==1?'#d8b880':'#bfe0e8');for(let r=0;r<rows;r++)R(x0+3,y0+3+(r+1)*26-2,w-6,3,'#6b4220');
G.inv.filter(i=>i.shown).slice(0,rows*cols).forEach((i,k)=>{const sx=x0+18+(k%cols)*26,sy=y0+22+((k/cols)|0)*26;E(i.icon,sx,sy,17);TX(i.price,sx,sy+8,9,'#3b2616')});
if(L==3){R(148,20,32,26,'#c8a040');R(151,23,26,20,'#5a7aa0');R(155,32,18,8,'#8ab070')}
/* đồng hồ, đèn */
R(186,38,22,22,'#5a3a1a');R(188,40,18,18,'#fff8e0');const a=G.min/60*Math.PI/6;for(let k=0;k<7;k++)R(197+Math.sin(a)*k,49-Math.cos(a)*k,1,1,'#222');R(197,49,1,1,'#c00');
R(221,0,2,14,'#333');R(213,14,18,7,'#e8c070');if(night||ev.rain){if(!window.__lamp){const gr=g.createRadialGradient(222,22,2,222,22,55);gr.addColorStop(0,'rgba(255,225,130,.5)');gr.addColorStop(1,'rgba(255,225,130,0)');window.__lamp=gr}g.fillStyle=window.__lamp;g.fillRect(160,0,130,110)}
/* cây, bục, bàn xưởng */
plant();
if(L>=2){R(250,96,64,8,'#7a4a20');R(252,104,60,26,'#5a3a1a');E('🔧',262,94,11);E('🪛',278,94,11);E('🔬',294,94,11)}else{crate()}
if(L==3){R(96,112,12,22,'#e8e0c8');E('🏺',102,111,16)}
for(let x=0;x<320;x+=20){const y=3+Math.sin(x/20)*2;R(x,y-1,20,1,'#0004');R(x+8,y,3,3,night||ev.rain?['#ffd75a','#ff8a8a','#8aff9a'][((x/20)+(t/500|0))%3]:'#e8d8a0')}
R(0,92,320,6,'rgba(0,0,0,.07)');E('🐈',70+Math.abs(((t/70)%240)-120)*1.3,168,12);
if(L0>=4){R(256,134,58,38,'#4a3a5a');R(259,137,52,26,'#6a5a8a');E('🔎',285,157,14);TX('THẨM ĐỊNH',285,169,9,'#ffe9b0')}
if(L0>=5){R(4,126,42,22,'#5a1a48');R(6,128,38,10,'#c060a0');E('💎',16,137,10);E('👑',34,137,10);TX('ĐỒ QUÝ',25,146,8,'#ffe9b0')}
if(L0>=6){R(226,132,26,26,'#5a3a1a');R(228,134,22,10,'#c8a040');E('🔨',239,143,10);TX('ĐẤU GIÁ',239,154,8,'#ffe9b0')}
/* người chủ tiệm */
const bench=working&&L>=2,serving=cur&&mode=='main';
if(bench)person(282,113,'#6a9a4b','#3a2a1a',Math.round(Math.sin(t/120)),oe,Math.sin(t/120)>0);else person(170,112,'#6a9a4b','#3a2a1a',0,oe,serving&&Math.sin(t/300)>.5);
if(window.drawStaffBehind)window.drawStaffBehind(t);
/* quầy */
R(118,108,122,6,'#c88a4a');R(118,114,122,19,'#8b5a2b');for(let k=0;k<3;k++){R(124+k*38,117,32,12,'#5a3a1a');R(126+k*38,119,28,8,'#a06a34')}R(118,133,122,3,'rgba(0,0,0,.3)');
R(216,98,18,10,'#3a3a3a');R(218,100,14,4,'#8fd0a0');if(cur&&cur.item&&mode=='main'){R(160,106,26,3,'#6a4420');E(cur.item.icon,173,105,18)}
/* bàn ghế chờ, khách */
drawCafe();
[...gone,...queue].sort((p,q)=>p.y-q.y).forEach(q=>{const sit=q.phase=='sit'||q.phase=='down',bob=sit?Math.round(Math.sin(t/280)):q.mv?-Math.round(Math.abs(Math.sin(t/90))*2):0,yy=sit?q.y+4:q.y;person(q.x,yy,q.npc.col,q.npc.hair,bob,q.em||(sit?'':''),q.mv);if(sit){R(q.x-6,q.y+1,12,2,'#e2b36e');R(q.x-6,q.y+3,12,1,'#7a4324')}const ee={happy:'😊',angry:'💢',sad:'💧',cry:'😭'}[q.em];if(ee)E(ee,q.x+14,yy-48+Math.round(Math.sin(t/150)),11);if(q!=cur||mode!='main')E(q.item?q.item.icon:'',q.x,yy-52,15);else if(q.line&&q.line!==q._bl){q._bl=q.line;q._bt=performance.now()}if(q.line&&performance.now()-(q._bt||0)<2000){const txt=q.line.replace(/^[^:]+:\s*/,'').slice(0,22);window.__bubs.push({x:q.x,y:(sit?yy:q.y)-34,t:txt})}});
fx.forEach(f=>{f.y-=.3;f.l--;TX(f.t,f.x,f.y,13,f.c)});fx=fx.filter(f=>f.l>0);
if(night||dusk){R(0,0,320,180,night?'rgba(20,20,60,.25)':'rgba(240,140,60,.12)')}}
const DOOR={x:36,y:108},LANE={x:150,y:128},COUNTER={x:168,y:132};
const step=(q,tx,ty,sp=1.5)=>{const dx=tx-q.x,dy=ty-q.y,d=Math.hypot(dx,dy);q.mv=d>1.5;if(q.mv){const s=Math.min(d,sp);q.x+=dx/d*s;q.y+=dy/d*s}q.x=Math.max(18,Math.min(300,q.x));q.y=Math.max(106,Math.min(172,q.y));return d};
function go(q,pts,sp){if(q._k!==q.phase||q.pi==null||!(q.pi>=0)){q._k=q.phase;q.pi=0;q.stuck=0}const p=pts[Math.min(q.pi,pts.length-1)];const d=step(q,p.x,p.y,sp);const moved=Math.hypot(q.x-(q.lx||q.x),q.y-(q.ly||q.y));q.lx=q.x;q.ly=q.y;q.stuck=moved<0.25?(q.stuck||0)+1:0;if(d<2||q.stuck>28){q.stuck=0;if(q.pi<pts.length-1)q.pi++;else{q.x=p.x;q.y=p.y;return 0}}return 1}
function balk(q){q.npc.aff=Math.max(-4,(q.npc.aff||0)-1);addRev(q,q.em=='angry'?1:2,pick(NOSEAT.rev));const i=queue.indexOf(q);if(i>=0)queue.splice(i,1);if(cur==q)cur=null;q.phase='out';gone.push(q);rd()}
function loopMain(t){
  dedupeQueue();
  /* Quầy chỉ phục vụ 1 khách: H() là khách đang giữ quầy, những người khác đứng chờ ở hàng */
  const H=()=>cur||queue.find(z=>z.phase=='counter')||queue.find(z=>z.dphase=='go')||queue.find(z=>z.phase=='tocounter'),serving=!!H();
  const slot=q=>{const a=queue.filter(z=>z.wt&&z!==H());return{x:Math.max(112,LANE.x-24-Math.max(0,a.indexOf(q))*13),y:LANE.y+4}};
  const yieldTo=q=>{const h=H();if(h&&h!==q){q.wt=1;q.mv=1;const s=slot(q);step(q,s.x,s.y,1.5);return true}if(q.wt){q.wt=0;q.pi=null;q.rt=1}return false};
  queue.slice().forEach(q=>{
    const direct=q.role||q.tutq||q.tutb||!q.phase;
    if(direct){if(yieldTo(q))return;q.dphase='go';if(!go(q,q.rt?[{x:q.x,y:128},LANE,COUNTER]:[DOOR,LANE,COUNTER],1.7)){q.phase='counter';q.dphase=null;q.mv=0;q.x=COUNTER.x;q.y=COUNTER.y}return}
    if(q.phase=='noseat'){if(go(q,[DOOR,{x:70,y:128}],1.35))return;if(!q.said){q.said=1;q.wait=64}if(--q.wait<=0)balk(q);return}
    if(q.phase=='toseat'){if(!serving&&!cur&&q==queue.find(z=>z.phase=='toseat'||z.phase=='sit')){q.phase='tocounter';q.seat=null;q.line='Quầy trống, tôi ra luôn.';return}const s=seats()[q.seat];if(!s){q.phase='tocounter';return}if(!go(q,[DOOR,{x:34,y:128},{x:s.x,y:136},s],1.4)){q.phase='down';q.sit=0;q.mv=0;q.line=pick(WAITSAY);q.em=''}return}
    if(q.phase=='down'){const s=seats()[q.seat];q.sit++;q.mv=0;if(s)q.y=s.y+Math.min(4,q.sit/4);if(q.sit>16)q.phase='sit';return}
    if(q.phase=='sit'){const s=seats()[q.seat];q.mv=0;if(s){q.x=s.x;q.y=s.y+4}if(!serving&&!cur&&G.open&&q==queue.find(z=>z.phase=='sit')){q.phase='tocounter';q.line='Tới lượt tôi.';q.em='happy'}return}
    if(q.phase=='tocounter'){if(yieldTo(q))return;if(!go(q,[{x:q.x,y:128},LANE,COUNTER],1.6)){q.phase='counter';q.mv=0;q.x=COUNTER.x;q.y=COUNTER.y}}
  });
  const walking=[...queue,...gone].filter(a=>a.mv);
  walking.forEach(a=>{walking.forEach(b=>{if(a==b)return;const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d>0&&d<12){a.x+=dx/d*0.35;a.y+=dy/d*0.15}})});
  gone.forEach(q=>{if(q.phase!='out')q.phase='out';if(!go(q,[LANE,{x:34,y:128},DOOR],1.75)){q.x=DOOR.x;q.y=DOOR.y}});
  gone=gone.filter(q=>Math.hypot(q.x-DOOR.x,q.y-DOOR.y)>4);
  const nxt=queue.find(q=>q.phase=='counter'&&!q.mv&&!q.left);
  if(!cur&&nxt&&G.open){cur=nxt;mode='main';rd()}
  draw(t)}
function loop(t){try{loopMain(t)}catch(e){console.error('loop',e)}requestAnimationFrame(loop)}
/* ===== logic ===== */
let _ui='';function ui(){const m=G.min,a=fm(G.money),b=(G.rep/20).toFixed(1).replace('.',','),c=String(G.day),d=String(m/60|0).padStart(2,'0')+':'+String(m%60).padStart(2,'0'),s=a+b+c+d;if(s===_ui)return;_ui=s;$('#tm1').textContent='💰 '+a;$('#tm2').textContent='⭐ '+b;$('#tm3').textContent='📅 Ngày '+c;$('#tm4').textContent='🕐 '+d}
const greet=(n,b)=>n.aff>=2?'Ồ, lại là chủ tiệm hôm trước! '+b:n.aff<=-2?'Lần trước tiệm làm tôi khó chịu đấy... '+b:b;
const SEAT_MAX=8;function chairs(){return Math.max(2,Math.min(SEAT_MAX,G.chairs||2))}function seats(){const n=chairs(),cols=n<=2?2:n<=4?2:4,out=[];for(let i=0;i<n;i++){const c=i%cols,r=i/cols|0;out.push({x:42+c*30,y:152+r*18,t:c<2?0:1})}return out}
const NOSEAT={
sad:['Hết ghế rồi... tôi đứng mỏi chân, thôi về vậy.','Không có chỗ ngồi. Tôi buồn thật.','Tiệm đông mà để khách đứng. Thất vọng.'],
angry:['Hết ghế à? Tôi không đứng chờ đâu!','Vào quán không có chỗ. Tôi đi review.','Đông vậy mà không kê thêm ghế?'],
rev:['Vào tiệm không có ghế, phải quay ra.','Không chỗ ngồi, như bị đuổi vậy.','Đến nơi hết ghế. Sẽ không quay lại.']
};
const WAITSAY=['Ghế êm, đợi được.','Tới lượt tôi chưa nhỉ?','Ngồi đây xem cũng vui.','Đợi một chút thôi mà.'];
function seatFree(i){return i<chairs()&&!queue.some(q=>q.seat==i&&(q.phase=='toseat'||q.phase=='down'||q.phase=='sit'))}
function drawChair(x,y,occ){
  const d='#2a180e',wood='#a56b38',pad=occ?'#d23b32':'#f3d27a',hi=occ?'#ff8d78':'#fff6c8';
  R(x-8,y+4,16,2,'#0005');
  R(x-7,y,2,7,d);R(x+5,y,2,7,d);R(x-7,y+6,3,2,wood);R(x+4,y+6,3,2,wood);
  R(x-8,y-5,16,2,d);R(x-7,y-6,14,4,pad);R(x-6,y-6,6,1,hi);
  R(x-7,y-18,2,13,d);R(x+5,y-18,2,13,d);
  R(x-8,y-20,16,5,d);R(x-7,y-19,14,3,pad);R(x-6,y-19,5,1,hi);
  R(x-5,y-16,10,1,wood);
}
function drawTable(x,y){
  R(x-4,y+3,2,7,'#3a2414');R(x+4,y+3,2,7,'#3a2414');
  R(x-11,y-1,22,5,'#6e3e22');R(x-11,y-4,22,3,'#efc98a');R(x-10,y-4,7,1,'#fff8');
  R(x-2,y-1,5,3,'#f7f3ea');R(x-1,y-3,3,2,'#ddd4c6');
}
function drawCafe(){
  const list=seats(),cols=list.length<=2?2:list.length<=4?2:4,rows=Math.ceil(list.length/cols);
  for(let r=0;r<rows;r++)drawTable(57,152+r*18);
  if(cols>2)for(let r=0;r<rows;r++)drawTable(117,152+r*18);
  list.forEach((s,i)=>drawChair(s.x,s.y,queue.some(q=>q.seat==i&&(q.phase=='sit'||q.phase=='down'))));
}
function matCost(it){const t=T[it.type];let c=0;for(const k in t.m)c+=r10(M[k][2]*(G.mp&&G.mp[k]||1))*t.m[k];return c}function fixAsk(it,e,steady){const now=e||est(it);const full=r10(T[it.type].b*(G.mk&&G.mk[it.type]||1)*(.25+.75*.9)*(1+(it.age||20)/200));const saved=Math.max(0,full-now);const labor=saved*(steady?.5:(.45+Math.random()*.1));const floor=matCost(it)*1.2,cap=saved*.7;return r10(Math.max(floor,Math.min(labor||floor,cap||labor||floor)))}
function spawn(){const room=chairs()+1,full=queue.filter(q=>q.phase!='noseat').length>=room,balking=queue.some(q=>q.phase=='noseat');if(full&&balking)return;if(queue.length>=room+1)return;const av=NPCS.filter(n=>!queue.some(q=>q.npc==n)&&!gone.some(q=>q.npc==n));if(!av.length)return;const n=pick(av);n.visits++;const sh=G.inv.filter(i=>i.shown),sellish=!sh.length||Math.random()<(ev.sb||.55),r=Math.random(),kind=!sellish?'buy':r<.5?'sell':r<.75?'pawn':G.lv>=2?'fix':'sell',free=seats().map((_,i)=>i).filter(seatFree),busy=!!cur||queue.some(z=>z.phase=='counter'||z.phase=='tocounter'),phase=!busy?'tocounter':free.length?'toseat':'noseat',q={npc:n,x:32,y:106,kind,phase,seat:phase=='toseat'?free[0]:null,said:0};snd('door');
if(kind!='buy'){q.item=genItem();if(kind=='fix'){q.item.fake=q.item.rare=false;q.item.cond=rnd(10,50)}const e=est(q.item);q.ask=kind=='fix'?fixAsk(q.item,e):r10(e*n.ask*(kind=='pawn'?.6:1)*(.85+Math.random()*.25));q.def=kind=='fix'?r10(q.ask*.9):r10(q.ask*.6);q.pat=3;q.line=greet(n,kind=='fix'?'Món này hỏng rồi, chủ tiệm báo giá sửa giúp tôi.':kind=='pawn'?'Tôi cần chút tiền, cầm món này được bao nhiêu?':n.say)}
else{const it=pick(sh);q.item=it;q.wtp=r10(tv(it)*(.85+Math.random()*.4)*(.85+G.rep/400));const p=it.price;if(p<=q.wtp){q.s='ok';q.line=greet(n,'Món này đẹp quá, tôi lấy luôn!')}else if(p<=q.wtp*1.3){q.s='hag';q.line=greet(n,'Hơi đắt... '+fm(q.wtp)+' được không?')}else{q.s='no';q.line=greet(n,'Giá này tôi chịu thua, đắt quá.')}}
S.cust++;if(!free.length){q.em=Math.random()<.45?'angry':'sad';q.line=pick(NOSEAT[q.em])}queue.push(q)}
setInterval(()=>{if(!G.open||cur||confirmC)return;G.min++;if(Math.random()<.0025)sudden();if(Math.random()<.026*(.7+G.rep/100)*ev.m*promM()*fuM()*(1+(chairs()-2)*.05)*((G.bs&&G.min<G.bs.u)?G.bs.m:1))spawn();if(G.min>=1200)closeDay();ui()},150);
function addRev(q,s,txt){G.rev.unshift({d:G.day,n:q.npc.n,s,t:txt||pick(RV[s]),rp:null,ans:null,npc:q.npc});S.st.push(s);G.rep=cl(G.rep+[0,-5,-2,0,1,2][s],0,100);snd(s>=4?'star':s<=2?'bad':'click');fx.push({t:'⭐'.repeat(s),x:q.x,y:q.y-44,c:'#c08000',l:70})}
/* Tiễn đúng khách đang giao dịch (trước đây luôn xóa khách đầu hàng nên khách ở quầy bị giao dịch lại) */
function leave(q){q=q||cur||queue[0];if(q){q.left=1;const i=queue.indexOf(q);if(i>=0)queue.splice(i,1);if(!gone.includes(q))gone.push(q)}if(!q||q===cur)cur=null;rd();ui()}
function refuse(){addRev(cur,3,'Chủ tiệm từ chối, hơi tiếc nhưng ok.');cur.npc.aff+=0;leave()}
function angry(m){const q=cur;snd('bad');q.npc.aff--;addRev(q,pick([1,2]));fx.push({t:m,x:q.x,y:q.y-52,c:'#a02020',l:80});leave()}
function offer(){const v=+$('#pr').value,q=cur;if(!v||v<10)return;if(q.kind=='fix')return offerFix(v);if(v>G.money){q.line='(Bạn không đủ tiền!)';return rd()}if(q.kind=='sell'&&G.inv.length>=LV[G.lv-1][2]){q.line='(Kho đầy! Hãy bán bớt đồ.)';return rd()}
const r=v/q.ask;if(r>=1){G.money-=v;S.buy+=v;G.tot.cost+=v;q.item.cost=v;snd('coin');if(q.kind=='pawn'){const d=+$('#tmd').value;G.pawns.push({item:q.item,loan:v,due:G.day+d,redeem:r10(v*(1+.03*d)),npc:q.npc});S.bought.push('(cầm) '+q.item.name)}else{G.inv.push(q.item);S.bought.push(q.item.name)}S.deals++;q.npc.aff++;fx.push({t:'-'+fm(v),x:q.x,y:q.y-44,c:'#a02020',l:70});addRev(q,r>=.95?5:4);return leave()}
q.pat--;if(q.pat<=0)return angry('Thôi, tôi đi!');if(r>=q.npc.flex){q.ask=r10((q.ask+v)/2);q.def=Math.min(q.ask,r10(v*1.05));q.line='Thêm chút nữa nhé, '+fm(q.ask)+' thôi.'}else{q.line=r<.35?'Trả thế mà nghe được à?!':'Thấp quá, thêm chút nữa đi!';if(r<.35)return angry('Đồ ép giá!')}rd()}
function offerFix(v){const q=cur,i=q.item;if(G.inv.length>=LV[G.lv-1][2]){q.line='(Kho đầy!)';return rd()}
if(v<=q.ask){i.cust=q.npc;i.fee=v;i.cost=0;G.inv.push(i);q.npc.aff++;snd('coin');S.deals++;S.bought.push('(nhận sửa) '+i.name);fx.push({t:'📝 Nhận sửa',x:q.x,y:q.y-44,c:'#2a7a20',l:70});return leave()}
q.pat--;if(q.pat<=0||v>q.ask*1.3)return angry(v>q.ask*1.3?'Cắt cổ!':'Thôi, tôi đi!');q.line='Mắc quá, '+fm(q.ask)+' thôi được không?';rd()}
function pv(){$('#rd').textContent=fm(r10(+$('#pr').value*(1+.03*$('#tmd').value)))}
function appr(){const i=cur.item;if(!i.known){i.known=true;G.min+=am();cur.line=i.fake?'Ơ... sao anh/chị soi kỹ vậy?':'Anh/chị soi kỹ thật đấy.'}rd();ui()}
function sold(q,p){const i=q.item;if(!G.inv.includes(i))return leave();G.inv.splice(G.inv.indexOf(i),1);G.money+=p;G.tot.rev+=p;S.rev+=p;S.deals++;S.sold.push(i.name);q.npc.aff++;snd('coin');fx.push({t:'+'+fm(p),x:q.x,y:q.y-44,c:'#2a7a20',l:70});
if(i.fake&&!i.known&&Math.random()<.7){G.rep=cl(G.rep-4,0,100);addRev(q,1,'Hàng giả! Tôi bị lừa rồi!')}else addRev(q,p<=q.wtp*.85?5:p<=q.wtp?4:3);leave()}
function bAccept(){sold(cur,cur.s=='hag'?cur.wtp:cur.item.price)}
function bRefuse(){addRev(cur,3,'Giá hơi cao so với mình.');leave()}
function closeDay(){G.open=false;confirmC=false;queue.forEach(q=>gone.push(q));queue=[];cur=null;const st=S.st,avg=st.length?(st.reduce((a,b)=>a+b)/st.length).toFixed(1):'—';summ={avg,dr:G.rep-S.rep0};G.log.unshift(`Ngày ${G.day}: ${et()} ${S.cust} khách, ${S.deals} giao dịch, lãi ${fm(S.rev-S.buy-S.mats)}.`);mode='main';save();rd()}
function newDay(){
  if(DEBUG)console.log('newDay start',{day:G.day,money:G.money,pawns:G.pawns.length,inv:G.inv.length});
  if(G.over)return false;
  G.day++;G.min=480;ev=pick(EV);
  G.inv.forEach(i=>{if(!i.shown)i.cond=Math.max(5,i.cond-(G.lv<2?2:1))});
  // thống kê ngày cũ
  if(G.c){G.c.deals=(G.c.deals||0)+(S.deals||0);G.c.fixed=(G.c.fixed||0)+(S.fixed||0)}
  S=newS();summ=null;G.notes=[];
  // drift đánh giá theo thiện cảm
  try{
    G.rev.slice(0,15).forEach(r=>{
      const n=r.npc;if(!n||!STY[n.sty]||r.ed)return;
      if(n.aff<=-2&&r.s>1&&Math.random()<.4){r.os=r.s;r.s--;r.t=pick(ED.d[n.sty]);r.ed='hạ';G.rep=cl(G.rep-1,0,100)}
      else if(n.aff>=3&&r.s<5&&Math.random()<.4){r.os=r.s;r.s++;r.t=pick(ED.u);r.ed='tăng';G.rep=cl(G.rep+1,0,100)}
    });
  }catch(e){}
  processEventDay();
  if(processTaxDay()===false)return false;
  processPawnDay();
  processStaffDay();
  processMarketDay();
  try{if(typeof processAchievementDay==='function')processAchievementDay()}catch(e){}
  snd('day');genQ();rd();ui();
  return true;
}

function openShop(){snd('door');G.open=true;rd()}
/* kho / xưởng / cửa hàng */
function setP(id,v){G.inv.find(i=>i.id==id).price=Math.max(10,+v||10)}
function tg(id){const i=G.inv.find(x=>x.id==id);if(!i.shown&&G.inv.filter(x=>x.shown).length>=LV[G.lv-1][3]){alert('Hết chỗ trưng bày! Hãy nâng cấp tủ.');return}if(!i.price)i.price=r10(vis(i)*1.15);i.shown=!i.shown;rd()}
function ap(id){G.inv.find(i=>i.id==id).known=true;G.min+=am();rd();ui()}
function buyM(k,n){const cost=M[k][2]*n;if(G.money<cost)return;G.money-=cost;G.mats[k]=(G.mats[k]||0)+n;S.mats+=cost;snd('coin');G.tot.cost+=cost;rd();ui()}
function repair(id){if(working)return;const it=G.inv.find(x=>x.id==id),t=T[it.type];let cost=0;for(const k in t.m)if((G.mats[k]||0)<t.m[k])return;for(const k in t.m){G.mats[k]-=t.m[k];cost+=r10(M[k][2]*(G.mp&&G.mp[k]||1))*t.m[k]}it.cost+=cost;if(Math.random()<.2*((G.tl.sol||1)-1)){const k0=Object.keys(t.m)[0];G.mats[k0]=(G.mats[k0]||0)+t.m[k0]}working={it,step:0,steps:t.s.split(',')};rd();
const iv=setInterval(()=>{snd('tick');working.step++;if(working.step>=working.steps.length){clearInterval(iv);it.cond=it.cust?90:Math.min(98,it.cond+rnd(28,45)+4*(G.tl.scr-1)+3*(G.tl.pol-1));it.repairs++;it.orig=Math.max(20,it.orig-4);S.fixed++;snd('done');if(it.cust){G.inv.splice(G.inv.indexOf(it),1);G.money+=it.fee;G.tot.rev+=it.fee;S.rev+=it.fee;S.deals++;S.sold.push('(sửa) '+it.name);fx.push({t:'+'+fm(it.fee),x:282,y:90,c:'#2a7a20',l:80});addRev({npc:it.cust,x:282,y:112},it.cond>=85?5:4)}fx.push({t:'✨ Xong!',x:282,y:70,c:'#2a7a20',l:80});working=null}rd()},850-150*(G.tl.pli-1))}
function upg(){const n=LV[G.lv];if(!n||G.money<n[1])return;G.money-=n[1];G.tot.cost+=n[1];G.lv++;snd('up');fx.push({t:'🏗️ Nâng cấp!',x:160,y:60,c:'#2a7a20',l:120});rd();ui()}
function reply(i){const t=$('#rp'+i).value.trim();if(!t)return;const r=G.rev[i],bad=/(^|[\s,.!?])(đm|đmm|vcl|ngu|biến|cút|khùng|điên|câm)($|[\s,.!?])/i.test(t),good=/(cảm ơn|xin lỗi|hoan nghênh|quay lại|mong|chúc|rất tiếc|thân)/i.test(t);r.rp=t;
if(bad){r.ans=pick(['Thái độ của tiệm như vậy thì tôi không quay lại đâu.','Vậy à? Tôi sẽ kể với mọi người ở khu phố này.']);r.npc.aff-=3;G.rep=cl(G.rep-4,0,100)}else if(good){r.ans=pick(['Ừ, cảm ơn chủ tiệm. Lần sau mình sẽ ghé nữa.','Cảm ơn chủ tiệm đã phản hồi, mình hiểu rồi.']);r.npc.aff+=2;G.rep=cl(G.rep+(r.s<=3?3:1),0,100)}else{r.ans='Ừ, mình hiểu.';r.npc.aff+=0}rd();ui()}
/* ===== giao diện dưới ===== */
const NAV=[['main','🏪','Tiệm'],['inv','📦','Kho·Xưởng'],['mkt','📈','Giá'],['up','🏗️','N.cấp'],['book','📒','Sổ']];
$('#nav').innerHTML=NAV.map(n=>`<button data-m="${n[0]}" onclick="if(document.getElementById('pad')?.classList.contains('on'))return;mode='${n[0]}';rd()"><span>${n[1]}</span>${n[2]}</button>`).join('');
function rd(){document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.m==mode));let h0;try{h0=({main:mainH,inv:invH,wk:wkH,shop:shopH,rev:revH,up:upH,book:bookH,mkt:mktH})[mode]()}catch(e){console.error(e);h0='<div class="nt r">⚠️ Mục này gặp lỗi dữ liệu nên chưa hiển thị được. Bạn vẫn có thể chuyển tab khác hoặc bấm Sang ngày mới.</div>'}$('#dlg').innerHTML=h0;try{if($('#rd'))pv();ui()}catch(e){console.error(e)}}
function mainH(){
if(summ)return`<h3>📊 Tổng kết ngày ${G.day}</h3><div class=card>Doanh thu: <b>${fm(S.rev)}</b><br>Chi mua đồ: ${fm(S.buy)} · Chi vật liệu: ${fm(S.mats)}<br>Lợi nhuận: <b>${fm(S.rev-S.buy-S.mats)}</b><br>Khách: ${S.cust} · Giao dịch: ${S.deals} · Đã sửa: ${S.fixed}<br>Mua vào: ${S.bought.join(', ')||'—'}<br>Bán ra: ${S.sold.join(', ')||'—'}<br>Đánh giá TB: ⭐${summ.avg} · Uy tín: ${summ.dr>=0?'+':''}${summ.dr}</div><button class="big" onclick="newDay()">🌅 Sang ngày mới</button>`;
if(confirmC)return`<h3>🌙 Đóng cửa?</h3><p>Bạn chắc chắn muốn đóng cửa?</p><button class="big red" onclick="closeDay()">Đóng cửa & tổng kết</button><button class="big" onclick="confirmC=false;rd()">Ở lại mở tiếp</button>`;
if(!G.open)return`<h3>📅 Ngày ${G.day} · ${LV[G.lv-1][0]}</h3><p>${et()}</p>${G.notes.map(n=>'<p>📒 '+n+'</p>').join('')}<button class="big" onclick="openShop()">🚪 MỞ CỬA</button><p><small>Mẹo: đặt giá bán trong Kho và trưng bày đồ lên tủ để khách mua.</small></p>`;
if(!cur)return`<h3>🚪 Tiệm đang mở</h3><p>${queue.length?'Khách đang bước vào...':'Chưa có khách. Đợi một chút nhé...'} (${S.cust} khách hôm nay)</p><button class="big red" onclick="confirmC=true;rd()">🌙 ĐÓNG CỬA</button>`;
const q=cur,i=q.item;let h=`<b>${q.npc.n}</b><span class=ln>“${q.line}”</span>`;
if(q.kind=='fix'){const t=T[i.type],rc=Object.entries(t.m).map(([k,n])=>`${M[k][0]}${M[k][1]} ${G.mats[k]||0}/${n}`).join(' · ');h+=`<div class=card>${i.icon} <b>${i.name}</b> · Tình trạng ${i.cond}% (hỏng)<br><small>Cần: ${rc}</small><br>Giá tham khảo: ~${fm(fixAsk(i,est(i),1))}</div><div>Phí sửa: <input id=pr readonly inputmode=none value=${q.def} onclick=openPad()>k <button onclick=offer()>Báo giá</button><button class=red onclick=refuse()>Từ chối</button></div>`}else if(q.kind=='sell'||q.kind=='pawn')h+=`<div class=card>${i.icon} <b>${i.name}</b> · Tuổi ${i.age} · Tình trạng ${i.cond}%${i.known?(i.fake?' · ⚠️ HÀNG GIẢ':i.rare?' · 💎 ĐỒ HIẾM':' · ✅ Bình thường'):''}<br>Giá thị trường${i.known?'':' (ước)'}: <b>${fm(vis(i))}</b> · Khách mong muốn: <b>${fm(q.ask)}</b></div><div class=deal><span>${q.kind=='pawn'?'Cho vay':'Giá'}</span> <input id=pr readonly inputmode=none value=${q.def} onclick=openPad()><span>k</span>${q.kind=='pawn'?`<select id=tmd onchange=pv()><option>3<option>5<option>7</select>`:''}<button onclick=offer()>Trả giá</button><button onclick=appr() ${i.known?'disabled':''}>Thẩm định</button><button class=red onclick=refuse()>Từ chối</button></div>${q.kind=='pawn'?'<small>Khách chuộc: <b id=rd></b></small>':''}`;
else h+=`<div class=card>${i.icon} <b>${i.name}</b> · ${i.cond}% · Giá tiệm: <b>${fm(i.price)}</b> · Vốn: ${fm(i.cost)}</div>`+(q.s=='ok'?`<button onclick=bAccept()>💰 Bán giá ${fm(i.price)}</button>`:q.s=='hag'?`<button onclick=bAccept()>Đồng ý ${fm(q.wtp)}</button><button class=red onclick=bRefuse()>Giữ giá</button>`:`<button onclick=bRefuse()>Thôi vậy</button>`);
return h}
function invH(){const cap=LV[G.lv-1][2],sl=LV[G.lv-1][3];let h=`<h3>📦 Kho ${G.inv.length}/${cap} · Trưng bày ${G.inv.filter(i=>i.shown).length}/${sl}</h3>`;if(!G.inv.length)h+='<p>Kho trống. Hãy mua đồ từ khách!</p>';
G.inv.forEach(i=>{h+=`<div class=row><div>${i.icon} <b>${i.name}</b> ${i.cond}% ${i.known?(i.fake?'⚠️Giả':QL(i)):''}<br><small>Vốn ${fm(i.cost)} · Thị trường ${fm(vis(i))}${i.known?'':'*'} · sửa ${i.repairs} lần</small></div><div>${i.cust?'<small>🔧 Đồ khách · phí '+fm(i.fee)+'</small>':''}<span style="${i.cust?'display:none':''}">Bán <input class=pin readonly inputmode=none value=${i.price||r10(vis(i)*1.15)} data-id=${i.id} onclick=openPad(this)><button onclick="tg(${i.id})">${i.shown?'Cất':'Trưng bày'}</button>${i.known?'':`<button onclick="ap(${i.id})">🔎</button>`}</span></div></div>`});return h+'<small>* Giá ước tính. Thẩm định để biết hàng giả/hiếm. Đặt giá cao: lãi cao nhưng khó bán.</small>'}
function wkH0(){if(G.lv<2)return'<h3>🛠️ Xưởng</h3><p>Chưa có xưởng. Nâng cấp tiệm lên cấp 2 để mở bàn sửa!</p>';
if(working){const p=working.step/working.steps.length*100;return`<h3>🔧 Đang sửa ${working.it.icon} ${working.it.name}</h3><div class=bar><i style="width:${p}%"></i></div><p>${working.steps.map((s,k)=>(k<working.step?'✅':k==working.step?'🔧':'⬜')+' '+s).join('<br>')}</p>`}
let h='<h3>🛠️ Xưởng sửa chữa</h3>',l=G.inv.filter(i=>i.cond<98);if(!l.length)h+='<p>Không có món nào cần sửa.</p>';
l.forEach(i=>{const t=T[i.type];let ok=true;const rc=Object.entries(t.m).map(([k,n])=>{const has=G.mats[k]||0;if(has<n)ok=false;return`${M[k][0]} ${M[k][1]}: ${has}/${n} ${has>=n?'✅':'❌'}`}).join(' · ');h+=`<div class=row><div>${i.icon} <b>${i.name}</b> ${i.cond}%<br><small>${rc}</small></div><button ${ok?'':'disabled'} onclick="repair(${i.id})">${G.staff&&G.staff.mech?'Nhờ sửa':'Sửa'}</button></div>`});return h}
function shopH(){let h='<h3>🏬 Cửa hàng vật liệu</h3>';for(const k in M)h+=`<div class=row><div>${M[k][0]} ${M[k][1]} · ${fm(M[k][2])} · có <b>${G.mats[k]||0}</b></div><div><button onclick="buyM('${k}',1)">+1</button><button onclick="buyM('${k}',5)">+5</button></div></div>`;return h}
function revH(){let h='<h3>⭐ Đánh giá</h3><div>'+[0,5,4,3,2,1].map(s=>`<button onclick="rf=${s};rd()" ${rf==s?'disabled':''}>${s?s+'★':'Tất cả'}</button>`).join('')+'</div>';G.rev.forEach((r,i)=>{if(rf&&r.s!=rf)return;h+=`<div class=card>${'⭐'.repeat(r.s)} <b>${r.n}</b> <small>Ngày ${r.d}${r.it?' · '+r.it:''}</small><br>“${r.t}”`+(r.rp?`<br>↳ Bạn: “${r.rp}”<br>↳ ${r.n}: “${r.ans}”`:`<br><input class=w id=rp${i} placeholder="Viết phản hồi…" enterkeyhint=send autocomplete=off><button onclick="reply(${i})">Gửi</button>`)+'</div>'});return h+(G.rev.length?'':'<p>Chưa có đánh giá nào.</p>')}
function upH0(){let h='<h3>🏗️ Nâng cấp tiệm</h3><p>Hiện tại: <b>'+LV[G.lv-1][0]+'</b></p>';const n=LV[G.lv],inf=['','Mở xưởng sửa chữa, tủ kính 4 chỗ, kho 14, thảm & bàn thợ.','Tiệm đồ cổ: tủ 6 chỗ, kho 24, nhiều đồ hiếm hơn, tranh & bục trưng bày.','Phòng thẩm định riêng: thẩm định gần như tức thì, kho 30, tủ 8 chỗ.','Khu đồ quý: tủ 10 chỗ, kho 40, nhiều đồ hiếm và khách giàu hơn.','Nhà đấu giá: kho 60, tủ 14 chỗ, mở đấu giá đồ trong Kho.'];return h+(n?`<div class=card><b>${n[0]}</b> · ${fm(n[1])}<br>${inf[G.lv]}</div><button class=big ${G.money>=n[1]?'':'disabled'} onclick=upg()>🏗️ Nâng cấp</button>`:'<p>Đã đạt cấp cao nhất hiện có! 🏆</p>')}
function bookH0(){return`<h3>📒 Sổ sách</h3><div class=card>Hôm nay — Thu: ${fm(S.rev)} · Chi: ${fm(S.buy+S.mats)}<br>Tổng — Thu: ${fm(G.tot.rev)} · Chi: ${fm(G.tot.cost)}<br>Lợi nhuận: <b>${fm(G.tot.rev-G.tot.cost)}</b></div><h3>📒 Sổ cầm đồ</h3>${G.pawns.map(p=>`<div class=row>${p.item.icon} ${p.item.name} · ${p.npc.n}<small>vay ${fm(p.loan)} · chuộc ${fm(p.redeem)} · hạn ngày ${p.due}</small></div>`).join('')||'<p>Chưa có hợp đồng.</p>'}<h3>📖 Nhật ký</h3>`+(G.log.slice(0,10).map(l=>`<div class=row>${l}</div>`).join('')||'<p>Chưa có nhật ký.</p>')}


const am=()=>G.lv>=4?1:Math.max(5,15-5*(G.tl.lup-1)),promM=()=>(G.day<=G.pm.until?G.pm.mul:1)*(G.pm.neon?1.15:1);
const CR=[['gear',{metal:1},2,1],['screw',{metal:1},4,1],['cap',{wire:1,metal:1},1,2],['part',{wire:1,cap:1},1,3],['glue',{wood:1,oil:1},2,1],['string',{wire:1,metal:1},2,2],['oil',{cotton:1,wood:1},2,2]],TL=[['scr','🪛','Tua vít','+4% chất lượng sửa/cấp'],['pli','🔧','Kìm','sửa nhanh hơn, mở công thức chế tạo'],['lup','🔬','Kính lúp','thẩm định nhanh hơn'],['sol','🔥','Mỏ hàn','20%/cấp hoàn lại 1 vật liệu khi sửa'],['pol','🧽','Bộ đánh bóng','+3% chất lượng sửa/cấp']];
function craft(i){const c=CR[i];if(G.tl.pli<c[3])return;for(const k in c[1])if((G.mats[k]||0)<c[1][k])return;for(const k in c[1])G.mats[k]-=c[1][k];G.mats[c[0]]=(G.mats[c[0]]||0)+c[2];snd('done');rd()}
function upTool(k){const l=G.tl[k],c=500*l;if(l>=3||G.money<c)return;G.money-=c;G.tot.cost+=c;G.tl[k]++;snd('up');rd();ui()}
function promo(k){const P={f:[200,2,1.35],a:[600,3,1.7]};if(k=='n'){if(G.pm.neon||G.money<1500)return;G.money-=1500;G.tot.cost+=1500;G.pm.neon=1}else{const p=P[k];if(G.money<p[0])return;G.money-=p[0];G.tot.cost+=p[0];G.pm.until=G.day+p[1]-1;G.pm.mul=p[2]}snd('coin');rd();ui()}
function claim(i){const q=G.q[i],r=q.rw;if(q.done||Math.min(qp(q),q.n)<q.n)return;q.done=true;G.money+=r.m||0;G.rep=cl(G.rep+(r.r||0),0,100);if(r.mat)G.mats[r.mat]=(G.mats[r.mat]||0)+2;snd('star');rd();ui()}
function wkH(){const b=wkH0();if(G.lv<2||working)return b;
return b+'<br><b>⚙️ Bàn chế tạo</b>'+CR.map((c,i)=>{const ok=G.tl.pli>=c[3]&&Object.keys(c[1]).every(k=>(G.mats[k]||0)>=c[1][k]);return`<div class=row><div>${Object.entries(c[1]).map(([k,n])=>M[k][0]+M[k][1]+'×'+n+' ('+(G.mats[k]||0)+')').join(' + ')} → ${M[c[0]][0]}${M[c[0]][1]}×${c[2]}</div><button ${ok?'':'disabled'} onclick="craft(${i})">${G.tl.pli<c[3]?'🔒 Kìm '+c[3]:'Chế'}</button></div>`}).join('')+'<br><b>🧰 Dụng cụ</b>'+TL.map(t=>{const l=G.tl[t[0]];return`<div class=row><div>${t[1]} ${t[2]} cấp ${l}<br><small>${t[3]}</small></div><button ${l>=3||G.money<500*l?'disabled':''} onclick="upTool('${t[0]}')">${l>=3?'Tối đa':'Nâng '+fm(500*l)}</button></div>`}).join('')}
function upH(){return upH0()+`<h3>📣 Quảng bá</h3><small>${G.day<=G.pm.until?'Đang chạy quảng bá đến hết ngày '+G.pm.until:'Chưa có chiến dịch'}${G.pm.neon?' · Biển neon: bật':''}</small><div class=row><div>Tờ rơi (2 ngày, +35% khách)</div><button onclick="promo('f')">200k</button></div><div class=row><div>Quảng cáo (3 ngày, +70%)</div><button onclick="promo('a')">600k</button></div><div class=row><div>Biển neon (vĩnh viễn, +15%)</div><button ${G.pm.neon?'disabled':''} onclick="promo('n')">1.500k</button></div>`}
function bookH(){let h='<h3>🎯 Nhiệm vụ ngày</h3>';G.q.forEach((q,i)=>{const p=Math.min(qp(q),q.n);h+=`<div class=row><div>${q.d} <small>(${p}/${q.n}) · ${qr(q)}</small></div>${q.done?'✅':`<button ${p>=q.n?'':'disabled'} onclick="claim(${i})">Nhận</button>`}</div>`});
return h+bookH0()+'<p><button class=red onclick="if(confirm(\'Xóa save và chơi lại?\')){try{localStorage.removeItem(\'tcd1\')}catch(e){}location.reload()}">🗑️ Chơi lại</button></p>'}
let oe='',oeT=0;const nm=()=>(G.name||'TIỆM CẦM ĐỒ').toUpperCase(),et=()=>ev.t.replace(/#/g,G.hot&&T[G.hot]?T[G.hot].n.toLowerCase():'đồ');document.title=G.name||'Tiệm Cầm Đồ';
LV.push(['🔎 Phòng thẩm định',15000,30,8],['💎 Khu đồ quý',30000,40,10],['🏛️ Nhà đấu giá',60000,60,14]);
EV.push({t:'Có người đang săn # cũ, giá # đang lên!',m:1.2,sb:.85,hot:1},{t:'Chợ đồ cũ họp ở khu phố, có thể gặp món hời.',m:1.3,sb:.9,deal:1},{t:'Ngày đoàn tụ, nhiều người tìm đồ cũ mang kỷ niệm.',m:1.4,sb:.4},{t:'Dịch cúm lan, người dân hạn chế ra ngoài.',m:.4});
function toast(t){const e=$('#toast');e.textContent=t;e.style.opacity=1;clearTimeout(toast.h);toast.h=setTimeout(()=>e.style.opacity=0,4500)}
const bst=(m,d)=>{G.bs={m,u:G.min+d}},ad=n=>{G.money=Math.max(0,G.money+n);if(n>0){G.tot.rev+=n;S.rev+=n}else{G.tot.cost-=n;S.mats-=n}};
const SU=[['💸 Bạn nhặt được ví rơi trước tiệm, trả lại và được thưởng 150k.',()=>ad(150)],['🥷 Trộm vặt lẻn vào tiệm, mất 200k tiền lẻ!',()=>ad(-200)],['🚌 Đoàn du lịch dừng ở đầu phố, khách đổ về đông!',()=>bst(2.5,120)],['⚡ Cúp điện cả khu, phố vắng hẳn.',()=>bst(.25,90)],['🚰 Ống nước vỡ, thợ sửa hết 250k.',()=>ad(-250)],['📱 Blogger review tiệm! +3 uy tín, khách kéo đến.',()=>{G.rep=cl(G.rep+3,0,100);bst(2,120)}],['🌧️ Mưa rào bất chợt, khách thưa hẳn.',()=>bst(.4,80)],['🕵️ Có tin đồn tiệm bán hàng giả, uy tín tụt nhẹ.',()=>{G.rep=cl(G.rep-3,0,100);bst(.6,90)}],['🎁 Khách quen tặng bạn ít vật liệu.',()=>['screw','oil','thread'].forEach(k=>G.mats[k]=(G.mats[k]||0)+2)],['🎉 Có đám cưới gần tiệm, người qua lại đông vui!',()=>bst(1.8,100)]];
function sudden(){const e=pick(SU);toast(e[0]);snd('star');e[1]();ui()}
function mkUpd(){for(const k in T){const o=G.mk[k]||1;G.mh[k]=o;G.mk[k]=cl(o*(.86+Math.random()*.28)+(1-o)*.12,.6,1.9)}G.hot=null;if(ev.hot){G.hot=pick(Object.keys(T));G.mk[G.hot]=cl(G.mk[G.hot]*1.5,.6,2.2)}}
/* newDay wrapper removed — hooks via processXxxDay */
const _ar=addRev;addRev=function(q,s,t){_ar(q,s,t);q.em=s>=4?'happy':s==3?'':s==2?'sad':(Math.random()<.5?'angry':'cry');oe=s>=4?'happy':s<=2?'sad':'';oeT=Date.now()+2500};
const _an=angry;angry=function(m){const q=cur;_an(m);q.em='angry'};
const _sp=spawn;spawn=function(){const n=queue.length;_sp();if(queue.length>n){const q=queue[queue.length-1];q.em=q.kind=='pawn'||q.kind=='fix'?'sad':q.npc.ask>=1.05?'angry':''}};
setInterval(()=>{if(oe&&Date.now()>oeT)oe=''},300);

/* === [moved to modules: lines 256-256] === */
const _inv=invH;invH=function(){let h=_inv();if(G.lv>=6)h+='<h3>🔨 Nhà đấu giá</h3><small>Phí 5%, giá chốt ngẫu nhiên 90–160% giá trị thật.</small>'+G.inv.filter(i=>!i.cust).map(i=>`<div class=row><div>${i.icon} ${i.name} ${i.cond}%</div><button onclick="auc(${i.id})">Đấu giá</button></div>`).join('');return h};
function auc(id){const i=G.inv.find(x=>x.id==id);if(!i)return;const p=r10(tv(i)*(.9+Math.random()*.7)*.95);G.inv.splice(G.inv.indexOf(i),1);ad(p);S.sold.push(i.name);snd('coin');const bad=i.fake&&!i.known;if(bad)G.rep=cl(G.rep-4,0,100);toast('🔨 '+i.name+' chốt '+fm(p)+(bad?' (hàng giả bị lộ, uy tín tụt!)':''));rd();ui()}
function rename(){const v=$('#sn').value.replace(/[<>"&]/g,'').trim().slice(0,22);G.name=v||'Tiệm Cầm Đồ';document.title=G.name;snd('star');toast('🏷️ Biển hiệu mới: '+nm());save();rd()}
const _bk=bookH;bookH=function(){return'<h3>🏷️ Tên tiệm</h3><input class=w id=sn maxlength=22 value="'+(G.name||'Tiệm Cầm Đồ').replace(/"/g,'')+'"><button onclick="rename()">Đổi</button>'+_bk()};
/* ===== nhạc lofi ===== */
let mus=(()=>{try{return localStorage.getItem('tcd_mus')!='0'}catch(e){return true}})(),MG,NB,mtim,mnext=0,mstep=0,musOn=0;
const CH=[[50,53,57,60],[55,59,62,65],[48,52,55,59],[57,60,64,67]],BS=[38,43,36,33],PN=[69,72,74,76,79],mf=m=>440*Math.pow(2,(m-69)/12);
$('#tm6').textContent=mus?'🎶':'🔕';
function mo(f,type,t0,d,g,fl){const os=AC.createOscillator(),v=AC.createGain(),lp=AC.createBiquadFilter();os.type=type;os.frequency.value=f;lp.type='lowpass';lp.frequency.value=fl;v.gain.setValueAtTime(0,t0);v.gain.linearRampToValueAtTime(g,t0+Math.min(.08,d/3));v.gain.exponentialRampToValueAtTime(.0001,t0+d);os.connect(lp);lp.connect(v);v.connect(MG);os.start(t0);os.stop(t0+d+.05)}
function mn(t0,d,g,type,fr){const sr=AC.createBufferSource(),v=AC.createGain(),f=AC.createBiquadFilter();sr.buffer=NB;f.type=type;f.frequency.value=fr;v.gain.setValueAtTime(g,t0);v.gain.exponentialRampToValueAtTime(.0001,t0+d);sr.connect(f);f.connect(v);v.connect(MG);sr.start(t0,Math.random());sr.stop(t0+d+.02)}
function mplay(st,t){const s8=st%8,bar=(st>>3)%4,ch=CH[bar],T0=t+(s8%2?.05:0);
if(s8==0){ch.forEach(m=>mo(mf(m),'triangle',t,3.3,.035,900));mo(mf(BS[bar]),'sine',t,1.7,.16,300)}
if(s8==6)mo(mf(BS[bar]),'sine',T0,.8,.12,300);
if(s8==0||s8==5){const o=AC.createOscillator(),v=AC.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);v.gain.setValueAtTime(.35,t);v.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(v);v.connect(MG);o.start(t);o.stop(t+.3)}
mn(T0,.05,.025,'highpass',7000);if(s8==4)mn(T0,.18,.07,'bandpass',1800);if(Math.random()<.25)mn(t+Math.random()*.4,.012,.05,'highpass',3000);
if(Math.random()<.32)mo(mf(pick(PN)+(Math.random()<.2?12:0)),'sine',T0,1.1,.05,2000)}
function msch(){if(!AC||!mus)return;if(mnext<AC.currentTime-.5)mnext=AC.currentTime+.05;while(mnext<AC.currentTime+.3){mplay(mstep,mnext);mnext+=.4167;mstep++}}
function musStart(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();if(!MG){MG=AC.createGain();MG.connect(AC.destination);NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}MG.gain.value=mus?.55:0;if(!mtim){mnext=AC.currentTime+.1;mtim=setInterval(msch,120)}musOn=1}catch(e){}}
function musTog(){mus=!mus;try{localStorage.setItem('tcd_mus',mus?1:0)}catch(e){}$('#tm6').textContent=mus?'🎶':'🔕';if(mus)musStart();else if(MG)MG.gain.value=0}
document.addEventListener('pointerdown',()=>{if(mus&&!musOn)musStart()});
document.addEventListener('visibilitychange',()=>{if(AC&&musOn)document.hidden?AC.suspend():AC.resume()});
/* ===== đánh giá & phản hồi ===== */
RV[5].push('Mua được món ngon giá hời, chủ tiệm nói chuyện dễ mến cực!','Tiệm nhỏ mà có tâm, đáng để quay lại nhiều lần.','Chủ tiệm biết nghề, không chém đẹp. Chấm điểm tuyệt đối!','Sạch sẽ gọn gàng, mèo trong tiệm còn dễ thương nữa. 5 sao!');
RV[4].push('Giá ổn, chủ tiệm hơi lạnh lùng nhưng được việc.','Hàng ok, chỉ mong mặc cả thoải mái hơn.','Lần sau sẽ ghé, trừ một sao vì chờ hơi lâu.');
RV[3].push('Bình thường, chẳng có gì để khen mà cũng chẳng có gì để chê.','Tiệm ổn, giá mà chủ tiệm cười nhiều hơn thì tốt.');
RV[2].push('Chủ tiệm trả giá như đang bố thí, buồn ghê.','Hơi thất vọng, tưởng tiệm tử tế hơn.','Mặc cả mà như đi xin, không thoải mái chút nào.');
RV[1].push('Tệ vãi! Trả giá như đi cướp, không bao giờ quay lại.','Chủ tiệm nhìn đồ người ta như nhìn rác, đau lòng ghê!','Cái tiệm ép giá không thương tiếc, toang thật sự!');
RV.k=['Khen tiệm này "chuyên nghiệp" thì hơi quá, "chuyên chém" thì đúng hơn.','Chủ tiệm định giá bằng cách nhắm mắt bấm số à? Tiệm 5 sao mà giá 1 sao.','Ở đây chỉ có mỗi con mèo là đáng tiền thôi.','Cảm ơn chủ tiệm đã dạy tôi một bài học: đừng bao giờ vào đây nữa.','Tiệm này chắc mở để làm từ thiện cho chính chủ tiệm.','Nhìn cách chủ tiệm định giá mới hiểu vì sao phố này vắng khách.'];
RV.x=['Trả có chừng đó mà cũng mở miệng được, chặt chém vừa thôi bạn ơi!','Giá này là giá gì vậy trời, xỉu ngang luôn!','Ăn tiền người nghèo như vậy, coi chừng có ngày quả báo, tôi nhớ mặt rồi đấy.','Mình mà còn thấy tiệm này mở cửa là mình đi kể cả phố nghe luôn!','Mất thời gian vãi, lần sau đừng để tôi gặp lại cái mặt chủ tiệm.','Quá đáng thật sự, ép giá người ta như ép chanh. Đợi đấy!'];
const TP={5:[i=>`${i} đúng như mô tả, chủ tiệm tư vấn nhiệt tình!`,i=>`Rất ưng ${i} này, cảm ơn chủ tiệm nhiều.`],4:[i=>`${i} ổn, giá tạm được.`],3:[i=>`${i} thì cũng thường thôi.`],2:[i=>`Giao dịch ${i} làm tôi hơi buồn.`],1:[i=>`${i} gì mà giao dịch tệ thế, coi như vứt tiền!`,i=>`Vì cái ${i} mà bị đối xử như vậy, không bao giờ quay lại.`]};
const _ar2=addRev;addRev=function(q,s,t){_ar2(q,s,t);const r=G.rev[0],n=q.npc,ag=n.ask>=1.05||n.flex>=.88;r.it=q.item?q.item.icon+' '+q.item.name:'';if(!t){if(q.item&&Math.random()<.4)r.t=pick(TP[s])(q.item.name);else if(s<=2&&Math.random()<(ag?.6:.3))r.t=pick(RV.x);else if(s<=3&&s>=2&&Math.random()<.35)r.t=pick(RV.k)}};
const BADR=/(^|[\s,.!?])(đm|đmm|dm|vcl|vl|đéo|cc|ngu|biến|cút|khùng|điên|câm|chó)($|[\s,.!?])|khốn|mất dạy|mẹ mày|đồ rác|đồ ngu/i,SARR=/khịa|tiếc nhỉ|thế á|haha|hihi|kệ|tùy|ai cần|thích thì|chê thì|đừng đến|khỏi quay lại|xời|ok bạn|giỏi nhỉ|hay nhỉ|nghèo|rẻ tiền/i;
const RA=['Mày vừa nói cái gì? Ra đây nói lại tao nghe!','Chủ tiệm mà ăn nói như vậy à? Đợi đấy, tôi làm um lên cho cả phố biết!','Trời ơi, thái độ đó mà cũng đòi mở tiệm? Coi chừng tôi quay lại.','Tiệm chửi khách thì đóng cửa sớm đi là vừa. Tôi sẽ đi kể khắp nơi.','Ăn nói như vậy thì ngủ cho cẩn thận nhé, tôi nhớ mặt rồi đấy.'],RS=['Ồ, chủ tiệm khịa tôi à? Giỏi lắm, mai tôi khịa lại cả phố.','Nói đểu vừa thôi, tôi không rảnh nghe mấy câu đó.','Haha, đúng là tiệm có tâm nhỉ, tâm bằng hạt cát.','Câu trả lời này chắc để dành khoe lên bảng hiệu nhỉ?','Khịa tôi hả? Để xem tiệm này sống được bao lâu.'],RG=['Ừ, cảm ơn chủ tiệm. Lần sau mình sẽ ghé nữa.','Cảm ơn chủ tiệm đã phản hồi, mình hiểu rồi.','Thái độ tử tế đấy, mình sẽ giới thiệu bạn bè.'],RH=['Xin lỗi thì cũng muộn rồi, nhưng thôi tôi bỏ qua lần này.','Hừ, nói nghe cũng lọt tai. Lần sau liệu hồn đấy.'],RN=['Trả lời cho có lệ vậy thôi à?','Ừ, thế thôi. Đừng mong tôi quay lại.','Nói cho xong chuyện chứ gì, tôi biết rồi.'],RM=['Ừ, mình hiểu.','Ok, cảm ơn nhé.'];
reply=function(i){const t=$('#rp'+i).value.trim();if(!t)return;const r=G.rev[i],n=r.npc,ag=n.ask>=1.05||n.flex>=.88,bad=BADR.test(t),sar=!bad&&SARR.test(t),good=!bad&&!sar&&/(cảm ơn|xin lỗi|hoan nghênh|quay lại|mong|chúc|rất tiếc|thân|hoàn tiền|gửi lời)/i.test(t);r.rp=t;
if(bad){r.ans=pick(ag?RA.concat(RA):RA);n.aff-=3;G.rep=cl(G.rep-4,0,100);(G.thr=G.thr||[]).push(n.n);snd('bad')}
else if(sar){r.ans=pick(RS);n.aff-=2;G.rep=cl(G.rep-2,0,100);snd('bad')}
else if(good){r.ans=r.s<=2&&ag&&Math.random()<.3?pick(RH):pick(RG);n.aff+=2;G.rep=cl(G.rep+(r.s<=3?3:1),0,100)}
else r.ans=pick(r.s<=2?RN:RM);
rd();ui()};
/* newDay wrapper removed — hooks via processXxxDay */
/* ===== PATCH v3: độ khó, lịch, đánh giá, cài đặt, sự kiện ===== */
Object.values(M).forEach(m=>m[2]=r10(m[2]*1.5));
LV[1][1]=6000;LV[2][1]=18000;LV[3][1]=40000;LV[4][1]=80000;LV[5][1]=160000;
G.c=Object.assign({deals:0,fixed:0,rare:0,tax:0,rob:0},G.c);G.ach=G.ach||{};G.sched=G.sched||[];G.sec=G.sec||0;G.ltr=G.ltr||0;
const cn=k=>G.c[k]+((k=='deals'||k=='fixed')?(S[k]||0):0);
const _sv0=save;save=function(){if(!window.nosv)_sv0()};
/* ---- NPC: tính cách + người nổi tiếng ---- */
const STYM={'Minh (sinh viên)':'hai','Bác Tư':'hien','Cô Lan':'hien','Hùng thương lái':'gh','Thảo':'hai','Ông Sáu (nóng tính)':'gh','Nam (khó tính)':'kho','Mai (sưu tầm)':'hien'};
NPCS.forEach(n=>n.sty=STYM[n.n]);
[{n:'Jack 5 Trịu',col:'#d0308a',hair:'#111',ask:1.15,flex:.8,sty:'hai',say:'Đồ này anh bán, giá 5 triệu... nhầm, giá em tự xem!',cat:['Cho xin 5 triệu... à nhầm 5 sao.','Không phải tiệm nào cũng được Jack ghé đâu nhé.']},
{n:'Trườn Gian',col:'#e07020',hair:'#222',ask:1.05,flex:.75,sty:'hai',say:'Ê chủ tiệm, xem giùm anh món này, giá nào cũng phải hài hước nhé!',cat:['Chấm 5 sao, thêm cái bánh bao.','Tiệm này vui hơn chương trình của tui.']},
{n:'Sơn Thùng M-T-B',col:'#6a5acd',hair:'#a0c0ff',ask:1.3,flex:.92,sty:'kho',say:'Hãy để tôi xem giá. Đừng làm tôi thất vọng.',cat:['Chạy ngay đi, trước khi tôi đổi ý.']},
{n:'Độ Mixue',col:'#2a9a7a',hair:'#111',ask:.8,flex:.6,sty:'hien',say:'Ê, anh em xem cho tui món này, bán ủng hộ tiệm luôn!',cat:['Stream xong tui mời cả tiệm ly trà sữa!']},
{n:'Bà Phương Hàng',col:'#c03060',hair:'#e0d0c0',ask:1.2,flex:.9,sty:'gh',say:'Chủ tiệm có biết tôi là ai không? Định giá cho đàng hoàng!',cat:['Tôi sẽ live stream tiệm này cho cả nước xem!']},
{n:'Khá Bảng',col:'#404a50',hair:'#111',ask:1.2,flex:.9,sty:'gh',say:'Anh em cần bán món này gấp. Chủ tiệm biết điều thì trả giá cao vào.',cat:['Anh em đứng ngoài cửa đấy nhé.']},
{n:'Quang Lình Vlog',col:'#3a8a3a',hair:'#3a2a1a',ask:.85,flex:.6,sty:'hien',say:'Chào cả nhà, hôm nay mình ghé tiệm cầm đồ, xem giúp mình món này nha.',cat:['Đã thương thì thương cho trót, ghé tiệm hoài luôn!']}]
.forEach(n=>NPCS.push({...n,celeb:1,aff:0,visits:0}));
const _sp2=spawn;spawn=function(){const n=queue.length;_sp2();if(queue.length>n){const q=queue[queue.length-1];if(q.npc.celeb&&Math.random()<.74){queue.pop();S.cust--;q.npc.visits--}}};
/* ---- đánh giá ---- */
const STY={
hien:{5:['Chủ tiệm dễ thương, giá hợp lý, mình sẽ giới thiệu bạn bè!','Tiệm ấm cúng, mua bán công bằng. 5 sao xứng đáng!','Được chủ tiệm tư vấn tận tình, về nhà vẫn còn vui.'],4:['Ổn áp, giá được, mong lần sau giảm thêm chút.','Tiệm tốt, chỉ hơi tiếc về giá một tí.'],3:['Bình thường, tiệm sạch sẽ nhưng giá chưa thật ưng.','Không tệ, cũng chẳng có gì đặc biệt.'],2:['Hơi buồn vì bị trả giá thấp, mong chủ tiệm tâm lý hơn.','Mình hy vọng nhiều hơn ở tiệm này.'],1:['Thật sự thất vọng, chủ tiệm ép giá quá đáng. Mình sẽ không quay lại.','Bị đối xử như vậy mình buồn lắm, không bao giờ ghé nữa.']},
gh:{5:['Được, chủ tiệm biết điều. Khu này có gì anh em bảo kê cho!','Làm ăn tử tế, tao thích. Cần gì cứ alo, tao nhớ ơn.'],4:['Tạm được. Lần sau chơi đẹp hơn thì tao còn ghé.','Ok đấy, nhưng đừng nghĩ tao dễ dãi.'],3:['Thường thôi, không có gì để nói.','Ba sao. Đừng để tao phải đánh giá lại.'],2:['Giá này mà đòi qua mặt tao à? Lần sau liệu hồn nhé.','Trả thấp thế, mày coi thường tao đấy hả?'],1:['Mày biết bố mày là ai không mà dám ép giá? Đợi đấy!','Ăn tiền như cướp vậy trời! Tối nay ngủ ngon nhé, anh em ghé thăm.','Cái tiệm gì kỳ vậy, tao mà thấy còn mở cửa là tao làm to chuyện. Xỉu!','Trả giá kiểu này là toang rồi bạn ơi. Nhớ mặt tao đấy.']},
hai:{5:['Tiệm ngon như phở bò, chủ tiệm đẹp như hoa hậu (hơi xạo tí). 5 sao!','Vào bán đồ, ra được thêm tiền và nụ cười. Còn gì bằng!','Chủ tiệm là thánh mặc cả, tui lạy!'],4:['Giá ổn, chủ tiệm hài, chỉ thiếu ly cà phê miễn phí.','Bốn sao, một sao trừ vì không cho tui ôm con mèo.'],3:['Ba sao: một cho con mèo, một cho cái cửa, một cho hên xui.','Tiệm bình thường như cơm hộp văn phòng.'],2:['Chủ tiệm trả giá kiểu này chắc sợ tôi giàu. Buồn ghê.','Hai sao thôi, đồ tôi quý hơn giá chủ tiệm trả nhiều.'],1:['Một sao vì không thể cho âm. Trả giá như đi chợ chiều cuối tháng!','Trả giá mà như đi xin, đúng là đồ trời đánh luôn á!','Định giá kiểu gì mà như cái lỗ hổng vậy trời? Xỉu ngang!']},
kho:{5:['Hiếm có tiệm định giá đúng như vậy. Tôi khắt khe mà vẫn phải chấm 5.'],4:['Tạm chấp nhận, nhưng vẫn còn thiếu sót.'],3:['Giá và thái độ đều chưa đạt yêu cầu của tôi.'],2:['Thẩm định sơ sài, giá không hợp lý. Tôi đã cảnh báo rồi.'],1:['Tiệm thiếu chuyên nghiệp, tôi sẽ báo cơ quan chức năng và đăng khắp nơi!','Làm ăn kiểu này thì đóng cửa đi cho xong.']}};
const STL={hien:'Hiền lành',gh:'Giang hồ',hai:'Hài hước',kho:'Khó tính'};
const ED={d:{hien:['Cập nhật: nghĩ lại thấy tiệm không tôn trọng khách, xin hạ sao.'],gh:['Tao hạ sao rồi đấy, còn muốn gì nữa không? Hết nước chấm!'],hai:['Cập nhật: nghĩ lại vẫn tức, trừ thêm một sao coi như tiền lãi.'],kho:['Sau khi xem xét lại, tôi hạ đánh giá vì thái độ phục vụ kém.']},u:['Cập nhật: chủ tiệm chơi đẹp, mình tăng sao nhé!','Quay lại thấy ổn hơn, tăng sao cho xứng đáng!']};
const _ar4=addRev;addRev=function(q,s,t){_ar4(q,s,t);const r=G.rev[0],n=q.npc;if(!t&&STY[n.sty])r.t=pick(STY[n.sty][s])+(n.celeb&&Math.random()<.4?' '+pick(n.cat):'');if(n.celeb){G.rep=cl(G.rep+(s>=4?2:s<=2?-2:0),0,100)}};
const dk=c=>{const n=parseInt(c.slice(1),16);return'#'+[16,8,0].map(s=>Math.round(((n>>s)&255)*.66).toString(16).padStart(2,'0')).join('')};
revH=function(){let h='<h3>⭐ Đánh giá</h3><div>'+[0,5,4,3,2,1].map(s=>`<button onclick="rf=${s};rd()" ${rf==s?'disabled':''}>${s?s+'★':'Tất cả'}</button>`).join('')+'</div>';
G.rev.forEach((r,i)=>{if(rf&&r.s!=rf)return;const n=r.npc,c=dk(n?n.col:'#666666');h+=`<div class="card rv" style="border-left-color:${n?n.col:'#666'}"><b style="color:${c}">${n&&n.celeb?'🌟 ':''}${r.n}</b>${n&&STL[n.sty]?`<span class=tag style="color:${c}">${STL[n.sty]}</span>`:''} <small>· Ngày ${r.d}${r.it?' · '+r.it:''}</small><br>${'⭐'.repeat(r.s)}${r.ed?` <small style="color:${r.ed=='hạ'?'#a02020':'#2a7a20'}">✏️ đã sửa ${r.os}★→${r.s}★</small>`:''}<br><span style="color:${c}">“${r.t}”</span>`+(r.rp?`<br><b style="color:#2a6a20">↳ Bạn:</b> <span style="color:#2a6a20">“${r.rp}”</span><br><b style="color:${c}">↳ ${r.n}:</b> <span style="color:${c}">“${r.ans}”</span>`:`<br><input class=w id=rp${i} placeholder="Viết phản hồi…" enterkeyhint=send autocomplete=off><button onclick="reply(${i})">Gửi</button>`)+'</div>'});return h+(G.rev.length?'':'<p>Chưa có đánh giá nào.</p>')};
const _mh=mainH;mainH=function(){let h=_mh();if(cur&&mode=='main'&&!summ&&G.open&&!confirmC){const c=dk(cur.npc.col),n=cur.npc.n;h=h.replace('<b>'+n+'</b><span class=ln>',`<b style="color:${c}">${cur.npc.celeb?'🌟 ':''}${n}</b><span class=ln style="color:${c}">`)}return h};

/* === [moved to modules: lines 328-344] === */
/* ---- nâng cấp có điều kiện ---- */
const REQ={2:[['≥ 12 giao dịch',()=>cn('deals')>=12],['Uy tín ≥ 3,8★',()=>G.rep>=76]],3:[['≥ 6 lần sửa xong',()=>cn('fixed')>=6],['Bán 1 đồ hiếm',()=>G.c.rare>=1],['Đã chơi ≥ 8 ngày',()=>G.day>=8]],4:[['≥ 50 giao dịch',()=>cn('deals')>=50],['Uy tín ≥ 4,2★',()=>G.rep>=84],['Đóng thuế ≥ 1 lần',()=>G.c.tax>=1]],5:[['≥ 18 lần sửa',()=>cn('fixed')>=18],['Bán 4 đồ hiếm',()=>G.c.rare>=4],['≥ 6 thành tựu',()=>Object.keys(G.ach).length>=6]],6:[['≥ 120 giao dịch',()=>cn('deals')>=120],['Uy tín ≥ 4,6★',()=>G.rep>=92],['Bán 8 đồ hiếm',()=>G.c.rare>=8],['Đóng thuế ≥ 3 lần',()=>G.c.tax>=3]]};
const reqOk=()=>(REQ[G.lv+1]||[]).every(r=>r[1]());
const _u0=upH0;upH0=function(){let h=_u0();if(LV[G.lv]&&REQ[G.lv+1]){h+='<div class=card><b>📋 Điều kiện nâng cấp</b><br>'+REQ[G.lv+1].map(r=>(r[1]()?'✅ ':'❌ ')+r[0]).join('<br>')+'</div>';if(!reqOk())h=h.replace('onclick=upg()','disabled onclick=upg()')}return h};
const _upg=upg;upg=function(){if(!LV[G.lv]||!reqOk())return toast('🔒 Chưa đủ điều kiện nâng cấp!');_upg()};
const _uh=upH;upH=function(){return _uh()+'<h3>🛡️ An ninh</h3>'+(G.sec>=2?'<small>Đã có đủ camera và bảo vệ.</small>':`<div class=row><div>${SECN[G.sec][0]}<br><small>${SECN[G.sec][2]}</small></div><button ${G.money>=SECN[G.sec][1]?'':'disabled'} onclick=buySec()>${fm(SECN[G.sec][1])}</button></div>`)};
const _sd=sold;sold=function(q,p){const r=q.item&&q.item.rare&&!q.item.fake&&G.inv.includes(q.item);_sd(q,p);if(r)G.c.rare++};
/* ---- thành tựu ---- */
const ACH=[['first','🎬','Vụ đầu tiên','1 giao dịch',()=>cn('deals')>=1,{m:100}],['d50','🤝','Thương lái sành sỏi','50 giao dịch',()=>cn('deals')>=50,{m:800}],['d200','💼','Ông trùm khu phố','200 giao dịch',()=>cn('deals')>=200,{m:3000,r:3}],['fix10','🛠️','Bàn tay vàng','Sửa xong 10 món',()=>cn('fixed')>=10,{m:1000}],['rare3','💎','Mắt tinh đời','Bán 3 đồ hiếm',()=>G.c.rare>=3,{m:1500}],['day30','📅','Sống sót 30 ngày','Chơi tới ngày 30',()=>G.day>=30,{m:2000}],['tax3','🧾','Công dân gương mẫu','Đóng thuế 3 lần',()=>G.c.tax>=3,{m:500,r:3}],['rob','🥊','Không dễ bắt nạt','Đuổi cướp/giang hồ',()=>G.c.rob>=1,{m:600}],['cel','🌟','Tiệm có tiếng','Tiếp người nổi tiếng',()=>NPCS.some(n=>n.celeb&&n.visits>0),{m:800,r:2}],['star','⭐','Ngôi sao khu phố','Uy tín ≥ 4,8★',()=>G.rep>=96,{m:2000}],['rich','💰','Đại gia','Có 100.000k',()=>G.money>=100000,{m:5000}]];
setInterval(()=>{ACH.forEach(a=>{if(!G.ach[a[0]]&&a[4]()){G.ach[a[0]]=1;if(a[5].m)ad(a[5].m);if(a[5].r)G.rep=cl(G.rep+a[5].r,0,100);toast('🏆 Thành tựu: '+a[2]+'! +'+fm(a[5].m||0));snd('up');ui()}})},2500);
let achH=()=>'<h3>🏆 Thành tựu ('+Object.keys(G.ach).length+'/'+ACH.length+')</h3>'+ACH.map(a=>`<div class=row style="opacity:${G.ach[a[0]]?1:.55}"><div>${a[1]} <b>${a[2]}</b><br><small>${a[3]} · thưởng ${fm(a[5].m||0)}${a[5].r?' +'+a[5].r+' uy tín':''}</small></div>${G.ach[a[0]]?'✅':'🔒'}</div>`).join('');
const _bk2=bookH;bookH=function(){return schedH()+achH()+_bk2().replace(/<p><button class=red[\s\S]*$/,'')};
/* ---- qua ngày ---- */
/* _nd3 removed — logic moved into newDay + processEventDay/TaxDay */
/* ---- vẽ lại cây & hộp ---- */
function box(x,y,w,h){R(x,y,w,h,'#a9773f');R(x,y,w,2,'#c9975a');R(x,y+h-2,w,2,'#7a5028');R(x,y,2,h,'#7a5028');R(x+w-2,y,2,h,'#7a5028');R(x+2,y+(h>>1),w-4,1,'#8a5f30');R(x+(w>>1)-2,y,4,h,'#d8c08a')}
function crate(){R(256,134,54,3,'rgba(0,0,0,.3)');box(258,118,30,16);box(290,124,20,10);box(264,103,22,15);TX('FRAGILE',273,130,8,'#5a3a1a')}
function plant(){const sw=Math.round(Math.sin(performance.now()/900));R(6,171,18,2,'rgba(0,0,0,.28)');R(10,160,12,11,'#b5653a');R(8,160,16,3,'#cf7c4c');R(11,168,10,3,'#8c4a28');R(10,158,12,2,'#4a3020');R(15,150,2,9,'#3f7a3a');[[9,151,7],[17,150,7],[11,146,6],[16,144,6]].forEach((l,i)=>{const o=i%2?sw:-sw;R(l[0]+o,l[1],l[2],4,'#4c9a4c');R(l[0]+o,l[1],l[2],1,'#7acb6a')})}
/* ---- cài đặt ---- */
const V=(()=>{try{return Object.assign({m:1,s:1},JSON.parse(localStorage.getItem('tcd_v')))}catch(e){return{m:1,s:1}}})();
function applyVol(){if(MG)MG.gain.value=mus?.55*V.m:0;try{localStorage.setItem('tcd_v',JSON.stringify(V))}catch(e){}}
const _ms=musStart;musStart=function(){_ms();applyVol()};const _mt=musTog;musTog=function(){_mt();applyVol()};
snd=function(k){if(mute||!V.s)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();let t=AC.currentTime;SN[k].forEach(([f,d,w])=>{const o=AC.createOscillator(),v=AC.createGain();o.type=w||'triangle';o.frequency.value=f;v.gain.setValueAtTime(.12*V.s,t);v.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(v);v.connect(AC.destination);o.start(t);o.stop(t+d);t+=d*.9})}catch(e){}};
$('#top').insertAdjacentHTML('beforeend','<span id=tm7 onclick=openSet()>⚙️</span>');
function closeSet(){$('#set').style.display='none'}
function openSet(){let o=$('#set');if(!o){o=document.createElement('div');o.id='set';document.body.appendChild(o)}o.style.display='flex';
o.innerHTML=`<div class=box><h3>⚙️ Cài đặt</h3><div class=row>🎵 Nhạc nền <input type=range min=0 max=1 step=.05 value=${V.m} oninput="V.m=+this.value;applyVol()"></div><div class=row>🔊 Hiệu ứng <input type=range min=0 max=1 step=.05 value=${V.s} oninput="V.s=+this.value;applyVol()"></div><div class=row><button onclick="musTog();openSet()">${mus?'🎶 Tắt nhạc':'🎵 Bật nhạc'}</button><button onclick="mute=!mute;openSet()">${mute?'🔇 Bật tiếng':'🔊 Tắt tiếng'}</button></div><button class=big onclick="save();toast('💾 Đã lưu game!')">💾 Lưu game ngay</button><small>Chỉ tự lưu khi kết thúc ngày. Trên điện thoại, Tải file save mở bảng chia sẻ, chọn Lưu vào Tệp.</small><div class=row><button onclick="dlSave()">📤 Tải file save</button><button onclick="document.getElementById('svf').click()">📥 Nhập file save</button></div><input id=svf type=file accept=".json,application/json" style="display:none" onchange="fileSave(this)"><div class=row><button onclick=expS()>Sao chép mã</button><button onclick=impS()>Nhập mã</button></div><textarea id=sv placeholder="Mã save, hoặc dùng file ở trên"></textarea><button class="big red" onclick=resetG()>🗑️ Chơi lại từ đầu</button><button class=big onclick=closeSet()>Đóng</button></div>`}
function expS(){save();try{const raw=localStorage.getItem('tcd1')||'';$('#sv').value=btoa(unescape(encodeURIComponent(raw)));$('#sv').select();navigator.clipboard&&navigator.clipboard.writeText($('#sv').value).then(()=>toast('Đã chép mã save')).catch(()=>toast('Mã đã hiện, giữ để chép'))}catch(e){toast('Không xuất được mã')}}
function takeSave(s){const d=JSON.parse(s);if(!d||!d.G)throw 0;window.nosv=1;localStorage.setItem('tcd1',s);localStorage.setItem('tcd1_bak',s);location.reload()}
function impS(){try{const v=$('#sv').value.trim();takeSave(v.startsWith('{')?v:decodeURIComponent(escape(atob(v))))}catch(e){toast('❌ Mã save không hợp lệ')}}
async function dlSave(){save();const s=localStorage.getItem('tcd1')||'{}';const file=new File([s],'tiem-cam-do-save.json',{type:'application/json'});try{if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Save Tiệm Cầm Đồ'});toast('Chọn Lưu vào Tệp trong bảng chia sẻ');return}}catch(e){if(e&&e.name=='AbortError')return}const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'application/json'}));a.download='tiem-cam-do-save.json';document.body.appendChild(a);a.click();a.remove();if($('#sv')){$('#sv').value=s;$('#sv').select()}toast('Nếu không thấy file, giữ ô mã bên dưới để chép')}
function fileSave(el){const f=el.files&&el.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{takeSave(String(r.result))}catch(e){toast('❌ File save không hợp lệ')}};r.readAsText(f)}
function resetG(){if(confirm('Xóa save và chơi lại?')){window.nosv=1;try{localStorage.removeItem('tcd1')}catch(e){}location.reload()}}
/* ---- CSS ---- */
document.head.insertAdjacentHTML('beforeend','<style>#tm5,#tm6{display:none}#top{gap:6px;font-size:17px;background:linear-gradient(#5a3a20,#3f2712)}#tm7{cursor:pointer}#nav{background:linear-gradient(#5a3a20,#3a2410)}#nav button{border-radius:10px 10px 0 0}#nav button.on{background:#a2662a;box-shadow:inset 0 3px 0 #ffd27a}.card{border-radius:10px;box-shadow:0 2px 0 #2a1a0c33}#dlg{background:linear-gradient(#f6e8c8,#ead7ac)}#set{position:fixed;inset:0;background:#000a;display:none;align-items:center;justify-content:center;z-index:20}#set .box{width:min(92%,420px);max-height:88%;overflow:auto;background:#f6e8c8;border:4px solid #2a1a0c;border-radius:12px;padding:10px}#set input[type=range]{width:55%;padding:0}#set textarea{width:100%;height:46px;font:12px monospace;box-sizing:border-box}.rv{border-left:6px solid}.tag{font-size:14px;padding:0 6px;border-radius:8px;background:#0002;margin-left:4px}</style>');
genSched();{const a=actEv(G.day);if(a)ev=a}

/* ===== PATCH v4 ===== */
G.fx=G.fx||{ch:0,sg:0,tea:0};G.open=false;G.over=0;
const clp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* --- CSS: ô màu tách rời --- */
document.head.insertAdjacentHTML('beforeend',`<style>
h3{background:#8b5a2b;color:#fff3d6;padding:3px 8px;border-radius:8px}
.row{border:0!important;border-radius:10px;padding:6px 8px;margin:5px 0;box-shadow:0 3px 0 #0002}
.row:nth-child(4n+1){background:#ffe3b0}.row:nth-child(4n+2){background:#d8ecc0}.row:nth-child(4n+3){background:#c9e4f2}.row:nth-child(4n){background:#f2d0e0}
.msg{padding:5px 9px;border-radius:10px;margin:6px 0;border-left:7px solid;font-size:22px}
.ov{position:fixed;inset:0;z-index:30;background:#1c120b;color:#ffe9b0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;gap:14px}
.ov .em{font-size:90px;animation:zm 4s ease-out both}.ov p{font-size:26px;max-width:420px;animation:fd 1.2s both}
.bar1,.bar2{position:absolute;left:0;right:0;height:9%;background:#000}.bar1{top:0}.bar2{bottom:0}
@keyframes zm{from{transform:scale(.6);opacity:0}to{transform:scale(1.15);opacity:1}}@keyframes fd{from{opacity:0;transform:translateY(12px)}to{opacity:1}}
#tut{position:fixed;left:8px;right:8px;bottom:70px;z-index:25;background:#fff3d6;color:#3b2616;border:4px solid #2a1a0c;border-radius:12px;padding:8px;max-width:500px;margin:auto}
#nav button.hl{outline:4px solid #ffd27a;animation:fd .6s infinite alternate}
</style>`);
/* --- nhãn trên đầu --- */
const _dr=draw;draw=function(t){_dr(t);queue.forEach(q=>{const l=q.role||(q.npc.celeb?'Người nổi tiếng':'');if(!l)return;const c=q.rc||'#e0a000';TX(l,q.x+1,q.y-64,9,'#000');TX(l,q.x,q.y-65,9,c)})};
/* --- người nổi tiếng: hiếm, tăng theo uy tín & cấp --- */
const _sp3=spawn;spawn=function(){const n=queue.length;_sp3();if(queue.length>n){const q=queue[queue.length-1];if(q.npc.celeb&&Math.random()>(.03+G.rep/2000+.012*G.lv)/.48){queue.pop();S.cust--;q.npc.visits--}else if(!q.role)q.pat=(q.pat||3)+(G.fx.ch>=2?1:0)+(G.fx.ch>=4?1:0)}};
setInterval(()=>{if(G.open&&!cur&&mode=='main'&&!confirmC&&G.fx.sg&&Math.random()<.011*(.4+G.rep/100)*ev.m*.08*G.fx.sg)spawn()},150);
/* --- thẩm định thủ công bằng kính lúp --- */
appr=function(){const i=cur.item;if(i.known)return;cur.ap={b:i.fake?rnd(0,11):-1,h:i.rare&&!i.fake?rnd(0,11):-1,s:[],n:(G.lv>=4?9:5)+G.tl.lup-1};rd()};
function scan(k){const a=cur.ap;if(a.s.includes(k)||a.s.length>=a.n)return;a.s.push(k);G.min+=2;snd('click');const i=cur.item;if(k==a.b){i.known=true;cur.line='Ơ... sao anh/chị soi kỹ vậy?'}else if(k==a.h){i.known=true;cur.line='Anh/chị soi kỹ thật đấy.'}rd();ui()}
function endAp(){if(!cur.item.known)cur.line='(Soi mãi chưa thấy gì lạ... nhưng chưa chắc đã an toàn.)';cur.ap=null;rd()}
function apH(){const q=cur,a=q.ap,i=q.item;let c='';for(let k=0;k<12;k++)c+=a.s.includes(k)?`<div class=msg style="text-align:center;border-left-color:#888;background:${k==a.b?'#f6c0c0':k==a.h?'#c0e0f6':'#e0e0d0'}">${k==a.b?'⚠️':k==a.h?'💎':'✔️'}</div>`:`<button ${a.s.length>=a.n||i.known?'disabled':''} onclick=scan(${k})>🔍</button>`;
return`<b>🔎 Bàn thẩm định · ${i.icon} ${i.name}</b><div class=card>Di chuyển kính lúp, quét từng ô để tìm vết giả hoặc dấu hiệu đồ hiếm.<br>Còn <b>${a.n-a.s.length}</b> lần quét (mỗi lần tốn 2 phút).${i.known?'<br><b style="color:'+(i.fake?'#a02020':'#2a6ab0')+'">'+(i.fake?'⚠️ Phát hiện HÀNG GIẢ!':'💎 Đây là '+TN[tr(i)][0].toUpperCase()+'!')+'</b>':''}</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${c}</div><button class=big onclick=endAp()>${i.known?'Xong':'Kết luận'}</button>`}
/* --- mặc cả: khách có thể chốt ngay lần 1-2-3 --- */
const _of2=offer;offer=function(){const q=cur;if(q&&(q.kind=='sell'||q.kind=='pawn')){const v=+$('#pr').value,r=v/q.ask;if(v>=10&&v<=G.money&&r<1&&r>=.55&&Math.random()<clp((r-.5)*1.5+q.npc.aff*.02+.03*(G.fx.ch+G.fx.tea),0,.85))q.ask=v}_of2()};

/* === [moved to modules: lines 418-436] === */
/* --- màn hình tiệm nhiều màu --- */
const _mh3=mainH;mainH=function(){if(G.over)return'';if(cur&&mode=='main'&&G.open&&!summ&&!confirmC){if(cur.role)return roleH();if(cur.ap)return apH()}let h=_mh3();if(summ)return h+loanH();if(!G.open&&!confirmC){const C=t=>/thuế/.test(t)?'#7a2a9a':/thuê/.test(t)?'#b06010':/bão|mưa|cúm|điện/.test(t)?'#2a5aa0':/phim|du lịch|lễ|Tết|Trung thu|Giáng/.test(t)?'#c0306a':/nợ|🦈/.test(t)?'#8a2a8a':/Ngày mai/.test(t)?'#1a8a8a':'#2a7a3a';h=h.replace(/<p>(?!<small>)([\s\S]*?)<\/p>/g,(m,t)=>{const c=C(t);return`<div class=msg style="color:${c};border-left-color:${c};background:${c}1c">${t}</div>`});h=h.replace('<button class="big" onclick="openShop()">',loanH()+'<button class="big" onclick="openShop()">')}return h};
/* --- nâng cấp bàn ghế / biển hiệu / nước trà --- */
const FXL=[['ch','🪑','Bàn ghế','khách kiên nhẫn hơn, dễ chốt giá'],['sg','🪧','Biển hiệu','+8% lượng khách mỗi cấp'],['tea','🍵','Nước trà','khách dễ tính, mặc cả dễ hơn']];
function buyFx(k){const l=G.fx[k],c=r10(300*(l+1)*(1+.5*G.lv));if(l>=G.lv)return toast('🔒 Cần nâng cấp nhà trước (tối đa cấp '+G.lv+')');if(G.money<c)return;ad(-c);G.fx[k]++;snd('up');rd();ui()}
const _uh4=upH;upH=function(){return _uh4()+'<h3>🛋️ Nội thất</h3>'+FXL.map(f=>{const l=G.fx[f[0]],c=r10(300*(l+1)*(1+.5*G.lv));return`<div class=row><div>${f[1]} ${f[2]} · cấp ${l}/${G.lv}<br><small>${f[3]}</small></div><button ${G.money>=c&&l<G.lv?'':'disabled'} onclick="buyFx('${f[0]}')">${fm(c)}</button></div>`}).join('')};
const _bk3=bookH;bookH=function(){return loanH()+_bk3()};
/* --- phản hồi genZ phong phú --- */
RA.push('Bạn ơi tôi chụp màn hình rồi nha, lên MXH nhanh thôi!','Ăn nói vậy hả? Mai cả group review kín tiệm cho biết mặt.','Chửi khách à? Ghi vào sổ đen, cứ chờ đấy!','Cái mồm thì hay, coi chừng đá vào cửa tiệm đó nha.');
RS.push('Cạn lời luôn, tiệm này flop thật sự.','Ok fine, bạn nói gì cũng đúng, còn tôi thì không quay lại.','Khịa vừa thôi, bản đồ phố này tôi thuộc, bạn không thuộc đâu.','Đọc xong thấy cringe, chấm điểm tâm lý: âm điểm.');
RG.push('Xịn xò! Mình xin lỗi vì hơi gắt, ghé lại sau nha.','Ok bạn ơi, thân thiện quá, chốt là quay lại!','Phản hồi có tâm ghê, mình rút lại cơn giận rồi nè.');
RN.push('Rep cho có, bạn nghĩ tôi tin á?','Thôi khỏi, drama vừa vừa thôi.');
const POEM=['Chủ tiệm nhẹ giọng mấy câu,\nKhách đây cũng thấy nguôi nhanh ít nhiều.\nGiá cao giá thấp chẳng sao,\nMiễn là lời nói ngọt ngào là ưng.','Trời mưa tiệm vắng người qua,\nNghe lời phản hồi lòng ta dịu dàng.\nHôm nay giận nốt cho xong,\nMai sang mình ghé, xin đừng ép giá!','Sao chủ nói lời chân thành,\nLàm tôi cảm động, mối tình khách-tiệm.\nThơ này gửi tặng cho anh,\nGiảm giá cho tôi, tôi xin đền ơn.'];
const _rp3=reply;reply=function(i){_rp3(i);const r=G.rev[i];if(r&&r.ans&&r.rp&&!BADR.test(r.rp)&&Math.random()<.22){r.ans=pick(POEM).replace(/\n/g,' / ');rd()}};
/* --- màn hình đầu, cốt truyện, hướng dẫn --- */
const ST=[['🌧️🏚️','Cha bạn, chủ tiệm cầm đồ già nhất khu phố cũ, vừa qua đời trong một đêm mưa.'],['📜🐈','Ông để lại một căn tiệm dột nát, một chú mèo và hai tháng tiền thuê chưa trả.'],['💼➡️🔑','Bạn bỏ công việc văn phòng, quyết giữ lại tiệm, không để ký ức của cha bị bán rẻ.'],['💰⚖️','Mua rẻ, bán đắt, sửa đồ cũ... nhưng coi chừng thuế, giang hồ và những vị khách khó chịu.'],['🏛️✨','Hãy biến tiệm nhỏ thành nhà đấu giá lớn nhất phố!']];
function ovClose(){document.querySelectorAll('.ov').forEach(o=>o.remove())}
function startG(){ovClose();let seen=0;try{seen=localStorage.getItem('tcd_intro')}catch(e){}if(seen)return;story(1)}
const TS=[['Bấm 🚪 MỞ CỬA để bắt đầu ngày mới. Khách sẽ lần lượt vào tiệm.',0],['Khi khách bán đồ, bấm 🔎 Thẩm định rồi quét kính lúp từng ô để tìm hàng giả hoặc đồ hiếm.',0],['Trả giá: khách có thể chấp nhận ngay từ lần đầu nếu giá gần với mong muốn của họ.',0],['Vào 📦 Kho đặt giá và trưng bày để khách mua lại.',1],['Nhớ theo dõi 📅 thuế, giang hồ đòi bảo kê, và nâng cấp ở 🏗️. Hết tiền sẽ thua!',6]];
function tut(i){document.querySelectorAll('#nav button').forEach(b=>b.classList.remove('hl'));let t=$('#tut');if(t)t.remove();if(i>=TS.length)return;const b=document.querySelectorAll('#nav button')[TS[i][1]];if(b)b.classList.add('hl');t=document.createElement('div');t.id='tut';t.innerHTML=`<b>Hướng dẫn ${i+1}/${TS.length}</b><br>${TS[i][0]}<br><button onclick="tut(${i+1})">Tiếp</button><button class=red onclick="tut(99)">Bỏ qua</button>`;document.body.appendChild(t)}
showTitle();

rd();requestAnimationFrame(loop);

/* ===== v5 ===== */
const LI='<svg width=20 height=20 viewBox="0 0 12 12" style="vertical-align:-4px;shape-rendering:crispEdges"><circle cx=5 cy=5 r=3.6 fill="#bfe8ff" stroke="#2a1a0c" stroke-width=1.3 /><path d="M8 8l3.2 3.2" stroke="#8b5a2b" stroke-width=2 /><path d="M3.3 4.2a2.2 2.2 0 0 1 1.7-1.3" stroke="#fff" fill=none stroke-width=.8 /></svg>';
document.head.insertAdjacentHTML('beforeend','<style>body,#app,button,input,select,textarea{font-family:VT323,monospace}#dlg{font-size:21px;line-height:1.15;padding:10px 12px}#dlg h3{font-size:24px;margin:10px 0 6px;letter-spacing:.5px}#dlg small{font-size:16px}#dlg .row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;margin:6px 0}button{font-size:20px;padding:3px 10px;border-radius:8px}.chips{display:flex;gap:6px;margin:0 0 8px;position:sticky;top:-10px;background:#f6e8c8;padding:4px 0;z-index:2}.chips button{flex:1;font-size:17px;padding:2px 3px}.chips button.on{background:#2a1a0c;color:#ffd27a}.door{width:100%;padding:10px;border:4px solid #2a1a0c;border-radius:14px;background:linear-gradient(#7ac35a,#3f8a3a);color:#fff;box-shadow:0 5px 0 #1f4a1f,inset 0 3px 0 #b5f08a;animation:pl 1.6s infinite;display:flex;flex-direction:column;align-items:center;font-size:32px;margin:6px 0}.door small{font-size:17px;color:#e6ffd0}.door.red{background:linear-gradient(#e0705a,#a83a30);box-shadow:0 5px 0 #5a1a14,inset 0 3px 0 #ffb0a0;animation:none}@keyframes pl{50%{transform:scale(1.02);filter:brightness(1.15)}}.logo{font-size:52px;margin:6px 0;color:#ffd27a;text-shadow:3px 3px 0 #7a2a10,6px 6px 0 #2a1a0c}</style>');
const _bk5=bookH;bookH=()=>tabify(_bk5(),'bk');const _up5=upH;/* kính lúp soi dần */
apH=function(){const q=cur,a=q.ap,i=q.item;return`<b>${LI} Bàn thẩm định · ${i.icon} ${i.name}</b><div class=card>Rê kính lúp lên đồ vật, giữ yên một chút để soi kỹ từng vùng. Còn <b id=lc>${a.n-a.s.length}</b> lượt · mỗi vùng tốn 2 phút.<br><b id=lr>${i.known?(i.fake?'⚠️ HÀNG GIẢ!':'💎 ĐỒ HIẾM!'):''}</b></div><canvas id=lens width=320 height=180 style="width:100%;border:4px solid #2a1a0c;border-radius:10px;touch-action:none;background:#1c120b"></canvas><button class=big onclick=endAp()>${i.known?'Xong':'Kết luận'}</button>`};
function lensHit(k){const a=cur.ap,i=cur.item;if(a.s.includes(k)||a.s.length>=a.n)return;a.s.push(k);G.min+=2;snd('click');if(k==a.b){i.known=true;cur.line='Ơ... sao anh/chị soi kỹ vậy?';$('#lr').textContent='⚠️ Phát hiện HÀNG GIẢ!';snd('bad')}else if(k==a.h){i.known=true;cur.line='Anh/chị soi kỹ thật đấy.';$('#lr').textContent='💎 Đây là '+TN[tr(i)][0].toUpperCase()+'!';snd('star')}$('#lc').textContent=a.n-a.s.length;ui()}
function lensInit(){const cv=$('#lens'),x=cv.getContext('2d'),q=cur,a=q.ap,i=q.item,L={x:160,y:90,d:Array(12).fill(0)};a.s.forEach(k=>L.d[k]=99);
const pos=e=>{const r=cv.getBoundingClientRect(),t=e.touches?e.touches[0]:e;L.x=(t.clientX-r.left)*320/r.width;L.y=(t.clientY-r.top)*180/r.height;e.preventDefault()};['pointermove','pointerdown','touchmove','touchstart'].forEach(v=>cv.addEventListener(v,pos,{passive:false}));
const iv=setInterval(()=>{if(!$('#lens')||!cur||!cur.ap)return clearInterval(iv);const cx=Math.floor((L.x-40)/60),cy=Math.floor((L.y-15)/50),k=cx>=0&&cx<4&&cy>=0&&cy<3?cy*4+cx:-1;if(k>=0&&L.d[k]<25&&cur.ap.s.length<cur.ap.n&&!i.known){if(++L.d[k]>=25){L.d[k]=99;lensHit(k)}}
x.fillStyle='#241810';x.fillRect(0,0,320,180);x.fillStyle='#3a2a1a';x.fillRect(30,8,260,164);x.textAlign='center';x.font='120px serif';x.fillStyle='#000';x.globalAlpha=.55;x.fillText(i.icon,160,135);x.globalAlpha=1;
for(let j=0;j<12;j++){const bx=40+(j%4)*60,by=15+((j/4)|0)*50;x.strokeStyle='#ffffff18';x.strokeRect(bx,by,60,50);if(L.d[j]<99&&L.d[j]>0){x.fillStyle='rgba(255,220,120,.3)';x.fillRect(bx,by+50-L.d[j]*2,60,L.d[j]*2)}if(cur.ap.s.includes(j)){x.font='24px serif';x.fillStyle='#000';x.fillText(j==a.b?'⚠️':j==a.h?'💎':'✔️',bx+30,by+32)}}
x.save();x.beginPath();x.arc(L.x,L.y,36,0,7);x.clip();x.fillStyle='#3a2a1a';x.fillRect(L.x-40,L.y-40,80,80);x.translate(L.x,L.y);x.scale(2,2);x.translate(-L.x,-L.y);x.font='120px serif';x.fillStyle='#000';x.fillText(i.icon,160,135);x.restore();
x.strokeStyle='#c8a050';x.lineWidth=5;x.beginPath();x.arc(L.x,L.y,36,0,7);x.stroke();x.strokeStyle='#8b5a2b';x.lineWidth=9;x.beginPath();x.moveTo(L.x+26,L.y+26);x.lineTo(L.x+58,L.y+58);x.stroke();x.strokeStyle='#ffffff88';x.lineWidth=2;x.beginPath();x.arc(L.x,L.y,28,3.4,4.6);x.stroke()},30)}
const _rd5=rd;rd=function(){_rd5();if(cur&&cur.ap&&$('#lens'))lensInit()};
const _m5=mainH;mainH=function(){let h=_m5();h=h.replace(/<button[^>]*openShop\(\)[^>]*>[\s\S]*?<\/button>/,'<button class=door onclick=openShop()><span>🚪 MỞ CỬA</span><small>Bắt đầu ngày mới</small></button>').replace(/<button[^>]*confirmC=true[^>]*>[\s\S]*?<\/button>/,'<button class="door red" onclick="confirmC=true;rd()"><span>🌙 ĐÓNG CỬA</span><small>Kết thúc ngày & tổng kết</small></button>');return h.replace(/🔎|🔍/g,LI)};
const _iv5=invH;invH=()=>_iv5().replace(/🔎|🔍/g,LI);
/* lưu khi hết ngày */
const _cd5=closeDay;closeDay=function(){_cd5();save();toast('💾 Đã lưu game')};
/* thành tựu: ẩn bớt */
ACH.push(['hcat','🐈','Bạn của mèo','Chơi qua 7 ngày',()=>G.day>=7,{m:300,h:1}],['hrob','🛡️','Khắc tinh trộm cắp','Đuổi cướp 2 lần',()=>(G.c.rob||0)>=2,{m:600,h:1}],['htax','🧾','Công dân gương mẫu','Đóng thuế 5 lần',()=>(G.c.tax||0)>=5,{m:800,h:1}],['hhoard','📦','Kho báu','Kho có 15 món',()=>G.inv.length>=15,{m:500,h:1}],['hrare','🏺','Săn kho báu','Bán 12 đồ hiếm',()=>(G.c.rare||0)>=12,{m:2500,h:1}],['hbroke','😅','Suýt phá sản','Còn dưới 50k sau ngày 3',()=>G.money<50&&G.money>=0&&G.day>3,{m:200,h:1}],['hnight','🌙','Cú đêm','Ở tiệm đến sát giờ đóng cửa',()=>G.open&&G.min>=1195,{m:250,h:1}],['hmil','🪙','Triệu phú','Có 1.000.000k',()=>G.money>=1000000,{m:20000,h:1}],['hlv','🏛️','Đại gia phố cổ','Nâng tiệm lên cấp 5',()=>G.lv>=5,{m:5000,h:1}]);
achH=function(){const un=ACH.filter(a=>G.ach[a[0]]),vs=ACH.filter(a=>!G.ach[a[0]]&&!a[5].h).slice(0,3),hid=ACH.filter(a=>!G.ach[a[0]]&&a[5].h).length,row=(a,ok)=>`<div class=row style="opacity:${ok?1:.6}"><div>${a[1]} <b>${a[2]}</b><br><small>${a[3]}</small></div>${ok?'✅':'🔒'}</div>`;return`<h3>🏆 Thành tựu ${un.length}/${ACH.length}</h3>`+un.map(a=>row(a,1)).join('')+vs.map(a=>row(a,0)).join('')+(hid?`<div class=row><div>❓ <b>${hid} thành tựu ẩn</b><br><small>Hãy khám phá để mở khóa...</small></div>🔒</div>`:'')};
/* đồ đạc mới */
Object.assign(T,{vase:{n:'Bình gốm cổ',i:'\uE007',b:2600,m:{polish:1,cloth:1},s:'Kiểm tra,Vệ sinh,Trám vết nứt,Đánh bóng,Lau khô'},clock:{n:'Đồng hồ treo',i:'\uE00B',b:900,m:{gear:1,oil:1,screw:1},s:'Kiểm tra,Tháo mặt,Vệ sinh,Tra dầu,Lắp lại'},typew:{n:'Máy chữ cổ',i:'\uE00A',b:1600,m:{part:1,oil:1,screw:2},s:'Kiểm tra,Tháo phím,Vệ sinh,Tra dầu,Lắp lại'},lamp:{n:'Đèn dầu cổ',i:'\uE00C',b:1100,m:{wire:1,polish:1},s:'Kiểm tra,Vệ sinh,Nối dây,Đánh bóng'},book:{n:'Sách cổ',i:'\uE00D',b:800,m:{thread:1,cloth:1},s:'Kiểm tra,Khâu gáy,Bọc bìa,Ép phẳng'},jade:{n:'Vòng ngọc',i:'\uE00E',b:3000,m:{gem:1,polish:1},s:'Soi kính,Xử lý vết,Đánh bóng'},coin:{n:'Tiền xu cổ',i:'\uE00F',b:600,m:{metal:1,polish:1},s:'Kiểm tra,Làm sạch,Đánh bóng'},vinyl:{n:'Đĩa than',i:'\uE010',b:500,m:{cloth:1,cleaner:1},s:'Kiểm tra,Lau bụi,Làm sạch rãnh'}});
/* giá vật liệu: giá gốc và giá sau giảm */
const dsc=()=>Math.min(25,Math.floor(G.rep/8)+G.lv*2),dp=k=>Math.max(1,Math.round(M[k][2]*(G.mp&&G.mp[k]||1)*(1-dsc()/100)));
const _by5=buyM;buyM=function(k,n){const p=M[k][2];M[k][2]=dp(k);try{_by5(k,n)}finally{M[k][2]=p}};
/* hình nền: ánh sáng, bụi, viền tối */
const _d5=draw;draw=function(t){_d5(t);const gr=g.createRadialGradient(160,90,60,160,90,200);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(20,8,0,.42)');g.fillStyle=gr;g.fillRect(0,0,320,180);g.globalAlpha=.05;for(let x=6;x<320;x+=12)R(x,4,4,92,'#fff');if(G.min>420&&G.min<1050){g.globalAlpha=.09;g.fillStyle='#fff2a8';g.beginPath();g.moveTo(248,64);g.lineTo(296,64);g.lineTo(230,178);g.lineTo(150,178);g.fill()}g.globalAlpha=.5;for(let k=0;k<14;k++)R((k*47+t/40)%320,(k*31+t/70)%170,1,1,'#ffe9a8');g.globalAlpha=1};
/* màn hình chính */
const SC=[['#0d1b3a','#3a2a5a',1],['#2a1a10','#6a3a20',0],['#1a1a2a','#4a3a4a',1],['#1a2a3a','#8a5a3a',0],['#2a1a3a','#e0904a',0]],wr=(t,n)=>{let l='',o=[];t.split(' ').forEach(w=>{if((l+' '+w).length>n){o.push(l);l=w}else l+=' '+w});o.push(l);return o};
/* ===== v6 ===== */
G.sx=G.sx||{};G.fu=G.fu||{};G.mc=G.mc||{};G.mp=G.mp||{};
document.head.insertAdjacentHTML('beforeend','<style>.chips{flex-wrap:wrap}</style>');
const fuM=()=>1+.05*(G.fu.chand||0)+.04*(G.fu.rug||0)+.03*(G.fu.paint||0);
function tabify(h,key){const parts=h.split('<h3>'),pre=parts.shift(),sc=parts.map(p=>{const j=p.indexOf('</h3>');return[p.slice(0,j).replace(/<[^>]+>/g,''),p.slice(j+5)]});if(sc.length<2)return h;G._t=G._t||{};let a=G._t[key]|0;if(a>=sc.length)a=0;return pre+'<div class=chips>'+sc.map((x,i)=>`<button class="${i==a?'on':''}" onclick="G._t['${key}']=${i};rd()">${x[0].replace(/\s*\(.*$/,'').slice(0,12)}</button>`).join('')+'</div><h3>'+sc[a][0]+'</h3>'+sc[a][1]}
/* đồ & vật liệu theo cấp tiệm */
const ST0='Kiểm tra,Vệ sinh,Sửa chữa,Hoàn thiện';
Object.assign(T,{globe:{n:'Quả địa cầu cổ',i:'\uE011',b:1500,lv:2,m:{glass:1,brass:1},s:ST0},telesc:{n:'Kính thiên văn',i:'\uE012',b:2800,lv:2,m:{glass:1,brass:1,screw:1},s:ST0},violin:{n:'Đàn violin',i:'\uE008',b:3200,lv:2,m:{string:2,lacquer:1},s:'Kiểm tra,Tháo dây,Sơn mài,Lên dây,Chỉnh âm'},fan:{n:'Quạt cổ',i:'\uE013',b:700,lv:2,m:{wire:1,oil:1},s:ST0},sword:{n:'Kiếm cổ',i:'\uE014',b:4500,lv:3,m:{metal:2,leather:1,polish:1},s:'Kiểm tra,Mài lưỡi,Bọc chuôi da,Đánh bóng'},teapot:{n:'Ấm trà cổ',i:'\uE015',b:1900,lv:3,m:{clay:1,lacquer:1},s:ST0},mask:{n:'Mặt nạ gỗ',i:'\uE016',b:2400,lv:3,m:{lacquer:1,silk:1},s:ST0},chess:{n:'Bộ cờ ngà',i:'\uE017',b:2100,lv:3,m:{wood:1,polish:1},s:ST0},crown:{n:'Vương miện',i:'\uE018',b:9000,lv:4,m:{gem:2,goldleaf:1,polish:1},s:'Soi kính,Gắn đá,Dát vàng,Đánh bóng'},oilp:{n:'Tranh sơn dầu',i:'\uE019',b:7000,lv:4,m:{ink:1,silk:1,lacquer:1},s:'Kiểm tra,Làm sạch,Vá màu,Phủ bóng'},statue:{n:'Tượng cổ',i:'\uE01A',b:6000,lv:4,m:{clay:2,goldleaf:1},s:'Kiểm tra,Trám nứt,Dát vàng,Hoàn thiện'}});
const ML={leather:1,glass:2,brass:2,lacquer:2,silk:3,clay:3,ink:4,goldleaf:4};
Object.assign(M,{leather:['\uE036','Da thuộc',105],glass:['\uE037','Kính quang học',135],brass:['\uE038','Đồng thau',180],lacquer:['\uE039','Sơn mài',150],silk:['\uE03A','Lụa',195],clay:['\uE03B','Đất nung',90],ink:['\uE03C','Mực tàu',105],goldleaf:['\uE03D','Vàng lá',450]});
const _gi=genItem;genItem=function(){for(let n=0;n<25;n++){const it=_gi();if((T[it.type].lv||1)<=G.lv)return it}return _gi()};
const _ug=upg;upg=function(){const l=G.lv;_ug();if(G.lv>l){const a=Object.keys(T).filter(k=>T[k].lv==G.lv).map(k=>T[k].i+T[k].n),b=Object.keys(ML).filter(k=>ML[k]==G.lv).map(k=>M[k][0]+M[k][1]);toast('🔓 Mở khóa: '+a.concat(b).join(', '))}};
/* giá vật liệu biến động, giá thị trường: hiện giá gốc gạch dưới */
/* _nd7 removed — logic in processMarketDay */
shopH=function(){let h=`<h3>🏬 Vật liệu</h3><div class="nt g">🏷️ Giảm giá khách quen: <b>-${dsc()}%</b> · giá đổi mỗi ngày theo thị trường</div>`;for(const k in M){if((ML[k]||1)>G.lv)continue;const d=(G.mp[k]||1)-((G.mq&&G.mq[k])||1);h+=`<div class=row><div>${M[k][0]} <b>${M[k][1]}</b> · có ${G.mats[k]||0}<br><small>Giá gốc: <s>${fm(M[k][2])}</s></small></div><div style="text-align:right"><b style="font-size:23px">${fm(dp(k))}</b> <span style="color:${d>=0?'#a02020':'#2a7a20'}">${d>=0?'▲':'▼'}${Math.abs(Math.round(d*100))}%</span><br><button onclick="buyM('${k}',1)">+1</button><button onclick="buyM('${k}',5)">+5</button></div></div>`}return h};
mktH=function(){let h='<h3>📈 Giá thị trường hôm nay</h3><small>'+et()+'</small>';for(const k in T){if((T[k].lv||1)>G.lv)continue;if((T[k].lv||1)>G.lv)continue;const m=G.mk[k]||1,d=m-(G.mh[k]||1),b=T[k].b;h+=`<div class=row><div>${T[k].i} <b>${T[k].n}</b>${G.hot==k?' 🔥':''}<br><small>Giá gốc: <s>${fm(b)}</s></small></div><div style="text-align:right"><b style="font-size:24px">${fm(r10(b*m))}</b><br><span style="color:${d>=0?'#2a7a20':'#a02020'}">${d>=0?'▲':'▼'} ${Math.abs(Math.round(d*100))}% · ${Math.round(m*100)}%</span></div></div>`}return h+'<small>Giá đổi mỗi ngày theo cung cầu, tin đồn và sự kiện.</small>'};
/* phản hồi của khách */
RA.push('Trời ơi, mồm bạn để làm cảnh à? Tao đăng bài bóc phốt tiệm này ngay bây giờ!','Chửi khách hả? Ok, mai tao dắt cả hội lại "ủng hộ" tiệm mày nhé.','Vãi cả tiệm, chủ mà ăn nói như đứa vô học vậy à?','Mày nhớ mặt tao cho kỹ, tao không quên đâu.','Quá đáng luôn! Tao chụp màn hình gửi hết group khu phố!','Bớt nói giùm! Tiệm nhỏ mà cũng đòi lên mặt.','Được lắm, tao review 1 sao trên 5 cái app cho mày biết tay.','Nói chuyện kiểu chợ búa thế à? Đúng là dân buôn đồ cũ, tệ hết chỗ nói!','Trời ơi, tao mà nóng lên là gỡ luôn cái biển hiệu đó nghe chưa!','Giỏi thì đừng bán cho ai nữa, tao sẽ kêu cả phố tẩy chay!','Ăn nói kiểu đó, để xem tiệm sống được mấy hôm.','Thái độ như hạch mà đòi mở tiệm. Chán!','Ê, tưởng khách dễ bắt nạt lắm hả? Chờ đấy!','Xỉu, tiệm gì mà chủ như con nít cãi nhau vậy trời!');
RS.push('Ồ khịa hay đấy, chắc chủ tiệm học diễn hài ở đâu ra vậy.','Lời lẽ bay bổng ghê, tiếc là giá thì rơi tự do.','Nghe như câu template soạn sẵn vậy, cảm xúc đâu bạn ơi?','Ờ ờ, chủ tiệm đúng, tôi sai, tôi xin phép biến. Ha.','Cà khịa vừa thôi, khách đông mấy cũng tuột hết đấy.','Xỉu, tiệm gì mà hài hơn cả rạp xiếc.','Trời ơi, bạn đúng là danh hài của khu phố.','Ủa alo, bạn định bán hàng hay bán hài vậy?');
RG.push('Ôi trả lời tử tế ghê, mình đổi review lên cao hơn luôn nhé!','Được rồi, vì thái độ này mình tha, hẹn tuần sau ghé.','Cảm ơn nhé, chủ tiệm chuyên nghiệp thật sự luôn á!','Xin lỗi kiểu này mình mềm lòng mất, lần sau mua thêm nha.','Hi hi, đọc phản hồi xong hết giận rồi đó.');
if(typeof RN!='undefined')RN.push('Nói chung vẫn chưa hài lòng, nhưng thôi cho qua.','Ừ thì reply cho có, mình vẫn giữ nguyên đánh giá.','Hmm... để xem lần sau thế nào.','Trả lời nhạt nhẽo quá, tiệm cần cải thiện đó.');
RM.push('Ok bạn nhé.','Ừ, cảm ơn đã phản hồi.','Mình đã đọc rồi nha.');
/* an ninh, nội thất, máy thẩm định */
const SEC2=[['alarm','🚨','Chuông báo động',[600,1400,3000],'mỗi cấp chặn thêm 10% vụ cướp/giang hồ'],['dog','🐕','Chó canh cửa',[400,1000,2200],'mỗi cấp chặn thêm 10% vụ trộm cướp'],['gate','🚪','Cửa sắt',[900,2200,4500],'mỗi cấp chặn thêm 10% vụ đột nhập']],FUR=[['wall','🎨','Giấy dán tường',[500,1500,4000],'đổi màu tường tiệm'],['floor','🟫','Sàn nhà',[600,1800,5000],'gỗ tối → đá → cẩm thạch'],['sofa','🛋️','Sofa tiếp khách',[1200,3000],'khách kiên nhẫn hơn khi mặc cả'],['paint','🖼️','Tranh treo tường',[1500,4000],'có thể tăng uy tín mỗi ngày'],['chand','💡','Đèn chùm',[3000,8000],'thêm khách, không khí sang trọng'],['rug','🧶','Thảm hoa văn',[1000,2500],'thêm khách quen']],MAC=[['uv','🔦','Đèn UV',[800,2000],'soi keo/sơn giả (tăng chính xác theo cấp)',[1,2]],['scale','⚖️','Cân điện tử',[1200,3000],'phát hiện lệch trọng lượng hàng giả',[1,2]],['micro','🔬','Kính hiển vi',[3500],'tìm dấu thợ thủ công của đồ hiếm',[2]],['xrf','📡','Máy quang phổ XRF',[9000],'chính xác 100%, phí 80k/lần',[3]]];
function buyU(kind,k){const d={sx:SEC2,fu:FUR,mc:MAC}[kind].find(x=>x[0]==k),l=G[kind][k]||0;if(l>=d[3].length)return;const c=d[3][l],need=d[5]?d[5][l]:l+1;if(G.money<c||G.lv<need)return;ad(-c);G[kind][k]=l+1;snd('up');toast('✅ '+d[2]+' cấp '+(l+1));rd();ui()}
const secH=(t,D,kind)=>`<h3>${t}</h3>`+D.map(d=>{const l=G[kind][d[0]]||0,mx=d[3].length,need=d[5]?d[5][l]:l+1,c=d[3][l];return`<div class=row><div>${d[1]} <b>${d[2]}</b> · cấp ${l}/${mx}<br><small>${d[4]}</small></div>${l>=mx?'✅':`<button ${G.money<c||G.lv<need?'disabled':''} onclick="buyU('${kind}','${d[0]}')">${G.lv<need?'🔒 Tiệm cấp '+need:fm(c)}</button>`}</div>`}).join('');
const _sp6=spawn;spawn=function(){const n=queue.length;_sp6();const q=queue[queue.length-1];if(queue.length>n&&q&&q.pat)q.pat+=G.fu.sofa||0};
const _ap6=apH;apH=function(){let h=_ap6();const b=MAC.filter(d=>G.mc[d[0]]).map(d=>`<button onclick="mach('${d[0]}')">${d[1]} ${d[2]}</button>`).join('');return h.replace('<button class=big',(b?'<div>'+b+'</div>':'')+'<button class=big')};
function mach(k){const q=cur,i=q.item,l=G.mc[k];if(!l||i.known)return;if(k=='xrf'){if(G.money<80){toast('Cần 80k phí vận hành');return}ad(-80)}G.min+=k=='xrf'?10:5;const P={uv:[.7+.1*l,i.fake,'🔦 Keo/sơn lạ phát sáng: HÀNG GIẢ!'],scale:[.55+.12*l,i.fake,'⚖️ Trọng lượng lệch chuẩn: HÀNG GIẢ!'],micro:[.85,i.rare,'🔬 Dấu thợ thủ công hiếm: ĐỒ HIẾM!'],xrf:[1,i.fake||i.rare,i.fake?'📡 Thành phần sai chuẩn: HÀNG GIẢ!':'📡 Chất liệu quý: ĐỒ HIẾM!']}[k];if(P[1]&&Math.random()<P[0]){i.known=true;$('#lr').textContent=P[2];snd(i.fake?'bad':'star')}else{$('#lr').textContent='Máy không thấy gì bất thường (chưa chắc chắn 100%).';snd('click')}ui()}
/* nội thất đổi giao diện tiệm */
const WALLC=['','#c9a24a','#3f8f6a','#8a3a4a'],FLC=['','#4a2a10','#8a8a92','#e8e0d0'];
const _d6=draw;draw=function(t){_d6(t);const f=G.fu||{};if(f.wall){g.globalAlpha=.14+.04*f.wall;R(0,0,320,98,WALLC[f.wall]);g.globalAlpha=.1;for(let y=6;y<96;y+=16)for(let x=((y/16)&1)*8+4;x<320;x+=16)R(x,y,2,2,'#fff');g.globalAlpha=1}
if(f.floor){g.globalAlpha=.3;R(0,100,320,80,FLC[f.floor]);if(f.floor>1){g.globalAlpha=.2;for(let x=0;x<320;x+=32)R(x,100,1,80,'#000');for(let y=100;y<180;y+=20)R(0,y,320,1,'#000')}g.globalAlpha=1}
if(f.rug){R(8,101,46,9,'#4a1a14');R(10,102,42,7,'#8a3a2a');for(let x=13;x<50;x+=7)R(x,104,4,3,'#f4e8c8');if(f.rug>1){R(8,110,46,1,'#3a1210');for(let x=9;x<54;x+=4)R(x,111,1,3,'#c8a060')}}
if(f.sofa){R(262,150,48,22,'#6a3030');R(262,144,48,10,'#8a4040');R(260,150,6,22,'#5a2525');R(306,150,6,22,'#5a2525');R(268,158,36,2,'#a05050')}
if(f.paint){R(148,34,26,20,'#c8a040');R(151,37,20,14,f.paint>1?'#5a7aa0':'#8ab070');R(155,44,10,4,'#e8e0c0')}
if(f.chand){R(35,0,2,8,'#333');R(14,8,44,3,'#ffd23a');for(let k=0;k<5;k++)R(16+k*10,11,3,4,'#ffe9a8');g.globalAlpha=.14;R(0,0,80,90,'#ffdf80');g.globalAlpha=1}};
/* mini-game khi sửa đồ + animation */
let MGM=null;const cat=t=>/watch|clock|camera|typew|radio|phone|telesc|fan|globe/.test(t)?'tune':/teddy|book|mask|oilp/.test(t)?'sew':'polish',fi=id=>G.inv.find(x=>x.id==id)||(G.jobs.find(j=>j.it.id==id)||{}).it;
const _rp6=repair;repair=function(id){if(working||MGM)return;const it=fi(id);if(!it)return;for(const k in T[it.type].m)if((G.mats[k]||0)<T[it.type].m[k])return;MGM={id,it,mode:cat(it.type),t:0,s:{p:0,d:1,a:20,w:24,h:0,n:0,tg:0,dirt:Array(144).fill(1)}};rd()};
function mgH(){const m=MGM,T0={tune:['🎯 Căn chỉnh','Bấm DỪNG khi vạch trắng vào vùng xanh (3 lần).'],sew:['🪡 Khâu vá','Chạm vào ô đang sáng thật nhanh (6 lần).'],polish:['\uE030','Rê chuột/ngón tay lên món đồ để lau sạch bụi bẩn.']}[m.mode];return`<h3>${T0[0]} · ${m.it.icon} ${m.it.name}</h3><div class=card>${T0[1]}<br><b id=mgs>Điểm: 0</b></div><canvas id=mg width=320 height=180 style="width:100%;border:4px solid #2a1a0c;border-radius:10px;touch-action:none;background:#1c120b"></canvas>${m.mode=='tune'?'<button class=big onclick=mgStop()>⏹ DỪNG</button>':''}<button onclick="mgEnd(0)">Bỏ qua (không thưởng)</button>`}
function mgStop(){const s=MGM.s;s.n++;if(s.p>=s.a&&s.p<=s.a+s.w){s.h++;snd('star')}else snd('bad');s.a=rnd(10,60);if(s.n>=3)mgEnd(s.h/3)}
function mgInit(){const cv=$('#mg'),x=cv.getContext('2d'),m=MGM,s=m.s;s.tg=rnd(0,11);const P=e=>{const r=cv.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return[(t.clientX-r.left)*320/r.width,(t.clientY-r.top)*180/r.height]};
if(m.mode=='polish')['pointermove','touchmove'].forEach(v=>cv.addEventListener(v,e=>{const[a,b]=P(e);for(let j=0;j<144;j++){const cx=(j%16)*20+10,cy=((j/16)|0)*20+10;if(Math.hypot(cx-a,cy-b)<26)s.dirt[j]=0}e.preventDefault()},{passive:false}));
if(m.mode=='sew')['pointerdown','touchstart'].forEach(v=>cv.addEventListener(v,e=>{const[a,b]=P(e),k=Math.floor((b-15)/50)*4+Math.floor((a-40)/60);if(k==s.tg){s.h++;snd('star')}else snd('bad');s.n++;s.tg=rnd(0,11);if(s.n>=6)mgEnd(s.h/6);e.preventDefault()},{passive:false}));
const iv=setInterval(()=>{if(!$('#mg')||MGM!=m)return clearInterval(iv);m.t++;x.fillStyle='#241810';x.fillRect(0,0,320,180);x.textAlign='center';x.font='90px serif';x.fillStyle='#000';x.fillText(m.it.icon,160,110);
if(m.mode=='tune'){s.p+=s.d*3;if(s.p>=98||s.p<=0)s.d*=-1;x.fillStyle='#3a2a1a';x.fillRect(20,140,280,20);x.fillStyle='#6ecf5a';x.fillRect(20+s.a*2.8,140,s.w*2.8,20);x.fillStyle='#fff';x.fillRect(20+s.p*2.8,136,5,28);$('#mgs').textContent='Đúng '+s.h+'/'+s.n}
else if(m.mode=='sew'){for(let j=0;j<12;j++){x.strokeStyle='#ffffff22';x.strokeRect(40+(j%4)*60,15+((j/4)|0)*50,60,50)}x.fillStyle='#ffd27acc';x.fillRect(40+(s.tg%4)*60,15+((s.tg/4)|0)*50,60,50);x.font='30px serif';x.fillText('🪡',70+(s.tg%4)*60,52+((s.tg/4)|0)*50);$('#mgs').textContent='Trúng '+s.h+'/6 · lượt '+s.n}
else{let c=0;for(let j=0;j<144;j++)if(s.dirt[j]){c++;x.fillStyle='rgba(90,70,40,.75)';x.fillRect((j%16)*20,((j/16)|0)*20,20,20)}const sc=1-c/144;$('#mgs').textContent='Sạch '+Math.round(sc*100)+'%';if(sc>=.9||m.t>500)mgEnd(sc)}},40)}
function mgEnd(sc){const m=MGM;MGM=null;const id=m.id,it=m.it,bon=Math.round(sc*10);toast(bon?'✨ Mini-game: +'+bon+'% chất lượng':'Không có thưởng thêm');_rp6(id);const iv=setInterval(()=>{if(!working){clearInterval(iv);it.cond=Math.min(98,it.cond+bon);rd()}},300);rd()}
function anim(){const x=$('#wa').getContext('2d'),c=cat(working.it.type);let f=0;const iv=setInterval(()=>{if(!$('#wa')||!working)return clearInterval(iv);f++;x.fillStyle='#2a1a10';x.fillRect(0,0,320,100);x.fillStyle='#5a3a1a';x.fillRect(0,82,320,18);x.textAlign='center';x.font='44px serif';x.fillStyle='#000';x.fillText(working.it.icon,160+Math.sin(f/3)*2,70+Math.cos(f/4)*2);x.font='26px serif';
if(c=='tune'){x.save();x.translate(240,50);x.rotate(f/8);x.fillText('⚙️',0,8);x.restore();x.fillText('🔧',90+Math.sin(f/4)*10,52)}else if(c=='sew'){x.fillText('🪡',210+Math.sin(f/3)*14,30+Math.abs(Math.sin(f/3))*30);x.fillStyle='#e8d090';for(let k=0;k<8;k++)x.fillRect(120+k*10,78,6,2)}else x.fillText('🧽',130+Math.sin(f/3)*30,55);for(let k=0;k<6;k++){x.fillStyle='#ffd27a';x.fillRect(150+((f*7+k*37)%80)-40,30+((f*5+k*23)%40),2,2)}},50)}
const _wk6=wkH;wkH=function(){if(MGM)return mgH();let h=_wk6();if(working)h='<canvas id=wa width=320 height=100 style="width:100%;border:4px solid #2a1a0c;border-radius:10px"></canvas>'+h;return h};
const _rd6=rd;rd=function(){_rd6();if(MGM&&$('#mg'))mgInit();if(working&&$('#wa'))anim()};

/* ===== v7 ===== */
document.head.insertAdjacentHTML('beforeend','<style>#set{z-index:9999!important}.chatrow{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.chatrow button{flex:1;font-size:17px;background:#5a7a9a}</style>');
SEC2.splice(0,SEC2.length,['alarm','🚨','Chuông báo động',[600,1400,3000],'mỗi cấp chặn thêm 10% vụ đột nhập'],['dog','🐕','Chó nghiệp vụ',[400,1000,2200],'chặn đột nhập, có tỉ lệ đuổi bắt trộm và lấy lại tiền'],['gate','🚪','Cửa sắt',[900,2200,4500],'mỗi cấp chặn thêm 10% vụ đột nhập']);
const scSec=()=>'<h3>🛡️ An ninh</h3>'+SECN.map((s,i)=>`<div class=row><div>${s[0]}<br><small>${s[2]}, tăng tỉ lệ bắt trộm lấy lại tiền</small></div>${G.sec>i?'✅':`<button ${G.sec<i||G.money<s[1]?'disabled':''} onclick=buySec()>${G.sec<i?'🔒 Mua món trước':fm(s[1])}</button>`}</div>`).join('')+SEC2.map(d=>{const l=G.sx[d[0]]||0,c=d[3][l],need=l+1;return`<div class=row><div>${d[1]} <b>${d[2]}</b> · cấp ${l}/${d[3].length}<br><small>${d[4]}</small></div>${l>=d[3].length?'✅':`<button ${G.money<c||G.lv<need?'disabled':''} onclick="buyU('sx','${d[0]}')">${G.lv<need?'🔒 Tiệm cấp '+need:fm(c)}</button>`}</div>`}).join('');
const scFur=()=>'<h3>🛋️ Nội thất</h3>'+FXL.map(f=>{const l=G.fx[f[0]],c=r10(300*(l+1)*(1+.5*G.lv));return`<div class=row><div>${f[1]} <b>${f[2]}</b> · cấp ${l}/${G.lv}<br><small>${f[3]}</small></div><button ${G.money>=c&&l<G.lv?'':'disabled'} onclick="buyFx('${f[0]}')">${fm(c)}</button></div>`}).join('')+FUR.map(d=>{const l=G.fu[d[0]]||0,c=d[3][l],need=l+1;return`<div class=row><div>${d[1]} <b>${d[2]}</b> · cấp ${l}/${d[3].length}<br><small>${d[4]}</small></div>${l>=d[3].length?'✅':`<button ${G.money<c||G.lv<need?'disabled':''} onclick="buyU('fu','${d[0]}')">${G.lv<need?'🔒 Tiệm cấp '+need:fm(c)}</button>`}</div>`}).join('');
upH=()=>{const p=_up5().split('<h3>'),pre=p.shift(),keep=p.filter(x=>!/An ninh|Nội thất/.test(x.slice(0,x.indexOf('</h3>')))).map(x=>'<h3>'+x).join('');window.__upRaw=pre+keep+scSec()+scFur()+secH('🔬 Máy thẩm định',MAC,'mc');return window.__upRaw};
/* hiển thị nội thất & an ninh trong tiệm */
const _d7=draw;draw=function(t){_d7(t);const F=G.fx,X=G.sx,K=G.sec||0;
if(F.ch){R(200,150,38,4,'#7a4a20');R(204,154,4,12,'#5a3a1a');R(230,154,4,12,'#5a3a1a');R(192,148,6,18,'#a06a34');R(240,148,6,18,'#a06a34');R(190,144,10,4,'#a06a34');R(238,144,10,4,'#a06a34');if(F.ch>1){R(192,158,6,3,'#c88a4a');R(240,158,6,3,'#c88a4a')}if(F.ch>2)R(206,146,30,4,'#e8d090')}
if(F.tea){if(F.ch)E('🍵',219,150,11);E('🍵',128,106,10);E('🫖',144,106,10)}

if(K>=1){R(300,10,14,8,'#ddd');R(298,12,4,4,'#888');R(311,12,2,2,((t/300)|0)%2?'#f33':'#600')}
if(K>=2)person(54,120,'#22334a','#111',Math.round(Math.sin(t/500)),0,false);
if(X.alarm){R(296,26,10,6,'#555');R(298,22,6,5,((t/250)|0)%2?'#ff3a3a':'#7a1a1a')}
if(X.dog)E('🐕',232+Math.sin(t/900)*8,173,14);
if(X.gate&&!G.open){g.globalAlpha=.85;for(let x=14;x<50;x+=6)R(x,36,2,64,'#3a3a44');R(12,50,38,2,'#3a3a44');R(12,80,38,2,'#3a3a44');g.globalAlpha=1}};
/* trộm bị bắt lấy lại tiền */
/* hội thoại đa dạng */
const fill=(t,i)=>t.replace('{i}',i.toLowerCase());
const INS=['Chào chủ tiệm, tôi có món {i} muốn nhượng lại, xem giúp nhé.','Đồ nhà để lâu, tôi định bán {i} này cho gọn.','Anh/chị xem {i} này giúp tôi, tôi cần tiền lo việc nhà.','Nghe nói tiệm trả giá công bằng nên tôi mang {i} tới.','Tôi vừa dọn nhà, thấy {i} này, bán được bao nhiêu thì bán.','Có món {i} này, chủ tiệm cho giá thử xem sao?','Cuối tháng ví hơi cạn, cho tôi bán {i} này nha.','{i} này có kỷ niệm lắm, nhưng thôi, đành bán...'],PWS=['Cho tôi cầm {i} này vay ít tiền, tuần sau tôi chuộc nhé.','Chủ tiệm cho cầm {i} nhé, lãi bao nhiêu tôi chịu.','Đang kẹt tiền, tôi gửi {i} lại đây vài hôm.','Tôi cầm {i} này, đảm bảo sẽ quay lại chuộc.'],FXS=['Cái {i} nhà tôi hỏng rồi, chủ tiệm sửa được không?','Sửa giúp tôi {i} này, tính giá hợp lý nha.','Không biết {i} còn cứu được không, anh/chị xem giúp.','{i} này hỏng mấy hôm nay rồi, nhờ tiệm sửa.'],BOK=['Món này đẹp quá, tôi lấy luôn!','Đúng thứ tôi tìm bấy lâu, gói lại giúp tôi!','Giá này ổn, chốt luôn nhé chủ tiệm!'],BHG=['Hơi đắt... {w} được không?','Chủ tiệm bớt chút đi, {w} thôi nhé?','Tôi mê món này lắm, nhưng chỉ có {w} thôi.'],BNO=['Giá này tôi chịu thua, đắt quá.','Ôi giá này thì tôi xin phép ngắm thôi.','Chắc để hôm khác, tôi không đủ tiền.'];
const _sp7=spawn;spawn=function(){const n=queue.length;_sp7();if(queue.length>n){const q=queue[queue.length-1];if(q.role||!q.item)return;const b=q.kind=='sell'?pick(INS):q.kind=='pawn'?pick(PWS):q.kind=='fix'?pick(FXS):q.s=='ok'?pick(BOK):q.s=='hag'?pick(BHG).replace('{w}',fm(q.wtp)):pick(BNO);q.line=greet(q.npc,fill(b,q.item.name))}};
const MOR=['Thêm chút nữa nhé, {a} thôi.','Gần được rồi, {a} là tôi chốt luôn.','Ráng thêm chút đi chủ tiệm, {a} nha.','Nể tình tôi lên {a} được không?'],LOW=['Thấp quá, thêm chút nữa đi!','Ơ, trả thế thì tôi lỗ nặng mất.','Chủ tiệm ơi, giá này chưa được đâu.','Ít quá, nghĩ lại giúp tôi.'],INSU=['Trả thế mà nghe được à?!','Anh/chị đùa tôi đấy à?','Giá gì mà rẻ như cho vậy trời!'],DEAL=['Chốt! Cảm ơn chủ tiệm!','Ok, làm ăn vui vẻ nhé!','Được rồi, coi như duyên số!','Ừ thôi bán, đỡ phải mang về.'],ANG=['Thôi, tôi đi!','Đồ ép giá!','Không bán nữa!','Tiệm này keo kiệt quá!'];
const _of7=offer;offer=function(){const q=cur;if(!q||q.kind=='buy'||q.kind=='fix'||q.role)return _of7();const b=q.line,d0=S.deals;_of7();if(S.deals>d0)fx.push({t:pick(DEAL),x:q.x,y:q.y-58,c:'#2a7a20',l:90});else if(cur===q&&q.line!==b){if(/Thêm chút/.test(q.line))q.line=pick(MOR).replace('{a}',fm(q.ask));else if(/Thấp quá/.test(q.line))q.line=pick(LOW);else if(/Trả thế/.test(q.line))q.line=pick(INSU);rd()}};
const _an7=angry;angry=function(m){_an7(pick(ANG))};
const SWY=['Chủ tiệm khéo ăn nói quá, được rồi, tôi bớt chút.','Nghe dễ chịu ghê, thôi tôi xuống giá chút cho vui.'],SWN=['Ừ, cảm ơn... nhưng giá thì vẫn vậy nhé.','Nói ngọt thì ngọt, tiền vẫn là tiền.'],FLY=['Ờ thì... đúng là món này có tì vết, tôi bớt vậy.','Chủ tiệm tinh mắt thật, thôi tôi giảm chút.'],FLN=['Cái gì? Đồ của tôi mà chê à?','Chê nhiều quá đấy, tôi giận rồi nha.'],FMY=['Được, chủ tiệm cứng thế thì tôi nhượng bộ.','Thôi thôi, giá nào cũng được, bớt cho anh/chị.'],FMN=['Làm gì mà hung dữ vậy?','Nói chuyện kiểu gì kỳ vậy chủ tiệm.'],TEAY=['Trà ngon quá! Được rồi, tôi bớt cho chủ tiệm.','Uống chén trà rồi, giá cả dễ nói hơn nhiều.'];
function chat(k){const q=cur;if(!q||(q.ch&&q.ch[k]))return;q.ch=q.ch||{};q.ch[k]=1;const r=Math.random();let m;
if(k=='sweet'){if(r<.6){q.pat=(q.pat||3)+1;q.ask=r10(q.ask*.97);m=pick(SWY)}else m=pick(SWN)}
else if(k=='flaw'){if(r<.55){q.ask=r10(q.ask*.9);m=pick(FLY)}else{q.pat--;m=pick(FLN);if(q.pat<=0)return angry('')}}
else if(k=='firm'){if(r<.45){q.ask=r10(q.ask*.88);m=pick(FMY)}else{q.pat--;m=pick(FMN);if(q.pat<=0)return angry('')}}
else{if(!G.fx.tea){q.ch[k]=0;return toast('🍵 Cần nâng cấp Nước trà trước')}q.pat=(q.pat||3)+1;q.ask=r10(q.ask*.96);q.npc.aff++;m=pick(TEAY)}
q.line=m;q.def=Math.min(q.def,q.ask);snd('click');rd()}
const _m7=mainH;mainH=function(){let h=_m7();if(cur&&!cur.ap&&!cur.role&&G.open&&!confirmC&&(cur.kind=='sell'||cur.kind=='pawn'))h+='<div class=chatrow>'+[['sweet','😊 Nói ngọt'],['flaw','🧐 Chê khuyết điểm'],['firm','💪 Cứng rắn'],['tea','🍵 Mời trà']].map(c=>`<button ${cur.ch&&cur.ch[c[0]]?'disabled':''} onclick="chat('${c[0]}')">${c[1]}</button>`).join('')+'</div>';return h};
/* thêm nhận xét & phản hồi */
if(typeof RV!='undefined'){(RV[5]=RV[5]||[]).push('Tiệm sạch, chủ dễ tính, giá thương lượng thoải mái. Chuẩn!','Mê cái không khí tiệm cổ này quá, sẽ giới thiệu bạn bè.');(RV[4]=RV[4]||[]).push('Chủ tiệm hơi khó tính nhưng công bằng.','Đồ đẹp, giá hơi cao xíu, vẫn ok.');(RV[3]=RV[3]||[]).push('Tiệm tạm được, mặc cả hơi mệt.','Không có gì để chê, cũng không có gì để khen.');(RV[2]=RV[2]||[]).push('Chủ tiệm nói chuyện hơi cộc, hơi buồn.','Mất nửa tiếng mặc cả, kết quả chẳng ra gì.');(RV[1]=RV[1]||[]).push('Tệ! Chủ tiệm ép giá như đi ăn cướp.','Ghét cái thái độ này, khỏi ghé lần sau.')}
RA.push('Tao nhớ mặt mày rồi đấy, đừng có ra đường một mình!','Trời ơi, tiệm này rồi sẽ ế sưng ế sỉa, tao nói trước.','Tao mà rảnh tao cho cả xóm biết tiệm này lừa khách!','Bạn ăn nói với khách như thế đấy hả, bạn ơi!','Vãi thật, chủ gì mà văng tục như chợ cá!','Sao không lo bán hàng đi mà nói nhiều vậy?','Một sao chưa đủ, tao còn viết thêm 3 cái review nữa.','Có giỏi ra đây nói trực tiếp, nói trên mạng làm gì!','Ok, thù này tao ghi vào sổ, chờ đó.','Quá đáng luôn! Tiệm này tao tẩy chay tới hết đời!');
RS.push('Ơ hay, chủ tiệm khịa hay ghê, để tôi lưu lại làm meme.','Cà khịa xong chưa? Tôi còn đi mua hàng ở tiệm khác đây.','Thái độ 10 điểm, mà là 10 điểm trừ.','Kiểu trả lời này nên đưa vào sách giáo khoa "cách mất khách".','À ừ, chủ tiệm giỏi, chủ tiệm đúng, chủ tiệm cứ việc vui vẻ.','Ủa, mở tiệm hay mở sân khấu hài vậy?','Chủ tiệm gõ phím nhanh hơn bán hàng nhỉ.');
RG.push('Ôi được xin lỗi thế này thì mình sao giận nổi nữa.','Thấy chủ tiệm có tâm thật, mình xóa review xấu nha.','Cảm ơn nhé, lần sau mình mang thêm đồ đến bán!','Được thôi, một lần cho qua, hẹn gặp lại.');
RM.push('Ừ nhé.','Thôi cũng được.','Hiểu rồi, cảm ơn.','Ok chủ tiệm.');
if(typeof RN!='undefined')RN.push('Thôi, coi như chưa có gì xảy ra.','Trả lời cho có lệ, tôi vẫn giữ nguyên ý kiến.','Ừm, vậy cũng được... tạm chấp nhận.');
/* màn hình chính mới */
function newGame(){if(confirm('Xóa toàn bộ tiến trình và chơi lại từ đầu?')){window.nosv=1;try{localStorage.removeItem('tcd1');localStorage.removeItem('tcd_intro')}catch(e){}location.reload()}}
function hasSave(){try{const d=JSON.parse(window.__SAVE||localStorage.getItem('tcd1'));return !!(d&&d.G)}catch(e){return false}}
function storeOk(){if(window.TCD&&TCD.hasDb())return true;try{localStorage.setItem('tcd_t','1');localStorage.removeItem('tcd_t');return true}catch(e){return false}}
function contG(){try{localStorage.setItem('tcd_intro',1)}catch(e){}startG()}
function showTitle(){ovClose();const has=hasSave()||G.day>1||G.tot.rev>0,stOk=storeOk(),o=document.createElement('div');o.className='ov';o.innerHTML=`<canvas id=tc width=320 height=180 style="width:min(100%,540px);image-rendering:pixelated;border:4px solid #2a1a0c;border-radius:12px"></canvas><h2 class=logo>TIỆM CẦM ĐỒ</h2><p style="margin:0 0 8px">Kế thừa tiệm của cha. Giữ lấy nó.</p>${stOk?'':'<div class=msg style="border-left-color:#a02020;background:#f6d8d8;color:#802020;max-width:420px">⚠️ Trình duyệt đang chặn lưu dữ liệu (chế độ ẩn danh / trình duyệt trong app). Hãy mở bằng Chrome/Safari thường, hoặc dùng ⚙️ Cài đặt → Tải file save.</div>'}<button class=door style="max-width:420px" onclick="${has?'contG()':'startG()'}">▶ ${has?'CHƠI TIẾP':'CHƠI'}<small>${has?'Ngày '+G.day+' · '+fm(G.money)+(G.open?' · đang mở cửa':''):'Bắt đầu hành trình'}</small></button><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button onclick="openSet()">⚙️ Cài đặt</button><button onclick="story()">🎬 Cốt truyện</button><button class=red onclick="newGame()">🔄 Chơi lại từ đầu</button></div>`;document.body.appendChild(o);const x=$('#tc').getContext('2d');let f=0;const px=(a,b,w,h,c)=>{x.fillStyle=c;x.fillRect(a|0,b|0,w|0,h|0)};
const iv=setInterval(()=>{if(!$('#tc'))return clearInterval(iv);f++;const gr=x.createLinearGradient(0,0,0,180);gr.addColorStop(0,'#070a24');gr.addColorStop(.55,'#3a2450');gr.addColorStop(1,'#9a4a4a');x.fillStyle=gr;x.fillRect(0,0,320,180);
for(let k=0;k<50;k++){const a=((k+f/14)|0)%4;px((k*53)%320,(k*29)%85,a?1:2,a?1:2,a>1?'#fff':'#ffd27a')}
const mg=x.createRadialGradient(262,34,4,262,34,44);mg.addColorStop(0,'#fff6c8aa');mg.addColorStop(1,'#0000');x.fillStyle=mg;x.fillRect(210,0,110,90);x.fillStyle='#fbeab0';x.beginPath();x.arc(262,34,14,0,7);x.fill();px(257,30,4,3,'#e8d590');px(266,38,3,3,'#e8d590');
for(let k=0;k<3;k++)px(((k*130+f/3)%400)-60,20+k*18,50,7,'#ffffff18');
for(let k=0;k<9;k++){const h=36+(k*41%30);px(k*38-8,140-h,32,h+40,'#221338')}
for(let k=0;k<10;k++){const h=28+(k*37%36);px(k*34-6,150-h,30,h+40,'#170d2a');for(let w=0;w<6;w++)px(k*34-2+(w%2)*13,156-h+((w/2)|0)*12,6,7,((k*7+w*3+(f/50|0))%5)?'#ffd27a66':'#0007')}
px(0,150,320,30,'#1a1024');for(let k=0;k<12;k++)px(k*30+((f/2)%30)-30,168,14,2,'#ffffff22');
px(70,96,180,84,'#3a2210');for(let r=0;r<7;r++)for(let c2=0;c2<12;c2++)px(72+c2*15+(r&1)*7,98+r*11,13,9,(r+c2)%3?'#8b5a2b':'#7a4c22');
for(let k=0;k<11;k++){px(64+k*17,84,17,14,k%2?'#c8402a':'#f4e8c8');px(64+k*17,96,17,3,k%2?'#8a2a1a':'#c8b898')}
px(100,106,120,18,'#ffd27a');px(102,108,116,14,'#f6e2a0');x.fillStyle='#4a2810';x.font='700 '+Math.round(17*.7)+'px "Be Vietnam Pro",sans-serif';x.textAlign='center';x.fillText('TIỆM CẦM ĐỒ',160,120);
for(const wx of[82,206]){px(wx,130,34,32,'#5a3a1a');px(wx+2,132,30,28,(f/40|0)%9?'#ffdf80':'#e0b860');px(wx+16,132,2,28,'#5a3a1a');px(wx+2,145,30,2,'#5a3a1a');x.font='12px serif';x.fillText(wx<100?'⏰':'🏺',wx+9,142);x.fillText(wx<100?'📷':'🎸',wx+25,158)}
px(144,130,32,50,'#4a2a12');px(147,133,26,44,'#6a3c1a');px(166,154,3,3,'#f0c040');px(150,138,20,8,'#c8402a');x.fillStyle='#fff';x.font='700 '+Math.round(8*.7)+'px "Be Vietnam Pro",sans-serif';x.fillText('MỞ CỬA',160,145);
const lg=x.createRadialGradient(40,110,2,40,110,60);lg.addColorStop(0,'#ffd27a88');lg.addColorStop(1,'#0000');x.fillStyle=lg;x.fillRect(0,60,100,120);px(38,100,3,60,'#222');px(30,96,19,5,'#333');px(32,101,15,3,'#ffe9a8');
x.font='18px serif';x.fillText('🐈',200+Math.sin(f/25)*3,178);
for(let k=0;k<8;k++){const a=(f/3+k*45)%180;px(k*41+Math.sin(f/20+k)*10+20,a,2,2,'#ffe9a866')}
x.fillStyle='#8ab4ff77';for(let k=0;k<26;k++)x.fillRect((k*41+f*2)%320,(k*67+f*7)%180,1,5)},50)}

/* ===== PATCH v6: âm thanh môi trường + lời thoại thuế/giang hồ ===== */
let AMB=[],SNT=[];const vs=()=>(mute||!V.s)?0:V.s;
function ac(){AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();return AC}
let NB2;function nz(){const a=ac();if(!NB2){NB2=a.createBuffer(1,a.sampleRate*2,a.sampleRate);const d=NB2.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}return NB2}
function nse(o,dur,type,fq,vol,fq2,dc){const a=ac(),t=a.currentTime+o,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();dc=dc||Math.min(.3,dur);s.buffer=nz();s.loop=true;f.type=type;f.frequency.setValueAtTime(fq,t);if(fq2)f.frequency.linearRampToValueAtTime(fq2,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol*vs(),t+.06);g.gain.setValueAtTime(vol*vs(),t+dur-dc);g.gain.linearRampToValueAtTime(0,t+dur);s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05);AMB.push({s,g})}
function tn(o,dur,f1,vol,type,f2){const a=ac(),t=a.currentTime+o,s=a.createOscillator(),g=a.createGain();s.type=type||'sine';s.frequency.setValueAtTime(f1,t);if(f2)s.frequency.exponentialRampToValueAtTime(f2,t+dur);g.gain.setValueAtTime(vol*vs(),t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.02);AMB.push({s,g})}
const SFX={rain:(d=6,v=.07)=>nse(0,d,'bandpass',3200,v),thunder:()=>nse(0,2.6,'lowpass',200,.5,50,2.6),
knock:(n=3)=>{for(let k=0;k<n;k++){tn(k*.24,.1,140,.6,'sine',60);nse(k*.24,.05,'lowpass',400,.3)}},
step:(n=3)=>{for(let k=0;k<n;k++)nse(k*.3,.08,'lowpass',450,.22)},
car:()=>{nse(0,3.2,'lowpass',250,.16,800,1.4);tn(0,3.2,55,.06,'sawtooth',85)}};
function sfx(k,...a){if(!vs())return;try{SFX[k](...a)}catch(e){}}
function stopAmb(){SNT.forEach(clearTimeout);SNT=[];AMB.forEach(n=>{try{n.g.gain.cancelScheduledValues(0);n.g.gain.setValueAtTime(0,AC.currentTime);n.s.stop()}catch(e){}});AMB=[]}
const later=(f,ms)=>SNT.push(setTimeout(f,ms));
/* âm thanh video cốt truyện, mỗi cảnh một kiểu */
const _stZ=story;story=function(tu,i=0){stopAmb();_stZ(tu,i);if(i>=ST.length)return;try{if(i==0){sfx('rain',8);later(()=>sfx('thunder'),2600)}else if(i==1){sfx('rain',6,.045);later(()=>sfx('knock',3),1800);later(()=>snd('click'),4200)}else if(i==2){sfx('step',5);later(()=>snd('door'),1600);later(()=>sfx('rain',4,.03),300)}else if(i==3){sfx('car');later(()=>snd('coin'),2200);later(()=>snd('coin'),2700);later(()=>snd('bad'),5200)}else{later(()=>snd('done'),1800);later(()=>snd('up'),3800)}}catch(e){}};
/* âm thanh trong game: mưa khi bão, xe chạy, bước chân, gõ cửa */
const _spZ=spawn;spawn=function(){const n=queue.length;_spZ();if(queue.length>n)sfx('step',3)};
const _srZ=spawnRole;spawnRole=function(k){const n=queue.length;_srZ(k);if(queue.length>n){const q=queue[queue.length-1];q.line=pick(k=='tax'?TAXO:THUGO).replace(/\{a\}/g,fm(q.amt));sfx('step',4)}};
let lastCur=null,rt=0;setInterval(()=>{if(cur&&cur!==lastCur&&cur.role)sfx('knock',3);lastCur=cur},200);
setInterval(()=>{if(!G.open||G.over||!vs())return;if(/bão|mưa/.test(et())){if(++rt%3==0)sfx('rain',3.4,.04);if(Math.random()<.012)sfx('thunder')}if(Math.random()<.02)sfx('car')},1000);
/* lời thoại thuế / giang hồ đa dạng */
const TAXO=['Chào chủ tiệm, đến kỳ quyết toán. Số thuế là {a}, xin nộp đúng hạn.','Cục thuế đây. Sổ sách của anh/chị tính ra phải nộp {a}.','Có người báo tiệm này lãi to. Nộp thuế {a}, đừng để tôi phải kiểm tra sổ!','Đóng thuế là nghĩa vụ công dân, {a} nhé, có hóa đơn hẳn hoi.'];
const TAXB=['Con số này chưa đủ, đề nghị nộp đủ {a}.','Ít thế? Anh/chị nghĩ thuế là chợ trời chắc?','Không đúng quy định. {a}, không thiếu một đồng.'];
const THUGO=['Ê chủ tiệm, khu này anh em lo, nộp phí bảo kê {a} đi!','Nghe nói làm ăn khấm khá nhỉ? Anh Hai gửi lời hỏi thăm, gửi {a} nhé.','Tiệm đẹp đấy... đẹp mà không ai bảo vệ thì tiếc. {a} thôi.','Ê, chủ tiệm, đóng {a} cho anh em uống nước, khỏi phiền nhau.'];
const THUGB=['Ít quá, coi anh em là ăn mày à?','Giỡn mặt hả? {a}, đưa lẹ.','Cộc lốc thế à, thêm nữa đi chủ tiệm!'];
const say=(q,a,b)=>(q.kind=='tax'?a:b);const rl=(q,p)=>pick(p).replace(/\{a\}/g,fm(q.amt));
roleBid=function(){const q=cur,v=+$('#pr').value;if(v>=q.amt*.8||(v>=q.amt*.5&&Math.random()<.4+G.fx.tea*.03))return rolePay(v);q.pat--;if(q.pat<0){rolePen(1.5);return}q.line=rl(q,say(q,TAXB,THUGB));snd('click');rd()};


/* ===== PATCH v7: tỉ lệ người/vật, quầy, nhiều bậc phẩm chất ===== */
const _pn7=person;person=function(x,y,a,b,c,d,e){g.save();const k=1.3+Math.max(0,y-100)*.006;g.translate(x,y);g.scale(k,k);g.translate(-x,-y);_pn7(x,y,a,b,c,d,e);g.restore()};
const _gi7=genItem;genItem=function(){const i=_gi7();let t;if(i.rare){const r=Math.random();t=r<.04&&G.lv>=4&&G.rep>=60?5:r<.15&&G.lv>=3?4:r<.4&&G.lv>=2?3:2}else t=Math.random()<.35?1:0;i.tier=t;i.rare=t>=2;return i};
const _dr7=draw;draw=function(t){_dr7(t);if(cur&&cur.item&&cur.item.known&&mode=='main'&&!cur.item.fake){const n=TN[tr(cur.item)];TX(n[0],174,97,9,'#000');TX(n[0],173,96,9,n[1])}};


/* ===== PATCH v8: phân bố phẩm chất, thông tin, hiệu ứng ===== */
const TW=[52,28,12,5,2.2,.8],TLK=[0,0,0,2,3,4];
function tierRates(){const m=[1,1,1+.12*(G.lv-1),1+.25*(G.lv-1),1+.4*(G.lv-1),1+.6*(G.lv-1)],rb=1+G.rep/200,dl=ev&&ev.deal?1.5:1;const w=TW.map((x,k)=>G.lv>=(TLK[k]||0)+(k>=3?0:0)&&(k<3||G.lv>=TLK[k])?x*(k>=2?m[k]*rb*dl:1):0),s=w.reduce((a,b)=>a+b,0);return w.map(x=>x/s)}
function rollTier(){const r=tierRates();let x=Math.random();for(let k=0;k<6;k++){x-=r[k];if(x<0)return k}return 0}
const _gi8=genItem;genItem=function(){const i=_gi8();i.tier=rollTier();i.rare=i.tier>=2;return i};
const rateH=()=>{const r=tierRates();return'<h3>🎲 Tỉ lệ phẩm chất đồ khách mang tới</h3><div class=card>'+TN.map((n,k)=>`<div style="display:flex;justify-content:space-between;color:${n[1]}"><span>${n[2]} ${n[0]}${k>=3&&G.lv<TLK[k]?' 🔒 nhà cấp '+TLK[k]:''}</span><b>${(r[k]*100).toFixed(1)}%</b></div>`).join('')+'<small>Nhà càng cao và uy tín càng lớn, đồ quý càng dễ xuất hiện.</small></div>'};
const _mk8=mktH;mktH=function(){return _mk8()+rateH()};
/* hào quang dưới món đồ khi đã biết phẩm chất */
const _dr8=draw;draw=function(t){_dr8(t);if(cur&&cur.item&&cur.item.known&&mode=='main'&&!cur.item.fake&&tr(cur.item)>=2){g.globalAlpha=.25+.12*Math.sin(t/200);R(158,97,30,10,TN[tr(cur.item)][1]);g.globalAlpha=1}};
setInterval(()=>{const i=cur&&cur.item;if(i&&i.known&&!i.fake&&!i._t&&tr(i)>=3){i._t=1;toast('✨ '+TN[tr(i)][2]+' '+TN[tr(i)][0].toUpperCase()+'! Món đồ cực giá trị');snd('star')}},800);
ACH.push(['t4','🏺','Mắt thần','Gặp một Cổ vật',()=>G.inv.some(i=>tr(i)>=4&&i.known&&!i.fake),{m:1200,h:1}],['t5','👑','Vận may trời cho','Sở hữu một Báu vật',()=>G.inv.some(i=>tr(i)>=5&&i.known&&!i.fake),{m:3000,h:1}]);


/* ===== PATCH v9: kho vật liệu, thảm cửa, biển hiệu, hiệu ứng nâng, đồ mở khoá theo cấp nhà ===== */
mktH=(()=>{const f=mktH;return()=>f().split('<h3>🎲')[0]})();
const _sh9=shopH;shopH=()=>_sh9().replace(/ · có \d+/g,'');
const _iv9=invH;invH=function(){const own=Object.keys(M).filter(k=>(G.mats[k]||0)>0);return _iv9()+'<h3>🧰 Vật liệu đang có</h3>'+(own.length?'<div style="display:flex;flex-wrap:wrap;gap:6px">'+own.map(k=>`<div class=msg style="margin:0;font-size:20px;border-left-color:#8b5a2b;background:#f3e2b8">${M[k][0]} ${M[k][1]} <b>×${G.mats[k]}</b></div>`).join('')+'</div>':'<p>Chưa có vật liệu. Mua ở tab V.liệu.</p>')};
/* đồ mở khoá theo cấp nhà */
const LVB=[1500,2600,3200,4500,7000,99999];Object.keys(T).forEach(k=>{if(T[k].lv==null)T[k].lv=LVB.findIndex(x=>T[k].b<=x)+1});
Object.assign(T,{trunk:{n:'Rương gỗ cổ',i:'\uE01B',b:2000,lv:2,m:{wood:1,glue:1,screw:1},s:'Kiểm tra,Tháo khóa,Chà nhám,Dán lại,Đánh bóng'},bike:{n:'Xe đạp cổ',i:'\uE01C',b:2900,lv:3,m:{oil:1,screw:2,part:1},s:'Kiểm tra,Tháo xích,Tra dầu,Siết ốc,Chạy thử'},sax:{n:'Kèn saxophone',i:'\uE01D',b:3300,lv:3,m:{polish:1,part:1,cloth:1},s:'Kiểm tra,Thay đệm,Đánh bóng,Thổi thử'},pend:{n:'Đồng hồ quả lắc',i:'\uE01E',b:3800,lv:4,m:{gear:1,oil:1,wood:1,polish:1},s:'Kiểm tra,Tháo mặt,Thay bánh răng,Tra dầu,Căn giờ'},sam:{n:'Ấm samovar đồng',i:'\uE01F',b:4200,lv:4,m:{metal:1,polish:1,cleaner:1},s:'Kiểm tra,Tẩy gỉ,Hàn vết nứt,Đánh bóng'},clois:{n:'Bình cẩn men',i:'\uE020',b:6500,lv:5,m:{gem:1,polish:1,glue:1},s:'Kiểm tra,Dán mảnh vỡ,Phủ men,Đánh bóng'},scep:{n:'Quyền trượng cung đình',i:'\uE021',b:11000,lv:6,m:{metal:1,gem:1,polish:1},s:'Kiểm tra,Gắn đá,Mạ lại,Đánh bóng'},drag:{n:'Tượng rồng ngọc',i:'\uE022',b:12000,lv:6,m:{gem:1,polish:1,cloth:1},s:'Kiểm tra,Làm sạch,Mài bóng,Trưng bày'}});
const _gi9=genItem;genItem=function(){const keep=Object.keys(T),ok=keep.filter(k=>(T[k].lv||1)<=G.lv);let bad=null;const i0=_gi9();if((T[i0.type].lv||1)>G.lv){const k=pick(ok),t=T[k];i0.type=k;i0.name=t.n;i0.icon=t.i}return i0};
const _up9=upg;upg=function(){const l=G.lv;_up9();if(G.lv>l){const nw=Object.keys(T).filter(k=>T[k].lv==G.lv).map(k=>T[k].i+' '+T[k].n);celeb('#ffd27a');if(nw.length)setTimeout(()=>toast('🆕 Mở khoá '+nw.length+' loại đồ mới: '+nw.join(', ')),900)}};
/* hiệu ứng nâng cấp: pháo hoa hạt */
let PT=[],FL=0;function celeb(c){FL=14;snd('star');for(let k=0;k<50;k++){const a=Math.random()*6.28,s=1+Math.random()*2.4;PT.push({x:160,y:70,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.2,l:40+rnd(0,25),c:['#ffd27a','#ff6a6a','#8aff8a','#8ab4ff','#fff'][k%5]})}}
['buyFx','buyU'].forEach(n=>{const f=window[n];window[n]=function(...a){const m=G.money;f.apply(this,a);if(G.money<m)celeb()}});
/* thảm để ở cửa */
/* biển hiệu: bỏ viền vàng, thêm đồ trang trí theo cấp */
const _dr9=draw;draw=function(t){_dr9(t);const F=G.fx,S=F.sg||0;
if(S>=1){for(const x of[58,186]){R(x,0,1,8,'#3a2a1a');R(x-4,7,9,2,'#5a3a1a');R(x-4,9,9,11,'#c8302a');R(x-3,10,2,9,'#e8604a');R(x,20,1,4,'#ffd27a')}}
if(S>=2)for(let x=68;x<178;x+=8)R(x,33,3,3,['#ff6a6a','#ffd27a','#8aff8a','#8ab4ff'][((x/8|0)+((t/400)|0))%4]);
if(S>=3)for(let x=66;x<176;x+=10){R(x,2,7,1,'#5a3a1a');R(x+1,3,5,3,x%20?'#c8402a':'#f4e8c8')}
if(S>=4){R(196,0,1,8,'#3a2a1a');R(215,0,1,8,'#3a2a1a');R(191,8,30,13,'#2a1a10');R(192,9,28,11,'#3a2a20');TX('24H',206,18,10,'#ffd27a')}
if(S>=5){const on=G.open;R(191,24,30,10,'#101020');TX(on?'OPEN':'CLOSED',206,32,8,((t/500)|0)%6||!on?on?'#6aff8a':'#ff6a6a':'#123')}
if(FL>0){g.globalAlpha=FL/14*.35;R(0,0,320,180,'#fff');g.globalAlpha=1;FL--}
PT.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.l--;R(p.x,p.y,2,2,p.c)});PT=PT.filter(p=>p.l>0)};
/* hiệu ứng sửa/nâng đồ ở xưởng */
anim=function(){const cv=$('#wa');if(!cv||!working)return;const x=cv.getContext('2d'),c=cat(working.it.type);let f=0;const P=[];const iv=setInterval(()=>{if(!$('#wa')||!working)return clearInterval(iv);f++;const pr=working.step/Math.max(1,working.steps.length),gl=.2+.6*pr;const gr=x.createLinearGradient(0,0,0,100);gr.addColorStop(0,'#1d120a');gr.addColorStop(1,'#3a2410');x.fillStyle=gr;x.fillRect(0,0,320,100);
const sp=x.createRadialGradient(160,60,6,160,60,80);sp.addColorStop(0,'rgba(255,220,140,'+(.25+.3*pr)+')');sp.addColorStop(1,'#0000');x.fillStyle=sp;x.fillRect(0,0,320,100);
x.fillStyle='#5a3a1a';x.fillRect(0,84,320,16);x.fillStyle='#7a5228';x.fillRect(0,84,320,3);x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(160,86,40,5,0,0,7);x.fill();
x.textAlign='center';x.font='46px serif';x.save();x.globalAlpha=.55+.45*pr;x.shadowColor='rgba(255,220,120,'+gl+')';x.shadowBlur=6+16*pr;x.fillStyle='#000';x.fillText(working.it.icon,160+Math.sin(f/5)*1.5,72+Math.cos(f/6)*1.5);x.restore();
x.font='26px serif';if(c=='tune'){x.save();x.translate(235,48);x.rotate(f/8);x.fillText('⚙️',0,9);x.restore();x.save();x.translate(96,44);x.rotate(Math.sin(f/5)*.5);x.fillText('🔧',0,9);x.restore()}else if(c=='sew'){x.fillText('🪡',205+Math.sin(f/3)*14,30+Math.abs(Math.sin(f/3))*30);x.fillStyle='#e8d090';for(let k=0;k<8;k++)x.fillRect(118+k*10,80,6,2)}else x.fillText('🧽',130+Math.sin(f/3)*32,58);
if(f%2==0)P.push({x:150+rnd(0,20),y:50+rnd(0,25),vx:(Math.random()-.5)*1.4,vy:-Math.random()*1.4,l:22,c:['#ffd27a','#fff','#ffb04a'][f%3]});P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l--;x.globalAlpha=p.l/22;x.fillStyle=p.c;x.fillRect(p.x,p.y,2,2)});x.globalAlpha=1;
x.fillStyle='#000a';x.fillRect(20,92,280,5);x.fillStyle='#ffd27a';x.fillRect(20,92,280*pr,5);x.font='700 '+Math.round(14*.7)+'px "Be Vietnam Pro",sans-serif';x.fillStyle='#ffe9b0';x.fillText(working.steps[Math.min(working.step,working.steps.length-1)]||'',160,20)},50)};


/* ===== PATCH v10: mỗi máy thẩm định một cách dùng riêng ===== */
MAC[0][4]='Cách dùng: rê chùm UV lên món đồ, vết keo/sơn lạ sẽ phát sáng. Cấp cao: chùm rộng và sáng hơn';
MAC[1][4]='Cách dùng: giữ đồ trên cân đến khi số ổn định. Ngưỡng nghi giả: cấp 1 ±12%, cấp 2 ±6%';
MAC[2][4]='Cách dùng: vặn núm chỉnh nét để tìm dấu thợ. Chỉ cho biết đồ hiếm và bậc phẩm chất';
MAC[3][4]='Cách dùng: bấm bắn tia (80k), đọc thành phần chất liệu. Biết hết thật giả và bậc phẩm chất';
const MHOW={uv:'Rê ngón tay để quét chùm UV lên đồ. Vết keo hoặc sơn lạ sẽ phát sáng xanh: giữ chùm ở đó một chút. Quét kín mà không thấy gì nghĩa là không có keo lạ (vẫn có thể giả kiểu khác).',scale:'Giữ nút để đồ nằm yên trên cân, số sẽ hết nhảy. So số cân với khối lượng chuẩn: lệch quá ngưỡng là hàng giả. Đồ mòn nặng chỉ nhẹ hơn chút xíu.',micro:'Kéo núm để chỉnh nét. Ảnh rõ thì mới thấy dấu thợ thủ công: có dấu là đồ hiếm và cho biết bậc phẩm chất.',xrf:'Bấm bắn tia và chờ đọc phổ. Máy phân tích chất liệu và cho biết chắc chắn thật giả cùng bậc phẩm chất, mỗi lần 80k.'};
function openM(k){if(cur.item.known)return toast('Đã biết rõ món này rồi');cur.mch=k;rd()}
function xrfGo(){if(cur.xgo)return;if(G.money<80)return toast('Cần 80k phí vận hành');ad(-80);cur.xgo=1;G.min+=10;ui()}
function mcH(k){const i=cur.item,d=MAC.find(m=>m[0]==k),l=G.mc[k]||1;const ctl={uv:'',scale:'<button class=big id=mhold>⚖️ Giữ để cân</button>',micro:'<div>🔬 Núm chỉnh nét<input type=range id=mfoc min=0 max=100 value=50 style="width:100%"></div>',xrf:'<button class=big onclick=xrfGo()>📡 Bắn tia (80k)</button>'}[k];
return`<b>${d[1]} ${d[2]} (cấp ${l}) · ${i.icon} ${i.name}</b><div class=card>${MHOW[k]}<br><b id=mr>${i.known?(i.fake?'⚠️ HÀNG GIẢ!':'Đây là '+TN[tr(i)][0].toUpperCase()+'!'):''}</b></div><canvas id=mcv width=320 height=180 style="width:100%;border:4px solid #2a1a0c;border-radius:10px;touch-action:none;background:#0c0814"></canvas>${ctl}<button onclick="cur.mch=null;rd()">↩ Quay lại</button>`}
const _ap10=apH;apH=function(){if(cur&&cur.mch)return mcH(cur.mch);return _ap10().replace(/onclick="mach\('(\w+)'\)"/g,'onclick="openM(\'$1\')"')};
const _ea10=endAp;endAp=function(){cur.mch=null;_ea10()};
const _rd10=rd;rd=function(){_rd10();if($('#mcv'))mcInit()};
function mcInit(){const cv=$('#mcv'),x=cv.getContext('2d'),q=cur,k=q.mch,i=q.item,l=G.mc[k]||1;const L={x:160,y:90,on:0},st={t:0,c:new Set(),d:0,done:0};let held=0;
const msg=(t,bad)=>{const e=$('#mr');if(e)e.textContent=t;snd(bad?'bad':'star');ui()};
const pos=e=>{const r=cv.getBoundingClientRect(),t=e.touches?e.touches[0]:e;L.x=(t.clientX-r.left)*320/r.width;L.y=(t.clientY-r.top)*180/r.height;L.on=1;e.preventDefault()};['pointermove','pointerdown','touchmove','touchstart'].forEach(v=>cv.addEventListener(v,pos,{passive:false}));
const hb=$('#mhold');if(hb){['pointerdown','touchstart'].forEach(v=>hb.addEventListener(v,e=>{held=1;e.preventDefault()},{passive:false}));['pointerup','pointerleave','touchend','touchcancel'].forEach(v=>hb.addEventListener(v,()=>held=0))}
if(k=='uv'&&!i._uv)i._uv=i.fake?[0,1,2].map(()=>({x:rnd(70,250),y:rnd(30,150),d:0})):[];
const wt=([...i.type].reduce((a,c)=>a+c.charCodeAt(0),0)*3)%700+150;if(i._mw==null)i._mw=Math.round(wt*(i.fake?1+(Math.random()<.5?-1:1)*(.09+Math.random()*.2):1-(100-i.cond)*.0006+(Math.random()-.5)*.03));
if(i._f0==null)i._f0=rnd(15,85);
const iv=setInterval(()=>{if(!$('#mcv')||cur!==q||q.mch!=k)return clearInterval(iv);x.fillStyle='#0c0814';x.fillRect(0,0,320,180);x.textAlign='center';
if(k=='uv'){x.globalAlpha=.3;x.font='120px serif';x.fillStyle='#000';x.fillText(i.icon,160,135);x.globalAlpha=1;const R2=38+12*l;i._uv.forEach(p=>{const d=Math.hypot(p.x-L.x,p.y-L.y);if(d<R2){const g2=x.createRadialGradient(p.x,p.y,1,p.x,p.y,14);g2.addColorStop(0,'#b8ff7a');g2.addColorStop(1,'#0000');x.fillStyle=g2;x.fillRect(p.x-14,p.y-14,28,28);if(!st.done&&d<R2*.8&&++p.d>=7&&!i.known){i.known=true;st.done=1;G.min+=5;q.line='Ơ... sao anh/chị soi kỹ vậy?';msg('⚠️ Vết keo lạ phát sáng: HÀNG GIẢ!',1)}}});
if(L.on){const gr=x.createRadialGradient(L.x,L.y,2,L.x,L.y,R2);gr.addColorStop(0,'rgba(170,110,255,.6)');gr.addColorStop(1,'#0000');x.fillStyle=gr;x.fillRect(L.x-R2,L.y-R2,R2*2,R2*2);for(let cx=0;cx<8;cx++)for(let cy=0;cy<5;cy++)if(Math.hypot(cx*40+20-L.x,cy*36+18-L.y)<R2)st.c.add(cx+8*cy)}
const cov=Math.min(100,Math.round(st.c.size/40*100));x.font='700 '+Math.round(14*.7)+'px "Be Vietnam Pro",sans-serif';x.fillStyle='#c8a0ff';x.fillText('Đã quét: '+cov+'%',60,172);if(!st.done&&cov>=85&&!i.known){st.done=1;G.min+=5;msg('Sạch dưới UV: không có keo/sơn lạ (vẫn có thể giả kiểu khác).')}}
else if(k=='scale'){x.fillStyle='#5a4a3a';x.fillRect(80,120,160,14);x.fillStyle='#3a2e22';x.fillRect(150,134,20,26);x.font='58px serif';x.fillStyle='#000';x.fillText(i.icon,160,118-(held?0:4));if(held)st.t=Math.min(70,st.t+1);else st.t=Math.max(0,st.t-3);const jit=Math.max(0,1-st.t/60)*wt*.25,rd2=Math.round(i._mw+(Math.random()-.5)*2*jit),tol=[12,6][Math.min(l,2)-1];x.fillStyle='#0a2a14';x.fillRect(100,12,120,36);x.font='700 '+Math.round(30*.7)+'px "Be Vietnam Pro",sans-serif';x.fillStyle=st.t>=60?'#6aff8a':'#3a9a5a';x.fillText(rd2+' g',160,40);x.font='700 '+Math.round(14*.7)+'px "Be Vietnam Pro",sans-serif';x.fillStyle='#ffe9b0';x.fillText('Chuẩn: '+wt+' g · ngưỡng ±'+tol+'% · cond '+i.cond+'%',160,66);x.fillStyle='#000a';x.fillRect(100,74,120,6);x.fillStyle='#ffd27a';x.fillRect(100,74,120*st.t/60,6);
if(st.t>=60&&!st.done){st.done=1;G.min+=4;const dv=Math.abs(i._mw-wt)/wt*100;if(dv>tol&&i.fake){i.known=true;q.line='Ơ... sao anh/chị soi kỹ vậy?';msg('⚠️ Lệch '+dv.toFixed(0)+'% vượt ngưỡng: HÀNG GIẢ!',1)}else msg('Khối lượng trong ngưỡng: bình thường (chưa chắc là thật).')}if(!held&&st.t<60)st.done=0}
else if(k=='micro'){const v=+$('#mfoc').value,bl=Math.abs(v-i._f0)/6;x.fillStyle='#1c1a26';x.beginPath();x.arc(160,90,80,0,7);x.fill();x.font='110px serif';x.fillStyle='#000';for(let a=0;a<8;a++){x.globalAlpha=.16;x.fillText(i.icon,160+Math.cos(a)*bl,125+Math.sin(a)*bl)}x.globalAlpha=1;
if(bl<1.6){const rare=i.rare&&tr(i)>=2;x.font='700 '+Math.round(18*.7)+'px "Be Vietnam Pro",sans-serif';x.fillStyle=rare?'#ffd27a':'#9a9aa8';x.fillText(rare?'✦ Dấu thợ: '+'★'.repeat(tr(i)-1):'Không thấy dấu thợ',160,160);if(!st.done&&++st.d>=30){st.done=1;G.min+=5;if(rare){i.known=true;msg('💎 Có dấu thợ thủ công: '+TN[tr(i)][0].toUpperCase()+'!')}else msg('Không có dấu thợ: đồ thường hoặc tốt.')}}else st.d=0}
else{if(q.xgo){st.t++;if(st.t>=90&&!st.done){st.done=1;q.xgo=0;i.known=true;msg(i.fake?'📡 Thành phần sai chuẩn: HÀNG GIẢ!':'📡 Chất liệu chuẩn: '+TN[tr(i)][0].toUpperCase()+'!',i.fake)}}
x.font='60px serif';x.fillStyle='#000';x.fillText(i.icon,60,100);const seed=[...i.type].reduce((a,c)=>a+c.charCodeAt(0),0);for(let b=0;b<12;b++){const hgt=(q.xgo||st.done)?8+((seed*(b+3))%60)*Math.min(1,st.t/60)+(st.done?0:Math.random()*8):3;x.fillStyle=i.fake&&st.done?'#ff6a6a':'#6ab8ff';x.fillRect(120+b*15,150-hgt,10,hgt)}x.fillStyle='#000a';x.fillRect(120,158,180,6);x.fillStyle='#ffd27a';x.fillRect(120,158,180*Math.min(1,st.t/90),6);if(q.xgo){x.fillStyle='rgba(120,200,255,.25)';x.fillRect(90,60+Math.sin(st.t/4)*30,220,3)}}},40)}

/* ===== PATCH v11: khách bán hàng giả phản ứng khi bị soi ===== */
const FSC=['Ơ... soi gì mà kỹ vậy?','Hàng gia truyền đó, đừng làm xước nha!','Tôi đang vội, nhanh giùm cái.','Ánh sáng gì mà chói vậy trời...','Anh/chị nghi tôi đấy à?','Cái máy này có chính xác không đó?','Soi làm gì, hàng xịn 100% mà!','Sao mặt chủ tiệm nghiêm trọng vậy...'];
const RSC=['Cứ soi thoải mái, hàng thật mà.','Anh/chị soi kỹ đi, tôi không ngại.','Ừ, cứ kiểm tra cho yên tâm.'];
const CAU={deny:['Máy hỏng chứ hàng tôi không giả!','Không thể nào, tôi mua ở tiệm lớn mà!','Anh/chị soi sai rồi, đồ này thật 100%!'],blame:['Hả? Tôi cũng bị lừa à? Người bán thề là thật mà!','Thằng bạn đưa cái này, tôi có biết đâu!'],plead:['Thôi mà, bỏ qua cho tôi, tôi đang cần tiền gấp.','Tôi xin lỗi, đừng nói ai nha...','Thương tình giúp tôi, nhà có mẹ già...'],threat:['Anh/chị nói gì? Coi chừng cái miệng đó!','Đừng làm lớn chuyện, tôi có quen biết đấy!','Bôi nhọ tôi hả? Tiệm này chờ xem!'],flee:['Ờ... tôi nhớ ra có việc, đi đây!','Tôi bận rồi, lát quay lại!','Thôi không bán nữa!']};
function bubble(t,ms){if(cur)cur.bub={t,u:Date.now()+(ms||3500)}}
const _om11=openM;openM=function(k){_om11(k);scanSay()};
const _ap11=appr;appr=function(){_ap11();scanSay()};
function scanSay(){const q=cur;if(!q||!q.item||q.item.known||q.kind=='buy'||q.role)return;const t=q.item.fake?pick(FSC):Math.random()<.4?pick(RSC):null;if(t){q.line=t;bubble(t);if(q.item.fake&&Math.random()<.4)q.em='angry'}}
setInterval(()=>{const q=cur,i=q&&q.item;if(i&&i.fake&&!i.known&&(q.ap||q.mch)&&!q.role&&q.kind!='buy'&&Math.random()<.6)bubble(pick(FSC),3000)},4000);
setInterval(()=>{const q=cur,i=q&&q.item;if(!i||!i.fake||!i.known||i._c||q.kind=='buy'||q.role)return;i._c=1;const r=Math.random(),ty=r<.28?'deny':r<.42?'blame':r<.62?'plead':r<.8?'threat':'flee';q.line=pick(CAU[ty]);bubble(q.line,3800);q.em=ty=='plead'?'sad':ty=='flee'?'':'angry';snd(ty=='flee'?'door':'bad');
if(ty=='threat'&&Math.random()<.35){G.rep=cl(G.rep-1,0,100);toast('😠 Khách hằn học đi rêu rao: -1 uy tín')}
if(ty=='flee')setTimeout(()=>{if(cur===q){toast('🏃 Khách bỏ chạy, mang theo món đồ giả!');leave()}},2400)},400);
const _dr11=draw;draw=function(t){_dr11(t);const q=cur;if(q&&q.bub&&Date.now()<q.bub.u&&mode=='main'){const ls=wr(q.bub.t,24),w=Math.min(150,Math.max(...ls.map(l=>l.length))*5+10),h=ls.length*10+6,bx=clp(q.x-w/2,2,318-w),by=q.y-82-h;R(bx,by,w,h,'#3b2616');R(bx+1,by+1,w-2,h-2,'#fffdf0');R(q.x-2,by+h,4,3,'#3b2616');ls.forEach((l,k)=>TX(l.trim(),bx+w/2,by+9+k*10,9,'#3b2616'))}};
/* khôi phục nhân viên thuế / giang hồ đi vào tiệm */
/* ===== PATCH v12: font, hướng dẫn bắt buộc, bảng giá, khách tiếc nuối ===== */
document.head.insertAdjacentHTML('beforeend','<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&display=swap" rel="stylesheet">');
document.head.insertAdjacentHTML('beforeend',`<style>
html,body,#app,#dlg,#nav,#top,button,input,select,textarea,.ov,.ov *,#tut,#tut *,#set,#set *,#toast{font-family:'Be Vietnam Pro',system-ui,-apple-system,sans-serif!important;letter-spacing:0!important}
body{font-size:15px!important;line-height:1.45!important}
#top{font-size:13px!important;font-weight:700;gap:3px!important}#top span{padding:1px 6px!important}
#dlg{font-size:14.5px!important;line-height:1.5!important;font-weight:500}
#dlg h3{font-size:17px!important;font-weight:800;margin:10px 0 6px!important}
#dlg small,small{font-size:12.5px!important;line-height:1.4}
#dlg b{font-weight:700}
.ln{font-size:15px!important;font-weight:600;margin:4px 0 6px!important}
.msg,.card,.row{font-size:14px!important;line-height:1.45}
button{font-size:13.5px!important;font-weight:700;padding:5px 11px!important}
.big{font-size:17px!important;padding:9px!important}
.door{font-size:21px!important;font-weight:800;gap:2px}.door small{font-size:12px!important;font-weight:600}
input,select{font-size:15px!important;font-weight:700}
#nav button{font-size:10.5px!important;font-weight:700}#nav button span{font-size:20px!important}
.chips button,.chatrow button,.tabs button{font-size:12.5px!important;padding:4px 6px!important}
.tag{font-size:11px!important}
.ov p{font-size:15px!important}.ov .sub{font-size:16px!important;font-weight:600;line-height:1.5!important}.ov .cap{font-size:13px!important;font-weight:700;letter-spacing:4px!important}
.ov .lg,.ov h2{font-size:clamp(34px,10vw,50px)!important;font-weight:800;line-height:1!important}
.ov .mn .play,.ov .mn .sec{font-size:17px!important}.ov .sk{font-size:13px!important}
#tut{position:fixed!important;top:calc(env(safe-area-inset-top,0px) + 46px)!important;bottom:auto!important;left:8px;right:8px;max-width:500px;margin:auto;z-index:45!important;background:#fff6dc;border:3px solid #2a1a0c;border-radius:14px;padding:9px 11px;box-shadow:0 6px 0 #0006,0 0 0 3px #ffd27a}
#tut .tk{font-size:11px;font-weight:800;color:#a2662a;letter-spacing:1px;margin-bottom:3px}#tut .tb{font-size:14px;line-height:1.5;color:#3b2616;font-weight:600}#tut .big{margin:8px 0 0!important;width:100%}

.tuthl{position:relative;z-index:3;outline:4px solid #ffd27a;outline-offset:2px;border-radius:8px;animation:tup .7s infinite alternate}#dlg.tuthl{outline:none;animation:none}
@keyframes tup{to{outline-color:#ff9a3a;box-shadow:0 0 16px #ffd27a}}
.mkb{background:#fffaf0;border:3px solid #2a1a0c;border-radius:12px;padding:8px 10px;margin:10px 0}.mkb .g{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:6px 0}.mkb .c{display:flex;justify-content:space-between;align-items:center;gap:4px;background:#f7ebcf;border-radius:8px;padding:4px 7px;font-size:12px;font-weight:600}.mkb .c span:last-child{text-align:right;font-weight:800}.up{color:#2a7a20}.dn{color:#a02020}
</style>`);
/* --- bảng giá trước khi mở cửa --- */
function mkBoard(){const a=Object.keys(T).map(k=>{const m=G.mk[k]||1,o=G.mh[k]||1;return{k,m,d:m-o}}).sort((x,y)=>y.d-x.d);return`<div class=mkb><b>📈 Bảng giá thị trường hôm nay</b><br><small>${et()}</small><div class=g>${a.map(x=>{const p=Math.round((x.m-1)*100);return`<div class=c><span>${T[x.k].i} ${T[x.k].n}${G.hot==x.k?' 🔥':''}</span><span class="${x.d>=0?'up':'dn'}">${x.d>=0?'▲':'▼'} ${p>0?'+':''}${p}%<br>${fm(r10(T[x.k].b*x.m))}</span></div>`}).join('')}</div><small>Phần trăm so với giá gốc, mũi tên so với hôm qua. Mua món đang rớt giá, bán món đang lên giá.</small></div>`}
const _mhB=mainH;mainH=function(){let h=_mhB();if(!G.open&&!summ&&!confirmC&&!G.over&&h.includes('openShop()'))h=h.replace(/<button class=door onclick=openShop\(\)>/,m=>mkBoard()+m);return h};
/* --- khách đến sau tiếc nuối khi món đã bán --- */
const REGT=['Ôi, món tôi định mua bị người khác mua mất rồi... tiếc quá!','Đến muộn một bước! Thôi, để lần sau vậy...','Trời ơi, tôi nhắm món đó từ lâu mà... buồn ghê.','Hết hàng rồi à? Tiếc thật, chào chủ tiệm.'];
const regRev=q=>{addRev(q,3,'Đến muộn một bước, món tôi ưng bị người khác mua mất. Tiếc ghê!');q.em='sad'};
setInterval(()=>{if(!G.open)return;queue.slice().forEach(q=>{if(q.kind!='buy'||!q.item||q.reg)return;if(G.inv.includes(q.item)&&q.item.shown)return;q.reg=1;q.em=Math.random()<.4?'cry':'sad';q.line=pick(REGT);fx.push({t:'💔 Tiếc quá!',x:q.x,y:q.y-52,c:'#a02020',l:100});if(q===cur){bubble(q.line,2600);rd();setTimeout(()=>{if(cur===q){if(Math.random()<.5)regRev(q);leave()}},2800)}else setTimeout(()=>{const k=queue.indexOf(q);if(k<0)return;if(q===cur){if(Math.random()<.5)regRev(q);leave();return}queue.splice(k,1);gone.push(q);if(Math.random()<.5)regRev(q)},1800)})},400);
const _mhR=mainH;mainH=function(){if(cur&&cur.reg&&mode=='main'&&G.open&&!summ&&!confirmC)return`<b>${cur.npc.n}</b><span class=ln>“${cur.line}”</span><div class=msg style="border-left-color:#a02020;background:#f6d8d8;color:#802020">😢 Khách đến muộn, món họ định mua đã bán cho người khác.</div><button onclick=leave()>👋 Tiễn khách</button>`;return _mhR()};
/* --- hướng dẫn bắt buộc --- */
let TU={on:0,i:0,pressed:0,t0:0,tq:null,tb:null,used:0};const Q=x=>[...document.querySelectorAll(x)];
const _spT=spawn;spawn=function(){if(TU.on)return;_spT()};const _srT=spawnRole;spawnRole=function(k){if(TU.on)return;_srT(k)};
const _apT=appr;appr=function(){_apT();if(TU.on&&cur&&cur.tutq)TU.used=1};
function tutSpawn(){const it=genItem();it.fake=it.rare=false;it.cond=70;it.age=30;const e=est(it),q={npc:NPCS[1],x:32,y:106,kind:'sell',item:it,tutq:1,pat:8,em:'',ask:r10(e*.8),def:r10(e*.68)};q.line='Chào chủ tiệm! Tôi muốn bán món này, chủ tiệm xem giúp tôi nhé.';S.cust++;queue.push(q);TU.tq=q;snd('door')}
function tutSpawnB(){const it=TU.tq.item,p=it.price||(it.price=r10(vis(it)*1.15)),w=r10(Math.max(p*.88,(it.cost||0)*1.15)),q={npc:NPCS[2],x:32,y:106,kind:'buy',item:it,tutb:1,pat:3,em:'',wtp:w,s:p<=w?'ok':'hag'};q.line=q.s=='ok'?'Món này đẹp quá, tôi lấy luôn!':'Hơi đắt... '+fm(w)+' được không?';S.cust++;queue.push(q);TU.tb=q;snd('door')}
const dq=x=>Q(x),nv=n=>[Q('#nav button')[n]].filter(Boolean),IT=()=>TU.tq.item;
const TS2=[
{t:'Chào mừng chủ tiệm mới! Hướng dẫn này khoảng 3 phút: bạn sẽ mở cửa, mua một món đồ của khách, đặt giá, trưng bày rồi bán lại để kiếm lời. Hãy bấm đúng nút được <b>viền vàng</b> ở mỗi bước, các nút khác sẽ bị khóa.',btn:'Bắt đầu học',ok:()=>TU.pressed},
{t:'Mỗi ngày bạn bắt đầu bằng nút <b>MỞ CỬA</b>. Cuộn xuống và bấm nút viền vàng. Phía trên nút là <b>bảng giá thị trường</b> của hôm nay: hãy nhìn qua, giá đồ thay đổi mỗi ngày.',sel:()=>dq('button[onclick^="openShop"]'),ok:()=>G.open},
{t:'Đợi một chút, khách đầu tiên sắp bước vào tiệm... Khi chưa có khách, thời gian trong tiệm tự chạy; có khách ở quầy thì thời gian dừng lại.',act:tutSpawn,ok:()=>cur&&cur.tutq},
{t:()=>`Khách này muốn <b>BÁN</b> ${IT().icon} ${IT().name} cho tiệm. Trong khung thông tin: <b>"Khách mong muốn"</b> là giá họ muốn nhận (${fm(TU.tq.ask)}); <b>"Giá thị trường"</b> là giá trị ước tính. Mua rẻ hơn giá thị trường thì bán lại mới có lãi.`,btn:'Đã hiểu',sel:()=>dq('#dlg .card').slice(0,1),ok:()=>TU.pressed},
{t:'Trước khi trả giá hãy <b>THẨM ĐỊNH</b>: hàng giả mua vào là mất tiền, còn đồ hiếm bán được giá gấp đôi. Bấm nút <b>Thẩm định</b> (biểu tượng kính lúp).',sel:()=>dq('button[onclick="appr()"]'),ok:()=>TU.used},
{t:'Chọn dụng cụ và làm theo màn hình. Với kính lúp: <b>kéo</b> ngón tay hoặc chuột lên món đồ để soi từng chỗ (soi lâu tốn thêm thời gian). Thấy dấu đỏ là <b>hàng giả</b>, dấu vàng là <b>đồ hiếm</b>. Xong thì bấm <b>Kết luận/Xong</b> để quay lại quầy.',btn:'Xong thẩm định, sang trả giá',sel:()=>dq('#dlg'),ok:()=>TU.pressed||(TU.used&&Date.now()-TU.t0>2500&&Q('button[onclick="offer()"]').length&&!Q('#apc').length)},
{t:()=>`Bây giờ <b>MẶC CẢ</b>: nhập số tiền bạn trả vào ô (đơn vị nghìn đồng) rồi bấm <b>Trả giá</b>. Khách muốn ${fm(TU.tq.ask)}. Trả bằng hoặc cao hơn thì khách chốt ngay; thấp hơn thì khách có thể chấp nhận hoặc từ chối, mỗi lần từ chối họ bớt kiên nhẫn. Trả quá thấp khách sẽ giận bỏ đi. Gợi ý: thử khoảng <b>${fm(r10(TU.tq.ask*.8))}</b>.`,sel:()=>dq('#pr,button[onclick="offer()"]'),ok:()=>G.inv.includes(IT())},
{t:'Bạn đã mua được món đồ! Giờ vào <b>KHO</b> để đặt giá bán và trưng bày.',sel:()=>nv(1),ok:()=>mode=='inv'},
{t:()=>`Ô <b>"Bán"</b> là giá bạn muốn bán. Nên đặt cao hơn vốn (${fm(IT().cost||0)}) khoảng 20-40% để có lãi, quá cao thì khách chê. Khi ưng giá, bấm <b>Trưng bày</b> để đưa món lên tủ: <b>khách chỉ mua đồ đang trưng bày</b>.`,sel:()=>dq(`input.pin[data-id="${IT().id}"],[onclick="tg(${IT().id})"]`),act:()=>{const sl=LV[G.lv-1][3],sh=G.inv.filter(i=>i.shown&&i!==IT());let ex=sh.length+1-sl;while(ex-->0&&sh.length)sh.shift().shown=false;rd()},ok:()=>IT().shown},
{t:'Quay lại màn hình <b>TIỆM</b> để đón khách mua.',sel:()=>nv(0),ok:()=>mode=='main'},
{t:'Có khách đang tới xem món bạn trưng bày...',act:tutSpawnB,ok:()=>cur&&cur.tutb},
{t:()=>`Khách này muốn <b>MUA</b> nhưng trả thấp hơn giá tiệm. <b>Đồng ý</b> là bán theo giá khách đưa (vẫn có lãi khi cao hơn vốn ${fm(IT().cost||0)}); <b>Giữ giá</b> thì khách có thể bỏ đi. Hãy bấm nút <b>Đồng ý</b>.`,sel:()=>dq('button[onclick="bAccept()"]'),ok:()=>!G.inv.includes(IT())},
{t:'Bạn đã biết cách kiếm tiền! Cuối ngày (20:00) hoặc khi bấm <b>ĐÓNG CỬA</b>, game sẽ tổng kết thu chi, rồi bạn bấm <b>Sang ngày mới</b>. Tiền thuê nhà bị trừ mỗi ngày nên phải có lãi. Mỗi sáng có <b>bảng giá thị trường</b> mới ngay trên nút MỞ CỬA. Nhớ <b>thẩm định</b> trước khi mua và <b>trưng bày</b> đồ để có khách. Chúc bạn làm ăn phát đạt!',btn:'Bắt đầu chơi!',ok:()=>TU.pressed}];
function tutPanel(){let p=$('#tut');if(!p){p=document.createElement('div');p.id='tut';document.body.appendChild(p)}const s=TS2[TU.i],tx=typeof s.t=='function'?s.t():s.t,k=TU.i+tx;if(p.dataset.k===k)return;p.dataset.k=k;p.innerHTML=`<div class=tk>HƯỚNG DẪN · BƯỚC ${TU.i+1}/${TS2.length}</div><div class=tb>${tx}</div>`+(s.btn?`<button class=big onclick="tutNext()">${s.btn}</button>`:'')+'<button id=tskip style="display:block;width:100%;margin-top:6px;background:#8a7a6a" onclick="tutEnd()">⏭ Bỏ qua hướng dẫn</button>'}
function tutMark(){const s=TS2[TU.i];if(!s)return;let els=[];try{els=s.sel?s.sel():[]}catch(e){}Q('.tuthl').forEach(e=>{if(!els.includes(e))e.classList.remove('tuthl')});els.forEach(e=>e.classList.add('tuthl'));if(els[0]&&TU.sc!==TU.i+els[0].tagName+els.length){TU.sc=TU.i+els[0].tagName+els.length;if(els[0].scrollIntoView)els[0].scrollIntoView({block:'center',behavior:'smooth'})}tutPanel()}
function tutGo(i){TU.i=i;TU.pressed=0;TU.t0=Date.now();TU.sc='';const s=TS2[i];if(s.act)s.act();tutMark()}
function tutNext(){if(TU.i==5&&cur){cur.ap=null;cur.mch=null;cur.xgo=0;rd()}TU.pressed=1}
function tutStart(){if(!G.open&&G.min>=1150)G.min=480;TU={on:1,i:0,pressed:0,t0:0,tq:null,tb:null,used:0};document.body.classList.add('tuton');mode='main';rd();tutGo(0)}
function tutEnd(){TU.on=0;document.body.classList.remove('tuton');const p=$('#tut');if(p)p.remove();Q('.tuthl').forEach(e=>e.classList.remove('tuthl'));try{localStorage.setItem('tcd_tut',1)}catch(e){}toast('🎓 Hoàn thành hướng dẫn, chúc bạn may mắn!');save();rd()}
const _rdT=rd;let _lm=mode;rd=function(){const d=$('#dlg'),st=d?d.scrollTop:0,same=_lm==mode;_lm=mode;_rdT();if(TU.on){if(same)$('#dlg').scrollTop=st;tutMark()}};
['click','dblclick'].forEach(ev=>document.addEventListener(ev,e=>{if(!TU.on)return;const t=e.target;if(t.closest&&(t.closest('.tuthl')||t.closest('#tut')))return;e.stopPropagation();e.preventDefault()},true));
setInterval(()=>{if(!TU.on)return;if(TU.i<=11&&summ){newDay();toast('☀️ Đã sang ngày mới để tiếp tục hướng dẫn');return tutGo(1)}if(TU.i<=11&&G.open&&G.min>1100)G.min=1100;if(TU.i<=1){if(!G.open&&G.min>=1150)G.min=480;if(confirmC){confirmC=false;rd()}}if([2,3,4,5,6,10,11].includes(TU.i)&&mode!='main'){mode='main';rd()}const sk=$('#tskip');if(sk)sk.style.display='block';const s=TS2[TU.i];let ok=0;try{ok=s.ok()}catch(e){}if(ok){if(TU.i>=TS2.length-1)return tutEnd();return tutGo(TU.i+1)}tutMark();{const el=Q('.tuthl')[0];if(el&&el.id!='dlg'&&el.closest('#dlg')){const d=$('#dlg').getBoundingClientRect(),r=el.getBoundingClientRect();if((r.bottom>d.bottom-4||r.top<d.top+4)&&Date.now()-(TU.ls||0)>1200){TU.ls=Date.now();el.scrollIntoView({block:'center'})}}}if(TU.tq&&TU.i>=2&&TU.i<=6&&!queue.includes(TU.tq)&&!G.inv.includes(IT())){toast('😅 Khách bỏ đi rồi, thử lại nhé!');TU.used=0;tutGo(2)}if(TU.tb&&TU.i>=10&&TU.i<=11&&!queue.includes(TU.tb)&&G.inv.includes(IT())){toast('😅 Khách bỏ đi rồi, thử lại nhé!');tutGo(10)}},250);
tut=function(){tutStart()};
/* ===== hướng dẫn: mở lại được + tự bật cho người chưa học ===== */
function tutAgain(){ovClose();if(typeof closeSet=='function')closeSet();if(G.open||cur||summ||confirmC||TU.on)return toast('Hãy đóng cửa, sang ngày mới rồi bấm lại nhé.');if(G.inv.length>=LV[G.lv-1][2]-1)return toast('Kho gần đầy, hãy bán bớt đồ trước khi xem hướng dẫn.');if(G.money<1500)return toast('Cần ít nhất 1.500k để làm hướng dẫn.');try{localStorage.removeItem('tcd_tut')}catch(e){}tutStart()}
const _stT=showTitle;showTitle=function(){_stT();const r=document.querySelector('.ov div[style*="flex"]');if(r&&!r.querySelector('.tutb'))r.insertAdjacentHTML('afterbegin','<button class=tutb onclick="tutAgain()">🎓 Hướng dẫn</button>')};
const _osT=openSet;openSet=function(){_osT();const b=document.querySelector('#set .box');if(b&&!b.querySelector('.tutb'))b.insertAdjacentHTML('beforeend','<button class="big tutb" onclick="tutAgain()">🎓 Xem hướng dẫn chơi</button>')};

/* ===== sửa lỗi lưu giữa lúc tổng kết + khởi động ===== */
const _svF=save;save=function(){if(summ||G.min>=1200)return;_svF()};
startG=function(){ovClose();let seen=0,td=0;try{seen=localStorage.getItem('tcd_intro');td=localStorage.getItem('tcd_tut')}catch(e){}if(!G.open&&G.min>=1150&&!summ&&!cur)newDay();if(!seen)return story(1);if(!td&&G.day<=1&&!G.open&&!cur&&!summ&&!confirmC&&G.inv.length<LV[G.lv-1][2]-1&&G.money>=1500)tutStart()};

/* ===== PATCH v13: cảnh báo đầy kho/tủ, tiến độ, kho chia tab ===== */
document.head.insertAdjacentHTML('beforeend','<style>.wn{border-left-color:#c03030!important;background:#fbe0d8!important;color:#7a2010!important}.wo{border-left-color:#d08a20!important;background:#fbeccc!important;color:#7a4a10!important}.msg button{margin:6px 4px 0 0}</style>');
const capL=()=>LV[G.lv-1][2],slL=()=>LV[G.lv-1][3];
const _tgN=tg;tg=function(id){const i=G.inv.find(x=>x.id==id);if(i&&!i.shown&&G.inv.filter(x=>x.shown).length>=slL()){toast('🚫 Hết chỗ trưng bày! Cất bớt một món hoặc nâng cấp tiệm để mở rộng tủ.');return}_tgN(id)};
let _wf=(()=>({k:G.inv.length>=capL(),s:G.inv.filter(i=>i.shown).length>=slL()}))();
setInterval(()=>{if(G.over)return;const k=G.inv.length>=capL(),sf=G.inv.filter(i=>i.shown).length>=slL()&&G.inv.some(i=>!i.shown&&!i.cust);if(k&&!_wf.k)toast('📦 Kho đã đầy! Hãy bán bớt hoặc nâng cấp tiệm để mở rộng.');if(sf&&!_wf.s&&G.open)toast('🪟 Tủ trưng bày hết chỗ! Cất bớt hoặc nâng cấp tiệm.');_wf={k,s:sf}},700);
const _mhW=mainH;mainH=function(){let h=_mhW();if(cur&&G.open&&!summ&&mode=='main'&&(cur.kind=='sell'||cur.kind=='fix')&&G.inv.length>=capL())h+=`<div class="msg wn">📦 Kho đã đầy (${G.inv.length}/${capL()}): tiệm không nhận thêm đồ. Hãy bán bớt hoặc <button onclick="mode='up';rd()">nâng cấp tiệm</button></div>`;return h};
let ikt='a';
const _ivF=invH;invH=function(){const secs=_ivF().split(/(?=<h3>)/),g3={a:[],b:[],c:[]};secs.forEach(x=>g3[/Vật liệu/.test(x.slice(0,60))?'b':/đấu giá/.test(x.slice(0,60))?'c':'a'].push(x));
const cap=capL(),sl=slL(),n=G.inv.length,sh=G.inv.filter(i=>i.shown).length,own=Object.values(G.mats).reduce((a,b)=>a+(b>0?b:0),0);if(ikt=='c'&&!g3.c.length)ikt='a';
let h='<div class=chips><button class="'+(ikt=='a'?'on':'')+'" onclick="ikt=\'a\';rd()">📦 Đồ · '+n+'/'+cap+'</button><button class="'+(ikt=='b'?'on':'')+'" onclick="ikt=\'b\';rd()">🧰 Vật liệu · '+own+'</button>'+(g3.c.length?'<button class="'+(ikt=='c'?'on':'')+'" onclick="ikt=\'c\';rd()">🔨 Đấu giá</button>':'')+'</div>';
if(ikt=='a'){const up=`<button onclick="mode='up';rd()">Nâng cấp tiệm</button>`;if(n>=cap)h+=`<div class="msg wn">🚫 <b>Kho đã đầy (${n}/${cap})</b>: không nhận thêm đồ mới. Hãy bán bớt đồ hoặc mở rộng kho.<br>${up}</div>`;else if(cap-n<=1)h+=`<div class="msg wo">⚠️ Kho sắp đầy (${n}/${cap}). Nên bán bớt hoặc nâng cấp tiệm.</div>`;
if(sh>=sl)h+=`<div class="msg wn">🪟 <b>Tủ trưng bày hết chỗ (${sh}/${sl})</b>: hãy cất bớt một món hoặc nâng cấp tiệm để có thêm chỗ.<br>${up}</div>`;
let b=g3.a.join('');const note=(b.match(/<small>\* Giá ước[\s\S]*$/)||[''])[0];b=b.replace(note,'');const pr=b.split(/(?=<div class=row>)/),hd=pr.shift(),rows=pr.filter(x=>x.includes('>Cất<')).concat(pr.filter(x=>!x.includes('>Cất<')));h+=hd+(sh&&rows.length>sh?'<small>Đang trưng bày ở trên cùng.</small>':'')+rows.join('')+note}
else if(ikt=='b'){const need={};G.inv.filter(i=>i.cond<98&&!i.cust||i.cust).forEach(i=>{const t=T[i.type];if(t&&i.cond<98)for(const k in t.m)need[k]=(need[k]||0)+t.m[k]});const nk=Object.keys(need);h+=g3.b.join('')+`<button class=big onclick="mode='shop';rd()">🏬 Mua thêm vật liệu</button>`;if(nk.length)h+='<h3>🔧 Cần để sửa đồ trong kho</h3>'+nk.map(k=>{const have=G.mats[k]||0,ok=have>=need[k];return`<div class=row><div>${M[k][0]} ${M[k][1]}</div><b style="color:${ok?'#2a7a20':'#a02020'}">${have}/${need[k]} ${ok?'✅':'thiếu '+(need[k]-have)}</b></div>`}).join('')}
else h+=g3.c.join('');return h};
/* --- thanh tiến độ nhiệm vụ & điều kiện nâng cấp --- */
const bar1=(p,n,c)=>`<div class=bar style="width:100%;margin-top:4px"><i style="width:${Math.min(100,n?p/n*100:0)}%${c?';background:'+c:''}"></i></div>`;
const _bkP=bookH;bookH=function(){return _bkP().replace(/(<small>\((\d+)\/(\d+)\)[^<]*<\/small>)/g,(m,a,p,n)=>a+bar1(+p,+n,+p>=+n?'#5f9445':'#c9975a'))};
const rp=l=>{const n=parseFloat(((l.match(/(\d+(?:,\d+)?)/)||[0,'1'])[1]).replace(',','.'));if(/giao dịch/.test(l))return[cn('deals'),n];if(/Uy tín/.test(l))return[+(G.rep/20).toFixed(1),n,1];if(/sửa/.test(l))return[cn('fixed'),n];if(/hiếm/.test(l))return[G.c.rare,n];if(/ngày/.test(l))return[G.day,n];if(/thuế/.test(l))return[G.c.tax,n];if(/thành tựu/.test(l))return[Object.keys(G.ach).length,n];return null};
const fmp=p=>p[2]?String(p[0]).replace('.',',')+'/'+String(p[1]).replace('.',',')+'★':Math.min(p[0],p[1])+'/'+p[1];
function condCard(){const R=REQ[G.lv+1]||[],dn=R.filter(r=>r[1]()).length,cost=LV[G.lv][1];let h=`<div class=card><b>📋 Điều kiện nâng cấp · ${dn}/${R.length}</b>${bar1(dn,R.length,dn==R.length?'#5f9445':'#c9975a')}`;R.forEach(r=>{const p=rp(r[0]),ok=r[1]();h+=`<div style="margin:7px 0 2px">${ok?'✅':'⬜'} ${r[0]}${p?` <b style="float:right">${fmp(p)}</b>`:''}${p?bar1(p[0],p[1],ok?'#5f9445':'#c9975a'):''}</div>`});if(cost)h+=`<div style="margin:7px 0 2px">💰 Tiền nâng cấp <b style="float:right">${fm(Math.min(G.money,cost))}/${fm(cost)}</b>${bar1(G.money,cost,G.money>=cost?'#5f9445':'#c9975a')}</div>`;return h+'</div>'}
const _u0P=upH0;upH0=function(){return _u0P().replace(/<div class=card><b>📋 Điều kiện nâng cấp<\/b><br>[\s\S]*?<\/div>/,()=>condCard())};
setInterval(()=>{if(TU.on&&TU.i>=7&&TU.i<=8&&mode=='inv'&&ikt!='a'){ikt='a';rd()}},300);


/* === [moved to modules: lines 835-846] === */
/* ===== v8: âm thanh môi trường, phim cốt truyện có tiếng, thoại quan chức ===== */
document.head.insertAdjacentHTML('beforeend','<style>#sub{font:27px/1.2 VT323,monospace;color:#ffe9b0;text-shadow:2px 2px 0 #000;max-width:580px;min-height:100px;padding:12px 16px;text-align:center;letter-spacing:.5px}</style>');
const zx=()=>{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();return AC};let zNB=null;
const zb=()=>{if(!zNB){const a=zx(),b=a.createBuffer(1,a.sampleRate*2,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;zNB=b}return zNB};
function zn(dur,f0,f1,vol,type='bandpass',q=1){if(mute||!V.s)return;try{const a=zx(),s=a.createBufferSource(),fl=a.createBiquadFilter(),gn=a.createGain(),t=a.currentTime;s.buffer=zb();fl.type=type;fl.Q.value=q;fl.frequency.setValueAtTime(f0,t);fl.frequency.linearRampToValueAtTime(f1,t+dur);gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(vol*V.s,t+dur*.25);gn.gain.linearRampToValueAtTime(0,t+dur);s.connect(fl);fl.connect(gn);gn.connect(a.destination);s.start(t);s.stop(t+dur)}catch(e){}}
function zt(f,d,w,v,f2){if(mute||!V.s)return;try{const a=zx(),o=a.createOscillator(),gn=a.createGain(),t=a.currentTime;o.type=w;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.linearRampToValueAtTime(f2,t+d);gn.gain.setValueAtTime(v*V.s,t);gn.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(gn);gn.connect(a.destination);o.start(t);o.stop(t+d)}catch(e){}}
const SFXZ={knock:()=>[0,160,320].forEach(d=>setTimeout(()=>{zt(120,.1,'sine',.35,70);zn(.06,400,200,.1,'lowpass')},d)),car:()=>{zn(2.8,220,750,.13,'bandpass',1.5);zt(60,2.6,'sawtooth',.025,90)},thunder:()=>zn(2.2,220,50,.3,'lowpass'),thud:()=>{zt(90,.14,'sine',.3,55);zn(.07,300,120,.1,'lowpass')},crash:()=>{zn(.5,3500,700,.22,'highpass');zt(180,.25,'square',.08,60)},creak:()=>{zt(180,.35,'sawtooth',.05,300);setTimeout(()=>zt(260,.3,'sawtooth',.04,170),380)}};
let zR=null,zSR=0;const rainSet=v=>{zSR=v};
setInterval(()=>{const want=!mute&&V.s&&!G.over&&(zSR||(G.open&&ev.rain));try{if(want&&!zR){const a=zx(),s=a.createBufferSource(),fl=a.createBiquadFilter(),gn=a.createGain();s.buffer=zb();s.loop=true;fl.type='lowpass';fl.frequency.value=1700;gn.gain.value=.045*V.s;s.connect(fl);fl.connect(gn);gn.connect(a.destination);s.start();zR={s,gn}}else if(!want&&zR){zR.s.stop();zR=null}else if(zR)zR.gn.gain.value=.045*V.s}catch(e){}},1000);
setInterval(()=>{if(G.open&&!cur&&!G.over){if(Math.random()<.1)SFXZ.car();if(ev.rain&&Math.random()<.04)SFXZ.thunder()}},9000);
let zdl=0;setInterval(()=>{if(S.deals>zdl)SFXZ.thud();zdl=S.deals},300);
const _sp8=spawn;spawn=function(){const n=queue.length;_sp8();if(queue.length>n&&Math.random()<.5)SFXZ.knock()};
/* sudden: giữ lại thuế/giang hồ của bạn + bắt trộm lấy lại tiền */
sudden=function(){if(TU.on)return;const r=Math.random(),X=G.sx,K=G.sec||0,blk=Math.min(.8,.1*((X.alarm||0)+(X.gate||0)+(X.dog||0))+.1*K);
if(G.open&&r<.18){const k=G.day>=4&&r<.06?'tax':'thug';if(k=='thug'&&Math.random()<blk){toast('🛡️ An ninh đã đuổi nhóm giang hồ trước khi chúng vào tiệm');G.rep=cl(G.rep+1,0,100);ui();return}spawnRole(k);return}
const e=pick(SU0),th=/cướp|Trộm|trộm|bịt mặt/.test(e[0]);if(th&&Math.random()<blk){toast('🛡️ An ninh đã ngăn chặn: '+e[0].replace(/[!.]$/,''));G.rep=cl(G.rep+1,0,100);ui();return}const m0=G.money;toast(e[0]);snd('star');if(th)SFXZ.crash();e[1]();ui();
if(th)setTimeout(()=>{const l=m0-G.money;if(l>=100&&Math.random()<Math.min(.85,.12+.15*(X.dog||0)+.1*K+.05*(X.alarm||0))){const b=r10(l*(.5+Math.random()*.5));ad(b);G.rep=cl(G.rep+1,0,100);toast((X.dog?'🐕 Chó nghiệp vụ':'🚔 An ninh')+' truy bắt được tên trộm, lấy lại '+fm(b)+'!');snd('coin');ui()}},2800)};
/* thoại thuế & giang hồ */
const ra=(t,a)=>t.replace(/\{a\}/g,fm(a)),TXL=['Chào chủ tiệm, đến kỳ nộp thuế. Phần của anh/chị là {a}.','Sở thuế đây. Sổ sách còn thiếu {a}, mời anh/chị hoàn thành nghĩa vụ.','Tôi phụ trách thu thuế khu này, số tiền là {a}. Chuẩn bị hóa đơn giúp tôi.','Kiểm tra định kỳ nhé chủ tiệm, truy thu {a}, đừng để tôi phải quay lại lần hai.','Nghe nói tiệm dạo này ăn nên làm ra? Vậy nộp {a} là hợp lý đấy.'],THL=['Ê chủ tiệm, khu này anh em lo, nộp phí bảo kê {a} đi!','Làm ăn ở phố này phải biết điều. {a}, đưa đây!','Tiệm xinh quá, để anh em trông giùm cho, phí {a}.','Hôm nay anh Ba cần tiền. Nộp {a} rồi ai làm nấy ăn.','Đừng để anh em hỏi lần hai. {a}, nhanh!'],TNY=['Thôi được, xét tiệm nhỏ, giảm còn {a}.','Hồ sơ cũng có điều đáng thông cảm, tôi ghi {a}.','Lần này ưu tiên điều chỉnh xuống {a}.'],TNN=['Anh/chị đang chất vấn cán bộ đấy à? Tăng lên {a}!','Thương lượng không có trong quy định. Truy thu {a}.','Thái độ này tôi ghi vào biên bản: {a}.'],GNY=['Ừ thôi, nể mặt, còn {a} thôi đấy.','Hôm nay anh Ba vui, giảm còn {a}.','Chủ tiệm khéo nói, {a} thì {a}.'],GNN=['Dám cãi hả? Tăng lên {a}!','Mày coi anh em là ai? {a}, không thì đóng cửa!','Nhiều lời quá, thêm tiền phạt nói nhiều: {a}!'],TBL=['Con số này không đúng quy định. Phải là {a}.','Anh/chị đùa à? {a} mới hợp lệ.','Không thể chấp nhận, hồ sơ yêu cầu {a}.'],GBL=['Ít quá! Đưa {a} đây.','Coi tụi tao là ăn mày à? {a}!','Thiếu rồi, {a} mới đủ.'],TPY=['Cảm ơn, tôi xuất biên lai.','Đã nhận. Hẹn kỳ sau.','Chấp hành tốt, tiệm sẽ được ghi nhận.'],GPY=['Biết điều đấy, tao đi.','Ok, hôm nay yên ổn.','Tụi tao sẽ để mắt giùm tiệm.'],RPN=['Lập biên bản!','Chờ đấy!','Rồi sẽ hối hận!'],GDF=['Rút đi tụi bây!','Chúng nó có chuẩn bị rồi, đi thôi!','Thôi thôi, tao chịu thua.'],fq=(q,t)=>fx.push({t,x:q.x,y:q.y-58,c:q.rc,l:90});
const _sr8=spawnRole;spawnRole=function(k){const n=queue.length;_sr8(k);if(queue.length>n){const q=queue[queue.length-1];q.line=ra(pick(k=='tax'?TXL:THL),q.amt);SFXZ.knock();if(k=='thug')setTimeout(SFXZ.crash,500)}};
roleNeg=function(){const q=cur,t=q.kind=='tax';q.neg=1;if(Math.random()<.3+G.rep/300+(G.sec?.15:0)){q.amt=r10(q.amt*.7);q.line=ra(pick(t?TNY:GNY),q.amt)}else{q.amt=r10(q.amt*1.2);q.line=ra(pick(t?TNN:GNN),q.amt)}rd()};
const _rb8=roleBid;roleBid=function(){const q=cur,b=q.line;_rb8();if(cur===q&&q.line!==b){q.line=ra(pick(q.kind=='tax'?TBL:GBL),q.amt);rd()}};
const _rpy8=rolePay;rolePay=function(v){const q=cur;_rpy8(v);if(q)fq(q,pick(q.kind=='tax'?TPY:GPY))};
const _rpn8=rolePen;rolePen=function(m){const q=cur;_rpn8(m);if(q)fq(q,pick(RPN))};
const _rdf8=roleDef;roleDef=function(){const q=cur,c0=G.c.rob;_rdf8();if(q&&G.c.rob>c0)fq(q,pick(GDF))};
/* phim cốt truyện: phụ đề chữ HTML + âm thanh */
const NOTES=[220,262,330,262,196,247,294,247];
function story(tu,i=0){ovClose();clearInterval(window.sv);rainSet(0);if(i>=ST.length){try{localStorage.setItem('tcd_intro',1)}catch(e){}ovClose();return tu?tut(0):0}
const o=document.createElement('div');o.className='ov';o.style.padding='0';o.innerHTML=`<canvas id=mv width=320 height=180 style="width:min(92vw,420px);max-height:34dvh;height:auto;image-rendering:pixelated"></canvas><div id=sub></div><button id=skipStory style="position:relative;z-index:5;margin:8px auto 12px;display:block" onclick="story(${tu?1:0},99)">⏭ Bỏ qua cốt truyện</button>`;document.body.appendChild(o);
const x=$('#mv').getContext('2d'),sc=SC[i%5],T=ST[i][1],N=T.length*2+110,se=$('#sub');rainSet(sc[2]);if(i==0)SFXZ.thunder();if(i==1)setTimeout(SFXZ.car,900);if(i==3){SFXZ.knock();setTimeout(SFXZ.creak,700)}if(i==4)snd('day');let f=0;
window.sv=setInterval(()=>{if(!$('#mv')){clearInterval(window.sv);rainSet(0);return}f++;if(f>N)return story(tu,i+1);se.textContent=T.slice(0,f/2|0);if(f%36==1)zt(NOTES[((f/36)|0)%8]*(i==4?1.26:1),1,'triangle',.05);
const gr=x.createLinearGradient(0,0,0,180);gr.addColorStop(0,sc[0]);gr.addColorStop(1,sc[1]);x.fillStyle=gr;x.fillRect(0,0,320,180);
const z=1+f/900;x.save();x.translate(160,90);x.scale(z,z);x.translate(-160,-90);x.translate(-f/40,0);for(let k=0;k<12;k++){const h=40+((k*53+i*17)%50);x.fillStyle='#120a20';x.fillRect(k*36-10,130-h,30,h+50);x.fillStyle='#ffd27a66';for(let w=0;w<4;w++)if((k+w+i)%3)x.fillRect(k*36-5+(w%2)*13,136-h+((w/2)|0)*14,6,7)}
x.fillStyle='#0a0510';x.fillRect(-20,138,380,60);const lg=x.createRadialGradient(160,120,4,160,120,90);lg.addColorStop(0,sc[2]?'#8ab4ff44':'#ffb04a66');lg.addColorStop(1,'#0000');x.fillStyle=lg;x.fillRect(0,0,340,180);
x.font='46px serif';x.textAlign='center';[...ST[i][0]].forEach((e,k)=>x.fillText(e,140+k*50+Math.sin(f/18+k)*2,132+Math.cos(f/22+k)*2));if(sc[2]){x.fillStyle='#9ec4ff';for(let k=0;k<40;k++)x.fillRect((k*41+f*3)%340,(k*67+f*8)%180,1,6)}x.restore();
x.fillStyle='#000';x.fillRect(0,0,320,14);x.fillRect(0,166,320,14);x.fillStyle='rgba(255,255,255,.06)';for(let k=0;k<50;k++)x.fillRect(Math.random()*320,Math.random()*180,1,1);const vg=x.createRadialGradient(160,90,70,160,90,200);vg.addColorStop(0,'#0000');vg.addColorStop(1,'#000a');x.fillStyle=vg;x.fillRect(0,0,320,180);
const a=Math.max(1-f/20,f>N-20?(f-(N-20))/20:0);if(a>0){x.fillStyle='rgba(0,0,0,'+a+')';x.fillRect(0,0,320,180)}x.fillStyle='#ffd27a';x.fillRect(0,177,320*f/N,2)},40)}

/* đánh dấu tab đang mở để CSS gọn áp đúng chỗ */
const _rdC=rd;rd=function(){_rdC();const d=$('#dlg');if(d)d.dataset.t=[...document.querySelectorAll('#nav button')].findIndex(b=>b.classList.contains('on'))};


/* === [moved to icons.js] === */
/* ===== v6: gộp tab (Kho+Xưởng+Vật liệu / Sổ+Đánh giá) ===== */
let kvt='k',rvt='b';
const chipB=(c,a,v)=>'<div style="display:flex;gap:6px;margin:0 0 8px">'+a.map(x=>`<button style="flex:1;${c==x[0]?'background:#3f8a3a;outline:3px solid #ffd27a':''}" onclick="${v}='${x[0]}';rd()">${x[1]} ${x[2]}</button>`).join('')+'</div>';
const _ivM=invH;invH=function(){return chipB(kvt,[['k','📦','Kho'],['w','🛠️','Xưởng'],['s','🏬','Vật liệu']],'kvt')+(kvt=='w'?wkH():kvt=='s'?shopH():_ivM())};
const _bkM=bookH;bookH=function(){return chipB(rvt,[['b','📒','Sổ sách'],['r','⭐','Đánh giá']],'rvt')+(rvt=='r'?revH():_bkM())};
const _rdM=rd;rd=function(){const m={wk:['inv','kvt','w'],shop:['inv','kvt','s'],rev:['book','rvt','r']}[mode];if(m){mode=m[0];if(m[1]=='kvt')kvt=m[2];else rvt=m[2]}else if(mode=='inv'&&((typeof MGM!='undefined'&&MGM)||(typeof working!='undefined'&&working)))kvt='w';if(mode=='inv'&&TU&&TU.on)kvt='k';_rdM()};
document.head.insertAdjacentHTML('beforeend','<style>#nav button .ic{width:1.55em;height:1.55em}#nav button{font-size:11px!important}</style>');


/* === [moved to modules: lines 1159-1220] === */


/* === [moved to modules: lines 1222-1459] === */


(()=>{
window.__bubs=[];
const box=()=>document.getElementById('bubbles');
const pool=[];let bubH=0;
const flush=()=>{const el=box();if(!el)return;const cv=document.getElementById('cv');const h=cv?cv.clientHeight:0;if(h&&h!==bubH){bubH=h;el.style.height=h+'px'}
const bs=window.__bubs;for(let i=0;i<bs.length;i++){let n=pool[i];if(!n){n=pool[i]=document.createElement('i');el.appendChild(n)}const b=bs[i];n.textContent=b.t;n.style.left=(b.x/320*100)+'%';n.style.top=(b.y/180*100)+'%';n.style.transform='translate(-50%,-110%)';n.style.display='block'}
for(let i=bs.length;i<pool.length;i++)if(pool[i].style.display!='none')pool[i].style.display='none';window.__bubs=[]};
const _d=draw;draw=function(t){window.__bubs=[];_d(t);flush()};
})();


(()=>{
G.chairs=G.chairs||2;
const chairCost=()=>r10(1600*G.lv*(1+(chairs()-2)*.3));
window.buyChair=function(){const n=chairs(),extra=n-2;if(extra>=G.lv)return toast('Cấp nhà này chỉ mua thêm '+G.lv+' ghế');if(n>=SEAT_MAX)return;const c=chairCost();if(G.money<c)return toast('Không đủ tiền thêm ghế');G.money-=c;G.tot.cost+=c;G.chairs=n+1;snd('up');toast('Đã thêm ghế, phòng chứa '+(G.chairs+1)+' khách');rd();ui()};
const _upC=upH;upH=function(){const n=chairs(),extra=n-2,c=chairCost(),cap=Math.min(SEAT_MAX-2,G.lv);return _upC()+'<h3>🪑 Nâng cấp ghế</h3><div class=card>Cấp nhà '+G.lv+': được mua thêm '+cap+' ghế. Đã mua '+extra+'/'+cap+'.<br><small>Nhà có sẵn 2 ghế + 1 quầy. Cấp nhà càng cao, ghế thêm càng đắt.</small><br>'+(extra>=cap?'<small>Nâng cấp nhà để mua thêm ghế.</small>':'<button '+(G.money<c?'disabled':'')+' onclick=buyChair()>Thêm ghế · '+fm(c)+'</button>')+'</div>'};
})();

(()=>{
document.head.insertAdjacentHTML('beforeend',"<style>.deal{display:flex;align-items:center;gap:4px;flex-wrap:nowrap}.deal input{width:62px;text-align:center}.deal button{flex:1;font-size:14px;padding:4px 2px;margin:0}.deal select{width:42px}#shade{position:fixed;inset:0;z-index:70;background:#3a241488;display:none}#shade.on{display:block}#pad{position:fixed;left:10px;right:10px;bottom:10px;z-index:80;display:none;pointer-events:auto;background:#fff6e4;color:#3b2616;border:3px solid #2a1a0c;border-radius:22px;padding:10px 10px 12px;box-shadow:0 10px 0 #2a1a0c}#pad.on{display:block}#pad b{display:block;text-align:center;font-size:34px;margin:2px 0 8px;background:#fff;border:3px solid #e2c48a;border-radius:14px;padding:4px}#pad small{display:block;text-align:center;color:#8a6240;margin-bottom:6px}#pad .g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}#pad button{font-size:24px;padding:10px 0;margin:0;border-radius:14px;background:#f3d7a2;color:#3b2616;box-shadow:0 3px 0 #c4924e;touch-action:manipulation}#pad button[data-k=\"0\"]{grid-column:span 2}#pad button.dn{transform:translateY(2px);box-shadow:0 1px 0 #c4924e}#pad small.h{margin:8px 0 0;font-size:13px}input.pin,#pr{cursor:pointer;caret-color:transparent}#dlg[data-t] input.pin,#dlg[data-t] #pr,#dlg[data-t] .deal input{font-size:16px!important;width:68px!important;height:auto}input,select,textarea{font-size:16px!important}html,body{touch-action:manipulation}</style>");
const shade=document.createElement('div');shade.id='shade';document.body.appendChild(shade);
const pad=document.createElement('div');pad.id='pad';
pad.innerHTML='<small id=pt>Giá bạn trả</small><b id=pv>0</b><div class=g>'+['1','2','3','4','5','6','7','8','9','\u232b','0'].map(k=>'<button type=button data-k="'+k+'">'+k+'</button>').join('')+'</div><small class=h>Chạm ra ngoài để xác nhận</small>';document.body.appendChild(pad);
const pvEl=pad.querySelector('#pv'),ptEl=pad.querySelector('#pt');let pr=null;
const show=v=>{pvEl.textContent=v||'0'};
const find=()=>{if(pr&&pr.isConnected)return pr;if(pr&&pr._sel){const e=document.querySelector(pr._sel);if(e){pr=e;return e}}return null};
const commit=fin=>{const el=find();if(!el)return;if(el.id=='pr'){if(fin)el.value=el.value||'0';try{pv()}catch(err){}}else if(el.dataset.id){const it=G.inv.find(x=>x.id==el.dataset.id);try{setP(+el.dataset.id,el.value)}catch(err){}if(fin&&it)el.value=it.price}};
const closePad=()=>{commit(true);pad.classList.remove('on');shade.classList.remove('on');const n=document.getElementById('nav');if(n)n.style.pointerEvents='';try{document.activeElement&&document.activeElement.blur()}catch(err){}};
shade.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();closePad()});
pad.addEventListener('pointerdown',e=>{const b=e.target.closest('button');e.stopPropagation();if(!b)return;e.preventDefault();b.classList.add('dn');setTimeout(()=>b.classList.remove('dn'),90);snd('click');const el=find();if(!el)return;const k=b.dataset.k;el.value=k=='\u232b'?el.value.slice(0,-1):(el.value.length<7?(el.value+k).replace(/^0+(\d)/,'$1'):el.value);show(el.value);commit(false)},{passive:false});
window.closePad=closePad;
window.openPad=function(el){pr=(el&&el.tagName=='INPUT')?el:document.getElementById('pr');if(!pr)return;if(pr.id=='pr')pr._sel='#pr';else if(pr.dataset.id)pr._sel='input.pin[data-id="'+pr.dataset.id+'"]';ptEl.textContent=pr.id=='pr'?(cur&&cur.kind=='fix'?'Phí sửa (nghìn đồng)':cur&&cur.kind=='pawn'?'Số tiền cho vay':cur&&cur.role?'Số tiền bạn đưa':'Giá bạn trả'):'Giá bán (nghìn đồng)';show(pr.value);shade.classList.add('on');pad.classList.add('on');const n=document.getElementById('nav');if(n)n.style.pointerEvents='none'};
})();
const _off=offer;offer=function(){const p=document.getElementById('pad');if(p)p.classList.remove('on');const s=document.getElementById('shade');if(s)s.classList.remove('on');const n=document.getElementById('nav');if(n)n.style.pointerEvents='';return _off.apply(this,arguments)};

(()=>{
let lock=0;
document.addEventListener('pointerup',e=>{
  const b=e.target.closest&&e.target.closest('button');
  if(!b||b.disabled||b.closest('#pad')||b.closest('#shade')||document.getElementById('pad')?.classList.contains('on'))return;
  const now=performance.now();
  if(now-lock<280)return;
  lock=now;
  snd('click');
  if(e.pointerType==='touch'){e.preventDefault();b.click()}
});
})();


/* ===== v12: đánh giá kiểu Gen Z, bỏ từ tục tĩu quá mức ===== */
(()=>{
const ADD={
hien:{5:['Hồi chiều trời mưa, mua xong tóc mượt hẳn, da cũng sáng lên luôn. Uy tín nha mọi người!','Tiệm nhỏ mà ấm cúng, cảm giác như được chữa lành thật sự. 5 sao không bàn cãi!','Chủ tiệm nói chuyện nhẹ nhàng ghê, tui bán đồ mà cứ tưởng đi tâm sự.','Hết nước chấm! Tiệm này mà không 5 sao thì tui đi bộ về nhà.'],
4:['Ổn áp nha, chỉ thiếu một ly trà sữa để thành 5 sao.','Giá được á, chủ tiệm hơi lạnh lùng kiểu "người lớn" nhưng được việc.','Cũng được á, hông chê vào đâu được mà khen thì ngại.'],
3:['Bình thường như cơm văn phòng, ăn được mà không nhớ.','Tiệm ok, mà tui đang trong era "hơi thất vọng" nhẹ.'],
2:['Hy vọng nhiều quá nên tụt mood luôn á chủ tiệm ơi.','Tưởng tiệm chữa lành, hóa ra tiệm chữa... ví.'],
1:['Mua đồ chưa kịp vui đã thấy ví khóc, một sao cho tiệm tự suy ngẫm.','Review này không phải ghét, chỉ là tui buồn nhẹ thôi á. Một sao.']},
hai:{5:['Mày tin tao ỉa trước quán không, tao ỉa nhiều lắm á. (Ý là tao ghé quán này nhiều lắm, 5 sao nha!)','Quán gì mà xịn xò con bò vậy trời, chốt đơn không cần suy nghĩ!','Đỉnh nóc kịch trần bay phấp phới, giới thiệu cho cả hội luôn!','Check var rồi nha, tiệm này uy tín 100%, tui bảo chứng.','Vào cầm đồ mà ra tâm trạng như đi spa. Chữa lành là đây chứ đâu!','Bán đồ xong mà thấy mình là nhân vật chính, nhạc nền còn nổi lên nữa.'],
4:['Chốt đơn nhanh hơn người yêu cũ chặn tui, trừ một sao vì chờ hơi lâu.','Giá ổn, chỉ thiếu ly trà sữa miễn phí là hoàn hảo.','Tạm ổn nha, mong lần sau mặc cả dễ thở hơn xíu.'],
3:['Ba sao: một cho tiệm, một cho con mèo, một cho lòng tốt của tui.','Mặc cả xong thấy mình mất cả danh dự lẫn tiền, nhưng thôi cũng được.'],
2:['Giá này tui nhìn mà thấy cuộc đời bất công. Hai sao thôi.','Chủ tiệm trả giá kiểu này chắc sợ tui giàu, ví tui đang khóc trong túi.','Kiểu "ơ kìa" mà không nói nên lời, hai sao nha.'],
1:['Một sao vì không cho được sao âm. Toang thật sự luôn á chủ tiệm ơi.','Giá này là giá cầm đồ hay giá cầm nợ vậy trời? Hết nước chấm luôn!','Out trình luôn! Trả giá như đi chợ phiên chiều cuối năm.','Chủ tiệm ơi giá này mà tui chấp nhận là tui sống sai cách rồi.']},
gh:{5:['Chủ tiệm biết điều ha. Anh em ghé ủng hộ dài dài, ai bắt nạt tiệm cứ báo anh.','Chơi đẹp nên tui nể. Có gì cần cứ alo, đã là người nhà.'],
4:['Cũng ổn á, lần sau chơi đẹp hơn thì tui còn ghé nha chủ tiệm.'],
3:['Cũng bình thường. Đừng để tui phải nhắc lại lần hai nha.'],
2:['Giá này mà tui bị chặt là tui hơi cấn nha chủ tiệm, liệu hồn.','Anh em đứng ngoài cửa rồi đấy, trả giá cho tử tế đi.'],
1:['Mày biết bố mày là ai không mà dám ép giá? Anh em đang xếp hàng ngoài cửa nhé.','Ép giá kiểu này là toang đó chủ tiệm. Tối nay ngủ ngon nhé, anh em ghé thăm.','Tui hiền thôi, chứ mấy ông anh của tui thì không. Liệu mà trả cao lên.']},
kho:{5:['Tui khó tính nổi tiếng mà vẫn phải thốt lên: hết nước chấm. 5 sao.'],
4:['Ổn đó, nhưng tui vẫn thấy còn thiếu chút chuyên nghiệp nha.'],
3:['Check kỹ rồi, tạm được, chưa đủ để tui giới thiệu bạn bè.'],
2:['Thẩm định kiểu này là hơi lướt á, tui hy vọng nhiều hơn.'],
1:['Làm ăn thiếu chuyên nghiệp quá, tui đăng review khắp nơi cho cả phố biết luôn.','Check var rồi, tiệm này không đạt, đừng bắt tui nói lần hai.']}};
for(const st in ADD)for(const k in ADD[st])STY[st][k].push(...ADD[st][k]);
const GEN={5:ADD.hai[5].concat(ADD.hien[5]),4:ADD.hai[4].concat(ADD.hien[4]),3:ADD.hai[3].concat(ADD.hien[3]),2:ADD.hai[2].concat(ADD.hien[2]),1:ADD.hai[1].concat(ADD.hien[1])};
for(const k in GEN)RV[k].push(...GEN[k]);
TP[5].push(i=>`${i} xịn xò con bò luôn á, chốt đơn không cần suy nghĩ!`,i=>`Mua ${i} xong tâm trạng tốt hẳn, chữa lành thật sự.`);
TP[4].push(i=>`${i} ổn áp, giá vừa túi tiền sinh viên.`);
TP[3].push(i=>`${i} ok thôi, kiểu "cũng được á".`);
TP[2].push(i=>`${i} làm ví tui khóc nhẹ, mong lần sau dễ thở hơn.`);
TP[1].push(i=>`${i} mà giao dịch kiểu này là toang thật sự, một sao cho tiệm suy ngẫm.`);
})();
