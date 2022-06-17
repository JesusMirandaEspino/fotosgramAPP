import jwt from 'jsonwebtoken'

export default class Token {
    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';
    private static caducidad: string = '30d';

    constructor(){
        // code
    }

    static getJWToken( payload: any ): string{
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad })
    }

   

}