"""Rendus de contrôle du plan 3D (source/plan_gl.html) avec Chrome headless (SwiftShader).
Usage: python3 tools/preview.py OUT_PREFIX '[["jour",null,[290,150,60],[90,70,260]],["cosy","dessus",null,null]]'
Chaque entrée = [ambiance, vue nommée ou null, position caméra cm, cible cm]. Ambiances: cosy jour coucher soir gaming fete cine."""
import sys,json,os
from playwright.sync_api import sync_playwright
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));out=sys.argv[1];cfg=json.loads(sys.argv[2])
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':800,'height':600});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.path.join(R,'source','plan_gl.html'));pg.wait_for_timeout(5000);pg.add_style_tag(content='#ui,#hint,#evo{display:none!important}')
    for i,(m,v,pp,qq) in enumerate(cfg):
        pg.evaluate(f"__mode('{m}')");pg.evaluate(f"__jump({json.dumps(v)},{json.dumps(pp)},{json.dumps(qq)})");pg.wait_for_timeout(4000);pg.screenshot(path=f'{out}_{i}.png')
    print('erreurs JS:',errs[:5]);b.close()
