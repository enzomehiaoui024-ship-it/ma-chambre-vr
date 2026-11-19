const THREE=(()=>{
class V3{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}set(x,y,z){this.x=x;this.y=y;this.z=z;return this}copy(v){return this.set(v.x,v.y,v.z)}clone(){return new V3(this.x,this.y,this.z)}lerpVectors(a,b,t){return this.set(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t)}}
class Color{constructor(h){this.set(h==null?0xffffff:h)}set(h){if(typeof h==='string')h=parseInt(h.replace('#',''),16);if(h instanceof Color){this.r=h.r;this.g=h.g;this.b=h.b;return this}this.r=((h>>16)&255)/255;this.g=((h>>8)&255)/255;this.b=(h&255)/255;return this}getHex(){return (Math.round(this.r*255)<<16)|(Math.round(this.g*255)<<8)|Math.round(this.b*255)}}
class Obj{constructor(){this.userData={};this.visible=true;this.position=new V3();this.rotation={x:0,y:0,z:0};this.scale=new V3(1,1,1);this.children=[];this.parent=null}add(o){this.children.push(o);o.parent=this;return this}remove(o){this.children=this.children.filter(c=>c!==o)}}
class Mesh extends Obj{constructor(g,m){super();this.geometry=g;this.material=m;this.isMesh=true}}
class Group extends Obj{} class Scene extends Obj{}
class HemisphereLight extends Obj{constructor(s,g,i){super();this.isHemi=true;this.color=new Color(s);this.groundColor=new Color(g);this.intensity=i}}
class DirectionalLight extends Obj{constructor(c,i){super();this.isDir=true;this.color=new Color(c);this.intensity=i;this.target=new Obj();this.shadow={mapSize:{set(){}},camera:{}}}}
class PointLight extends Obj{constructor(c,i,d,dec){super();this.isPoint=true;this.color=new Color(c);this.intensity=i;this.distance=d||0;this.decay=dec==null?1:dec}}
class Mat{constructor(o){o=o||{};this.isMaterial=true;this.color=new Color(o.color==null?0xffffff:o.color);this.map=o.map||null;this.emissive=new Color(o.emissive||0);this.emissiveIntensity=o.emissiveIntensity==null?1:o.emissiveIntensity;this.transparent=!!o.transparent;this.opacity=o.opacity==null?1:o.opacity;this.side=o.side||0;this.basic=false;this.roughness=o.roughness==null?1:o.roughness;this.metalness=o.metalness||0;this.blending=o.blending||1;this.depthWrite=o.depthWrite!==false;this.alphaTest=o.alphaTest||0}}
class MeshStandardMaterial extends Mat{} class MeshBasicMaterial extends Mat{constructor(o){super(o);this.basic=true}}
class CanvasTexture{constructor(c){this.image=c;this.wrapS=this.wrapT=0;this.repeat={x:1,y:1,set(a,b){this.x=a;this.y=b}}}}
function G(P,N,U){return{pos:new Float32Array(P),nor:new Float32Array(N),uv:new Float32Array(U)}}
function quad(P,N,U,a,b,c,d,n){[a,b,c,a,c,d].forEach((v,i)=>{P.push(...v);N.push(...n)});U.push(0,0,1,0,1,1,0,0,1,1,0,1)}
function fix(g){const p=g.pos,n=g.nor;for(let i=0;i<p.length;i+=9){const ax=p[i],ay=p[i+1],az=p[i+2],bx=p[i+3]-ax,by=p[i+4]-ay,bz=p[i+5]-az,cx=p[i+6]-ax,cy=p[i+7]-ay,cz=p[i+8]-az;const fx=by*cz-bz*cy,fy=bz*cx-bx*cz,fz=bx*cy-by*cx;const nx=n[i]+n[i+3]+n[i+6],ny=n[i+1]+n[i+4]+n[i+7],nz=n[i+2]+n[i+5]+n[i+8];if(fx*nx+fy*ny+fz*nz<0){for(let k=0;k<3;k++){const t=p[i+3+k];p[i+3+k]=p[i+6+k];p[i+6+k]=t;const s=n[i+3+k];n[i+3+k]=n[i+6+k];n[i+6+k]=s}const u=g.uv,j=i/9*6;let t=u[j+2];u[j+2]=u[j+4];u[j+4]=t;t=u[j+3];u[j+3]=u[j+5];u[j+5]=t}}return g}
function BoxGeometry(w,h,d){const P=[],N=[],U=[],x=w/2,y=h/2,z=d/2;
quad(P,N,U,[x,-y,z],[x,-y,-z],[x,y,-z],[x,y,z],[1,0,0]);quad(P,N,U,[-x,-y,-z],[-x,-y,z],[-x,y,z],[-x,y,-z],[-1,0,0]);
quad(P,N,U,[-x,y,z],[x,y,z],[x,y,-z],[-x,y,-z],[0,1,0]);quad(P,N,U,[-x,-y,-z],[x,-y,-z],[x,-y,z],[-x,-y,z],[0,-1,0]);
quad(P,N,U,[-x,-y,z],[x,-y,z],[x,y,z],[-x,y,z],[0,0,1]);quad(P,N,U,[x,-y,-z],[-x,-y,-z],[-x,y,-z],[x,y,-z],[0,0,-1]);return fix(G(P,N,U))}
function PlaneGeometry(w,h){const P=[],N=[],U=[];quad(P,N,U,[-w/2,-h/2,0],[w/2,-h/2,0],[w/2,h/2,0],[-w/2,h/2,0],[0,0,1]);return fix(G(P,N,U))}
function CylinderGeometry(rt,rb,h,s,hs,open){s=s||24;const P=[],N=[],U=[],y=h/2;for(let i=0;i<s;i++){const a0=i/s*2*Math.PI,a1=(i+1)/s*2*Math.PI;const c0=Math.cos(a0),s0=Math.sin(a0),c1=Math.cos(a1),s1=Math.sin(a1);
const v=[[rb*s0,-y,rb*c0],[rb*s1,-y,rb*c1],[rt*s1,y,rt*c1],[rt*s0,y,rt*c0]],n=[[s0,0,c0],[s1,0,c1],[s1,0,c1],[s0,0,c0]];[0,1,2,0,2,3].forEach(k=>{P.push(...v[k]);N.push(...n[k])});U.push(i/s,0,(i+1)/s,0,(i+1)/s,1,i/s,0,(i+1)/s,1,i/s,1);
if(!open){if(rt>0){P.push(0,y,0,rt*s0,y,rt*c0,rt*s1,y,rt*c1);N.push(0,1,0,0,1,0,0,1,0);U.push(.5,.5,0,0,1,0)}if(rb>0){P.push(0,-y,0,rb*s1,-y,rb*c1,rb*s0,-y,rb*c0);N.push(0,-1,0,0,-1,0,0,-1,0);U.push(.5,.5,0,0,1,0)}}}return fix(G(P,N,U))}
function ConeGeometry(r,h,s,hs,open){return CylinderGeometry(0,r,h,s,1,open)}
function SphereGeometry(r,ws,hs,p0,pl,t0,tl){ws=ws||20;hs=hs||14;p0=p0||0;pl=pl==null?2*Math.PI:pl;t0=t0||0;tl=tl==null?Math.PI:tl;const P=[],N=[],U=[];const pt=(u,v)=>{const ph=p0+u*pl,th=t0+v*tl;return[-Math.cos(ph)*Math.sin(th),Math.cos(th),Math.sin(ph)*Math.sin(th)]};
for(let j=0;j<hs;j++)for(let i=0;i<ws;i++){const a=pt(i/ws,j/hs),b=pt((i+1)/ws,j/hs),c=pt((i+1)/ws,(j+1)/hs),d=pt(i/ws,(j+1)/hs);[a,d,c,a,c,b].forEach(q=>{P.push(q[0]*r,q[1]*r,q[2]*r);N.push(...q)});U.push(0,0,0,1,1,1,0,0,1,1,1,0)}return fix(G(P,N,U))}
class QuadraticBezierCurve3{constructor(a,b,c){this.a=a;this.b=b;this.c=c}getPoint(t){const u=1-t,A=this.a,B=this.b,C=this.c;return new V3(u*u*A.x+2*u*t*B.x+t*t*C.x,u*u*A.y+2*u*t*B.y+t*t*C.y,u*u*A.z+2*u*t*B.z+t*t*C.z)}}
function TubeGeometry(cv,n,r,rs){rs=rs||8;const P=[],N=[],U=[];const pts=[],fr=[];for(let i=0;i<=n;i++)pts.push(cv.getPoint(i/n));
for(let i=0;i<=n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n,i+1)];let t=[b.x-a.x,b.y-a.y,b.z-a.z];let l=Math.hypot(...t);t=t.map(v=>v/l);let ref=Math.abs(t[1])<.9?[0,1,0]:[1,0,0];let nn=[t[1]*ref[2]-t[2]*ref[1],t[2]*ref[0]-t[0]*ref[2],t[0]*ref[1]-t[1]*ref[0]];l=Math.hypot(...nn);nn=nn.map(v=>v/l);const bb=[t[1]*nn[2]-t[2]*nn[1],t[2]*nn[0]-t[0]*nn[2],t[0]*nn[1]-t[1]*nn[0]];fr.push([nn,bb])}
const ring=(i,k)=>{const a=k/rs*2*Math.PI,[nn,bb]=fr[i],c=Math.cos(a),s=Math.sin(a);const d=[nn[0]*c+bb[0]*s,nn[1]*c+bb[1]*s,nn[2]*c+bb[2]*s];return[[pts[i].x+d[0]*r,pts[i].y+d[1]*r,pts[i].z+d[2]*r],d]};
for(let i=0;i<n;i++)for(let k=0;k<rs;k++){const q=[ring(i,k),ring(i+1,k),ring(i+1,k+1),ring(i,k+1)];[0,1,2,0,2,3].forEach(m=>{P.push(...q[m][0]);N.push(...q[m][1])});U.push(0,0,1,0,1,1,0,0,1,1,0,1)}return fix(G(P,N,U))}

