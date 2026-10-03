(function(){
  G.cd=G.cd||{};
  function celebPay(q,ratio){
    const n=q&&q.npc; if(!n||!n.celeb||q._paid)return; q._paid=1;
    const name=n.n; if((G.cd[name]||0)>G.day)return;
    const bump=()=>G.rep=cl(G.rep+1,0,100);
    const buff=(m,mins,cd)=>{G.bs={m,u:G.min+mins};G.cd[name]=G.day+cd};
    const scrap=()=>{const ks=['screw','thread','oil','cloth','glue','string'],k=ks.find(x=>(G.mats[x]||0)<3);if(k)G.mats[k]=(G.mats[k]||0)+1};
    if(name=='Jack 5 Trịu'&&ratio>=.8){const t=Math.min(40,r10((q.item.cost||q.ask||0)*.05));G.money+=t;S.rev+=t;bump()}
    else if(name=='Trườn Gian'&&ratio>=.7){buff(1.1,40,4);bump()}
    else if(name=='Sơn Thùng M-T-B'&&ratio>=.9){buff(1.15,40,3);bump()}
    else if(name=='Độ Mixue'){scrap();bump()}
    else if(name=='Quang Lình Vlog'&&ratio>=.75){G.gift=G.day+1;bump()}
    else if(name=='Đen Vầu'){scrap();bump()}
    else if(name=='Mỹ Tầm'&&ratio>=.9){buff(1.2,50,3);bump()}
    else if(name=='Thầy Ông Nội'&&q.item&&q.item.rare){const extra=Math.min(300,r10((q.item.cost||q.ask||0)*.1));G.money-=extra;S.buy+=extra;bump()}
    else if(name=='Mít Thy'&&ratio<=1.05){G.gift=G.day+1;bump()}
  }
  const _of=offer;
  offer=function(){const q=cur,v=+$('#pr').value;_of();if(q&&q.npc&&q.npc.celeb&&v>=q.ask)celebPay(q,v/q.ask)};
  const _fx=offerFix;
  offerFix=function(v){const q=cur;_fx(v);if(q&&q.npc&&q.npc.celeb&&v<=q.ask)celebPay(q,v/q.ask)};
  const _sd=sold;
  sold=function(q,p){_sd(q,p);if(q&&q.npc&&q.npc.celeb)celebPay(q,q.wtp?p/q.wtp:1)};
  const _sp=spawn;
  spawn=function(){if(G.gift===G.day){G.gift=0;G._forceBuy=1}_sp();G._forceBuy=0};
})();

/* ===== khoá thu phóng/cuộn trang bằng cử chỉ (iPhone bỏ qua user-scalable=no) ===== */
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches.length>1||(e.scale&&e.scale!==1)){e.preventDefault();return}if(!e.target.closest('#dlg,.ov,#set,#tut,#sub,textarea,input'))e.preventDefault()},{passive:false});
let _lt=0;document.addEventListener('touchend',e=>{const n=Date.now();if(n-_lt<350&&!e.target.closest('button,input,select,textarea,a,canvas,label'))e.preventDefault();_lt=n},{passive:false});
document.addEventListener('dblclick',e=>e.preventDefault());
document.addEventListener('contextmenu',e=>{if(!e.target.closest('input,textarea'))e.preventDefault()});
const unzoom=()=>{if(window.visualViewport&&visualViewport.scale>1.01){const m=document.querySelector('meta[name=viewport]'),c=m.content;m.content=c+',x=1';setTimeout(()=>{m.content=c},60)}};
if(window.visualViewport)visualViewport.addEventListener('resize',unzoom);
/* gõ xong (đóng bàn phím): đưa trang về vị trí ban đầu, phòng khi iPhone đã đẩy trang lên hoặc phóng to */
document.addEventListener('focusout',e=>{if(!e.target.closest||!e.target.closest('input,textarea,select'))return;setTimeout(()=>{window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;unzoom()},150)});
/* bấm Enter/Gửi trên bàn phím để gửi phản hồi, không cần chạm nút Gửi */
document.addEventListener('keydown',e=>{if(e.key!=='Enter'||!e.target.matches||!e.target.matches('input[id^=rp]'))return;e.preventDefault();const b=e.target.nextElementSibling;if(b&&b.tagName==='BUTTON')b.click()});
