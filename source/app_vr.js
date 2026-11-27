(function(){
const $=id=>document.getElementById(id);
const cv=$('cv');const gl=cv.getContext('webgl',{xrCompatible:true,antialias:true,alpha:false});
if(!gl){$('msg').textContent="WebGL n'est pas disponible sur ce navigateur.";return}
const R=buildRoom(THREE);const sc=R.scene;window.__R=R;
// floating label + controllers
const lab=document.createElement('canvas');lab.width=1024;lab.height=256;
const labMesh=new THREE.Mesh(new THREE.PlaneGeometry(64,16),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthWrite:false}));labMesh.visible=false;labMesh.renderOrder=10;sc.add(labMesh);
function setLabel(t1,t2){const g=lab.getContext('2d');g.clearRect(0,0,1024,256);g.fillStyle='rgba(16,16,14,.82)';g.beginPath();g.roundRect(8,8,1008,240,48);g.fill();g.fillStyle='#A4AE6E';g.fillRect(48,64,10,128);
 g.fillStyle='#F6F2E8';g.font='600 84px Inter, -apple-system, sans-serif';g.fillText(t1,90,128);g.font='400 46px Inter, -apple-system, sans-serif';g.fillStyle='rgba(246,242,232,.8)';g.fillText(t2||'',92,200);
 labMesh.material.map=new THREE.CanvasTexture(lab);labMesh.visible=true;labUntil=performance.now()+3500}
let labUntil=0;
// ---------- fiche produit en VR : vise un meuble et serre la poignée ----------
const CAT=window.CATALOG||[],IT={};(window.ITEMS||[]).forEach(d=>IT[d[0]]=d);const STO=window.STORES||{},ZN=window.ZONES||{};
const inf=document.createElement('canvas');inf.width=1024;inf.height=500;
const infMesh=new THREE.Mesh(new THREE.PlaneGeometry(56,27.34),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthWrite:false}));infMesh.visible=false;infMesh.renderOrder=13;sc.add(infMesh);
const selE=[...Array(12)].map(()=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xD8E48A}));m.visible=false;m.renderOrder=12;sc.add(m);return m});
const info={id:null,box:null,until:0};
function pickCat(O,D){let best=null;for(const [b,ids] of CAT){let t0=-1e9,t1=1e9,ok=true;for(let i=0;i<3;i++){const lo=b[i*2],hi=b[i*2+1];if(Math.abs(D[i])<1e-9){if(O[i]<lo||O[i]>hi){ok=false;break}continue}let a=(lo-O[i])/D[i],c=(hi-O[i])/D[i];if(a>c)[a,c]=[c,a];t0=Math.max(t0,a);t1=Math.min(t1,c);if(t0>t1){ok=false;break}}
 if(ok&&t0>0){const v=(b[1]-b[0])*(b[3]-b[2])*(b[5]-b[4]);if(!best||t0<best.t-5||(t0<best.t+5&&v<best.v))best={t:t0,b,ids,v}}}return best}
function drawInfo(ids){const d=IT[ids[0]];if(!d)return;const g=inf.getContext('2d');g.clearRect(0,0,1024,500);g.fillStyle='rgba(16,16,14,.9)';g.beginPath();g.roundRect(6,6,1012,488,44);g.fill();g.strokeStyle='#A4AE6E';g.lineWidth=5;g.stroke();
 const fit=(t,w)=>{t=String(t);if(g.measureText(t).width<=w)return t;while(t.length>3&&g.measureText(t+'…').width>w)t=t.slice(0,-1);return t+'…'};
 g.fillStyle='#C9D19A';g.font='600 34px Inter, -apple-system, sans-serif';g.fillText((STO[d[7]]||d[7]||'').toUpperCase(),48,72);
 g.fillStyle='#F6F2E8';g.font='600 64px Inter, -apple-system, sans-serif';g.fillText(fit(d[1],928),48,148);
 g.fillStyle='rgba(246,242,232,.75)';g.font='400 36px Inter, -apple-system, sans-serif';g.fillText(fit(d[2],928),48,204);
 const q=d[3]||1,p=d[4],e=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:n%1?2:0});
 g.fillStyle='#F6F2E8';g.font='700 76px Inter, -apple-system, sans-serif';const pt=e(p*q);g.fillText(pt,48,300);const pw=g.measureText(pt).width;if(q>1){g.font='400 34px Inter, -apple-system, sans-serif';g.fillStyle='rgba(246,242,232,.7)';g.fillText(q+' × '+e(p),48+pw+28,296)}
 const rest=ids.slice(1).map(i=>IT[i]).filter(Boolean);if(rest.length){g.font='400 32px Inter, -apple-system, sans-serif';g.fillStyle='#C9D19A';g.fillText(fit('Aussi ici : '+rest.map(r=>r[1]).join(', '),928),48,370)}
 // total de la zone dans la liste d'achat (le lien « Dans ma liste » ne s'ouvre pas dans le casque) ; « Plus tard » hors total, comme dans la liste
 {const zi=(window.ITEMS||[]).filter(x=>x[6]===d[6]),zc=zi.filter(x=>x[5]!=='L'),zt=zc.reduce((a,x)=>a+Math.round((x[4]||0)*(x[3]||0)*100)/100,0),zl=zi.filter(x=>x[5]==='L').reduce((a,x)=>a+(x[4]||0)*(x[3]||0),0);
  g.strokeStyle='rgba(164,174,110,.45)';g.lineWidth=2;g.beginPath();g.moveTo(48,400);g.lineTo(976,400);g.stroke();
  g.font='400 32px Inter, -apple-system, sans-serif';g.fillStyle='rgba(246,242,232,.75)';const zt0='Dans ma liste · '+(ZN[d[6]]||d[6]||'')+' : ';g.fillText(fit(zt0,600),48,452);const zw=Math.min(600,g.measureText(zt0).width);
  g.font='700 32px Inter, -apple-system, sans-serif';g.fillStyle='#F6F2E8';const zs=zc.length+' article'+(zc.length>1?'s':'')+' · '+e(zt)+(zl>0?' (+ '+e(Math.round(zl*100)/100)+' plus tard)':'');g.fillText(fit(zs,976-48-zw),48+zw,452)}
 if(infMesh.material.map)V.retex(infMesh.material.map);infMesh.material.map=new THREE.CanvasTexture(inf)}
