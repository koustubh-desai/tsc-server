import http from 'http';
export default (options,resp)=>http.get(options,(res)=>{
    console.log('options are ...',options);
})