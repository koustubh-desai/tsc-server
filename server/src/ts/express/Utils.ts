import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { GetEndPoints } from "../interfaces";
const url = require('url');

 export const isAsset=(url:String)=>{
    let type = url.match(/(html|css|js|json|jpeg|jpg|png|css|ico)$/gi);
    return (type && type.length>0)?type[0]:false;
 }

 export const endpointFunctionsArray=(req:Http2ServerRequest,endPoints:Array<GetEndPoints>):Array<Function>=>{
     
    let pathname = url.parse(req.url,true).pathname;
    return endPoints.filter(e=>(typeof(e.endpoint)=='string')?
                  e.endpoint==pathname
                  :pathname
                  .match(e.endpoint)).map(e=>e.fn);
        
 }

 export const functionWithNextHandler = (someFunc:Function) => someFunc.length>2?someFunc:
                                                               (req:Http2ServerRequest,resp:Http2ServerResponse,next:Function)=>{                                                                  
                                                                  someFunc(req,resp);
                                                                  next();
                                                               };

export const extractParamsFromUrl:Function = (fn:Function,fromCondition:String) => (req:Http2ServerRequest, resp:Http2ServerResponse, next?:Function)=>{
   
   let mykeys = fromCondition.toString().match(/:\w+/g);//[":id", ":name"]
   let myregex = fromCondition.toString().replace(/(:\w+)/g,"(\\w+)").replace(/\//g,'\\/');
   let myvalues = req.url.toString().match(myregex)||[]; //["/json/id1/some/name3ks","id1", "name3ks"]
   let myparams = {};
   mykeys = (mykeys && mykeys.length)?mykeys.map(v=>v.replace(/:/,'')):mykeys||[];//["id", "name"]
   myvalues = (myvalues && myvalues.length)?myvalues.splice(1):myvalues;//["id1", "name3ks"]
   
   mykeys.map((key,index)=>myparams[key]=myvalues[index]);
   fn(req,resp,next,myparams);
}

 export const createRegExForUrl = (url:String):RegExp=>{
   let mykeys = url.toString().match(/:\w+/g);//[":id", ":name"]
   mykeys = (mykeys && mykeys.length)?mykeys.map(v=>v.replace(/:/,'')):mykeys||[];//["id", "name"]
   let myregex = url.toString().replace(/(:\w+)/g,":(\\w+)").replace(/\//g,'\\/');
   let myregex2 = url.toString().replace(/(:\w+)/g,"(\\w+)").replace(/\//g,'\\/');
   let myvalues = url.toString().match(myregex)||[]; //["/json/id1/some/name3ks","id1", "name3ks"]
   myvalues = (myvalues && myvalues.length)?myvalues.splice(1):myvalues;//["id1", "name3ks"]
   let myparams = {};
   mykeys.map((val,index)=>myparams[val]=myvalues[index]);
                
   return new RegExp(myregex2);
                
                
 }