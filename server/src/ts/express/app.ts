import http from 'http';
class RealApp{
    private arr:Function[] = [];
    private dropper:Function;
    constructor(){
        //this.arr=[];
        
    }
    addMiddleware=(fn:Function)=>{this.arr.push(fn);}
    iterateMiddlewares=(req,resp)=>{
        const iter = this.arr[Symbol.iterator]();
        const goAlong=()=>{
            let c = iter.next();
            if(!c.done){
                c.value(req,resp,goAlong);
            }
        }
        goAlong();
    }

}
const app = (()=>{
    const funcs = [];
    const realapp = new RealApp();
    let server;
    return {
        get:()=>{},
        post:()=>{},
        delete:()=>{},
        update:()=>{},
        push:()=>{},
        listen:(port:number)=>{
            return new Promise(resolve=>{
                server = http.createServer((req,resp)=>{
                    console.log("Wallah req");
                    realapp.iterateMiddlewares(req,resp);
                }).listen(port);
                resolve(server);
            })
        },
        use:(fn:Function )=>{
            realapp.addMiddleware(fn)
        }
    }
})();

export default app;

/*class App{
    private server;
    constructor(){
        console.log("i app construct",Math.random()*100)
    };
    listen(port:number){
        return new Promise(resolve=>{
            this.server = http.createServer(async (req,resp)=>{

            }).listen(port);
            resolve(this.server);
        })
    }
}

const app = new App();
export default app;*/