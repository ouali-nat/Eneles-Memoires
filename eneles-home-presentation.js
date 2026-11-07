(function(){
  'use strict';
  function init(){
    if(!document.body||document.body.dataset.page!=='home')return;
    if(document.getElementById('enelesWindowCard'))return;
    var hero=document.getElementById('enelesMemoryHero');
    // Conserver la lecture naturelle : espaces -> action principale -> présentation.
    var anchor=document.querySelector('body[data-page="home"] .create-banner')||
      document.querySelector('body[data-page="home"] .home-section')||hero;
    if(!anchor||!anchor.parentNode)return;
    var card=document.createElement('section');
    card.id='enelesWindowCard';
    card.className='eneles-window-card';
    card.setAttribute('aria-labelledby','enelesWindowTitle');
    card.innerHTML='<div class="eneles-window-bar" aria-hidden="true"><i></i><i></i><i></i></div>'+
      '<div class="eneles-window-body"><h2 id="enelesWindowTitle">Un espace de mémorisation pensé pour vous</h2>'+
      '<p>Eneles Mémoire rassemble vos textes, vos séries de cartes, vos QCM et vos audios dans un espace clair. Chaque contenu est organisé pour être révisé à votre rythme, au moment où il revient à échéance.</p></div>';
    anchor.parentNode.insertBefore(card,anchor.nextSibling);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
