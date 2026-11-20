// Shared room builder: works with real three.js r128 and with the offline shim.
// Units: cm. x = east (0-360), z = south (0-360), y = up.
function buildRoom(THREE){
const sc=new THREE.Scene();
const C={wall:0xF3F1EC,ceil:0xF7F6F2,bn:0x2C2623,olive:0x6E7547,oliveD:0x4F5633,beige:0xDCCDB0,jaune:0xD8A42C,anth:0x3B3D40,black:0x161515,white:0xF4F2EC,brass:0xC6A253,cream:0xEDE5D3,green:0x456F38,green2:0x5E8C45,pot:0xB9B2A6,oak:0x5B3E29};
const RW=THREE.RepeatWrapping;
function M(c,o){return new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85,metalness:0},o||{}))}
function MB(c,o){return new THREE.MeshBasicMaterial(Object.assign({color:c},o||{}))}
function add(m,p){(p||sc).add(m);m.castShadow=true;m.receiveShadow=true;return m}
function mat(c){return c&&c.isMaterial?c:M(c)}
function B(x0,x1,y0,y1,z0,z1,c,p){const m=new THREE.Mesh(new THREE.BoxGeometry(x1-x0,y1-y0,z1-z0),mat(c));m.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);return add(m,p)}
function Cy(x,z,y0,y1,r,c,r2,seg,p){const m=new THREE.Mesh(new THREE.CylinderGeometry(r2==null?r:r2,r,y1-y0,seg||24),mat(c));m.position.set(x,(y0+y1)/2,z);return add(m,p)}
function S(x,y,z,r,c,sx,sy,sz,p,seg){const m=new THREE.Mesh(new THREE.SphereGeometry(r,seg||20,seg?Math.round(seg*.7):14),mat(c));m.position.set(x,y,z);m.scale.set(sx||1,sy||1,sz||1);return add(m,p)}
function T(w,h,f,rx,ry){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=RW;t.repeat.set(rx||1,ry||1);return t}
function P(w,h,mt,x,y,z,ry,rx,p){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mt);m.position.set(x,y,z);m.rotation.y=ry||0;m.rotation.x=rx||0;return add(m,p)}
function W(s,a0,a1,y0,y1,c){const a=(a0+a1)/2,y=(y0+y1)/2;const r={N:[a,y,0,0],S:[a,y,360,Math.PI],W:[0,y,a,Math.PI/2],E:[360,y,a,-Math.PI/2]}[s];const w=P(a1-a0,y1-y0,mat(c),r[0],r[1],r[2],r[3]);w.userData.noTop=true;return w}
function TI(w,h,f){return T(w,h,(g)=>{const d=g.createImageData(w,h);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const v=Math.max(0,Math.min(1,f(x/(w-1),y/(h-1))))*255;const i=(y*w+x)*4;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0)})}
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const noShadow=m=>{m.castShadow=false;return m};
const glow=(c,op)=>MB(c,{transparent:true,opacity:op==null?1:op,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
const R={scene:sc,L:{},G:{},anim:{},screens:{}};

// ---------- textures ----------
const floorT=T(1024,1024,(g,w,h)=>{const pw=51;for(let x=0;x<w;x+=pw){let y=-rnd()*300;while(y<h){const L=180+rnd()*260;const t=rnd();g.fillStyle=`rgb(${190+t*30|0},${148+t*26|0},${104+t*20|0})`;g.fillRect(x,y,pw,L);g.strokeStyle='rgba(120,80,45,.18)';g.lineWidth=1;for(let k=0;k<7;k++){g.beginPath();const ox=x+4+rnd()*(pw-8);g.moveTo(ox,y);g.bezierCurveTo(ox+6,y+L*.3,ox-6,y+L*.6,ox+2,y+L);g.stroke()}g.fillStyle='rgba(70,45,25,.45)';g.fillRect(x,y,pw,1.5);y+=L}g.fillStyle='rgba(70,45,25,.5)';g.fillRect(x,0,1.5,h)}});
const grain=(base,line,n)=>T(256,256,(g,w,h)=>{g.fillStyle=base;g.fillRect(0,0,w,h);g.strokeStyle=line;for(let i=0;i<n;i++){g.lineWidth=.5+rnd()*1.5;g.beginPath();const y=rnd()*h;g.moveTo(0,y);g.bezierCurveTo(w*.3,y+(rnd()-.5)*14,w*.6,y+(rnd()-.5)*14,w,y+(rnd()-.5)*8);g.stroke()}});
const bnT=grain('#2E2724','rgba(80,62,50,.35)',60),oakT=grain('#5E412B','rgba(35,22,12,.22)',70),oakT2=grain('#674830','rgba(35,22,12,.2)',55);
const rugT=T(512,512,(g,w,h)=>{g.fillStyle='#EBE3D2';g.fillRect(0,0,w,h);g.strokeStyle='#222';g.lineWidth=5;for(let i=0;i<9;i++){g.beginPath();for(let k=0;k<=16;k++)g.lineTo(k*32,40+i*56+(k%2?22:-22));g.stroke()}g.fillStyle='#6E7547';for(let i=0;i<8;i++)for(let k=0;k<8;k++)if((i+k)%3==0){g.beginPath();g.arc(32+k*64,68+i*56,6,0,7);g.fill()}g.strokeStyle='#222';g.lineWidth=10;g.strokeRect(14,14,w-28,h-28)});
const linT=T(128,128,(g,w,h)=>{g.fillStyle='#E2D7C2';g.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){g.fillStyle=`rgba(150,130,100,${rnd()*.18})`;g.fillRect(i,0,1,h)}},1,1);
const oliveT=T(128,128,(g,w,h)=>{g.fillStyle='#6E7547';g.fillRect(0,0,w,h);for(let i=0;i<500;i++){g.fillStyle=`rgba(${rnd()<.5?30:140},${rnd()<.5?40:150},20,.12)`;g.fillRect(rnd()*w,rnd()*h,2,1)}},3,3);
function poster(i){return T(200,280,(g,w,h)=>{const P=['#6E7547','#161515','#D8A42C','#EDE5D3','#B5562E','#4F5633'];g.fillStyle=['#EDE5D3','#E4D9C4','#161515','#D9CBB0'][i%4];g.fillRect(0,0,w,h);
if(i%4==0){for(let k=0;k<5;k++){g.fillStyle=P[(k+i)%6];g.beginPath();g.arc(w/2,h*.62,w*.44-k*16,Math.PI,0);g.fill()}}
else if(i%4==1){g.fillStyle=P[2];g.beginPath();g.arc(w*.5,h*.38,52,0,7);g.fill();g.fillStyle=P[0];g.fillRect(0,h*.6,w,h*.4);g.fillStyle=P[1];g.fillRect(0,h*.78,w,h*.22)}
else if(i%4==2){g.strokeStyle=P[2];g.lineWidth=6;for(let k=0;k<6;k++){g.beginPath();g.arc(w/2,h/2,18+k*14,0,7);g.stroke()}}
else{for(let k=0;k<4;k++){g.fillStyle=P[(k*2+i)%6];g.fillRect(24,30+k*56,w-48,40)}}
g.strokeStyle='rgba(0,0,0,.15)';g.lineWidth=2;g.strokeRect(10,10,w-20,h-20)})}
const tvT=T(512,288,(g,w,h)=>{let gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#1d2a4a');gr.addColorStop(.45,'#c8684a');gr.addColorStop(.62,'#f3b45a');gr.addColorStop(1,'#2a1a14');g.fillStyle=gr;g.fillRect(0,0,w,h);g.fillStyle='#ffe3a0';g.beginPath();g.arc(w*.62,h*.58,26,0,7);g.fill();
[['#3a2a3c',.66],['#24192a',.74],['#120d14',.84]].forEach(([c,b],j)=>{g.fillStyle=c;g.beginPath();g.moveTo(0,h);for(let x=0;x<=w;x+=16)g.lineTo(x,h*b-Math.abs(Math.sin(x*.013+j*2))*60*(1-j*.25));g.lineTo(w,h);g.fill()});
g.fillStyle='rgba(255,255,255,.85)';g.font='bold 18px sans-serif';g.fillText('▶  Lecture',20,h-20)});
const monT=T(512,290,(g,w,h)=>{let gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#0b0a2a');gr.addColorStop(.55,'#4b1d6e');gr.addColorStop(1,'#ff4fa8');g.fillStyle=gr;g.fillRect(0,0,w,h);
for(let i=0;i<40;i++){const x=rnd()*w,bw=14+rnd()*40,bh=40+rnd()*150;g.fillStyle=`rgba(10,8,30,.92)`;g.fillRect(x,h*.72-bh,bw,bh);g.fillStyle=rnd()<.5?'#3ff0ff':'#ffd84a';for(let k=0;k<6;k++)g.fillRect(x+3+rnd()*(bw-6),h*.72-bh+6+rnd()*(bh-10),2,2)}
g.fillStyle='#120c24';g.fillRect(0,h*.72,w,h);g.strokeStyle='#ff4fa8';g.lineWidth=2;for(let i=-20;i<20;i++){g.beginPath();g.moveTo(w/2,h*.72);g.lineTo(w/2+i*60,h);g.stroke()}for(let k=1;k<6;k++){const y=h*.72+k*k*3.2;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke()}
g.fillStyle='#3ff0ff';g.font='bold 15px sans-serif';g.fillText('HP 100',16,24);g.fillText('144 FPS',w-90,24);g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(w/2-8,h/2);g.lineTo(w/2+8,h/2);g.moveTo(w/2,h/2-8);g.lineTo(w/2,h/2+8);g.stroke()});
const skyT=T(512,512,(g,w,h)=>{let s4=23;const q=()=>(s4=(s4*16807)%2147483647)/2147483647;let gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#6f9fd0');gr.addColorStop(.55,'#a9c8e4');gr.addColorStop(.85,'#d9e6ee');gr.addColorStop(1,'#eef1ea');g.fillStyle=gr;g.fillRect(0,0,w,h);
 for(let c=0;c<7;c++){const cx=q()*w,cy=40+q()*h*.38,sc=.6+q()*.9;for(let k=0;k<14;k++){const x=cx+(q()-.5)*120*sc,y=cy+(q()-.5)*26*sc,rr=(14+q()*26)*sc;const rg=g.createRadialGradient(x,y-rr*.2,0,x,y,rr);rg.addColorStop(0,'rgba(255,255,255,.55)');rg.addColorStop(.6,'rgba(250,250,252,.28)');rg.addColorStop(1,'rgba(240,244,250,0)');g.fillStyle=rg;g.beginPath();g.arc(x,y,rr,0,7);g.fill()}}});
for(let i=0;i<56;i++)rnd();

// ---------- shell ----------
const fl=P(360,360,M(0xffffff,{map:floorT,roughness:.55}),180,0,180,0,-Math.PI/2);
const ce=P(360,360,M(C.ceil,{roughness:1}),180,250,180,0,Math.PI/2);ce.userData.noTop=true;R.ceil=ce;
const wm=M(C.wall,{roughness:.95});
W('N',0,265,0,250,wm);W('N',345,360,0,250,wm);W('N',265,345,205,250,wm);
W('S',0,120,0,250,wm);W('S',240,360,0,250,wm);W('S',120,240,0,90,wm);W('S',120,240,210,250,wm);
W('W',0,360,0,250,wm);W('E',0,360,0,250,wm);
const pl=M(C.white,{roughness:.6});B(0,265,0,8,0,1.2,pl);B(0,120,0,8,358.8,360,pl);B(240,360,0,8,358.8,360,pl);B(0,1.2,0,8,0,360,pl);B(358.8,360,0,8,0,360,pl);
// window reveal (wall thickness)
const rv=M(C.wall);B(118,120,90,210,360,384,rv);B(240,242,90,210,360,384,rv);B(118,242,210,212,360,384,rv);B(110,250,86,90,352,384,pl);
// window frame + glass
const wf=M(0xF8F8F6,{roughness:.4});B(120,240,90,95,376,380,wf);B(120,240,205,210,376,380,wf);B(120,125,90,210,376,380,wf);B(235,240,90,210,376,380,wf);B(177.5,182.5,95,205,376,380,wf);
R.glass=noShadow(P(110,110,new THREE.MeshStandardMaterial({color:0xDDEBF5,transparent:true,opacity:.12,roughness:.05,metalness:.2}),180,150,378,Math.PI));
// outside
R.sky=noShadow(P(900,520,MB(0xffffff,{map:skyT}),180,220,640,Math.PI));
// night sky + moon + city with lit windows
const nightT=T(1024,512,(g,w,h)=>{let gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#050817');gr.addColorStop(.45,'#0d1430');gr.addColorStop(.78,'#1f2550');gr.addColorStop(1,'#3a2f4a');g.fillStyle=gr;g.fillRect(0,0,w,h);
for(let i=0;i<420;i++){const y=Math.pow(rnd(),1.4)*h*.8,a=.25+rnd()*.75*(1-y/h);g.fillStyle=`rgba(255,${235+rnd()*20|0},${210+rnd()*45|0},${a})`;const s=rnd()<.06?2:1;g.fillRect(rnd()*w,y,s,s)}
g.fillStyle='rgba(120,130,190,.07)';for(let i=0;i<6;i++){g.beginPath();g.ellipse(rnd()*w,h*.2+rnd()*h*.3,120+rnd()*120,10+rnd()*12,0,0,7);g.fill()}});
R.skyN=noShadow(P(900,520,MB(0xffffff,{map:nightT,transparent:true,opacity:0,depthWrite:false}),180,220,638,Math.PI));
const moonT=T(256,256,(g,w,h)=>{const r=g.createRadialGradient(w*.46,h*.44,10,w/2,h/2,w*.42);r.addColorStop(0,'#fffdf2');r.addColorStop(.85,'#ece8d8');r.addColorStop(1,'#d9d4c0');g.fillStyle=r;g.beginPath();g.arc(w/2,h/2,w*.42,0,7);g.fill();
g.fillStyle='rgba(150,150,140,.18)';[[.38,.4,.09],[.6,.55,.12],[.45,.66,.06],[.62,.33,.05],[.33,.58,.04]].forEach(([x,y,s])=>{g.beginPath();g.arc(w*x,h*y,w*s,0,7);g.fill()})});
R.moon=noShadow(P(34,34,MB(0x000000,{map:moonT,transparent:true,depthWrite:false}),20,190,630,Math.PI));
R.moonHalo=noShadow(P(220,220,glow(0x000000,1),20,190,631,Math.PI));R.moonHalo.material.map=null;R.skyN.renderOrder=-3;R.moon.renderOrder=-2;R.moonHalo.renderOrder=-2;
const facT=(lit,k)=>T(256,512,(g,w,h)=>{let s5=101+k*37;const q=()=>(s5=(s5*16807)%2147483647)/2147483647;const ST=[['#ddd2bf','#c2b59e','#f1ece2'],['#cfd2ca','#aeb3ab','#eef0ea'],['#b9785d','#93604a','#e8e1d6'],['#e7e3db','#c9c3b7','#ffffff']][k%4];
 const cols=k%2?6:5,rows=k%3==0?12:10,mx=16,my=22,cw=(w-2*mx)/cols,rh=(h-2*my)/rows,ww=cw*.5,wh=rh*.56;
 if(!lit){g.fillStyle=ST[0];g.fillRect(0,0,w,h);for(let i=0;i<1400;i++){g.fillStyle=`rgba(${q()<.5?0:255},${q()<.5?0:255},${q()<.5?0:255},.035)`;g.fillRect(q()*w,q()*h,2,2)}
  if(k%4==2){g.strokeStyle='rgba(80,40,30,.18)';g.lineWidth=1;for(let y=0;y<h;y+=6){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();for(let x=(y/6%2)*7;x<w;x+=14){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+6);g.stroke()}}}
  g.fillStyle=ST[1];g.fillRect(0,0,w,10);for(let rI=1;rI<rows;rI+=k%4==0?2:3)g.fillRect(0,my+rI*rh-3,w,3);
  const sh=g.createLinearGradient(0,0,0,h);sh.addColorStop(0,'rgba(0,0,0,.12)');sh.addColorStop(.3,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,.08)');g.fillStyle=sh;g.fillRect(0,0,w,h)}else g.clearRect(0,0,w,h);
 for(let rI=0;rI<rows;rI++)for(let c=0;c<cols;c++){const x=mx+c*cw+(cw-ww)/2,y=my+rI*rh+(rh-wh)*.35;const cur=q(),bal=k%4==0&&rI%2==1;
  if(!lit){g.fillStyle=ST[2];g.fillRect(x-2.5,y-2.5,ww+5,wh+5);const gl=g.createLinearGradient(x,y,x+ww,y+wh);gl.addColorStop(0,'#4f5e68');gl.addColorStop(.6,'#7d929d');gl.addColorStop(1,'#a8bac2');g.fillStyle=gl;g.fillRect(x,y,ww,wh);
   if(cur<.45){g.fillStyle='rgba(236,230,214,.55)';g.fillRect(x,y,cur<.2?ww:ww/2,wh)}g.fillStyle=ST[2];g.fillRect(x+ww/2-1,y,2,wh);g.fillRect(x-4,y+wh+2,ww+8,3);
   if(bal){g.fillStyle='rgba(30,30,32,.75)';g.fillRect(x-6,y+wh*.55,ww+12,1.5);for(let t=x-6;t<=x+ww+6;t+=3)g.fillRect(t,y+wh*.55,1,wh*.45);g.fillRect(x-6,y+wh,ww+12,2)}}
  else if(q()<.38){const warm=q()<.7;const gx=g.createLinearGradient(x,y,x,y+wh);gx.addColorStop(0,warm?'rgba(255,190,110,.95)':'rgba(255,232,190,.95)');gx.addColorStop(1,warm?'rgba(255,160,80,.7)':'rgba(240,220,180,.7)');g.fillStyle=gx;g.fillRect(x,y,ww,wh)}}});
const _sv=seed;R.out=[];R.cityLit=[];[[-95,0xffffff,70,170,600],[150,0xf0f0ea,90,130,600],[280,0xe6ebe4,60,190,600],[350,0xf4f4f0,80,150,600],[-60,0xdddddd,90,210,700],[95,0xe9e9e9,60,240,720],[230,0xdedede,80,230,700],[420,0xe0e0e0,90,200,700]].forEach(([x,c,w,h,z],k)=>{
R.out.push(noShadow(P(w,h,MB(c,{map:facT(false,k)}),x,h/2+60,z,Math.PI)));const l=noShadow(P(w,h,MB(0x000000,{map:facT(true,k),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}),x,h/2+60,z-.6,Math.PI));R.cityLit.push(l);
 for(let y=10;y<248;y+=18)for(let x2=8;x2<120;x2+=16)if(rnd()<.38){rnd();rnd()}});
{const lfT=T(256,256,(g,w,h)=>{let s6=7;const q=()=>(s6=(s6*16807)%2147483647)/2147483647;g.fillStyle='#4e7a46';g.fillRect(0,0,w,h);for(let i=0;i<900;i++){const x=q()*w,y=q()*h,rr=3+q()*9,l=q();g.fillStyle=l<.35?'#3a5f35':l<.75?'#5f8f52':'#86b071';g.beginPath();g.arc(x,y,rr,0,7);g.fill()}for(let i=0;i<500;i++){g.fillStyle='rgba(20,40,20,.35)';g.fillRect(q()*w,q()*h,2,2)}},3,2);
R.tree=noShadow(S(5,150,540,58,MB(0xffffff,{map:lfT}),1,1.1,.6));R.tree2=noShadow(S(330,110,580,40,MB(0xf2fff0,{map:lfT}),1,1,.6))}
// ===================== DETAILED FURNITURE (v3) =====================
function RB(x0,x1,y0,y1,z0,z1,r,c,p,s){const m=new THREE.Mesh(new THREE.RoundedBoxGeometry(x1-x0,y1-y0,z1-z0,r,s||2),mat(c));m.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);return add(m,p)}
function Lathe(x,y,z,pts,c,seg,p){const m=new THREE.Mesh(new THREE.LatheGeometry(pts,seg||32),mat(c));m.position.set(x,y,z);return add(m,p)}
function Grp(x,y,z,ry,p){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;(p||sc).add(g);return g}
const metalBlk=M(0x1a1a1b,{metalness:.65,roughness:.35}),anthM=M(0x34373a,{metalness:.55,roughness:.4}),chrome=M(0xd9dadc,{metalness:.95,roughness:.18});
const bnV=M(0xffffff,{map:bnT,roughness:.5});

