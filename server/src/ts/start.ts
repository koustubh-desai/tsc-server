import fs from 'fs';
import http from 'http';
import opn from 'opn'; 
import app from './express/Express';
import middleware from './RootMiddleware';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';


const OpenBrowser=()=>opn('http://localhost:3000/index.html');

(async ()=>{
    const middle = await middleware();
    const server = await app.listen(3000);
    const browser = await OpenBrowser();
})();

// NICE REFERENCE https://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response
