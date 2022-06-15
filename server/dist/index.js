"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = new server_1.default();
server.app.use('/user', usuarios_1.default);
// conectar mongo
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', (err) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos Online');
});
// levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
