import app from './express/Express';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { mimetype } from './express/AssetLoader';

const init=()=>{
    return new Promise(resolve=>{
        // all middlewares here
        app.use((req,resp,next)=>{
            
            next();
        });
        app.use((req:Http2ServerRequest,resp:Http2ServerResponse,next)=>{
           
            next();
        });
        app.get('/json',(req:Http2ServerRequest,res:Http2ServerResponse,next)=>{
            console.log("CARNI");
            let obj = {wal:'kal',fal:'sal'};
            res.setHeader("Content-Type", mimetype['json']);//res.write(JSON.stringify(obj),err=>{console.log("Effor ",err)});
            res.write(JSON.stringify(obj));
            res.end();
        });
        app.static("/stm");
        app.static("/dist");
        resolve('donesa');
    })
}
export default init;