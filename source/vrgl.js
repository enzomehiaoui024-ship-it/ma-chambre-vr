// Lightweight renderer for WebXR (Quest 2): merged static batches, per-zone light culling (max 8),
// sun shadow (4 taps), top AO (4 taps), ACES. Depends on helpers from gl2.js (m4mul, compose, persp, look, nmat, ortho, PACK, SVS, SFS).
const VNL=8;
const VVS=`attribute vec3 aP,aN;attribute vec2 aU;uniform mat4 uM,uVP,uSL,uTL;uniform mat3 uNM;varying vec3 vW,vN;varying vec2 vU;varying vec4 vS,vT;
void main(){vec4 w=uM*vec4(aP,1.);vW=w.xyz;vN=normalize(uNM*aN);vU=aU;vS=uSL*w;vT=uTL*(w+vec4(vN*5.,0.));gl_Position=uVP*w;}`;
const VFS=`precision highp float;${PACK}varying vec3 vW,vN;varying vec2 vU;varying vec4 vS,vT;
uniform vec3 uCol,uEm,uSky,uGnd,uSD,uSC,uCam;uniform float uOp,uHI,uRough,uMetal,uExpo;uniform float uAT;uniform int uNL,uSpec,uBasic,uHasMap,uDbl,uFract,uSun;
uniform sampler2D uMap,uSM,uTM;uniform vec2 uRep;uniform vec3 uPP[${VNL}],uPC[${VNL}];uniform float uPD[${VNL}],uPDec[${VNL}];
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
float sunSh(){vec3 p=vS.xyz/vS.w*.5+.5;if(p.x<0.||p.x>1.||p.y<0.||p.y>1.)return 1.;float tx=1./2048.,s=0.;
s+=(p.z-.0012>unpack(texture2D(uSM,p.xy+vec2(-tx,-tx))))?0.:1.;s+=(p.z-.0012>unpack(texture2D(uSM,p.xy+vec2(tx,-tx))))?0.:1.;s+=(p.z-.0012>unpack(texture2D(uSM,p.xy+vec2(-tx,tx))))?0.:1.;s+=(p.z-.0012>unpack(texture2D(uSM,p.xy+vec2(tx,tx))))?0.:1.;return s*.25;}
float topAO(){vec3 p=vT.xyz/vT.w*.5+.5;if(p.x<0.||p.x>1.||p.y<0.||p.y>1.)return 1.;float o=0.,r=8./420.;
for(int i=0;i<4;i++){float a=float(i)*1.5708+.4;float d=unpack(texture2D(uTM,p.xy+vec2(cos(a),sin(a))*r));float gap=(p.z-d)*300.;if(gap>1.5)o+=exp(-gap/85.);}return 1.-.7*o*.25;}
void main(){vec2 uv=uFract==1?fract(vU*uRep):vU*uRep;vec4 tx=vec4(1.);vec3 base=uCol;if(uHasMap==1){tx=texture2D(uMap,uv);base*=uBasic==1?tx.rgb:pow(tx.rgb,vec3(2.2));}
if(uHasMap==1&&tx.a<uAT)discard;if(uBasic==1){gl_FragColor=vec4(base,uOp*tx.a);return;}
vec3 n=normalize(vN);if(uDbl==1&&!gl_FrontFacing)n=-n;vec3 V=normalize(uCam-vW);
float dx=min(vW.x,360.-vW.x),dz=min(vW.z,360.-vW.z),dw=min(dx,dz),dy=min(vW.y,250.-vW.y);float inR=step(-1.,vW.x)*step(vW.x,361.)*step(-1.,vW.z)*step(vW.z,361.);
float aoc=1.-inR*(.32*(1.-smoothstep(0.,40.,dw))*(1.-smoothstep(0.,40.,dy))+.22*(1.-smoothstep(0.,45.,dx))*(1.-smoothstep(0.,45.,dz)));
vec3 amb=mix(uGnd,uSky,.5*n.y+.5)*uHI*topAO()*aoc;
float sh=4.+(1.-uRough)*(1.-uRough)*180.;float ks=mix(.04,1.,uMetal)*(1.-uRough)*(1.-uRough)*1.6;vec3 dif=vec3(0.),spc=vec3(0.);
if(uSun==1){float nl=max(dot(n,uSD),0.);if(nl>0.){float s=sunSh();dif+=uSC*nl*s;if(uSpec==1)spc+=uSC*pow(max(dot(n,normalize(uSD+V)),0.),sh)*s*nl;}}
for(int i=0;i<${VNL};i++){if(i>=uNL)break;vec3 d=uPP[i]-vW;float ds=length(d);if(ds>uPD[i])continue;vec3 L=d/ds;float f=pow(1.-ds/uPD[i],uPDec[i]);float nd=max(dot(n,L),0.);dif+=uPC[i]*f*nd;if(uSpec==1)spc+=uPC[i]*f*pow(max(dot(n,normalize(L+V)),0.),sh)*nd;}
vec3 col=base*(amb+dif)*(1.-uMetal*.5)+spc*ks*mix(vec3(1.),base,uMetal)+base*uMetal*amb*.6+uEm;
gl_FragColor=vec4(pow(aces(col*uExpo),vec3(1./2.2)),uOp);}`;
function makeVRRenderer(gl,scene,dynamicSet){
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o};
const prog=(v,f)=>{const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,v));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));const U=new Proxy({},{get:(o,k)=>k in o?o[k]:(o[k]=gl.getUniformLocation(p,k))});return{p,U}};
const PM=prog(VVS,VFS),PS=prog(SVS,SFS);
const attr={P:gl.getAttribLocation(PM.p,'aP'),N:gl.getAttribLocation(PM.p,'aN'),U:gl.getAttribLocation(PM.p,'aU'),SP:gl.getAttribLocation(PS.p,'aP')};
function fbo(w,h){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(p=>gl.texParameteri(gl.TEXTURE_2D,p,gl.CLAMP_TO_EDGE));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
const f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);const r=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,r);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,w,h);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,r);gl.bindFramebuffer(gl.FRAMEBUFFER,null);return{t,f,w,h}}
const SM=fbo(2048,2048),TM=fbo(1024,1024);
const texs=new Map();const pot=n=>(n&(n-1))==0;
function tex(t){if(texs.has(t)){const r=texs.get(t);if(t.ver&&r.v!==t.ver){gl.bindTexture(gl.TEXTURE_2D,r.o);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,t.image);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);r.v=t.ver}return r}const o=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,o);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,t.image);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
const P2=pot(t.image.width)&&pot(t.image.height);const wr=P2?gl.REPEAT:gl.CLAMP_TO_EDGE;[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(p=>gl.texParameteri(gl.TEXTURE_2D,p,wr));
if(P2){gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR)}else gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);const r={o,P2,v:t.ver};texs.set(t,r);return r}
function collect(){const meshes=[],pts=[];let hemi=null,dir=null;(function walk(o,pm,vis){const m=pm?m4mul(pm,compose(o)):compose(o);const v=vis&&o.visible!==false;if(o.isMesh)meshes.push([o,m,v]);if(o.isHemi)hemi=o;if(o.isDir)dir=o;if(o.isPoint)pts.push(o);o.children.forEach(c=>walk(c,m,v))})(scene,null,true);return{meshes,pts,hemi,dir}}
const lin=v=>Math.pow(v,2.2);
// ---------- build static batches ----------
const {meshes:all}=collect();const batches=[],dyn=[];const groups=new Map();
const mkey=mt=>[mt.map?(mt.map.__id||(mt.map.__id=Math.random())):0,mt.map?mt.map.repeat.x+','+mt.map.repeat.y:'',mt.color.getHex(),mt.emissive.getHex(),mt.emissiveIntensity.toFixed(3),mt.roughness,mt.metalness,mt.transparent,mt.opacity,mt.side,mt.blending,mt.basic,mt.depthWrite].join('|');
function xf(m,x,y,z){return[m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]]}
for(const[o,m]of all){if(o.userData&&(o.userData.dynamic))continue;const mt=o.material;
 if(dynamicSet.has(o)){dyn.push(o);continue}
 const isDynMat=dynamicSet.has(mt);const g=o.geometry,p=g.pos;let cx=0,cz=0;for(let i=0;i<p.length;i+=3){const w=xf(m,p[i],p[i+1],p[i+2]);cx+=w[0];cz+=w[2]}cx/=p.length/3;cz/=p.length/3;
 let big=p.length===18;if(big){const W=[0,1,2,3,4,5].map(k=>xf(m,p[k*3],p[k*3+1],p[k*3+2]));const sp=Math.max(...[0,1,2].map(a=>Math.max(...W.map(q=>q[a]))-Math.min(...W.map(q=>q[a]))));if(sp<=150)big=false}const cell=big?'big'+Math.random():(Math.floor(cx/90)+','+Math.floor(cz/90));
 const key=(isDynMat?('D'+(mt.__id||(mt.__id=Math.random()))):mkey(mt))+'@'+cell;
 if(!groups.has(key))groups.set(key,{mt,objs:[],P:[],N:[],U:[]});const G=groups.get(key);G.objs.push(o);
 const nm=nmat(m);const tri=(a,b,c)=>{for(const k of[a,b,c]){const w=xf(m,p[k*3],p[k*3+1],p[k*3+2]);G.P.push(...w);const nx=g.nor[k*3],ny=g.nor[k*3+1],nz=g.nor[k*3+2];const N=[nm[0]*nx+nm[3]*ny+nm[6]*nz,nm[1]*nx+nm[4]*ny+nm[7]*nz,nm[2]*nx+nm[5]*ny+nm[8]*nz];const l=Math.hypot(...N)||1;G.N.push(N[0]/l,N[1]/l,N[2]/l);G.U.push(g.uv[k*2],g.uv[k*2+1])}};
 if(big){// subdivide large quads into tiles for better light culling
  const v=[0,1,2,3,4,5].map(k=>[...xf(m,p[k*3],p[k*3+1],p[k*3+2])]);const span=Math.max(...[0,1,2].map(a=>Math.max(...v.map(q=>q[a]))-Math.min(...v.map(q=>q[a]))));
  if(span>150){G.objs.pop();const n=Math.ceil(span/90);// quad corners: triangles (0,1,2),(0,2,3) in shim order a,b,c,a,c,d
   const A=0,Bi=1,Ci=2,Di=5;const cw=k=>({w:xf(m,p[k*3],p[k*3+1],p[k*3+2]),u:[g.uv[k*2],g.uv[k*2+1]],n:[g.nor[k*3],g.nor[k*3+1],g.nor[k*3+2]]});const qa=cw(A),qb=cw(Bi),qc=cw(Ci),qd=cw(Di);
   const N0=(()=>{const nx=qa.n[0],ny=qa.n[1],nz=qa.n[2];const N=[nm[0]*nx+nm[3]*ny+nm[6]*nz,nm[1]*nx+nm[4]*ny+nm[7]*nz,nm[2]*nx+nm[5]*ny+nm[8]*nz];const l=Math.hypot(...N)||1;return N.map(x=>x/l)})();
   const bil=(s,t)=>{const L=(a,b,u)=>a.map((x,i)=>x+(b[i]-x)*u);const top=L(qa.w,qb.w,s),bot=L(qd.w,qc.w,s);const ut=L(qa.u,qb.u,s),ub=L(qd.u,qc.u,s);return{w:L(top,bot,t),u:L(ut,ub,t)}};
   for(let i=0;i<n;i++)for(let j=0;j<n;j++){const c00=bil(i/n,j/n),c10=bil((i+1)/n,j/n),c11=bil((i+1)/n,(j+1)/n),c01=bil(i/n,(j+1)/n);const mid=bil((i+.5)/n,(j+.5)/n).w;
    const k2=(isDynMat?('D'+mt.__id):mkey(mt))+'@'+Math.floor(mid[0]/90)+','+Math.floor(mid[2]/90)+(Math.abs(mid[1]-125)>100?'h':'v');if(!groups.has(k2))groups.set(k2,{mt,objs:[],P:[],N:[],U:[]});const H=groups.get(k2);H.objs.push(o);
    for(const q of[c00,c10,c11,c00,c11,c01]){H.P.push(...q.w);H.N.push(...N0);H.U.push(...q.u)}}
   continue}}
 for(let i=0;i<p.length/3;i+=3)tri(i,i+1,i+2)}
