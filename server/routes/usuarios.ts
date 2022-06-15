import { Request, Response, Router } from "express";
import { Usuario } from "../models/user.models";
import bcrypt from 'bcrypt' ;



const usarRouter = Router();

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
