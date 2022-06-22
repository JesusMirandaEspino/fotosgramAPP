import { Request, Response, Router } from "express";
import { Usuario } from "../models/user.models";
import bcrypt from 'bcrypt' ;
import Token from "../classes/token";
import { verificaToken } from "../middlewares/authentication";



const usarRouter = Router();


usarRouter.post( '/login', (_req: Request, _res: Response) => {
    const body = _req.body;

    Usuario.findOne({ email: body.email }, (err: any, userDB: any) => {

        if( err ) throw err;

        if( !userDB ){
            return _res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctas'
            });
        }

        if( userDB.compararPassword( body.password ) ){

            const tokenUsuario = Token.getJWToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            _res.json({
                ok: true,
                token: tokenUsuario
            });
        }else{
            return _res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctas *********'
            });
        }

    })
});

usarRouter.post( '/create', ( _req: Request, _res: Response ) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync( _req.body.password,salt);

    const user = {
        nombre: _req.body.nombre,
        email: _req.body.email,
        password: hash,
        avatar: _req.body.avatar  
    }

    Usuario.create( user ).then( userDB => {


            const tokenUsuario = Token.getJWToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            _res.json({
                ok: true,
                token: tokenUsuario
            });




    }).catch( _err => {
        _res.json({
            ok: false, 
            _err
        });
    });


});


usarRouter.post( '/update', verificaToken, ( _req: any, _res: Response ) => {

    const user = {
        nombre: _req.body.nombre || _req.usuario.nombre,
        email: _req.body.email || _req.usuario.email,
        avatar: _req.body.avatar || _req.usuario.avatar
    }


    Usuario.findByIdAndUpdate( _req.usuario._id, user, { new: true }, ( err, userDB ) => {
        if( err ) throw err;

        if( !userDB ){
            return _res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }


        const tokenUsuario = Token.getJWToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        _res.json({
            ok: true,
            token: tokenUsuario
        });
    });

});


export default usarRouter;