function placeSel(b){const c=[(b[0]+b[1])/2,(b[2]+b[3])/2,(b[4]+b[5])/2],s=[b[1]-b[0]+2,b[3]-b[2]+2,b[5]-b[4]+2],w=.8;let k=0;
 for(const a of[0,1,2])for(const u of[-1,1])for(const v of[-1,1]){const o=[...c],sz=[w,w,w];sz[a]=s[a]+w;const[i,j]=[0,1,2].filter(q=>q!==a);o[i]+=u*s[i]/2;o[j]+=v*s[j]/2;const m=selE[k++];m.visible=true;m.userData.matrix=m4mul(T4(...o),new Float32Array([sz[0],0,0,0,0,sz[1],0,0,0,0,sz[2],0,0,0,0,1]))}}
function hideInfo(){infMesh.visible=false;selE.forEach(m=>m.visible=false);info.id=null;info.box=null}
window.__info=info;
const ctrlParts=[];const ctrl=[0,1].map(ci=>{const sd=ci?1:-1;const body=new THREE.MeshStandardMaterial({color:0x45464b,roughness:.5,emissive:0x2a2b30,emissiveIntensity:1}),dark=new THREE.MeshStandardMaterial({color:0x111113,roughness:.4}),ring=new THREE.MeshStandardMaterial({color:0x6a6c72,roughness:.3,metalness:.3,emissive:0x2f3036,emissiveIntensity:1});
 const RX=(a)=>{const c=Math.cos(a),s=Math.sin(a);return new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1])};const TT=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);const mm=(a,b)=>{const o=new Float32Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++){let v=0;for(let k=0;k<4;k++)v+=a[k*4+j]*b[i*4+k];o[i*4+j]=v}return o};
 const parts=[[new THREE.CylinderGeometry(1.95,1.6,9.5,18),body,mm(TT(0,-3,1.6),RX(-.42))],[new THREE.CylinderGeometry(3.5,3.3,1.7,24),body,mm(TT(0,2.2,-1.4),RX(.35))],[new THREE.CylinderGeometry(3.6,3.6,.5,24),ring,mm(TT(0,2.9,-1.6),RX(.35))],
  [new THREE.CylinderGeometry(.35,.35,1.1,8),dark,mm(TT(sd*-.9,3.6,-1.4),RX(.35))],[new THREE.CylinderGeometry(.95,.95,.45,16),dark,mm(TT(sd*-.9,4.2,-1.55),RX(.35))],
  [new THREE.CylinderGeometry(.55,.55,.5,12),dark,mm(TT(sd*1.3,3.3,-.6),RX(.35))],[new THREE.CylinderGeometry(.55,.55,.5,12),dark,mm(TT(sd*1.0,3.4,-2.4),RX(.35))],
  [new THREE.BoxGeometry(1.5,1.1,2.4),dark,mm(TT(0,.6,-3.6),RX(.5))]].map(([g,mt,L])=>{const m=new THREE.Mesh(g,mt);m.visible=false;sc.add(m);ctrlParts.push(m);return{m,L}});
 return{parts,mm}});

