'use strict';
var env = process.env.NODE_ENV == 'production' ? 'production' : 'development';
var home = process.env.HOME;
var secret = require(home + '/.tw/secret.json')['analytics'][env];

module.exports = {
	client_id: secret.client_id,
	client_secret: secret.client_secret,
	access_token: secret.access_token,
	refresh_token: secret.refresh_token,
	redirect_url: 'http://localhost:3000/oauth2callback',
	siteUrl: 'www.kdelemme.com',
	database: {
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'root',
			password : '',
			database : 'webmasters'
		}
	}
}