"""Rendu de la vidéo de visite (plan 3D, window.__renderAt) par morceaux reprenables.
Usage : python3 tools/render_video.py test 2,15,31        -> images de contrôle video/_test_<t>.jpg
        python3 tools/render_video.py chunk K [N]        -> morceau K (sur N, défaut 8) en video/_chunks/c_K.mp4
        python3 tools/render_video.py join SORTIE.mp4    -> assemble les morceaux (concat, -c copy)"""
import sys,os,base64,subprocess,time,json
from playwright.sync_api import sync_playwright
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));W,H,FPS=1280,720,30
C=os.path.join(R,'video','_chunks');os.makedirs(C,exist_ok=True)
def page(p):
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':W,'height':H});pg.goto('file://'+os.path.join(R,'source','plan_gl.html')+'?ombres=1');pg.wait_for_timeout(5000);return b,pg
mode=sys.argv[1]
if mode=='join':
    fs=sorted(f for f in os.listdir(C) if f.startswith('c_') and f.endswith('.mp4'))
    open(os.path.join(C,'list.txt'),'w').write(''.join(f"file '{f}'\n" for f in fs))
    subprocess.run(['ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',os.path.join(C,'list.txt'),'-c','copy','-movflags','+faststart',sys.argv[2]],check=True);print('ok',fs);sys.exit()
with sync_playwright() as p:
    b,pg=page(p);tot=pg.evaluate('window.__TOTAL||68.5')
    if mode=='test':
        for t in sys.argv[2].split(','):
            d=pg.evaluate(f'__renderAt({float(t)},{W},{H})');open(os.path.join(R,'video',f'_test_{t}.jpg'),'wb').write(base64.b64decode(d.split(',')[1]));print('img',t,flush=True)
    else:
        k=int(sys.argv[2]);n=int(sys.argv[3]) if len(sys.argv)>3 else 8;nf=int(round(tot*FPS));a=nf*k//n;z=nf*(k+1)//n
        out=os.path.join(C,f'c_{k:02d}.mp4');tmp=os.path.join(C,f'tmp_{k:02d}.mp4');t0=time.time()
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-r',str(FPS),tmp],stdin=subprocess.PIPE)
        for i in range(a,z):
            d=pg.evaluate(f'__renderAt({i/FPS},{W},{H})');ff.stdin.write(base64.b64decode(d.split(',')[1]))
        ff.stdin.close();rc=ff.wait()
        if rc==0:os.replace(tmp,out)
        print('chunk',k,'images',a,'->',z,'rc',rc,round(time.time()-t0),'s',flush=True)
    b.close()
