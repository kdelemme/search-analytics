'use strict';
var R = require('ramda');
var Promise = require('bluebird');

module.exports = function(webmastersClient, AnalyticsRepository, reportDate, siteUrl) {
	var startDate = reportDate.format('YYYY-MM-DD');
	var endDate = reportDate.add(1, 'days').format('YYYY-MM-DD');

	var toAnalytics = R.map(function (row) {
		return {
			country: row['keys'][0],
			device: row['keys'][1],
			page: row['keys'][2],
			query: row['keys'][3],
			clicks: row['clicks'],
			impressions: row['impressions'],
			ctr: row['ctr'],
			position: row['position'],
			report_from: startDate
		}
	});

  	return {
  		fetchAnalytics: function fetchAnalytics() {
  			return new Promise(function(resolve, reject) {
  				webmastersClient.searchanalytics.query(
  				{
					siteUrl: siteUrl, 
					resource: {
						startDate: startDate,
						endDate: endDate,
						dimensions: ['country', 'device', 'page', 'query']
					},
					rowLimit: 5000
				}, 
				function(err, res) {
					AnalyticsRepository.insert(toAnalytics(res.rows)).into('analytics')
					.then(function(rows) {
						resolve();
					});
				});
  			});	
  		}
  	}
}
