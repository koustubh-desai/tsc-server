import { Http2ServerRequest } from "http2";
import { GetEndPoints } from "../interfaces";
const url = require('url');

 export const isAsset=(url:String)=>{
    let type = url.match(/(html|css|js|json|jpeg|jpg|png|css|ico)$/gi);
    return (type && type.length>0)?type[0]:false;
 }

 export const functionForGetEndpoints=(req:Http2ServerRequest,endPoints:Array<GetEndPoints>):Array<Function>=>{
    const Url = url.parse(req.url,true);
    let pathname = Url.pathname;//req.url.replace(/((\/\w*)*)(\?)?(((\w*=\w*)(&)?)*)/,'$1');
    let params = Url.query; 
    let results = endPoints.filter(e=>(typeof(e.endpoint)=='string')?e.endpoint==pathname:pathname.match(e.endpoint)).map(e=>e.fn);
    console.log('params are ',params,pathname);
    return results;
 }