import { Request, Response, Router } from "express";
import { Usuario } from "../models/user.models";



const usarRouter = Router();

usarRouter.post( '/create', ( _req: Request, _res: Response ) => {


    const user = {
        nombre: _req.body.nombre,
        email: _req.body.email,
        password: _req.body.password,
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
