(function(){
  const regs=[
    {n:'Bé Na',col:'#6aa8e0',hair:'#3a2418',ask:.55,flex:.5,sty:'hien',say:'Em bán cái này lấy tiền sách ạ, anh chị xem giúp em.'},
    {n:'Chú Hải xe ôm',col:'#3a8a4a',hair:'#222',ask:.7,flex:.6,sty:'hai',say:'Chạy cuốc về, ghé bán món này cho nhẹ xe.'},
    {n:'Cô Yến',col:'#e09050',hair:'#4a2a1a',ask:.85,flex:.72,sty:'hien',say:'Dọn bếp thấy món này, để trong nhà cũng phí.'},
    {n:'Ông Đồ',col:'#6a5040',hair:'#eee',ask:.95,flex:.82,sty:'kho',say:'Tôi dạy sử, biết món này không phải đồ thường. Định giá cho công bằng.'}
  ];
  regs.forEach(n=>{if(!NPCS.some(x=>x.n==n.n))NPCS.push({...n,aff:0,visits:0})});
  const celebs=[
    {n:'Đen Vầu',col:'#556b2f',hair:'#111',ask:.9,flex:.7,sty:'hien',say:'Nghe một câu rồi tính giá, chủ tiệm đừng vội.'},
    {n:'Mỹ Tầm',col:'#7a1e2e',hair:'#1a120e',ask:1.25,flex:.94,sty:'kho',say:'Giá danh ca không mặc cả như hàng chợ.'},
    {n:'Thầy Ông Nội',col:'#6b4220',hair:'#ddd',ask:1.05,flex:.8,sty:'kho',say:'Đưa đây thầy xem đã, đừng vội trả giá.'},
    {n:'Mít Thy',col:'#f3e6c8',hair:'#3a2a1a',ask:.8,flex:.65,sty:'hien',say:'Cô ghé mua món đang bày, mời nếm một miếng rồi nói chuyện.'}
  ];
  celebs.forEach(n=>{if(!NPCS.some(x=>x.n==n.n))NPCS.push({...n,celeb:1,aff:0,visits:0,cat:['Ghé tiệm này một lần là nhớ.']})});
  const V={
    'Jack 5 Trịu':{sweet:['5 triệu... à không, bớt cho chủ tiệm một câu hát.'],flaw:['Chê đồ của Jack à? Thôi được, bớt vậy.'],firm:['Cứng thế thì Jack cũng cứng theo.'],tea:['Trà ngon, Jack ở lại thêm một nhịp.']},
    'Trườn Gian':{sweet:['Câu này hài, tui bớt cho vui.'],flaw:['Chê đúng chỗ, tui lấy làm tiết mục.'],firm:['Cứng quá, khán giả hết cười rồi đó.'],tea:['Uống trà xong tui bớt, miễn có chuyện kể.']},
    'Sơn Thùng M-T-B':{sweet:['Nói ngọt không đổi giá của tôi.'],flaw:['Đừng chê. Tôi đang nhìn chủ tiệm.'],firm:['Cứng được. Tôi nhượng một bậc.'],tea:['Trà tạm. Giá vẫn là giá.']},
    'Độ Mixue':{sweet:['Ê dễ thương, tui bớt cho tiệm.'],flaw:['Chê nhẹ thôi, tui vẫn ủng hộ.'],firm:['Ừa, chốt đi, tui không nán.'],tea:['Trà sữa hơn, nhưng trà này cũng được, bớt nha.']},
    'Bà Phương Hàng':{sweet:['Biết tôi là ai thì nói năng cho phải.'],flaw:['Chê đồ của tôi? Livestream cho mà xem.'],firm:['Cứng với tôi là dại.'],tea:['Trà được. Tôi chưa đăng gì đâu.']},
    'Khá Bảng':{sweet:['Nói ngọt không bằng trả giá cao.'],flaw:['Đừng chê đồ anh em.'],firm:['Biết điều thì anh em cũng biết điều.'],tea:['Trà để đó. Nói giá đi.']},
    'Quang Lình Vlog':{sweet:['Cả nhà ơi, chủ tiệm dễ thương, mình bớt chút.'],flaw:['Chê đúng thật, để mình nói trong clip.'],firm:['Cứng vừa thôi, mình vẫn quay mà.'],tea:['Mời trà là có tình, mình bớt.']},
    'Đen Vầu':{sweet:['Nghe đã, giá cũng nên nghe theo.'],flaw:['Chê khéo thì được, chê tục thì thôi.'],firm:['Cứng quá, câu rap cũng cụt.'],tea:['Nghe một câu đi, rồi tính.' ]},
    'Mỹ Tầm':{sweet:['Nói ngọt chỉ được một chút, giá danh ca vẫn đó.'],flaw:['Đừng chê tôi.'],firm:['Cứng với danh ca là hết lượt.'],tea:['Trà được. Giá không xuống theo chén trà.']},
    'Thầy Ông Nội':{sweet:['Khéo nói. Thầy vẫn xem đồ đã.'],flaw:['Chê trước khi soi là nông.'],firm:['Cứng không làm đồ thành thật.'],tea:['Trà nóng. Để thầy nhìn món này.']},
    'Mít Thy':{sweet:['Dễ nghe quá, cô mua giá đẹp hơn.'],flaw:['Món này cô không chê, cô đang muốn mua.'],firm:['Cứng thì cô đi quán khác.'],tea:['Mời nếm một miếng, rồi cô trả.' ]}
  };
  const REV={
    'Jack 5 Trịu':{5:['5 sao, không phải 5 triệu. Jack nhớ tiệm.'],4:['Ổn, Jack ghé lại khi hết nhầm giá.'],3:['Bình thường, chưa đáng một câu hát.'],2:['Trả thấp quá, Jack không rap vụ này.'],1:['1 sao. Đừng bảo là Jack đã ghé.']},
    'Trườn Gian':{5:['5 sao, lấy làm tiết mục cuối.'],4:['Cười được, giá cũng được.'],3:['Chưa đủ độ để kể trên sóng.'],2:['Hết vui. Tui không kể tên tiệm.'],1:['1 sao, khán giả cũng không cười nổi.']},
    'Sơn Thùng M-T-B':{5:['Được. Lần này tôi không đổi ý.'],4:['Tạm ổn. Đừng làm tôi thất vọng lần sau.'],3:['Chưa tới.'],2:['Thấp. Tôi nhớ mặt tiệm.'],1:['Chạy ngay đi. 1 sao.']},
    'Độ Mixue':{5:['5 sao, tui mời cả tiệm ly trà sữa!'],4:['Ổn áp, hôm khác tui ghé ủng hộ tiếp.'],3:['Tạm, chưa đáng một ly full topping.'],2:['Hơi tiếc, stream không khen được.'],1:['1 sao. Tui không quay lại mua trà.']},
    'Bà Phương Hàng':{5:['Biết điều. Tôi khen trên sóng.'],4:['Được. Hôm nay tôi không đăng xấu.'],3:['Chưa đáng một buổi live.'],2:['Tôi sẽ nhắc tên tiệm, không hay đâu.'],1:['1 sao, cả nước xem clip này.']},
    'Khá Bảng':{5:['Biết điều. Anh em không đứng ngoài cửa.'],4:['Ổn. Lần sau cứ giá này.'],3:['Tạm. Anh em chưa nói gì.'],2:['Thấp. Anh em nhớ tiệm.'],1:['1 sao. Đừng để anh em quay lại.']},
    'Quang Lình Vlog':{5:['Cả nhà ơi, tiệm này đáng 5 sao.'],4:['Đã thương thì thương cho trót, 4 sao.'],3:['Clip bình thường, không xóa cũng không ghim.'],2:['Mình không đăng được clip khen.'],1:['1 sao. Cả nhà đừng ghé.']},
    'Đen Vầu':{5:['Nghe đã, giá đã, 5 sao.'],4:['Câu này để lại được.'],3:['Chưa đủ một câu.'],2:['Beat cụt, giá cũng cụt.'],1:['1 sao. Không rap vụ này.']},
    'Mỹ Tầm':{5:['Giữ giá danh ca. 5 sao.'],4:['Được. Tôi không đứng dậy.'],3:['Chưa tới giá tôi muốn.'],2:['Thấp. Hàng chờ cũng nên về.'],1:['1 sao. Đừng mời tôi lần sau.']},
    'Thầy Ông Nội':{5:['Soi đúng, giá đúng. Thầy gật.'],4:['Món này thầy nhận.'],3:['Chưa đủ để thầy khen.'],2:['Giá không xứng món.'],1:['1 sao. Lần sau đừng đưa đồ giả.']},
    'Mít Thy':{5:['Ngon và đúng giá. Cô 5 sao.'],4:['Được, cô giới thiệu một người.'],3:['Ăn được, giá chưa ưng.'],2:['Mặn ví. Cô không khen.'],1:['1 sao. Quán này cô không quay lại.']}
  };
  NPCS.forEach(n=>{if(V[n.n])n.voice=V[n.n];if(REV[n.n])n.rev=REV[n.n]});
  const _chat=chat;
  chat=function(k){const n=cur&&cur.npc;_chat(k);if(n&&n.voice&&n.voice[k]&&cur){cur.line=n.voice[k][0];rd()}};
  const _ar=addRev;
  addRev=function(q,s,t){_ar(q,s,t);const n=q&&q.npc;if(n&&n.rev&&n.rev[s]&&G.rev[0])G.rev[0].t=n.rev[s][0]};
  const _dr=draw;
  draw=function(t){_dr(t);queue.forEach(q=>{
    const n=q.npc&&q.npc.n,x=q.x,y=(q.phase=='sit'||q.phase=='down')?q.y-16:q.y-30,w=Math.sin(t/180);
    if(n=='Jack 5 Trịu'){R(x-3,y-20,6,2,'#e2b15a');R(x-2,y-22,2,2,'#e2b15a');R(x+1,y-22,2,2,'#e2b15a')}
    else if(n=='Trườn Gian'){R(x-12,y-6+Math.round(w),3,4,'#222');R(x-11,y-8+Math.round(w),2,2,'#888')}
    else if(n=='Sơn Thùng M-T-B'){if((t/200|0)%2)R(x+4,y-4,2,2,'#e2b15a')}
    else if(n=='Độ Mixue'){R(x-12,y-2,3,4,'#f3e6c8');R(x-11,y-4,1,2,'#c03060')}
    else if(n=='Bà Phương Hàng'){R(x+10,y-8+Math.round(w),4,4,'#222');R(x+11,y-7+Math.round(w),2,2,'#c03030')}
    else if(n=='Khá Bảng'){R(x-4,y-16,8,2,'#404a50')}
    else if(n=='Quang Lình Vlog'){R(x+8,y-2,5,3,'#222');R(x+9,y-1,2,2,'#8ab0c8')}
    else if(n=='Đen Vầu'){R(x-4,y-16,8,3,'#1a1a1a');R(x-14,y,6,2,'#8a5a2a')}
    else if(n=='Mỹ Tầm'){R(x-1,y-18,2,2,'#e2b15a')}
    else if(n=='Thầy Ông Nội'){R(x-4,y-6,3,2,'#222');R(x+1,y-6,3,2,'#222');R(x-12,y,3,4,'#5a7aa0')}
    else if(n=='Mít Thy'){R(x-5,y-2,8,6,'#a84848');R(x+8,y-4,4,3,'#4a6a8a');if((t/150|0)%2)R(x+9,y-7,1,2,'#ddd')}
  })};
})();
