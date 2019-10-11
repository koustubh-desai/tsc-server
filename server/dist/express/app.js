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
        this.arr = [];
        this.serveFileMiddleware = (req, resp, next) => {
            AssetLoader_1.loadAsset(req, resp, this.pathForAssets);
            next();
        };
        this.addMiddleware = (fn) => { this.arr.push(fn); };
        this.iterateMiddlewares = (req, resp) => {
            const iter = [...this.arr, this.serveFileMiddleware][Symbol.iterator]();
            //dropper(iter)(req,resp,dropper(iter));
            const goAlong = () => {
                let c = iter.next();
                if (!c.done) {
                    c.value(req, resp, goAlong);
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
        get: () => { },
        post: () => { },
        delete: () => { },
        update: () => { },
        push: () => { },
        listen: (port) => {
            return new Promise(resolve => {
                server = http_1.default.createServer((req, resp) => {
                    console.log('BEGIN');
                    realapp.iterateMiddlewares(req, resp);
                    console.log("END");
                }).listen(port);
                resolve(server);
            });
        },
        use: (fn) => {
            realapp.addMiddleware(fn);
        },
        static: (path) => {
            realapp.addAssetPath(path);
        }
    };
})();
exports.default = app;
/*class App{
    private server;
    constructor(){
        console.log("i app construct",Math.random()*100)
    };
    listen(port:number){
        return new Promise(resolve=>{
            this.server = http.createServer(async (req,resp)=>{

            }).listen(port);
            resolve(this.server);
        })
    }
}

const app = new App();
export default app;*/ 
