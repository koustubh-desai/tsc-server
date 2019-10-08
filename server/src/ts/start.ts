import fs from 'fs';
import http from 'http';
import opn from 'opn'; 
import app from './express/app';
import middleware from './middlewares/RootMiddleware';
import sendFile from './sendfile';
// NICE REFERENCE https://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response

(async ()=>{
    const middle = await middleware();
    const server = await app.listen(3000);
    const browser = await OpenBrowser();
})();

function OpenBrowser(){
    return opn('http://localhost:3000/wiki/index.html');
}
/*http.get({
    host: 'localhost',
    port:3000,
    protocol:'http:',
    path: ''
}, (resp)=>{
    console.log('GROOT');
});
http.get({
    host: 'localhost',
    port:3000,
    protocol:'http:',
    search: 'lo'
}, (resp)=>{
    console.log('LELO');
});

http.get({
    host: 'localhost',
    port:3000,
    protocol:'http:',
    search:'email'
}, (resp)=>{
    console.log('EMAIs');
});*/
// (async ()=>{
//     const brow = await opn('');
//     console.log('heyosa',brow);
// })()


/*const server = http.createServer();
server.on('request',async (req,res)=>{
    const browser = await openBrowser();
    console.log('heyo',browser);
})

function openBrowser(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(opn.new());
        },0)
    })
}*/