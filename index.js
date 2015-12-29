'use strict';
var env = process.env.NODE_ENV == 'production' ? 'production' : 'development';
var config = require('./config/' + env);
var google = require('googleapis');
var moment = require('moment');
var argv = require('argv');
var googleOAuthClient = require('./lib/googleOAuthClient');
var analyticsRepository = require('./lib/repository/sqlAnalyticsRepository')(config.database);
var locksRepository = require('./lib/repository/sqlLocksRepository')(config.database);
var locksClient = require('./lib/locksClient')(locksRepository);

var args = argv.option([
	{
		name: 'date',
		type: 'string',
		description: 'Fetch analytics report for that specific date',
		example: "'script --date=YYYY-MM-DD'"
	}
]).run();

var reportDate = args.options.date || moment().subtract(3, 'days').format('YYYY-MM-DD');

locksClient.acquireLock(reportDate)
.then(function() {
	return googleOAuthClient.authenticate(config.client_id, config.client_secret, config.redirect_url, config.access_token, config.refresh_token);
})
.then(function(oauth2Client) {
	var searchAnalyticsClient = google.webmasters({ version: 'v3', auth: oauth2Client }).searchanalytics;
	var analyticsClient = require('./lib/analyticsClient')(searchAnalyticsClient);
	
	return analyticsClient.fetchAnalyticsFrom(reportDate, config.siteUrl);
})
.then(function(data) {
	return analyticsRepository.save(data);
})
.then(function() {
	process.exit(0);
}, function(err) {
	process.exit(1);
});
