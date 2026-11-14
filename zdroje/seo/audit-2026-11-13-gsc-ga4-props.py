import sys
sys.path.insert(0, sys.argv[1])
import google_auth as g
from google.auth.transport.requests import AuthorizedSession
creds = g.get_service_account_credentials(["https://www.googleapis.com/auth/analytics.readonly"])
s = AuthorizedSession(creds)
r = s.get("https://analyticsadmin.googleapis.com/v1beta/accountSummaries")
print(r.status_code)
if r.ok:
    for a in r.json().get("accountSummaries", []):
        for p in a.get("propertySummaries", []):
            print(a.get("displayName"), "|", p.get("displayName"), "|", p.get("property"))
else:
    print(r.text[:400])
