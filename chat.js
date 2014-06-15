var net = require( 'net' );
var chatServer = net.createServer(),
    clientList = []

chatServer.on( 'connection', function( client ) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write( 'Hi ' + client.name + '!\n' );
    console.log( client.name + 'joined' );
    
    clientList.push( client );

    client.on( 'data', function( data ){
        broadcast( data, client )
    } )

    client.on( 'end', function() {
        console.log( client.name + ' quit' );
        clientList.splice( clientList.indexOf( client ), 1 );
    } )

    client.on( 'error', function(){ 
       console.log( e );
    } )

})

function broadcast( message, client ) {
    for (var i = 0; i < clientList.length; ++i ) {
        if ( client !== clientList[ i ] ) {
           clientList[ i ].write( client.name + " says " + message );
        }
    }
}

chatServer.listen( 9000 );
