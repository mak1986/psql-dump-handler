(function(){
	'use strict';

	var fs = require('fs');
	var chai = require('chai');
	var expect = chai.expect;
	var PsqlDumpHandler = require('../../lib/PsqlDumpHandler.js');

	describe('PsqlDumpHandler', function(){

		var psqlDumpHandler;

		before(function(){

			psqlDumpHandler = new PsqlDumpHandler();

		});

		describe('sortDumpColumnInsertsDataOnly(input)', function(){

			it('should sort correctly', function(){

				var unsortedDump, sortedDump;

				fs.readFile('./sortedDump.txt', 'utf8', function(err, sortedData){
				
					if(err) throw err;

					sortedDump = sortedData;

					fs.readFile('./unsortedDump.txt', 'utf8', function(err, unsortedData){

						if(err) throw err;

						unsortedDump = unsortedData;

						expect(sortedDump).to.equal(psqlDumpHandler.sortDumpColumnInsertsDataOnly(unsortedDump));


					});

				});




			});

		});


	});

}());