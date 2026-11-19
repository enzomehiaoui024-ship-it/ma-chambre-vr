// Offline cinematic renderer for the shim scene: shadows (sun), top-down AO, 16 point lights,
// Blinn-Phong spec, ACES tonemap, bloom, FXAA, vignette, grain.
function m4mul(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s}return o}
function compose(o){const{x,y,z}=o.rotation,cx=Math.cos(x),sx=Math.sin(x),cy=Math.cos(y),sy=Math.sin(y),cz=Math.cos(z),sz=Math.sin(z);
const R=[cy*cz,cx*sz+sx*sy*cz,sx*sz-cx*sy*cz,-cy*sz,cx*cz-sx*sy*sz,sx*cz+cx*sy*sz,sy,-sx*cy,cx*cy];const s=o.scale,p=o.position;
return new Float32Array([R[0]*s.x,R[1]*s.x,R[2]*s.x,0,R[3]*s.y,R[4]*s.y,R[5]*s.y,0,R[6]*s.z,R[7]*s.z,R[8]*s.z,0,p.x,p.y,p.z,1])}
function persp(f,a,n,fa){const t=1/Math.tan(f*Math.PI/360);return new Float32Array([t/a,0,0,0,0,t,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0])}
function ortho(l,r,b,t,n,f){return new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1])}
function look(e,t){let z=[e.x-t.x,e.y-t.y,e.z-t.z],l=Math.hypot(...z);z=z.map(v=>v/l);let up=Math.abs(z[1])>.999?[0,0,-1]:[0,1,0];let x=[up[1]*z[2]-up[2]*z[1],up[2]*z[0]-up[0]*z[2],up[0]*z[1]-up[1]*z[0]];l=Math.hypot(...x);x=x.map(v=>v/l);const y=[z[1]*x[2]-z[2]*x[1],z[2]*x[0]-z[0]*x[2],z[0]*x[1]-z[1]*x[0]];
return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*e.x+x[1]*e.y+x[2]*e.z),-(y[0]*e.x+y[1]*e.y+y[2]*e.z),-(z[0]*e.x+z[1]*e.y+z[2]*e.z),1])}
function nmat(m){const a=m[0],b=m[1],c=m[2],d=m[4],e=m[5],f=m[6],g=m[8],h=m[9],i=m[10];const A=e*i-f*h,B=-(d*i-f*g),C=d*h-e*g,det=a*A+b*B+c*C;const inv=[A,-(b*i-c*h),b*f-c*e,B,a*i-c*g,-(a*f-c*d),C,-(a*h-b*g),a*e-b*d].map(v=>v/det);
return new Float32Array([inv[0],inv[3],inv[6],inv[1],inv[4],inv[7],inv[2],inv[5],inv[8]])}
const NPL=16;
const PACK=`vec4 pack(float d){vec4 e=fract(d*vec4(1.,255.,65025.,16581375.));e-=e.yzww*vec4(1./255.,1./255.,1./255.,0.);return e;}float unpack(vec4 c){return dot(c,vec4(1.,1./255.,1./65025.,1./16581375.));}`;
const SVS=`attribute vec3 aP;uniform mat4 uM,uL;void main(){gl_Position=uL*uM*vec4(aP,1.);}`;
const SFS=`precision highp float;${PACK}void main(){gl_FragColor=pack(gl_FragCoord.z);}`;
const VS=`attribute vec3 aP,aN;attribute vec2 aU;uniform mat4 uM,uVP,uSL,uTL;uniform mat3 uNM;varying vec3 vW,vN;varying vec2 vU;varying vec4 vS,vT;
void main(){vec4 w=uM*vec4(aP,1.);vW=w.xyz;vN=normalize(uNM*aN);vU=aU;vS=uSL*w;vT=uTL*(w+vec4(vN*5.,0.));gl_Position=uVP*w;}`;
const FS=`precision highp float;${PACK}varying vec3 vW,vN;varying vec2 vU;varying vec4 vS,vT;
uniform vec3 uCol,uEm,uSky,uGnd,uSD,uSC,uCam;uniform float uOp,uHI,uRough,uMetal,uExpo,uAO;uniform int uNL,uSpec,uBasic,uHasMap,uDbl,uFract;
uniform sampler2D uMap,uSM,uTM;uniform vec2 uRep;uniform vec3 uPP[${NPL}],uPC[${NPL}];uniform float uPD[${NPL}],uPDec[${NPL}];
vec3 lin(vec3 c){return pow(c,vec3(2.2));}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
float sunSh(){vec3 p=vS.xyz/vS.w*.5+.5;if(p.x<0.||p.x>1.||p.y<0.||p.y>1.)return 1.;float s=0.;float tx=1./2048.;
for(int i=-1;i<=1;i++)for(int j=-1;j<=1;j++){float d=unpack(texture2D(uSM,p.xy+vec2(float(i),float(j))*tx*1.6));s+=(p.z-.0012>d)?0.:1.;}return s/9.;}
float topAO(){vec3 p=vT.xyz/vT.w*.5+.5;if(p.x<0.||p.x>1.||p.y<0.||p.y>1.)return 1.;float o=0.;float r=9./420.;
for(int i=0;i<7;i++){float a=float(i)*2.39996;float rr=r*sqrt((float(i)+.5)/7.);float d=unpack(texture2D(uTM,p.xy+vec2(cos(a),sin(a))*rr));float gap=(p.z-d)*300.;if(gap>1.5)o+=exp(-gap/85.);}return 1.-.7*o/7.;}
void main(){vec3 base=uCol;vec2 uv=uFract==1?fract(vU*uRep):vU*uRep;vec4 tx=vec4(1.);if(uHasMap==1){tx=texture2D(uMap,uv);base*=tx.rgb;}
if(uBasic==1){gl_FragColor=vec4(base,uOp*tx.a);return;}
base=lin(base);vec3 n=normalize(vN);if(uDbl==1&&!gl_FrontFacing)n=-n;vec3 V=normalize(uCam-vW);
float ao=topAO();ao=mix(1.,ao,uAO);
float dx=min(vW.x,360.-vW.x),dz=min(vW.z,360.-vW.z),dw=min(dx,dz),dy=min(vW.y,250.-vW.y);
float inR=step(-1.,vW.x)*step(vW.x,361.)*step(-1.,vW.z)*step(vW.z,361.);
float aoc=1.-inR*(.32*(1.-smoothstep(0.,40.,dw))*(1.-smoothstep(0.,40.,dy))+.22*(1.-smoothstep(0.,45.,dx))*(1.-smoothstep(0.,45.,dz)));
vec3 amb=lin(mix(uGnd,uSky,.5*n.y+.5))*uHI*ao*aoc;
float sh=4.+(1.-uRough)*(1.-uRough)*180.;float ks=mix(.04,1.,uMetal)*(1.-uRough)*(1.-uRough)*1.6;
vec3 dif=vec3(0.),spc=vec3(0.);
float nl=max(dot(n,uSD),0.);if(nl>0.&&uSC.r+uSC.g>.001){float s=sunSh();vec3 h=normalize(uSD+V);dif+=uSC*nl*s;spc+=uSC*pow(max(dot(n,h),0.),sh)*s*nl;}
for(int i=0;i<${NPL};i++){if(i>=uNL)break;vec3 d=uPP[i]-vW;float ds=length(d);if(ds>uPD[i])continue;vec3 L=d/ds;float f=pow(clamp(1.-ds/uPD[i],0.,1.),uPDec[i]);float nd=max(dot(n,L),0.);dif+=uPC[i]*f*nd;if(uSpec==1){vec3 h=normalize(L+V);spc+=uPC[i]*f*pow(max(dot(n,h),0.),sh)*nd;}}
vec3 sc=mix(vec3(1.),base,uMetal);vec3 col=base*(amb+dif)*(1.-uMetal*.5)+spc*ks*sc+base*uMetal*amb*.6+lin(uEm);
col=aces(col*uExpo);gl_FragColor=vec4(pow(col,vec3(1./2.2)),uOp);}`;
const QVS=`attribute vec2 aQ;varying vec2 vU;void main(){vU=aQ*.5+.5;gl_Position=vec4(aQ,0.,1.);}`;
const BRIGHT=`precision highp float;varying vec2 vU;uniform sampler2D uT;uniform vec2 uPx;uniform float uThr;void main(){vec3 c=vec3(0.);for(int i=0;i<2;i++)for(int j=0;j<2;j++)c+=texture2D(uT,vU+(vec2(float(i),float(j))-.5)*uPx).rgb;c/=4.;float l=max(c.r,max(c.g,c.b));c*=smoothstep(uThr,uThr+.25,l);gl_FragColor=vec4(c,1.);}`;
const BLUR=`precision highp float;varying vec2 vU;uniform sampler2D uT;uniform vec2 uD;void main(){vec3 c=texture2D(uT,vU).rgb*.227;c+=(texture2D(uT,vU+uD*1.385).rgb+texture2D(uT,vU-uD*1.385).rgb)*.316;c+=(texture2D(uT,vU+uD*3.231).rgb+texture2D(uT,vU-uD*3.231).rgb)*.07;gl_FragColor=vec4(c,1.);}`;
const COMP=`precision highp float;varying vec2 vU;uniform sampler2D uT,uB1,uB2;uniform vec2 uPx;uniform float uBl,uTime,uVig,uFade;
float lum(vec3 c){return dot(c,vec3(.299,.587,.114));}
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec3 rgbM=texture2D(uT,vU).rgb;
float lN=lum(texture2D(uT,vU+vec2(0.,-uPx.y)).rgb),lS=lum(texture2D(uT,vU+vec2(0.,uPx.y)).rgb),lW=lum(texture2D(uT,vU+vec2(-uPx.x,0.)).rgb),lE=lum(texture2D(uT,vU+vec2(uPx.x,0.)).rgb),lM=lum(rgbM);
float rng=max(max(lN,lS),max(max(lW,lE),lM))-min(min(lN,lS),min(min(lW,lE),lM));vec3 c=rgbM;
if(rng>.05){vec2 dir=normalize(vec2(lW-lE+.0001,lN-lS+.0001));vec2 dp=vec2(-dir.y,dir.x)*uPx;c=(rgbM*2.+texture2D(uT,vU+dp*.6).rgb+texture2D(uT,vU-dp*.6).rgb+texture2D(uT,vU+dp*1.4).rgb*.5+texture2D(uT,vU-dp*1.4).rgb*.5)/5.;}
vec2 cc=vU-.5;float r2=dot(cc,cc);
c.r=mix(c.r,texture2D(uT,vU+cc*uPx*3.).r,.35*smoothstep(.08,.3,r2));
c+=texture2D(uB1,vU).rgb*uBl+texture2D(uB2,vU).rgb*uBl*.8;
c=mix(c,c*vec3(1.03,1.,.95),.5);c=c*(1.-uVig*smoothstep(.12,.55,r2));
c+=(hash(vU*1000.+uTime)-.5)*.022;c*=uFade;gl_FragColor=vec4(c,1.);}`;
function makeRenderer(canvas){const gl=canvas.getContext('webgl',{antialias:false,preserveDrawingBuffer:true});
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o};
const prog=(v,f)=>{const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,v));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));const U=new Proxy({},{get:(o,k)=>k in o?o[k]:(o[k]=gl.getUniformLocation(p,k))});return{p,U}};
const PM=prog(VS,FS),PS=prog(SVS,SFS),PB=prog(QVS,BRIGHT),PBl=prog(QVS,BLUR),PC=prog(QVS,COMP);
const W=canvas.width,H=canvas.height;
function fbo(w,h,depth){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(p=>gl.texParameteri(gl.TEXTURE_2D,p,gl.CLAMP_TO_EDGE));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
const f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);if(depth){const r=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,r);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,w,h);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,r)}gl.bindFramebuffer(gl.FRAMEBUFFER,null);return{t,f,w,h}}
const F0=fbo(W,H,true),SM=fbo(2048,2048,true),TM=fbo(1024,1024,true),B1=fbo(W/4,H/4),B2=fbo(W/4,H/4),B3=fbo(W/8,H/8),B4=fbo(W/8,H/8);
const qb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,qb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,-1,1,1,-1,1]),gl.STATIC_DRAW);
function quad(P,dst,tex,set){for(let i=0;i<8;i++)gl.disableVertexAttribArray(i);gl.bindFramebuffer(gl.FRAMEBUFFER,dst?dst.f:null);gl.viewport(0,0,dst?dst.w:W,dst?dst.h:H);gl.useProgram(P.p);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);
tex.forEach((t,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,t)});set(P.U);const a=gl.getAttribLocation(P.p,'aQ');gl.bindBuffer(gl.ARRAY_BUFFER,qb);gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLES,0,6);gl.disableVertexAttribArray(a)}
const bufs=new Map(),texs=new Map();
function geo(g){if(bufs.has(g))return bufs.get(g);const mk=a=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,a,gl.STATIC_DRAW);return b};const o={p:mk(g.pos),n:mk(g.nor),u:mk(g.uv),c:g.pos.length/3};bufs.set(g,o);return o}
const pot=n=>(n&(n-1))==0;
function tex(t){if(texs.has(t)){const r=texs.get(t);if(t.ver&&r.v!==t.ver){gl.bindTexture(gl.TEXTURE_2D,r.o);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,t.image);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);r.v=t.ver}return r}const o=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,o);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,t.image);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
const P2=pot(t.image.width)&&pot(t.image.height);const wr=P2?gl.REPEAT:gl.CLAMP_TO_EDGE;[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(p=>gl.texParameteri(gl.TEXTURE_2D,p,wr));
if(P2){gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR)}else gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);const r={o,P2,v:t.ver};texs.set(t,r);return r}
function collect(scene){const meshes=[],pts=[];let hemi=null,dir=null;(function walk(o,pm){if(o.visible===false)return;const m=pm?m4mul(pm,compose(o)):compose(o);if(o.isMesh)meshes.push([o,m]);if(o.isHemi)hemi=o;if(o.isDir)dir=o;if(o.isPoint)pts.push(o);o.children.forEach(c=>walk(c,m))})(scene,null);return{meshes,pts,hemi,dir}}
function bindGeo(P,g,full){const aP=gl.getAttribLocation(P.p,'aP');gl.bindBuffer(gl.ARRAY_BUFFER,g.p);gl.enableVertexAttribArray(aP);gl.vertexAttribPointer(aP,3,gl.FLOAT,false,0,0);
if(full){const aN=gl.getAttribLocation(P.p,'aN'),aU=gl.getAttribLocation(P.p,'aU');gl.bindBuffer(gl.ARRAY_BUFFER,g.n);gl.enableVertexAttribArray(aN);gl.vertexAttribPointer(aN,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,g.u);gl.enableVertexAttribArray(aU);gl.vertexAttribPointer(aU,2,gl.FLOAT,false,0,0)}}
let SL=null,TL=null;
function shadowPass(meshes,F,L,top){for(let i=0;i<8;i++)gl.disableVertexAttribArray(i);gl.bindFramebuffer(gl.FRAMEBUFFER,F.f);gl.viewport(0,0,F.w,F.h);gl.clearColor(1,1,1,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(PS.p);gl.enable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);gl.depthMask(true);
gl.uniformMatrix4fv(PS.U.uL,false,L);for(const[o,m]of meshes){const mt=o.material;if(o.castShadow===false||mt.basic||mt.transparent||(top&&o.userData&&o.userData.noTop))continue;const g=geo(o.geometry);gl.uniformMatrix4fv(PS.U.uM,false,m);bindGeo(PS,g,false);gl.drawArrays(gl.TRIANGLES,0,g.c)}}
const api={};
api.updateShadows=function(scene,sunDir){const {meshes}=collect(scene);const c={x:180,y:90,z:180};const e={x:c.x+sunDir[0]*700,y:c.y+sunDir[1]*700,z:c.z+sunDir[2]*700};
SL=m4mul(ortho(-300,300,-300,300,200,1300),look(e,c));shadowPass(meshes,SM,SL);
if(!TL){TL=m4mul(ortho(-210,210,-210,210,10,310),look({x:180,y:260,z:180},{x:180,y:-40,z:180.0001}));shadowPass(meshes,TM,TL,true)}};
api.render=function(scene,cam,post){const {meshes,pts,hemi,dir}=collect(scene);
gl.bindFramebuffer(gl.FRAMEBUFFER,F0.f);gl.viewport(0,0,W,H);const bg=post.bg||[.1,.1,.1];gl.clearColor(bg[0],bg[1],bg[2],1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);for(let i=0;i<8;i++)gl.disableVertexAttribArray(i);gl.useProgram(PM.p);gl.enable(gl.DEPTH_TEST);const U=PM.U;
const VP=m4mul(persp(cam.fov,cam.aspect,cam.near,cam.far),look(cam.position,cam.target));gl.uniformMatrix4fv(U.uVP,false,VP);gl.uniformMatrix4fv(U.uSL,false,SL);gl.uniformMatrix4fv(U.uTL,false,TL);
gl.uniform3f(U.uCam,cam.position.x,cam.position.y,cam.position.z);gl.uniform1f(U.uExpo,post.expo||1);gl.uniform1f(U.uAO,post.ao==null?1:post.ao);
gl.uniform3f(U.uSky,hemi.color.r,hemi.color.g,hemi.color.b);gl.uniform3f(U.uGnd,hemi.groundColor.r,hemi.groundColor.g,hemi.groundColor.b);gl.uniform1f(U.uHI,hemi.intensity);
let d=[dir.position.x-dir.target.position.x,dir.position.y-dir.target.position.y,dir.position.z-dir.target.position.z];const l=Math.hypot(...d);gl.uniform3f(U.uSD,d[0]/l,d[1]/l,d[2]/l);
const lin=v=>Math.pow(v,2.2);gl.uniform3f(U.uSC,lin(dir.color.r)*dir.intensity,lin(dir.color.g)*dir.intensity,lin(dir.color.b)*dir.intensity);
const act=pts.filter(p=>p.intensity>.02&&(p.color.r+p.color.g+p.color.b)>.01).map(p=>({x:p.position.x,y:p.position.y,z:p.position.z,c:[lin(p.color.r)*p.intensity,lin(p.color.g)*p.intensity,lin(p.color.b)*p.intensity],d:p.distance,dec:p.decay}));
let lastKey=null;function setLights(sel){const key=sel.join(',');if(key===lastKey)return;lastKey=key;gl.uniform1i(U.uNL,sel.length);sel.forEach((k,i)=>{const p=act[k];gl.uniform3f(U[`uPP[${i}]`],p.x,p.y,p.z);gl.uniform3f(U[`uPC[${i}]`],p.c[0],p.c[1],p.c[2]);gl.uniform1f(U[`uPD[${i}]`],p.d);gl.uniform1f(U[`uPDec[${i}]`],p.dec)})}
function bsph(o,m){const g=o.geometry;if(!g.bs){const p=g.pos;let mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];for(let i=0;i<p.length;i+=3)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],p[i+k]);mx[k]=Math.max(mx[k],p[i+k])}const c=[(mn[0]+mx[0])/2,(mn[1]+mx[1])/2,(mn[2]+mx[2])/2];g.bs={c,r:Math.hypot(mx[0]-c[0],mx[1]-c[1],mx[2]-c[2])}}
const c=g.bs.c,sx=Math.hypot(m[0],m[1],m[2]),sy=Math.hypot(m[4],m[5],m[6]),sz=Math.hypot(m[8],m[9],m[10]);return{x:m[0]*c[0]+m[4]*c[1]+m[8]*c[2]+m[12],y:m[1]*c[0]+m[5]*c[1]+m[9]*c[2]+m[13],z:m[2]*c[0]+m[6]*c[1]+m[10]*c[2]+m[14],r:g.bs.r*Math.max(sx,sy,sz)}}
gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,SM.t);gl.uniform1i(U.uSM,1);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,TM.t);gl.uniform1i(U.uTM,2);gl.uniform1i(U.uMap,0);
const cp=cam.position;const op=[],tr=[];for(const e of meshes)(e[0].material.transparent?tr:op).push(e);
const dist=e=>{const m=e[1];return (m[12]-cp.x)**2+(m[13]-cp.y)**2+(m[14]-cp.z)**2};tr.sort((a,b)=>((a[0].renderOrder||0)-(b[0].renderOrder||0))||(dist(b)-dist(a)));op.sort((a,b)=>dist(a)-dist(b));
for(const[o,m]of op.concat(tr)){const mt=o.material;if(mt.transparent&&mt.opacity<=0.001)continue;if(mt.blending===2&&mt.color.r+mt.color.g+mt.color.b<.003)continue;const g=geo(o.geometry);gl.uniformMatrix4fv(U.uM,false,m);gl.uniformMatrix3fv(U.uNM,false,nmat(m));
gl.uniform3f(U.uCol,mt.color.r,mt.color.g,mt.color.b);const ei=mt.emissiveIntensity;gl.uniform3f(U.uEm,mt.emissive.r*ei,mt.emissive.g*ei,mt.emissive.b*ei);gl.uniform1f(U.uOp,mt.opacity);gl.uniform1i(U.uBasic,mt.basic?1:0);gl.uniform1i(U.uDbl,mt.side===2?1:0);
gl.uniform1f(U.uRough,mt.roughness);if(!mt.basic){const b=bsph(o,m);const sel=[];act.forEach((p,k)=>{if(Math.hypot(p.x-b.x,p.y-b.y,p.z-b.z)<p.d+b.r)sel.push(k)});setLights(sel.slice(0,NPL))}gl.uniform1i(U.uSpec,mt.roughness<.75?1:0);gl.uniform1f(U.uMetal,mt.metalness);
if(mt.map){const T=tex(mt.map);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,T.o);gl.uniform1i(U.uHasMap,1);gl.uniform1i(U.uFract,T.P2?0:1);gl.uniform2f(U.uRep,mt.map.repeat.x,mt.map.repeat.y)}else gl.uniform1i(U.uHasMap,0);
if(mt.side===2)gl.disable(gl.CULL_FACE);else gl.enable(gl.CULL_FACE);
if(mt.transparent){gl.enable(gl.BLEND);if(mt.blending===2)gl.blendFunc(gl.SRC_ALPHA,gl.ONE);else gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(mt.depthWrite&&mt.blending!==2)}else{gl.disable(gl.BLEND);gl.depthMask(true)}
bindGeo(PM,g,true);gl.drawArrays(gl.TRIANGLES,0,g.c)}gl.depthMask(true);if(post.skipPost)return;
// bloom
quad(PB,B1,[F0.t],u=>{gl.uniform1i(u.uT,0);gl.uniform2f(u.uPx,1/W,1/H);gl.uniform1f(u.uThr,post.thr||.72)});
for(let k=0;k<2;k++){quad(PBl,B2,[B1.t],u=>{gl.uniform1i(u.uT,0);gl.uniform2f(u.uD,1.5*4/W,0)});quad(PBl,B1,[B2.t],u=>{gl.uniform1i(u.uT,0);gl.uniform2f(u.uD,0,1.5*4/H)})}
quad(PBl,B3,[B1.t],u=>{gl.uniform1i(u.uT,0);gl.uniform2f(u.uD,2*4/W,0)});
for(let k=0;k<2;k++){quad(PBl,B4,[B3.t],u=>{gl.uniform1i(u.uT,0);gl.uniform2f(u.uD,2.5*8/W,0)});quad(PBl,B3,[B4.t],u=>{gl.uniform1i(u.uT,0);gl.uniform2f(u.uD,0,2.5*8/H)})}
quad(PC,null,[F0.t,B1.t,B3.t],u=>{gl.uniform1i(u.uT,0);gl.uniform1i(u.uB1,1);gl.uniform1i(u.uB2,2);gl.uniform2f(u.uPx,1/W,1/H);gl.uniform1f(u.uBl,post.bloom==null?.6:post.bloom);gl.uniform1f(u.uTime,post.time||0);gl.uniform1f(u.uVig,post.vig==null?.35:post.vig);gl.uniform1f(u.uFade,post.fade==null?1:post.fade)});
};
return api}
