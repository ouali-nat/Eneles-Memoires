(function(){
  'use strict';
  function init(){
    const hero=document.querySelector('.eneles-memory-hero.hero');
    if(!hero||hero.dataset.enelesHeroMorphReady==='1')return;
    hero.dataset.enelesHeroMorphReady='1';
    hero.classList.add('aurore-hero-morph');
    function p(x,y){return Math.max(2,Math.min(98,x)).toFixed(2)+'% '+Math.max(2,Math.min(98,y)).toFixed(2)+'%'}
    function poly(sides,round,rotation){
      const r=47,rad=rotation*Math.PI/180,v=[];
      for(let i=0;i<sides;i++){const a=rad+2*Math.PI*i/sides;v.push({x:50+r*Math.cos(a),y:50+r*Math.sin(a)})}
      const n=Math.max(1,Math.round(24/sides)),pts=[];
      for(let i=0;i<sides;i++){
        const a=v[(i+sides-1)%sides],c=v[i],b=v[(i+1)%sides];
        const q={x:c.x+(a.x-c.x)*round,y:c.y+(a.y-c.y)*round},z={x:c.x+(b.x-c.x)*round,y:c.y+(b.y-c.y)*round};
        for(let j=0;j<n;j++){const t=j/n,m=1-t;pts.push(p(m*m*q.x+2*m*t*c.x+t*t*z.x,m*m*q.y+2*m*t*c.y+t*t*z.y))}
      }
      while(pts.length<24)pts.push(pts[pts.length-1]);return pts.slice(0,24).join(',');
    }
    function bubbles(lobes,baseR,amp,width,rotation){
      const pts=[];
      for(let i=0;i<24;i++){
        const theta=rotation+i*(360/24),rad=theta*Math.PI/180;let bump=0;
        for(let L=0;L<lobes;L++){const a=rotation+L*(360/lobes);let diff=((theta-a+540)%360)-180;bump+=Math.exp(-(diff*diff)/(2*width*width))}
        const r=baseR+amp*bump;pts.push(p(50+r*Math.cos(rad),50+r*Math.sin(rad)));
      }
      return pts.join(',');
    }
    const shapes=[
      {name:'circle',gen:()=>poly(24,0,-90)},{name:'triangle',gen:()=>poly(3,.24,-90)},
      {name:'square',gen:()=>poly(4,.22,-45)},{name:'cube',gen:()=>poly(4,.12,-45)},
      {name:'hexagon',gen:()=>poly(6,.18,-90)},{name:'octagon',gen:()=>poly(8,.15,-90)},
      {name:'dodecagon',gen:()=>poly(12,.11,-90)},{name:'polygon24',gen:()=>poly(24,0,-90)},
      {name:'drop',gen:()=>poly(3,.28,-90)},{name:'leaf',gen:()=>poly(4,.42,-18)},
      {name:'bubbles3',gen:()=>bubbles(3,30,17,26,-90)},{name:'bubbles5',gen:()=>bubbles(5,32,13,20,-90)},
      {name:'bubbles7',gen:()=>bubbles(7,34,10,15,0)}
    ];
    const motif=hero.querySelector('.hero-motif');
    if(motif&&!motif.querySelector('.hero-split-blob')){
      [1,2,3].forEach(n=>{const wrap=document.createElement('div');wrap.className='hero-split-blob';wrap.dataset.b=String(n);const core=document.createElement('div');core.className='hero-split-blob-core';wrap.appendChild(core);motif.appendChild(wrap)});
    }
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
    let index=0,cycles=0,timer=0,splitTimerA=0,splitTimerB=0;
    function apply(){const sh=shapes[index];hero.dataset.shape=sh.name;hero.style.setProperty('--hero-clip','polygon('+sh.gen()+')');index=(index+1)%shapes.length}
    function splitAndMerge(){
      if(reduce.matches||document.hidden||!motif)return;
      hero.classList.add('is-split');clearTimeout(splitTimerA);splitTimerA=setTimeout(()=>hero.classList.add('is-floating'),1000);
      clearTimeout(splitTimerB);splitTimerB=setTimeout(()=>{hero.classList.remove('is-floating','is-split')},3200);
    }
    function schedule(){
      clearTimeout(timer);if(reduce.matches||document.hidden)return;
      timer=setTimeout(()=>{apply();cycles++;if(cycles%4===0)splitAndMerge();schedule()},1300);
    }
    apply();index=0;cycles=0;schedule();
    document.addEventListener('visibilitychange',schedule);
    if(reduce.addEventListener)reduce.addEventListener('change',schedule);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