// ---------- curtains DYTÅG linen (wave folds) + HUGAD rod ----------
const rodM=M(C.black,{roughness:.3,metalness:.8});
{const rod=new THREE.Mesh(new THREE.CylinderGeometry(1,1,180,12),rodM);rod.rotation.z=Math.PI/2;rod.position.set(180,224,347);add(rod)}
S(89,224,347,2.4,rodM);S(271,224,347,2.4,rodM);B(95,97,218,226,354,360,rodM);B(263,265,218,226,354,360,rodM);
const curM=M(0xffffff,{map:linT,roughness:1,side:THREE.DoubleSide});
[[92,138],[222,268]].forEach(([a,b])=>{const n=9,w=(b-a)/n;for(let i=0;i<n;i++){const x=a+i*w+w/2;const zz=343+Math.sin(i*1.7)*2.2;const m=RB(x-w*.62,x+w*.62,1.5,221,zz-2.2,zz+2.2,2,curM);}
 for(let i=0;i<n;i++)S(a+i*w+w/2,222,343,1.1,rodM)});

// ---------- door (open against east wall) + frame + hall ----------
const pl2=M(C.white,{roughness:.55});B(261,265,0,209,-4,3,pl2);B(345,349,0,209,-4,3,pl2);B(261,349,205,209,-4,3,pl2);
const doorM=M(0xF6F5F1,{roughness:.45});RB(342.5,346.5,0,203,4,83,.8,doorM);
B(342,342.6,20,90,14,73,M(0xEFEDE8,{roughness:.5}));B(342,342.6,110,185,14,73,M(0xEFEDE8,{roughness:.5}));
Cy(340.5,76,99,101,1.6,chrome);{const h=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,12,12),chrome);h.rotation.x=Math.PI/2;h.position.set(339.4,100,70.5);add(h)}
noShadow(P(220,250,MB(0xD6D1C8),305,125,-120));const hf=noShadow(P(120,130,M(0x9d7a55,{map:floorT}),305,0,-60,0,-Math.PI/2));R.hall=[hf];
const hw=M(0xE9E5DE,{roughness:.95});[[0,265],[345,360]].forEach(([a,b])=>P(b-a,250,hw,(a+b)/2,125,-1,Math.PI));P(80,45,hw,305,227.5,-1,Math.PI);
P(120,250,hw,245,125,-60,Math.PI/2);P(120,250,hw,365,125,-60,-Math.PI/2);const hc=P(120,120,M(0xF2F0EC),305,250,-60,0,Math.PI/2);hc.userData.noTop=true;
// window handle
RB(176,184,150,153,374,376,1,chrome);

