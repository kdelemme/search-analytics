'use strict';
var R = require('ramda');
var Promise = require('bluebird');

module.exports = function(searchAnalyticsClient) {
	var sanitize = function sanitize(date, rows) {
		return R.map(function (row) {
			return {
				country: row['keys'][0],
				device: row['keys'][1],
				page: row['keys'][2],
				query: row['keys'][3],
				clicks: row['clicks'],
				impressions: row['impressions'],
				ctr: row['ctr'],
				position: row['position'],
				report_from: date
			}
		}, rows);
	};

  	return {
  		fetchAnalyticsFrom: function fetchAnalyticsFrom(date, siteUrl) {
  			return new Promise(function(resolve, reject) {
  				searchAnalyticsClient.query(
  				{
					siteUrl: siteUrl, 
					resource: {
						startDate: date,
						endDate: date,
						dimensions: ['country', 'device', 'page', 'query'],
						rowLimit: 5000
					}
				}, 
				function(err, res) {
					if (err) {
						reject();
					}

					resolve(sanitize(date, res.rows || []));
				});
  			});	
  		}
  	}
}
