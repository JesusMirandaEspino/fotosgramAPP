import { Request, Response, Router } from 'express';
import FileSystem from '../classes/fileSystem';
import { FileUpload } from '../interfaces/file-upload';
import { verificaToken } from '../middlewares/authentication';
import { Post } from '../models/post.model';

const postRouter = Router();
const fileSystem = new FileSystem();

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

        const image =  fileSystem.imganesDeTempHaciaPost( _req.body._id );

        body.img = image;

        Post.create( body ).then( async (postDB: any) => {

            await postDB.populate('usuario', '-password');

                _res.json({
                ok: true,
                postDB
                })
        });

    });



    postRouter.post( '/upload', [ verificaToken ], async ( _req: Request, _res: Response ) => {

        if( !_req.files ){
            return _res.status(400).json({
                ok: false,
                mensaje: 'No se subio ningun Archivo'
            });
        }

        const file: FileUpload | FileUpload[] | any = _req.files.image;


        if( !file ){
            return _res.status(400).json({
                ok: false,
                mensaje: 'No se subio ningun Archivo -img'
            });
        }

        if( !file.mimetype.includes( 'image' ) ){
            return _res.status(400).json({
                ok: false,
                mensaje: 'No se subio ningun Archivo -img'
            });
        }

        await fileSystem.guardarImagenTemporal( file,  _req.body.usuario._id );

            _res.status(400).json({
                ok: true,
                file: file.mimetype
            });

    });


    postRouter.get( '/imagen/:userId/:img',  ( _req: any, _res: Response ) => {

        const userId = _req.params.userId;
        const img = _req.params.img;

        const pathFoto = fileSystem.getFotoUrl( userId,  img  );

        _res.json({
            userId,
            img
        })

    });

export default postRouter;