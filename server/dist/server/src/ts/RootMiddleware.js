"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./express/Express"));
const AssetLoader_1 = require("./express/AssetLoader");
const url = require('url');
const init = () => {
    return new Promise(resolve => {
        // all middlewares here
        Express_1.default.use((req, resp, next) => {
            console.log("Middle ware KOO");
            next();
        });
        Express_1.default.use((req, resp) => {
            console.log("Middle ware JOO");
        });
        Express_1.default.get('/json', (req, res, next) => {
            console.log("GET FOR /json");
            let obj = { wal: 'kal', fal: 'sal' };
            res.setHeader("Content-Type", AssetLoader_1.mimetype['json']); //res.write(JSON.stringify(obj),err=>{console.log("Effor ",err)});
            res.write(JSON.stringify(obj));
            res.end();
        });
        Express_1.default.get('/json/:id/nana/:name', (req, res, next, extractedObj) => {
            const Url = url.parse(req.url, true);
            let pathname = Url.pathname; //req.url.replace(/((\/\w*)*)(\?)?(((\w*=\w*)(&)?)*)/,'$1');
            let params = Url.query;
            console.log("GET For /json/:id/nana/:name", params, extractedObj);
            res.end();
        });
        Express_1.default.static("/stm");
        Express_1.default.static("/dist");
        resolve('donesa');
    });
};
exports.default = init;
