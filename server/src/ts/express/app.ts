import http from 'http';
import { Http2ServerResponse, Http2ServerRequest } from 'http2';
import AssetLoader from './AssetLoader';

class RealApp{
    private static readonly pathForAssets:Array<String> = []; 
    private static readonly serveFileMiddleware:Function = (req:Http2ServerRequest,resp:Http2ServerResponse,next)=>{
        let assetName:any = req.url.match(/[A-Za-z1-9]*\.(html|css|js|json|jpeg|jpg|png|css|ico)/i);
        assetName = (assetName && assetName.length)?assetName[0]:null;
        if(assetName){
            let a = new AssetLoader();
            RealApp.pathForAssets.find(dir=>a.load(resp,dir+'/'+assetName));
        }
        next();
    }
    private static readonly arr:Function[] = [RealApp.serveFileMiddleware];
    constructor(){
        //this.arr=[];
        
    }
    addAssetPath(str:String){
        if(!RealApp.pathForAssets.find((p)=>p==str)){
            RealApp.pathForAssets.push(str);
        }
    }
    addMiddleware=(fn:Function)=>{RealApp.arr.push(fn);}
    iterateMiddlewares=(req,resp)=>{
        const iter = RealApp.arr[Symbol.iterator]();
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
                    console.log("Wallahs req");
                    realapp.iterateMiddlewares(req,resp);
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