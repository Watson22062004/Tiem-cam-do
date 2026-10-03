/* ===== LƯU TRỮ BỀN VỮNG: IndexedDB (dung lượng rất lớn) + localStorage dự phòng ===== */
window.TCD=(function(){
  let LS=null;try{LS=window.localStorage}catch(e){}
  const P=Storage.prototype,_g=P.getItem,_s=P.setItem,_r=P.removeItem;
  const ls=(f,...a)=>{try{return f.apply(LS,a)}catch(e){return null}};
  let db=null,q=Promise.resolve();
  const valid=x=>{try{const d=JSON.parse(x);return !!(d&&d.G)}catch(e){return false}};
  const idb=()=>new Promise(res=>{try{const r=indexedDB.open('tcd_game',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=r.onblocked=()=>res(null)}catch(e){res(null)}});
  const kv=(m,fn)=>new Promise(res=>{if(!db)return res(null);try{const t=db.transaction('kv',m),r=fn(t.objectStore('kv'));t.oncomplete=()=>res(r&&r.result!==undefined?r.result:null);t.onerror=t.onabort=()=>res(null)}catch(e){res(null)}});
  const get=k=>kv('readonly',st=>st.get(k)),put=(k,v)=>kv('readwrite',st=>st.put(v,k)),del=k=>kv('readwrite',st=>st.delete(k));
  function commit(s){
    window.__SAVE=s;const t=Date.now();
    try{_s.call(LS,'tcd1',s);_s.call(LS,'tcd1_t',String(t))}catch(e){try{_r.call(LS,'tcd1_bak');_s.call(LS,'tcd1',s);_s.call(LS,'tcd1_t',String(t))}catch(e2){}}
    if(!db)return;
    const day=(typeof G!=='undefined'&&G)?G.day:0;
    q=q.then(async()=>{const o=await get('tcd1');if(o&&o.s&&o.d!==day)await put('tcd1_prev',o);await put('tcd1',{s,t,d:day})}).catch(()=>{});
  }
  function wipeAll(){window.__SAVE=null;try{_s.call(LS,'tcd_wipe',String(Date.now()))}catch(e){}q=q.then(()=>del('tcd1')).then(()=>del('tcd1_prev')).catch(()=>{})}
  P.getItem=function(k){return(k==='tcd1'&&window.__SAVE)?window.__SAVE:_g.call(this,k)};
  P.setItem=function(k,v){if(this===LS){if(k==='tcd1'){commit(String(v));return}if(k==='tcd1_bak')return}return _s.call(this,k,v)};
  P.removeItem=function(k){if(this===LS&&k==='tcd1')wipeAll();return _r.call(this,k)};
  const ready=(async()=>{
    db=await Promise.race([idb(),new Promise(r=>setTimeout(()=>r(null),1500))]);
    ls(_r,'tcd1_bak');
    const wipe=+ls(_g,'tcd_wipe')||0,c=[],l=ls(_g,'tcd1');
    if(l&&valid(l))c.push({s:l,t:+ls(_g,'tcd1_t')||1,ls:1});
    for(const k of['tcd1','tcd1_prev']){const r=await get(k);if(r&&r.s&&valid(r.s))c.push({s:r.s,t:r.t||1})}
    const best=c.filter(x=>x.t>wipe).sort((a,b)=>b.t-a.t||(b.ls?1:0)-(a.ls?1:0))[0];
    if(best){window.__SAVE=best.s;if(!best.ls||best.s!==l){try{_s.call(LS,'tcd1',best.s);_s.call(LS,'tcd1_t',String(best.t))}catch(e){}}
      const o=await get('tcd1');if(db&&(!o||!o.s||o.t<best.t))await put('tcd1',{s:best.s,t:best.t,d:0})}
  })().catch(()=>{});
  return{ready,commit,hasDb:()=>!!db};
})();
