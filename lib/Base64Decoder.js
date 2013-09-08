


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

			if ( encoding === "buffer" || type.buffer( chunk ) ) chunk = chunk.toString();

			// ther e may be some extra bytes
			if ( this.offsetBytes.length > 0 ) {
				chunk = this.offsetBytes + chunk;
				this.offsetBytes = "";
			}

			// remove newlines
			chunk = chunk.replace( /[\n\r]/g, "" );

			// check if we can decode the complete chunk
			if ( chunk.length % 4 > 0 ){
				this.offsetBytes = chunk.substr( Math.floor( chunk.length / 4 ) * 4 );
				chunk = chunk.substring( 0, Math.floor( chunk.length / 4 ) * 4 );
			}

			this.push( new Buffer( chunk, "base64" ) );
			callback();
		}



		, _flush: function( callback ){
			if ( this.offsetBytes ) this.push( new Buffer( this.offsetBytes, "base64" ) );
			callback();
		}
	} );