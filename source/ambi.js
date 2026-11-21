// Ambilight: animated TV picture + wall glow that follows the screen edges.
function makeAmbi(R,THREE){
const c=document.createElement('canvas');c.width=256;c.height=144;const g=c.getContext('2d');
const T=new THREE.CanvasTexture(c);T.ver=1;const stat=R.screens.tv.material.map;
const P=[['#ff7b2e','#7a2a8c','#ffd36b'],['#0d6fb8','#1fd1c1','#e8fbff'],['#1f7a3a','#9fd34a','#f2f7c8'],['#ff2fa8','#22d8ff','#8a3dff'],['#ff3b1a','#ffb81a','#fff1a8'],['#3b2cff','#ff4fd8','#ffe14a']];
const hx=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const mixh=(a,b,t)=>{const A=hx(a),B=hx(b);return`rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')})`};
function draw(t){const k=t/7,i=Math.floor(k)%P.length,j=(i+1)%P.length,f=Math.min(1,Math.max(0,(k%1-.75)*4));const a=P[i],b=P[j];const C=n=>mixh(a[n],b[n],f);
 const gr=g.createLinearGradient(0,0,256,0);gr.addColorStop(0,C(0));gr.addColorStop(.5+.35*Math.sin(t*.6),C(2));gr.addColorStop(1,C(1));g.fillStyle=gr;g.fillRect(0,0,256,144);
 for(let q=0;q<4;q++){const x=128+Math.sin(t*(.5+q*.21)+q*2)*110,y=72+Math.cos(t*(.4+q*.17)+q)*55,r=26+q*8;const rg=g.createRadialGradient(x,y,2,x,y,r);rg.addColorStop(0,C(q%3));rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(0,0,256,144)}
 g.fillStyle='rgba(0,0,0,.35)';g.fillRect(0,112+Math.sin(t*.8)*6,256,40);T.ver++}
function avg(d,x0,y0,x1,y1){let r=0,gg=0,b=0,n=0;for(let y=y0;y<y1;y+=4)for(let x=x0;x<x1;x+=4){const o=(y*256+x)*4;r+=d[o];gg+=d[o+1];b+=d[o+2];n++}return[r/n/255,gg/n/255,b/n/255]}
const pads=R.ambiPads;const SM={};let lastT=null;
return function(s,t){const on=s.ambi||0;if(on<.01){if(R.screens.tv.material.map!==stat)R.screens.tv.material.map=stat;for(const k in pads){const c=pads[k].material.color;c.r=c.g=c.b=0}return}
 draw(typeof window!=='undefined'&&window.__ambiFix!=null?window.__ambiFix:t);R.screens.tv.material.map=T;const d=g.getImageData(0,0,256,144).data;
 const E={l:avg(d,0,0,40,144),r:avg(d,216,0,256,144),t:avg(d,0,0,256,30),b:avg(d,0,114,256,144)};const A=[0,1,2].map(i=>(E.l[i]+E.r[i]+E.t[i]+E.b[i])/4);
 const boost=v=>{const m=Math.max(...v,.001);return v.map(x=>Math.pow(x/m,1.6)*Math.min(1,m*1.4))};
 for(const k in pads){const v=boost(E[k]);const c=pads[k].material.color;c.r=v[0]*on*.75;c.g=v[1]*on*.75;c.b=v[2]*on*.75}
 const av=boost(A);const L=R.L.tv;L.color.r=av[0];L.color.g=av[1];L.color.b=av[2];L.intensity=Math.max(L.intensity,1.1*on);const L2=R.L.tvs;L2.color.r=A[0];L2.color.g=A[1];L2.color.b=A[2];L2.intensity=Math.max(L2.intensity,.55*on*s.tv);
 const g0=R.G.tvLed[0].material.color;g0.r=av[0]*.35*on;g0.g=av[1]*.35*on;g0.b=av[2]*.35*on;
 // « Ciné immersif » : toutes les lumières colorées de la chambre suivent l'image (comme Govee DreamView)
 const rm=s.ambiRoom||0;if(rm<.01){lastT=t;return}
 const dt=Math.min(.2,Math.max(0,t-(lastT==null?t:lastT)));lastT=t;const k=1-Math.exp(-dt*5);
 const mixv=(a,b,f)=>a.map((x,i)=>x+(b[i]-x)*f);
 const Z={sneak:boost(E.l),arc:boost(E.r),pend:boost(E.t),bed:boost(mixv(E.b,E.r,.4)),head:boost(mixv(A,E.r,.3))};
 for(const z in Z){if(!SM[z])SM[z]=Z[z].slice();SM[z]=mixv(SM[z],Z[z],k)}
 const setL=(n,c,i)=>{const L=R.L[n];if(!L)return;L.color.r=L.color.r+(c[0]-L.color.r)*rm;L.color.g=L.color.g+(c[1]-L.color.g)*rm;L.color.b=L.color.b+(c[2]-L.color.b)*rm;L.intensity=L.intensity+(i-L.intensity)*rm};
 setL('bed',SM.bed,1.25);setL('head',SM.head,.85);setL('sneak',SM.sneak,.7);setL('arc',SM.arc,.75);setL('pend',SM.pend,.3);
 const setG=(n,c,f)=>(R.G[n]||[]).forEach(m=>{const q=m.material.color;q.r+=(c[0]*f-q.r)*rm;q.g+=(c[1]*f-q.g)*rm;q.b+=(c[2]*f-q.b)*rm});
 setG('bedLed',SM.bed,.8);setG('headLed',SM.head,.5);setG('sneak',SM.sneak,.4);
 const em=(m,c,i)=>{if(!m)return;if(m.emissive){m.emissive.r+=(Math.min(1,c[0]*.7+.3)-m.emissive.r)*rm;m.emissive.g+=(Math.min(1,c[1]*.7+.3)-m.emissive.g)*rm;m.emissive.b+=(Math.min(1,c[2]*.7+.3)-m.emissive.b)*rm}m.emissiveIntensity+=(i-m.emissiveIntensity)*rm};
 em(R.arcBulb,SM.arc,1.0);em(R.pend,SM.pend,.35)}}
