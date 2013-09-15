


	var   Class 					= require( "ee-class" )
		, type 						= require( "ee-types" )
		, log 						= require( "ee-log" );


	var   Base64Decoder 			= require( "./Base64Decoder" )
		, QuotedPrintableDecoder 	= require( "./QuotedPrintableDecoder" );



	module.exports = new Class( {

		
		init: function( options ){
			if ( type.string( options ) ) options = { encoding: options };
			if ( !type.object( options ) ) options = {};
			if ( !type.string( options.encoding ) ) options.encoding = "7bit";

			switch ( options.encoding.toLowerCase() ){
				case "base64":
					return new Base64Decoder( options );
				case "7bit":
					return new SevenBitDecoder( options );
				case "quotedprintable":
				case "quoted-printable":
				case "quoted":
				case "printable":
				case "qp":
					return new QuotedPrintableDecoder( options );

				default:
					throw new Error( "unknown stream encoding" );
			}
		}
	} );