function RoundedBoxGeometry(w,h,d,r,s){s=s||3;r=Math.max(.01,Math.min(r,w/2,h/2,d/2)*.999);const P=[],N=[],U=[];const He=[w/2,h/2,d/2],In=He.map(v=>v-r);
const co=Hh=>{const a=[];for(let k=0;k<=s;k++){const f=k/s*Math.PI/2;a.push(-(Hh-r)-r*Math.cos(f))}for(let k=0;k<=s;k++){const f=k/s*Math.PI/2;const v=(Hh-r)+r*Math.sin(f);if(Math.abs(v-a[a.length-1])>1e-6)a.push(v)}return a};
const C=[co(He[0]),co(He[1]),co(He[2])];
const vert=(p)=>{const q=[0,1,2].map(i=>Math.max(-In[i],Math.min(In[i],p[i])));let n=[p[0]-q[0],p[1]-q[1],p[2]-q[2]];let l=Math.hypot(...n);if(l<1e-9)return null;n=n.map(v=>v/l);return{p:[q[0]+n[0]*r,q[1]+n[1]*r,q[2]+n[2]*r],n}};
const faces=[[0,1,1,2],[0,-1,1,2],[1,1,0,2],[1,-1,0,2],[2,1,0,1],[2,-1,0,1]];
for(const[ax,sg,ua,va]of faces){const A=C[ua],B=C[va];for(let i=0;i<A.length-1;i++)for(let j=0;j<B.length-1;j++){const pt=(a,b)=>{const p=[0,0,0];p[ax]=sg*He[ax];p[ua]=a;p[va]=b;const v=vert(p);if(!v){const n=[0,0,0];n[ax]=sg;return{p,n}}return v};
 const q=[pt(A[i],B[j]),pt(A[i+1],B[j]),pt(A[i+1],B[j+1]),pt(A[i],B[j+1])];const a0=A[0],aL=A[A.length-1]-a0,b0=B[0],bL=B[B.length-1]-b0,U_=x=>(x-a0)/aL,V_=y=>(y-b0)/bL;const uv=[[U_(A[i]),V_(B[j])],[U_(A[i+1]),V_(B[j])],[U_(A[i+1]),V_(B[j+1])],[U_(A[i]),V_(B[j+1])]];
 [0,1,2,0,2,3].forEach(k=>{P.push(...q[k].p);N.push(...q[k].n);U.push(...uv[k])})}}return fix(G(P,N,U))}
