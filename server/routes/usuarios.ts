import { Request, Response, Router } from "express";
import { Usuario } from "../models/user.models";
import bcrypt from 'bcrypt' ;



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
            _res.json({
                ok: true,
                token: 'sd546f4sf4sa4f54s6af546s546546sea'
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

    Usuario.create( user ).then( userDb => {
        _res.json({
            ok: true, 
            user: userDb
        });
    }).catch( _err => {
        _res.json({
            ok: false, 
            _err
        });
    });


});


export default usarRouter;
