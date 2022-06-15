"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_models_1 = require("../models/user.models");
const usarRouter = (0, express_1.Router)();
usarRouter.post('/create', (_req, _res) => {
    const user = {
        nombre: _req.body.nombre,
        email: _req.body.email,
        password: _req.body.password,
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
