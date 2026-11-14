import sys
sys.path.insert(0, sys.argv[1])
import google_auth as g
from google.auth.transport.requests import AuthorizedSession
s = AuthorizedSession(g.get_service_account_credentials(["https://www.googleapis.com/auth/analytics.readonly"]))
body = {"dateRanges":[{"startDate":"90daysAgo","endDate":"today"}],"dimensions":[{"name":"sessionDefaultChannelGroup"}],"metrics":[{"name":"sessions"}]}
r = s.post("https://analyticsdata.googleapis.com/v1beta/properties/564241718:runRealtimeReport", json={"metrics":[{"name":"activeUsers"}],"minuteRanges":[{"startMinutesAgo":29,"endMinutesAgo":0}]})
print(r.status_code)
for row in r.json().get("rows", []):
    print("activeUsers", row["metricValues"][0]["value"])
print("rows:", r.json().get("rowCount", 0))
