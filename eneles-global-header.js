(function(){
  'use strict';
  if(window.__enelesGlobalHeaderReady)return;
  window.__enelesGlobalHeaderReady=true;

  function mount(){
    var topbar=document.querySelector('body>.topbar');
    if(!topbar||topbar.dataset.enelesUnifiedHeader==='true')return;
    var right=topbar.querySelector('.header-right');
    if(!right)return;
    topbar.dataset.enelesUnifiedHeader='true';
    topbar.classList.add('eneles-unified-topbar');

    // Remove any stale injected header left by the previous implementation.
    var duplicate=document.getElementById('enelesGlobalHeader');
    if(duplicate)duplicate.remove();

    var actions=document.createElement('div');
    actions.className='eneles-unified-actions';
    actions.innerHTML=
      '<a class="eneles-unified-add" href="creer.html" aria-label="Ajouter un contenu"><span aria-hidden="true">＋</span><span>Ajouter</span></a>'+
      '<button class="eneles-unified-account" id="enelesUnifiedAccount" type="button"><span class="eneles-account-dot" aria-hidden="true"></span><span class="eneles-account-label">Compte</span></button>';
    var appearance=right.querySelector('.appearance');
    right.insertBefore(actions,appearance||null);

    var account=actions.querySelector('#enelesUnifiedAccount');
    function sync(session){
      var user=session&&session.user;
      var label='Compte';
      if(user){
        var meta=user.user_metadata||{};
        label=meta.full_name||meta.name||meta.preferred_username||
          (user.email?user.email.split('@')[0]:'Mon compte');
      }
      var node=account.querySelector('.eneles-account-label');
      node.textContent=label.length>13?label.slice(0,12)+'…':label;
      account.setAttribute('aria-label',user?'Ouvrir le compte '+label:'Se connecter');
      account.dataset.connected=user?'true':'false';
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
    window.addEventListener('aurore:auth-changed',function(e){
      sync(e&&e.detail?e.detail.session:null);
    });
    (async function(){
      try{
        var auth=window.auroreAuth;
        if(window.auroreAuthReady)auth=await window.auroreAuthReady;
        if(auth&&auth.getSession){
          var result=await auth.getSession();
          sync(result&&result.data?result.data.session:result&&result.session?result.session:null);
        }
      }catch(_){}
    })();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