// ---------- rug berber 120x170 (cream, black diamonds, fringe) ----------
const rugT2=T(512,512,(g,w,h)=>{g.fillStyle='#ECE4D3';g.fillRect(0,0,w,h);for(let i=0;i<4000;i++){g.fillStyle=`rgba(${190+rnd()*40|0},${180+rnd()*40|0},${160+rnd()*30|0},.35)`;g.fillRect(rnd()*w,rnd()*h,2,2)}
 g.strokeStyle='#1d1b19';g.lineWidth=6;g.lineJoin='round';for(let i=-6;i<12;i++){g.beginPath();g.moveTo(i*96,0);for(let k=1;k<=16;k++)g.lineTo(i*96+k*32+Math.sin(i*3+k)*2.5,k*32);g.stroke();g.beginPath();g.moveTo(i*96,h);for(let k=1;k<=16;k++)g.lineTo(i*96+k*32+Math.cos(i*2+k)*2.5,h-k*32);g.stroke()}});
RB(200,320,0,1.6,158,328,.8,M(0xffffff,{map:rugT2,roughness:1}));
{const frT=T(8,64,(g,w,h)=>{g.fillStyle='#E6DCC8';g.fillRect(0,0,w,h);g.fillStyle='#b8ad97';for(let y=0;y<h;y+=2)g.fillRect(0,y,w,1)},1,40);[[197,200],[320,323]].forEach(([a,b])=>B(a,b,0,.5,159,327,M(0xffffff,{map:frT,roughness:1})))}

// ---------- bed MALM high 140x190 brun noir (x 0-199, z 171-327) ----------
const BZ0=171,BZ1=327,BX1=199,BC=(BZ0+BZ1)/2;
RB(0,4.5,0,100,BZ0,BZ1,1.2,bnV);// headboard
RB(4.5,BX1,10,38,BZ0,BZ0+2.2,.8,bnV);RB(4.5,BX1,10,38,BZ1-2.2,BZ1,.8,bnV);RB(BX1-2.2,BX1,10,38,BZ0+2.2,BZ1-2.2,.8,bnV);
B(6,BX1-3,10,22,BZ0+3,BZ1-3,M(0x2a2421));// under-bed boxes area (dark)
[[8,BZ0+4],[8,BZ1-4],[BX1-6,BZ0+4],[BX1-6,BZ1-4]].forEach(p=>B(p[0]-2,p[0]+2,0,10,p[1]-2,p[1]+2,M(0x1c1918)));
// mattress + fitted sheet
RB(7,BX1-3.5,20,45,BZ0+3,BZ1-3,4,M(0xE9DFCB,{roughness:1}),null,3);
// duvet olive (top + side drapes) + folded top
const quiltT=T(256,256,(g,w,h)=>{let s3=11;const r3=()=>(s3=(s3*16807)%2147483647)/2147483647;g.fillStyle='#6E7547';g.fillRect(0,0,w,h);for(let i=0;i<1800;i++){g.fillStyle=`rgba(${r3()<.5?30:150},${r3()<.5?40:160},20,.10)`;g.fillRect(r3()*w,r3()*h,2,1)}
 for(let k=0;k<9;k++){const x0=r3()*w,y0=r3()*h,a=r3()*3.14,L=60+r3()*120,wd=10+r3()*16;g.save();g.translate(x0,y0);g.rotate(a);
  for(const[ox,oy]of[[0,0]]){const gr=g.createLinearGradient(0,-wd,0,wd);gr.addColorStop(0,'rgba(255,255,235,0)');gr.addColorStop(.42,'rgba(255,255,235,.10)');gr.addColorStop(.5,'rgba(20,24,8,.12)');gr.addColorStop(.62,'rgba(20,24,8,.05)');gr.addColorStop(1,'rgba(20,24,8,0)');g.fillStyle=gr;g.beginPath();g.ellipse(0,0,L/2,wd,0,0,6.29);g.fill()}g.restore()}},1,1);
const duv=M(0xffffff,{map:quiltT,roughness:1});
RB(58,BX1+2,43,51,BZ0+1,BZ1-1,3.5,duv,null,3);
RB(58,BX1+2,25,47,BZ0-.6,BZ0+3.2,1.6,duv);RB(58,BX1+2,25,47,BZ1-3.2,BZ1+.6,1.6,duv);RB(BX1-1,BX1+3.2,25,47,BZ0+1,BZ1-1,1.6,duv);
RB(52,70,45,55,BZ0+1,BZ1-1,4.5,M(0xffffff,{map:oliveT,roughness:1}),null,3);
// plaid SÖRBYSKOGEN folded at foot
const plaidT=T(256,256,(g,w,h)=>{g.fillStyle='#EFE8DA';g.fillRect(0,0,w,h);for(let i=0;i<w;i+=2){g.fillStyle='rgba(120,110,95,.12)';g.fillRect(i,0,1,h)}for(let j=0;j<h;j+=3){g.fillStyle='rgba(255,255,255,.16)';g.fillRect(0,j,w,1)}
 g.strokeStyle='#26231f';g.lineCap='round';
 for(const ox of[-w,0,w])for(const oy of[-h,0,h]){g.save();g.translate(ox,oy);g.lineWidth=3.2;
  g.beginPath();g.moveTo(10,60);g.bezierCurveTo(50,10,90,110,130,60);g.bezierCurveTo(170,10,210,110,250,60);g.stroke();
  g.beginPath();g.moveTo(20,190);g.bezierCurveTo(40,140,100,150,96,196);g.bezierCurveTo(92,240,150,250,170,200);g.stroke();
  g.beginPath();g.arc(200,150,18,0,6.29);g.stroke();g.beginPath();g.arc(60,120,7,0,6.29);g.stroke();
  g.lineWidth=2;g.beginPath();g.moveTo(140,110);g.lineTo(230,95);g.stroke();g.beginPath();g.moveTo(180,230);g.bezierCurveTo(200,215,230,250,250,232);g.stroke();g.restore()}},3,1.4);
