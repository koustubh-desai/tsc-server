import app from '../express/app';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
interface MiddlewareStruct{
    req:Http2ServerRequest,
    res:Http2ServerResponse,
    next:Function
}
const init=()=>{
    return new Promise(resolve=>{
        // all middlewares here
        app.use((req,resp,next)=>{
            // do whatever...
            console.log("In jojo");
            next();
        });
        app.use((req:Http2ServerRequest,resp,next)=>{
            // do whatever...
            console.log("In koko");
            next();
        });
        app.static("//path_to_html_css_js");
        resolve('donesa');
    })
}
export default init;