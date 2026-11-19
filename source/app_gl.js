(function(){
const box=document.getElementById('view');const cv=document.createElement('canvas');cv.style.cssText='display:block;width:100%;height:100%;touch-action:none';box.appendChild(cv);
const R=buildRoom(THREE);const sc=R.scene;window.__R=R;const ambiUp=makeAmbi(R,THREE);
const cam=new THREE.PerspectiveCamera(52,1,4,3000);
let RD=null;function setup(){const pr=Math.min(window.devicePixelRatio||1,1.6)*(window.QSCALE||1);const w=Math.max(8,Math.round(box.clientWidth*pr/8)*8),h=Math.max(8,Math.round(box.clientHeight*pr/8)*8);if(RD&&cv.width===w&&cv.height===h)return;cv.width=w;cv.height=h;RD=makeRenderer(cv);lastSun='';cam.aspect=w/h}
const hex=h=>[((h>>16)&255)/255,((h>>8)&255)/255,(h&255)/255];
const mix=(a,b,t)=>a+(b-a)*t,mixc=(a,b,t)=>[mix(a[0],b[0],t),mix(a[1],b[1],t),mix(a[2],b[2],t)];
const cl=(x,a,b)=>Math.max(a,Math.min(b,x)),ss=(a,b,x)=>{const t=cl((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function hsl(h,s,l){const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return[f(0),f(8),f(4)]}
const LN=['pend','arc','ns','fado','desk','shelf','bed','head','tv','tvs','mon','pc','sneak','spot','candle','candle2','candle3'];
const GN=['bedLed','headLed','tvLed','monGlow','pc','shelf','sneak'];
function st(o){const s={sunI:0,sunC:hex(0xfff0dc),elev:40,az:-17,ambI:.12,skyC:hex(0x8a96b8),gndC:hex(0x3a3040),sky:hex(0x26314f),expo:1.25,
L:{},G:{},em:{pend:.05,arc:.05,ns:0,fado:.05,dl:0},tv:0,mon:0,shaft:0,dust:0,pcIn:hex(0),night:1,moon:.8,cand:0,fadoC:hex(0xffe2b0),ambi:0};LN.forEach(k=>s.L[k]=[hex(0xffd8a0),0]);GN.forEach(k=>s.G[k]=hex(0));
for(const k in o){if(k=='L'||k=='G'||k=='em')Object.assign(s[k],o[k]);else s[k]=o[k]}return s}
const amber=hex(0xff8a2a),warm=hex(0xffcf94);
const DAY=st({night:0,moon:0,pcIn:mixc([0,0,0],hex(0x8a3dff),.7),sunI:2.0,sunC:hex(0xfff1dc),elev:38,ambI:.62,skyC:hex(0xfff7ec),gndC:hex(0xa58b70),sky:hex(0xffffff),expo:1.05,mon:.95,shaft:.07,dust:1,
 L:{mon:[hex(0x8f7dff),.25],spot:[hex(0xfff3dc),.15]},G:{monGlow:mixc([0,0,0],hex(0x6a5cff),.25)}});
const GOLD=st({night:.12,moon:0,sunI:1.35,sunC:hex(0xffa860),elev:16,az:-30,ambI:.32,skyC:hex(0xffd0a0),gndC:hex(0x8a6448),sky:hex(0xffb488),expo:1.0,mon:.9,shaft:.07,dust:.9,pcIn:mixc([0,0,0],hex(0x8a3dff),.7),
 L:{arc:[warm,.5],mon:[hex(0x8f7dff),.3]},em:{arc:.5},G:{monGlow:[.1,.08,.25]}});
const EVE=st({sunI:0,ambI:.12,sky:hex(0x1e2848),expo:1.0,tv:.95,mon:.25,pcIn:mixc([0,0,0],hex(0xff8a2a),.5),
 L:{pend:[hex(0xffe1b8),.3],arc:[warm,.8],ns:[warm,.6],fado:[hex(0xffd9a8),.55],desk:[hex(0xfff0d8),.35],bed:[amber,.85],head:[amber,.6],tv:[amber,.7],tvs:[hex(0xffb080),.35],sneak:[hex(0xfff0d8),.35],spot:[hex(0xfff3dc),.35],mon:[hex(0x8f7dff),.12]},
 em:{pend:.5,arc:1.2,ns:.8,fado:.9,dl:1},G:{bedLed:mixc([0,0,0],amber,.45),headLed:mixc([0,0,0],amber,.28),tvLed:mixc([0,0,0],amber,.32),sneak:[.25,.22,.18],shelf:[0,0,0]}});
const vio=hex(0x8a3dff),cya=hex(0x22d8ff),mag=hex(0xff2fa8);
const GAME=st({sunI:0,ambI:.08,skyC:hex(0x6a60a8),sky:hex(0x141a36),expo:1.1,tv:.25,mon:1,
 L:{arc:[vio,.6],ns:[cya,.5],bed:[vio,1.3],head:[cya,1.0],tv:[cya,1.0],mon:[hex(0xa07cff),.9],pc:[mag,1.2],shelf:[hex(0xdfe8ff),.3],sneak:[cya,.6],spot:[vio,.4]},
 em:{arc:.6,ns:.5},G:{bedLed:mixc([0,0,0],vio,.75),headLed:mixc([0,0,0],cya,.45),tvLed:mixc([0,0,0],cya,.5),monGlow:mixc([0,0,0],hex(0x8a5cff),.3),pc:mixc([0,0,0],mag,.5),shelf:[.07,.08,.1],sneak:mixc([0,0,0],cya,.35)},pcIn:mag});
function FETE(t){const s=st(GAME);const h=t*.22;const c=k=>hsl((h+k)%1,1,.55);
 s.L.bed=[c(0),1.4];s.L.head=[c(.25),1.1];s.L.tv=[c(.5),1.1];s.L.arc=[c(.75),.9];s.L.ns=[c(.1),.7];s.L.pc=[c(.6),1.2];s.L.sneak=[c(.4),.7];s.L.spot=[c(.85),.5];s.L.pend=[c(.3),.3];
 s.G.bedLed=mixc([0,0,0],c(0),.8);s.G.headLed=mixc([0,0,0],c(.25),.5);s.G.tvLed=mixc([0,0,0],c(.5),.55);s.G.pc=mixc([0,0,0],c(.6),.6);s.G.sneak=mixc([0,0,0],c(.4),.4);s.pcIn=c(.6);s.em.arc=.9;s.tv=.6;return s}
const ora=hex(0xffb877),ora2=hex(0xffc28a);
const COSY=st({night:1,moon:1,cand:1,sunI:.42,sunC:hex(0x9fb2ff),elev:24,az:6,ambI:.06,skyC:hex(0x55669e),gndC:hex(0x3a2216),sky:hex(0x262c48),expo:1.05,tv:0,mon:.35,shaft:.035,dust:0,pcIn:mixc([0,0,0],ora,.25),fadoC:hex(0xff9a45),
 L:{arc:[ora,.85],ns:[ora,.7],fado:[ora2,.8],desk:[hex(0xffd2a0),.45],shelf:[hex(0xffd2a0),.3],bed:[hex(0xff7a2a),.6],head:[hex(0xff8a3a),.4],tv:[hex(0xff8a3a),.3],mon:[hex(0xa8b4ff),.12],pc:[ora,.25],sneak:[hex(0xffb070),.3],spot:[hex(0xffa860),.55],candle:[hex(0xff9a40),.55],candle2:[hex(0xff9a40),.5],candle3:[hex(0xff9a40),.45]},
 em:{pend:.03,arc:1.5,ns:1.1,fado:1.25,dl:1},G:{bedLed:mixc([0,0,0],hex(0xff6a1a),.42),headLed:mixc([0,0,0],hex(0xff7a2a),.22),tvLed:mixc([0,0,0],hex(0xff7a2a),.18),shelf:[.14,.07,.02],sneak:[.16,.09,.04],pc:mixc([0,0,0],ora,.15)}});
const CINE=st({night:1,moon:.7,cand:.5,sunI:.18,sunC:hex(0x9fb2ff),elev:24,az:6,ambI:.035,skyC:hex(0x55669e),gndC:hex(0x2a1a14),sky:hex(0x1c2238),expo:1.0,tv:.8,mon:0,ambi:1,
 L:{arc:[hex(0xffb877),.12],candle:[hex(0xff9a40),.3],candle2:[hex(0xff9a40),.25],candle3:[hex(0xff9a40),.2]},em:{arc:.3,pend:.02,fado:.05}});
function blend(a,b,t){if(t<=0)return a;if(t>=1)return b;const s=st({});for(const k in a){if(k=='L'){for(const n of LN)s.L[n]=[mixc(a.L[n][0],b.L[n][0],t),mix(a.L[n][1],b.L[n][1],t)]}else if(k=='G'){for(const n of GN)s.G[n]=mixc(a.G[n],b.G[n],t)}else if(k=='em'){for(const n in a.em)s.em[n]=mix(a.em[n],b.em[n],t)}else if(Array.isArray(a[k]))s[k]=mixc(a[k],b[k],t);else s[k]=mix(a[k],b[k],t)}return s}
const SCHED=[[0,'DAY'],[29,'DAY'],[33,'GOLD'],[36.5,'EVE'],[39,'EVE'],[40.5,'GAME'],[43.5,'GAME'],[44.6,'FETE'],[47.6,'FETE'],[49.2,'EVE']];
const getS=(n,t)=>n=='DAY'?DAY:n=='GOLD'?GOLD:n=='EVE'?EVE:n=='GAME'?GAME:FETE(t);
function stateAt(t){for(let i=0;i<SCHED.length-1;i++){const[a,na]=SCHED[i],[b,nb]=SCHED[i+1];if(t<b)return blend(getS(na,t),getS(nb,t),ss(0,1,(t-a)/(b-a)))}return getS(SCHED[SCHED.length-1][1],t)}

const setC=(c,v)=>{c.r=v[0];c.g=v[1];c.b=v[2]};
function apply(s,t){const e=s.elev*Math.PI/180,a=s.az*Math.PI/180;const sd=[Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)];
R.sun.position.set(180+sd[0]*600,90+sd[1]*600,180+sd[2]*600);R.sun.target.position.set(180,90,180);R.sun.intensity=s.sunI;setC(R.sun.color,s.sunC);
const key=sd.map(v=>v.toFixed(3)).join();if(key!==lastSun){RD.updateShadows(sc,sd);lastSun=key}
R.amb.intensity=s.ambI;setC(R.amb.color,s.skyC);setC(R.amb.groundColor,s.gndC);
setC(R.sky.material.color,s.sky);const so=mixc(s.sky,[1,1,1],.0);R.out.forEach(o=>{const c=hex(o.userData.c0||(o.userData.c0=o.material.color.getHex()));setC(o.material.color,[c[0]*s.sky[0],c[1]*s.sky[1],c[2]*s.sky[2]])});
[R.tree,R.tree2].forEach(o=>{const c=hex(o.userData.c0||(o.userData.c0=o.material.color.getHex()));setC(o.material.color,[c[0]*s.sky[0],c[1]*s.sky[1],c[2]*s.sky[2]])});
LN.forEach(n=>{setC(R.L[n].color,s.L[n][0]);R.L[n].intensity=s.L[n][1]});
GN.forEach(n=>R.G[n].forEach(m=>setC(m.material.color,s.G[n])));
R.pend.emissiveIntensity=s.em.pend;R.arcBulb.emissiveIntensity=s.em.arc;R.nsShade.emissiveIntensity=s.em.ns;R.fado.emissiveIntensity=s.em.fado;R.dlBulb.emissiveIntensity=s.em.dl;
setC(R.arcBulb.emissive,s.L.arc[1]>0?mixc(s.L.arc[0],[1,1,1],.35):hex(0xffd9a0));setC(R.nsShade.emissive,mixc(s.L.ns[0],[1,1,1],.3));
setC(R.screens.tv.material.color,[s.tv,s.tv,s.tv]);setC(R.screens.mon.material.color,[s.mon,s.mon,s.mon]);
R.shafts.forEach((m,i)=>{m.material.opacity=1;setC(m.material.color,mixc([0,0,0],s.sunC,s.shaft*(1+.3*Math.sin(t*.7+i))));m.rotation.x=0.68+(38-s.elev)*.012});
R.dust.forEach(d=>{const k=d.userData.seed;if(d.userData.b==null)d.userData.b=[d.position.x,d.position.y,d.position.z];const b=d.userData.b;d.position.set(b[0]+Math.sin(t*.3+k)*6,b[1]+((t*2+k*7)%40)-20,b[2]+Math.cos(t*.25+k)*6);d.visible=s.dust>.02;
 const inB=ss(0,15,b[1]-20)*s.dust;setC(d.material.color,[inB,inB*.93,inB*.8])});

R.tree.visible=R.tree2.visible=s.night<.5;R.skyN.material.opacity=s.night;R.skyN.visible=s.night>.01;R.sky.visible=s.night<.99;
R.cityLit.forEach(m=>setC(m.material.color,[s.night*.95,s.night*.9,s.night*.85]));
setC(R.moon.material.color,[s.moon,s.moon,s.moon]);R.moon.visible=R.moonHalo.visible=s.moon>.01;setC(R.moonHalo.material.color,[.28*s.moon,.32*s.moon,.45*s.moon]);
const fl=.82+.1*Math.sin(t*9.1)+.08*Math.sin(t*23.7+1.3)+.05*Math.sin(t*5.3);['candle','candle2','candle3'].forEach((n,i)=>R.L[n].intensity*=fl*(1+.05*Math.sin(t*13+i*2)));
R.flames.forEach((f,i)=>{const k=s.cand*(f.userData.bb?.55:1.4)*(fl+.06*Math.sin(t*17+i));setC(f.material.color,[k,k*.62,k*.25])});
setC(R.fado.emissive,s.fadoC);
R.platter.rotation.y=t*3.49;R.label.rotation.y=t*3.49;
const pc=mixc(s.pcIn,[0,0,0],0);R.pcFans.forEach((f,i)=>setC(f.material.color,mixc([0,0,0],pc,1.3+.3*Math.sin(t*4+i))));setC(R.pcIn.material.color,mixc([0,0,0],pc,.5));
return s}

let lastSun='';
// ---------- camera path ----------
const K=[
[0,[305,160,-100],[300,135,120],50],
[3.5,[304,158,-18],[220,110,210],52],
[7,[288,154,58],[110,80,268],56],
[10.5,[215,142,118],[12,126,268],52],
[14,[205,118,205],[350,48,259],50],
[17.5,[232,138,232],[354,130,259],54],
[21,[228,132,152],[350,72,138],50],
[24.5,[175,142,175],[78,98,30],52],
[28,[106,118,128],[80,102,20],46],
[31,[172,78,165],[136,30,60],48],
[34.5,[260,150,110],[150,75,330],56],
[38,[285,140,70],[110,80,270],58],
[41.5,[195,148,205],[70,100,35],54],
[45,[305,168,48],[130,60,250],60],
[48.5,[205,330,195],[180,0,190],58],
[52,[181,560,183],[180,0,180],52],
[54.5,[181,570,183],[180,0,180],52]];
const TOTAL=54.5;
function cr(p0,p1,p2,p3,u){const u2=u*u,u3=u2*u;return p1.map((_,i)=>.5*((2*p1[i])+(-p0[i]+p2[i])*u+(2*p0[i]-5*p1[i]+4*p2[i]-p3[i])*u2+(-p0[i]+3*p1[i]-3*p2[i]+p3[i])*u3))}
function camAt(t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const a=K[Math.max(0,i-1)],b=K[i],c=K[i+1],d=K[Math.min(K.length-1,i+2)];let u=cl((t-b[0])/(c[0]-b[0]),0,1);
if(i==0)u=u*u*(3-2*u)*.5+u*.5;const p=cr(a[1],b[1],c[1],d[1],u),q=cr(a[2],b[2],c[2],d[2],u),f=mix(b[3],c[3],ss(0,1,u));
const hh=t<47?1:1-ss(47,49,t);p[0]+=Math.sin(t*1.3)*.6*hh;p[1]+=Math.sin(t*1.7+1)*.45*hh;q[0]+=Math.sin(t*.9)*.8*hh;return{p,q,f}}
const CAP=[
[3.6,9.6,'01 · LE LIT','MALM brun noir','Parure olive + coussins beige et jaune'],
[9.8,13.4,'02 · AU-DESSUS DU LIT','Les 3 albums','Cadres noirs, éclairage LED derrière la tête de lit'],
[13.6,17.0,'03 · NOUVEAU','Commode 6 tiroirs','Bois foncé + pieds métal noir · 195,99 €'],
[17.2,20.6,'04 · TV','TCL 65" Mini LED au mur','144 Hz · barre de son en 2 enceintes'],
[20.8,24.0,'05 · VINYLES','Kallax brun noir','Platine sur le dessus, cadres au mur'],
[24.2,30.6,'06 · SETUP GAMING','Écran OLED 27" 2K · 240 Hz','Chaise ergonomique Sihoo · étagère LACK'],
[30.7,33.8,'07 · LE PC','Ryzen 7 9800X3D · RX 9070 XT','32 Go DDR5 · SSD 2 To · tour sous le bureau'],
[34.0,38.2,'08 · AMBIANCE','Coucher de soleil → soir chaud','Lampadaire, chevet, FADO, LED ambrées'],
[39.6,43.6,'09 · MODE GAMING','Néon violet et cyan','LED du lit, de la TV et du PC synchronisées'],
[44.4,47.8,'10 · MODE FÊTE','Couleurs qui tournent',''],
[49.0,52.6,'11 · LE PLAN','Vu d\'en haut','13 m² · 3,60 × 3,60 m']];


// ---------- touch / mouse orbit ----------
const tgt=new THREE.Vector3(150,120,330);let sph={r:300,th:0,ph:1.3};
function fromPos(p,q){const dx=p.x-q.x,dy=p.y-q.y,dz=p.z-q.z;sph.r=Math.hypot(dx,dy,dz);sph.th=Math.atan2(dx,dz);sph.ph=Math.acos(Math.max(-1,Math.min(1,dy/sph.r)))}
function toPos(){const s=Math.sin(sph.ph);cam.position.set(tgt.x+sph.r*s*Math.sin(sph.th),tgt.y+sph.r*Math.cos(sph.ph),tgt.z+sph.r*s*Math.cos(sph.th));cam.lookAt(tgt)}
fromPos({x:310,y:155,z:70},tgt);
let ctlOn=true;const pts=new Map();let pd=0,pc=null;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});fly=null;if(tour)stopTour()});
cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId)||!ctlOn)return;const p=pts.get(e.pointerId);const dx=e.clientX-p.x,dy=e.clientY-p.y;
 if(pts.size===1){sph.th-=dx*.006;sph.ph=Math.max(.08,Math.min(3.0,sph.ph-dy*.006))}
 else if(pts.size===2){const a=[...pts.values()];p.x=e.clientX;p.y=e.clientY;const b=[...pts.values()];const d=Math.hypot(b[0].x-b[1].x,b[0].y-b[1].y);const c={x:(b[0].x+b[1].x)/2,y:(b[0].y+b[1].y)/2};
  if(pd){sph.r=Math.max(25,Math.min(1100,sph.r*pd/d));if(pc){const s=sph.r*.0016;const rx=Math.cos(sph.th),rz=-Math.sin(sph.th);tgt.x-=(c.x-pc.x)*s*rx;tgt.z-=(c.x-pc.x)*s*rz;tgt.y+=(c.y-pc.y)*s}}pd=d;pc=c;return}
 p.x=e.clientX;p.y=e.clientY});
