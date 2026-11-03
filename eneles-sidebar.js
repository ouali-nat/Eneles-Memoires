(function(){
  'use strict';
  /* Correctif final : feuilles de style chargées en dernier + bloc de présentation de l'accueil. */
  var V='20261103-window-blocks-v1';
  function loadExtras(){
    if(!document.head||!document.body)return;
    ['eneles-final-layout.css','eneles-window-blocks.css'].forEach(function(f){
      if(document.querySelector('link[href*="'+f+'"]'))return;
      var l=document.createElement('link');l.rel='stylesheet';l.href='./css/'+f+'?v='+V;document.head.appendChild(l);
    });
    if(document.body.dataset.page==='home'&&!document.querySelector('script[src*="eneles-home-presentation.js"]')){
      var s=document.createElement('script');s.src='./eneles-home-presentation.js?v='+V;document.body.appendChild(s);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadExtras,{once:true});else loadExtras();
})();
(function(){
  'use strict';
  if(window.__enelesMemorySidebarReady)return;
  window.__enelesMemorySidebarReady=true;
  var KEY='eneles_memory_sidebar_collapsed_v1';
  var ICONS={
    home:'<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book:'<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
    recent:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    create:'<path d="M12 5v14M5 12h14"/>',
    group:'<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5"/>',
    search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    spark:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.2-1-1.5-1-2.6 0-.9.7-1.6 1.7-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/>',
    moon:'<path d="M20 14.2A8 8 0 1 1 9.8 4a6.3 6.3 0 0 0 10.2 10.2z"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',
    collapse:'<path d="m15 6-6 6 6 6"/>',
    user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'
  };
  function svg(name,size){return '<svg viewBox="0 0 24 24" width="'+(size||20)+'" height="'+(size||20)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICONS[name]+'</svg>'}
  var ITEMS=[
    {id:'home',label:'Accueil',icon:'home',url:'index.html'},
    {id:'memories',label:'Mes mémorisations',icon:'book',url:'mes-memoires.html'},
    {id:'library',label:'Bibliothèque',icon:'recent',url:'choisir.html'},
    {id:'reviews',label:'Révisions',icon:'recent',url:'revisions.html'},
    {id:'create',label:'Créer un contenu',icon:'create',url:'creer.html'},
    {id:'groups',label:'Groupes d’étude',icon:'group',url:'groupes.html'},
    {id:'shared',label:'Ressources partagées',icon:'search',url:'cartes-publiques.html'},
    {id:'assistant',label:'Eneles · Assistante',icon:'spark',url:'assistant.html'}
  ];
  var nav,scrim,toggle;
  function item(it){var a=document.createElement('a');a.className='asb-item';a.dataset.asb=it.id;a.href=it.url;a.title=it.label;a.setAttribute('aria-label',it.label);a.innerHTML='<span class="asb-ico">'+svg(it.icon)+'</span><span class="asb-label">'+it.label+'</span><span class="asb-arrow">'+svg('chevron',16)+'</span>';if((location.pathname.split('/').pop()||'index.html')===it.url){a.classList.add('is-active');a.setAttribute('aria-current','page')}a.addEventListener('click',closeOnMobile);return a}
  function closeOnMobile(){if(matchMedia('(max-width:900px)').matches)setOpen(false)}
  function setOpen(v){nav.classList.toggle('is-open',v);scrim.classList.toggle('is-on',v);toggle.setAttribute('aria-expanded',v?'true':'false')}
  function setCollapsed(v){document.documentElement.classList.toggle('asb-collapsed',v);try{localStorage.setItem(KEY,v?'1':'0')}catch(e){}}
  function access(){if(typeof window.auroreShowAccessGate==='function'){window.auroreShowAccessGate();return}var lock=document.getElementById('memoryAccessLock');if(lock){lock.hidden=false;document.body.classList.add('memory-access-open');return}var b=document.getElementById('appMenuSignIn');if(b)b.click();else location.href='index.html'}
  function build(){
    nav=document.createElement('nav');nav.id='enelesMemorySidebar';nav.className='asb';nav.setAttribute('aria-label','Navigation principale Eneles Mémoire');
    nav.innerHTML='<div class="asb-dots" aria-hidden="true"><i></i><i></i><i></i></div><div class="asb-head"><div class="asb-brand"><img src="/assets/aurore-logo.png" alt=""><span>Eneles <small>Mémoire</small></span></div><button type="button" class="asb-collapse" aria-label="Réduire le menu" title="Réduire / agrandir">'+svg('collapse',16)+'</button></div><div class="asb-sep"></div><div class="asb-scroll"><div class="asb-section">Menu</div><div class="asb-group" data-group="main"></div><div class="asb-sep"></div><div class="asb-section">Préférences et compte</div><div class="asb-group" data-group="more"><button type="button" class="asb-item" data-action="theme"><span class="asb-ico">'+svg('moon')+'</span><span class="asb-label">Mode clair / sombre</span><span class="asb-arrow">'+svg('chevron',16)+'</span></button><button type="button" class="asb-item" data-action="color"><span class="asb-ico">'+svg('palette')+'</span><span class="asb-label">Couleur du site</span><span class="asb-arrow">'+svg('chevron',16)+'</span></button></div></div><div class="asb-sep"></div><button type="button" class="asb-user" id="enelesSidebarAccount"><span class="asb-avatar">'+svg('user',20)+'</span><span class="asb-user-text"><strong>Compte Eneles ID</strong><small>Connexion et compte</small></span></button>';
    scrim=document.createElement('div');scrim.className='asb-scrim';scrim.addEventListener('click',function(){setOpen(false)});
    toggle=document.createElement('button');toggle.type='button';toggle.className='asb-toggle';toggle.setAttribute('aria-label','Ouvrir la barre latérale');toggle.setAttribute('aria-expanded','false');toggle.innerHTML=svg('chevron',16);toggle.addEventListener('click',function(){setOpen(!nav.classList.contains('is-open'))});
    document.body.appendChild(scrim);document.body.appendChild(nav);document.body.appendChild(toggle);
    var group=nav.querySelector('[data-group="main"]');ITEMS.forEach(function(it){group.appendChild(item(it))});
    nav.querySelector('.asb-collapse').addEventListener('click',function(){if(matchMedia('(max-width:900px)').matches){setOpen(false);return}setCollapsed(!document.documentElement.classList.contains('asb-collapsed'))});
    nav.querySelector('[data-action="theme"]').addEventListener('click',function(){var b=document.getElementById('themeToggle');if(b)b.click()});
    nav.querySelector('[data-action="color"]').addEventListener('click',function(){var b=document.getElementById('colorThemeToggle');if(b)b.click()});
    nav.querySelector('#enelesSidebarAccount').addEventListener('click',access);
    try{setCollapsed(localStorage.getItem(KEY)==='1')}catch(e){setCollapsed(false)}
  }
  function init(){if(!document.body||!document.querySelector('.topbar')||document.getElementById('enelesMemorySidebar'))return;build();document.documentElement.classList.add('has-asb');document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false)});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
