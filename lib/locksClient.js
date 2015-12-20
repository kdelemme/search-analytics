'use strict';
module.exports = function(locksRepository) {
	return {
		acquireLock: function acquireLock(reportDate) {
			return locksRepository.save({report_date: reportDate});
		}
	};
};