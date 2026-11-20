"""Construit index.html (site VR autonome) à partir de source/vr.html en inlinant les scripts."""
import re,os
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(R,'source')
h=open(os.path.join(S,'vr.html'),encoding='utf-8').read()
h=re.sub(r'<script src="([^"]+)"></script>',lambda m:'<script>\n'+open(os.path.join(S,m.group(1)),encoding='utf-8').read().replace('</script>','<\\/script>')+'\n</script>',h)
open(os.path.join(R,'index.html'),'w',encoding='utf-8').write(h);print('index.html OK',len(h))

# items.js : la liste d'achat (tableau D de liste_achat.html) pour les fiches du plan 3D
import json,subprocess
L=open(os.path.join(S,'liste_achat.html'),encoding='utf-8').read();a=L.index('const D=[');b=L.index('];',a)
js=subprocess.run(['node','-e','process.stdout.write(JSON.stringify(eval(require("fs").readFileSync(0,"utf8"))))'],input=L[a+8:b+1],capture_output=True,text=True,check=True).stdout
D=json.loads(js);U={}
try:
    u0=L.index('const S={');U=json.loads(subprocess.run(['node','-e','process.stdout.write(JSON.stringify(eval("("+require("fs").readFileSync(0,"utf8")+")")))'],input=L[u0+8:L.index('};',u0)+1],capture_output=True,text=True,check=True).stdout)
except Exception as e:print('magasins :',e)
open(os.path.join(S,'items.js'),'w',encoding='utf-8').write('// Généré par tools/build.py depuis liste_achat.html — ne pas modifier à la main.\nwindow.ITEMS='+json.dumps(D,ensure_ascii=False)+';window.STORES='+json.dumps(U,ensure_ascii=False)+';\n')
ids={d[0] for d in D};C=open(os.path.join(S,'catalog.js'),encoding='utf-8').read()
import re;miss=sorted({i for i in re.findall(r'"([a-z0-9]+)"',C)}-ids);print('items.js OK',len(D),'articles',('| ids inconnus dans catalog.js : '+', '.join(miss)) if miss else '')
