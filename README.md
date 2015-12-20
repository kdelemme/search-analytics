# Webmasters Tool

Fetch the daily analytics from Google Webmasters Tools.

# Installation

Run `npm install`

Create `~/.tw/secret.json` containing:

```
{
	"webmasters": {
		"development": {
			"client_id": "GOOGLE_CLIENT_ID",
			"client_secret": "GOOGLE_CLIENT_SECRET",
			"access_token": "UNUSED_WILL_BE_REFRESHED",
			"refresh_token": "GOOGLE_REFRESH_TOKEN",
			"database": {
				"client": "mysql",
				"connection": {
					"host": "HOST",
					"user": "USER",
					"password": "PASSWORD",
					"database": "DATABASE"
				}
			}
		},
		"production": {
			"client_id": "GOOGLE_CLIENT_ID",
			"client_secret": "GOOGLE_CLIENT_SECRET",
			"access_token": "UNUSED_WILL_BE_REFRESHED",
			"refresh_token": "GOOGLE_REFRESH_TOKEN",
			"database": {
				"client": "mysql",
				"connection": {
					"host": "HOST",
					"user": "USER",
					"password": "PASSWORD",
					"database": "DATABASE"
				}
			}
		}
	}
}
```


# Run

Run `node index.js` to fetch the analytics from 3 days ago (no earlier data available).

Run `node index.js --date=YYYY-MM-DD` to fetch the analytics from the specific date.

# Tests

Run `npm test` or `mocha`