import re,sys,html,urllib.parse
t=open(sys.argv[1],encoding='utf-8',errors='ignore').read()
for m in re.finditer(r'class="result__a" href="([^"]+)"[^>]*>(.*?)</a>.*?class="result__snippet"[^>]*>(.*?)</a>',t,re.S):
    u=m.group(1)
    q=urllib.parse.parse_qs(urllib.parse.urlparse(u).query).get('uddg',[u])[0]
    ti=html.unescape(re.sub('<[^>]+>','',m.group(2)))
    sn=html.unescape(re.sub('<[^>]+>','',m.group(3)))[:110]
    print('-',q,'|',ti,'|',sn)
