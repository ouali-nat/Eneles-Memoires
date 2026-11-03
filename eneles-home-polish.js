(function(){
  "use strict";
  var hero=document.getElementById("enelesMemoryHero");
  var toggle=document.getElementById("enelesHeroToggle");
  if(hero&&toggle){
    var hidden=false;
    try{hidden=localStorage.getItem("eneles:memory-hero-hidden")==="1";}catch(_){}
    function renderHero(){
      hero.hidden=hidden;
      hero.setAttribute("aria-hidden",String(hidden));
      toggle.setAttribute("aria-expanded",String(!hidden));
      toggle.textContent=hidden?"Afficher l’accueil":"Masquer l’accueil";
      toggle.setAttribute("aria-label",hidden?"Afficher le bloc d’accueil":"Masquer complètement le bloc d’accueil");
    }
    toggle.addEventListener("click",function(){
      hidden=!hidden;renderHero();
      try{localStorage.setItem("eneles:memory-hero-hidden",hidden?"1":"0");}catch(_){}
    });
    renderHero();
  }
  // Même principe de geste que dans Archives : seul le tracé animé bouge,
  // jamais le logo ou le contenu de la page.
  if(!document.getElementById("enelesMemoryPull")){
    var indicator=document.createElement("div");
    indicator.id="enelesMemoryPull";indicator.setAttribute("aria-hidden","true");
    indicator.innerHTML='<svg viewBox="0 0 64 64"><circle class="eneles-pull-ring" cx="32" cy="32" r="24" transform="rotate(-90 32 32)"/><path class="eneles-pull-moon" d="M39 14c-10 2-16 12-13 22 2 7 9 12 17 11-7 5-17 3-22-4-7-9-4-22 6-28 4-2 8-2 12-1Z"/><path class="eneles-pull-moon" d="M44 12v5M41.5 14.5h5"/><circle class="eneles-pull-star" cx="47" cy="39" r="2.5"/><circle class="eneles-pull-star" cx="17" cy="20" r="1.8"/></svg>';
    document.body.appendChild(indicator);
  }
  var startY=0,distance=0,tracking=false,refreshing=false;
  function topOfPage(){return window.scrollY<=1 && document.documentElement.scrollTop<=1 && document.body.scrollTop<=1;}
  window.addEventListener("touchstart",function(e){
    if(!e.touches||e.touches.length!==1||!topOfPage()||refreshing){tracking=false;return;}
    startY=e.touches[0].clientY;distance=0;tracking=startY<150;
  },{passive:true});
  window.addEventListener("touchmove",function(e){
    if(!tracking||!e.touches||e.touches.length!==1||!topOfPage())return;
    distance=Math.max(0,Math.min(110,e.touches[0].clientY-startY));
    document.documentElement.style.setProperty("--eneles-pull-progress",String(distance/76));
    if(distance>10)document.documentElement.classList.add("eneles-memory-pulling");
  },{passive:true});
  window.addEventListener("touchend",function(){
    if(!tracking)return;tracking=false;
    document.documentElement.classList.remove("eneles-memory-pulling");
    if(distance>=76&&!refreshing){
      refreshing=true;document.documentElement.classList.add("eneles-memory-refreshing");
      window.setTimeout(function(){window.location.reload();},420);
    }
    distance=0;
  },{passive:true});
  window.addEventListener("touchcancel",function(){tracking=false;distance=0;document.documentElement.classList.remove("eneles-memory-pulling");},{passive:true});
})();
