import { Request, Response, Router } from 'express';
import { verificaToken } from '../middlewares/authentication';
import { Post } from '../models/post.model';

const postRouter = Router();


    postRouter.get( '/', async ( _req: Request, _res: Response ) => {

        let pagina = Number(_req.query.pagina) || 1;
        let skip = pagina - 1;
        skip = skip * 10;
        const posts =  await Post.find()
                                        .sort( { _id: -1 } )
                                        .skip( skip )
                                        .limit(10)
                                        .populate('usuario', '-password')
                                        .exec();

            _res.json({
            ok: true,
            posts
            })

    });


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