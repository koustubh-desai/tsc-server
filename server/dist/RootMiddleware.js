"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./express/Express"));
const AssetLoader_1 = require("./express/AssetLoader");
const init = () => {
    return new Promise(resolve => {
        // all middlewares here
        Express_1.default.use((req, resp, next) => {
            next();
        });
        Express_1.default.use((req, resp, next) => {
            next();
        });
        Express_1.default.get('/json', (req, res, next) => {
            console.log("CARNI");
            let obj = { wal: 'kal', fal: 'sal' };
            res.setHeader("Content-Type", AssetLoader_1.mimetype['json']); //res.write(JSON.stringify(obj),err=>{console.log("Effor ",err)});
            res.write(JSON.stringify(obj));
            res.end();
        });
        Express_1.default.static("/stm");
        Express_1.default.static("/dist");
        resolve('donesa');
    });
};
exports.default = init;
