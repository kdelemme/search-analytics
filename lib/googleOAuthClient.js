'use strict';
var Promise = require('bluebird');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

module.exports = {
	authenticate: function authenticate(client_id, client_secret, redirect_url, access_token, refresh_token) {
		return new Promise(function(resolve, reject) {
			var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
			oauth2Client.setCredentials({
			  access_token: access_token,
			  refresh_token: refresh_token
			});

			oauth2Client.refreshAccessToken(function(err, tokens) {
				if (err) {
					reject();
				}
				
				oauth2Client.setCredentials(tokens)
				resolve(oauth2Client);
			});	
		})
	}
};