const mk=a=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(a),gl.STATIC_DRAW);return b};
for(const G of groups.values()){if(!G.P.length)continue;let c=[0,0,0];const n=G.P.length/3;for(let i=0;i<G.P.length;i+=3){c[0]+=G.P[i];c[1]+=G.P[i+1];c[2]+=G.P[i+2]}c=c.map(x=>x/n);let r=0;for(let i=0;i<G.P.length;i+=3)r=Math.max(r,Math.hypot(G.P[i]-c[0],G.P[i+1]-c[1],G.P[i+2]-c[2]));
 batches.push({mt:G.mt,objs:G.objs,p:mk(G.P),n:mk(G.N),u:mk(G.U),c:n,ps:G.P,ctr:c,r})}
const I4=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),I3=new Float32Array([1,0,0,0,1,0,0,0,1]);
const gbuf=new Map();function geo(g){if(gbuf.has(g))return gbuf.get(g);const o={p:mk(g.pos),n:mk(g.nor),u:mk(g.uv),c:g.pos.length/3};gbuf.set(g,o);return o}
let SL=null,TL=null;
function shadowPass(F,L,top){const {meshes}=collect();gl.bindFramebuffer(gl.FRAMEBUFFER,F.f);gl.viewport(0,0,F.w,F.h);gl.clearColor(1,1,1,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(PS.p);gl.enable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);gl.depthMask(true);
 for(let i=0;i<8;i++)gl.disableVertexAttribArray(i);gl.enableVertexAttribArray(attr.SP);gl.uniformMatrix4fv(PS.U.uL,false,L);
 for(const[o,m,v]of meshes){const mt=o.material;if(!v||o.castShadow===false||mt.basic||mt.transparent||(top&&o.userData&&o.userData.noTop))continue;const g=geo(o.geometry);gl.uniformMatrix4fv(PS.U.uM,false,m);gl.bindBuffer(gl.ARRAY_BUFFER,g.p);gl.vertexAttribPointer(attr.SP,3,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLES,0,g.c)}}
