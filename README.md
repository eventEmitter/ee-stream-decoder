# ee-stream-decoder

stream decodes base64 and quoted printable data

## installation

npm install ee-stream-decoder

## usage 

	
	var StreamDecoder 	= require( "./" );


	var   decoder 	= new StreamDecoder( "base64" )
		, result 	= "";


	decoder.on( "data", function( buf ){
		result += buf.toString();
	} );

	decoder.on( "end", function(){
		log( result );
		// A "transform" stream is a duplex stream where the output is causally 
		// connected in some way to the input, such as a zlib stream or a crypto stream.
	} );


	decoder.write( "Q" );
	decoder.write( "SAidHJhbnNmb3JtIiBzdHJlYW0gaXMgYSBkdXBsZXggc3RyZWFtI" );
	decoder.write( "\n" );
	decoder.write( "HdoZXJlIHRoZSBvd\n\rXRwdXQgaXMgY2F1c2FsbHkgY29ubmVjdGVkIGluIHNvbWUgd2" );

	decoder.end( "F5IHRvIHRoZSBpbnB1dCwgc3VjaCBhcyBhIHpsaWIgc3RyZWFtIG9yIGEgY3J5cHRvIHN0cmVhbS4=" );