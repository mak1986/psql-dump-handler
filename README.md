# psql-dump-handler

[![Build Status](https://travis-ci.org/mak1986/psql-dump-handler.svg?branch=master)](https://travis-ci.org/mak1986/psql-dump-handler)
[![NPM version](http://img.shields.io/npm/v/psql-dump-handler.svg)](https://www.npmjs.org/package/psql-dump-handler)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation ##

```bash
npm install psql-dump-handler -g
```

## Name ##

	psqlDumpHandler - PostgreSQL dump handler


## Synopsis ##

	psqlDumpHandler [COMMAND] [OPTIONS]... [DATABASE NAME]

## Description ##

	Commands: 
		dump (make a dump with only insert statements)

	Options: 
		-s (sort the statements by id)


After running the command in the terminal a dump.sql file will be created at your current path..


__NOTE:__ 
```
	1. This module expect you to have "node" command in /usr/bin/node.
	2. This module currently only supports sorting dump file from PostgreSQL. 
```



## Why? ##

When the database dump your data, it might be unsorted just like the example below.

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

When you use -s option you will get:


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