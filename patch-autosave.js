/* ===== PATCH: nút CHƠI TIẾP + tự động lưu ===== */
(function(){
  let started=false;
  const _sg=startG;startG=function(){started=true;return _sg.apply(this,arguments)};
  function autoSave(){
    if(!started||window.nosv||G.over)return;
    if(working||(typeof MGM!=='undefined'&&MGM)||(cur&&(cur.ap||cur.mch))||(typeof TU!=='undefined'&&TU.on))return;
    try{save()}catch(e){}
  }
  const _nd=newDay;newDay=function(){const r=_nd.apply(this,arguments);try{save()}catch(e){}return r};
  function ultraSave(){try{if(!window.nosv&&!G.over)save()}catch(e){}}
  setInterval(autoSave,3000);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)ultraSave()});
  addEventListener('pagehide',ultraSave);
  addEventListener('beforeunload',ultraSave);
})();
