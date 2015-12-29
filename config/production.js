'use strict';
module.exports = {
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	refresh_token: process.env.REFRESH_TOKEN,
	redirect_url: 'http://localhost:3000/oauth2callback',
	siteUrl: encodeURIComponent('https://transferwise.com'),
	database: {
		client: process.env.DATABASE_CLIENT,
		connection: {
			host     : process.env.DATABASE_HOST,
			user     : process.env.DATABASE_USERNAME,
			password : process.env.DATABASE_PASSWORD,
			database : process.env.DATABASE_DATABASE
		}
	}
}