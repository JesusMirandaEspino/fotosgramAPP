import { Request, Response, Router } from 'express';
import { verificaToken } from '../middlewares/authentication';
import { Post } from '../models/post.model';

const postRouter = Router();

    postRouter.post( '/', [ verificaToken ], ( _req: Request, _res: Response ) => {

        const body = _req.body;
        body.usuario = _req.body._id;

        Post.create( body ).then( async postDB => {

            await postDB.populate('usuario', '-password');

                _res.json({
                ok: true,
                postDB
                })
        });

    });

export default postRouter;