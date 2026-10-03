/* market.js — bảng giá thị trường. Load SAU core.js */
function mktH(){let h='<h3>📈 Giá thị trường hôm nay</h3><small>'+et()+'</small>';for(const k in T){const m=G.mk[k]||1,d=m-(G.mh[k]||1);h+=`<div class=row><div>${T[k].i} ${T[k].n}${G.hot==k?' 🔥':''}<br><small>giá gốc ${fm(T[k].b)}</small></div><div style="text-align:right"><b>${Math.round(m*100)}%</b> <span style="color:${d>=0?'#2a7a20':'#a02020'}">${d>=0?'▲':'▼'}${Math.abs(Math.round(d*100))}</span><div class=bar style="width:90px"><i style="width:${cl(m/2*100,5,100)}%;background:${m>=1?'#5f9445':'#b04040'}"></i></div></div></div>`}return h+'<small>Giá đổi mỗi ngày theo cung cầu, tin đồn và sự kiện.</small>'}

function processMarketDay(){
  // giá đồ (G.mk)
  if(typeof mkUpd==='function')mkUpd();
  // giá vật liệu (G.mp)
  G.mq={};
  for(const k in M){
    const o=G.mp[k]||1;
    G.mq[k]=o;
    G.mp[k]=cl(o*(.85+Math.random()*.32)+(1-o)*.15,.6,1.7);
  }
  if(G.fu&&G.fu.paint&&Math.random()<.5)G.rep=cl(G.rep+G.fu.paint,0,100);
}
window.processMarketDay=processMarketDay;
