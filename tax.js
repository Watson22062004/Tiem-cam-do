/* tax.js — thuế, kiểm tra, an ninh, quan chức, giang hồ, vay nợ. Load SAU events.js */
/* ---- thuế, kiểm tra, an ninh ---- */
function audit(){const f=G.inv.filter(i=>i.shown&&i.fake).length,fine=f*300+(G.taxOk===false?800:0);if(!fine){G.rep=cl(G.rep+2,0,100);toast('🧾 Cục thuế kiểm tra: sổ sách sạch sẽ, +2 uy tín!')}else{const p=Math.min(G.money,fine);ad(-p);G.rep=cl(G.rep-3,0,100);G.taxOk=true;toast('🚨 Cục thuế phạt '+fm(p)+(f?' vì bày bán hàng giả':' vì nợ thuế')+'!')}ui()}
function payTax(){const t=estTax();G.ltr=G.tot.rev;if(G.money>=t){ad(-t);G.c.tax++;G.taxOk=true;G.notes.push('🧾 Đã đóng thuế tháng: -'+fm(t))}else{const p=G.money;ad(-p);G.rep=cl(G.rep-6,0,100);G.taxOk=false;G.notes.push('🧾 Không đủ tiền đóng thuế! Cục thuế sẽ đến kiểm tra.');G.sched.push({d:G.day+2,n:1,lab:'🕵️ Cục thuế kiểm tra vì nợ thuế',ev:{t:'🕵️ Cục thuế ngồi lì trong tiệm kiểm tra sổ sách.',m:.6}});G.aud=G.day+2}}
SU.push(['🔫 Một tên bịt mặt xông vào tiệm!',()=>setTimeout(()=>{if(G.sec>=2&&Math.random()<.7){G.c.rob++;G.rep=cl(G.rep+2,0,100);toast('🛡️ Bảo vệ khống chế được tên cướp! +2 uy tín');return}const l=Math.min(G.money,r10(G.money*rnd(12,25)/100*(G.sec?.6:1)));ad(-l);G.rep=cl(G.rep-2,0,100);toast('😱 Bị cướp mất '+fm(l)+'!'+(G.sec?'':' Nên lắp camera và thuê bảo vệ.'));ui()},1800)],
['🕵️ Cục thuế đến kiểm tra sổ sách đột xuất!',()=>setTimeout(audit,1800)],
['😠 Nhóm giang hồ ghé tiệm đòi phí "bảo kê"!',()=>setTimeout(()=>{if(G.sec>=1&&Math.random()<.5){G.c.rob++;toast('💪 Bạn cứng rắn, đuổi được chúng!');return}const l=Math.min(G.money,rnd(200,450));ad(-l);toast('💸 Đành nộp '+fm(l)+' cho yên chuyện.');ui()},1800)],
['🎬 Đoàn phim mượn tiệm quay cảnh, trả 400k thuê địa điểm!',()=>{ad(400);bst(1.8,100)}]);
const SECN=[['📹 Camera an ninh',1500,'giảm 40% thiệt hại khi bị cướp, có thể dọa giang hồ'],['💂 Thuê bảo vệ',4000,'70% bắt được cướp, đuổi giang hồ']];
function buySec(){const s=SECN[G.sec];if(!s||G.money<s[1])return;G.money-=s[1];G.tot.cost+=s[1];G.sec++;snd('up');rd();ui()}
/* --- quan chức & giang hồ --- */
const ROLES={tax:['Nhân viên thuế','#2a5aa0'],thug:['Giang hồ','#c02020'],loan:['Chủ nợ','#8a2a8a']};
function spawnRole(k){if(queue.length>=4||G.over)return;const r=ROLES[k],amt=k=='tax'?r10(Math.max(300,G.money*.1)):r10(rnd(150,300)*(1+.35*G.lv));queue.push({phase:'tocounter',npc:{n:pick(k=='tax'?['Ông Kiểm','Bà Thuế','Anh Chi Cục']:['Cu Sẹo','Tuấn Xăm','Khá Bảng']),col:r[1],hair:'#111',aff:0,visits:0,ask:1,flex:1},x:32,y:106,kind:k,role:r[0],rc:r[1],amt,pat:2,em:k=='thug'?'angry':'',line:k=='tax'?'Chào chủ tiệm, đến kỳ nộp thuế. Phần của anh/chị là '+fm(amt)+'.':'Ê chủ tiệm, khu này anh em lo, nộp phí bảo kê '+fm(amt)+' đi!'});snd('door')}
function roleH(){const q=cur,c=q.rc;return`<b style="color:${c}">${q.role} · ${q.npc.n}</b><span class=ln style="color:${c}">“${q.line}”</span><div class=card>Yêu cầu: <b>${fm(q.amt)}</b> · Bạn có ${fm(G.money)}</div><div>Đề nghị: <input id=pr readonly inputmode=none value=${r10(q.amt*.7)} onclick=openPad()>k <button onclick=roleBid()>🤝 Mặc cả</button></div><button class=big onclick="rolePay(${q.amt})">💸 Nộp ${fm(q.amt)}</button><button onclick=roleNeg() ${q.neg?'disabled':''}>🗣️ Thương lượng</button>${q.kind=='thug'?'<button class=red onclick=roleDef()>💪 Đuổi/Dọa</button>':'<button class=red onclick=roleRef()>🚫 Từ chối</button>'}`}
function rolePay(v){const q=cur,p=Math.min(G.money,v);ad(-p);snd('coin');if(q.kind=='tax'){if(p>=v){G.c.tax++;G.taxOk=true}else{G.rep=cl(G.rep-3,0,100)}}toast('💸 Đã nộp '+fm(p)+' cho '+q.role);leave()}
function roleNeg(){const q=cur;q.neg=1;if(Math.random()<.3+G.rep/300+(G.sec?.15:0)){q.amt=r10(q.amt*.7);q.line='Thôi được, nể tình giảm cho còn '+fm(q.amt)+'.'}else{q.amt=r10(q.amt*1.2);q.line='Dám cãi hả? Tăng lên '+fm(q.amt)+'!'}rd()}
function roleBid(){const q=cur,v=+$('#pr').value;if(v>=q.amt*.8||(v>=q.amt*.5&&Math.random()<.4+G.fx.tea*.03))return rolePay(v);q.pat--;if(q.pat<0){rolePen(1.5);return}q.line='Ít quá! Đưa '+fm(q.amt)+' đây.';rd()}
function rolePen(m){const q=cur,l=Math.min(G.money,r10(q.amt*m));ad(-l);G.rep=cl(G.rep-(q.kind=='tax'?4:2),0,100);snd('bad');toast('😠 '+q.role+' nổi giận: bị phạt/cướp '+fm(l)+'!');leave()}
function roleDef(){const q=cur;if(Math.random()<(G.sec>=2?.75:G.sec==1?.5:.2)){G.c.rob++;G.rep=cl(G.rep+2,0,100);toast('💪 Đuổi được giang hồ! +2 uy tín');leave()}else rolePen(1.5)}
function roleRef(){rolePen(1.5)}
const SU0=SU.filter(e=>!/Cục thuế|giang hồ/.test(e[0]));
/* --- vay nặng lãi & thua game --- */
const need=()=>80+70*G.lv+((G.day+1)%30==0?estTax():0);
function takeLoan(){G.loan={amt:4500,due:G.day+7};ad(3000);snd('coin');toast('🦈 Vay 3.000k, hạn 7 ngày phải trả 4.500k!');rd();ui()}
function payLoan(){if(G.loan&&G.money>=G.loan.amt){ad(-G.loan.amt);G.loan=null;toast('✅ Đã trả hết nợ');rd();ui()}}
function lose(why){if(G.over)return;G.over=1;G.open=false;queue=[];cur=null;const o=document.createElement('div');o.className='ov';o.innerHTML=`<div class=em>💀</div><h3>THUA GAME</h3><p>${why}</p><p>Bạn sống được ${G.day} ngày.</p><button class=big onclick=resetG2()>🔄 Chơi lại</button>`;document.body.appendChild(o)}
function resetG2(){window.nosv=1;try{localStorage.removeItem('tcd1')}catch(e){}location.reload()}
const loanH=()=>G.loan?`<div class=msg style="border-left-color:#8a2a8a;background:#ecd8f2;color:#6a1a7a">🦈 Nợ giang hồ: <b>${fm(G.loan.amt)}</b>, hạn ngày ${G.loan.due}. <button ${G.money>=G.loan.amt?'':'disabled'} onclick=payLoan()>Trả nợ</button></div>`:(G.money<need()*1.5?`<div class=msg style="border-left-color:#8a2a8a;background:#ecd8f2;color:#6a1a7a">🦈 Sắp hết tiền? Chủ nợ cho vay 3.000k, hạn 7 ngày trả 4.500k (lãi 50%). Không trả kịp là thua! <button onclick=takeLoan()>Vay</button></div>`:'');
/* Xử lý thuế, tiền thuê và nợ theo lượt gọi tập trung từ core.js. */
function processTaxDay(){
  if(G.over)return false;
  const rent=80+70*G.lv;
  const required=rent+(G.day%30===0?estTax():0);
  if(G.money<required){
    lose('Bạn không đủ tiền trả tiền thuê mặt bằng. Tiệm bị thu hồi.');
    return false;
  }
  ad(-rent);G.notes.push('🏠 Tiền thuê mặt bằng: -'+fm(rent));
  if(G.loan){
    if(G.day>=G.loan.due){
      if(G.money>=G.loan.amt){
        ad(-G.loan.amt);
        G.notes.push('🦈 Đã trả nợ giang hồ');
        G.loan=null;
      }else{
        lose('Bạn không trả được nợ giang hồ đúng hạn. Chúng đã siết tiệm.');
        return false;
      }
    }else if(G.loan.due-G.day===1){
      G.notes.push('🦈 Ngày mai đến hạn trả nợ '+fm(G.loan.amt)+'!');
    }
  }
  if(G.day%30===0)payTax();
  if(G.aud===G.day){G.aud=0;setTimeout(audit,1500)}
  return true;
}
window.processTaxDay=processTaxDay;
