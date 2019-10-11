"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = __importDefault(require("./express/Express"));
const init = () => {
    return new Promise(resolve => {
        // all middlewares here
        Express_1.default.use((req, resp, next) => {
            next();
        });
        Express_1.default.use((req, resp, next) => {
            next();
        });
        Express_1.default.get('/json', (req, res) => { });
        Express_1.default.static("/stm");
        Express_1.default.static("/dist");
        resolve('donesa');
    });
};
exports.default = init;
