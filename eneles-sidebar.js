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
    audio:'<path d="M12 3v18M8 8v8M4 10v4M16 8v8M20 10v4"/>',
    chart:'<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-7"/>',
    files:'<path d="M4 5a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2z"/><path d="M4 9h16"/>',
    user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.2-1-1.5-1-2.6 0-.9.7-1.6 1.7-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/>',
    moon:'<path d="M20 14.2A8 8 0 1 1 9.8 4a6.3 6.3 0 0 0 10.2 10.2z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',collapse:'<path d="m15 6-6 6 6 6"/>'
  };
  function svg(name,size){return '<svg viewBox="0 0 24 24" width="'+(size||20)+'" height="'+(size||20)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICONS[name]+'</svg>'}
  var ITEMS=[
    {id:'home',label:'Accueil',icon:'home',url:'index.html'},
    {id:'memories',label:'Mes mémorisations',icon:'book',url:'mes-memoires.html'},
    {id:'library',label:'Bibliothèque',icon:'recent',url:'choisir.html'},
    {id:'reviews',label:'Révisions',icon:'recent',url:'revisions.html'},
    {id:'groups',label:'Groupes d’étude',icon:'group',url:'groupes.html'},
    {id:'shared',label:'Ressources partagées',icon:'search',url:'cartes-publiques.html'},
    {id:'audio',label:'Mes audios',icon:'audio',url:'mes-audios.html'},
    {id:'progress',label:'Ma progression',icon:'chart',url:'progression.html'},
    {id:'files',label:'Mes fichiers',icon:'files',url:'fichiers.html'},
    {id:'assistant',label:'Eneles · Assistante',icon:'spark',url:'assistant.html'}
  ];
  var CREATION=[
    {label:'Nouvelle mémorisation',url:'creer-memoire.html'},
    {label:'Créer des cartes',url:'creer-cartes.html'},
    {label:'Créer un QCM',url:'qcm.html'},
    {label:'Créer un audio',url:'audio.html'}
  ];
  /* Nuances et libellés alignés sur la palette active d’Archives. */
  var COLORS=[
    ['violet','Violet','#6D28D9','#C084FC'],['rouge','Rouge','#C93648','#FF8A96'],['vert','Vert','#198754','#75D89C'],['bleu','Bleu','#1D4ED8','#7DB3FF'],['orange','Orange','#C85C0D','#FFB36B'],['rose','Rose','#BE185D','#F9A8D4'],
    ['lime','Citron vert','#4D7C0F','#BEF264'],['bordeaux','Bordeaux','#881337','#FB7185'],['azur','Azur','#0369A1','#7DD3FC'],['jaune','Jaune','#D9A406','#FCD34D'],['olive','Olive','#6B7A2A','#A7B85F'],['chocolat','Chocolat','#8A4A1C','#D49A6A'],
    ['sauge','Sauge','#6E9A7E','#B5D3BF'],['magenta','Magenta','#D946EF','#F0ABFC'],['petrole-cuivre','Pétrole','#104C64','#104C64'],['prune-rouge','Prune','#341A2C','#341A2C'],['rose-sable','Rose poudré','#EFC1B5','#EFC1B5'],['sarcelle-creme','Sarcelle','#0D6B70','#0D6B70']
  ];
  var THEMES=[['light','Clair','sun'],['dark','Sombre','moon'],['system','Auto','monitor']];
  var nav,scrim,toggle;
  function isMobileNav(){return window.matchMedia('(max-width:900px)').matches||window.matchMedia('(pointer:coarse) and (orientation:portrait)').matches}
  function closeOnMobile(){if(isMobileNav())setOpen(false)}
  function setOpen(value){nav.classList.toggle('is-open',value);scrim.classList.toggle('is-on',value);toggle.setAttribute('aria-expanded',value?'true':'false');document.body.classList.toggle('eneles-sidebar-open',value)}
  function setCollapsed(value){document.documentElement.classList.toggle('asb-collapsed',value);try{localStorage.setItem(KEY,value?'1':'0')}catch(e){}}
  function accountAction(){var b=document.getElementById('appMenuSignIn');if(b){b.click();return}if(typeof window.auroreShowAccessGate==='function'){window.auroreShowAccessGate();return}var gate=document.getElementById('memoryAccessLock');if(gate){gate.hidden=false;document.body.classList.add('memory-access-open')}}
  function addItem(parent,it){var a=document.createElement('a');a.className='asb-item';a.href=it.url;a.dataset.asb=it.id;a.title=it.label;a.setAttribute('aria-label',it.label);a.innerHTML='<span class="asb-ico">'+svg(it.icon)+'</span><span class="asb-label">'+it.label+'</span><span class="asb-arrow">'+svg('chevron',16)+'</span>';var active=(location.pathname.split('/').pop()||'index.html')===it.url;if(active){a.classList.add('is-active');a.setAttribute('aria-current','page')}a.addEventListener('click',closeOnMobile);parent.appendChild(a);return a}
  function makeAccordion(id,title,icon,open){var d=document.createElement('details');d.className='asb-acc';d.id=id;if(open)d.open=true;d.innerHTML='<summary><span class="asb-ico">'+svg(icon)+'</span><span class="asb-label">'+title+'</span><span class="asb-caret">'+svg('chevron',16)+'</span></summary><div class="asb-acc-body"></div>';return d}
  function syncAppearance(){
    if(!nav)return;
    var mode=(function(){try{return localStorage.getItem('aurore-memory-theme')||'system'}catch(e){return 'system'}})();
    nav.querySelectorAll('[data-memory-mode]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.memoryMode===mode?'true':'false')});
    var color=document.documentElement.dataset.colorTheme||'rose';
    nav.querySelectorAll('.asb-sw').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.colorChoice===color?'true':'false')});
    var selected=COLORS.find(function(c){return c[0]===color});var label=nav.querySelector('#enelesSidebarCurrentColor');if(label)label.textContent=selected?selected[1]:'Rose';
  }
  function buildAppearance(body){
    var modes=document.createElement('div');modes.className='asb-theme-row';modes.setAttribute('role','group');modes.setAttribute('aria-label','Mode d’affichage');
    THEMES.forEach(function(t){var b=document.createElement('button');b.type='button';b.className='asb-theme-btn';b.dataset.memoryMode=t[0];b.setAttribute('aria-pressed','false');b.innerHTML=svg(t[2],16)+'<span>'+t[1]+'</span>';b.addEventListener('click',function(){if(typeof window.auroreSetMemoryTheme==='function')window.auroreSetMemoryTheme(t[0]);syncAppearance()});modes.appendChild(b)});body.appendChild(modes);
    var head=document.createElement('div');head.className='asb-sw-head';head.innerHTML='<span>Couleur du site</span><strong id="enelesSidebarCurrentColor"></strong>';body.appendChild(head);
    var grid=document.createElement('div');grid.className='asb-sw-grid';grid.setAttribute('aria-label','Palette Eneles de 18 couleurs');
    COLORS.forEach(function(c){var b=document.createElement('button');b.type='button';b.className='asb-sw';b.dataset.colorChoice=c[0];b.title=c[1];b.setAttribute('aria-label','Couleur '+c[1]);b.setAttribute('aria-pressed','false');b.style.setProperty('--asb-swatch','linear-gradient(135deg,'+c[2]+','+c[3]+')');b.addEventListener('click',function(){if(typeof window.auroreSetMemoryColor==='function')window.auroreSetMemoryColor(c[0]);syncAppearance()});grid.appendChild(b)});body.appendChild(grid);
  }
  function init(){
    if(!document.body||!document.querySelector('.topbar')||document.getElementById('enelesMemorySidebar'))return;
    nav=document.createElement('nav');nav.id='enelesMemorySidebar';nav.className='asb';nav.setAttribute('aria-label','Navigation principale Eneles Mémoire');
    nav.innerHTML='<div class="asb-dots" aria-hidden="true"><i></i><i></i><i></i></div><div class="asb-head"><div class="asb-brand"><img src="/assets/aurore-logo.png" alt=""><span>Eneles <small>Mémoire</small></span></div><button type="button" class="asb-collapse" aria-label="Réduire le menu" title="Réduire / agrandir">'+svg('collapse',16)+'</button></div><div class="asb-sep"></div><div class="asb-scroll"><div class="asb-section">Menu</div><div class="asb-group" id="enelesSidebarMain"></div><div class="asb-sep"></div><div class="asb-section">Créer rapidement</div><div class="asb-group" id="enelesSidebarCreate"></div><div class="asb-sep"></div><div class="asb-section">Personnaliser</div><div id="enelesSidebarAppearance"></div><div class="asb-sep"></div><div class="asb-group"><button type="button" class="asb-item" id="enelesSidebarSearch"><span class="asb-ico">'+svg('search')+'</span><span class="asb-label">Rechercher</span><span class="asb-arrow">'+svg('chevron',16)+'</span></button><button type="button" class="asb-item" id="enelesSidebarTop"><span class="asb-ico">'+svg('home')+'</span><span class="asb-label">Haut de page</span><span class="asb-arrow">'+svg('chevron',16)+'</span></button><button type="button" class="asb-item" id="enelesSidebarShortcuts"><span class="asb-ico">'+svg('spark')+'</span><span class="asb-label">Aide et raccourcis</span><span class="asb-arrow">'+svg('chevron',16)+'</span></button></div></div><div class="asb-sep"></div><button type="button" class="asb-user" id="enelesSidebarAccount"><span class="asb-avatar">'+svg('user',20)+'</span><span class="asb-user-text"><strong>Compte Eneles ID</strong><small>Connexion et déconnexion</small></span></button>';
    scrim=document.createElement('div');scrim.className='asb-scrim';scrim.addEventListener('click',function(){setOpen(false)});
    toggle=document.createElement('button');toggle.type='button';toggle.className='asb-toggle';toggle.setAttribute('aria-label','Ouvrir la barre latérale');toggle.setAttribute('aria-expanded','false');toggle.innerHTML=svg('chevron',16);toggle.addEventListener('click',function(){setOpen(!nav.classList.contains('is-open'))});
    document.body.appendChild(scrim);document.body.appendChild(nav);document.body.appendChild(toggle);
    var main=nav.querySelector('#enelesSidebarMain');ITEMS.forEach(function(it){addItem(main,it)});
    var create=makeAccordion('enelesSidebarCreateAccordion','Créer un contenu','create',false);var createBody=create.querySelector('.asb-acc-body');CREATION.forEach(function(it){addItem(createBody,{id:'create-'+it.url,label:it.label,icon:'create',url:it.url})});nav.querySelector('#enelesSidebarCreate').appendChild(create);
    var appearance=makeAccordion('enelesSidebarAppearanceAccordion','Apparence','palette',false);buildAppearance(appearance.querySelector('.asb-acc-body'));nav.querySelector('#enelesSidebarAppearance').appendChild(appearance);
    nav.querySelector('.asb-collapse').addEventListener('click',function(){if(isMobileNav()){setOpen(false);return}setCollapsed(!document.documentElement.classList.contains('asb-collapsed'))});
    nav.querySelector('#enelesSidebarAccount').addEventListener('click',function(){accountAction();closeOnMobile()});
    nav.querySelector('#enelesSidebarTop').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});closeOnMobile()});
    nav.querySelector('#enelesSidebarShortcuts').addEventListener('click',function(){var message='Raccourcis : Ctrl + K pour rechercher, Ctrl + Alt + N pour créer une mémorisation, Échap pour fermer le menu.';if(typeof window.auroreToast==='function')window.auroreToast(message);else window.alert(message);closeOnMobile()});
    nav.querySelector('#enelesSidebarSearch').addEventListener('click',function(){var input=document.getElementById('enelesMemorySearchInput')||document.querySelector('input[type="search"]');if(input){input.scrollIntoView({behavior:'smooth',block:'center'});window.setTimeout(function(){input.focus()},220)}else{try{sessionStorage.setItem('eneles:focus-memory-search','1')}catch(e){}location.href='index.html#accueil'}closeOnMobile()});
    try{setCollapsed(localStorage.getItem(KEY)==='1')}catch(e){setCollapsed(false)}
    syncAppearance();
    var observer=new MutationObserver(syncAppearance);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-color-theme']});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){setOpen(false);return}
      if(e.altKey&&e.ctrlKey&&e.key.toLowerCase()==='n'&&!e.repeat){e.preventDefault();location.href='creer-memoire.html';return}
      if(e.ctrlKey&&e.key.toLowerCase()==='k'&&!e.repeat){e.preventDefault();var input=document.getElementById('enelesMemorySearchInput')||document.querySelector('input[type=\"search\"]');if(input){input.scrollIntoView({behavior:'smooth',block:'center'});window.setTimeout(function(){input.focus()},180)}}
    });
    try{if(sessionStorage.getItem('eneles:focus-memory-search')==='1'){sessionStorage.removeItem('eneles:focus-memory-search');var i=document.getElementById('enelesMemorySearchInput');if(i){i.scrollIntoView({behavior:'smooth',block:'center'});window.setTimeout(function(){i.focus()},250)}}}catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
