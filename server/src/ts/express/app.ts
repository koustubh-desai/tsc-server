import http from 'http';
import { Http2ServerResponse, Http2ServerRequest } from 'http2';
import { loadAsset } from './AssetLoader';

class RealApp{
    readonly pathForAssets:Array<String> = []; 
    readonly arr:Function[] = [];
    readonly serveFileMiddleware:Function = (req:Http2ServerRequest,resp:Http2ServerResponse,next)=>{
        loadAsset(req,resp,this.pathForAssets);
        next();
    }
    
    constructor(){}
    addAssetPath(str:String){if(!this.pathForAssets.find((p)=>p==str)) this.pathForAssets.push(str);}
    addMiddleware=(fn:Function)=>{this.arr.push(fn);}
    iterateMiddlewares=(req,resp)=>{
        const iter = [...this.arr,this.serveFileMiddleware][Symbol.iterator]();
        //dropper(iter)(req,resp,dropper(iter));
        const goAlong=()=>{
            let c = iter.next();
            if(!c.done){
                c.value(req,resp,goAlong);
            }
        }
        goAlong();
    }

}
const app = (()=>{
    const funcs = [];
    const realapp = new RealApp();
    let server;
    return {
        get:()=>{},
        post:()=>{},
        delete:()=>{},
        update:()=>{},
        push:()=>{},
        listen:(port:number)=>{
            return new Promise(resolve=>{
                server = http.createServer((req,resp)=>{
                    console.log('BEGIN')
                    realapp.iterateMiddlewares(req,resp);
                    console.log("END");
                    
                    
                }).listen(port);
                resolve(server);
            })
        },
        use:(fn:Function )=>{
            realapp.addMiddleware(fn)
        },
        static:(path:String)=>{
            realapp.addAssetPath(path);
        }
    }
})();

export default app;

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