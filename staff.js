/* staff.js — nhân viên thẩm định/thợ sửa + hội thoại. Load SAU core.js */
/* ===== v8: nhân viên + hội thoại ===== */
(()=>{
G.staff=G.staff||{app:null,mech:null,log:[]};
G.staff.log=G.staff.log||[];
['app','mech'].forEach(k=>{const s=G.staff[k];if(s){if(typeof s.mor!='number'||!isFinite(s.mor))s.mor=100;s.lv=Math.max(1,Math.min(3,s.lv|0||1));s.xp=s.xp|0;s.err=s.err|0}});
if(G.staff?.app?.job && !G.inv.some(i=>i&&i.id==G.staff.app.job)){G.staff.app.busy=0;G.staff.app.job=0;}
if(G.staff?.mech?.job && !G.inv.some(i=>i&&i.id==G.staff.mech.job)){G.staff.mech.busy=0;G.staff.mech.job=0;}
const ROLES={
app:{n:'Thẩm định viên',job:'soi đồ',col:'#3a6a9a',hair:'#2a1a12',hire:1800,pay:160,x:208,y:98,need:1,ico:'🔎',desc:'Bấm Thẩm định khi khách đưa đồ: nhân viên soi thay bạn trong vài phút game, bạn khỏi phải tự soi bằng kính lúp. Cấp thấp có thể bỏ sót hàng giả (báo “chắc là thật”).'},
mech:{n:'Thợ sửa',job:'sửa đồ',col:'#3d6a44',hair:'#1a120c',hire:2400,pay:200,x:278,y:96,need:2,ico:'🔧',desc:'Bấm Sửa trong Xưởng: thợ nhận việc và tự sửa trong lúc bạn tiếp khách, cả đơn sửa của khách. Cấp cao sửa tốt hơn, nhanh hơn, đỡ mệt hơn; cấp 3 đôi khi tiết kiệm vật liệu.'}
};
const NAMES={app:['Lan','Hà','Mai','Chi'],mech:['Hùng','Dũng','Khoa','Tâm']};
const AP_T=l=>Math.max(1,4-l),AP_MISS=l=>.2-.06*l,AP_DROP=l=>[Math.max(1,3-2*(l-1)),Math.max(4,10-2*(l-1))];
const MC_Q=l=>[16+3*l,30+3*l],MC_T=(n,l)=>Math.max(4,n*3-2*l),MC_DROP=l=>Math.max(1,3-l),MC_SAVE=l=>l>=3?.15:0;
const needXp=(k,l)=>(k=='app'?4:5)+l*2;
function effText(k,l){if(k=='app'){const d=AP_DROP(l);return 'Soi '+AP_T(l)+' phút · sót hàng giả '+Math.round(AP_MISS(l)*100)+'% · −'+d[0]+'–'+d[1]+' tinh thần/lần'}const q=MC_Q(l);return 'Sửa +'+q[0]+'–'+q[1]+'% chất lượng · ~'+MC_T(5,l)+' phút/đồ 5 bước · −'+MC_DROP(l)+' tinh thần/lần'+(l>=3?' · 15% tiết kiệm vật liệu':'')}
function lvUp(k){const s=G.staff[k];if(!s||s.lv>=3||s.xp<needXp(k,s.lv))return;s.lv++;s.xp=0;say(k,'Em tự lên cấp '+s.lv+' rồi ạ. '+effText(k,s.lv),'happy')}
const LIN={
hi:{app:['Em vào làm đây ạ. Đồ nào chưa soi, em xem giúp.','Chào anh/chị. Em để kính lúp trong túi rồi.'],mech:['Em nhận bàn xưởng. Có vật liệu là em sửa.','Khỏe. Đưa đồ hỏng qua đây.']},
doneApp:['Soi xong {it}. Em thấy {ver}.','Báo cáo: {it} — {ver}. Anh/chị xem lại nếu đắt.','{it} em soi rồi. {ver}'],
miss:['Em soi {it} rồi… chắc là thật.','{it} nhìn ổn ạ. Em không thấy gì lạ.'],
fake:['Khoan! {it} có dấu hiệu giả. Đừng bày bán.','Báo cáo gấp: {it} là hàng giả.'],
doneFix:['Sửa xong {it}, giờ {q}%.','{it} em trả lại rồi, tình trạng {q}%.','Bàn xưởng xong {it}. {q}%.'],
lazy:['Em xin 5 phút doomscroll cái đã, đồ không tự bay đi đâu.','Não em lag, để em reboot rồi soi.','Hôm nay em low energy, việc này để mai em grind.','Em đang trong era nghỉ xíu, đừng ping em.','Sắp làm rồi mà, đang buffer.'],
sulk:['Em dỗi. Tự soi đi, em out ca này.','Nope. Tinh thần em đỏ rồi, em ghost ca này.','Em không nhận job. Cho em nghỉ xíu hoặc thưởng rồi tính.','Em AFK. Đừng assign nữa, em đang dỗi chính chủ.','Skill issue của tiệm, không phải của em. Em nghỉ xíu.'],
refuse:['Không đủ vật liệu thì em chịu.','Kho không có món nào em làm được lúc này.','Em rảnh nhưng không có việc vừa tay.'],
bonus:['Có thưởng thì em không dỗi nữa.','Dạ, em nhận. Việc em làm ngay.','Vậy là công bằng. Em vào việc.']
};
function stAnim(){G.staff.anim=G.staff.anim||{app:{x:32,y:106},mech:{x:32,y:106}}}
stAnim();
function say(k,t,mood){
  const s=G.staff[k];if(!s)return;
  s.line=t;s.mood=mood||'';s.lt=Date.now()+7000;
  G.staff.log.unshift(s.n+': '+t);G.staff.log=G.staff.log.slice(0,8);
  toast(ROLES[k].ico+' '+s.n+': '+t);
}
function pickL(a){return pick(a).replace('{it}','').trim()}
function hire(k){
  const r=ROLES[k];
  if(G.staff[k])return toast('Đã có '+r.n);
  if(G.lv<r.need)return toast(r.need>1?'Cần xưởng (cấp 2) mới thuê thợ':'Chưa đủ cấp');
  if(G.money<r.hire)return toast('Không đủ tiền thuê');
  G.money-=r.hire;G.tot.cost+=r.hire;
  G.staff[k]={n:pick(NAMES[k]),lv:1,xp:0,busy:0,mood:'happy',err:0,mor:100,skip:0};
  G.staff.anim[k]={x:32,y:106};
  snd('coin');say(k,pick(LIN.hi[k]),'happy');rd();ui();
}
function fire(k){
  const s=G.staff[k];if(!s)return;
  const sev=ROLES[k].pay;
  if(G.money<sev)return toast('Cần '+fm(sev)+' trợ cấp để cho nghỉ');
  G.money-=sev;G.tot.cost+=sev;
  toast(s.n+' nghỉ, còn dỗi: «Tự làm đi.»');
  G.staff[k]=null;snd('door');rd();ui();
}
function train(k){
  const s=G.staff[k];if(!s||s.lv>=3)return;
  const c=700*s.lv;
  if(G.money<c)return toast('Không đủ tiền đào tạo');
  G.money-=c;G.tot.cost+=c;s.lv++;s.xp=0;s.mor=100;snd('up');
  say(k,'Em học xong khóa đào tạo, lên cấp '+s.lv+'. '+effText(k,s.lv),'happy');rd();ui();
}
function talk(k,kind){
  const s=G.staff[k];if(!s||kind!='thuong')return;
  if(s.bd===G.day)return toast('Hôm nay đã thưởng '+s.n+' rồi, mai hãy thưởng tiếp');
  const b=bonusCost(s);if(G.money<b)return toast('Không đủ tiền thưởng');
  G.money-=b;G.tot.cost+=b;s.bd=G.day;s.mor=Math.min(100,s.mor+20);s.skip=0;say(k,pick(LIN.bonus),'happy');
  rd();ui();
}
const bonusCost=s=>100*s.lv;
function slack(k){
  const s=G.staff[k];if(!s)return false;
  if(s.skip>0){s.skip--;s.mood='sad';say(k,pick(LIN.sulk),'angry');return true}
  const p=s.mor<30?.42:s.mor<55?.16:.04;
  if(Math.random()<p){s.mor=Math.max(0,s.mor-3);s.mood='sad';say(k,pick(LIN.lazy),'sad');return true}
  return false;
}
function finishApp(it){
  const s=G.staff.app;if(!s)return;
  const dr=AP_DROP(s.lv),drop=rnd(dr[0],dr[1]);
  if(it.fake&&Math.random()<AP_MISS(s.lv)){it._miss=1;s.err++;say('app',pick(LIN.miss).replace('{it}',it.name),'sad')}
  else{it.known=true;if(it.fake)say('app',pick(LIN.fake).replace('{it}',it.name),'angry');else say('app',pick(LIN.doneApp).replace('{it}',it.name).replace('{ver}',it.rare?'đồ hiếm, nên giữ giá':'hàng thường, giá ước ổn'),'happy')}
  if(cur&&cur.item&&cur.item.id==it.id)cur.line=it.known&&it.fake?'Ơ... sao soi kỹ vậy?':'Anh/chị soi kỹ thật đấy.';
  s.xp++;s.mor=Math.max(0,s.mor-drop);s.busy=0;s.job=0;lvUp('app');
  snd('click');ui();
}
function finishFix(it){
  const s=G.staff.mech;if(!s||!it)return;
  const qr=MC_Q(s.lv),q=Math.min(92,it.cond+rnd(qr[0],qr[1]));
  it.cond=q;it.repairs=(it.repairs||0)+1;it.orig=Math.max(20,(it.orig||80)-3);S.fixed++;
  s.xp++;s.mor=Math.max(0,s.mor-MC_DROP(s.lv));s.busy=0;s.job=0;s.mood='happy';
  if(it.cust){const fee=it.fee;const ix=G.inv.indexOf(it);if(ix>=0)G.inv.splice(ix,1);G.money+=fee;G.tot.rev+=fee;S.rev+=fee;S.sold.push('(thợ sửa) '+it.name);say('mech','Khách trả đồ rồi. '+it.name+' xong, thu '+fm(fee)+'.','happy')}
  else say('mech',pick(LIN.doneFix).replace('{it}',it.name).replace('{q}',q),'happy');
  lvUp('mech');
  snd('done');fx.push({t:'🔧 '+q+'%',x:286,y:78,c:'#2a7a20',l:70});ui();
}
function askStaff(k){
  const s=G.staff[k];if(!s)return false;
  if(s.busy){toast(s.n+' đang bận món khác');return false}
  if(s.skip>0){s.skip--;say(k,pick(LIN.sulk),'angry');return false}
  if(s.mor<50&&Math.random()<.12+(50-s.mor)/80){s.mor=Math.max(0,s.mor-2);say(k,pick(LIN.lazy),'sad');return false}
  return true;
}
function staffTick(){
  if(!G.open)return;
  ['app','mech'].forEach(k=>{const s=G.staff[k];if(!s)return;const m=G.min;if(s.lm==null||m<s.lm)s.lm=m;const d=m-s.lm;s.lm=m;
    if(d>0&&!s.busy&&s.mor<100){s.mor=Math.min(100,s.mor+d/5);if(s.mor>=50&&s.skip>0)s.skip=0}});
  const app=G.staff.app;
  if(app&&app.busy&&app.due!=null&&G.min>=app.due){
    const it=(cur&&cur.item&&cur.item.id==app.job&&cur.item)||G.inv.find(i=>i.id==app.job);
    if(it)finishApp(it);else{app.busy=0;app.job=0}
  }
  const mech=G.staff.mech;
  if(mech&&mech.busy&&mech.due!=null&&G.min>=mech.due){
    const it=G.inv.find(i=>i.id==mech.job);
    if(it)finishFix(it);else{mech.busy=0;mech.job=0}
  }
}
setInterval(staffTick,400);
/* Xử lý lương và tinh thần nhân viên khi sang ngày. */
function processStaffDay(){
  let pay=0;
  ['app','mech'].forEach(k=>{
    const s=G.staff[k];
    if(!s)return;
    pay+=ROLES[k].pay;
    s.busy=0;s.job=0;
    if(s.mor<40)s.mood='sad';
  });
  if(pay){
    if(G.money<pay){
      ['app','mech'].forEach(k=>{if(G.staff[k])G.staff.log.unshift(G.staff[k].n+': Không có lương thì em nghỉ.')});
      toast('💸 Không đủ lương, nhân viên bỏ việc');
      G.staff.app=G.staff.mech=null;
    }else{
      G.money-=pay;G.tot.cost+=pay;
      ['app','mech'].forEach(k=>{if(G.staff[k])G.staff[k].mor=Math.min(100,(G.staff[k].mor||70)+4)});
      G.notes.push('👔 Lương nhân viên: −'+fm(pay));
    }
  }
}


window.drawStaffBehind=function(t){
  stAnim();
  g.imageSmoothingEnabled=false;
  ['app','mech'].forEach(k=>{
    const s=G.staff[k];if(!s)return;
    const r=ROLES[k];
    let tx=k=='app'?230:290, ty=112;
    if(k=='mech'&&G.lv<2){tx=292;ty=118}
    if(s.mood=='sad')tx-=2;
    const a=G.staff.anim[k];
    a.x+=(tx-a.x)*.08;a.y+=(ty-a.y)*.08;
    const px=Math.round(a.x),py=Math.round(a.y);
    const work=!!s.busy,bob=s.mood=='sad'?0:((t/420|0)%2);
    person(px,py,r.col,r.hair,bob,s.mood=='happy'?'happy':s.mood=='angry'?'angry':s.mood=='sad'?'sad':'',work&&((t/160|0)%2));
    if(s.line&&Date.now()<s.lt)window.__bubs.push({x:px,y:py-40,t:s.line.slice(0,22)});
    else E(r.ico,px+11,py-42-bob,10);
    if(work){const it=G.inv.find(i=>i.id==s.job)||(cur&&cur.item&&cur.item.id==s.job?cur.item:null);if(it)E(it.icon,px-11,py-38,11)}
  });
};
function staffH(){
  let h='<h3>👔 Nhân viên</h3><div class=card><small><b>Tinh thần</b> tự hồi đầy <b>100/100</b> mỗi sáng. Trong ngày, mỗi việc làm sẽ trừ tinh thần. Lúc rảnh nhân viên tự nghỉ và hồi <b>+1 mỗi 5 phút game</b>. Dưới 50, họ có thể lười hoặc dỗi (bỏ lượt 1–2 việc). Mỗi người chỉ nhận <b>thưởng 1 lần/ngày</b> (+20 tinh thần), nên cách tốt nhất là chia việc cho đủ người và đào tạo lên cấp để đỡ mệt hơn.<br><b>Cấp bậc</b> (tối đa 3) giúp nhân viên làm nhanh hơn, chính xác hơn và đỡ mệt hơn. Lên cấp bằng <b>đào tạo</b> (trả tiền, lên ngay, hồi đầy tinh thần) hoặc tự lên khi đủ XP (mỗi việc xong +1 XP).</small></div>';
  for(const k in ROLES){
    const r=ROLES[k],s=G.staff[k];
    h+=`<div class=card>${r.ico} <b>${r.n}</b> · ${r.job}<br><small>${r.desc}</small><br>`;
    if(!s)h+=`<small>Thuê ${fm(r.hire)} · lương ${fm(r.pay)}/ngày${r.need>1?' · cần cấp tiệm '+r.need:''}<br>Cấp 1: ${effText(k,1)}</small><br><button ${G.money<r.hire||G.lv<r.need?'disabled':''} onclick=\"hireStaff('${k}')\">Thuê</button>`;
    else{
      const st=s.skip>0?'đang dỗi':s.busy?'đang làm':s.mor<50?'dễ lười':'rảnh',mo=Math.max(0,Math.min(100,s.mor|0));
      h+=`<b>${s.n}</b> · cấp ${s.lv}/3 · ${st}<div style=\"height:10px;background:#d7c39a;border:2px solid #2a1a0c;border-radius:5px;margin:4px 0\"><div style=\"height:100%;width:${mo}%;background:${mo<50?'#c0392b':mo<75?'#e0a82e':'#3f8a3a'}\"></div></div><small>Tinh thần ${mo}/100 · XP ${s.xp}/${s.lv>=3?'tối đa':needXp(k,s.lv)}${k=='app'?' · bỏ sót hàng giả: '+(s.err|0)+' lần':''}</small><br><small>Hiện tại (cấp ${s.lv}): ${effText(k,s.lv)}</small>`;
      if(s.lv<3)h+=`<br><small>Sau đào tạo (cấp ${s.lv+1}): ${effText(k,s.lv+1)}</small>`;
      if(s.line)h+=`<br>“${s.line}”`;
      h+=`<br><button ${G.money<bonusCost(s)||s.bd===G.day?'disabled':''} onclick="talkStaff('${k}','thuong')">${s.bd===G.day?'Đã thưởng hôm nay':'Thưởng '+fm(bonusCost(s))}</button><br><button ${s.lv>=3||G.money<700*s.lv?'disabled':''} onclick=\"trainStaff('${k}')\">${s.lv>=3?'Đã tối đa':'Đào tạo lên cấp '+(s.lv+1)+' · '+fm(700*s.lv)}</button> <button class=red onclick=\"fireStaff('${k}')\">Cho nghỉ</button>`;
    }
    h+='</div>';
  }
  h+='<h3>🗣 Báo cáo</h3>'+(G.staff.log.map(l=>`<div class=row>${l}</div>`).join('')||'<p>Chưa có báo cáo.</p>');
  return h;
}
Object.assign(window,{AP_T,AP_MISS,AP_DROP,MC_Q,MC_T,MC_DROP,MC_SAVE,needXp,effText,lvUp,say,finishFix,finishApp});
window.hireStaff=hire;window.fireStaff=fire;window.trainStaff=train;window.talkStaff=talk;window.askStaff=askStaff;
const _upS=upH;upH=function(){_upS();return (window.__upRaw||'')+staffH()};
let uvt='shop';
window.uvtSet=function(k){uvt=k;rd()};
const _upOrg=upH;
upH=function(){
  const raw=_upOrg();
  const parts=raw.split('<h3>').slice(1).map(c=>{const i=c.indexOf('</h3>');return {t:c.slice(0,i).replace(/<[^>]+>/g,''),h:'<h3>'+c}});
  const tabs=[['shop','🏗️','Tiệm',/nâng cấp|quảng/i],['tool','🧰','Dụng cụ',/dụng cụ|máy thẩm|kính lúp|tua vít|kìm|mỏ hàn|đánh bóng/i],['sec','🛡️','An ninh',/an ninh/i],['fx','🛋️','Nội thất',/nội thất/i],['nv','👔','Nhân viên',/nhân viên|báo cáo/i]];
  const g={};tabs.forEach(t=>g[t[0]]=[]);
  parts.forEach(s=>{const hit=tabs.find(t=>t[3].test(s.t));g[hit?hit[0]:'shop'].push(s.h)});
  if(!g[uvt]||!g[uvt].length)uvt=tabs.find(t=>g[t[0]].length)[0];
  const bar='<div style="display:flex;gap:4px;position:sticky;top:0;z-index:3;background:#f6e8c8;padding:4px 0 6px">'+tabs.map(t=>`<button style="flex:1;font-size:12px;padding:4px 2px;${uvt==t[0]?'background:#3f8a3a;outline:2px solid #ffd27a':''}" onclick="uvtSet('${t[0]}')">${t[1]}<br>${t[2]}</button>`).join('')+'</div>';
  return bar+(g[uvt].join('')||'<p>Chưa có mục này.</p>');
};
})();


