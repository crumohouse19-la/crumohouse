/* Crumo House — site behaviour. Menu/prices/number live in config.js. */
(function(){
  var C=window.CRUMO_CONFIG,M=window.CRUMO_MENU;var WA=C.whatsapp,IMG=M.images,TIN=M.tins,PET=M.petites,TINIMG=M.tinPhotos,SINGLES=M.singles;
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function(a){a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(C.greeting);});
  document.querySelectorAll('a[href*="zomato"]').forEach(function(a){a.href=C.zomato;});
  document.querySelectorAll('[data-wa-number]').forEach(function(el){el.textContent=C.whatsappDisplay;});
  /* full menu for the dropdown */
  var MENU=[];
  TIN.forEach(function(f){MENU.push({key:'tin|'+f[0],group:'Signature Cookie Tin (large)',name:'Signature Cookie Tin',detail:f[0],price:f[1],img:TINIMG[f[0]]||IMG.tin});});
  PET.forEach(function(f){MENU.push({key:'petite|'+f[0],group:'Signature Petite Tin (small)',name:'Signature Petite Tin',detail:f[0],price:f[1],img:IMG.petite});});
  SINGLES.forEach(function(s){MENU.push({key:'single|'+s.fl,group:'Single Cookies',name:s.name,detail:s.fl,price:s.price,img:s.img});});

  var $=function(s){return document.querySelector(s);};
  var rupee=function(n){return '₹'+n.toLocaleString('en-IN');};
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var toastT;function toast(m){var t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){t.hidden=true;},1800);}

  /* hero scroll switch */
  (function(){
    var media=$('#heroMedia'),ui=$('#heroUi'),nav=$('#nav'),mq=window.matchMedia('(max-width:760px)');
    var P=0,mx=0,my=0,tx=0,ty=0,img=media.querySelector('img'),title=$('#heroTitle'),raf=null;
    function render(){media.style.transform='scale('+(1+P*.18)+') translateY('+(P*-6)+'%)';media.style.filter='brightness('+(1-P*.6)+') blur('+(P*6)+'px)';ui.style.opacity=1-Math.min(1,P*1.6);ui.style.transform='translateY('+(P*40)+'px)';
      img.style.transform='translate('+(tx*-10)+'px,'+(ty*-7)+'px) scale(1.04)';
      title.style.opacity=1-Math.min(1,P*1.3);title.style.transform='translate('+(tx*28)+'px,'+(ty*18-P*60)+'px) rotateX('+(ty*-6)+'deg) rotateY('+(tx*8)+'deg)';}
    function onScroll(){var y=window.scrollY,vh=window.innerHeight;nav.classList.toggle('solid',y>40);if(mq.matches||reduced)return;P=Math.min(1,Math.max(0,y/(vh*.75)));render();}
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
    function loop(){tx+=(mx-tx)*.05;ty+=(my-ty)*.05;render();if(Math.abs(mx-tx)>.0005||Math.abs(my-ty)>.0005)raf=requestAnimationFrame(loop);else raf=null;}
    function kick(){if(!raf)raf=requestAnimationFrame(loop);}
    if(!mq.matches&&!reduced){var hero=$('#hero');hero.style.perspective='900px';
      hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;kick();});
      hero.addEventListener('mouseleave',function(){mx=0;my=0;kick();});}
    if(!reduced){var hero=$('#hero');
      /* per-letter spring float (any width, mouse or touch) */
      var letters=[];
      title.querySelectorAll('h1,p').forEach(function(node){Array.prototype.slice.call(node.childNodes).forEach(function(n){var host=n.nodeType===3?node:n;var txt=n.textContent;if(n.nodeType===3){var frag=document.createDocumentFragment();txt.split('').forEach(function(c){var s=document.createElement('span');s.className='l';s.textContent=c;frag.appendChild(s);letters.push({el:s,y:0,vy:0,x:0,vx:0});});node.replaceChild(frag,n);}else{var inner=n.textContent;n.textContent='';inner.split('').forEach(function(c){var s=document.createElement('span');s.className='l';s.textContent=c;n.appendChild(s);letters.push({el:s,y:0,vy:0,x:0,vx:0});});}});});
      var lraf=null,R=150,K=.09,D=.78;
      function lloop(){var live=false;letters.forEach(function(L){L.vy+=-K*L.y;L.vy*=D;L.y+=L.vy;L.vx+=-K*L.x;L.vx*=D;L.x+=L.vx;if(Math.abs(L.y)>.05||Math.abs(L.vy)>.05||Math.abs(L.x)>.05||Math.abs(L.vx)>.05)live=true;else{L.y=0;L.vy=0;L.x=0;L.vx=0;}L.el.style.transform=L.y||L.x?'translate('+L.x.toFixed(2)+'px,'+L.y.toFixed(2)+'px) rotate('+(L.y*.12).toFixed(2)+'deg)':'';});lraf=live?requestAnimationFrame(lloop):null;}
      var lastT=0;
      function poke(e){var now=performance.now();if(now-lastT<16)return;lastT=now;var cx=e.clientX,cy=e.clientY;letters.forEach(function(L){if(L.el.textContent===' ')return;var r=L.el.getBoundingClientRect();var lx=r.left+r.width/2,ly=r.top+r.height/2;var dx=cx-lx,dy=cy-ly;var d=Math.sqrt(dx*dx+dy*dy);if(d<R){var f=(1-d/R);f=f*f;L.vy-=f*9;L.vx+=(dx<0?1:-1)*f*2.2;}});if(!lraf)lraf=requestAnimationFrame(lloop);}
      hero.addEventListener('pointermove',poke);hero.addEventListener('pointerdown',poke);
      title.style.pointerEvents='auto';title.addEventListener('pointermove',poke);}
    var d=new Date(),h=d.getHours(),day=d.getDay(),hh=(C.hours.close>24&&h<C.hours.close-24)?h+24:h,open=C.hours.closedDays.indexOf(day)<0&&hh>=C.hours.open&&hh<C.hours.close,early=open&&hh<C.hours.deliverFrom;var l=$('#live');if(!open)l.classList.add('off');$('#liveText').textContent=open?(early?C.hours.earlyLabel:C.hours.openLabel):(C.hours.closedDays.indexOf(day)>=0?C.hours.closedLabel:C.hours.preorderLabel);
  })();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:.08});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

  /* cart state */
  var cart=[];
  function addLine(key,name,detail,price,n,img){var l=cart.filter(function(x){return x.key===key;})[0];if(l)l.qty+=n;else cart.push({key:key,name:name,detail:detail,price:price,qty:n,img:img});toast(name+' · '+detail.split(' · ')[0]+' added');update();}
  function totals(){var s=0,n=0;cart.forEach(function(l){s+=l.price*l.qty;n+=l.qty;});return{sum:s,n:n};}

  /* catalog cards */
  var sp=$('#singles');
  SINGLES.forEach(function(s,i){var el=document.createElement('article');el.className='card rv'+(i?' d'+Math.min(i,3):'');el.innerHTML='<div class="art">'+(s.badge?'<span class="badge">'+s.badge+'</span>':'')+'<img src="'+s.img+'" alt="'+s.name+'"></div><div class="body"><h3>'+s.name+'</h3><span class="fl">'+s.fl+'</span><div class="foot"><span class="price num">'+rupee(s.price)+'</span><button type="button" class="plus" data-id="'+s.id+'" aria-label="Add '+s.name+'">+</button></div></div>';el.querySelector('.plus').addEventListener('click',function(){addLine('single|'+s.fl,s.name,s.fl,s.price,1,s.img);});sp.appendChild(el);io.observe(el);});
  var tile=document.createElement('a');tile.className='tile rv d3';tile.href='#order';tile.innerHTML='<div><b>Custom boxes &amp; bulk orders</b><br><span>Gifting, corporate, weddings. Mix tins and singles, add a card.</span></div><span class="go">WhatsApp us →</span>';sp.appendChild(tile);io.observe(tile);
  document.querySelectorAll('[data-add]').forEach(function(b){b.addEventListener('click',function(){var s=SINGLES.filter(function(x){return x.id===b.dataset.add;})[0];addLine('single|'+s.fl,s.name,s.fl,s.price,1,s.img);});});

  /* tins */
  var sel={tin:'Dark Chocolate',petite:'Biscoff'},qty={tin:1,petite:1};
  function buildFlav(list,wrap,key,priceEl,chosenEl){var w=$(wrap);w.innerHTML='';list.forEach(function(f){var b=document.createElement('button');b.type='button';b.className='flav';b.setAttribute('aria-pressed',f[0]===sel[key]?'true':'false');b.innerHTML='<i style="background:'+f[2]+'"></i>'+f[0]+'<span class="num">'+rupee(f[1])+'</span>';
    b.addEventListener('click',function(){sel[key]=f[0];w.querySelectorAll('.flav').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});$(priceEl).textContent=rupee(f[1]);$(chosenEl).textContent=f[0];if(key==='tin'){var im=$('#tinImg'),src=TINIMG[f[0]]||IMG.tin;if(im.getAttribute('src')!==src){im.style.opacity=0;setTimeout(function(){im.src=src;im.style.opacity=1;},200);}}});w.appendChild(b);});}
  buildFlav(TIN,'#tinFlavours','tin','#tinPrice','#tinChosen');buildFlav(PET,'#petiteFlavours','petite','#petitePrice','#petiteChosen');
  document.querySelectorAll('[data-k]').forEach(function(b){b.addEventListener('click',function(){var k=b.dataset.k;qty[k]=Math.max(1,qty[k]+ +b.dataset.d);$(k==='tin'?'#tinQty':'#petiteQty').textContent=qty[k];});});
  $('#tinAdd').addEventListener('click',function(){var f=TIN.filter(function(x){return x[0]===sel.tin;})[0];addLine('tin|'+f[0],'Signature Cookie Tin',f[0],f[1],qty.tin,TINIMG[f[0]]||IMG.tin);});
  $('#petiteAdd').addEventListener('click',function(){var f=PET.filter(function(x){return x[0]===sel.petite;})[0];addLine('petite|'+f[0],'Signature Petite Tin',f[0],f[1],qty.petite,IMG.petite);});

  /* dropdown picker in the form */
  var pick=$('#pickItem'),pq=1,groups={};
  MENU.forEach(function(m){if(!groups[m.group]){groups[m.group]=document.createElement('optgroup');groups[m.group].label=m.group;pick.appendChild(groups[m.group]);}var o=document.createElement('option');o.value=m.key;o.textContent=m.name+' – '+m.detail+' ('+rupee(m.price)+')';groups[m.group].appendChild(o);});
  var ph=document.createElement('option');ph.value='';ph.textContent='Choose an item…';ph.disabled=true;ph.selected=true;pick.insertBefore(ph,pick.firstChild);
  var picks=[];
  function addPick(key,n){var m=MENU.filter(function(x){return x.key===key;})[0];if(!m)return;var l=picks.filter(function(x){return x.key===key;})[0];if(l)l.qty+=n;else picks.push({key:m.key,name:m.name,detail:m.detail,price:m.price,qty:n,img:m.img});toast(m.name+' \u00b7 '+m.detail.split(' \u00b7 ')[0]+' added');update();}
  $('#pickMinus').addEventListener('click',function(){pq=Math.max(1,pq-1);$('#pickQty').textContent=pq;});
  $('#pickPlus').addEventListener('click',function(){pq++;$('#pickQty').textContent=pq;});
  pick.addEventListener('change',function(){if(!pick.value)return;addPick(pick.value,pq);pq=1;$('#pickQty').textContent=1;});
  $('#pickAdd').addEventListener('click',function(){if(!pick.value){toast('Choose an item first');return;}addPick(pick.value,pq);pq=1;$('#pickQty').textContent=1;});

  function sumOf(a){var s=0;a.forEach(function(l){s+=l.price*l.qty;});return s;}
  function lineEl(l,list,setList){var el=document.createElement('div');el.className='oline';el.innerHTML='<img src="'+l.img+'" alt=""><div class="t"><b>'+l.name+'</b><span>'+l.detail+' \u00b7 '+rupee(l.price)+' \u00d7 '+l.qty+' = '+rupee(l.price*l.qty)+'</span></div>';
    var q=document.createElement('div');q.className='qty';q.innerHTML='<button type="button" aria-label="Fewer">−</button><output class="num">'+l.qty+'</output><button type="button" aria-label="More">+</button>';var bs=q.querySelectorAll('button');bs[0].addEventListener('click',function(){l.qty--;if(l.qty<=0)setList(list.filter(function(x){return x!==l;}));update();});bs[1].addEventListener('click',function(){l.qty++;update();});el.appendChild(q);
    var rm=document.createElement('button');rm.type='button';rm.className='rm';rm.setAttribute('aria-label','Remove');rm.textContent='\u00d7';rm.addEventListener('click',function(){setList(list.filter(function(x){return x!==l;}));update();});el.appendChild(rm);return el;}
  function update(){var t=totals();$('#cartCount').textContent=t.n;$('#cItems').textContent=t.n;$('#cTotal').textContent=rupee(t.sum);
    var body=$('#cartLines');body.innerHTML=cart.length?'':'<p class="hint">Your cart is empty. Tap + on a cookie, or pick a tin.</p>';
    var ol=$('#olist');ol.innerHTML=cart.length?'':'<p class="empty">Nothing from the cart yet. Tap + in the catalog or add a tin.</p>';
    cart.forEach(function(l){body.appendChild(lineEl(l,cart,function(n){cart=n;}));ol.appendChild(lineEl(l,cart,function(n){cart=n;}));});
    var pl=$('#plist');pl.innerHTML=picks.length?'':'<p class="empty">Nothing self-selected yet. Pick from the dropdown.</p>';
    picks.forEach(function(l){pl.appendChild(lineEl(l,picks,function(n){picks=n;}));});
    $('#subCart').textContent=rupee(sumOf(cart));$('#subPick').textContent=rupee(sumOf(picks));$('#oTotal').textContent=rupee(sumOf(cart)+sumOf(picks));
    document.querySelectorAll('.card .plus').forEach(function(b){var s=SINGLES.filter(function(x){return x.id===b.dataset.id;})[0];var l=cart.filter(function(x){return x.key==='single|'+s.fl;})[0];b.classList.toggle('in',!!l);b.textContent=l?l.qty:'+';});
    preview();}
  function openCart(){$('#drawer').hidden=false;$('#overlay').hidden=false;$('#closeCart').focus();}
  function closeCart(){$('#drawer').hidden=true;$('#overlay').hidden=true;}
  $('#cartBtn').addEventListener('click',openCart);$('#closeCart').addEventListener('click',closeCart);$('#overlay').addEventListener('click',closeCart);$('#checkout').addEventListener('click',function(){closeCart();mode='cart';setMode();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeCart();});

  /* order form */
  var mode='cart';
  function setMode(){$('#modeCart').setAttribute('aria-selected',mode==='cart');$('#modeCustom').setAttribute('aria-selected',mode==='custom');$('#cartOnly').hidden=mode!=='cart';$('#customOnly').hidden=mode!=='custom';preview();}
  $('#modeCart').addEventListener('click',function(){mode='cart';setMode();});$('#modeCustom').addEventListener('click',function(){mode='custom';setMode();});
  $('#occasion').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$('#occasion').querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});preview();});
  var dIn=$('#fDate');
  (function(){var today=new Date();today.setHours(0,0,0,0);var max=new Date(today);max.setFullYear(max.getFullYear()+1);var view=new Date(today.getFullYear(),today.getMonth(),1);var selD=new Date(today);if(selD.getDay()===1)selD.setDate(selD.getDate()+1);
    var MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
    function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
    function fmt(d){return d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});}
    function render(){$('#calTitle').textContent=MN[view.getMonth()]+' '+view.getFullYear();var g=$('#calGrid');g.innerHTML='';['Mo','Tu','We','Th','Fr','Sa','Su'].forEach(function(w){var s=document.createElement('span');s.className='wd';s.textContent=w;g.appendChild(s);});
      var first=new Date(view.getFullYear(),view.getMonth(),1),off=(first.getDay()+6)%7;for(var i=0;i<off;i++){g.appendChild(document.createElement('span'));}
      var days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
      for(var d=1;d<=days;d++){(function(d){var dt=new Date(view.getFullYear(),view.getMonth(),d);var b=document.createElement('button');b.type='button';b.textContent=d;var past=dt<today,far=dt>max,mon=C.hours.closedDays.indexOf(dt.getDay())>=0;if(past||far||mon){b.disabled=true;b.title=mon?'Closed Mondays':'';}
        if(iso(dt)===iso(today))b.classList.add('today');if(iso(dt)===iso(selD))b.classList.add('sel');b.setAttribute('aria-label',fmt(dt));
        b.addEventListener('click',function(){selD=dt;dIn.value=iso(dt);$('#calSel').textContent=fmt(dt);render();preview();});g.appendChild(b);})(d);}
      $('#calPrev').disabled=view<=new Date(today.getFullYear(),today.getMonth(),1);$('#calNext').disabled=view>=new Date(max.getFullYear(),max.getMonth(),1);}
    $('#calPrev').addEventListener('click',function(){view=new Date(view.getFullYear(),view.getMonth()-1,1);render();});
    $('#calNext').addEventListener('click',function(){view=new Date(view.getFullYear(),view.getMonth()+1,1);render();});
    dIn.value=iso(selD);$('#calSel').textContent=fmt(selD);render();})();
  function val(id){return $(id).value.trim();}
  function message(){var L=['Hi Crumo House! I\'d like to place '+(mode==='custom'?'a custom order.':'an order.'),''];
    if(mode==='cart'){
      if(!cart.length&&!picks.length)L.push('(no items selected yet)');
      if(cart.length){L.push('FROM CART:');cart.forEach(function(l){L.push('\u2022 '+l.qty+' \u00d7 '+l.name+' \u2013 '+l.detail+' ('+rupee(l.price*l.qty)+')');});L.push('Cart subtotal: '+rupee(sumOf(cart)));L.push('');}
      if(picks.length){L.push('SELF-SELECTED FROM MENU:');picks.forEach(function(l){L.push('\u2022 '+l.qty+' \u00d7 '+l.name+' \u2013 '+l.detail+' ('+rupee(l.price*l.qty)+')');});L.push('Self-selected subtotal: '+rupee(sumOf(picks)));L.push('');}
      if(cart.length||picks.length)L.push('GRAND TOTAL: '+rupee(sumOf(cart)+sumOf(picks)));}
    else{L.push('Occasion: '+$('#occasion').querySelector('[aria-pressed="true"]').textContent);if(val('#fCount'))L.push('Pieces: '+val('#fCount'));if(val('#fBudget'))L.push('Budget: about ₹'+val('#fBudget')+' per piece');if(val('#fCustom'))L.push('Details: '+val('#fCustom'));}
    L.push('','Name: '+val('#fName'),'Phone: '+val('#fPhone'),'Address: '+val('#fAddr'));
    if(dIn.value)L.push('Delivery: '+new Date(dIn.value).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})+', '+$('#fSlot').value);
    if(val('#fNote'))L.push('Note: '+val('#fNote'));return L.join('\n');}
  function preview(){var m=message();$('#preview').textContent=m;$('#sendWa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(m);}
  document.querySelectorAll('#orderForm input,#orderForm textarea,#orderForm select').forEach(function(el){el.addEventListener('input',preview);});
  function validate(){var err=$('#formErr');err.hidden=true;
    if(mode==='cart'&&!cart.length&&!picks.length){err.textContent='Add at least one item from the dropdown or the catalog first.';err.hidden=false;return false;}
    if(mode==='custom'&&!val('#fCustom')&&!val('#fCount')){err.textContent='Tell us a little about the custom order so we can quote it.';err.hidden=false;return false;}
    if(!val('#fName')){err.textContent='Please add your name so we know who to confirm with.';err.hidden=false;return false;}
    if(val('#fPhone').replace(/\D/g,'').length<10){err.textContent='Please enter a 10-digit phone number so we can confirm on WhatsApp.';err.hidden=false;return false;}
    if(!val('#fAddr')){err.textContent='Please add the delivery address.';err.hidden=false;return false;}return true;}
  $('#orderForm').addEventListener('submit',function(e){e.preventDefault();});
  $('#sendWa').addEventListener('click',function(e){if(!validate()){e.preventDefault();return;}preview();toast('Opening WhatsApp');});
  $('#copyMsg').addEventListener('click',function(){if(!validate())return;var m=message();function sel(){var r=document.createRange();r.selectNodeContents($('#preview'));var s=getSelection();s.removeAllRanges();s.addRange(r);toast('Selected, press copy');}try{navigator.clipboard.writeText(m).then(function(){toast('Message copied');},sel);}catch(x){sel();}});
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var el=document.getElementById(b.dataset.copy);try{navigator.clipboard.writeText(el.textContent).then(function(){toast('Number copied');},function(){toast(el.textContent);});}catch(x){toast(el.textContent);}});});
  setMode();update();
})();
