import sys,base64,subprocess,time
from playwright.sync_api import sync_playwright
mode=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files'])
    pg=b.new_page();errs=[];pg.on('console',lambda m:errs.append(m.text));pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/vid/index2.html');pg.wait_for_timeout(1500)
    if errs:print('ERR',errs[:5],flush=True)
    if mode=='test':
        ts=[float(x) for x in sys.argv[2].split(',')]
        for t in ts:
            t0=time.time();d=pg.evaluate(f'renderAt({t})');open(f'f_{t}.jpg','wb').write(base64.b64decode(d.split(',')[1]));print(t,round(time.time()-t0,2),'s',flush=True)
        if errs:print('ERR',errs[:5])
    else:
        fps=30;tot=pg.evaluate('TOTAL');n=int(tot*fps);t0=time.time()
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart','visite_v2.mp4'],stdin=subprocess.PIPE)
        for i in range(n):
            d=pg.evaluate(f'renderAt({i/fps})');ff.stdin.write(base64.b64decode(d.split(',')[1]))
            if i%60==0:print(i,'/',n,round(time.time()-t0),'s',flush=True)
        ff.stdin.close();ff.wait();print('done',round(time.time()-t0))
    b.close()