function LatheGeometry(pts,seg){seg=seg||32;const P=[],N=[],U=[];const n=pts.length;const nr=[];for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];let tx=b[0]-a[0],ty=b[1]-a[1];const l=Math.hypot(tx,ty)||1;nr.push([ty/l,-tx/l])}
for(let i=0;i<n-1;i++)for(let k=0;k<seg;k++){const a0=k/seg*2*Math.PI,a1=(k+1)/seg*2*Math.PI;const V=(pi,a)=>{const[r,y]=pts[pi];return[r*Math.cos(a),y,r*Math.sin(a)]},Nn=(pi,a)=>{const[nx,ny]=nr[pi];return[nx*Math.cos(a),ny,nx*Math.sin(a)]};
 const q=[[i,a0],[i,a1],[i+1,a1],[i+1,a0]];[0,1,2,0,2,3].forEach(m=>{P.push(...V(q[m][0],q[m][1]));N.push(...Nn(q[m][0],q[m][1]));U.push(q[m][1]/(2*Math.PI),q[m][0]/(n-1))})}return fix(G(P,N,U))}
class PerspectiveCamera extends Obj{constructor(f,a,n,fa){super();this.fov=f;this.aspect=a;this.near=n;this.far=fa;this.target=new V3()}lookAt(v){this.target.copy(v)}updateProjectionMatrix(){}}
return{Vector3:V3,Color,Mesh,Group,Scene,HemisphereLight,DirectionalLight,PointLight,MeshStandardMaterial,MeshBasicMaterial,CanvasTexture,BoxGeometry:BoxGeometry,PlaneGeometry,CylinderGeometry,ConeGeometry,SphereGeometry,TubeGeometry,QuadraticBezierCurve3,PerspectiveCamera,RoundedBoxGeometry,LatheGeometry,RepeatWrapping:1000,DoubleSide:2,PCFSoftShadowMap:1,AdditiveBlending:2,NormalBlending:1}})();
// constructors used with new: wrap geometry fns
['BoxGeometry','PlaneGeometry','CylinderGeometry','ConeGeometry','SphereGeometry','TubeGeometry','RoundedBoxGeometry','LatheGeometry'].forEach(k=>{const f=THREE[k];THREE[k]=function(...a){return f(...a)}});