RB(158,192,51,54.5,BZ0+2,BZ1-2,1.4,M(0xffffff,{map:plaidT,roughness:1}));RB(BX1-.5,BX1+3.5,30,54.5,BZ0+2,BZ1-2,1.4,M(0xEFE8DA,{roughness:1}));{const frg=T(64,16,(g,w,h)=>{g.clearRect(0,0,w,h);g.fillStyle='#E6DDCB';for(let x=0;x<w;x+=4)g.fillRect(x,0,2,h)},20,1);const fm=new THREE.Mesh(new THREE.PlaneGeometry(BZ1-BZ0-6,6),new THREE.MeshStandardMaterial({map:frg,alphaTest:.5,side:THREE.DoubleSide,roughness:1}));fm.position.set(BX1+3.6,27,BC);fm.rotation.y=Math.PI/2;fm.castShadow=false;sc.add(fm)}
// pillows SMÅSPORRE + cushions
const pil=M(0xFAF7F1,{roughness:1});[[BZ0+8,BC-3],[BC+3,BZ1-8]].forEach(([a,b])=>{const hz=(b-a)/2;const g=Grp(30,51.5,(a+b)/2,0);g.rotation.z=-.12;RB(-22,22,-7,7,-hz,hz,6.5,pil,g,3);S(0,1.2,0,1,pil,19,7.6,hz-4,g,28);RB(-22.3,22.3,-.35,.35,-hz-.2,hz+.2,.3,M(0xE8E2D6,{roughness:1}),g,1)});
const cush=(z,c)=>{const g=Grp(24,72,z,0);g.rotation.z=-.32;RB(-6,6,-21,21,-21,21,6,M(c,{roughness:1}),g,3);return g};cush(BC,0xDCCDB0);cush(BC-38,C.jaune);cush(BC+38,C.jaune);
// LED under bed (glow on floor) + headboard LED glow on wall
R.G.bedLed=[];const gb=noShadow(P(214,174,glow(0x000000,1),100,.6,BC,0,-Math.PI/2));gb.material.map=TI(64,64,(u,v)=>{const d=Math.min(1,Math.hypot(u-.5,v-.5)*2);return Math.pow(1-d,1.6)});R.G.bedLed.push(gb);
const softT=gb.material.map;
const mkGlow=(w,h,x,y,z,ry,rx)=>{const m=noShadow(P(w,h,glow(0x000000,1),x,y,z,ry,rx));m.material.map=softT;return m};
R.moonHalo.material.map=softT;
R.G.headLed=[mkGlow(220,170,.8,116,BC,Math.PI/2)];

// ---------- 3 frames RÖDALM 50x70 above bed (album posters, original art) ----------
const albT=(i)=>T(200,280,(g,w,h)=>{g.fillStyle='#F3EFE6';g.fillRect(0,0,w,h);const cols=[['#8a5a3a','#d9b48a'],['#2d2724','#8c1d1d'],['#6b4a7a','#e6b8c9']][i];g.fillStyle=cols[0];g.fillRect(20,20,160,160);g.fillStyle=cols[1];
 if(i==0){g.beginPath();g.arc(100,100,46,0,7);g.fill()}else if(i==1){g.fillRect(55,55,90,90)}else{for(let k=0;k<5;k++){g.beginPath();g.moveTo(20,180-k*30);g.lineTo(180,120-k*30);g.lineWidth=8;g.strokeStyle=cols[1];g.stroke()}}
 g.fillStyle='#2b2724';g.fillRect(20,200,110,9);g.fillRect(20,218,70,6);g.fillStyle='#8f877c';for(let k=0;k<4;k++)g.fillRect(20,236+k*9,150-k*20,4)});
const frM=M(0x141414,{roughness:.35});[BC-58,BC,BC+58].forEach((zc,i)=>{RB(0,3,112,182,zc-25,zc+25,.6,frM);B(3,3.2,115,179,zc-22,zc+22,M(0xffffff,{map:albT(i),roughness:.6}));noShadow(P(44,64,new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.06,roughness:.05}),3.6,147,zc,Math.PI/2))});

// ---------- nightstand GRÅFJÄLLET anthracite 45x36x59 + FADO + candles ----------
{const NZ0=123,NZ1=168,NX=36;const g=Grp(0,0,0,0);
 [[2,NZ0+2],[2,NZ1-2],[NX-2,NZ0+2],[NX-2,NZ1-2]].forEach(p=>RB(p[0]-1.2,p[0]+1.2,0,57,p[1]-1.2,p[1]+1.2,.5,anthM,g));
 RB(0,NX,57,59,NZ0,NZ1,.6,M(C.anth,{roughness:.5}),g);RB(1,NX-1,38,52,NZ0+1.5,NZ1-1.5,.6,M(0x2f3134,{roughness:.55}),g);B(NX-1,NX-.4,44,46,NZ0+15,NZ1-15,metalBlk,g);
 RB(1,NX-1,14,16,NZ0+1.5,NZ1-1.5,.4,M(0x2f3134,{roughness:.55}),g);
 Lathe(18,59,140,[[0,0],[6,0],[6.2,.6],[5,2.6],[3,3.2],[0,3.2]],M(0xF7F6F2,{roughness:.3}),24);
 const fg=S(18,74.5,140,12.5,M(0xffffff,{emissive:0xffd9a0,emissiveIntensity:0,roughness:.15}),1,1,1,null,28);R.nsShade=fg.material;
 B(4,14,59,60,NZ1-10,NZ1-2,M(0x1a1a1a,{roughness:.3}))}

// ---------- sneaker wall: clear boxes + 3 floating shelves with Paulmann LED ----------
function sneaker(x,y,z,c,acc,ry,p){const g=Grp(x,y,z,ry||0,p);const mc=M(c,{roughness:.75}),ma=M(acc,{roughness:.65});
 RB(-5,5,0,.8,-14,14,.5,M(0xd9d3c6,{roughness:.9}),g,1);RB(-5.1,5.1,.6,3,-14.2,14.2,1.2,M(0xF7F6F2,{roughness:.8}),g,1);
 S(0,2.6,6.5,1,mc,4.4,3.9,7.2,g,12);RB(-4.7,4.7,2.6,9.8,-13.6,1.5,3,mc,g,2);
 RB(-4.95,4.95,3.4,6.4,-10,5,1.4,ma,g,1);RB(-3.3,3.3,8.8,10.1,-12.2,-5,1.3,M(0x1b1b1b,{roughness:.9}),g,1);
 {const t=Grp(0,8.4,-3.6,0,g);t.rotation.x=.55;RB(-2.7,2.7,0,4.6,-.6,.6,.9,mc,t,1)}
 for(let k=0;k<4;k++)RB(-2.9,2.9,8.6-k*.6,9.1-k*.6,-2.6+k*2.1,-1.9+k*2.1,.2,M(0xF4F2EC),g,1);
 RB(-1.1,1.1,6,10.6,-14.2,-13.3,.4,ma,g,1);return g}
const tb=M(0xE8F0F2,{transparent:true,opacity:.2,roughness:.08});
[[0,0xEDE5D3,C.olive],[22.5,C.black,0xEDE5D3],[45,C.olive,0xF4F2EC],[67.5,0xEDE5D3,C.black]].forEach(([y,c,a])=>{noShadow(RB(0,36,y,y+22,90,118,.8,tb));B(0,36,y,y+.6,90,118,M(0xF4F4F2,{transparent:true,opacity:.35}));sneaker(18,y+1,104,c,a,Math.PI/2+.05)});
const shelfM=M(0xF4F2EE,{roughness:.5});[[120,0x1D1A18,0xEDE5D3],[150,C.olive,0xF4F2EC],[180,0xF4F2EC,C.jaune]].forEach(([y,c,a])=>{RB(0,23.5,y,y+2.5,88,145,.5,shelfM);sneaker(12,y+2.5,104,c,a,Math.PI/2);sneaker(12,y+2.5,128,c,a,Math.PI/2)});
R.G.sneak=[mkGlow(46,110,.8,150,116,Math.PI/2)];

// ---------- desk TROTTEN 160x80 white/anthracite ----------
RB(0,160,72.5,75,0,80,.8,M(0xF2F1ED,{roughness:.42}));
[[5],[155]].forEach(([x])=>{RB(x-2.5,x+2.5,0,4,2,78,1,anthM);RB(x-2,x+2,4,72.5,36,44,1,anthM);RB(x-2,x+2,68,72.5,6,74,1,anthM);B(x-3,x+3,0,1,4,8,metalBlk);B(x-3,x+3,0,1,72,76,metalBlk)});
RB(6,154,62,66,4,9,1,anthM);
// desk mat, keyboard TKL, mouse
RB(35,125,75,75.4,30,70,1.5,M(0x141414,{roughness:1}));
RB(58,94,75.4,77.6,46,60,1,M(0x1d1d1f,{roughness:.55}));for(let r=0;r<5;r++)for(let k=0;k<14;k++)RB(59.2+k*2.48,61.2+k*2.48,77.6,78.6,47+r*2.55,48.9+r*2.55,.35,M(r==0&&k<1?C.olive:0x2b2b2e,{roughness:.5}),null,1);
{const m=new THREE.Mesh(new THREE.SphereGeometry(3.3,20,12),M(0x161616,{roughness:.35}));m.scale.set(1,.45,1.75);m.position.set(108,76.3,54);add(m)}
// monitor MSI MAG 274QP 26.5" (61x35.6)
const mon=M(0x121315,{roughness:.32,metalness:.3});
RB(66,94,75.4,76.6,13,33,1.2,mon);RB(76.5,83.5,76.6,112,17,20,1.4,mon);RB(76,84,104,110,19,22,1,mon);
RB(49.5,110.5,88,123.6,20.2,22.2,.6,mon);RB(60,100,93,118,17.4,20.4,2,mon);
R.screens.mon=noShadow(P(59.6,34.2,MB(0xffffff,{map:monT}),80,105.8,22.25));
R.G.monGlow=[mkGlow(100,48,80,104,.8,0)];
// desk lamp FORSÅ black
Lathe(140,75,18,[[0,0],[7.5,0],[7.5,1.2],[6.5,2],[1,2.4],[0,2.4]],metalBlk,24);
{const V3=(x,y,z)=>new THREE.Vector3(x,y,z);const base=V3(140,77.4,18),elb=V3(141,106,12),head=V3(124,114,30);
 add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(base,V3(140.5,92,15),elb),8,.75,8),metalBlk));
 add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(elb,V3(133,111,21),head),8,.75,8),metalBlk));
 S(elb.x,elb.y,elb.z,1.6,metalBlk);S(head.x,head.y,head.z,1.5,metalBlk);
 const sg=Grp(head.x,head.y,head.z,0);sg.rotation.z=-.55;sg.rotation.x=-.6;
 Lathe(0,-12,0,[[7.6,0],[7.9,.3],[2.6,11.2],[1.6,12],[0,12.2]],M(C.black,{side:THREE.DoubleSide,metalness:.5,roughness:.35}),28,sg);
 Lathe(0,-12,0,[[7.2,.2],[2.4,11]],M(0xEDEAE4,{side:THREE.DoubleSide,roughness:.6}),28,sg);
 const dlBulb=S(0,-6,0,2.4,M(0xffffff,{emissive:0xfff0d0,emissiveIntensity:0}),1,1,1,sg);R.dlBulb=dlBulb.material}