// ---------- in-VR menu panel ----------
const mc=document.createElement('canvas');mc.width=1024;mc.height=900;const MW=64,MH=56.25;
const menuMesh=new THREE.Mesh(new THREE.PlaneGeometry(MW,MH),new THREE.MeshBasicMaterial({color:0xffffff}));menuMesh.visible=false;menuMesh.renderOrder=11;sc.add(menuMesh);
const rays=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,1),new THREE.MeshBasicMaterial({color:0xC9D19A,transparent:true,opacity:.7,depthWrite:false}));m.visible=false;m.renderOrder=12;sc.add(m);return m});
const dots=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.9,12,8),new THREE.MeshBasicMaterial({color:0xffffff}));m.visible=false;sc.add(m);return m});
const arcDots=[...Array(26)].map(()=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1.1,8,6),new THREE.MeshBasicMaterial({color:0xC9D19A}));m.visible=false;m.renderOrder=12;sc.add(m);return m});
const ring=new THREE.Mesh(new THREE.CylinderGeometry(16,16,.5,28),new THREE.MeshBasicMaterial({color:0xA4AE6E,transparent:true,opacity:.65,depthWrite:false}));ring.visible=false;ring.renderOrder=12;sc.add(ring);
const vigT=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.36,'rgba(0,0,0,0)');gr.addColorStop(.72,'rgba(0,0,0,.9)');gr.addColorStop(1,'rgba(0,0,0,1)');g.fillStyle=gr;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
const vig=new THREE.Mesh(new THREE.PlaneGeometry(32,32),new THREE.MeshBasicMaterial({color:0xffffff,map:vigT,transparent:true,opacity:0,depthWrite:false}));vig.visible=false;vig.renderOrder=20;sc.add(vig);let vigA=0,vigOn=true,turnK=0;
const tele={on:false,hit:null,ok:false};const BLOCK=[[0,205,265,433],[185,355,0,84],[314,360,293,425],[314,360,196,281],[89,187,0,42],[0,40,218,272],[0,86,8,26]];window.__tele=tele;let seat=false,yBase=0,fpsS=72,fpsT=0;
window.__menuRef=()=>menu;const menu={open:false,hover:null,C:[0,0,0],N:[0,0,1],Rx:[1,0,0],btns:[]};
(function(){const B=[];const names=['Nuit cosy','Jour','Coucher de soleil','Soir chaud','Gaming','Fête','Ciné Ambilight'];names.forEach((n,i)=>B.push({id:'m'+i,x:48+(i%2)*474,y:150+Math.floor(i/2)*100,w:454,h:84,t:n}));
 B.push({id:'auto',x:522,y:450,w:454,h:84,t:'Défilé auto'});B.push({id:'home',x:48,y:566,w:454,h:84,t:'Revenir au départ'});B.push({id:'seat',x:522,y:566,w:454,h:84,t:'Mode assis'});B.push({id:'close',x:48,y:672,w:454,h:84,t:'Fermer le menu'});B.push({id:'vig',x:522,y:672,w:454,h:84,t:'Confort : oui'});B.push({id:'mes',x:48,y:778,w:454,h:84,t:'Afficher les mesures'});B.push({id:'tvs',x:522,y:778,w:454,h:84,t:'TV : 65 pouces'});menu.btns=B})();
menu.draw=function(){const g=mc.getContext('2d');g.fillStyle='#16150f';g.fillRect(0,0,1024,900);g.strokeStyle='#A4AE6E';g.lineWidth=6;g.strokeRect(3,3,1018,894);
 g.fillStyle='#F6F2E8';g.font='600 60px Inter, -apple-system, sans-serif';g.fillText('Ma chambre',48,92);g.font='400 30px Inter, -apple-system, sans-serif';g.fillStyle='rgba(246,242,232,.65)';g.font='400 25px Inter, -apple-system, sans-serif';g.fillText('Gâchette : choisir · stick droit en avant : téléportation · poignée : fiche',48,128);
 for(const b of this.btns){const cur=(b.id==='m'+mi)||(b.id==='auto'&&auto)||(b.id==='seat'&&seat)||(b.id==='mes'&&mesOn)||(b.id==='vig'&&vigOn),hov=this.hover===b.id;g.fillStyle=cur?'#A4AE6E':hov?'rgba(255,255,255,.22)':'rgba(255,255,255,.08)';g.beginPath();g.roundRect(b.x,b.y,b.w,b.h,24);g.fill();
  if(hov){g.strokeStyle='#F6F2E8';g.lineWidth=4;g.stroke()}g.fillStyle=cur?'#1b1d12':'#F6F2E8';g.font='500 40px Inter, -apple-system, sans-serif';const t=b.id==='auto'&&auto?'Arrêter le défilé':b.id==='seat'&&seat?'Mode assis : oui':b.id==='mes'&&mesOn?'Cacher les mesures':b.id==='vig'?(vigOn?'Confort : oui':'Confort : non'):b.t;g.fillText(t,b.x+32,b.y+60)}
 g.font='500 34px Inter, -apple-system, sans-serif';const fc=fpsS>=68?'#A4AE6E':fpsS>=55?'#D8A42C':'#E0704A';g.fillStyle=fc;g.beginPath();g.arc(700,80,11,0,7);g.fill();g.fillStyle='rgba(246,242,232,.8)';g.font='400 30px Inter, -apple-system, sans-serif';g.fillText(Math.round(fpsS)+' images/s',722,91);
 if(menuMesh.material.map)V.retex(menuMesh.material.map);menuMesh.material.map=new THREE.CanvasTexture(mc)};
