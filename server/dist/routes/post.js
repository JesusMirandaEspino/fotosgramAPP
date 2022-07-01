"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystem_1 = __importDefault(require("../classes/fileSystem"));
const authentication_1 = require("../middlewares/authentication");
const post_model_1 = require("../models/post.model");
const postRouter = (0, express_1.Router)();
const fileSystem = new fileSystem_1.default();
postRouter.get('/', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(_req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    _res.json({
        ok: true,
        posts
    });
}));
postRouter.post('/', [authentication_1.verificaToken], (_req, _res) => {
    const body = _req.body;
    body.usuario = _req.body._id;
    const image = fileSystem.imganesDeTempHaciaPost(_req.body._id);
    body.img = image;
    post_model_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password');
        _res.json({
            ok: true,
            postDB
        });
    }));
});
postRouter.post('/upload', [authentication_1.verificaToken], (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_req.files) {
        return _res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun Archivo'
        });
    }
    const file = _req.files.image;
    if (!file) {
        return _res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun Archivo -img'
        });
    }
    if (!file.mimetype.includes('image')) {
        return _res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun Archivo -img'
        });
    }
    yield fileSystem.guardarImagenTemporal(file, _req.body.usuario._id);
    _res.status(400).json({
        ok: true,
        file: file.mimetype
    });
}));
postRouter.get('/imagen/:userId/:img', (_req, _res) => {
    const userId = _req.params.userId;
    const img = _req.params.img;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    _res.json({
        userId,
        img
    });
});
exports.default = postRouter;
