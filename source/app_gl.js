(function(){
const box=document.getElementById('view');const cv=document.createElement('canvas');cv.style.cssText='display:block;width:100%;height:100%;touch-action:none';box.appendChild(cv);
const R=buildRoom(THREE);const sc=R.scene;window.__R=R;const ambiUp=makeAmbi(R,THREE);
const cam=new THREE.PerspectiveCamera(52,1,4,3000);
let RD=null;function setup(){const pr=Math.min(window.devicePixelRatio||1,1.6)*(window.QSCALE||1);const w=Math.max(8,Math.round(box.clientWidth*pr/8)*8),h=Math.max(8,Math.round(box.clientHeight*pr/8)*8);if(RD&&cv.width===w&&cv.height===h)return;cv.width=w;cv.height=h;RD=makeRenderer(cv);lastSun='';cam.aspect=w/h}
const FV=f=>cam.aspect>=1?f:2*Math.atan(Math.tan(f*Math.PI/360)/Math.sqrt(cam.aspect))*180/Math.PI;
const hex=h=>[((h>>16)&255)/255,((h>>8)&255)/255,(h&255)/255];
const mix=(a,b,t)=>a+(b-a)*t,mixc=(a,b,t)=>[mix(a[0],b[0],t),mix(a[1],b[1],t),mix(a[2],b[2],t)];
const cl=(x,a,b)=>Math.max(a,Math.min(b,x)),ss=(a,b,x)=>{const t=cl((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function hsl(h,s,l){const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return[f(0),f(8),f(4)]}
const LN=['pend','arc','ns','fado','desk','deskLed','shelf','bed','head','tv','tvs','mon','pc','sneak','spot','candle','candle2','candle3'];
const GN=['bedLed','headLed','tvLed','monGlow','pc','shelf','sneak','deskLed'];
function st(o){const s={sunI:0,sunC:hex(0xfff0dc),elev:40,az:-17,ambI:.12,skyC:hex(0x8a96b8),gndC:hex(0x3a3040),sky:hex(0x26314f),expo:1.25,
L:{},G:{},em:{pend:.05,arc:.05,ns:0,fado:.05,dl:0},tv:0,mon:0,shaft:0,dust:0,pcIn:hex(0),night:1,moon:.8,cand:0,fadoC:hex(0xffe2b0),ambi:0};LN.forEach(k=>s.L[k]=[hex(0xffd8a0),0]);GN.forEach(k=>s.G[k]=hex(0));
for(const k in o){if(k=='L'||k=='G'||k=='em')Object.assign(s[k],o[k]);else s[k]=o[k]}return s}
const amber=hex(0xff8a2a),warm=hex(0xffcf94);
const DAY=st({night:0,moon:0,pcIn:mixc([0,0,0],hex(0x8a3dff),.7),sunI:2.0,sunC:hex(0xfff1dc),elev:38,ambI:.62,skyC:hex(0xfff7ec),gndC:hex(0xa58b70),sky:hex(0xffffff),expo:1.05,mon:.95,shaft:.07,dust:1,
 L:{mon:[hex(0x9fb6ff),.25],spot:[hex(0xfff3dc),.15]},G:{monGlow:mixc([0,0,0],hex(0x6f8cff),.22)}});
const GOLD=st({night:.12,moon:0,sunI:2.1,sunC:hex(0xff7a30),elev:10,az:-30,ambI:.22,skyC:hex(0xff9a60),gndC:hex(0x7a4a30),sky:hex(0xff8a50),expo:1.0,mon:.9,shaft:.12,dust:1,pcIn:mixc([0,0,0],hex(0x8a3dff),.7),
 L:{arc:[warm,.55],ns:[warm,.25],fado:[hex(0xffd9a8),.2],bed:[amber,.25],mon:[hex(0x9fb6ff),.3]},em:{arc:.55,ns:.3,fado:.25},G:{monGlow:[.08,.11,.25],bedLed:mixc([0,0,0],amber,.15)}});
const EVE=st({sunI:0,ambI:.12,sky:hex(0x1e2848),expo:1.12,tv:.95,mon:.25,cand:.6,pcIn:mixc([0,0,0],hex(0xff8a2a),.5),
 L:{pend:[hex(0xffe1b8),.4],arc:[warm,1.0],ns:[warm,.8],fado:[hex(0xffd9a8),.75],desk:[hex(0xfff0d8),.35],deskLed:[amber,.6],bed:[amber,.85],head:[amber,.7],candle:[hex(0xff9a40),.4],candle2:[hex(0xff9a40),.35],candle3:[hex(0xff9a40),.3],tv:[amber,.7],tvs:[hex(0xffb080),.35],sneak:[hex(0xfff0d8),.35],spot:[hex(0xfff3dc),.35],mon:[hex(0x9fb6ff),.12]},
 em:{pend:.5,arc:1.2,ns:.8,fado:.9,dl:1},G:{deskLed:mixc([0,0,0],amber,.42),bedLed:mixc([0,0,0],amber,.45),headLed:mixc([0,0,0],amber,.28),tvLed:mixc([0,0,0],amber,.32),sneak:[.25,.22,.18],shelf:[0,0,0]}});
const vio=hex(0x8a3dff),cya=hex(0x22d8ff),mag=hex(0xff2fa8);
const GAME=st({sunI:0,ambI:.08,skyC:hex(0x6a60a8),sky:hex(0x141a36),expo:1.1,tv:.25,mon:1,
 L:{deskLed:[vio,.9],arc:[vio,.6],ns:[cya,.5],bed:[vio,1.3],head:[cya,1.0],tv:[cya,1.0],mon:[hex(0x9fb6ff),.5],pc:[mag,1.2],shelf:[hex(0xb89cff),.3],sneak:[cya,.6],spot:[vio,.4]},
 em:{arc:.6,ns:.5},G:{deskLed:mixc([0,0,0],vio,.6),bedLed:mixc([0,0,0],vio,.75),headLed:mixc([0,0,0],cya,.45),tvLed:mixc([0,0,0],cya,.5),monGlow:mixc([0,0,0],hex(0x8a5cff),.3),pc:mixc([0,0,0],mag,.5),shelf:[.07,.08,.1],sneak:mixc([0,0,0],cya,.35)},pcIn:mag});
function FETE(t){const s=st(GAME);const h=t*.22;const c=k=>hsl((h+k)%1,1,.55);
 s.L.bed=[c(0),1.4];s.L.head=[c(.25),1.1];s.L.tv=[c(.5),1.1];s.L.arc=[c(.75),.9];s.L.ns=[c(.1),.7];s.L.pc=[c(.6),1.2];s.L.sneak=[c(.4),.7];s.L.spot=[c(.85),.5];s.L.pend=[c(.3),.3];
 s.G.bedLed=mixc([0,0,0],c(0),.8);s.L.deskLed=[c(.15),.9];s.G.deskLed=mixc([0,0,0],c(.15),.6);s.G.headLed=mixc([0,0,0],c(.25),.5);s.G.tvLed=mixc([0,0,0],c(.5),.55);s.G.pc=mixc([0,0,0],c(.6),.6);s.G.sneak=mixc([0,0,0],c(.4),.4);s.pcIn=c(.6);s.em.arc=.9;s.tv=.6;return s}
const ora=hex(0xffb877),ora2=hex(0xffc28a);
const COSY=st({night:1,moon:1,cand:1,sunI:.42,sunC:hex(0x9fb2ff),elev:24,az:6,ambI:.06,skyC:hex(0x55669e),gndC:hex(0x3a2216),sky:hex(0x262c48),expo:1.05,tv:0,mon:.35,shaft:.035,dust:0,pcIn:mixc([0,0,0],ora,.25),fadoC:hex(0xff9a45),
 L:{deskLed:[hex(0xff7a2a),.55],arc:[ora,.85],ns:[ora,.7],fado:[ora2,.8],desk:[hex(0xffd2a0),.45],shelf:[hex(0xffd2a0),.3],bed:[hex(0xff7a2a),.6],head:[hex(0xff8a3a),.4],tv:[hex(0xff8a3a),.3],mon:[hex(0x9fb6ff),.12],pc:[ora,.25],sneak:[hex(0xffb070),.3],spot:[hex(0xffa860),.55],candle:[hex(0xff9a40),.55],candle2:[hex(0xff9a40),.5],candle3:[hex(0xff9a40),.45]},
 em:{pend:.03,arc:1.5,ns:1.1,fado:1.25,dl:1},G:{deskLed:mixc([0,0,0],hex(0xff6a1a),.4),bedLed:mixc([0,0,0],hex(0xff6a1a),.42),headLed:mixc([0,0,0],hex(0xff7a2a),.22),tvLed:mixc([0,0,0],hex(0xff7a2a),.18),shelf:[.14,.07,.02],sneak:[.16,.09,.04],pc:mixc([0,0,0],ora,.15)}});
const CINE=st({night:1,moon:.7,cand:.5,sunI:.18,sunC:hex(0x9fb2ff),elev:24,az:6,ambI:.035,skyC:hex(0x55669e),gndC:hex(0x2a1a14),sky:hex(0x1c2238),expo:1.0,tv:.62,mon:0,ambi:1,
 L:{arc:[hex(0xffb877),.06],candle:[hex(0xff9a40),.2],candle2:[hex(0xff9a40),.16],candle3:[hex(0xff9a40),.12]},em:{arc:.2,pend:.02,fado:.05}});
function blend(a,b,t){if(t<=0)return a;if(t>=1)return b;const s=st({});for(const k in a){if(k=='L'){for(const n of LN)s.L[n]=[mixc(a.L[n][0],b.L[n][0],t),mix(a.L[n][1],b.L[n][1],t)]}else if(k=='G'){for(const n of GN)s.G[n]=mixc(a.G[n],b.G[n],t)}else if(k=='em'){for(const n in a.em)s.em[n]=mix(a.em[n],b.em[n],t)}else if(Array.isArray(a[k]))s[k]=mixc(a[k],b[k],t);else s[k]=mix(a[k],b[k],t)}return s}
const SCHED=[[0,'DAY'],[29,'DAY'],[33,'GOLD'],[36.5,'EVE'],[39,'EVE'],[41.2,'COSY'],[46.5,'COSY'],[47.8,'CINE'],[53,'CINE'],[54.3,'GAME'],[57.3,'GAME'],[58.4,'FETE'],[61.4,'FETE'],[63,'EVE']];
const getS=(n,t)=>n=='DAY'?DAY:n=='GOLD'?GOLD:n=='EVE'?EVE:n=='GAME'?GAME:n=='COSY'?COSY:n=='CINE'?CINE:FETE(t);
function stateAt0(t){for(let i=0;i<SCHED.length-1;i++){const[a,na]=SCHED[i],[b,nb]=SCHED[i+1];if(t<b)return blend(getS(na,t),getS(nb,t),ss(0,1,(t-a)/(b-a)))}return getS(SCHED[SCHED.length-1][1],t)}
// pendant le plan sur la TV (vers 15-20 s), la TV s'allume
function stateAt(t){const s=stateAt0(t);const k=ss(14.6,15.8,t)*(1-ss(19.6,20.8,t));if(k>0){const o=Object.assign({},s);o.tv=Math.max(s.tv||0,.9*k);return o}return s}

const setC=(c,v)=>{c.r=v[0];c.g=v[1];c.b=v[2]};
function apply(s,t){const e=s.elev*Math.PI/180,a=s.az*Math.PI/180;const sd=[Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)];
R.sun.position.set(180+sd[0]*600,90+sd[1]*600,230+sd[2]*600);R.sun.target.position.set(180,90,230);R.sun.intensity=s.sunI;setC(R.sun.color,s.sunC);
const key=sd.map(v=>v.toFixed(3)).join();if(key!==lastSun){RD.updateShadows(sc,sd);lastSun=key}
R.amb.intensity=s.ambI;setC(R.amb.color,s.skyC);setC(R.amb.groundColor,s.gndC);
setC(R.sky.material.color,s.sky);const so=mixc(s.sky,[1,1,1],.0);R.out.forEach(o=>{const c=hex(o.userData.c0||(o.userData.c0=o.material.color.getHex()));setC(o.material.color,[c[0]*s.sky[0],c[1]*s.sky[1],c[2]*s.sky[2]])});
[R.tree,R.tree2].forEach(o=>{const c=hex(o.userData.c0||(o.userData.c0=o.material.color.getHex()));setC(o.material.color,[c[0]*s.sky[0],c[1]*s.sky[1],c[2]*s.sky[2]])});
LN.forEach(n=>{setC(R.L[n].color,s.L[n][0]);R.L[n].intensity=s.L[n][1]});
GN.forEach(n=>R.G[n].forEach(m=>setC(m.material.color,s.G[n])));(R.strips||[]).forEach(o=>{const c=s.G[o.k];setC(o.m.material.color,[Math.min(1,c[0]*o.g),Math.min(1,c[1]*o.g),Math.min(1,c[2]*o.g)])});
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
[0,[-110,160,55],[120,135,210],50],
[3.5,[-18,158,56],[150,110,260],52],
[7,[288,154,158],[110,80,368],56],
[10.5,[215,142,218],[12,126,368],52],
[14,[205,118,305],[350,48,359],50],
[17.5,[196,140,352],[354,142,359],58],
[21,[228,132,252],[350,72,238],50],
[24.5,[300,142,190],[268,98,30],52],
[28,[296,118,128],[270,102,20],46],
[31,[252,150,112],[214,86,44],50],
[32.8,[200,166,170],[130,85,350],54],
[34.5,[260,150,210],[150,75,430],56],
[38,[285,140,170],[110,80,370],58],
[41.5,[300,150,180],[160,125,435],54],
[45,[250,140,240],[150,110,440],50],
[48.5,[60,128,350],[355,128,359],58],
[52,[45,135,359],[355,125,359],56],
[55.5,[300,148,215],[262,100,35],54],
[59,[305,168,148],[130,60,350],60],
[62.5,[205,330,245],[180,0,240],58],
[66,[181,600,233],[180,0,230],52],
[68.5,[181,630,233],[180,0,230],52]];
const TOTAL=68.5;
function cr(p0,p1,p2,p3,u){const u2=u*u,u3=u2*u;return p1.map((_,i)=>.5*((2*p1[i])+(-p0[i]+p2[i])*u+(2*p0[i]-5*p1[i]+4*p2[i]-p3[i])*u2+(-p0[i]+3*p1[i]-3*p2[i]+p3[i])*u3))}
function camAt(t){let i=0;while(i<K.length-2&&t>K[i+1][0])i++;const a=K[Math.max(0,i-1)],b=K[i],c=K[i+1],d=K[Math.min(K.length-1,i+2)];let u=cl((t-b[0])/(c[0]-b[0]),0,1);
if(i==0)u=u*u*(3-2*u)*.5+u*.5;const p=cr(a[1],b[1],c[1],d[1],u),q=cr(a[2],b[2],c[2],d[2],u),f=mix(b[3],c[3],ss(0,1,u));
const hh=t<61?1:1-ss(61,63,t);p[0]+=Math.sin(t*1.3)*.6*hh;p[1]+=Math.sin(t*1.7+1)*.45*hh;q[0]+=Math.sin(t*.9)*.8*hh;return{p,q,f}}
const CAP=[
[3.4,8.6,'01 · LE LIT','MALM brun noir','Housse olive, coussins beige et moutarde, mur en lattes noyer'],
[9.4,12.0,'02 · AU-DESSUS DU LIT','Trois affiches sur les lattes','Cadres noirs, LED derrière la tête de lit'],
[12.9,15.6,'03 · COMMODE ET SON','Barre Samsung 2.1 + caisson sans fil','Commode 6 tiroirs bois foncé · sansevière dans le coin'],
[16.4,19.1,'04 · TV','TCL 75" Mini LED au mur','144 Hz · support inclinable · rétroéclairage'],
[19.9,22.6,'05 · VINYLES','Kallax + platine AT-LP60X','Enceintes Edifier R1280DB'],
[23.4,29.4,'06 · BUREAU GAMING','Écran OLED 32" 4K AOC AGON PRO','PS5 · chaise Sihoo Doro C300 · lampe à ampoule apparente'],
[30.0,31.4,'07 · LE COIN VR','PS VR2 rangé sur son support','Station de charge des manettes · câble caché sous le bureau'],
[33.6,39.6,'08 · AMBIANCE','Coucher de soleil → soir chaud','Lampadaire, chevet, FADO, LED ambrées'],
[40.6,46.0,'09 · NUIT COSY','La lune par la fenêtre','Bougies, lumières de la ville, murs blancs'],
[47.6,53.0,'10 · CINÉ AMBILIGHT','La TV déborde sur le mur','Les couleurs de l\'image éclairent la chambre'],
[54.6,57.6,'11 · MODE GAMING','Néon violet et cyan','LED du lit, de la TV et du bureau synchronisées'],
[58.2,61.4,'12 · MODE FÊTE','Couleurs qui tournent',''],
[63.0,66.0,'13 · LE PLAN','Cotes et passages','3,60 × 3,60 m · passages de 91 à 133 cm']];


// ---------- touch / mouse orbit ----------
const tgt=new THREE.Vector3(150,120,330);let sph={r:300,th:0,ph:1.3};
function fromPos(p,q){const dx=p.x-q.x,dy=p.y-q.y,dz=p.z-q.z;sph.r=Math.hypot(dx,dy,dz);sph.th=Math.atan2(dx,dz);sph.ph=Math.acos(Math.max(-1,Math.min(1,dy/sph.r)))}
function toPos(){const s=Math.sin(sph.ph);cam.position.set(tgt.x+sph.r*s*Math.sin(sph.th),tgt.y+sph.r*Math.cos(sph.ph),tgt.z+sph.r*s*Math.cos(sph.th));cam.lookAt(tgt)}
fromPos({x:310,y:155,z:70},tgt);
let ctlOn=true;const pts=new Map();let pd=0,pc=null;
let tap=null;cv.addEventListener('pointerdown',e=>{tap=pts.size===0?{x:e.clientX,y:e.clientY,t:performance.now()}:null;cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});fly=null;if(tour)stopTour()});
cv.addEventListener('pointermove',e=>{if(tap&&Math.hypot(e.clientX-tap.x,e.clientY-tap.y)>=9)tap=null;if(!pts.has(e.pointerId)||!ctlOn)return;const p=pts.get(e.pointerId);const dx=e.clientX-p.x,dy=e.clientY-p.y;
 if(pts.size===1){sph.th-=dx*.006;sph.ph=Math.max(.08,Math.min(3.0,sph.ph-dy*.006))}
 else if(pts.size===2){const a=[...pts.values()];p.x=e.clientX;p.y=e.clientY;const b=[...pts.values()];const d=Math.hypot(b[0].x-b[1].x,b[0].y-b[1].y);const c={x:(b[0].x+b[1].x)/2,y:(b[0].y+b[1].y)/2};
  if(pd){sph.r=Math.max(25,Math.min(1100,sph.r*pd/d));if(pc){const s=sph.r*.0016;const rx=Math.cos(sph.th),rz=-Math.sin(sph.th);tgt.x-=(c.x-pc.x)*s*rx;tgt.z-=(c.x-pc.x)*s*rz;tgt.y+=(c.y-pc.y)*s}}pd=d;pc=c;return}
 p.x=e.clientX;p.y=e.clientY});
const up=e=>{if(tap&&e.type==='pointerup'&&pts.size===1&&Math.hypot(e.clientX-tap.x,e.clientY-tap.y)<9&&performance.now()-tap.t<450&&window.__pick)window.__pick(e.clientX,e.clientY);tap=null;pts.delete(e.pointerId);pd=0;pc=null};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('wheel',e=>{e.preventDefault();sph.r=Math.max(25,Math.min(1100,sph.r*Math.exp(e.deltaY*.001)))},{passive:false});
// ---------- UI ----------
const MODES={cosy:()=>COSY,jour:()=>DAY,coucher:()=>GOLD,soir:()=>EVE,gaming:()=>GAME,fete:t=>FETE(t),cine:()=>CINE};
let mode='cosy',from=COSY,blendT=1,tour=null,fly=null,cur=COSY,el=0;
const cap=document.getElementById('cap'),capT=document.getElementById('capT'),capS=document.getElementById('capS'),capL=document.getElementById('capL');
function setMode(m){from=cur;mode=m;blendT=0;if(R.echoSet)R.echoSet(m);document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('on',b.dataset.mode===m))}
let auto=false,autoT=0;const KEYS=['cosy','jour','coucher','soir','gaming','fete','cine'];const autoB=document.getElementById('auto');function setAuto(on){auto=on;autoT=0;autoB.classList.toggle('on',on);autoB.textContent=on?'Arrêter le défilé':'Défilé de toutes les ambiances'}autoB.onclick=()=>{stopTour();setAuto(!auto);if(auto)setMode(KEYS[(KEYS.indexOf(mode)+1)%7])};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{stopTour();setAuto(false);setMode(b.dataset.mode)});
const VIEWS={ambi:[[35,140,359],[355,125,359]],fenetre:[[300,155,150],[160,120,430]],ens:[[560,500,780],[180,70,230]],lit:[[300,150,220],[60,60,368]],tv:[[200,135,340],[352,80,359]],vinyle:[[230,130,252],[350,72,238]],bureau:[[300,150,215],[262,92,30]],dessus:[[181,720,233],[180,0,230]],porte:[[270,150,330],[10,95,60]]};
function flyTo(k){stopTour();const v=VIEWS[k];fly={t:0,p0:cam.position.clone(),q0:tgt.clone(),p1:new THREE.Vector3(...v[0]),q1:new THREE.Vector3(...v[1])}}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>flyTo(b.dataset.view));
const playB=document.getElementById('play');
function stopTour(){if(tour){tour=null;playB.innerHTML='&#9654;&nbsp; Lancer la visite';cap.style.opacity=0;fromPos(cam.position,tgt)}}
playB.onclick=()=>{if(tour){stopTour();return}tour={t0:performance.now()/1000};playB.innerHTML='&#10073;&#10073;&nbsp; Arrêter la visite'};
let last=performance.now(),slowT=0,noPtSh=/[?&]ombres=0/.test(location.search);const FORCE_SH=/[?&]ombres=1/.test(location.search);window.__ptsh=()=>!noPtSh;window.addEventListener('resize',()=>{setTimeout(setup,200)});
function frame(){requestAnimationFrame(frame);if(window.__offline)return;const now=performance.now();const rdt=(now-last)/1000;const dt=Math.min(rdt,.05);last=now;if(!document.hidden&&rdt<.5){slowT=rdt>.045?slowT+rdt:Math.max(0,slowT-rdt*.5);if(slowT>3&&!noPtSh&&!FORCE_SH){noPtSh=true}}el+=dt;setup();let s;
 if(tour){const t=Math.min(now/1000-tour.t0+3.6,TOTAL-.01);const c=camAt(t);cam.position.set(...c.p);tgt.set(...c.q);cam.lookAt(tgt);cam.fov=FV(c.f);s=stateAt(t);
  let sh=null;for(const c2 of CAP)if(t>=c2[0]&&t<=c2[1])sh=c2;if(sh){capL.textContent=sh[2];capT.textContent=sh[3];capS.textContent=sh[4];cap.style.opacity=1}else cap.style.opacity=0;
  if(t>=TOTAL-.02){stopTour();setMode('cosy')}}
 else{if(auto){autoT+=dt;if(autoT>6){autoT=0;setMode(KEYS[(KEYS.indexOf(mode)+1)%7])}}blendT=Math.min(1,blendT+dt/1.2);s=blend(from,MODES[mode](el),ss(0,1,blendT));cam.fov=FV(52);
  if(fly){fly.t=Math.min(1,fly.t+dt/1.6);const u=ss(0,1,fly.t);cam.position.lerpVectors(fly.p0,fly.p1,u);tgt.x=mix(fly.q0.x,fly.q1.x,u);tgt.y=mix(fly.q0.y,fly.q1.y,u);tgt.z=mix(fly.q0.z,fly.q1.z,u);cam.lookAt(tgt);if(fly.t>=1){fly=null;fromPos(cam.position,tgt)}}else toPos()}
 cur=s;apply(s,el);ambiUp(s,el);const p=cam.position;R.ceil.visible=p.y<250&&p.x>0&&p.x<360&&p.z>0&&p.z<460;
 RD.render(sc,cam,{expo:s.expo,bloom:(.25+.4*(1-cl(s.sunI/1.5,0,1)))*(1-.55*(s.ambi||0)),thr:.8,time:el,noPtSh,vig:.3,bg:[s.sky[0]*.25,s.sky[1]*.25,s.sky[2]*.3]});
 if(window.__onframe)window.__onframe()}