menu.place=function(hp,hm){const H=toRoom(hp);const f=rot([-hm[8],0,-hm[10]]);const fl=Math.hypot(f[0],f[2])||1;const fx=f[0]/fl,fz=f[2]/fl;this.C=[H[0]+fx*65,H[1]-20,H[2]+fz*65];const a=Math.atan2(-fx,-fz);this.N=[Math.sin(a),0,Math.cos(a)];this.Rx=[Math.cos(a),0,-Math.sin(a)];
 menuMesh.userData.matrix=m4mul(T4(...this.C),Ry(a))};
menu.toggle=function(hp,hm){this.open=!this.open;menuMesh.visible=this.open;if(this.open){this.place(hp,hm);this.draw();labMesh.visible=false}};
menu.hit=function(O,D){const dn=D[0]*this.N[0]+D[1]*this.N[1]+D[2]*this.N[2];if(dn>-1e-4)return null;const t=((this.C[0]-O[0])*this.N[0]+(this.C[1]-O[1])*this.N[1]+(this.C[2]-O[2])*this.N[2])/dn;if(t<0)return null;
 const Hh=[O[0]+D[0]*t-this.C[0],O[1]+D[1]*t-this.C[1],O[2]+D[2]*t-this.C[2]];const u=Hh[0]*this.Rx[0]+Hh[2]*this.Rx[2],v=Hh[1];if(Math.abs(u)>MW/2||Math.abs(v)>MH/2)return null;
 const px=(u/MW+.5)*1024,py=(.5-v/MH)*900;const b=this.btns.find(b=>px>=b.x&&px<=b.x+b.w&&py>=b.y&&py<=b.y+b.h);return{t,btn:b?b.id:null}};
menu.click=function(id){if(id==='tvs'){setTv({65:75,75:85,85:65}[R.tvSize]||65);this.draw();return}if(id[0]==='m'&&id!=='m'){setAuto(false);setMode(+id.slice(1),false)}else if(id==='auto')setAuto(!auto);else if(id==='home')resetPos();else if(id==='vig'){vigOn=!vigOn}else if(id==='seat'){seat=!seat;yOff=yBase+(seat?45:0)}else if(id==='mes'){setMes(!mesOn)}else if(id==='close'){this.open=false;menuMesh.visible=false}this.draw()};
const RD={updateShadows:(s,sd)=>V.updateShadows(sd)};
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
const SCHED=[[0,'DAY'],[29,'DAY'],[33,'GOLD'],[36.5,'EVE'],[39,'EVE'],[40.5,'GAME'],[43.5,'GAME'],[44.6,'FETE'],[47.6,'FETE'],[49.2,'EVE']];
const getS=(n,t)=>n=='DAY'?DAY:n=='GOLD'?GOLD:n=='EVE'?EVE:n=='GAME'?GAME:FETE(t);
function stateAt(t){for(let i=0;i<SCHED.length-1;i++){const[a,na]=SCHED[i],[b,nb]=SCHED[i+1];if(t<b)return blend(getS(na,t),getS(nb,t),ss(0,1,(t-a)/(b-a)))}return getS(SCHED[SCHED.length-1][1],t)}

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
// ---------- mesures en VR (mêmes cotes que le plan 3D) ----------
let mesOn=false;const MES=(window.MESURES||[]).map(m=>{const[a,b,c,d,e,f,n]=m;const L=Math.hypot(d-a,e-b,f-c);const pas=/passage/i.test(n);
 const ax=Math.abs(d-a)>.5?0:Math.abs(e-b)>.5?1:2;const sz=[1,1,1];sz[ax]=L;const bar=new THREE.Mesh(new THREE.BoxGeometry(...sz),new THREE.MeshBasicMaterial({color:pas?0xF6F2E8:0xD8E48A}));bar.position.set((a+d)/2,(b+e)/2,(c+f)/2);bar.visible=false;sc.add(bar);
 const cv2=document.createElement('canvas');cv2.width=512;cv2.height=128;const g=cv2.getContext('2d');const txt=L>=300?(L/100).toFixed(2).replace('.',',')+' m':Math.round(L)+' cm';
 g.font='600 54px Inter, -apple-system, sans-serif';const w1=g.measureText(txt).width;g.font='500 40px Inter, -apple-system, sans-serif';const w0=g.measureText(n).width;const W=Math.min(500,w0+w1+70);
 g.fillStyle=pas?'#F6F2E8':'#D8E48A';g.beginPath();g.roundRect((512-W)/2,14,W,100,50);g.fill();g.fillStyle='rgba(27,29,18,.75)';g.fillText(n,(512-W)/2+26,80);g.fillStyle='#1b1d12';g.font='600 54px Inter, -apple-system, sans-serif';g.fillText(txt,(512-W)/2+26+w0+18,84);
 const lab=new THREE.Mesh(new THREE.PlaneGeometry(32,8),new THREE.MeshBasicMaterial({color:0xffffff,map:new THREE.CanvasTexture(cv2),transparent:true,depthWrite:false}));lab.visible=false;lab.renderOrder=11;sc.add(lab);
 return{bar,lab,p:[(a+d)/2,(b+e)/2+7,(c+f)/2]}});
