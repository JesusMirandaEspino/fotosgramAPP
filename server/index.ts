import Server from "./classes/server";

const server = new Server();



// levantar express


server.start( () => {
    console.log( `Servidor corriendo en puerto ${server.port}` );
});



