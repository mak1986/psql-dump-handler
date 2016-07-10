#!/usr/bin/node
(function(){
	'use strict';
	
	var argv = require('minimist')(process.argv.slice(2));

	var PsqlDumpHandler = require('./lib/PsqlDumpHandler');

	var command = argv._[0];

	if(!command){
	 	process.stderr.write('Error: Command doesn\'t exists\n');
	 	process.exit(1);
	}

	var sortById = argv.s || argv.sort;

	var database = argv._[1] || argv.d || argv.database;

	if(!database){
		process.stderr.write('Error: You must specify the database name\n');
		process.exit(1);
	}

	var preparation = {
		'command': command,
		'options': {
			'sortById':	sortById
		},
		'database': database

	};

	var psqlDumpHandler = new PsqlDumpHandler(preparation.database);

	if(preparation.command === 'dump'){
	 	psqlDumpHandler.dumpColumnInsertsDataOnly(preparation.options);
	}

}());