"""Captures du rendu VR (casque simulé), œil gauche.
Usage : python3 tools/vrshots.py PREFIXE '[[x,z,yaw,mode],...]'   (mode = index d'ambiance, 0 = Nuit cosy, 1 = Jour)
yaw en radians (0 = regarde vers -z du casque, tourné par l'orientation de départ de l'appli)."""
import os, sys, json
from playwright.sync_api import sync_playwright
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(R,'source')
pref=sys.argv[1];shots=json.loads(sys.argv[2])
h=open(os.path.join(S,'vr.html'),encoding='utf-8').read().replace('<script src="shim2.js">','<script src="xrmock.js"></script><script src="shim2.js">')
open(os.path.join(S,'_vrshot.html'),'w',encoding='utf-8').write(h)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':1400,'height':700});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.path.join(S,'_vrshot.html'));pg.wait_for_timeout(3000);pg.click('#vr');pg.wait_for_timeout(3000)
    pg.add_style_tag(content='body>*:not(canvas){display:none!important}canvas{position:fixed!important;left:0;top:0}')
    for i,(x,z,yaw,mode) in enumerate(shots):
        pg.evaluate(f"(()=>{{const b=document.querySelector('[data-m=\"{mode}\"]');if(b)b.click();window.__P.x={x};window.__P.z={z};window.__yaw={yaw};if(window.__menuRef&&window.__menuRef().open)window.__menuRef().toggle()}})()")
        pg.wait_for_timeout(2600)
        pg.screenshot(path=f'{pref}_{i}.png',clip={'x':0,'y':0,'width':700,'height':700})
    print('erreurs JS:',errs[:5],'| lots/triangles:',pg.evaluate("[__V.batches.length,__V.batches.reduce((a,b)=>a+b.c,0)/3]"),'| dessinés:',pg.evaluate("window.__V.drawn||'?'"));b.close()
os.remove(os.path.join(S,'_vrshot.html'))
