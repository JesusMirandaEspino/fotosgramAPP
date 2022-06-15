"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_models_1 = require("../models/user.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usarRouter = (0, express_1.Router)();
usarRouter.post('/create', (_req, _res) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(_req.body.password, salt);
    const user = {
        nombre: _req.body.nombre,
        email: _req.body.email,
        password: hash,
        avatar: _req.body.avatar
    };
    user_models_1.Usuario.create(user).then(userDb => {
        _res.json({
            ok: true,
            user: userDb
        });
    }).catch(_err => {
        _res.json({
            ok: false,
            _err
        });
    });
});
exports.default = usarRouter;
