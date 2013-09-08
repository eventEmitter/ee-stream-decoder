


	var   Class 			= require( "ee-class" )
		, log 				= require( "ee-log" )
		, type 				= require( "ee-types" )
		, TransformStream 	= require( "stream" ).Transform;



	module.exports = new Class( {
		inherits: TransformStream


		, offsetBytes: ""


		, init: function(){
			TransformStream.call( this, { decodeStrings: false } );
		}
		


		, _transform: function( chunk, encoding, callback ){
			var offset = 0;
			
			if ( encoding === "buffer" || type.buffer( chunk ) ) chunk = chunk.toString();

			if ( this.offsetBytes.length > 0 ) {
				chunk = this.offsetBytes + chunk;
				this.offsetBytes = "";
			}

			if ( chunk[ chunk.length - 1 ] === "=" ) offset = chunk.length - 2;
			if ( chunk[ chunk.length - 2 ] === "=" ) offset = chunk.length - 3;

			if ( offset > 0 ){
				this.offsetBytes = chunk.substr( offset );
				chunk = chunk.substr( 0, offset );
			}

			// replace soft newlines 
			chunk = chunk.replace( /=(?:\r\n|\n|\n\r)/g, "" );

			// decode
			chunk = chunk.replace( /=([0-9a-f]{2})/gi, function( m, hexCode ){ return String.fromCharCode( parseInt( hexCode, 16 ) ); } );

			this.push( new Buffer( chunk, "utf8" ) );
			callback();
		}



		, _flush: function( callback ){ log(111);
			if ( this.offsetBytes ) this.push( this.offsetBytes );
			callback();
		}
	} );