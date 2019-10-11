import app from './express/Express';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';

const init=()=>{
    return new Promise(resolve=>{
        // all middlewares here
        app.use((req,resp,next)=>{
            
            next();
        });
        app.use((req:Http2ServerRequest,resp:Http2ServerResponse,next)=>{
           
            next();
        });
        app.get('/json',(req:Http2ServerRequest,res:Http2ServerResponse)=>{});
        app.static("/stm");
        app.static("/dist");
        resolve('donesa');
    })
}
export default init;