window.__renderAt=(t,W,H)=>{window.__offline=true;if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H;RD=makeRenderer(cv);lastSun='';cam.aspect=W/H}
 const c=camAt(t);cam.position.set(...c.p);tgt.set(...c.q);cam.lookAt(tgt);cam.fov=FV(c.f);const s=stateAt(t);cur=s;apply(s,t);ambiUp(s,t);if(window.__mesVis)window.__mesVis(t);const p=cam.position;R.ceil.visible=p.y<250&&p.x>0&&p.x<360&&p.z>0&&p.z<460;
 RD.render(sc,cam,{expo:s.expo,bloom:(.25+.4*(1-cl(s.sunI/1.5,0,1)))*(1-.55*(s.ambi||0)),thr:.8,time:t,vig:.3,bg:[s.sky[0]*.25,s.sky[1]*.25,s.sky[2]*.3]});
 const o=window.__oc||(window.__oc=document.createElement('canvas'));o.width=W;o.height=H;const g=o.getContext('2d');g.drawImage(cv,0,0,W,H);const k=Math.min(W,H)/720;const dk=ss(31.6,32.15,t)*(1-ss(32.65,33.2,t));if(dk>0){g.fillStyle='rgba(0,0,0,'+dk+')';g.fillRect(0,0,W,H)}if(window.__mesDraw)window.__mesDraw(t,g,W,H,k);
 let sh=null,al=0;for(const c2 of CAP)if(t>=c2[0]-.4&&t<=c2[1]+.4){sh=c2;al=Math.min(1,(t-(c2[0]-.4))/.5,((c2[1]+.4)-t)/.5)}
 if(sh&&al>0){g.save();g.globalAlpha=al;const x=56*k,y=60*k;const gr=g.createLinearGradient(0,0,620*k,0);gr.addColorStop(0,'rgba(10,10,9,.55)');gr.addColorStop(1,'rgba(10,10,9,0)');g.fillStyle=gr;g.fillRect(0,y-38*k,640*k,130*k);
  g.fillStyle='#A4AE6E';g.fillRect(x,y-28*k,5*k,104*k);g.fillStyle='#C9D19A';g.font=`600 ${15*k}px Inter, sans-serif`;g.fillText(sh[2].split('').join(String.fromCharCode(8202)),x+20*k,y-6*k);
  const fit=(txt,base,wt)=>{let fs=base*k;g.font=`${wt} ${fs}px Inter, sans-serif`;while(fs>8&&g.measureText(txt).width>W-x-48*k){fs*=.93;g.font=`${wt} ${fs}px Inter, sans-serif`}};g.fillStyle='#F6F2E8';fit(sh[3],36,700);g.fillText(sh[3],x+20*k,y+34*k);g.globalAlpha=al*.85;fit(sh[4],19,400);g.fillText(sh[4],x+20*k,y+64*k);g.restore()}
 const ti=Math.min(1,t/.8)*(1-ss(2.6,3.4,t));if(ti>0){g.save();g.globalAlpha=ti;g.fillStyle='rgba(10,10,9,.35)';g.fillRect(0,0,W,H);g.fillStyle='#F6F2E8';g.textAlign='center';g.font=`700 ${64*k}px Inter, sans-serif`;g.fillText('Ma chambre',W/2,H/2-6*k);g.fillStyle='#C9D19A';g.font=`500 ${22*k}px Inter, sans-serif`;g.fillText('NOIR & OLIVE · VISITE 3D',W/2,H/2+34*k);g.restore()}
 const te=ss(66.2,67.4,t);if(te>0){g.save();g.globalAlpha=te;g.fillStyle='rgba(10,10,9,.6)';g.fillRect(0,0,W,H);g.fillStyle='#F6F2E8';g.textAlign='center';g.font=`700 ${52*k}px Inter, sans-serif`;g.fillText('Ma chambre',W/2,H/2-10*k);g.fillStyle='#C9D19A';g.font=`500 ${21*k}px Inter, sans-serif`;const st='Visite VR sur Quest 2 · plan 3D · liste d\'achat';if(g.measureText(st).width<W-48*k)g.fillText(st,W/2,H/2+30*k);else{g.fillText('Visite VR sur Quest 2',W/2,H/2+30*k);g.fillText('plan 3D · liste d\'achat',W/2,H/2+58*k)}g.restore()}
 return o.toDataURL('image/jpeg',.92)};
