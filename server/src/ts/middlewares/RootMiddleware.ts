import app from '../express/app';
const init=()=>{
    return new Promise(resolve=>{
        // all middlewares here
        app.use((req,resp,next)=>{
            // do whatever...
            console.log("In jojo");
            next();
        });
        app.use((req,resp,next)=>{
            // do whatever...
            console.log("In koko");
            next();
        });
        resolve('donesa');
    })
}
export default init;