const api={batches,dyn};api.retex=t=>{const r=texs.get(t);if(r){gl.deleteTexture(r.o);texs.delete(t)}};
api.updateShadows=function(sd){const c={x:180,y:90,z:180};SL=m4mul(ortho(-300,300,-300,300,200,1300),look({x:c.x+sd[0]*700,y:c.y+sd[1]*700,z:c.z+sd[2]*700},c));shadowPass(SM,SL,false);
 if(!TL){TL=m4mul(ortho(-210,210,-210,210,10,310),look({x:180,y:260,z:180},{x:180,y:-40,z:180.0001}));shadowPass(TM,TL,true)}};
let frameLights=[],frameSun=null;
api.begin=function(expo){const {pts,hemi,dir}=collect();frameLights=pts.filter(p=>p.intensity>.02&&(p.color.r+p.color.g+p.color.b)>.01).map(p=>({x:p.position.x,y:p.position.y,z:p.position.z,c:[lin(p.color.r)*p.intensity,lin(p.color.g)*p.intensity,lin(p.color.b)*p.intensity],d:p.distance,dec:p.decay,w:p.intensity*(p.color.r+p.color.g+p.color.b)}));
 for(const b of batches){const sel=[];frameLights.forEach((p,k)=>{const dd=Math.hypot(p.x-b.ctr[0],p.y-b.ctr[1],p.z-b.ctr[2]);if(dd<p.d+b.r)sel.push([k,p.w*Math.pow(Math.max(.05,1-Math.max(0,dd-b.r)/p.d),p.dec)])});sel.sort((a,b2)=>b2[1]-a[1]);b.lights=sel.slice(0,VNL).map(s=>s[0]);b.lkey=b.lights.join(',')}
 let d=[dir.position.x-dir.target.position.x,dir.position.y-dir.target.position.y,dir.position.z-dir.target.position.z];const l=Math.hypot(...d);frameSun={dir:d.map(v=>v/l),col:[lin(dir.color.r)*dir.intensity,lin(dir.color.g)*dir.intensity,lin(dir.color.b)*dir.intensity],hemi,expo}};
