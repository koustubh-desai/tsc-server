import { Http2ServerResponse } from "http2";

export default class AssetLoader{
    constructor(){
        
    }
    load(resp:Http2ServerResponse,url:String):boolean{
        console.log('checking for',url);
        return false;
    }
}