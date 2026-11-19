"""Construit index.html (site VR autonome) à partir de source/vr.html en inlinant les scripts."""
import re,os
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=os.path.join(R,'source')
h=open(os.path.join(S,'vr.html'),encoding='utf-8').read()
h=re.sub(r'<script src="([^"]+)"></script>',lambda m:'<script>\n'+open(os.path.join(S,m.group(1)),encoding='utf-8').read().replace('</script>','<\\/script>')+'\n</script>',h)
open(os.path.join(R,'index.html'),'w',encoding='utf-8').write(h);print('index.html OK',len(h))
