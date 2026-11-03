(function(){
  'use strict';
  function init(){
    var bar=document.getElementById('enelesArchivesTopblock');
    if(!bar||bar.dataset.ready==='1')return;
    bar.dataset.ready='1';
    var slot=document.getElementById('enelesTopblockPaletteSlot');
    var palette=document.querySelector('.topbar .color-theme-wrap');
    if(palette&&slot){
      slot.appendChild(palette);
      var trigger=palette.querySelector('#colorThemeToggle');
      var panel=palette.querySelector('#colorThemePanel');
      var modeChoices=document.querySelector('.theme-mode-choices');
      if(modeChoices&&panel&&!panel.contains(modeChoices)){
        panel.insertBefore(modeChoices,panel.firstChild);
        modeChoices.setAttribute('aria-label','Mode d’affichage');
      }
      if(trigger){trigger.setAttribute('aria-label','Choisir une couleur du site');trigger.title='Palette de couleurs';var label=trigger.querySelector('.color-btn-label');if(label)label.textContent='Couleurs';}
    }
    var topInput=document.getElementById('enelesTopblockSearchInput');
    var heroInput=document.getElementById('enelesMemorySearchInput');
    var heroForm=document.getElementById('enelesMemorySearch');
    var topForm=document.getElementById('enelesTopblockSearch');
    if(topInput&&heroInput&&heroForm&&topForm){
      topInput.addEventListener('input',function(){heroInput.value=topInput.value;heroInput.dispatchEvent(new Event('input',{bubbles:true}));});
      heroInput.addEventListener('input',function(){if(topInput.value!==heroInput.value)topInput.value=heroInput.value;});
      topForm.addEventListener('submit',function(e){e.preventDefault();heroInput.value=topInput.value;heroForm.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));});
    }
    var active=bar.querySelector('.eneles-topblock-nav .is-current');if(active)active.setAttribute('aria-current','page');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