// draw one view: VP maps world(cm)->clip, cam = eye pos in cm
api.drawView=function(VP,cam,viewport,clear){const U=PM.U;if(viewport)gl.viewport(viewport[0],viewport[1],viewport[2],viewport[3]);
 gl.useProgram(PM.p);for(let i=0;i<8;i++)gl.disableVertexAttribArray(i);[attr.P,attr.N,attr.U].forEach(a=>gl.enableVertexAttribArray(a));gl.enable(gl.DEPTH_TEST);
 gl.uniformMatrix4fv(U.uVP,false,VP);gl.uniformMatrix4fv(U.uSL,false,SL);gl.uniformMatrix4fv(U.uTL,false,TL);gl.uniform3f(U.uCam,cam[0],cam[1],cam[2]);gl.uniform1f(U.uExpo,frameSun.expo);
 const h=frameSun.hemi;gl.uniform3f(U.uSky,lin(h.color.r),lin(h.color.g),lin(h.color.b));gl.uniform3f(U.uGnd,lin(h.groundColor.r),lin(h.groundColor.g),lin(h.groundColor.b));gl.uniform1f(U.uHI,h.intensity);
 gl.uniform3f(U.uSD,...frameSun.dir);gl.uniform3f(U.uSC,...frameSun.col);gl.uniform1i(U.uSun,frameSun.col[0]+frameSun.col[1]>.002?1:0);
 gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,SM.t);gl.uniform1i(U.uSM,1);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,TM.t);gl.uniform1i(U.uTM,2);gl.uniform1i(U.uMap,0);
 let lk=null;const setL=ids=>{const k=ids.join(',');if(k===lk)return;lk=k;gl.uniform1i(U.uNL,ids.length);ids.forEach((id,i)=>{const p=frameLights[id];gl.uniform3f(U[`uPP[${i}]`],p.x,p.y,p.z);gl.uniform3f(U[`uPC[${i}]`],...p.c);gl.uniform1f(U[`uPD[${i}]`],p.d);gl.uniform1f(U[`uPDec[${i}]`],p.dec)})};
 const setMat=mt=>{gl.uniform3f(U.uCol,...(mt.basic?[mt.color.r,mt.color.g,mt.color.b]:[lin(mt.color.r),lin(mt.color.g),lin(mt.color.b)]));const ei=mt.emissiveIntensity;gl.uniform3f(U.uEm,lin(mt.emissive.r)*ei,lin(mt.emissive.g)*ei,lin(mt.emissive.b)*ei);
  gl.uniform1f(U.uOp,mt.opacity);gl.uniform1i(U.uBasic,mt.basic?1:0);gl.uniform1i(U.uDbl,mt.side===2?1:0);gl.uniform1f(U.uRough,mt.roughness);gl.uniform1f(U.uAT,mt.alphaTest||0);gl.uniform1f(U.uMetal,mt.metalness);gl.uniform1i(U.uSpec,mt.roughness<.75?1:0);
  if(mt.map){const T=tex(mt.map);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,T.o);gl.uniform1i(U.uHasMap,1);gl.uniform1i(U.uFract,T.P2?0:1);gl.uniform2f(U.uRep,mt.map.repeat.x,mt.map.repeat.y)}else gl.uniform1i(U.uHasMap,0);
  if(mt.side===2)gl.disable(gl.CULL_FACE);else gl.enable(gl.CULL_FACE);
  if(mt.transparent){gl.enable(gl.BLEND);if(mt.blending===2)gl.blendFunc(gl.SRC_ALPHA,gl.ONE);else gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(mt.depthWrite&&mt.blending!==2)}else{gl.disable(gl.BLEND);gl.depthMask(true)}};
 const skip=mt=>(mt.transparent&&mt.opacity<=.001)||(mt.blending===2&&mt.color.r+mt.color.g+mt.color.b<.003);
 const bind=(b)=>{gl.bindBuffer(gl.ARRAY_BUFFER,b.p);gl.vertexAttribPointer(attr.P,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,b.n);gl.vertexAttribPointer(attr.N,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,b.u);gl.vertexAttribPointer(attr.U,2,gl.FLOAT,false,0,0)};
 const items=[];for(const b of batches){if(b.objs[0].visible===false)continue;items.push({b,tr:b.mt.transparent,ro:b.objs[0].renderOrder||0,d:(b.ctr[0]-cam[0])**2+(b.ctr[1]-cam[1])**2+(b.ctr[2]-cam[2])**2})}
 for(const o of dyn){if(o.visible===false)continue;const m=o.userData.matrix||compose(o);let M=m;let par=o.parent;while(par&&par.parent){M=m4mul(compose(par),M);par=par.parent}items.push({o,M,tr:o.material.transparent,ro:o.renderOrder||0,d:(M[12]-cam[0])**2+(M[13]-cam[1])**2+(M[14]-cam[2])**2})}
 const op=items.filter(i=>!i.tr).sort((a,b)=>a.d-b.d),tr=items.filter(i=>i.tr).sort((a,b)=>(a.ro-b.ro)||(b.d-a.d));
 for(const it of op.concat(tr)){const mt=it.b?it.b.mt:it.o.material;if(skip(mt))continue;setMat(mt);
  if(it.b){gl.uniformMatrix4fv(U.uM,false,I4);gl.uniformMatrix3fv(U.uNM,false,I3);if(!mt.basic)setL(it.b.lights);bind(it.b);gl.drawArrays(gl.TRIANGLES,0,it.b.c)}
  else{const g=geo(it.o.geometry);gl.uniformMatrix4fv(U.uM,false,it.M);gl.uniformMatrix3fv(U.uNM,false,nmat(it.M));if(!mt.basic){const p=[it.M[12],it.M[13],it.M[14]];const sel=frameLights.map((L,k)=>[k,Math.hypot(L.x-p[0],L.y-p[1],L.z-p[2])]).filter(x=>x[1]<frameLights[x[0]].d+30).sort((a,b)=>a[1]-b[1]).slice(0,VNL).map(x=>x[0]);setL(sel)}bind(g);gl.drawArrays(gl.TRIANGLES,0,g.c)}}
 gl.depthMask(true);gl.disable(gl.BLEND)};
return api}