function setMes(v){mesOn=v;MES.forEach(m=>{m.bar.visible=v;m.lab.visible=v})}
window.__setMes=setMes;
const dyn=new Set([...R.tvGrp.children,...MES.map(m=>m.bar),...MES.map(m=>m.lab),vig,R.platter,R.label,labMesh,infMesh,...selE,menuMesh,...rays,...dots,...arcDots,ring,...ctrlParts,...R.shafts,...R.dust]);
[...Object.values(R.G).flat().map(m=>m.material),...(R.echoScreen?[R.echoScreen.material]:[]),...(R.strips||[]).map(o=>o.m.material),...Object.values(R.ambiPads).map(m=>m.material),R.screens.tv.material,R.screens.mon.material,...R.flames.map(m=>m.material),...R.cityLit.map(m=>m.material),...R.out.map(m=>m.material),
 R.sky.material,R.skyN.material,R.moon.material,R.moonHalo.material,R.tree.material,R.tree2.material,R.pend,R.arcBulb,R.nsShade,R.fado,R.dlBulb,...R.pcFans.map(m=>m.material),R.pcIn.material,R.ceil.material].forEach(m=>dyn.add(m));
[R.sky,R.skyN,R.moon,R.moonHalo,R.tree,R.tree2,R.ceil].forEach(o=>dyn.add(o));
const V=makeVRRenderer(gl,sc,dyn);
// taille de la TV (65, 75 ou 85 pouces) : bouton du menu, gardée d'une visite à l'autre
function setTv(n){R.setTvSize(n);const b=menu.btns.find(b=>b.id==='tvs');if(b)b.t='TV : '+n+' pouces';try{localStorage.setItem('tvSize2',String(n))}catch(e){}}
{const b=menu.btns.find(b=>b.id==='tvs');if(b)b.t='TV : '+R.tvSize+' pouces'}
try{const n=+localStorage.getItem('tvSize2');if([65,75,85].includes(n))setTv(n)}catch(e){}
window.__setTv=setTv;const ambiUp=makeAmbi(R,THREE);window.__V=V;
const MODES=[['cosy','Nuit cosy',()=>COSY],['jour','Jour',()=>DAY],['coucher','Coucher de soleil',()=>GOLD],['soir','Soir chaud',()=>EVE],['gaming','Gaming néon',()=>GAME],['fete','Fête',t=>FETE(t)],['cine','Ciné Ambilight',()=>CINE]];
let mi=0,from=COSY,blendT=1,cur=COSY,el=0;
function setMode(i,show){mi=(i+MODES.length)%MODES.length;if(R.echoSet)R.echoSet(MODES[mi][0]);if(typeof menu!=='undefined'&&menu.open){menu.draw();show=false}from=cur;blendT=0;document.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on',+b.dataset.m===mi));if(show)setLabel(MODES[mi][1],'A : ambiance suivante · B : précédente')}
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(auto)setAuto(false);setMode(+b.dataset.m,false)});
let auto=false,autoT=0;function setAuto(on){auto=on;autoT=0;const b=document.getElementById('auto');if(b){b.classList.toggle('on',on);b.textContent=on?'Arrêter le défilé':'Défilé de toutes les ambiances'}if(!menu.open)setLabel(on?'Défilé auto activé':'Défilé auto arrêté',on?'Une nouvelle ambiance toutes les 7 s':'Gâchette gauche : relancer');else menu.draw()}
document.getElementById('auto').onclick=()=>setAuto(!auto);
function step(dt){el+=dt;if(auto){autoT+=dt;if(autoT>7){autoT=0;setMode(mi+1,true)}}blendT=Math.min(1,blendT+dt/1.2);const s=blend(from,MODES[mi][2](el),ss(0,1,blendT));cur=s;apply(s,el);ambiUp(s,el);R.dust.forEach(d=>d.visible=false);
 if(labMesh.visible&&performance.now()>labUntil)labMesh.visible=false;if(info.id&&performance.now()>info.until)hideInfo();V.begin(s.expo);return s}
