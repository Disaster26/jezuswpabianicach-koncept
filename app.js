(function(){
  var rok=document.querySelector('[data-rok]'); if(rok) rok.textContent=new Date().getFullYear();

  // menu mobilne
  var b=document.querySelector('.burger'), nav=document.getElementById('menu');
  if(b&&nav){
    b.addEventListener('click',function(){var o=nav.classList.toggle('otw');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('otw');b.setAttribute('aria-expanded','false');}});
  }

  // aktywna pozycja menu
  var linki=[].slice.call(document.querySelectorAll('.nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.classList.toggle('akt',a.getAttribute('href')==='#'+x.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    linki.forEach(function(a){var s=document.querySelector(a.getAttribute('href')); if(s) io.observe(s);});
    // pasek mobilny po przewinięciu za hero
    var mob=document.querySelector('.mob'), cta=document.querySelector('.hero-cta');
    if(mob&&cta){new IntersectionObserver(function(en){var v=!en[0].isIntersecting&&en[0].boundingClientRect.top<0;mob.classList.toggle('widac',v);mob.setAttribute('aria-hidden',!v);[].forEach.call(mob.querySelectorAll('a'),function(a){a.tabIndex=v?0:-1;});}).observe(cta);}
  }

  // karuzela: palec, mysz, strzałki, licznik
  [].forEach.call(document.querySelectorAll('[data-karuzela]'),function(k){
    var tor=k.querySelector('.kar-tor'), karty=tor.children, licz=k.querySelector('.kar-licz span');
    function krok(){return karty[0].getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||0);}
    k.querySelector('.kar-prev').addEventListener('click',function(){tor.scrollBy({left:-krok(),behavior:'smooth'});});
    k.querySelector('.kar-next').addEventListener('click',function(){tor.scrollBy({left:krok(),behavior:'smooth'});});
    tor.addEventListener('scroll',function(){if(licz) licz.textContent=Math.min(karty.length,Math.round(tor.scrollLeft/krok())+1);},{passive:true});
    tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){tor.scrollBy({left:krok(),behavior:'smooth'});e.preventDefault();}if(e.key==='ArrowLeft'){tor.scrollBy({left:-krok(),behavior:'smooth'});e.preventDefault();}});
    var start=null,sl=0,ruch=false;
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;start=e.clientX;sl=tor.scrollLeft;ruch=false;});
    window.addEventListener('pointermove',function(e){if(start===null)return;var d=e.clientX-start;if(Math.abs(d)>5){ruch=true;tor.classList.add('ciag');}if(ruch)tor.scrollLeft=sl-d;});
    window.addEventListener('pointerup',function(){if(start===null)return;start=null;if(ruch){tor.classList.remove('ciag');var n=Math.round(tor.scrollLeft/krok());tor.scrollTo({left:n*krok(),behavior:'smooth'});}});
    tor.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false;}},true);
  });
})();