// headset + stand, mug
Lathe(20,75,30,[[0,0],[5.5,0],[5.5,1],[1,1.5],[.9,24],[0,24]],metalBlk,20);
add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(20,90,21),new THREE.Vector3(20,112,30),new THREE.Vector3(20,90,39)),20,1.1,8),M(0x1b1b1b,{roughness:.6})));
[[21],[39]].forEach(([z])=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(4.2,4.2,3,20),M(0x222222,{roughness:.8}));c.rotation.x=Math.PI/2;c.position.set(20,89,z);add(c)});
Lathe(118,75,32,[[0,0],[3.8,0],[4,9],[3.6,9],[3.4,1],[0,1]],M(C.olive,{roughness:.5}),20);
// PC tower (front +z) with mesh front, 3 RGB fans, glass side
{const pcM=M(0x0f0f10,{roughness:.35,metalness:.4});RB(128,150,2,50,18,64,1.2,pcM);[[130,20],[130,62],[148,20],[148,62]].forEach(p=>RB(p[0]-1.4,p[0]+1.4,0,2,p[1]-1.4,p[1]+1.4,.6,M(0x222222)));
 const meshT=T(64,64,(g,w,h)=>{g.fillStyle='#0d0d0e';g.fillRect(0,0,w,h);g.fillStyle='#2a2a2c';for(let y=0;y<h;y+=4)for(let x=(y/4%2)*2;x<w;x+=4)g.fillRect(x,y,2,2)},4,8);
 B(129,149,4,48,63.6,64.4,M(0xffffff,{map:meshT,roughness:.8}));
 noShadow(B(127.4,128,4,48,20,62,new THREE.MeshStandardMaterial({color:0x101018,transparent:true,opacity:.5,roughness:.05,metalness:.3})));
 R.pcFans=[];[12,26,40].forEach(y=>{const f=noShadow(new THREE.Mesh(new THREE.CylinderGeometry(5.6,5.6,.5,28,1,true),MB(0x000000)));f.rotation.x=Math.PI/2;f.position.set(139,y+2,64.6);sc.add(f);R.pcFans.push(f)});
 const pcIn=noShadow(B(128.2,129,6,46,22,60,MB(0x000000)));R.pcIn=pcIn;
 B(140,148,48,50,58,62,metalBlk);}
R.G.pc=[mkGlow(60,40,139,1,64,0,-Math.PI/2)];
// ---------- plant helpers: pothos (heart leaves, variegated, trailing vines), soil ----------
let _s2=7;const r2=()=>(_s2=(_s2*16807)%2147483647)/2147483647;
const pothosT=T(128,128,(g,w,h)=>{g.clearRect(0,0,w,h);g.save();g.beginPath();g.moveTo(64,4);g.bezierCurveTo(96,24,124,58,118,90);g.bezierCurveTo(114,114,90,126,72,114);g.lineTo(64,104);g.lineTo(56,114);g.bezierCurveTo(38,126,14,114,10,90);g.bezierCurveTo(4,58,32,24,64,4);g.closePath();g.clip();const gr=g.createLinearGradient(0,0,128,128);gr.addColorStop(0,'#5a9a40');gr.addColorStop(1,'#2e6227');g.fillStyle=gr;g.fillRect(0,0,w,h);g.strokeStyle='rgba(226,214,120,.5)';g.lineWidth=2;for(let i=0;i<14;i++){const x=64+(r2()-.5)*80;g.beginPath();g.moveTo(64,104);g.quadraticCurveTo(x,70,x+(x-64)*.6,18);g.stroke()}g.strokeStyle='rgba(28,58,24,.85)';g.lineWidth=2.5;g.beginPath();g.moveTo(64,104);g.lineTo(64,10);g.stroke();g.restore()});
const soilT=T(64,64,(g,w,h)=>{g.fillStyle='#35261b';g.fillRect(0,0,w,h);for(let i=0;i<260;i++){const c=r2();g.fillStyle=c<.5?'#22180f':c<.85?'#4a3626':'#9c8f7c';g.fillRect(r2()*w,r2()*h,1+r2()*2,1+r2()*2)}},2,2);
const soilM=M(0xffffff,{map:soilT,roughness:1});
const leafPlane=(w,h,t,p)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:t,alphaTest:.5,side:THREE.DoubleSide,roughness:.55}));m.castShadow=false;m.receiveShadow=true;m.userData.noTop=true;(p||sc).add(m);return m};
function pothos(x,y,z,vines){const vm=M(0x4b7b37,{roughness:.8});
 for(let i=0;i<14;i++){const a=r2()*6.28,rr=r2()*4.5;const g=Grp(x+Math.cos(a)*rr,y+r2()*3,z+Math.sin(a)*rr,-a+Math.PI/2);g.rotation.x=-.35-r2()*.9;const s=6+r2()*2.5;leafPlane(s,s*1.1,pothosT,g).position.y=s*.6}
 vines.forEach(([dx,dz,drop])=>{const P=t=>{const u=1-t;return[u*u*x+2*u*t*(x+dx)+t*t*(x+dx*1.25),u*u*y+2*u*t*(y+4)+t*t*(y-drop),u*u*z+2*u*t*(z+dz)+t*t*(z+dz*1.25)]};
  const cv=new THREE.QuadraticBezierCurve3(new THREE.Vector3(x,y,z),new THREE.Vector3(x+dx,y+4,z+dz),new THREE.Vector3(x+dx*1.25,y-drop,z+dz*1.25));add(new THREE.Mesh(new THREE.TubeGeometry(cv,14,.28,5),vm));
  const n=Math.max(4,Math.round(drop/4.5));for(let k=1;k<=n;k++){const [px,py,pz]=P(.15+.85*k/n);const g=Grp(px,py,pz,Math.atan2(dx,dz)+(k%2?.9:-.9));g.rotation.x=2.1+r2()*.7;const s=4.5+r2()*2;leafPlane(s,s*1.1,pothosT,g).position.y=s*.5}})}
// chair Sihoo Doro C300 (mesh back with lumbar curve, waterfall seat, 3D armrests) facing north
{const ch=Grp(80,0,106,0);const cm=M(0x1a1a1b,{roughness:.6}),cmet=M(0x2a2a2c,{metalness:.7,roughness:.3}),fr=M(0x141415,{roughness:.4});
 const meshT=T(64,64,(g,w,h)=>{g.fillStyle='#17171a';g.fillRect(0,0,w,h);g.fillStyle='#34343b';for(let y=0;y<h;y+=4)for(let x=(y/4%2)*2;x<w;x+=4)g.fillRect(x,y,2,2)},9,12);
 const seatT=T(64,64,(g,w,h)=>{g.fillStyle='#1d1d20';g.fillRect(0,0,w,h);g.fillStyle='#26262b';for(let y=0;y<h;y+=3)g.fillRect(0,y,w,1)},5,5);
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const lg=Grp(0,0,0,a,ch);RB(-1.8,1.8,5,9,0,29,1.2,cmet,lg);const w=Cy(0,30,0,6,3,cm,null,14,lg);w.rotation.z=Math.PI/2;w.position.y=3;RB(-2,2,6,9,27,31,.8,cmet,lg)}
 Lathe(0,7,0,[[0,0],[5,0],[5,2],[2.6,4],[2.6,36],[0,36]],cmet,20,ch);
 RB(-11,11,41,45,-12,13,1.5,cmet,ch);
 RB(-25,25,45,52,-19,22,4,cm,ch,3);RB(-23,23,51.4,53.6,-17,20.5,3,M(0xffffff,{map:seatT,roughness:1}),ch,3);
 {const wf=Cy(0,0,-25,25,4.2,cm,null,18,ch);wf.rotation.z=Math.PI/2;wf.position.set(0,49,-19)}
 RB(-4,4,44,60,19,25,1.5,cmet,ch);
 const back=Grp(0,58,25,0,ch);back.rotation.x=.12;
 const meshB=new THREE.MeshStandardMaterial({color:0xffffff,map:meshT,transparent:true,opacity:.86,roughness:.9});
 const seg=(y0,h,rx,dz)=>{const s=Grp(0,y0,dz,0,back);s.rotation.x=rx;
  RB(-24,-21,0,h,-1.6,1.6,1.2,fr,s,2);RB(21,24,0,h,-1.6,1.6,1.2,fr,s,2);RB(-21,21,0,h,-.35,.35,.3,meshB,s,1);return s};
 const lo=seg(2,26,-.1,0),up=seg(27.5,36,.1,-.2);
 RB(-24,24,0,3,-1.8,1.8,1.4,fr,lo,2);RB(-25,25,33,36.5,-2.2,2,1.6,fr,up,2);
 RB(-14,14,7,17,-1.6,-.5,3,M(0x2b2b2e,{roughness:.7}),lo,2);RB(-4,4,0,24,1.6,4.5,1.6,fr,lo,2);
 [-27,27].forEach(x=>{RB(x-1.8,x+1.8,50,68,6,10,1,cmet,ch);RB(x-1.4,x+1.4,44,52,4,10,.8,cmet,ch);RB(x-4,x+4,68,71.5,-9,17,1.6,cm,ch,2);RB(x-3.4,x+3.4,71.3,72,-8,16,1.2,M(0x26262a,{roughness:1}),ch,1)})}