// ---------- room <-> XR transforms ----------
const P={x:240,z:170};window.__P=P;let th=Math.atan2(120,-170);
const Ry=a=>{const c=Math.cos(a),s=Math.sin(a);return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1])};
const T4=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]),S4=k=>new Float32Array([k,0,0,0,0,k,0,0,0,0,k,0,0,0,0,1]);
let yOff=0;const W2M=()=>m4mul(S4(.01),m4mul(Ry(-th),T4(-P.x,-yOff,-P.z))),M2W=()=>m4mul(T4(P.x,yOff,P.z),m4mul(Ry(th),S4(100)));
const rot=(v)=>{const c=Math.cos(th),s=Math.sin(th);return[c*v[0]+s*v[2],v[1],-s*v[0]+c*v[2]]};
const toRoom=p=>{const r=rot([p.x*100,p.y*100,p.z*100]);return[P.x+r[0],r[1]+yOff,P.z+r[2]]};
function resetPos(){P.x=240;P.z=170;th=Math.atan2(120,-170)}
// ---------- XR ----------
let session=null,ref=null;const prevB={left:[],right:[]};let snapLatch=false;
async function enterVR(){try{session=await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor']});
 await gl.makeXRCompatible();const layer=new XRWebGLLayer(session,gl,{framebufferScaleFactor:.9,antialias:true});try{layer.fixedFoveation=1}catch(e){}session.updateRenderState({baseLayer:layer,depthNear:.04,depthFar:40});
 try{ref=await session.requestReferenceSpace('local-floor');yBase=0}catch(e){ref=await session.requestReferenceSpace('local');yBase=160}yOff=yBase+(seat?45:0);
 session.addEventListener('end',()=>{session=null;$('vr').textContent='Entrer en VR';requestAnimationFrame(loop)});$('vr').textContent='Quitter la VR';menu.pendingOpen=true;session.requestAnimationFrame(xrFrame)}
 catch(e){$('msg').textContent='Impossible de lancer la VR : '+e.message}}
