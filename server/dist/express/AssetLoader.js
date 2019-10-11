"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require('path');
const AppFolderName = process.cwd() + '/client';
const encoding = {
    html: 'utf-8',
    png: '',
    js: 'utf-8'
};
/*
* take from https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
*/
const mimetype = {
    html: 'text/html',
    js: 'text/javascript',
    png: 'image/png'
};
exports.loadAsset = (req, resp, folders) => {
    console.log(" Req= ", req.url, "  and folderes are ", folders);
    let type = req.url.match(/(html|css|js|json|jpeg|jpg|png|css|ico)$/gi);
    let foundAt = type ? folders.find(dir => {
        console.log("JAJA", dir, fs_1.existsSync(path.resolve(path.join(AppFolderName, dir, req.url))));
        return fs_1.existsSync(path.resolve(path.join(AppFolderName, dir, req.url)));
    }) : '';
    let filepath = foundAt ? path.resolve(path.join(AppFolderName, foundAt, req.url)) : null;
    console.log(" calculated path is ", foundAt, filepath, type);
    if (filepath && type) {
        console.log("loading.... ", req.url);
        resp.setHeader("Content-Type", mimetype[type[0]]);
        fs_1.readFile(filepath, encoding[type[0]], (err, data) => {
            if (!err)
                resp.write(data, writeErr => writeErr ? console.log("From AssetLoader.ts:" + writeErr) : '');
            resp.end();
        });
    }
    else {
        resp.end();
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
};
