/* pawn.js — cầm đồ: hạn, chuộc sớm, trộm đêm. Load SAU core.js */
/* ===== PATCH v14: hạn cầm đồ rõ ràng, chuộc sớm, trộm đêm ===== */
const _bkQ=bookH;bookH=function(){return _bkQ().replace(/hạn ngày (\d+)/g,(m,d)=>{const r=+d-G.day;return r>0?'còn '+r+' ngày (hết hạn sáng ngày '+d+', có thể chuộc sớm)':'hết hạn'})};
const _mhQ=mainH;mainH=function(){return _mhQ().replace('Khách chuộc: <b id=rd></b>','Khách chuộc nếu đủ ngày: <b id=rd></b><br><small>Họ có thể chuộc sớm và trả ít lãi hơn. Quá hạn không chuộc, đồ thuộc về tiệm.</small>')};
/* Xử lý hạn cầm, chuộc sớm và trộm đêm khi sang ngày. */
function processPawnDay(){
  if(G.over||(typeof TU!=='undefined'&&TU.on))return false;
  if(typeof DEBUG!=='undefined'&&DEBUG)console.log('processPawnDay',{day:G.day,pawns:G.pawns.length,inv:G.inv.length});

  // Cầm đồ hết hạn (chuộc / tịch thu)
  G.pawns=G.pawns.filter(p=>{
    if(p.due>G.day)return true;
    if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN expire',p.item&&p.item.name,p.loan,p.redeem,p.due,G.day);
    if(Math.random()<.55+p.npc.aff*.05){
      G.money+=p.redeem;G.tot.rev+=p.redeem;S.rev+=p.redeem;p.npc.aff++;
      G.notes.push(`${p.npc.n} đã chuộc ${p.item.name}, tiệm thu ${fm(p.redeem)}.`);
      if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN chuộc',p.item.name,p.redeem);
    }else{
      p.item.cost=p.loan;p.item.shown=false;
      if(typeof capL==='function'&&G.inv.length>=capL()){
        G.notes.push('⚠️ Kho đầy — không nhận thêm đồ cầm quá hạn ('+p.item.name+'). Đồ bị thất lạc!');
        if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN quá hạn nhưng KHO ĐẦY',p.item.name,G.inv.length,capL());
      }else{
        G.inv.push(p.item);
        G.notes.push(`${p.npc.n} không chuộc ${p.item.name}. Món đồ thuộc về tiệm!`);
        if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN tịch thu vào kho',p.item.name);
      }
    }
    return false;
  });

  // Chuộc sớm
  G.pawns=G.pawns.filter(p=>{
    const D=Math.max(1,Math.round((p.redeem/p.loan-1)/.03)),el=D-(p.due-G.day);
    if(p.due<=G.day||el<1)return true;
    if(Math.random()<.1+p.npc.aff*.03){
      const a=r10(p.loan*(1+.03*el));
      ad(a);p.npc.aff++;
      G.notes.push(`🔑 ${p.npc.n} chuộc sớm ${p.item.icon} ${p.item.name} sau ${el} ngày, tiệm thu ${fm(a)}.`);
      if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN chuộc sớm',p.item.name,p.loan,p.redeem,a);
      return false;
    }
    return true;
  });

  // Trộm đêm
  const sc=G.sec||0;
  if(G.day>=3&&Math.random()<.035*(sc>=2?.2:sc===1?.5:1)){
    const pool=G.inv.map(i=>({i})).concat(G.pawns.map(p=>({p})));
    if(pool.length){
      const t=pick(pool);let msg='';
      if(sc&&Math.random()<.3*sc)msg='📹 Có kẻ đột nhập nhưng bị camera/bảo vệ phát hiện, không mất gì.';
      else if(t.i){
        const i=t.i;G.inv.splice(G.inv.indexOf(i),1);
        if(i.cust){const c=r10(est(i));ad(-c);G.rep=cl(G.rep-3,0,100);msg=`🥷 Trộm đột nhập, lấy mất ${i.icon} ${i.name} của khách sửa đồ! Tiệm đền ${fm(c)}.`}
        else msg=`🥷 Đêm qua có trộm đột nhập, lấy mất ${i.icon} ${i.name} trong kho (giá trị khoảng ${fm(vis(i))}).`;
        if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN trộm kho',i.name);
      }else{
        const p=t.p,c=r10(est(p.item));G.pawns.splice(G.pawns.indexOf(p),1);ad(-c);G.rep=cl(G.rep-4,0,100);p.npc.aff-=2;
        msg=`🥷 Trộm lấy mất ${p.item.icon} ${p.item.name} khách đang cầm! Tiệm phải đền ${p.npc.n} ${fm(c)}.`;
        if(typeof DEBUG!=='undefined'&&DEBUG)console.log('PAWN trộm cầm đồ',p.item.name);
      }
      G.notes.push(msg);G.log.unshift('Ngày '+G.day+': '+msg);toast(msg);snd('bad');
    }
  }
  return true;
}
window.processPawnDay=processPawnDay;