let lastT=0;
function xrFrame(t,frame){session.requestAnimationFrame(xrFrame);const rdt=lastT?(t-lastT)/1000:.014;const dt=Math.min(rdt,.05);lastT=t;if(rdt>0&&rdt<1)fpsS=fpsS*.95+(1/rdt)*.05;fpsT+=dt;if(fpsT>1){fpsT=0;if(menu.open)menu.draw()}
 const pose=frame.getViewerPose(ref);if(!pose)return;const hm=pose.transform.matrix,hp=pose.transform.position;if(menu.pendingOpen){menu.pendingOpen=false;menu.open=false;menu.toggle(hp,hm)}
 // input
 const w2r=M2W();let anyHit=false;
 for(const src of session.inputSources){const gp=src.gamepad;if(!gp)continue;const hd=src.handedness;const b=gp.buttons.map(x=>x.pressed);const pb=prevB[hd]||[];const pr=i=>b[i]&&!pb[i];
  const ax=gp.axes.length>=4?[gp.axes[2],gp.axes[3]]:[gp.axes[0]||0,gp.axes[1]||0];const ci=hd==='left'?0:1;
  // ray vs menu panel
  let hitBtn=null;const rp=src.targetRaySpace&&frame.getPose(src.targetRaySpace,ref);
  let M=null,O=null,D=null;if(rp){M=m4mul(w2r,rp.transform.matrix);O=[M[12],M[13],M[14]];D=[-M[8],-M[9],-M[10]];const dl=Math.hypot(...D);D=D.map(x=>x/dl)}
  if(rp&&menu.open){
   const h=menu.hit(O,D);let L=200;if(h){L=h.t;hitBtn=h.btn;anyHit=true;if(hitBtn!==menu.hover){menu.hover=hitBtn;menu.draw()}}
   rays[ci].visible=true;rays[ci].userData.matrix=m4mul(m4mul(M,S4(.01)),new Float32Array([1,0,0,0,0,1,0,0,0,0,L,0,0,0,-L/2,1]));
   if(h){dots[ci].visible=true;dots[ci].userData.matrix=T4(O[0]+D[0]*L,O[1]+D[1]*L,O[2]+D[2]*L)}else dots[ci].visible=false}
  else if(rp&&b[1]&&!tele.on){const h=pickCat(O,D);const L=h?h.t:250;anyHit=anyHit||!!h;
   rays[ci].visible=true;rays[ci].userData.matrix=m4mul(m4mul(M,S4(.01)),new Float32Array([1,0,0,0,0,1,0,0,0,0,L,0,0,0,-L/2,1]));
   if(h){dots[ci].visible=true;dots[ci].userData.matrix=T4(O[0]+D[0]*L,O[1]+D[1]*L,O[2]+D[2]*L);const key=h.ids.join();if(key!==info.id){info.id=key;info.box=h.b;drawInfo(h.ids);placeSel(h.b)}
    const Hh=toRoom(hp);const to=[O[0]+D[0]*L-Hh[0],0,O[2]+D[2]*L-Hh[2]];const tl=Math.hypot(to[0],to[2])||1;const k=Math.min(70,tl*.7);infMesh.userData.matrix=m4mul(T4(Hh[0]+to[0]/tl*k,Hh[1]-10,Hh[2]+to[2]/tl*k),Ry(Math.atan2(-to[0]/tl,-to[2]/tl)));infMesh.visible=true;info.until=performance.now()+5000}
   else dots[ci].visible=false}
  else{rays[ci].visible=false;dots[ci].visible=false}
  if(menu.open&&hitBtn&&pr(0)){menu.click(hitBtn)}
  else if(hd==='left'){window.__lmag=Math.hypot(ax[0],ax[1]);if(Math.hypot(ax[0],ax[1])>.15){const f=[-hm[8],0,-hm[10]],r=[hm[0],0,hm[2]];const fl=Math.hypot(f[0],f[2])||1,rl=Math.hypot(r[0],r[2])||1;const mv=[(f[0]/fl)*-ax[1]+(r[0]/rl)*ax[0],0,(f[2]/fl)*-ax[1]+(r[2]/rl)*ax[0]];const w=rot(mv);P.x+=w[0]*140*dt;P.z+=w[2]*140*dt}
   if(pr(4))resetPos();if(pr(0)&&!menu.open)setAuto(!auto);if(pr(5))menu.toggle(hp,hm)}
  else{if(ax[1]<-.6&&rp&&!menu.open){tele.on=true;tele.hit=null;const v=[D[0]*560,D[1]*560,D[2]*560];let q=O,n=0;
    for(let i=1;i<60;i++){const t=i*.03;const p=[O[0]+v[0]*t,O[1]+v[1]*t-490*t*t,O[2]+v[2]*t];
     if(p[0]<6||p[0]>354||p[2]<6||p[2]>454||p[1]>248){tele.hit=[Math.max(20,Math.min(340,q[0])),0,Math.max(20,Math.min(440,q[2]))];break}
     if(p[1]<=0){const f=q[1]/(q[1]-p[1]);const x=q[0]+(p[0]-q[0])*f,z=q[2]+(p[2]-q[2])*f;tele.hit=[Math.max(20,Math.min(340,x)),0,Math.max(20,Math.min(440,z))];break}
     q=p;if(n<arcDots.length){arcDots[n].visible=true;arcDots[n].userData.matrix=T4(p[0],p[1],p[2]);n++}}
    for(let k=n;k<arcDots.length;k++)arcDots[k].visible=false;
    ring.visible=!!tele.hit;tele.ok=false;if(tele.hit){const[hx,,hz]=tele.hit;tele.ok=!BLOCK.some(b=>hx>b[0]&&hx<b[1]&&hz>b[2]&&hz<b[3]);ring.material.color.set(tele.ok?0xA4AE6E:0xD0583A);arcDots.forEach(d=>d.material.color.set(tele.ok?0xC9D19A:0xE07a5a));ring.userData.matrix=T4(hx,tele.ok?1:80,hz)}}
   else if(tele.on&&ax[1]>-.3){tele.on=false;if(tele.hit&&tele.ok){const H=toRoom(hp);P.x+=tele.hit[0]-H[0];P.z+=tele.hit[2]-H[2]}arcDots.forEach(d=>d.visible=false);ring.visible=false}
   if(Math.abs(ax[0])>.7&&!snapLatch&&!tele.on){snapLatch=true;turnK=1;const H=toRoom(hp);th+=ax[0]>0?-Math.PI/6:Math.PI/6;const r=rot([hp.x*100,0,hp.z*100]);P.x=H[0]-r[0];P.z=H[2]-r[2];if(menu.open)menu.place(hp,hm)}if(Math.abs(ax[0])<.3)snapLatch=false;
   if((pr(0)&&!menu.open)||pr(4)){setAuto(false);setMode(mi+1,true)}if(pr(5)){setAuto(false);setMode(mi-1,true)}}
  prevB[hd]=b;
  const gs=src.gripSpace&&frame.getPose(src.gripSpace,ref);const cr=ctrl[ci];if(gs){const base=m4mul(w2r,m4mul(gs.transform.matrix,S4(.01)));cr.parts.forEach(p=>{p.m.visible=true;p.m.userData.matrix=m4mul(base,p.L)})}else cr.parts.forEach(p=>p.m.visible=false)}
 if(!anyHit&&menu.hover){menu.hover=null;menu.draw()}
 // keep head inside the room
 const H=toRoom(hp);const cx=Math.max(12,Math.min(348,H[0])),cz=Math.max(12,Math.min(448,H[2]));P.x+=cx-H[0];P.z+=cz-H[2];
 // label in front of head
 if(labMesh.visible){const Hh=toRoom(hp);const f=rot([-hm[8],0,-hm[10]]);const fl=Math.hypot(f[0],f[2])||1;labMesh.userData.matrix=m4mul(T4(Hh[0]+f[0]/fl*75,Hh[1]-12,Hh[2]+f[2]/fl*75),Ry(Math.atan2(-f[0]/fl,-f[2]/fl)))}
 {const mv=Math.max(Math.min(1,((window.__lmag||0)-.15)/.6),turnK);turnK=Math.max(0,turnK-dt*3);const tg=vigOn?mv:0;vigA+=(tg-vigA)*Math.min(1,dt*(tg>vigA?10:4));vig.visible=vigA>.02;vig.material.opacity=vigA;
  if(vig.visible)vig.userData.matrix=m4mul(m4mul(w2r,hm),new Float32Array([.01,0,0,0,0,.01,0,0,0,0,.01,0,0,0,-.12,1]))}
 if(mesOn){const Hh=toRoom(hp);MES.forEach(m=>{const dx=Hh[0]-m.p[0],dz=Hh[2]-m.p[2];const k=Math.max(1,Math.hypot(dx,dz)/110);m.lab.userData.matrix=m4mul(m4mul(T4(...m.p),Ry(Math.atan2(dx,dz))),S4(k))})}
 const s=step(dt);R.ceil.visible=true;
 const layer=session.renderState.baseLayer;gl.bindFramebuffer(gl.FRAMEBUFFER,layer.framebuffer);gl.clearColor(s.sky[0]*.2,s.sky[1]*.2,s.sky[2]*.25,1);gl.disable(gl.SCISSOR_TEST);gl.depthMask(true);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 const w2m=W2M();for(const view of pose.views){const vp=layer.getViewport(view);const VP=m4mul(view.projectionMatrix,m4mul(view.transform.inverse.matrix,w2m));V.drawView(VP,toRoom(view.transform.position),[vp.x,vp.y,vp.width,vp.height])}}