window.__jump=(k,p,q)=>{const v=k?VIEWS[k]:[p,q];cam.position.set(...v[0]);tgt.set(...v[1]);fromPos(cam.position,tgt);fly=null};window.__mode=m=>{setMode(m);blendT=1;from=MODES[m](0)};
setup();setMode('cosy');frame();

// ---------- fiche produit : touche un meuble pour voir l'article de la liste ----------
(function(){const CAT=window.CATALOG||[],IT={};(window.ITEMS||[]).forEach(d=>IT[d[0]]=d);const ST=window.STORES||{},ZN=window.ZONES||{};
 const LISTE='https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/source/liste_achat.html';
 const SQ={ikea:'https://www.ikea.com/fr/fr/search/?q=',amazon:'https://www.amazon.fr/s?k=',fnac:'https://www.fnac.com/SearchResult/ResultList.aspx?Search=',leroy:'https://www.leroymerlin.fr/resultats/?q=',darty:'https://www.darty.com/nav/recherche?text=',action:'https://www.action.com/fr-fr/search/?q=',ldlc:'https://www.ldlc.com/recherche/',materiel:'https://www.materiel.net/recherche/',vente:'https://www.vente-unique.com/recherche?q='};
 const card=document.getElementById('card');if(!card||!CAT.length)return;
 const hl=new THREE.Group();sc.add(hl);hl.visible=false;const hlF=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0x1f250c,transparent:true,opacity:1,blending:THREE.AdditiveBlending,depthWrite:false}));hlF.castShadow=false;hlF.userData.noTop=true;hlF.renderOrder=20;hl.add(hlF);
 const hlE=[...Array(12)].map(()=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xD8E48A}));m.castShadow=false;m.userData.noTop=true;m.renderOrder=21;hl.add(m);return m});
 function setHL(b){const c=[(b[0]+b[1])/2,(b[2]+b[3])/2,(b[4]+b[5])/2],s=[b[1]-b[0]+2,b[3]-b[2]+2,b[5]-b[4]+2],w=.7;hl.position.set(...c);hlF.scale.set(...s);let k=0;
  for(const a of[0,1,2])for(const u of[-1,1])for(const v of[-1,1]){const o=[0,0,0],sz=[w,w,w];sz[a]=s[a]+w;const[i,j]=[0,1,2].filter(q=>q!==a);o[i]=u*s[i]/2;o[j]=v*s[j]/2;hlE[k].position.set(...o);hlE[k].scale.set(...sz);k++}hl.visible=true}
 const eur=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:n%1?2:0});
 const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function ray(cx,cy){const r=cv.getBoundingClientRect();const x=((cx-r.left)/r.width)*2-1,y=1-((cy-r.top)/r.height)*2;const P=cam.position,T=cam.target;
  let f=[T.x-P.x,T.y-P.y,T.z-P.z];let l=Math.hypot(...f);f=f.map(v=>v/l);let rt=[-f[2],0,f[0]];l=Math.hypot(...rt)||1;rt=rt.map(v=>v/l);const u=[rt[1]*f[2]-rt[2]*f[1],rt[2]*f[0]-rt[0]*f[2],rt[0]*f[1]-rt[1]*f[0]];
  const th=Math.tan(cam.fov*Math.PI/360);const d=[0,1,2].map(i=>f[i]+rt[i]*x*th*cam.aspect+u[i]*y*th);l=Math.hypot(...d);return{o:[P.x,P.y,P.z],d:d.map(v=>v/l)}}
 function hit(o,d,b){let t0=-1e9,t1=1e9;for(let i=0;i<3;i++){const lo=b[i*2],hi=b[i*2+1];if(Math.abs(d[i])<1e-9){if(o[i]<lo||o[i]>hi)return null;continue}let a=(lo-o[i])/d[i],c=(hi-o[i])/d[i];if(a>c)[a,c]=[c,a];t0=Math.max(t0,a);t1=Math.min(t1,c);if(t0>t1)return null}return t0>0?t0:null}
 // total de la zone (même calcul que la liste et la fiche VR) ; « Plus tard » hors total
 function zoneTot(d){const zi=(window.ITEMS||[]).filter(x=>x[6]===d[6]);if(!zi.length)return'';const zc=zi.filter(x=>x[5]!=='L'),zt=zc.reduce((a,x)=>a+Math.round((x[4]||0)*(x[3]||0)*100)/100,0),zl=Math.round(zi.filter(x=>x[5]==='L').reduce((a,x)=>a+(x[4]||0)*(x[3]||0),0)*100)/100;
  return `<div class="czt">Total de la zone : <b>${zc.length} article${zc.length>1?'s':''} · ${eur(zt)}</b>${zl>0?' <span>(+ '+eur(zl)+' plus tard)</span>':''}</div>`}
 function line(d,main){const q=d[3]||1,p=d[4];const tot=p*q;const url=d[11]||(SQ[d[7]]?SQ[d[7]]+encodeURIComponent(d[8])+(d[7]==='ldlc'||d[7]==='materiel'?'/':''):'');
  return main?`<div class="cz">${esc(ST[d[7]]||d[7])}</div><div class="cn">${esc(d[1])}</div><div class="cm">${esc(d[2])}</div><div class="cp">${q>1?q+' × '+eur(p)+' = ':''}<b>${eur(tot)}</b>${d[10]?' <span class="ok">prix vérifié</span>':''}</div>${d[9]?`<div class="cnote">${esc(d[9])}</div>`:''}${url?`<a class="cl" href="${esc(url)}" target="_blank" rel="noopener">${d[11]?'Voir le produit':'Chercher sur '+esc(ST[d[7]]||d[7])} →</a>`:''}<a class="cl cl2" href="${LISTE}#item=${encodeURIComponent(d[0])}" target="_blank" rel="noopener">Dans ma liste${ZN[d[6]]?' · '+esc(ZN[d[6]]):''} →</a>${zoneTot(d)}`
  :`<button class="ca" data-id="${esc(d[0])}">${esc(d[1])} · ${eur(tot)}</button>`}
 function show(ids,b){const m=IT[ids[0]];if(!m)return;const rest=ids.slice(1).map(i=>IT[i]).filter(Boolean);
  card.innerHTML=`<button class="cx" aria-label="Fermer">×</button>${line(m,true)}${rest.length?`<div class="cal">Aussi ici</div><div class="cas">${rest.map(d=>line(d,false)).join('')}</div>`:''}`;
  card.classList.add('on');card.querySelector('.cx').onclick=close;card.querySelectorAll('.ca').forEach(x=>x.onclick=()=>show([x.dataset.id,...ids.filter(i=>i!==x.dataset.id)],b));
  if(b)setHL(b)}
 function close(){card.classList.remove('on');hl.visible=false}
 window.__pick=(cx,cy)=>{const {o,d}=ray(cx,cy);const H=[];for(const [b,ids] of CAT){const t=hit(o,d,b);if(t!=null)H.push({t,b,ids,v:(b[1]-b[0])*(b[3]-b[2])*(b[5]-b[4])})}H.sort((p,q)=>p.t-q.t);let best=H[0]||null;for(const h of H)if(best&&h.t<best.t+5&&h.v<best.v)best=h;
  if(best)show(best.ids,best.b);else close()};
 window.__card=(id)=>{const e=CAT.find(c=>c[1][0]===id);if(e)show(e[1],e[0])};
 const h=document.getElementById('hint');if(h)h.textContent='1 doigt : tourner · 2 doigts : zoom · touche un meuble : sa fiche';
})();