// LACK shelf brun noir 110x26 at 157 + books, pothos, 2 frames above
RB(25,135,157,162,0,26,.8,bnV);
const bk=[C.olive,0xEDE5D3,C.black,0xB5562E,C.jaune,0x6b5a48];for(let i=0;i<10;i++){const hh=18+rnd()*7;RB(30+i*3.6,33.3+i*3.6,162,162+hh,4,22,.4,M(bk[i%6],{roughness:.8}),null,1)}
RB(68,90,162,165,6,22,.6,M(0x161616));RB(70,88,165,167,7,21,.6,M(0xEDE5D3));
Lathe(115,162,13,[[0,0],[5.5,0],[7,12],[6.4,12],[5,1],[0,1]],M(0xC56B45,{roughness:.8}),20);
for(let i=0;i<24;i++)rnd();pothos(115,173,13,[[-7,14,34],[5,15,46],[13,13,22]]);
[[40,70,4],[90,120,5]].forEach(([a,b,i])=>{RB(a,b,176,216,0,2.5,.5,frM);B(a+2.5,b-2.5,178.5,213.5,2.5,2.7,M(0xffffff,{map:poster(i),roughness:.7}))});
R.G.shelf=[mkGlow(130,70,80,122,.8,0,0),mkGlow(110,60,80,75.6,40,0,-Math.PI/2)];
// laundry basket SALUDING (bamboo) under left of desk + FNISS bin
{const bamT=T(64,64,(g,w,h)=>{g.fillStyle='#b48c5a';g.fillRect(0,0,w,h);g.strokeStyle='#8a6438';g.lineWidth=2;for(let i=-64;i<128;i+=8){g.beginPath();g.moveTo(i,0);g.lineTo(i+64,64);g.stroke()}},6,3);
 Lathe(24,0,58,[[0,0],[15,0],[17,48],[16.4,48],[14.4,1],[0,1]],M(0xffffff,{map:bamT,roughness:.9}),28)}
Lathe(158,0,92,[[0,0],[11,0],[12,26],[11.4,26],[10.4,1],[0,1]],M(0xF4F4F2,{roughness:.6}),24);

// ---------- portant GRÅFJÄLLET 90x36x175 anthracite + clothes + shoes ----------
{const X0=168,X1=258,Z0=2,Z1=38;const rk=M(0x303235,{metalness:.6,roughness:.35});
 [X0+1.5,X1-1.5].forEach(x=>{[Z0+1.5,Z1-1.5].forEach(z=>RB(x-1.3,x+1.3,0,175,z-1.3,z+1.3,.5,rk));RB(x-1.3,x+1.3,10,12,Z0+1,Z1-1,.5,rk);RB(x-1.3,x+1.3,160,162,Z0+1,Z1-1,.5,rk)});
 RB(X0,X1,173,176,Z0,Z1,.6,M(0x2f3134,{roughness:.5}));
 {const r=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,X1-X0-3,12),rk);r.rotation.z=Math.PI/2;r.position.set((X0+X1)/2,161,20);add(r)}
 for(let z=Z0+5;z<Z1-2;z+=6.5){const r=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,X1-X0-3,10),rk);r.rotation.z=Math.PI/2;r.position.set((X0+X1)/2,13,z);add(r)}
 const clc=[0x161515,0xEDE5D3,C.olive,0x8a8a8a,0x4F5633,0xF4F2EC,0x3b3d40,0xD8A42C,0x6b5a48,0x1D1A18];
 for(let i=0,x=X0+8;x<X1-6;x+=7.4,i++){const c=clc[i%10],L=58+(i%3)*16,hood=i%3==0;const g=Grp(x,161,20,0);
  add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,-4,-20),new THREE.Vector3(0,3,0),new THREE.Vector3(0,-4,20)),12,.5,6),M(0x111111)),g);
  const cm2=M(c,{roughness:1}),kind=i%4;
  if(kind==3){RB(-2,2,-10,-4,-19,19,1.2,M(0x2a2a2a,{metalness:.5}),g,1);RB(-2.4,2.4,-10-L*1.2,-8,-19,-1,2.4,cm2,g,2);RB(-2.4,2.4,-10-L*1.2,-8,1,19,2.4,cm2,g,2)}
  else{RB(-2.6,2.6,-8-L,-4,-19,19,3,cm2,g,2);RB(-2.4,2.4,-11,-3,-23,23,4,cm2,g,2);
   [-1,1].forEach(sd=>{const sl=Grp(0,-6,sd*22,0,g);sl.rotation.x=sd*(kind==0?.18:.75);RB(-2.2,2.2,kind==0?-L*.95:-16,0,-4,4,2.2,cm2,sl,2);if(kind==0)RB(-2.4,2.4,-L*.95-6,-L*.95,-3.4,3.4,1.6,cm2,sl,1)});
   if(kind==0){RB(-2,6,-20,-2,-10,10,4,cm2,g,2);RB(-2.8,-2.4,-36-L*.3,-28,-7,7,1.5,cm2,g,1)}}}
 [[178,0xF4F2EC,C.black],[196,C.olive,0xEDE5D3],[214,C.black,0xEDE5D3],[232,0xEDE5D3,C.jaune]].forEach(([x,c,a],i)=>{sneaker(x,14,20,c,a,0);sneaker(x+9,14,20,c,a,0)});
 Lathe(240,176,20,[[0,0],[5,0],[6.2,10],[5.6,10],[4.6,1],[0,1]],M(0xC56B45,{roughness:.8}),18);for(let i=0;i<9;i++)S(240+Math.sin(i)*5,190-i*4,20+Math.cos(i*1.3)*5,2.6,M(i%2?C.green2:C.green),1,.4,1)}

// ---------- KALLAX 77x77 brun noir + vinyls + AT-LP60X + Edifier R1280DB ----------
{const X0=321,X1=360,Z0=100,Z1=177,o=3.2,t=1.6;const kx=bnV;
 RB(X0,X1,0,o,Z0,Z1,.6,kx);RB(X0,X1,77-o,77,Z0,Z1,.6,kx);RB(X0,X1,0,77,Z0,Z0+o,.6,kx);RB(X0,X1,0,77,Z1-o,Z1,.6,kx);
 B(X0+.5,X1,38.5-t/2,38.5+t/2,Z0+o,Z1-o,kx);B(X0+.5,X1,o,77-o,(Z0+Z1)/2-t/2,(Z0+Z1)/2+t/2,kx);B(X1-.6,X1,o,77-o,Z0+o,Z1-o,M(0x231e1b));
 const vc=[0x161515,C.olive,0xEDE5D3,0xB5562E,C.jaune,0x3b3d40,0x7a5a8a,0xd6d0c4,0x2d4a6b,0x8a1d1d];let q=0;
 const cells=[[o,38.5-t/2,Z0+o,(Z0+Z1)/2-t/2],[o,38.5-t/2,(Z0+Z1)/2+t/2,Z1-o],[38.5+t/2,77-o,Z0+o,(Z0+Z1)/2-t/2],[38.5+t/2,77-o,(Z0+Z1)/2+t/2,Z1-o]];
 cells.forEach(([y0,y1,z0,z1],ci)=>{let z=z0+.6;const n=ci==3?14:22;for(let k=0;k<n&&z<z1-1.2;k++){const tilt=ci==3&&k>9?.25:0;const s=RB(X0+4,X0+35.5,y0+.3,y0+31.8,z,z+.9,.25,M(vc[(q++*7)%10],{roughness:.7}),null,1);if(tilt){s.rotation.x=tilt}z+=1.25}});
 // turntable AT-LP60X
 RB(323,358,77,85.5,121,157,1.5,M(0x1c1c1e,{roughness:.35}),null,3);B(323.2,323.6,79,83,124,130,M(0x9a9a9a,{metalness:.8}));
 R.platter=Cy(340,139,85.5,87.2,14.6,M(0x0d0d0d,{roughness:.25}),null,40);R.label=Cy(340,139,87.2,87.4,4.4,M(C.jaune,{roughness:.6}),null,24);
 Cy(340,139,87.4,88.4,.5,chrome,null,8);
 {const grT=T(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);const c=w/2;for(let rr=127;rr>34;rr-=1.5){g.beginPath();g.arc(c,c,rr,0,6.29);g.strokeStyle=rr%9<1.5?'#2c2c2e':(rr|0)%2?'#121213':'#1a1a1c';g.lineWidth=1.6;g.stroke()}
   const sh=g.createLinearGradient(0,0,w,h);sh.addColorStop(.35,'rgba(255,255,255,0)');sh.addColorStop(.5,'rgba(255,255,255,.13)');sh.addColorStop(.65,'rgba(255,255,255,0)');g.globalCompositeOperation='source-atop';g.fillStyle=sh;g.fillRect(0,0,w,h)});
  const d=new THREE.Mesh(new THREE.PlaneGeometry(29,29),new THREE.MeshStandardMaterial({map:grT,alphaTest:.5,roughness:.3,metalness:.1}));d.rotation.x=-Math.PI/2;d.position.set(340,87.25,139);d.userData.noTop=true;sc.add(d)}
 Cy(353.5,151,88.2,89.8,1.5,M(0x2a2a2c,{metalness:.7,roughness:.3}),null,14);RB(352.6,354.4,85.5,89,126.5,128.5,.4,M(0x2a2a2a),null,1);
 {const lid=Grp(357.6,85.6,139,0);lid.rotation.z=-1.36;const ac=new THREE.MeshStandardMaterial({color:0x1d1d22,transparent:true,opacity:.32,roughness:.08,metalness:.2});
  RB(-34.6,0,7,7.5,-17.8,17.8,.3,ac,lid,1);RB(-34.6,0,0,7,-17.8,-17.3,.2,ac,lid,1);RB(-34.6,0,0,7,17.3,17.8,.2,ac,lid,1);RB(-34.6,-34.1,0,7,-17.3,17.3,.2,ac,lid,1);
  [-12,12].forEach(z=>RB(-1.5,0,0,2.5,z-1.5,z+1.5,.3,M(0x111111),lid,1))}
 Cy(352,153,85.5,88.5,2.2,M(0x2a2a2a,{metalness:.6}),null,16);{const arm=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,22,8),chrome);arm.rotation.x=Math.PI/2;arm.rotation.z=.35;arm.position.set(348,88.6,143);add(arm);RB(343.5,346.5,87.8,89,131,134.5,.4,M(0x111111),null,1)}
 // Edifier R1280DB pair (wood sides, black front)
 [[102,116.6],[160.4,175]].forEach(([a,b])=>{RB(330,353.4,77,101.6,a,b,.8,M(0x6b4a2e,{roughness:.55}),null,2);B(329.4,330.2,77.6,101,a+.6,b-.6,M(0x151515,{roughness:.7}));
  const w=new THREE.Mesh(new THREE.CylinderGeometry(5.2,5.2,.6,28),M(0x222224,{roughness:.6}));w.rotation.z=Math.PI/2;w.position.set(329.2,86,(a+b)/2);add(w);
  const w2=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,.8,20),M(0x3a3a3c,{metalness:.4,roughness:.4}));w2.rotation.z=Math.PI/2;w2.position.set(329,86,(a+b)/2);add(w2);
  const tw=new THREE.Mesh(new THREE.CylinderGeometry(1.8,1.8,.7,20),M(0x2a2a2a,{metalness:.5,roughness:.3}));tw.rotation.z=Math.PI/2;tw.position.set(329.1,96.5,(a+b)/2);add(tw)});
 // 4 RÖDALM 30x40 frames above Kallax (2x2)
 [[110,104],[110,140],[156,104],[156,140]].forEach(([y,z],i)=>{RB(357.5,360,y,y+40,z,z+30,.5,frM);B(357.2,357.5,y+2.5,y+37.5,z+2.5,z+27.5,M(0xffffff,{map:poster(i),roughness:.7}))})}

