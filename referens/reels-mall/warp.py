from PIL import Image, ImageFilter, ImageDraw
import numpy as np
base=Image.open('public/mobil.jpg').convert('RGB')
W,H=base.size
a=np.array(base).astype(int)
white=((a[:,:,0]>215)&(a[:,:,1]>215)&(a[:,:,2]>210))
quad=[(470,530),(708,508),(766,1046),(525,1066)]  # TL TR BR BL
qm=Image.new('L',(W,H),0); ImageDraw.Draw(qm).polygon(quad,fill=255)
m=np.array(qm)>0
mask=Image.fromarray(((white&m)*255).astype('uint8'))
mask=mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
# perspective coeffs mapping output->input
def coeffs(dst,src):
    A=[];B=[]
    for (x,y),(u,v) in zip(dst,src):
        A.append([x,y,1,0,0,0,-u*x,-u*y]);B.append(u)
        A.append([0,0,0,x,y,1,-v*x,-v*y]);B.append(v)
    return np.linalg.solve(np.array(A,float),np.array(B,float))
for s in ['s1','s2','s3','s4','s5']:
    sc=Image.open(f'screens/{s}.png').convert('RGB')
    sw,sh=sc.size
    c=coeffs(quad,[(0,0),(sw,0),(sw,sh),(0,sh)])
    w=sc.transform((W,H),Image.PERSPECTIVE,tuple(c),Image.BICUBIC)
    w=w.filter(ImageFilter.GaussianBlur(0.4))
    # lätt varm ton + skärmglans
    arr=np.array(w).astype(float); arr[:,:,2]*=0.97; arr=np.clip(arr*1.02+4,0,255)
    w=Image.fromarray(arr.astype('uint8'))
    out=w.convert('RGBA'); out.putalpha(mask)
    out.save(f'public/mobil_{s}.png')
    comp=base.copy(); comp.paste(w,(0,0),mask); comp.save(f'screens/comp_{s}.jpg',quality=90)
print('ok')
