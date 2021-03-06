'use strict';

/*©mit**************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright 2014-2017 Friend Software Labs AS                                  *
*                                                                              *
* Permission is hereby granted, free of charge, to any person obtaining a copy *
* of this software and associated documentation files (the "Software"), to     *
* deal in the Software without restriction, including without limitation the   *
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or  *
* sell copies of the Software, and to permit persons to whom the Software is   *
* furnished to do so, subject to the following conditions:                     *
*                                                                              *
* The above copyright notice and this permission notice shall be included in   *
* all copies or substantial portions of the Software.                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* MIT License for more details.                                                *
*                                                                              *
*****************************************************************************©*/

const http = require( 'http' );
const queryString = require( 'querystring' );

const log = function( msg, data ) {
	global.log( 'CouchRequest', msg, data );
}

const CRQ = function( conf ) {
	var self = this;
	self.host = conf.host;
	self.port = conf.port;
	self.init();
}

// Public

// PUT
CRQ.prototype.put = function( path, data ) {
	var self = this;
	log( 'put', { path : path, data : data });
	var dataStr = '';
	if ( 'string' === typeof( data ))
		dataStr = data;
	else
		dataStr = JSON.stringify( data );
	
	var opts = self.buildOpts( 'PUT', path );
	self.setContentLength( opts, data );
	return self.request( opts );
}

// GET
CRQ.prototype.get = function( path ) {
	var self = this;
	log( 'get', path );
	var opts = self.buildOpts( 'GET', path );
	return self.request( opts );
}

// Private

CRQ.prototype.init = function() {
	var self = this;
	log( 'init', { host : self.host, port : self.port });
	if ( null == self.host )
		throw new Error( 'CouchRequest - host is not set' );
	if ( null == self.port )
		throw new Error( 'CouchRequest - port is not set' );
}

CRQ.prototype.request = function( opts, data ) {
	var self = this;
	return new Promise( request );
	function request( resolve, reject ) {
		self.setAccept( opts );
		var req = http.request( opts, reqBack );
		req.on( 'error', reject );
		if ( data )
			req.write( data );
		
		req.end();
		
		function reqBack( res ) { self.readResponse( res, resolve ); }
	}
}

CRQ.prototype.buildOpts = function( method, path ) {
	var self = this;
	var opts = {
		hostname : self.host,
		port     : self.port,
		method   : method,
		path     : path,
	};
	
	return opts;
}

CRQ.prototype.setContentLength = function( opts, queryData ) {
	var self = this;
	var len = 0;
	if ( queryData && queryData.length )
		len = Buffer.byteLength( queryData );
	
	var headers = opts.headers || {};
	headers[ 'Content-Length' ] = len;
	
	opts.headers = headers;
}

CRQ.prototype.setAccept = function( opts ) {
	var self = this;
	var headers = opts.headers || {};
	headers[ 'Accept' ] = 'application/json';
	
	opts.headers = headers;
}

CRQ.prototype.readResponse = function( res, callback ) {
	var self = this;
	var chunks = [];
	res.on( 'data', onData );
	res.on( 'end', onEnd );
	
	// Lets just pretend its always a string reply, and not mess around with buffers
	function onData( chunk ) {
		chunks.push( chunk );
	}
	function onEnd() {
		var raw = chunks.join( '' );
		var data = parse( raw );
		callback({ data : data, code : res.statusCode });
	}
}

//
module.exports = function( conf ) { return new CRQ( conf ); }

// how is this not default
function parse( string ) {
	try {
		return JSON.parse( string );
	} catch( e ) {
		return null;
	}
}