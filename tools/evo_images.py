"""Exporte des paires avant/après pour la page Évolution.
Usage : python3 tools/evo_images.py DATE PREFIXE_AVANT PREFIXE_APRES nom0 nom1 ...
(nomK correspond aux images PREFIXE_K.png ; « - » pour sauter un index)"""
import sys,os
from PIL import Image
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d,av,ap,*names=sys.argv[1:];D=os.path.join(R,'evolution',d);os.makedirs(D,exist_ok=True)
for i,n in enumerate(names):
    if n=='-':continue
    for src,p in((av,'avant'),(ap,'apres')):
        im=Image.open(f'{src}_{i}.png').convert('RGB');im.thumbnail((900,900));im.save(os.path.join(D,f'{p}_{n}.jpg'),quality=80,optimize=True)
print('OK',len([n for n in names if n!='-']),'paires dans',D)
