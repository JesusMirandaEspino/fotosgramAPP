"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usarRouter = (0, express_1.Router)();
usarRouter.get('/prueba', (_req, _res) => {
    _res.json({
        ok: true,
        mensaje: 'Todo Funciona Bien'
    });
});
exports.default = usarRouter;
