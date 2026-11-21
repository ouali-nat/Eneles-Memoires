(function(){
  'use strict';
  function init(){
    if(!document.body||document.body.dataset.page!=='home')return;
    if(document.getElementById('hesedWindowCard'))return;
    var hero=document.getElementById('hesedMemoryHero');
    // Conserver la lecture naturelle : espaces -> action principale -> présentation.
    var anchor=document.querySelector('body[data-page="home"] .create-banner')||
      document.querySelector('body[data-page="home"] .home-section')||hero;
    if(!anchor||!anchor.parentNode)return;
    var card=document.createElement('section');
    card.id='hesedWindowCard';
    card.className='hesed-window-card';
    card.setAttribute('aria-labelledby','hesedWindowTitle');
    card.innerHTML='<div class="hesed-window-bar" aria-hidden="true"><i></i><i></i><i></i></div>'+
      '<div class="hesed-window-body"><h2 id="hesedWindowTitle">Un espace de mémorisation pensé pour vous</h2>'+
      '<p>Hesed Mémoire rassemble vos textes, vos séries de cartes, vos QCM et vos audios dans un espace clair. Chaque contenu est organisé pour être révisé à votre rythme, au moment où il revient à échéance.</p></div>';
    anchor.parentNode.insertBefore(card,anchor.nextSibling);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
