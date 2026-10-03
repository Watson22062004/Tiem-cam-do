/* ===== CHỐNG GIAO DỊCH TRÙNG: mỗi khách chỉ xử lý một lần ===== */
(function(){
  ['offer','bAccept','bRefuse','refuse','appr','angry'].forEach(n=>{const f=window[n];if(typeof f!=='function')return;window[n]=function(){if(!cur||cur.left||!queue.includes(cur))return;return f.apply(this,arguments)}});
  const so=window.sold;if(typeof so==='function')window.sold=function(q){if(!q||q.left)return;return so.apply(this,arguments)};
})();
