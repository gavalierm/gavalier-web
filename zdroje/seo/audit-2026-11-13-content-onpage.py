import re, sys, json, html
from html.parser import HTMLParser
ROOT='/home/agentic-root/agentic/Gavalier/gavalier-web/'
PAGES=['index.html','automatizacia/index.html','tvorba-webu/index.html','ai-agenti/index.html','seo-llm-optimalizacia/index.html','blog/index.html','blog/ako-sa-objavit-v-odpovediach-chatgpt/index.html','blog/ako-automatizovat-fakturaciu-a-emaily/index.html']
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.stack=[]; s.heads=[]; s.cur=None; s.links=[]; s.text=[]; s.skip=0; s.inmain=0; s.title=''; s.intitle=False; s.meta={}; s.ahref=None; s.atext=''
    def handle_starttag(s,t,a):
        a=dict(a)
        if t in('script','style','svg'): s.skip+=1
        if t=='main': s.inmain+=1
        if t=='title': s.intitle=True
        if t=='meta' and (a.get('name') or a.get('property')): s.meta[a.get('name') or a.get('property')]=a.get('content','')
        if re.fullmatch(r'h[1-6]',t): s.cur=[t,self_line(s),'']
        if t=='a': s.ahref=a.get('href'); s.atext=''; s.aline=s.getpos()[0]
        if t in('p','li','br','h1','h2','h3','h4','div','summary','blockquote','dd','dt'): s.text.append('\n')
    def handle_endtag(s,t):
        if t in('script','style','svg'): s.skip-=1
        if t=='main': s.inmain-=1
        if t=='title': s.intitle=False
        if s.cur and t==s.cur[0]: s.heads.append((s.cur[0],s.cur[1],' '.join(s.cur[2].split()))); s.cur=None
        if t=='a' and s.ahref is not None: s.links.append((s.aline,s.ahref,' '.join(s.atext.split()))); s.ahref=None
    def handle_data(s,d):
        if s.intitle: s.title+=d
        if s.skip: return
        if s.cur: s.cur[2]+=d
        if s.ahref is not None: s.atext+=d
        if s.inmain: s.text.append(d)
def self_line(s): return s.getpos()[0]
out={}
for pg in PAGES:
    src=open(ROOT+pg,encoding='utf-8').read()
    p=P(); p.feed(src)
    txt=html.unescape(''.join(p.text))
    words=re.findall(r'[^\W\d_]+',txt)
    sents=[x for x in re.split(r'[.!?]+\s',' '.join(txt.split())) if len(x.split())>2]
    awl=sum(map(len,words))/max(1,len(words))
    asl=len(words)/max(1,len(sents))
    long_sent=sum(1 for x in sents if len(x.split())>25)
    print('=== '+pg)
    print('title(%d): %s'%(len(p.title.strip()),p.title.strip()))
    d=p.meta.get('description','');print('desc(%d): %s'%(len(d),d))
    print('words_main=%d sentences=%d avg_sent_len=%.1f avg_word_len=%.2f long_sent(>25w)=%d'%(len(words),len(sents),asl,awl,long_sent))
    for h in p.heads: print('  %s L%d %s'%h)
    internal=[l for l in p.links if l[1] and (l[1].startswith('/') or 'gavalier.sk' in l[1]) ]
    print('  links:', len(p.links), 'internal(non-#):', len([l for l in internal]))
    for l in p.links:
        if l[1] and not l[1].startswith(('tel:','mailto:','#')): print('    L%d %s [%s]'%l)
    out[pg]={'title':p.title.strip(),'description':d,'words':len(words)}
json.dump([{'url':'https://www.gavalier.sk/'+k.replace('index.html',''),'title':v['title'],'description':v['description']} for k,v in out.items()],open(ROOT+'scratch/seo-audit/content/metadata.json','w'),ensure_ascii=False,indent=1)
