'use strict';
var env = process.env.NODE_ENV == 'production' ? 'production' : 'development';
var home = process.env.HOME;
var secret = require(home + '/.tw/secret.json')['analytics'][env];

module.exports = {
	client_id: secret.client_id,
	client_secret: secret.client_secret,
	access_token: secret.access_token,
	refresh_token: secret.refresh_token,
	siteUrl: 'www.kdelemme.com'
}