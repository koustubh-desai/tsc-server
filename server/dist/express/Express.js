"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const AssetLoader_1 = require("./AssetLoader");
class RealApp {
    constructor() {
        this.pathForAssets = [];
        this.middlewares = [];
        this.getRoutes = [];
        this.serveFileMiddleware = (req, resp, next) => {
            AssetLoader_1.loadAsset(req, resp, this.pathForAssets);
            next();
        };
        this.addMiddleware = (fn) => { this.middlewares.push(fn); };
        this.addGetRoutes = (endpoint) => this.getRoutes.push(endpoint);
        this.iterateMiddlewares = (req, resp) => {
            const iter = [...this.middlewares, this.serveFileMiddleware][Symbol.iterator]();
            const goAlong = () => {
                let nextMiddleware = iter.next();
                if (!nextMiddleware.done) {
                    nextMiddleware.value(req, resp, goAlong);
                }
            };
            goAlong();
        };
    }
    addAssetPath(str) { if (!this.pathForAssets.find((p) => p == str))
        this.pathForAssets.push(str); }
}
const app = (() => {
    const funcs = [];
    const realapp = new RealApp();
    let server;
    return {
        get: (url, fn) => realapp.addGetRoutes({ endpoint: url, fn }),
        post: () => { },
        delete: () => { },
        update: () => { },
        push: () => { },
        listen: (port) => {
            return new Promise(resolve => {
                server = http_1.default.createServer((req, resp) => realapp.iterateMiddlewares(req, resp)).listen(port);
                resolve(server);
            });
        },
        use: (fn) => realapp.addMiddleware(fn),
        static: (path) => realapp.addAssetPath(path)
    };
})();
exports.default = app;
