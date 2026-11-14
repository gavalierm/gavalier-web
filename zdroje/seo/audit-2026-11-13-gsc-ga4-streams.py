import sys
sys.path.insert(0, sys.argv[1])
import google_auth as g
from google.auth.transport.requests import AuthorizedSession
s = AuthorizedSession(g.get_service_account_credentials(["https://www.googleapis.com/auth/analytics.readonly"]))
r = s.get("https://analyticsadmin.googleapis.com/v1beta/properties/564241718/dataStreams")
print(r.status_code)
for d in r.json().get("dataStreams", []):
    w = d.get("webStreamData", {})
    print(d.get("displayName"), "|", w.get("measurementId"), "|", w.get("defaultUri"), "|", d.get("createTime","")[:10])