// ---------- commode 6 tiroirs 120x40x76 (dark oak, black legs) + soundbar + decor ----------
{const Z0=199,Z1=319,X0=320,X1=360;const cmd=M(0xffffff,{map:oakT,roughness:.55}),cmd2=M(0xffffff,{map:oakT2,roughness:.5});
 [[X0+3,Z0+3],[X0+3,Z1-3],[X1-3,Z0+3],[X1-3,Z1-3],[X0+3,(Z0+Z1)/2],[X1-3,(Z0+Z1)/2]].forEach(p=>{const l=Lathe(p[0],0,p[1],[[0,0],[1.1,0],[1.6,8],[0,8]],metalBlk,12)});
 RB(X0,X1,8,76,Z0,Z1,.8,cmd,null,2);B(X0-.2,X0+.05,9,75.6,Z0+.6,Z1-.6,M(0x0d0a08,{roughness:1}));
 for(let c=0;c<2;c++)for(let r=0;r<3;r++){const z0=Z0+1.2+c*59.4,y0=10+r*21.8;RB(X0-.8,X0+.6,y0,y0+20.8,z0,z0+58.2,.6,cmd2,null,1);RB(X0-2.4,X0-.8,y0+13.6,y0+15.2,z0+17,z0+41,.6,metalBlk,null,1);
  [z0+18,z0+40].forEach(zz=>B(X0-2,X0-.8,y0+13.8,y0+15,zz-.6,zz+.6,metalBlk))}
 // soundbar Ultimea Apollo S40 (front) + FADO (back right) + tray, candles, diffuser, books
 RB(322,331,76,82.5,219,299,1.6,M(0x161616,{roughness:.6}),null,2);B(321.6,322,77,82,220,298,M(0x232325,{roughness:.9}));
 Lathe(346,76,307,[[0,0],[6,0],[6.2,.6],[5,2.6],[3,3.2],[0,3.2]],M(0xF7F6F2,{roughness:.3}),24);
 const fado=S(346,91.7,307,12.5,M(0xffffff,{emissive:0xffe2b0,emissiveIntensity:.05,roughness:.15}),1,1,1,null,28);R.fado=fado.material;
 RB(336,356,76,77.4,222,244,.6,M(C.brass,{metalness:.9,roughness:.25}));
 Lathe(349,76,268,[[0,0],[3.6,0],[3.8,7],[2,9.5],[1.2,10],[0,10]],M(0x5b4636,{transparent:true,opacity:.8,roughness:.1}),18);for(let i=0;i<5;i++){const s=B(348.6,349.4,86,99,267.6,268.4,M(0x3a2a1a));s.rotation.x=(i-2)*.14}
 RB(336,356,76,79.5,278,292,.4,M(C.olive));RB(337,355,79.5,82.5,279,291,.4,M(0xEDE5D3))}

// ---------- TV TCL 65C69K on wall (bottom at 105 cm) + Meliconi mount ----------
{const Y0=105,Y1=188.2,Z0=186.6,Z1=331.4,YC=(Y0+Y1)/2;
 B(355,359.8,YC-28,YC+28,240,278,M(0x1a1a1a,{metalness:.6}));
 RB(352.5,357,YC-30,YC+30,212,306,2,M(0x101011,{roughness:.4}));
 RB(350.6,353.2,Y0,Y1,Z0,Z1,.6,M(0x0b0b0c,{roughness:.3,metalness:.3}));
 R.screens.tv=noShadow(P(143,81.4,MB(0x000000,{map:tvT}),350.55,YC,259,-Math.PI/2));
 R.G.tvLed=[mkGlow(210,140,359.3,YC,259,-Math.PI/2)];
 R.ambiPads={l:mkGlow(90,150,359.2,YC,172,-Math.PI/2),r:mkGlow(90,150,359.2,YC,346,-Math.PI/2),t:mkGlow(200,70,359.2,Y1+13,259,-Math.PI/2),b:mkGlow(200,34,359.2,Y0-10,259,-Math.PI/2)};}

// leaf textures (alpha cut-out)
const ficusLeafT=T(128,256,(g,w,h)=>{g.clearRect(0,0,w,h);g.beginPath();g.moveTo(64,250);g.bezierCurveTo(30,220,24,170,30,140);g.bezierCurveTo(34,118,22,104,14,80);g.bezierCurveTo(4,40,30,6,64,8);g.bezierCurveTo(98,6,124,40,114,80);g.bezierCurveTo(106,104,94,118,98,140);g.bezierCurveTo(104,170,98,220,64,250);g.closePath();
 const gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#2f5a28');gr.addColorStop(.5,'#467a3a');gr.addColorStop(1,'#2c5525');g.fillStyle=gr;g.fill();g.strokeStyle='rgba(190,215,150,.75)';g.lineWidth=3;g.beginPath();g.moveTo(64,248);g.lineTo(64,14);g.stroke();
 g.lineWidth=1.6;for(let k=0;k<9;k++){const y=40+k*22;g.beginPath();g.moveTo(64,y+12);g.quadraticCurveTo(44,y+4,26,y-6);g.moveTo(64,y+12);g.quadraticCurveTo(84,y+4,102,y-6);g.stroke()}});
const monsteraLeafT=T(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);g.beginPath();g.moveTo(128,248);g.bezierCurveTo(40,236,4,160,14,100);g.bezierCurveTo(24,40,80,8,128,30);g.bezierCurveTo(176,8,232,40,242,100);g.bezierCurveTo(252,160,216,236,128,248);g.closePath();
 const gr=g.createRadialGradient(128,140,10,128,140,140);gr.addColorStop(0,'#3f7a35');gr.addColorStop(1,'#22501f');g.fillStyle=gr;g.fill();
 g.globalCompositeOperation='destination-out';g.lineWidth=7;g.lineCap='round';for(let k=0;k<7;k++){const a=-1.1+k*.37;[1,-1].forEach(sd=>{g.beginPath();const x0=128+sd*Math.cos(a)*54,y0=140+Math.sin(a)*54;g.moveTo(x0,y0);g.lineTo(128+sd*Math.cos(a)*140,140+Math.sin(a)*140);g.stroke()})}
 for(let k=0;k<4;k++){[1,-1].forEach(sd=>{g.beginPath();g.ellipse(128+sd*(30+k*4),110+k*28,6,3.5,0,0,7);g.fill()})}
 g.globalCompositeOperation='source-over';g.strokeStyle='rgba(170,200,130,.7)';g.lineWidth=3;g.beginPath();g.moveTo(128,246);g.lineTo(128,32);g.stroke()});

