/*jshint -W083 */
(function(){
	'use strict';
	
	var fs = require('fs');
	var exec = require('child_process').exec;


	function PsqlDumpHandler(dbName){
		this.dbName = dbName;
	}

	PsqlDumpHandler.prototype.sortDumpColumnInsertsDataOnly = function(input){
		
		var data = input.split('\n');
		var tempStatements = [];
		var result = [];
		
		for(var i=0; i<data.length; i++){
			
			if(data[i].substr(0,6)==='INSERT' && data[i+1].substr(0,6)==='INSERT'){

				tempStatements.push(data[i]);

				continue;

			}else if(data[i].substr(0,6)==='INSERT'){

				tempStatements.push(data[i]);

				tempStatements.sort(function(a, b){

					var aInt = parseInt(a.split('VALUES')[1].substr(2).split(',')[0]);
					var bInt = parseInt(b.split('VALUES')[1].substr(2).split(',')[0]);

					return aInt-bInt;

				});

				result.push.apply(result, tempStatements);

				tempStatements = [];


			}else{

				result.push(data[i]);

			}
		}
		
		return result.join('\n');

	};
	
	//pg_dump --column-inserts --data-only dbName
	PsqlDumpHandler.prototype.dumpColumnInsertsDataOnly = function(options) {

		exec(`pg_dump --column-inserts --data-only ${this.dbName}`, (error, stdout, stderr)=> {
			
			if(error){
				console.error(`exec error: ${error}`);
			}
			
			
			if(stderr.length>0){
			
				console.log(`stderr: ${stderr}`);
			
			}else{

				if(options.sortById){
					stdout = this.sortDumpColumnInsertsDataOnly(stdout);			
				}

				fs.writeFile('dump.sql', stdout, 'utf8', (err)=>{
					if(err) throw err;
					process.stdout.write('Success: dump.sql is saved.\n');
					process.exit(0);
				});

			}
		});
	};

	module.exports = PsqlDumpHandler;

}());