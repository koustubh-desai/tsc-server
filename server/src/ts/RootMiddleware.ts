import app from './express/Express';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { mimetype } from './express/AssetLoader';
import { todo } from './db/jsons';
const url = require('url');

const init=()=>{
    return new Promise(resolve=>{
        // all middlewares here
        app.use((req,resp,next)=>{
            console.log("Defininng CORS");
            resp.setHeader('Access-Control-Allow-Origin', '*');
            resp.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            resp.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
        app.get('/todo',(req:Http2ServerRequest,res:Http2ServerResponse,next)=>{
            console.log(" fetch todo list");
            res.setHeader("Content-Type", mimetype['json']);//res.write(JSON.stringify(obj),err=>{console.log("Effor ",err)});
            res.write(JSON.stringify(todo));
            res.end();
        });
        app.static("/stm");
        app.static("/dist");
        resolve('donesa');
    })
}
export default init;