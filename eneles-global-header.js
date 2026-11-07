(function(){
  'use strict';
  if(window.__enelesGlobalHeaderReady)return;
  window.__enelesGlobalHeaderReady=true;

  function sessionFrom(value){
    if(!value)return null;
    if(value.data&&value.data.session)return value.data.session;
    if(value.session)return value.session;
    if(value.user)return value;
    return null;
  }

  function buildMarkup(){
    var bar=document.createElement('section');
    bar.id='enelesArchivesTopblock';
    bar.className='eneles-archives-topblock eneles-shared-site-header';
    bar.setAttribute('aria-label','En-tête permanent Eneles Mémoire');
    bar.innerHTML=
      '<div class="eneles-topblock-head">'+
        '<a class="eneles-topblock-brand" href="index.html" aria-label="Eneles Mémoire, accueil">'+
          '<span class="eneles-topblock-mark"><img src="/assets/aurore-logo.png" alt="" width="48" height="48"></span>'+
          '<span class="eneles-topblock-brand-copy"><strong>Eneles Mémoire</strong><small>Votre espace de mémorisation</small></span>'+
        '</a>'+
        '<div class="eneles-topblock-context-slot" id="enelesTopblockContextSlot"></div>'+
      '</div>'+
      '<button class="eneles-topblock-auth" id="enelesTopblockAuth" type="button">'+
        '<span class="eneles-topblock-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span><span class="eneles-topblock-auth-copy"><strong class="eneles-topblock-auth-name">Connexion</strong><small class="eneles-topblock-auth-email">Eneles ID</small></span>'+
      '</button>'+
      '<a class="eneles-add-content-btn" href="creer.html" aria-label="Ajouter du contenu">'+
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg><span>Ajouter</span>'+
      '</a>'+
      '<form class="eneles-topblock-search" id="enelesTopblockSearch" role="search">'+
        '<span class="eneles-topblock-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></span>'+
        '<input id="enelesTopblockSearchInput" type="search" autocomplete="off" placeholder="Rechercher dans ma bibliothèque…" aria-label="Rechercher dans ma bibliothèque">'+
        '<button type="submit" aria-label="Rechercher"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></button>'+
      '</form>'+
      '<div class="eneles-topblock-tools">'+
        '<div class="eneles-topblock-mode-slot" id="enelesTopblockModeSlot" aria-label="Mode d’affichage"></div>'+
        '<div class="eneles-topblock-palette-slot" id="enelesTopblockPaletteSlot" aria-label="Palette de couleurs"></div>'+
      '</div>';
    return bar;
  }

  function placeHeader(bar){
    var main=document.querySelector('main');
    if(main&&main.parentNode){main.parentNode.insertBefore(bar,main);return}
    var app=document.querySelector('#screen-aurore-ia .aurore-ia-app');
    if(app){app.insertBefore(bar,app.firstChild);return}
    document.body.insertBefore(bar,document.body.firstChild);
  }

  function mount(){
    if(!document.body)return;
    var bars=document.querySelectorAll('#enelesArchivesTopblock');
    var bar=bars.length?bars[0]:null;
    if(!bar){
      bar=buildMarkup();
      placeHeader(bar);
    }
    bars.forEach(function(node){if(node!==bar)node.remove()});
    bar.classList.add('eneles-shared-site-header');
    bar.dataset.sharedReady='1';
    bar.dataset.ready='1';

    // Pull appearance controls out of the hidden legacy header source before deleting it.
    var contextSlot=bar.querySelector('#enelesTopblockContextSlot');
    if(!contextSlot){
      contextSlot=document.createElement('div');
      contextSlot.className='eneles-topblock-context-slot';
      contextSlot.id='enelesTopblockContextSlot';
      var head=bar.querySelector('.eneles-topblock-head');
      if(head)head.appendChild(contextSlot);
    }
    var assistantControls=document.querySelector('.eneles-assistant-header-controls');
    if(assistantControls&&contextSlot&&assistantControls.parentNode!==contextSlot)contextSlot.appendChild(assistantControls);

    var mode=bar.querySelector('.theme-mode-choices')||document.querySelector('.eneles-header-control-source .theme-mode-choices');
    var palette=bar.querySelector('.color-theme-wrap')||document.querySelector('.eneles-header-control-source .color-theme-wrap');
    var modeSlot=bar.querySelector('#enelesTopblockModeSlot');
    var paletteSlot=bar.querySelector('#enelesTopblockPaletteSlot');
    if(mode&&modeSlot&&mode.parentNode!==modeSlot)modeSlot.appendChild(mode);
    if(palette&&paletteSlot&&palette.parentNode!==paletteSlot)paletteSlot.appendChild(palette);

    // Keep the appearance controls alive if a page had not yet built the mode group.
    var themeButton=document.querySelector('.eneles-header-control-source #themeToggle');
    if(!mode&&themeButton&&modeSlot)modeSlot.appendChild(themeButton);

    // One shared header only: transfer controls, then remove every legacy header.
    function removeLegacyHeaders(){
      var selector='.topbar,.aurore-ia-topbar,.eneles-organic-site-header,.eneles-unified-topbar,#enelesGlobalHeader,[data-eneles-legacy-header]';
      document.querySelectorAll(selector).forEach(function(node){
        if(node!==bar&&!node.contains(bar))node.remove();
      });
      document.querySelectorAll('.eneles-header-control-source').forEach(function(node){
        if(node!==bar&&!node.contains(bar))node.remove();
      });
      document.querySelectorAll('#enelesArchivesTopblock').forEach(function(node){
        if(node!==bar)node.remove();
      });
    }
    removeLegacyHeaders();
    if(!window.__enelesLegacyHeaderObserver&&window.MutationObserver){
      window.__enelesLegacyHeaderObserver=new MutationObserver(function(records){
        var added=false;
        records.forEach(function(record){
          record.addedNodes&&record.addedNodes.forEach(function(node){
            if(node.nodeType===1&&(node.matches('.topbar,.aurore-ia-topbar,.eneles-organic-site-header,.eneles-unified-topbar,#enelesGlobalHeader,[data-eneles-legacy-header]')||node.querySelector('.topbar,.aurore-ia-topbar,.eneles-organic-site-header,.eneles-unified-topbar,#enelesGlobalHeader,[data-eneles-legacy-header]')))added=true;
          });
        });
        if(added)removeLegacyHeaders();
      });
      window.__enelesLegacyHeaderObserver.observe(document.body,{childList:true,subtree:true});
    }

    var authButton=bar.querySelector('#enelesTopblockAuth');
    if(authButton&&!authButton.querySelector('.eneles-topblock-auth-copy')){
      authButton.innerHTML='<span class="eneles-topblock-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span><span class="eneles-topblock-auth-copy"><strong class="eneles-topblock-auth-name">Connexion</strong><small class="eneles-topblock-auth-email">Accès à votre espace</small></span>';
    }
    var label=bar.querySelector('#enelesTopblockAuth .eneles-topblock-auth-name');
    var emailLabel=bar.querySelector('#enelesTopblockAuth .eneles-topblock-auth-email');
    function syncAuth(value){
      var session=sessionFrom(value),user=session&&session.user;
      var text='Connexion';
      if(user){
        var meta=user.user_metadata||{};
        text=meta.full_name||meta.name||meta.preferred_username||
          (user.email?user.email.split('@')[0]:'Mon compte');
      }
      if(label)label.textContent=text.length>18?text.slice(0,17)+'…':text;
      if(emailLabel)emailLabel.textContent=user?(user.email||'Compte connecté'):'Accès à votre espace';
      if(emailLabel)emailLabel.title=user?(user.email||''):'Connexion Eneles ID';
      if(authButton)authButton.title=user?(user.email||text):'Connexion Eneles ID';
      if(authButton)authButton.setAttribute('aria-label',user?'Ouvrir le compte '+text+(user.email?' · '+user.email:''):'Se connecter avec Eneles ID');
      if(authButton)authButton.dataset.connected=user?'true':'false';
    }
    if(authButton&&!authButton.dataset.bound){
      authButton.dataset.bound='1';
      authButton.addEventListener('click',function(){
        var account=document.getElementById('enelesSidebarAccount');
        if(account){account.click();return}
        var signIn=document.getElementById('appMenuSignIn');
        if(signIn){signIn.click();return}
        var assistantLogin=document.getElementById('auroreAssistantLogin');
        if(assistantLogin){assistantLogin.click();return}
        if(typeof window.auroreShowAccessGate==='function')window.auroreShowAccessGate();
      });
      window.addEventListener('aurore:auth-changed',function(e){syncAuth(e&&e.detail?e.detail.session||e.detail:e)});
      (async function(){
        try{
          var auth=window.auroreAuth;
          if(window.auroreAuthReady)auth=await window.auroreAuthReady;
          if(auth&&typeof auth.getSession==='function')syncAuth(await auth.getSession());
        }catch(_){}
      })();
    }

    var form=bar.querySelector('#enelesTopblockSearch');
    var topInput=bar.querySelector('#enelesTopblockSearchInput');
    var heroInput=document.getElementById('enelesMemorySearchInput');
    var heroForm=document.getElementById('enelesMemorySearch');
    if(form&&!form.dataset.bound){
      form.dataset.bound='1';
      if(heroInput){
        topInput.addEventListener('input',function(){
          heroInput.value=topInput.value;
          heroInput.dispatchEvent(new Event('input',{bubbles:true}));
        });
        heroInput.addEventListener('input',function(){
          if(topInput.value!==heroInput.value)topInput.value=heroInput.value;
        });
      }
      form.addEventListener('submit',function(e){
        e.preventDefault();
        var query=(topInput&&topInput.value||'').trim();
        if(heroInput&&heroForm){
          heroInput.value=query;
          heroForm.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
        }else{
          window.location.href='mes-memoires.html'+(query?'?q='+encodeURIComponent(query):'');
        }
      });
    }
    if(!bar.querySelector('.eneles-topblock-nav')){
      // The side drawer is the single navigation menu; do not recreate the old top navigation.
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