const up=e=>{pts.delete(e.pointerId);pd=0;pc=null};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('wheel',e=>{e.preventDefault();sph.r=Math.max(25,Math.min(1100,sph.r*Math.exp(e.deltaY*.001)))},{passive:false});
// ---------- UI ----------
const MODES={cosy:()=>COSY,jour:()=>DAY,coucher:()=>GOLD,soir:()=>EVE,gaming:()=>GAME,fete:t=>FETE(t),cine:()=>CINE};
let mode='cosy',from=COSY,blendT=1,tour=null,fly=null,cur=COSY,el=0;
const cap=document.getElementById('cap'),capT=document.getElementById('capT'),capS=document.getElementById('capS'),capL=document.getElementById('capL');
function setMode(m){from=cur;mode=m;blendT=0;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('on',b.dataset.mode===m))}
let auto=false,autoT=0;const KEYS=['cosy','jour','coucher','soir','gaming','fete','cine'];const autoB=document.getElementById('auto');function setAuto(on){auto=on;autoT=0;autoB.classList.toggle('on',on);autoB.textContent=on?'Arrêter le défilé':'Défilé de toutes les ambiances'}autoB.onclick=()=>{stopTour();setAuto(!auto);if(auto)setMode(KEYS[(KEYS.indexOf(mode)+1)%7])};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{stopTour();setAuto(false);setMode(b.dataset.mode)});
const VIEWS={ambi:[[35,140,259],[355,125,259]],fenetre:[[310,155,70],[150,120,330]],ens:[[560,470,640],[180,70,180]],lit:[[300,150,120],[60,60,268]],tv:[[200,135,240],[352,80,259]],vinyle:[[230,130,152],[350,72,138]],bureau:[[160,145,195],[75,92,30]],dessus:[[181,640,183],[180,0,180]]};
function flyTo(k){stopTour();const v=VIEWS[k];fly={t:0,p0:cam.position.clone(),q0:tgt.clone(),p1:new THREE.Vector3(...v[0]),q1:new THREE.Vector3(...v[1])}}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>flyTo(b.dataset.view));
const playB=document.getElementById('play');
function stopTour(){if(tour){tour=null;playB.innerHTML='&#9654;&nbsp; Lancer la visite';cap.style.opacity=0;fromPos(cam.position,tgt)}}
playB.onclick=()=>{if(tour){stopTour();return}tour={t0:performance.now()/1000};playB.innerHTML='&#10073;&#10073;&nbsp; Arrêter la visite'};
let last=performance.now();window.addEventListener('resize',()=>{setTimeout(setup,200)});
function frame(){requestAnimationFrame(frame);const now=performance.now();const dt=Math.min((now-last)/1000,.05);last=now;el+=dt;setup();let s;
 if(tour){const t=Math.min(now/1000-tour.t0+3.6,TOTAL-.01);const c=camAt(t);cam.position.set(...c.p);tgt.set(...c.q);cam.lookAt(tgt);cam.fov=c.f;s=stateAt(t);
  let sh=null;for(const c2 of CAP)if(t>=c2[0]&&t<=c2[1])sh=c2;if(sh){capL.textContent=sh[2];capT.textContent=sh[3];capS.textContent=sh[4];cap.style.opacity=1}else cap.style.opacity=0;
  if(t>=TOTAL-.02){stopTour();setMode('cosy')}}
 else{if(auto){autoT+=dt;if(autoT>6){autoT=0;setMode(KEYS[(KEYS.indexOf(mode)+1)%7])}}blendT=Math.min(1,blendT+dt/1.2);s=blend(from,MODES[mode](el),ss(0,1,blendT));cam.fov=52;
  if(fly){fly.t=Math.min(1,fly.t+dt/1.6);const u=ss(0,1,fly.t);cam.position.lerpVectors(fly.p0,fly.p1,u);tgt.x=mix(fly.q0.x,fly.q1.x,u);tgt.y=mix(fly.q0.y,fly.q1.y,u);tgt.z=mix(fly.q0.z,fly.q1.z,u);cam.lookAt(tgt);if(fly.t>=1){fly=null;fromPos(cam.position,tgt)}}else toPos()}
 cur=s;apply(s,el);ambiUp(s,el);const p=cam.position;R.ceil.visible=p.y<250&&p.x>0&&p.x<360&&p.z>0&&p.z<360;
 RD.render(sc,cam,{expo:s.expo,bloom:(.25+.4*(1-cl(s.sunI/1.5,0,1)))*(1-.55*(s.ambi||0)),thr:.8,time:el,vig:.3,bg:[s.sky[0]*.25,s.sky[1]*.25,s.sky[2]*.3]});
 if(window.__onframe)window.__onframe()}
window.__jump=(k,p,q)=>{const v=k?VIEWS[k]:[p,q];cam.position.set(...v[0]);tgt.set(...v[1]);fromPos(cam.position,tgt);fly=null};window.__mode=m=>{setMode(m);blendT=1;from=MODES[m](0)};
setup();setMode('cosy');frame();
})();
