import { FileUpload } from "../interfaces/file-upload";
import path  from 'path';
import fs from 'fs';
import uniqid  from 'uniqid';

export default class FileSystem {

    constructor(){
        //code
    }

    guardarImagenTemporal( file: FileUpload, userId: string ){

        return new Promise<void>( ( resolve, reject ): void => {
        const _path = this.crearCarpetaUsuario( userId );
        const nombreArchivo = this.generarNombreUnico( file.name );

        file.mv( `${ _path }/${ nombreArchivo }`, (err: any): void => {
            if( err ){
                reject(err);
            }else{
                resolve();
            }
        });
        });

    }


    private crearCarpetaUsuario(  userId: string ){

        const pathUser = path.resolve( __dirname, '../uploads/', userId  );
        const pathUserTemp = pathUser + '/temp';

        const existe = fs.existsSync( pathUser );

        if( !existe ){
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;
    }

    private generarNombreUnico( nombreOriginal: string ){
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length -1 ];
        const idUnico = uniqid();

        return `${ idUnico }.${ extension }`;

    }


    public imganesDeTempHaciaPost( userId: string ){
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp'  );
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'post'  );

        if( !fs.existsSync( pathTemp ) ){
            return [];
        }

        if( !fs.existsSync( pathPost ) ){
            fs.mkdirSync( pathPost )
        }

        const imagenesTemp = this.obtenerImagenesTemp( userId );

        imagenesTemp.forEach( (img:any) => {
            fs.renameSync( `${pathTemp}/${img}`, `${pathPost}/${img}` );
        });

        return imagenesTemp;

    }

    private obtenerImagenesTemp(userId: string){
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp'  );
        return fs.readdirSync( pathTemp ) || [];
    }


}