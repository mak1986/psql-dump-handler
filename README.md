# psql-dump-handler

[![Build Status](https://travis-ci.org/mak1986/psql-dump-handler.svg?branch=master)](https://travis-ci.org/mak1986/psql-dump-handler)


## When the database dump your data, it might be unsorted ##

```sql
--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: makjacobsen
--

INSERT INTO "group" (id, name) VALUES (2, "Admin");
INSERT INTO "group" (id, name) VALUES (1, "Super Admin");


--
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: makjacobsen
--

SELECT pg_catalog.setval('group_id_seq', 2, true);


```

## This example show how to sort your dump file ##

__STEP 1:__ Create a file name index.js that uses psql-dump-hander.

```Javascript
(function(){
	'use strict';

	var PsqlDumpHandler = require('psql-dump-handler');

	var psqlDumpHandler = new PsqlDumpHandler('your_db_name');

	var options = {
		sortById: true
	};

	psqlDumpHandler.dumpColumnInsertsDataOnly(options);

}());
```

__STEP 2:__ In command line interface type: 

```
node index.js
```

__STEP 3:__ A dump.sql file will be created at your current path.


## dump.sql will look like this ##

```sql
--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: makjacobsen
--

INSERT INTO "group" (id, name) VALUES (1, "Super Admin");
INSERT INTO "group" (id, name) VALUES (2, "Admin");


--
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: makjacobsen
--

SELECT pg_catalog.setval('group_id_seq', 2, true);


```