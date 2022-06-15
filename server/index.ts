import Server from "./classes/server";
import usarRouter from "./routes/usuarios";

const server = new Server();


server.app.use( '/user', usarRouter );



// levantar express
server.start( () => {
    console.log( `Servidor corriendo en puerto ${server.port}` );
});



