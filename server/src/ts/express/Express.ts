import http from 'http';
import { Http2ServerResponse, Http2ServerRequest } from 'http2';
import { loadAsset } from './AssetLoader';
import {GetEndPoints} from '../interfaces';
import { isAsset, endpointFunctionsArray, createRegExForUrl, functionWithNextHandler, extractParamsFromUrl } from './Utils';
import { runInNewContext } from 'vm';
import { start } from 'repl';


class RealApp{
    readonly pathForAssets:Array<String> = []; 
    readonly middlewares:Function[] = [];
    readonly getRoutes:any[] = [];
    readonly serveFileMiddleware:Function = (req:Http2ServerRequest,resp:Http2ServerResponse,next)=>{
        loadAsset(req,resp,this.pathForAssets);
        next();
    }
    
    constructor(){}
    addAssetPath(str:String){if(!this.pathForAssets.find((p)=>p==str)) this.pathForAssets.push(str);}
    addMiddleware=(fn:Function)=>{this.middlewares.push(fn);}
    addGetRoutes=(endpoint:GetEndPoints)=>this.getRoutes.push(endpoint);
    
    iterateMiddlewares=(req,resp)=>{
        const iter = ((req)=>{       
            if(isAsset(req.url)) return [...this.middlewares,this.serveFileMiddleware][Symbol.iterator]();
            else if(req.method == 'GET') return [...this.middlewares,...endpointFunctionsArray(req,this.getRoutes)][Symbol.iterator]();
            return this.middlewares[Symbol.iterator]();            
        })(req);
          const goAlong=()=>{
            let nextMiddleware = iter.next();
            if(!nextMiddleware.done){
                nextMiddleware.value(req,resp,goAlong);
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
        get:(url:String|RegExp, fn:Function)=>{
            const theCondition = (typeof(url)==='string')?url:{};
            fn = functionWithNextHandler(fn);
            if(url.toString().match(/:/)){
                url = createRegExForUrl(url.toString());
                fn = extractParamsFromUrl(fn,theCondition);
            }
            realapp.addGetRoutes(<GetEndPoints>{endpoint:url,fn})
        },
        post:()=>{},
        delete:()=>{},
        update:()=>{},
        push:()=>{},
        listen:(port:number)=>{
            return new Promise(resolve=>{
                server = http.createServer((req,resp)=>realapp.iterateMiddlewares(req,resp)).listen(port);
                resolve(server);
            })
        },
        use:(fn:Function )=>realapp.addMiddleware(functionWithNextHandler(fn)),
        static:(path:String)=>realapp.addAssetPath(path)
    }
})();

export default app;



