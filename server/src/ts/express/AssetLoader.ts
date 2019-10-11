import { Http2ServerResponse, Http2ServerRequest } from "http2";
import { exists, existsSync, readFile, readFileSync } from "fs";
const path = require('path');

const AppFolderName =process.cwd()+"/client";

const encoding = {
    html:'utf-8',
    png:''
}

/*
* take from https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
*/
const mimetype = {
    html:'text/html',
    js:'application/javascript',
    png:'image/png'
}

export const loadAsset = (req:Http2ServerRequest,resp:Http2ServerResponse,folders:String[]) =>{
    
    let type = req.url.match(/(html|css|js|json|jpeg|jpg|png|css|ico)$/gi);
    let foundAt = type?folders.find(dir=>existsSync(path.resolve(path.join(AppFolderName,dir,req.url)))):'';
    let filepath = foundAt?path.resolve(path.join(AppFolderName,foundAt,req.url)):null;
    if(filepath && type){
        resp.setHeader("Content-Type", mimetype[type[0]]);
        readFile(filepath,encoding[type[0]],(err,data)=>{
            if(!err)resp.write(data,writeErr=>writeErr?console.log("From AssetLoader.ts:"+writeErr):'');
            resp.end();
        })
        
    }
    // Check if req is for asset
    //let asset = req.url.match(/[A-Za-z1-9_-]*\.(html|css|js|json|jpeg|jpg|png|css|ico)$/i)?
    /*const foundAt = folders.find((dir)=>existsSync(path.resolve(path.join(AppFolderName,dir,resource)))?true:false);
    // Sync write
    //if(foundAt) resp.write(readFileSync(path.resolve(path.join(AppFolderName,foundAt,resource))));
    // Async write
    if(foundAt) readFile(path.resolve(path.join(AppFolderName,foundAt,req.url)),'utf-8',(err,data)=>{
        if(!err) resp.write(data,(respErr=>{
            console.log("Response error is ",respErr);
        }));
        resp.end();
    })//resp.write(readFileSync());*/
}