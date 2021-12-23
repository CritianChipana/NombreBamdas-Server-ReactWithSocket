const BandList = require("./band-list");

class Sockets {


    constructor( io ){

        this.io = io;
        this.socketsEvents();
        this.bandList = new BandList();
    }

    socketsEvents(){
        // On Connection
        this.io.on('connection', ( socket ) => { 

            console.log("Clientes connectados");

            //? Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands() ); 

            //? BVOTAR POR LA BANDA
            socket.on('votar-banda',( id )=>{
                this.bandList.increaseVotes( id );
                this.io.emit('current-bands', this.bandList.getBands() ); 
                // socket.broadcast.emit('current-bands', this.bandList.getBands() ); 
            })

            //? Borrar banda
            socket.on('borrar-banda', ( id )=>{
                this.bandList.removeBand( id );
                this.io.emit('current-bands', this.bandList.getBands() ); 
            });
        
            //? CAMBIAR NOMBRE
            socket.on('cambiar-nombre-banda', ( {id, nombre })=>{
                this.bandList.changeName(id, nombre);
                this.io.emit('current-bands', this.bandList.getBands() ); 
            });

            //? CREAR BANDA
            socket.on('nueva-Banda',( {nombre} )=>{
                this.bandList.addBand(nombre);
                this.io.emit('current-bands', this.bandList.getBands() ); 
            })
            
        });
    }

}


module.exports = Sockets;