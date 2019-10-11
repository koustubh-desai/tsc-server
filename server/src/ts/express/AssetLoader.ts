import { Http2ServerResponse, Http2ServerRequest } from "http2";
import { exists, existsSync, readFile, readFileSync } from "fs";
const path = require('path');

const AppFolderName =process.cwd()+'/client';

const encoding = {
    html:'utf-8',
    png:'',
    js:'utf-8'
}

/*
* take from https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
*/
const mimetype = {
    html:'text/html',
    js:'text/javascript',
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
    else resp.end();
}