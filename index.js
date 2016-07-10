#!/usr/bin/node
(function(){
	'use strict';
	
	var PsqlDumpHandler = require('./lib/PsqlDumpHandler');

	var commands = ['dump'];
	var options = {'-s': 'sortById'};

	var cliArgs = process.argv;
	
	var args = cliArgs.slice(2);

	function getCommand(){
		for(var c = 0; c < commands.length; c++){
			if(commands[c]==args[0]){
				return commands[c];
			}
		}
		process.stderr.write('Error: Command doesn\'t exists\n');
		process.exit(1);
	}
	
	function getOptions(){
		var result = {};
		var optionName;
		var optionKeys = Object.keys(options);

		for(var aIndex = 1; aIndex < args.length; aIndex++){
			for(var oIndex in optionKeys){
				if(args[aIndex] === optionKeys[oIndex]){
					optionName = options[optionKeys[oIndex]];
					result[optionName] = true;
				}
			}
		}
		return result;
	}

	function getDatabase(){
		for(var aIndex = 1; aIndex < args.length; aIndex++){
			if(args[aIndex].substr(0,1) != '-'){
				return args[aIndex];
			}
		}
		process.stderr.write('Error: You must specify the database name\n');
		process.exit(1);
	}

	var preparation = {
		'command': getCommand(),
		'options': getOptions(),
		'database': getDatabase()
	};

	var psqlDumpHandler = new PsqlDumpHandler(preparation.database);

	if(preparation.command === 'dump'){
		psqlDumpHandler.dumpColumnInsertsDataOnly(preparation.options);
	}

}());