// ---------- plants: ficus lyrata (corner), monstera (window right), plant spots ----------
{const potM=M(0xC9C2B6,{roughness:.85});Lathe(336,0,340,[[0,0],[12,0],[13,1.5],[15.6,30],[16.4,30.4],[16.4,32],[15.2,32],[12.4,2],[0,2]],potM,32);Cy(336,340,30,31,14.8,soilM);
 const tr=new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(336,30,340),new THREE.Vector3(331,80,343),new THREE.Vector3(337,130,338)),16,1.6,8),M(0x5a3d22,{roughness:.9}));add(tr);
 const brM=M(0x5a3d22,{roughness:.9});const tips=[];for(let b=0;b<5;b++){const a=b*1.3+.4,ht=130+b*14;const e=new THREE.Vector3(336+Math.cos(a)*16,ht+16,340+Math.sin(a)*13);add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(336,95+b*12,340),new THREE.Vector3(336+Math.cos(a)*6,ht,340+Math.sin(a)*5),e),10,.7,6),brM));tips.push([e,a])}
 for(let i=0;i<72;i++){const[e,a0]=tips[i%5];const t=rnd(),a=a0+(rnd()-.5)*1.6,r=4+rnd()*14;const px=336+(e.x-336)*(.4+t*.6)+Math.cos(a)*r*.5,py=95+(e.y-95)*(.35+t*.65)+rnd()*10,pz=340+(e.z-340)*(.4+t*.6)+Math.sin(a)*r*.4;
  const g=Grp(px,py,pz,-a+Math.PI/2);g.rotation.x=-.9+rnd()*.7;g.rotation.z=(rnd()-.5)*.6;const lf=leafPlane(17+rnd()*6,27+rnd()*8,ficusLeafT,g);lf.position.y=12}
 // monstera at window right (x 226, z 336)
 Lathe(226,0,336,[[0,0],[10,0],[11.6,20],[12.7,20.3],[12.9,24],[11.5,24],[11.3,21],[9.6,1.5],[0,1.5]],M(0xC56B45,{roughness:.8}),24);Cy(226,336,22,23,11.2,soilM);
 for(let i=0;i<9;i++){const a=i/9*Math.PI*2+rnd()*.4,len=40+rnd()*45;const tip=new THREE.Vector3(226+Math.cos(a)*len*.45,22+len*.9,336+Math.sin(a)*len*.35);
  add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(226,22,336),new THREE.Vector3(226+Math.cos(a)*6,22+len*.6,336+Math.sin(a)*4),tip),10,.55,6),M(0x3d6b31)));
  const g=Grp(tip.x,tip.y,tip.z,-a+Math.PI/2);g.rotation.x=-1.05+rnd()*.3;const s=26+rnd()*10;const lf=leafPlane(s,s,monsteraLeafT,g);lf.position.y=s*.42}}
B(352,360,8,14,300,310,M(C.black,{metalness:.6}));Cy(354,305,14,20,3,M(C.black,{metalness:.6}));
// windowsill pothos
Lathe(150,90,368,[[0,0],[5,0],[6.4,10],[5.8,10],[4.4,1],[0,1]],M(0xEDE5D3,{roughness:.7}),18);for(let i=0;i<8;i++)rnd();pothos(150,100,368,[[-9,-9,26],[8,-10,18],[-14,-2,10]]);

// ---------- small items from the list: bedside runner, power strips, cable covers, plant spot ----------
{const runT=T(128,128,(g,w,h)=>{g.fillStyle='#E9E1CF';g.fillRect(0,0,w,h);for(let i=0;i<900;i++){g.fillStyle=`rgba(${170+(i*37)%50},${160+(i*53)%45},${140+(i*29)%40},.35)`;g.fillRect((i*71)%w,(i*113)%h,2,2)}g.fillStyle='#2a2622';for(let y=10;y<h;y+=28){g.fillRect(8,y,w-16,2)}},1,2);
 RB(58,148,0,1,110,168,.5,M(0xffffff,{map:runT,roughness:1}),null,1);
 const wh=M(0xF4F4F2,{roughness:.5});
 // KOPPLA x2 (desk side, bed side) + cables
 RB(118,148,0,4.5,3,8.5,1,wh,null,1);B(122,123,4.5,5.2,3,8.5,M(0xd04a3a));RB(4,9.5,0,4.5,96,126,1,wh,null,1);B(4,9.5,4.5,5.2,99,100,M(0xd04a3a));
 [[133,5.5,0,72],[7,111,0,40]].forEach(([x,z,y0,y1])=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,y1-y0,6),M(0x1a1a1a));c.position.set(x,(y0+y1)/2,z);add(c)});
 // cable covers (goulottes): desk leg to floor on north wall, TV to commode on east wall
 RB(146,147.6,0,72,0,1.1,.3,wh,null,1);RB(358.9,360,76,105,257.6,260.4,.3,wh,null,1);
 // plant spot behind the monstera
 Cy(246,352,0,3,4,M(C.black,{metalness:.6}),null,16);{const sp=Cy(0,0,-3,3,2.6,M(C.black,{metalness:.6}),3.2,16,Grp(246,7,352,0));sp.rotation.x=.5}}
// ---------- candles (flicker in cosy mode) ----------
R.flames=[];const candle=(x,y,z,h,r)=>{Cy(x,z,y,y+h,r||2.6,M(0xF3EBDD,{roughness:.9}),null,20);const f=noShadow(S(x,y+h+1.6,z,1.1,glow(0x000000,1),1,1.8,1));R.flames.push(f);const hl=noShadow(P(14,14,glow(0x000000,1),x,y+h+2,z,0));hl.material.map=softT;hl.userData.bb=1;R.flames.push(hl)};
candle(28,59,160,7);candle(30,59,152,4.5,2);candle(347,77.4,230,6);candle(341,77.4,237,4,2);candle(212,90,356,8,3);candle(200,90,357,5,2.2);

// ---------- arc lamp OMBRAGE (black, marble base) ----------
Lathe(300,0,338,[[0,0],[16,0],[16,4.5],[15,5],[0,5]],M(0xEDEBE6,{roughness:.25,metalness:.05}),36);
Lathe(300,5,338,[[0,0],[2.6,0],[2.2,3],[0,3]],metalBlk,16);
const arc=new THREE.QuadraticBezierCurve3(new THREE.Vector3(300,7,338),new THREE.Vector3(286,300,318),new THREE.Vector3(214,206,262));
add(new THREE.Mesh(new THREE.TubeGeometry(arc,56,1.4,10),M(C.black,{metalness:.6,roughness:.3})));
const shd=new THREE.Mesh(new THREE.SphereGeometry(24,32,16,0,Math.PI*2,0,Math.PI/2),M(C.black,{side:THREE.DoubleSide,metalness:.5,roughness:.32}));shd.position.set(214,184,262);add(shd);
Cy(214,262,204,208,2.2,metalBlk);
const arcBulb=noShadow(S(214,186,262,6,M(0xffffff,{emissive:0xffd9a0,emissiveIntensity:.05})));R.arcBulb=arcBulb.material;
// pendant GULLSUDARE 45 cm (ribbed paper globe)
Cy(180,180,226,250,.35,M(C.white));Cy(180,180,224,227,1.8,M(C.white));
const ribT=T(256,64,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);for(let i=0;i<h;i+=5){g.fillStyle='rgba(180,170,150,.35)';g.fillRect(0,i,w,1.2)}});
const pend=noShadow(S(180,202,180,22.5,M(0xffffff,{map:ribT,emissive:0xffe6c0,emissiveIntensity:.05,roughness:1}),1,.98,1,null,32));R.pend=pend.material;

// ---------- dust motes + sun shafts ----------
R.dust=[];const dm=glow(0xfff1d0,.9);for(let i=0;i<70;i++){const d=noShadow(B(-.35,.35,-.35,.35,-.35,.35,dm));d.position.set(125+rnd()*110,40+rnd()*170,180+rnd()*170);d.userData.seed=rnd()*100;R.dust.push(d)}
const shaftT=TI(64,256,(u,v)=>(1-v)*.9*Math.min(1,Math.min(u,1-u)*4));
R.shafts=[];for(let i=0;i<4;i++){const m=noShadow(new THREE.Mesh(new THREE.PlaneGeometry(52,260),glow(0xfff0d0,.05)));m.material.map=shaftT;m.position.set(132+i*32,150-40,300);m.rotation.x=0.68;m.rotation.y=.1*(i-1.5);sc.add(m);R.shafts.push(m)}

// ---------- lights ----------
const amb=new THREE.HemisphereLight(0xfff6ea,0x9a8068,.6);sc.add(amb);R.amb=amb;
const sun=new THREE.DirectionalLight(0xfff0dc,1);sun.position.set(180+150,180+420,180+500);sun.target.position.set(180,0,180);sc.add(sun);sc.add(sun.target);R.sun=sun;
sun.castShadow=true;if(sun.shadow&&sun.shadow.camera){sun.shadow.mapSize.set(2048,2048);const sc2=sun.shadow.camera;sc2.left=-330;sc2.right=330;sc2.top=330;sc2.bottom=-330;sc2.near=50;sc2.far=1600;sun.shadow.bias=-.0008}
function PL(name,c,x,y,z,d,dec){const l=new THREE.PointLight(c,0,d||300,dec||1.5);l.position.set(x,y,z);sc.add(l);R.L[name]=l;return l}
PL('pend',0xffe1b8,180,196,180,520);PL('arc',0xffd39a,214,176,262,330);PL('ns',0xffd09a,18,76,140,220);PL('fado',0xffd9a8,346,92,307,220);
PL('desk',0xfff0d8,118,100,36,170);PL('shelf',0xf4f7ff,80,152,14,150,1.2);PL('bed',0xff8a30,100,6,249,190);PL('head',0xff8a30,6,118,249,200);
PL('tv',0xff8a30,357,147,259,230);PL('tvs',0xffb080,330,147,259,260);PL('mon',0x7a6cff,80,104,40,170);PL('pc',0xb040ff,139,26,70,140);PL('sneak',0xfff0d8,10,150,116,110);PL('spot',0xfff3dc,330,60,330,160);PL('candle',0xff9a40,345,88,233,150,1.6);PL('candle2',0xff9a40,29,68,157,140,1.6);PL('candle3',0xff9a40,206,102,350,130,1.6);
{const sp=(n,d,c)=>{const l=Math.hypot(...d);R.L[n].userData.spot=[d[0]/l,d[1]/l,d[2]/l,c]};sp('arc',[0,-1,0],.15);sp('desk',[-23,-24,16],.45);sp('spot',[.15,1,.2],.55);sp('sneak',[0,-1,0],.1)}
return R}
if(typeof module!=='undefined')module.exports=buildRoom;
