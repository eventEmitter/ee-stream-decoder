

	var StreamDecoder 	= require( "./" )
		, log 			= require( "ee-log")
		, fs 			= require( "fs" );



	var test = function( encoding ){
		var   decoder 	= new StreamDecoder( encoding )
			, result 	= "";


		decoder.on( "data", function( buf ){
			result += buf.toString();
		} );

		decoder.on( "end", function(){
			log( result );
		} );



		var file = fs.readFileSync( __dirname + "/test/"+encoding+".data" ).toString();


		for( var i = 0, l = file.length; i < l; i += 10 ){
			decoder.write( file.substr( i, 10 ) );
		}

		decoder.end();
	}

	
	test( "qp" );
	test( "base64" );

