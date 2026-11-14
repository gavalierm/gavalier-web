import re,html,itertools
R='/home/agentic-root/agentic/Gavalier/gavalier-web/'
P=['automatizacia','tvorba-webu','ai-agenti','seo-llm-optimalizacia','blog/ako-sa-objavit-v-odpovediach-chatgpt','blog/ako-automatizovat-fakturaciu-a-emaily']
def main_text(p):
    s=open(R+p+'/index.html',encoding='utf-8').read()
    m=re.search(r'<main.*?</main>',s,re.S).group(0)
    m=re.sub(r'<(script|style|svg).*?</\1>','',m,flags=re.S)
    m=html.unescape(re.sub(r'<[^>]+>',' ',m))
    return [w.lower() for w in re.findall(r'[^\W\d_]+',m)]
T={p:main_text(p) for p in P}
def sh(w,k=5): return {tuple(w[i:i+k]) for i in range(len(w)-k+1)}
S={p:sh(w) for p,w in T.items()}
for a,b in itertools.combinations(P[:4],2):
    print(f'{a} vs {b}: jaccard5={len(S[a]&S[b])/len(S[a]|S[b]):.2f}')
svc=P[:4]
common=set.intersection(*[S[p] for p in svc])
for p in svc:
    other=set.union(*[S[q] for q in svc if q!=p])
    print(p,'words',len(T[p]),'share of 5-grams shared with other service pages: %.0f%%'%(100*len(S[p]&other)/len(S[p])), 'in all 4: %.0f%%'%(100*len(S[p]&common)/len(S[p])))
