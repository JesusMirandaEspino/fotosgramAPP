import { Request, Response, Router } from "express";



const usarRouter = Router();

usarRouter.get( '/prueba', ( _req: Request, _res: Response ) => {
    _res.json({
        ok: true, 
        mensaje: 'Todo Funciona Bien'
    });
});


export default usarRouter;
