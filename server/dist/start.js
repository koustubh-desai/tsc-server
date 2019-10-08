"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opn_1 = __importDefault(require("opn"));
const app_1 = __importDefault(require("./express/app"));
const RootMiddleware_1 = __importDefault(require("./middlewares/RootMiddleware"));
// NICE REFERENCE https://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response
(() => __awaiter(this, void 0, void 0, function* () {
    const middle = yield RootMiddleware_1.default();
    const server = yield app_1.default.listen(3000);
    const browser = yield OpenBrowser();
}))();
function OpenBrowser() {
    return opn_1.default('http://localhost:3000/wiki/index.html');
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
