import json,sys,re
d=json.load(open(sys.argv[1]))
h=d.get('content') or d.get('raw_content') or ''
t=(d.get('extracted_text') or '')
low=h.lower()
sd=d.get('structured_data') or {}
types=sorted({x for b in sd.get('blocks',[]) for x in b.get('types',[])})
sig={k:len(re.findall(p,low)) for k,p in {
 'ref/case':r'referenc|case stud|prípadov|portfólio|portfolio|naše projekty|projekty',
 'review':r'recenzi|hodnoteni|testimonial|google review|★',
 'eur':r'\d[\d\s]*\s?€|€\s?\d|eur\b',
 'form':r'<form',
 'tel':r'href="tel:',
 'faq':r'faq|časté otázky|najčastejšie otázky',
 'video':r'<video|youtube.com/embed',
 'img':r'<img'}.items()}
print(d.get('url'),d.get('status_code'),'words~',len(t.split()),'h1',(d.get('js_gap') or {}).get('raw',{}).get('h1'),sig,types[:12])
