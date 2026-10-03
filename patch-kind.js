(()=>{
  const kindName=k=>({sell:"Bán đồ",pawn:"Cầm đồ",fix:"Sửa đồ",buy:"Mua đồ"})[k]||"Khách";
  function pretty(){
    const dlg=document.getElementById("dlg");
    if(!dlg)return;
    const dealing=typeof cur!=="undefined"&&cur&&mode==="main"&&G.open&&!summ&&!confirmC;
    dlg.dataset.deal=dealing?"1":"0";
    if(!dealing)return;
    const name=dlg.querySelector("b");
    if(name&&!name.closest(".who")){
      const who=document.createElement("div");
      who.className="who";
      const star=document.createElement("span");
      star.className="star";
      star.textContent="★";
      who.appendChild(star);
      name.parentNode.insertBefore(who,name);
      who.appendChild(name);
      const tag=document.createElement("span");
      tag.className="tag";
      tag.textContent=kindName(cur.kind);
      who.appendChild(tag);
    }
    const card=dlg.querySelector(".card");
    if(card&&!card.dataset.pretty){
      card.dataset.pretty="1";
      const raw=card.innerHTML;
      const parts=raw.split(/<br\s*\/?>/i);
      if(parts.length>1){
        const head=parts[0];
        const rest=parts.slice(1).join(" · ");
        const bits=rest.split("·").map(s=>s.trim()).filter(Boolean);
        const chips=bits.map(s=>"<i>"+s+"</i>").join("");
        card.innerHTML=head+'<div class="prices">'+chips+"</div>";
      }
    }
    [[".deal","Trả giá"],[".chatrow","Cách nói"]].forEach(([sel,label])=>{
      const el=dlg.querySelector(sel);
      if(!el||el.previousElementSibling&&el.previousElementSibling.classList.contains("sec"))return;
      const lab=document.createElement("div");
      lab.className="sec";
      lab.textContent=label;
      el.parentNode.insertBefore(lab,el);
    });
  }
  

  const prev=rd;
  rd=function(){prev();try{pretty()}catch(e){console.error(e)}};
})();