// ---------- flat preview (phone / PC) ----------
let yaw=th,pitch=-.08;const eye={x:250,y:160,z:110};let drag=null;
cv.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(!drag)return;yaw+=(e.clientX-drag.x)*.005;pitch=Math.max(-1.3,Math.min(1.3,pitch+(e.clientY-drag.y)*.005));drag={x:e.clientX,y:e.clientY}});
cv.addEventListener('pointerup',()=>drag=null);cv.addEventListener('pointercancel',()=>drag=null);
let last=performance.now();
function loop(){if(session)return;requestAnimationFrame(loop);const now=performance.now();const dt=Math.min((now-last)/1000,.05);last=now;
 const pr=Math.min(devicePixelRatio||1,1.5);const w=Math.round(cv.clientWidth*pr),h=Math.round(cv.clientHeight*pr);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}
 const s=step(dt);R.ceil.visible=true;gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.clearColor(.05,.05,.07,1);gl.depthMask(true);gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 const d=[-Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];const VP=m4mul(persp(70,w/h,4,3000),look(eye,{x:eye.x+d[0],y:eye.y+d[1],z:eye.z+d[2]}));V.drawView(VP,[eye.x,eye.y,eye.z],[0,0,w,h]);
 if(window.__onframe)window.__onframe()}
// ---------- start ----------
const framed=(()=>{try{return window.self!==window.top}catch(e){return true}})();const isQuest=/OculusBrowser|Quest/i.test(navigator.userAgent);
function blockedMsg(){return isQuest&&framed?"Ton Quest sait faire de la VR, mais la page Claude la bloque. Utilise la version mise en ligne sur Cloudflare.":isQuest?"La VR n'est pas disponible. Vérifie que la page est en https.":"Ce navigateur n'a pas de mode VR. Ouvre cette page dans le navigateur du Quest."}
setMode(0,false);
if(navigator.xr&&navigator.xr.isSessionSupported){navigator.xr.isSessionSupported('immersive-vr').then(ok=>{if(ok){$('vr').disabled=false;$('vr').onclick=()=>{if(session)session.end();else enterVR()};$('msg').textContent='Mets ton casque et appuie sur « Entrer en VR ».'}else $('msg').textContent=blockedMsg()}).catch(()=>$('msg').textContent=blockedMsg())}
else $('msg').textContent="Ce navigateur n'a pas de mode VR. Ouvre cette page dans le navigateur du Quest.";
loop();
})();