(()=>{
const _appr=appr,_ap=ap,_repair=repair;
appr=function(){
  const i=cur&&cur.item;
  if(!i||i.known||cur.ap)return _appr();
  const s=G.staff&&G.staff.app;
  if(!s||s.busy||s.skip>0)return _appr();
  if(s.mor<50){
    const p=.12+(50-s.mor)/80;
    if(Math.random()<p){
      s.skip=1;s.mood='angry';s.mor=Math.max(0,s.mor-2);
      say('app',pick(LIN.sulk),'angry');
      return _appr();
    }
  }
  const mins=AP_T(s.lv),dr=AP_DROP(s.lv),drop=rnd(dr[0],dr[1]);
  G.min+=mins;s.lm=G.min;
  s.busy=0;s.job=0;s.due=0;s.xp++;s.mor=Math.max(0,s.mor-drop);
  s.mood=s.mor<50?'sad':'happy';
  if(i.fake&&Math.random()<AP_MISS(s.lv)){
    s.err++;i._miss=1;cur.line='Ơ... soi gì mà lâu thế?';
    say('app','Em soi '+i.name+' rồi… chắc là thật. Tinh thần −'+drop+'.','sad');
  }else{
    i.known=true;
    cur.line=i.fake?'Ơ... sao anh/chị soi kỹ vậy?':'Anh/chị soi kỹ thật đấy.';
    const ver=i.fake?'hàng giả, đừng mua':i.rare?'đồ hiếm, nên giữ giá':'hàng thường, giá ước ổn';
    say('app','Soi xong '+i.name+'. Em thấy '+ver+'. Tinh thần −'+drop+'.',i.fake?'angry':s.mood);
  }
  lvUp('app');
  try{if(window.TU&&TU.on)TU.used=1}catch(e){}
  snd('click');rd();ui();
};
ap=function(id){return _ap(id)};
repair=function(id){
  const s=G.staff&&G.staff.mech;
  if(!s)return _repair(id);
  if(s.busy)return _repair(id);
  const it=G.inv.find(x=>x.id==id),t=T[it.type];
  if(!t)return;
  for(const k in t.m)if((G.mats[k]||0)<t.m[k])return toast('Thiếu vật liệu');
  if(!window.askStaff('mech'))return _repair(id)
  let cost=0;const free=Math.random()<MC_SAVE(s.lv);
  if(free)toast('🔧 '+s.n+' tiết kiệm được vật liệu, không tốn gì!');
  else for(const k in t.m){G.mats[k]-=t.m[k];cost+=M[k][2]*t.m[k];it.cost+=M[k][2]*t.m[k]}
  const mins=MC_T(t.s.split(',').length,s.lv);
  s.busy=1;s.job=it.id;s.due=G.min+mins;s.mood='';
  say('mech','Em nhận '+it.name+', khoảng '+mins+' phút.','');
  snd('tick');rd();ui();
};
window.appr=appr;window.ap=ap;window.repair=repair;window.askStaff=askStaff;window.processStaffDay=processStaffDay;
})();
