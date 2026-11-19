const WID=window.VW||1920,HEI=window.VH||1080;
const R=buildRoom(THREE);const sc=R.scene;
const cam=new THREE.PerspectiveCamera(55,WID/HEI,5,2500);
const glc=document.createElement('canvas');glc.width=WID;glc.height=HEI;const RD=makeRenderer(glc);
const out=document.createElement('canvas');out.width=WID;out.height=HEI;document.body.appendChild(out);const g2=out.getContext('2d');
const hex=h=>[((h>>16)&255)/255,((h>>8)&255)/255,(h&255)/255];
const mix=(a,b,t)=>a+(b-a)*t,mixc=(a,b,t)=>[mix(a[0],b[0],t),mix(a[1],b[1],t),mix(a[2],b[2],t)];
const cl=(x,a,b)=>Math.max(a,Math.min(b,x)),ss=(a,b,x)=>{const t=cl((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function hsl(h,s,l){const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return[f(0),f(8),f(4)]}
const LN=['pend','arc','ns','fado','desk','shelf','bed','head','tv','tvs','mon','pc','sneak','spot'];
const GN=['bedLed','headLed','tvLed','monGlow','pc','shelf','sneak'];
function st(o){const s={sunI:0,sunC:hex(0xfff0dc),elev:40,az:-17,ambI:.12,skyC:hex(0x8a96b8),gndC:hex(0x3a3040),sky:hex(0x26314f),expo:1.25,
L:{},G:{},em:{pend:.05,arc:.05,ns:0,fado:.05,dl:0},tv:0,mon:0,shaft:0,dust:0,pcIn:hex(0)};LN.forEach(k=>s.L[k]=[hex(0xffd8a0),0]);GN.forEach(k=>s.G[k]=hex(0));
for(const k in o){if(k=='L'||k=='G'||k=='em')Object.assign(s[k],o[k]);else s[k]=o[k]}return s}
const amber=hex(0xff8a2a),warm=hex(0xffcf94);
const DAY=st({pcIn:mixc([0,0,0],hex(0x8a3dff),.7),sunI:2.0,sunC:hex(0xfff1dc),elev:38,ambI:.62,skyC:hex(0xfff7ec),gndC:hex(0xa58b70),sky:hex(0xffffff),expo:1.05,mon:.95,shaft:.07,dust:1,
 L:{mon:[hex(0x8f7dff),.25],spot:[hex(0xfff3dc),.15]},G:{monGlow:mixc([0,0,0],hex(0x6a5cff),.25)}});
const GOLD=st({sunI:1.35,sunC:hex(0xffa860),elev:16,az:-30,ambI:.32,skyC:hex(0xffd0a0),gndC:hex(0x8a6448),sky:hex(0xffb488),expo:1.0,mon:.9,shaft:.07,dust:.9,pcIn:mixc([0,0,0],hex(0x8a3dff),.7),
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
function blend(a,b,t){if(t<=0)return a;if(t>=1)return b;const s=st({});for(const k in a){if(k=='L'){for(const n of LN)s.L[n]=[mixc(a.L[n][0],b.L[n][0],t),mix(a.L[n][1],b.L[n][1],t)]}else if(k=='G'){for(const n of GN)s.G[n]=mixc(a.G[n],b.G[n],t)}else if(k=='em'){for(const n in a.em)s.em[n]=mix(a.em[n],b.em[n],t)}else if(Array.isArray(a[k]))s[k]=mixc(a[k],b[k],t);else s[k]=mix(a[k],b[k],t)}return s}
const SCHED=[[0,'DAY'],[29,'DAY'],[33,'GOLD'],[36.5,'EVE'],[39,'EVE'],[40.5,'GAME'],[43.5,'GAME'],[44.6,'FETE'],[47.6,'FETE'],[49.2,'EVE']];
const getS=(n,t)=>n=='DAY'?DAY:n=='GOLD'?GOLD:n=='EVE'?EVE:n=='GAME'?GAME:FETE(t);
function stateAt(t){for(let i=0;i<SCHED.length-1;i++){const[a,na]=SCHED[i],[b,nb]=SCHED[i+1];if(t<b)return blend(getS(na,t),getS(nb,t),ss(0,1,(t-a)/(b-a)))}return getS(SCHED[SCHED.length-1][1],t)}
const setC=(c,v)=>{c.r=v[0];c.g=v[1];c.b=v[2]};let lastSun='';
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
R.platter.rotation.y=t*3.49;R.label.rotation.y=t*3.49;
const pc=mixc(s.pcIn,[0,0,0],0);R.pcFans.forEach((f,i)=>setC(f.material.color,mixc([0,0,0],pc,1.3+.3*Math.sin(t*4+i))));setC(R.pcIn.material.color,mixc([0,0,0],pc,.5));
return s}
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
// ---------- captions ----------
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
function easeOut(x){return 1-Math.pow(1-x,3)}
function drawCap(t){for(const[a,b,lab,ti,sub]of CAP){if(t<a||t>b)continue;const fi=ss(a,a+.6,t),fo=1-ss(b-.5,b,t),al=Math.min(fi,fo),dx=(1-easeOut(fi))*-40;
 const X=110+dx,Y=1080-230;g2.save();g2.globalAlpha=al;const grd=g2.createLinearGradient(0,1080-380,0,1080);grd.addColorStop(0,'rgba(0,0,0,0)');grd.addColorStop(1,'rgba(0,0,0,.55)');g2.fillStyle=grd;g2.fillRect(0,1080-380,1920,380);
 g2.fillStyle='#A4AE6E';g2.fillRect(X,Y-6,6,sub?128:96);g2.font='600 22px Inter';g2.fillStyle='#C9D19A';g2.fillText(lab.split('').join(String.fromCharCode(8202)),X+28,Y+18);
 g2.font='600 56px "Inter Display", Inter';g2.fillStyle='#F6F2E8';g2.fillText(ti,X+26,Y+80);if(sub){g2.font='400 28px Inter';g2.fillStyle='rgba(246,242,232,.82)';g2.fillText(sub,X+28,Y+122)}g2.restore()}}
function drawTitle(t){const a=ss(.3,1.4,t)*(1-ss(3.0,3.8,t));if(a<=0)return;g2.save();g2.globalAlpha=a;g2.fillStyle='rgba(10,10,10,.45)';g2.fillRect(0,0,1920,1080);g2.textAlign='center';
 g2.font='200 30px Inter';g2.fillStyle='#C9D19A';g2.fillText('V I S I T E   3 D',1920/2,1080/2-90);g2.font='700 120px "Inter Display", Inter';g2.fillStyle='#F6F2E8';g2.fillText('Ma chambre',1920/2,1080/2+30);
 g2.font='300 34px Inter';g2.fillStyle='rgba(246,242,232,.85)';g2.fillText('Noir & olive  ·  setup gaming  ·  13 m²',1920/2,1080/2+95);g2.fillStyle='#A4AE6E';g2.fillRect(1920/2-40,1080/2+125,80,4);g2.restore()}
function drawEnd(t){const a=ss(52.4,53.2,t);if(a<=0)return;g2.save();g2.globalAlpha=a;g2.fillStyle='rgba(10,10,10,.6)';g2.fillRect(0,0,1920,1080);g2.textAlign='center';
 g2.font='700 92px "Inter Display", Inter';g2.fillStyle='#F6F2E8';g2.fillText('Ma chambre',1920/2,1080/2-10);g2.font='300 34px Inter';g2.fillStyle='rgba(246,242,232,.85)';g2.fillText('Liste d\'achat complète dans l\'app « Ma chambre cosy »',1920/2,1080/2+60);g2.restore()}
function renderAt(t){const s=stateAt(t);apply(s,t);const c=camAt(t);cam.position.set(c.p[0],c.p[1],c.p[2]);cam.lookAt(new THREE.Vector3(c.q[0],c.q[1],c.q[2]));cam.fov=c.f;
const top=cam.position.y>255;ce_vis(!top);
const fade=ss(0,.9,t)*(1-ss(53.8,54.5,t));
RD.render(sc,cam,{expo:s.expo,bloom:.22+.4*(1-cl(s.sunI/1.5,0,1)),thr:.78,time:t,vig:.38,fade,bg:[s.sky[0]*.6,s.sky[1]*.6,s.sky[2]*.65]});
g2.drawImage(glc,0,0);g2.save();g2.scale(WID/1920,HEI/1080);drawTitle(t);drawCap(t);drawEnd(t);g2.restore();
const bar=Math.round(HEI*.055);g2.fillStyle='#000';g2.fillRect(0,0,WID,bar);g2.fillRect(0,HEI-bar,WID,bar);
return window.NOJPG?'x,':out.toDataURL('image/jpeg',.92)}
function ce_vis(v){R.ceil.visible=v}
window.TOTAL=TOTAL;window.renderAt=renderAt;