// ---------- mode Mesures : cotes en cm + passages ----------
(function(){const MS=window.MESURES||[],btn=document.getElementById('mes'),lay=document.getElementById('mesL');if(!btn||!lay||!MS.length)return;
 const g=new THREE.Group();g.visible=false;sc.add(g);const mm=new THREE.MeshBasicMaterial({color:0xD8E48A}),mp=new THREE.MeshBasicMaterial({color:0xF6F2E8});
 const els=MS.map(m=>{const[a,b,c,d,e,f,n]=m;const L=Math.hypot(d-a,e-b,f-c);const pas=/passage/i.test(n);const mat=pas?mp:mm;
  const ax=Math.abs(d-a)>.5?0:Math.abs(e-b)>.5?1:2;const sz=[.8,.8,.8];sz[ax]=L;const bar=new THREE.Mesh(new THREE.BoxGeometry(...sz),mat);bar.position.set((a+d)/2,(b+e)/2,(c+f)/2);
  [[a,b,c],[d,e,f]].forEach(p=>{const t=[6,6,6];t[ax]=.8;const tk=new THREE.Mesh(new THREE.BoxGeometry(...t),mat);tk.position.set(...p);g.add(tk)});g.add(bar);
  [bar,...g.children].forEach(o=>{o.castShadow=false;o.userData.noTop=true;o.renderOrder=19});
  const el=document.createElement('div');if(pas)el.className='p';const txt=L>=300?(L/100).toFixed(2).replace('.',',')+' m':Math.round(L)+' cm';el.innerHTML=`<small>${n}</small>${txt}`;lay.appendChild(el);return{el,p:[(a+d)/2,(b+e)/2,(c+f)/2]}});
 let on=false;function proj(p){const P=cam.position,T=cam.target;let f=[T.x-P.x,T.y-P.y,T.z-P.z];let l=Math.hypot(...f);f=f.map(v=>v/l);let rt=[-f[2],0,f[0]];l=Math.hypot(...rt)||1;rt=rt.map(v=>v/l);const u=[rt[1]*f[2]-rt[2]*f[1],rt[2]*f[0]-rt[0]*f[2],rt[0]*f[1]-rt[1]*f[0]];
  const v=[p[0]-P.x,p[1]-P.y,p[2]-P.z];const z=v[0]*f[0]+v[1]*f[1]+v[2]*f[2];if(z<5)return null;const th=Math.tan(cam.fov*Math.PI/360);return[(v[0]*rt[0]+v[1]*rt[1]+v[2]*rt[2])/(z*th*cam.aspect),(v[0]*u[0]+v[1]*u[1]+v[2]*u[2])/(z*th)]}
 const uiE=document.getElementById('ui');function upd(){if(!on)return;requestAnimationFrame(upd);const r=cv.getBoundingClientRect();const yMax=(uiE?uiE.getBoundingClientRect().top:r.bottom)-14,yMin=r.top+48;for(const m of els){const q=proj(m.p);const y=q&&r.top+(1-q[1])/2*r.height;if(!q||Math.abs(q[0])>1.05||y<yMin||y>yMax){m.el.style.display='none';continue}m.el.style.display='';const w=m.el.offsetWidth||80;m.el.style.left=Math.max(r.left+w/2+4,Math.min(r.right-w/2-4,r.left+(q[0]+1)/2*r.width))+'px';m.el.style.top=y+'px'}}
 btn.onclick=()=>{on=!on;btn.classList.toggle('on',on);g.visible=on;lay.style.display=on?'':'none';if(on){flyTo('dessus');upd()}};lay.style.display='none';
 window.__mesures=v=>{if(v!==on)btn.onclick()};
 const mA=t=>ss(62.6,63.4,t)*(1-ss(66.0,66.6,t));window.__mesVis=t=>{g.visible=on||mA(t)>0};
 window.__mesDraw=(t,ctx,W,H,k)=>{const a=mA(t);if(a<=0)return;ctx.save();ctx.globalAlpha=a;
  for(const m of els){const q=proj(m.p);if(!q||Math.abs(q[0])>1||Math.abs(q[1])>1)continue;const x=(q[0]+1)/2*W,y=(1-q[1])/2*H;const n=m.el.querySelector('small').textContent,v=m.el.textContent.slice(n.length);
   ctx.font=`500 ${11*k}px Inter, sans-serif`;const w0=ctx.measureText(n).width;ctx.font=`700 ${12.5*k}px Inter, sans-serif`;const w1=ctx.measureText(v).width;const w=w0+w1+22*k,h=22*k;
   ctx.fillStyle=m.el.className==='p'?'#F6F2E8':'#D8E48A';ctx.beginPath();ctx.roundRect(x-w/2,y-h/2,w,h,h/2);ctx.fill();ctx.fillStyle='rgba(27,29,18,.75)';ctx.font=`500 ${11*k}px Inter, sans-serif`;ctx.fillText(n,x-w/2+8*k,y+4*k);ctx.fillStyle='#1b1d12';ctx.font=`700 ${12.5*k}px Inter, sans-serif`;ctx.fillText(v,x-w/2+14*k+w0,y+4.5*k)}ctx.restore()};
})();
})();
