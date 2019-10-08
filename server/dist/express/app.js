"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const AssetLoader_1 = __importDefault(require("./AssetLoader"));
class RealApp {
    constructor() {
        //this.arr=[];
        this.addMiddleware = (fn) => { RealApp.arr.push(fn); };
        this.iterateMiddlewares = (req, resp) => {
            const iter = RealApp.arr[Symbol.iterator]();
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
    addAssetPath(str) {
        if (!RealApp.pathForAssets.find((p) => p == str)) {
            RealApp.pathForAssets.push(str);
        }
    }
}
RealApp.pathForAssets = [];
RealApp.serveFileMiddleware = (req, resp, next) => {
    let assetName = req.url.match(/[A-Za-z1-9]*\.(html|css|js|json|jpeg|jpg|png|css|ico)/i);
    assetName = (assetName && assetName.length) ? assetName[0] : null;
    if (assetName) {
        let a = new AssetLoader_1.default();
        RealApp.pathForAssets.find(dir => a.load(resp, dir + '/' + assetName));
    }
    next();
};
RealApp.arr = [RealApp.serveFileMiddleware];
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
                    console.log("Wallahs req");
                    realapp.iterateMiddlewares(req, resp);
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
