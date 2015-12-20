var expect = require('expect.js');

describe('AnalyticsClient', function() {
	it('should query the analytics api', function (done) {
		var analyticsClient = require('../lib/analyticsClient')(searchAnalyticsClientSpy);

		analyticsClient.fetchAnalyticsFrom('2015-12-10', 'www.example.com')
		.then(function(data) {
			expect(searchAnalyticsClientSpy._called).to.be(true);
			done()
		});
	});

	var searchAnalyticsClientSpy = {
		_called: false,
		query: function(params, cb) {
			this._called = true;
			return cb(null, {rows: []});
		}
	};

	it('should sanitize the analytics data', function (done) {
		var searchAnalyticsClientMock = buildSearchAnalyticsClientMockWithData({
			rows: [
				{
					keys: ['uk', 'desktop', 'www.example.com/page', 'search query'], 
					clicks: 12, 
					impressions: 120, 
					ctr: 0.1, 
					position: 3
				},
				{
					keys: ['fra', 'mobile', 'www.example.com/page', 'search query'], 
					clicks: 5, 
					impressions: 10, 
					ctr: 0.5, 
					position: 2
				}
			]
		});
		var analyticsClient = require('../lib/analyticsClient')(searchAnalyticsClientMock);

		analyticsClient.fetchAnalyticsFrom('2015-12-10', 'www.example.com')
		.then(function(data) {
			expect(data).to.have.length(2);
			expect(data[0]).to.have.property('country', 'uk');
			expect(data[0]).to.have.property('device', 'desktop');
			expect(data[0]).to.have.property('page', 'www.example.com/page');
			expect(data[0]).to.have.property('query', 'search query');
			expect(data[0]).to.have.property('clicks', 12);
			expect(data[0]).to.have.property('impressions', 120);
			expect(data[0]).to.have.property('ctr', 0.1);
			expect(data[0]).to.have.property('position', 3);
			expect(data[0]).to.have.property('report_from', '2015-12-10');
			done()
		});
	});

	var buildSearchAnalyticsClientMockWithData = function buildSearchAnalyticsClientMockWithData(data) {
		return {
			query: function(params, cb) {
				return cb(null, data);
			}
		};
	};
});