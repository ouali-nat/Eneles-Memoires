(function(){
  'use strict';
  /* Feuilles de style chargées en dernier + bloc de présentation de l'accueil. */
  var V='20261107-global-library-header-v1';
  function loadExtras(){
    if(!document.head||!document.body)return;
    ['eneles-final-layout.css','eneles-window-blocks.css','eneles-hero-tune.css','eneles-header-presentation-20261104.css','eneles-material-home-20261104.css'].forEach(function(f){
      if(document.querySelector('link[href*="'+f+'"]'))return;
      var l=document.createElement('link');l.rel='stylesheet';l.href='./css/'+f+'?v='+V;document.head.appendChild(l);
    });
    // Le morphing reste au-dessus des feuilles de finition injectées ensuite.
    var heroMotion=document.querySelector('link[href*="eneles-memory-hero-motion.css"]');
    if(heroMotion)document.head.appendChild(heroMotion);
    var homeRefine=document.querySelector('link[href*="eneles-memory-home-refine.css"]');
    if(homeRefine)document.head.appendChild(homeRefine);
    var globalBlocks=document.querySelector('link[href*="eneles-memory-global-blocks.css"]');
    if(!globalBlocks){globalBlocks=document.createElement('link');globalBlocks.rel='stylesheet';globalBlocks.href='./css/eneles-memory-global-blocks.css?v='+V;document.head.appendChild(globalBlocks)}
    else document.head.appendChild(globalBlocks);
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
  var RECENT_KEY='eneles_memory_sidebar_recent_v1';
  var OPEN_KEY='eneles_memory_sidebar_open_v1';
  var STATS_KEY='aurore-memory-home-stats-v1';
  var HERO_KEY='eneles:memory-hero-hidden';
  var SHARE_URL='https://aurore-memories-mu.vercel.app/';
  var ICONS={
    home:'<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book:'<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
    library:'<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="m15.5 5.5 3.6-1 3 14.6-3.6 1z"/>',
    recent:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    refresh:'<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
    create:'<path d="M12 5v14M5 12h14"/>',
    group:'<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5"/>',
    share:'<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4"/>',
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
    top:'<path d="M12 19V5M6 11l6-6 6 6"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.6M12 17h.01"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',collapse:'<path d="m15 6-6 6 6 6"/>'
  };
  function svg(name,size){return '<svg viewBox="0 0 24 24" width="'+(size||20)+'" height="'+(size||20)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICONS[name]+'</svg>'}
  var ITEMS=[
    {id:'home',label:'Accueil',icon:'home',url:'index.html'},
    {id:'library',label:'Ma bibliothèque',icon:'library',url:'mes-memoires.html'},
    {id:'reviews',label:'Révisions',icon:'refresh',url:'revisions.html'},
    {id:'groups',label:'Groupes d’étude',icon:'group',url:'groupes.html'},
    {id:'shared',label:'Ressources partagées',icon:'share',url:'cartes-publiques.html'},
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
  var ALL=ITEMS.concat(CREATION.map(function(c){return {id:'create-'+c.url,label:c.label,icon:'create',url:c.url}}));
  /* Mêmes 18 couleurs et mêmes teintes de pastille que la palette actuelle d’Archives. */
  var COLORS=[
    ['violet','Violet','#6D28D9'],['rouge','Rouge','#B91C1C'],['vert','Vert','#15803D'],['bleu','Bleu','#1D4ED8'],['orange','Orange','#C85C0D'],['rose','Rose','#BE185D'],
    ['lime','Citron vert','#65A30D'],['bordeaux','Bordeaux','#8B1E3F'],['azur','Azur','#0369A1'],['jaune','Jaune','#A87B05'],['olive','Olive','#4A5520'],['chocolat','Chocolat','#5C300F'],
    ['sauge','Sauge','#4A7A5C'],['magenta','Magenta','#A21CAF'],['petrole-cuivre','Pétrole','#104C64'],['prune-rouge','Prune','#341A2C'],['rose-sable','Rose poudré','#EFC1B5'],['sarcelle-creme','Sarcelle','#0D6B70']
  ];
  var THEMES=[['light','Clair','sun'],['dark','Sombre','moon'],['system','Auto','monitor']];
  var nav,scrim,toggle,openState={};
  function page(){var p=(location.pathname.split('/').pop()||'index.html').toLowerCase();return /\.html$/.test(p)?p:p+'.html'}
  function read(key,fallback){try{var v=JSON.parse(localStorage.getItem(key));return v==null?fallback:v}catch(e){return fallback}}
  function write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}}
  function toast(message){if(typeof window.auroreToast==='function')window.auroreToast(message);else window.alert(message)}
  function isMobileNav(){return window.matchMedia('(max-width:900px)').matches||window.matchMedia('(pointer:coarse) and (orientation:portrait)').matches}
  function closeOnMobile(){if(isMobileNav())setOpen(false)}
  function setOpen(value){nav.classList.toggle('is-open',value);scrim.classList.toggle('is-on',value);toggle.setAttribute('aria-expanded',value?'true':'false');document.body.classList.toggle('eneles-sidebar-open',value)}
  function setCollapsed(value){document.documentElement.classList.toggle('asb-collapsed',value);try{localStorage.setItem(KEY,value?'1':'0')}catch(e){}}
  function accountAction(){var b=document.getElementById('appMenuSignIn');if(b){b.click();return}if(typeof window.auroreShowAccessGate==='function'){window.auroreShowAccessGate();return}var gate=document.getElementById('memoryAccessLock');if(gate){gate.hidden=false;document.body.classList.add('memory-access-open')}}
  function addItem(parent,it){var a=document.createElement('a');a.className='asb-item';a.href=it.url;a.dataset.asb=it.id;a.title=it.label;a.setAttribute('aria-label',it.label);a.innerHTML='<span class="asb-ico">'+svg(it.icon)+'</span><span class="asb-label">'+it.label+'</span>'+(it.id==='reviews'?'<span class="asb-badge" hidden>0</span>':'')+'<span class="asb-arrow">'+svg('chevron',16)+'</span>';if(page()===it.url||(it.id==='library'&&page()==='mes-memoires.html')){a.classList.add('is-active');a.setAttribute('aria-current','page')}a.addEventListener('click',closeOnMobile);parent.appendChild(a);return a}
  function addAction(parent,id,label,icon,fn){var b=document.createElement('button');b.type='button';b.className='asb-item';b.id=id;b.title=label;b.setAttribute('aria-label',label);b.innerHTML='<span class="asb-ico">'+svg(icon)+'</span><span class="asb-label">'+label+'</span><span class="asb-arrow">'+svg('chevron',16)+'</span>';b.addEventListener('click',function(){fn();closeOnMobile()});parent.appendChild(b);return b}
  function makeAccordion(id,title,icon,defaultOpen){
    var d=document.createElement('details');d.className='asb-acc';d.id=id;
    var saved=openState[id];if(typeof saved==='boolean'?saved:defaultOpen)d.open=true;
    d.innerHTML='<summary><span class="asb-ico">'+svg(icon)+'</span><span class="asb-label">'+title+'</span><span class="asb-caret">'+svg('chevron',16)+'</span></summary><div class="asb-acc-body"></div>';
    d.addEventListener('toggle',function(){openState[id]=d.open;write(OPEN_KEY,openState)});
    return d;
  }
  function addSwitch(body,id,title,sub,get,set){
    var b=document.createElement('button');b.type='button';b.className='asb-switch';b.id=id;b.setAttribute('role','switch');
    b.innerHTML='<span class="asb-switch-text"><strong>'+title+'</strong><small>'+sub+'</small></span><span class="asb-knob" aria-hidden="true"></span>';
    function sync(){b.setAttribute('aria-checked',get()?'true':'false')}
    b.addEventListener('click',function(){set(!get());sync()});
    sync();body.appendChild(b);return sync;
  }
  /* ---------- Recherche ---------- */
  function focusSearch(){
    var hero=document.getElementById('enelesMemoryHero');
    if(hero&&hero.hidden){
      if(typeof window.enelesSetHeroVisible==='function')window.enelesSetHeroVisible(true);
      else{hero.hidden=false;hero.setAttribute('aria-hidden','false');try{localStorage.setItem(HERO_KEY,'0')}catch(e){}}
    }
    var input=document.getElementById('enelesMemorySearchInput')||document.querySelector('input[type="search"]');
    if(input){input.scrollIntoView({behavior:'smooth',block:'center'});window.setTimeout(function(){input.focus()},220);return}
    try{sessionStorage.setItem('eneles:focus-memory-search','1')}catch(e){}
    location.href='index.html#accueil';
  }
  /* ---------- Carte « Aujourd’hui » et pastille des révisions ---------- */
  function plural(n,one,many){return n+' '+(n>1?many:one)}
  function readStats(){var s=read(STATS_KEY,null);s=s&&typeof s==='object'?s:{};return {memories:+s.memories||0,series:+s.series||0,due:+s.due||0}}
  function renderToday(){
    if(!nav)return;
    var dueEl=nav.querySelector('#enelesTodayDue');if(!dueEl)return;
    var s=readStats(),due=s.due,total=s.memories+s.series;
    var cta=nav.querySelector('#enelesTodayCta');
    dueEl.textContent=String(due);
    nav.querySelector('#enelesTodayText').textContent=due>0?plural(due,'carte à réviser','cartes à réviser')+' aujourd’hui':(total>0?'Tout est à jour. Bien joué.':'Ajoutez un premier contenu pour commencer.');
    nav.querySelector('#enelesTodayMemories').textContent=plural(s.memories,'mémorisation','mémorisations');
    nav.querySelector('#enelesTodaySeries').textContent=plural(s.series,'série','séries');
    if(due>0){cta.href='revisions.html';cta.firstChild.textContent='Réviser maintenant'}
    else if(total>0){cta.href='choisir.html';cta.firstChild.textContent='Ouvrir ma bibliothèque'}
    else{cta.href='creer.html';cta.firstChild.textContent='Ajouter un contenu'}
    var badge=nav.querySelector('[data-asb="reviews"] .asb-badge');
    if(badge){badge.hidden=due<=0;badge.textContent=due>99?'99+':String(due)}
  }
  /* ---------- Pages récentes ---------- */
  function trackRecent(){
    var cur=ALL.filter(function(it){return it.url===page()})[0];
    var list=read(RECENT_KEY,[]);if(!Array.isArray(list))list=[];
    if(cur&&cur.url!=='index.html'){list=[cur.url].concat(list.filter(function(u){return u!==cur.url})).slice(0,6);write(RECENT_KEY,list)}
    return list;
  }
  function renderRecent(list){
    var host=nav.querySelector('#enelesSidebarRecent');if(!host)return;
    var cur=page();
    var items=list.map(function(u){return ALL.filter(function(it){return it.url===u})[0]}).filter(function(it){return it&&it.url!==cur}).slice(0,4);
    var acc=makeAccordion('enelesSidebarRecentAccordion','Récemment consulté','recent',false),body=acc.querySelector('.asb-acc-body');
    if(!items.length){var p=document.createElement('p');p.className='asb-empty';p.textContent='Vos pages récentes apparaîtront ici.';body.appendChild(p)}
    else items.forEach(function(it){addItem(body,{id:'recent-'+it.url,label:it.label,icon:it.icon,url:it.url})});
    host.appendChild(acc);
  }
  /* ---------- Compte et connexion ---------- */
  function updateAccount(session){
    if(!nav)return;
    var u=session&&session.user?session.user:null;
    var strong=nav.querySelector('#enelesSidebarAccount strong'),small=nav.querySelector('#enelesSidebarAccount small'),av=nav.querySelector('.asb-avatar');
    if(!strong||!small||!av)return;
    if(u){
      var meta=u.user_metadata||{};
      var name=String(meta.full_name||meta.name||(u.email||'').split('@')[0]||'Compte Eneles ID');
      strong.textContent=name;small.textContent='Appuyer pour se déconnecter';av.textContent=(name.charAt(0)||'E').toUpperCase();
    }else{
      strong.textContent='Compte Eneles ID';small.textContent='Se connecter';av.innerHTML=svg('user',20);
    }
  }
  function setNet(state){var n=nav&&nav.querySelector('#enelesSidebarNet');if(!n)return;n.dataset.state=state;n.querySelector('span').textContent=state==='online'?'En ligne':'Hors ligne · données locales'}
  /* ---------- Outils ---------- */
  function refreshApp(){
    var b=document.getElementById('auroreRefreshApp');
    if(b&&!b.disabled){b.click();return}
    if(!navigator.onLine){toast('Connexion nécessaire pour actualiser. Vos données locales sont conservées.');return}
    window.location.reload();
  }
  function shareApp(){
    var data={title:'Eneles Mémoire',text:'Retenir, tout simplement : mémorisations, cartes et révisions.',url:SHARE_URL};
    if(navigator.share){navigator.share(data).catch(function(){});return}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(SHARE_URL).then(function(){toast('Lien copié.')},function(){toast(SHARE_URL)});return}
    toast(SHARE_URL);
  }
  function heroVisible(){try{return localStorage.getItem(HERO_KEY)!=='1'}catch(e){return true}}
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
    COLORS.forEach(function(c){var b=document.createElement('button');b.type='button';b.className='asb-sw';b.dataset.colorChoice=c[0];b.title=c[1];b.setAttribute('aria-label','Couleur '+c[1]);b.setAttribute('aria-pressed','false');b.style.setProperty('--asb-swatch',c[2]);b.addEventListener('click',function(){if(typeof window.auroreSetMemoryColor==='function')window.auroreSetMemoryColor(c[0]);syncAppearance()});grid.appendChild(b)});body.appendChild(grid);
    var options=document.createElement('div');options.style.marginTop='12px';body.appendChild(options);
    addSwitch(options,'enelesSidebarHeroSwitch','Bloc d’accueil','Affiché en haut de l’accueil',function(){
      return typeof window.enelesIsHeroVisible==='function'?window.enelesIsHeroVisible():heroVisible();
    },function(show){
      if(typeof window.enelesSetHeroVisible==='function'){window.enelesSetHeroVisible(show);return}
      try{localStorage.setItem(HERO_KEY,show?'0':'1')}catch(e){}
      var hero=document.getElementById('enelesMemoryHero');
      if(hero){hero.hidden=!show;hero.setAttribute('aria-hidden',String(!show))}
      toast(show?'Le bloc d’accueil sera affiché sur l’accueil.':'Le bloc d’accueil sera masqué sur l’accueil.');
    });
    if(document.fullscreenEnabled){
      var syncFull=addSwitch(options,'enelesSidebarFullSwitch','Plein écran','Plus de place pour étudier',function(){return !!document.fullscreenElement},function(on){
        try{var r=on?document.documentElement.requestFullscreen():document.exitFullscreen();if(r&&r.catch)r.catch(function(){})}catch(e){}
      });
      document.addEventListener('fullscreenchange',syncFull);
    }
  }
  function init(){
    if(!document.body||document.getElementById('enelesMemorySidebar'))return;
    document.documentElement.classList.add('has-asb');document.body.classList.add('eneles-has-sidebar');
    openState=read(OPEN_KEY,{});if(!openState||typeof openState!=='object'||Array.isArray(openState))openState={};
    nav=document.createElement('nav');nav.id='enelesMemorySidebar';nav.className='asb';nav.setAttribute('aria-label','Navigation principale Eneles Mémoire');
    nav.innerHTML='<div class="asb-dots" aria-hidden="true"><i></i><i></i><i></i></div>'+
      '<div class="asb-head"><div class="asb-brand"><img src="/assets/aurore-logo.png" alt=""><span>Eneles</span></div><button type="button" class="asb-collapse" aria-label="Réduire le menu" title="Réduire / agrandir">'+svg('collapse',16)+'</button></div>'+
      '<div class="asb-sep"></div>'+
      '<div class="asb-scroll">'+
        '<div class="asb-today" id="enelesSidebarToday"><div class="asb-today-top"><span class="asb-today-label">Aujourd’hui</span><b class="asb-today-due" id="enelesTodayDue">0</b></div><p class="asb-today-text" id="enelesTodayText">Chargement…</p><div class="asb-today-chips"><span id="enelesTodayMemories">0 mémorisation</span><span id="enelesTodaySeries">0 série</span></div><a class="asb-today-cta" id="enelesTodayCta" href="creer.html"><span>Ajouter un contenu</span>'+svg('chevron',14)+'</a></div>'+
        '<div class="asb-section">Menu</div><div class="asb-group" id="enelesSidebarMain"></div><div class="asb-group" id="enelesSidebarRecent"></div>'+
        '<div class="asb-sep"></div><div class="asb-section">Créer rapidement</div><div class="asb-group" id="enelesSidebarCreate"></div>'+
        '<div class="asb-sep"></div><div class="asb-section">Personnaliser</div><div id="enelesSidebarAppearance"></div>'+
        '<div class="asb-sep"></div><div class="asb-section">Outils</div><div class="asb-group" id="enelesSidebarTools"></div>'+
      '</div>'+
      '<div class="asb-sep"></div>'+
      '<div class="asb-net" id="enelesSidebarNet" data-state="online" role="status"><i aria-hidden="true"></i><span>En ligne</span></div>'+
      '<button type="button" class="asb-user" id="enelesSidebarAccount"><span class="asb-avatar">'+svg('user',20)+'</span><span class="asb-user-text"><strong>Compte Eneles ID</strong><small>Se connecter</small></span></button>';
    scrim=document.createElement('div');scrim.className='asb-scrim';scrim.addEventListener('click',function(){setOpen(false)});
    toggle=document.createElement('button');toggle.type='button';toggle.className='asb-toggle';toggle.setAttribute('aria-label','Ouvrir la barre latérale');toggle.setAttribute('aria-expanded','false');toggle.innerHTML=svg('chevron',16);toggle.addEventListener('click',function(){setOpen(!nav.classList.contains('is-open'))});
    document.body.appendChild(scrim);document.body.appendChild(nav);document.body.appendChild(toggle);
    var main=nav.querySelector('#enelesSidebarMain');ITEMS.forEach(function(it){addItem(main,it)});
    renderRecent(trackRecent());
    var onCreatePage=CREATION.some(function(it){return it.url===page()});
    var create=makeAccordion('enelesSidebarCreateAccordion','Créer un contenu','create',onCreatePage);var createBody=create.querySelector('.asb-acc-body');CREATION.forEach(function(it){addItem(createBody,{id:'create-'+it.url,label:it.label,icon:'create',url:it.url})});nav.querySelector('#enelesSidebarCreate').appendChild(create);
    var appearance=makeAccordion('enelesSidebarAppearanceAccordion','Apparence','palette',false);buildAppearance(appearance.querySelector('.asb-acc-body'));nav.querySelector('#enelesSidebarAppearance').appendChild(appearance);
    var tools=nav.querySelector('#enelesSidebarTools');
    addAction(tools,'enelesSidebarSearch','Rechercher','search',focusSearch);
    addAction(tools,'enelesSidebarTop','Haut de page','top',function(){window.scrollTo({top:0,behavior:'smooth'})});
    addAction(tools,'enelesSidebarRefresh','Actualiser l’application','refresh',refreshApp);
    addAction(tools,'enelesSidebarShare','Partager Eneles Mémoire','share',shareApp);
    addAction(tools,'enelesSidebarShortcuts','Aide et raccourcis','help',function(){toast('Raccourcis : « / » ou Ctrl + K pour rechercher · Ctrl + Alt + N pour créer une mémorisation · Échap pour fermer le menu.')});
    nav.querySelector('.asb-collapse').addEventListener('click',function(){if(isMobileNav()){setOpen(false);return}setCollapsed(!document.documentElement.classList.contains('asb-collapsed'))});
    nav.querySelector('#enelesSidebarAccount').addEventListener('click',function(){accountAction();closeOnMobile()});
    nav.querySelector('#enelesTodayCta').addEventListener('click',closeOnMobile);
    try{setCollapsed(localStorage.getItem(KEY)==='1')}catch(e){setCollapsed(false)}
    syncAppearance();renderToday();setNet(navigator.onLine===false?'offline':'online');
    var observer=new MutationObserver(syncAppearance);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-color-theme']});
    /* Données vivantes : révisions du jour, connexion réseau, compte. */
    window.addEventListener('storage',function(e){if(!e.key||e.key===STATS_KEY)renderToday()});
    window.addEventListener('focus',renderToday);
    document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')renderToday()});
    window.setInterval(function(){if(document.visibilityState==='visible')renderToday()},6000);
    window.addEventListener('online',function(){setNet('online')});window.addEventListener('offline',function(){setNet('offline')});
    window.addEventListener('aurore:network-online',function(){setNet('online')});window.addEventListener('aurore:network-offline',function(){setNet('offline')});
    window.addEventListener('aurore:auth-changed',function(e){updateAccount(e&&e.detail?e.detail.session:null)});
    (async function(){try{var auth=window.auroreAuth;if(window.auroreAuthReady)auth=await window.auroreAuthReady;if(auth&&typeof auth.getSession==='function')updateAccount(await auth.getSession())}catch(e){}})();
    function typing(t){return !!t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))}
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){setOpen(false);return}
      var k=String(e.key).toLowerCase();
      if(e.altKey&&e.ctrlKey&&k==='n'&&!e.repeat){e.preventDefault();location.href='creer-memoire.html';return}
      if(((e.ctrlKey||e.metaKey)&&k==='k'&&!e.repeat)||(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!typing(e.target))){e.preventDefault();focusSearch()}
    });
    try{if(sessionStorage.getItem('eneles:focus-memory-search')==='1'){sessionStorage.removeItem('eneles:focus-memory-search');var i=document.getElementById('enelesMemorySearchInput');if(i){i.scrollIntoView({behavior:'smooth',block:'center'});window.setTimeout(function(){i.focus()},250)}}}catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
