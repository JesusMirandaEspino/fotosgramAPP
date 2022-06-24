import Server from "./classes/server";
import usarRouter from "./routes/usuarios";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRouter from "./routes/post";
import fileUpload from "express-fileupload"

const server = new Server();


// body parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );


// fileupload
server.app.use( fileUpload() );

server.app.use( '/user', usarRouter );
server.app.use( '/posts', postRouter );

// conectar mongo
mongoose.connect( 'mongodb://localhost:27017/fotosgram', ( err ) => {
    if( err ){ throw err; }
    console.log( 'Base de datos Online' );
});




// levantar express
server.start( () => {
    console.log( `Servidor corriendo en puerto ${server.port}` );
});



