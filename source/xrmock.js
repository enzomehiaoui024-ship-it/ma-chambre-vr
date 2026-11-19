(function(){
function persp(f,a,n,fa){const t=1/Math.tan(f*Math.PI/360);return new Float32Array([t/a,0,0,0,0,t,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0])}
function rigid(x,y,z,yaw){const c=Math.cos(yaw),s=Math.sin(yaw);const m=new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,x,y,z,1]);const inv=new Float32Array([c,0,s,0,0,1,0,0,-s,0,c,0,-(c*x-s*z),-y,-(s*x+c*z),1]);return{matrix:m,inverse:{matrix:inv},position:{x,y,z}}}
window.XRWebGLLayer=class{constructor(s,gl){this.framebuffer=null;this.gl=gl}getViewport(v){const c=this.gl.canvas;return v.eye==='left'?{x:0,y:0,width:c.width/2,height:c.height}:{x:c.width/2,y:0,width:c.width/2,height:c.height}}};
const gp={buttons:[...Array(6)].map(()=>({pressed:false})),axes:[0,0,0,0]};window.__gp=gp;
const sess={inputSources:[{handedness:'left',gamepad:(window.__gpL={buttons:[...Array(6)].map(()=>({pressed:false})),axes:[0,0,0,0]}),gripSpace:{},targetRaySpace:{}},{handedness:'right',gamepad:gp,gripSpace:{},targetRaySpace:{}}],renderState:{},
 updateRenderState(o){Object.assign(this.renderState,o)},async requestReferenceSpace(t){return{t}},addEventListener(){},end(){},
 requestAnimationFrame(cb){setTimeout(()=>{window.__t=(window.__t||0)+16;const yaw=window.__yaw||0;cb(window.__t,{getViewerPose:()=>({transform:rigid(0,1.6,0,yaw),views:['left','right'].map((e,i)=>({eye:e,projectionMatrix:persp(90,.9,.04,40),transform:rigid(i?.032:-.032,1.6,0,yaw)}))}),getPose:()=>{const q=window.__ctlPitch||0;if(!q)return{transform:rigid(.2,1.25,-.3,0)};const c=Math.cos(q),s=Math.sin(q);return{transform:{matrix:new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,.2,1.25,-.3,1]),position:{x:.2,y:1.25,z:-.3}}}}})},30)}};
Object.defineProperty(navigator,'xr',{configurable:true,value:{isSessionSupported:async()=>true,requestSession:async()=>sess}});
WebGLRenderingContext.prototype.makeXRCompatible=async function(){};
})();
