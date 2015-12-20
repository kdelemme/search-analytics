'use strict';

module.exports = function(config) {
	var knex = require('knex')(config);

	return {
		save: function save(data) {
			return knex.insert(data).into('locks');
		}
	};
};