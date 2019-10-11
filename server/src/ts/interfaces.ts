import { Http2ServerRequest, Http2ServerResponse } from "http2";

export interface MiddlewareStruct{
    req:Http2ServerRequest,
    res:Http2ServerResponse,
    next:Function
}

export interface GetEndPoints {
    endpoint:String|RegExp,
    fn:Function
}