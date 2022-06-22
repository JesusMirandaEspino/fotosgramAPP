import { Response, Request, NextFunction } from  'express';
import Token from '../classes/token';


export const verificaToken = ( req: any, res: Response, next: NextFunction ) => {
    const usarToken = req.get( 'x-token' ) || '' ;


    Token.comprobarToken( usarToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            req.usuario = decoded.usuario;
            next();
        })
        .catch( _err => {

            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });

        });

}