import Server from "./classes/server";
import usarRouter from "./routes/usuarios";
import mongoose from "mongoose";

const server = new Server();


server.app.use( '/user', usarRouter );


// conectar mongo
mongoose.connect( 'mongodb://localhost:27017/fotosgram', ( err ) => {
    if( err ){ throw err; }
    console.log( 'Base de datos Online' );
});




// levantar express
server.start( () => {
    console.log( `Servidor corriendo en puerto ${server.port}` );
});



