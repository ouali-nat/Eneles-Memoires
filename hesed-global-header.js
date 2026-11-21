(function(){
  'use strict';
  if(window.__hesedGlobalHeaderReady)return;
  window.__hesedGlobalHeaderReady=true;

  function sessionFrom(value){
    if(!value)return null;
    if(value.data&&value.data.session)return value.data.session;
    if(value.session)return value.session;
    if(value.user)return value;
    return null;
  }

  function buildMarkup(){
    var bar=document.createElement('section');
    bar.id='hesedArchivesTopblock';
    bar.className='hesed-archives-topblock hesed-shared-site-header';
    bar.setAttribute('aria-label','En-tête permanent Hesed Mémoire');
    bar.innerHTML=
      '<div class="hesed-topblock-head">'+
        '<a class="hesed-topblock-brand" href="index.html" aria-label="Hesed Mémoire, accueil">'+
          '<span class="hesed-topblock-mark"><img src="/assets/aurore-logo.png" alt="" width="48" height="48"></span>'+
          '<span class="hesed-topblock-brand-copy"><strong>Hesed Mémoire</strong><small>Votre espace de mémorisation</small></span>'+
        '</a>'+
        '<div class="hesed-topblock-context-slot" id="hesedTopblockContextSlot"></div>'+
      '</div>'+
      '<button class="hesed-topblock-auth" id="hesedTopblockAuth" type="button">'+
        '<span class="hesed-topblock-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span><span class="hesed-topblock-auth-copy"><strong class="hesed-topblock-auth-name">Connexion</strong><small class="hesed-topblock-auth-email">Hesed ID</small></span>'+
      '</button>'+
      '<a class="hesed-add-content-btn" href="creer.html" aria-label="Ajouter du contenu">'+
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg><span>Ajouter</span>'+
      '</a>'+
      '<form class="hesed-topblock-search" id="hesedTopblockSearch" role="search">'+
        '<span class="hesed-topblock-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></span>'+
        '<input id="hesedTopblockSearchInput" type="search" autocomplete="off" placeholder="Rechercher dans ma bibliothèque…" aria-label="Rechercher dans ma bibliothèque">'+
        '<button type="submit" aria-label="Rechercher"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></button>'+
      '</form>'+
      '<div class="hesed-topblock-tools">'+
        '<div class="hesed-topblock-mode-slot" id="hesedTopblockModeSlot" aria-label="Mode d’affichage"></div>'+
        '<div class="hesed-topblock-palette-slot" id="hesedTopblockPaletteSlot" aria-label="Palette de couleurs"></div>'+
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
    var bars=document.querySelectorAll('#hesedArchivesTopblock');
    var bar=bars.length?bars[0]:null;
    if(!bar){
      bar=buildMarkup();
      placeHeader(bar);
    }
    bars.forEach(function(node){if(node!==bar)node.remove()});
    bar.classList.add('hesed-shared-site-header');
    bar.dataset.sharedReady='1';
    bar.dataset.ready='1';

    // Pull appearance controls out of the hidden legacy header source before deleting it.
    var contextSlot=bar.querySelector('#hesedTopblockContextSlot');
    if(!contextSlot){
      contextSlot=document.createElement('div');
      contextSlot.className='hesed-topblock-context-slot';
      contextSlot.id='hesedTopblockContextSlot';
      var head=bar.querySelector('.hesed-topblock-head');
      if(head)head.appendChild(contextSlot);
    }
    var assistantControls=document.querySelector('.hesed-assistant-header-controls');
    if(assistantControls&&contextSlot&&assistantControls.parentNode!==contextSlot)contextSlot.appendChild(assistantControls);

    var mode=bar.querySelector('.theme-mode-choices')||document.querySelector('.hesed-header-control-source .theme-mode-choices');
    var palette=bar.querySelector('.color-theme-wrap')||document.querySelector('.hesed-header-control-source .color-theme-wrap');
    var modeSlot=bar.querySelector('#hesedTopblockModeSlot');
    var paletteSlot=bar.querySelector('#hesedTopblockPaletteSlot');
    if(mode&&modeSlot&&mode.parentNode!==modeSlot)modeSlot.appendChild(mode);
    if(palette&&paletteSlot&&palette.parentNode!==paletteSlot)paletteSlot.appendChild(palette);

    // Keep the appearance controls alive if a page had not yet built the mode group.
    var themeButton=document.querySelector('.hesed-header-control-source #themeToggle');
    if(!mode&&themeButton&&modeSlot)modeSlot.appendChild(themeButton);

    // One shared header only: transfer controls, then remove every legacy header.
    function removeLegacyHeaders(){
      var selector='.topbar,.aurore-ia-topbar,.hesed-organic-site-header,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]';
      document.querySelectorAll(selector).forEach(function(node){
        if(node!==bar&&!node.contains(bar))node.remove();
      });
      document.querySelectorAll('.hesed-header-control-source').forEach(function(node){
        if(node!==bar&&!node.contains(bar))node.remove();
      });
      document.querySelectorAll('#hesedArchivesTopblock').forEach(function(node){
        if(node!==bar)node.remove();
      });
    }
    removeLegacyHeaders();
    if(!window.__hesedLegacyHeaderObserver&&window.MutationObserver){
      window.__hesedLegacyHeaderObserver=new MutationObserver(function(records){
        var added=false;
        records.forEach(function(record){
          record.addedNodes&&record.addedNodes.forEach(function(node){
            if(node.nodeType===1&&(node.matches('.topbar,.aurore-ia-topbar,.hesed-organic-site-header,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]')||node.querySelector('.topbar,.aurore-ia-topbar,.hesed-organic-site-header,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]')))added=true;
          });
        });
        if(added)removeLegacyHeaders();
      });
      window.__hesedLegacyHeaderObserver.observe(document.body,{childList:true,subtree:true});
    }

    var authButton=bar.querySelector('#hesedTopblockAuth');
    if(authButton&&!authButton.querySelector('.hesed-topblock-auth-copy')){
      authButton.innerHTML='<span class="hesed-topblock-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span><span class="hesed-topblock-auth-copy"><strong class="hesed-topblock-auth-name">Connexion</strong><small class="hesed-topblock-auth-email">Accès à votre espace</small></span>';
    }
    var label=bar.querySelector('#hesedTopblockAuth .hesed-topblock-auth-name');
    var emailLabel=bar.querySelector('#hesedTopblockAuth .hesed-topblock-auth-email');
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
      if(emailLabel)emailLabel.title=user?(user.email||''):'Connexion Hesed ID';
      if(authButton)authButton.title=user?(user.email||text):'Connexion Hesed ID';
      if(authButton)authButton.setAttribute('aria-label',user?'Ouvrir le compte '+text+(user.email?' · '+user.email:''):'Se connecter avec Hesed ID');
      if(authButton)authButton.dataset.connected=user?'true':'false';
    }
    if(authButton&&!authButton.dataset.bound){
      authButton.dataset.bound='1';
      authButton.addEventListener('click',function(){
        var account=document.getElementById('hesedSidebarAccount');
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

    var form=bar.querySelector('#hesedTopblockSearch');
    var topInput=bar.querySelector('#hesedTopblockSearchInput');
    var heroInput=document.getElementById('hesedMemorySearchInput');
    var heroForm=document.getElementById('hesedMemorySearch');
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
    if(!bar.querySelector('.hesed-topblock-nav')){
      // The side drawer is the single navigation menu; do not recreate the old top navigation.
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
