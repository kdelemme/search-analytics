'use strict';
var home = process.env.HOME;
var secret = require(home + '/.tw/secret.json')['search_analytics']['development'];

module.exports = {
	client_id: secret.client_id,
	client_secret: secret.client_secret,
	access_token: secret.access_token,
	refresh_token: secret.refresh_token,
	redirect_url: 'http://localhost:3000/oauth2callback',
	siteUrl: encodeURIComponent('https://transferwise.com'),
	database: {
		client: secret.database.client,
		connection: {
			host     : secret.database.connection.host,
			user     : secret.database.connection.user,
			password : secret.database.connection.password,
			database : secret.database.connection.database
		}
	}
}