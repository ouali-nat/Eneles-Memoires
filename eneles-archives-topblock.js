(function(){
  'use strict';
  function init(){
    var bar=document.getElementById('enelesArchivesTopblock');
    if(!bar||bar.dataset.sharedReady==='1'||bar.dataset.ready==='1')return;
    bar.dataset.ready='1';
    var paletteSlot=document.getElementById('enelesTopblockPaletteSlot');
    var modeSlot=document.getElementById('enelesTopblockModeSlot');
    var palette=document.querySelector('.topbar .color-theme-wrap');
    if(palette&&paletteSlot){
      paletteSlot.appendChild(palette);
      var trigger=palette.querySelector('#colorThemeToggle');
      var panel=palette.querySelector('#colorThemePanel');
      if(trigger){
        var label=trigger.querySelector('.color-btn-label');
        if(label)label.remove();
        trigger.setAttribute('aria-label','Choisir une couleur');
        trigger.title='Palette de couleurs';
      }
      if(panel){
        panel.setAttribute('aria-label','Palette de couleurs');
        var head=panel.querySelector('.color-theme-head');
        if(head)head.remove();
      }
    }
    var choices=document.querySelector('.theme-mode-choices');
    if(choices&&modeSlot){
      modeSlot.appendChild(choices);
      choices.setAttribute('aria-label','Mode d’affichage');
      choices.querySelectorAll('button').forEach(function(button){
        var label=button.dataset.themeChoice==='light'?'Clair':button.dataset.themeChoice==='dark'?'Sombre':'Adaptatif';
        button.setAttribute('aria-label','Mode '+label.toLowerCase());
        button.title=label;
      });
    }
    var topInput=document.getElementById('enelesTopblockSearchInput');
    var heroInput=document.getElementById('enelesMemorySearchInput');
    var heroForm=document.getElementById('enelesMemorySearch');
    var topForm=document.getElementById('enelesTopblockSearch');
    if(topInput&&heroInput&&heroForm&&topForm){
      topInput.addEventListener('input',function(){
        heroInput.value=topInput.value;
        heroInput.dispatchEvent(new Event('input',{bubbles:true}));
      });
      heroInput.addEventListener('input',function(){
        if(topInput.value!==heroInput.value)topInput.value=heroInput.value;
      });
      topForm.addEventListener('submit',function(e){
        e.preventDefault();
        heroInput.value=topInput.value;
        heroForm.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
      });
    }
    var authButton=document.getElementById('enelesTopblockAuth');
    if(authButton){
      function syncTopblockAuth(session){
        var connected=!!(session&&session.user);
        var label=authButton.querySelector('span:last-child');
        if(label)label.textContent=connected?'Déconnexion':'Se connecter';
        authButton.setAttribute('aria-label',connected?'Se déconnecter du compte Eneles ID':'Se connecter avec Eneles ID');
      }
      authButton.addEventListener('click',function(){
        var account=document.getElementById('enelesSidebarAccount');
        if(account)account.click();
        else if(typeof window.auroreShowAccessGate==='function')window.auroreShowAccessGate();
      });
      window.addEventListener('aurore:auth-changed',function(e){syncTopblockAuth(e&&e.detail?e.detail.session:null)});
      (async function(){
        try{
          var auth=window.auroreAuth;
          if(window.auroreAuthReady)auth=await window.auroreAuthReady;
          if(auth&&typeof auth.getSession==='function')syncTopblockAuth(await auth.getSession());
          else syncTopblockAuth(null);
        }catch(_){syncTopblockAuth(null)}
      })();
    }
    var active=bar.querySelector('.eneles-topblock-nav .is-current');
    if(active)active.setAttribute('aria-current','page');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();