
import opn from 'opn'; 
import app from './express/Express';
import middleware from './RootMiddleware';
//import {myconn2} from '../../../MySqlProject/src/index';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';

const port = 3030;
const OpenBrowser=()=>opn(`http://localhost:${port}/index.html`);

(async ()=>{
    //const db = await myconn2();
    console.log("JAJA");
    const middle = await middleware();
    const server = await app.listen(port);
    //const browser = await OpenBrowser();
    
})();

// NICE REFERENCE https://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response
