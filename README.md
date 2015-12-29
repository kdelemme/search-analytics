# Search Analytics Gatherer

Fetch the search analytics data from Google Webmasters Tools from a specific date.

# Installation

Run `npm install`

Create `~/.tw/secret.json` containing:

```
{
	"search_analytics": {
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
		}
	}
}
```


# Run

## Without docker (development)

Run `node index.js` to fetch the analytics from 3 days ago (no earlier data available).

Run `node index.js --date=YYYY-MM-DD` to fetch the analytics from the specific date.

## With docker (production)

Build the docker image: `docker build -t search-analytics .`

Run the docker instance: 

```
docker run \
-e "NODE_ENV=production" \
-e "CLIENT_ID=GOOGLE_CLIENT_ID" \
-e "CLIENT_SECRET=GOOGLE_CLIENT_SECRET" \
-e "ACCESS_TOKEN=GOOGLE_ACCESS_TOKEN" \
-e "REFRESH_TOKEN=GOOGLE_REFRESH_TOKEN" \
-e "DATABASE_CLIENT=mysql" \
-e "DATABASE_HOST=HOST" \
-e "DATABASE_USERNAME=USER" \
-e "DATABASE_PASSWORD=PASSWORD" \
-e "DATABASE_DATABASE=search_analytics" \
-i -t search-analytics
```

# Tests

Run `npm test` or `mocha`