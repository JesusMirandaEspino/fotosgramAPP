import { Request, Response, Router } from 'express';
import { FileUpload } from '../interfaces/file-upload';
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



    postRouter.post( '/upload', [ verificaToken ], ( _req: Request, _res: Response ) => {

        if( !_req.files ){
            return _res.status(400).json({
                ok: false,
                mensaje: 'No se subio ningun Archivo'
            });
        }

        const file: FileUpload | FileUpload[] | any = _req.files.image;


        if( !_req.files ){
            return _res.status(400).json({
                ok: false,
                mensaje: 'No se subio ningun Archivo -img'
            });
        }

            _res.status(400).json({
                ok: true,
                file: file.mimetype
            });

    });

export default postRouter;