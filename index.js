var config = require('./config/config.js');

var google = require('googleapis');
var moment = require('moment');
var googleOAuthClient = require('./lib/google-oauth-client')(config.client_id, config.client_secret, '', config.access_token, config.refresh_token);

googleOAuthClient.authenticate()
.then(function(oauth2Client) {
	var webmastersClient = google.webmasters({ version: 'v3', auth: oauth2Client });
	var reportDate = moment().subtract(3, 'days');

	var knex = require('knex')({
		client: 'mysql',
		connection: {
			host     : '127.0.0.1',
			user     : 'root',
			password : '',
			database : 'webmasters'
		}
	});

	var analyticsClient = require('./lib/analytics-client')(webmastersClient, knex, reportDate, config.siteUrl);
	return analyticsClient.fetchAnalytics();
})
.then(function() {
	process.exit(0);
});
