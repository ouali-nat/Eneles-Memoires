(function(){
  'use strict';
  if(window.__enelesGlobalHeaderReady)return;
  window.__enelesGlobalHeaderReady=true;
  function mount(){
    if(!document.body||document.body.dataset.page==='home'||document.getElementById('enelesGlobalHeader'))return;
    var main=document.querySelector('main')||document.querySelector('#screen-aurore-ia .aurore-ia-main');
    if(!main)return;
    var header=document.createElement('section');
    header.id='enelesGlobalHeader';
    header.className='eneles-archives-topblock eneles-global-header';
    header.setAttribute('aria-label','En-tête permanent Eneles Mémoire');
    header.innerHTML=
      '<div class="eneles-topblock-head">'+
        '<a class="eneles-topblock-brand" href="index.html" aria-label="Eneles Mémoire, accueil">'+
          '<span class="eneles-topblock-mark"><img src="/assets/aurore-logo.png" alt="" width="48" height="48"></span>'+
          '<span class="eneles-topblock-brand-copy"><strong>Eneles Mémoire</strong></span>'+
        '</a>'+
        '<div class="eneles-global-header-actions">'+
          '<a class="eneles-add-content-btn" href="creer.html"><span aria-hidden="true">＋</span><span>Ajouter</span></a>'+
          '<button class="eneles-topblock-auth" id="enelesGlobalHeaderAuth" type="button"><span aria-hidden="true">●</span><span>Compte</span></button>'+
        '</div>'+
      '</div>'+
      '<form class="eneles-topblock-search" id="enelesGlobalHeaderSearch" role="search">'+
        '<span aria-hidden="true" class="eneles-topblock-search-icon"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></span>'+
        '<input id="enelesGlobalHeaderSearchInput" type="search" autocomplete="off" placeholder="Rechercher dans ma bibliothèque…" aria-label="Rechercher dans ma bibliothèque">'+
        '<button type="submit" aria-label="Rechercher"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg></button>'+
      '</form>'+
      '<div class="eneles-topblock-tools"><div class="eneles-global-header-appearance" id="enelesGlobalHeaderAppearance"></div></div>';
    main.parentNode.insertBefore(header,main);
    var appearance=header.querySelector('#enelesGlobalHeaderAppearance');
    var topbar=document.querySelector('.topbar');
    var theme=topbar&&topbar.querySelector('#themeToggle');
    var palette=topbar&&topbar.querySelector('.color-theme-wrap');
    if(theme)appearance.appendChild(theme);
    if(palette)appearance.appendChild(palette);
    var search=header.querySelector('#enelesGlobalHeaderSearch');
    search.addEventListener('submit',function(e){
      e.preventDefault();
      var value=header.querySelector('#enelesGlobalHeaderSearchInput').value.trim();
      var url='mes-memoires.html'+(value?'?q='+encodeURIComponent(value):'');
      window.location.href=url;
    });
    var account=header.querySelector('#enelesGlobalHeaderAuth');
    function sync(session){
      var connected=!!(session&&session.user);
      account.querySelector('span:last-child').textContent=connected?'Mon compte':'Connexion';
      account.setAttribute('aria-label',connected?'Ouvrir les options du compte':'Se connecter avec Eneles ID');
    }
    account.addEventListener('click',function(){
      var side=document.getElementById('enelesSidebarAccount');
      if(side){side.click();return}
      var login=document.getElementById('appMenuSignIn');
      if(login){login.click();return}
      var assistantLogin=document.getElementById('auroreAssistantLogin');
      if(assistantLogin){assistantLogin.click();return}
      if(typeof window.auroreShowAccessGate==='function')window.auroreShowAccessGate();
    });
    window.addEventListener('aurore:auth-changed',function(e){sync(e&&e.detail?e.detail.session:null)});
    (async function(){
      try{
        var auth=window.auroreAuth;
        if(window.auroreAuthReady)auth=await window.auroreAuthReady;
        if(auth&&auth.getSession){var result=await auth.getSession();sync(result&&result.data?result.data.session:result&&result.session?result.session:null)}
        else sync(null);
      }catch(_){sync(null)}
    })();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
