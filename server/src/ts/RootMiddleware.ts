import app from './express/Express';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { mimetype } from './express/AssetLoader';
const url = require('url');

const init=()=>{
    return new Promise(resolve=>{
        // all middlewares here
        app.use((req,resp,next)=>{
            console.log("Middle ware KOO");
            next();
        });
        app.use((req:Http2ServerRequest,resp:Http2ServerResponse)=>{
           console.log("Middle ware JOO");
            
        });
        app.get('/json',(req:Http2ServerRequest,res:Http2ServerResponse,next)=>{
            console.log("GET FOR /json");
            let obj = {wal:'kal',fal:'sal'};
            res.setHeader("Content-Type", mimetype['json']);//res.write(JSON.stringify(obj),err=>{console.log("Effor ",err)});
            res.write(JSON.stringify(obj));
            res.end();
        });
        app.get('/json/:id/nana/:name',(req:Http2ServerRequest,res:Http2ServerResponse,next,extractedObj?:Object)=>{
            
            const Url = url.parse(req.url,true);
            let pathname = Url.pathname;//req.url.replace(/((\/\w*)*)(\?)?(((\w*=\w*)(&)?)*)/,'$1');
            let params = Url.query; 
            console.log("GET For /json/:id/nana/:name",params,extractedObj);
            res.end();
        });
        app.static("/stm");
        app.static("/dist");
        resolve('donesa');
    })
}
export default init;