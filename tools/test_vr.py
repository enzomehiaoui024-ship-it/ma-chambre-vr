"""Teste le site VR avec un casque simulé (xrmock.js): entre en VR, appuie sur la gâchette, capture."""
import os
from playwright.sync_api import sync_playwright
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(R,'source')
h=open(os.path.join(S,'vr.html'),encoding='utf-8').read().replace('<script src="shim2.js">','<script src="xrmock.js"></script><script src="shim2.js">')
open(os.path.join(S,'_vrtest.html'),'w',encoding='utf-8').write(h)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':1000,'height':500});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.path.join(S,'_vrtest.html'));pg.wait_for_timeout(3000);pg.click('#vr');pg.wait_for_timeout(4000);pg.screenshot(path='vr_test.png')
    print('erreurs JS:',errs[:5],'| batches/tris:',pg.evaluate("[__V.batches.length,__V.batches.reduce((a,b)=>a+b.c,0)/3]"));b.close()
os.remove(os.path.join(S,'_vrtest.html'))
