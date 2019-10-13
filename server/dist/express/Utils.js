"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require('url');
exports.isAsset = (url) => {
    let type = url.match(/(html|css|js|json|jpeg|jpg|png|css|ico)$/gi);
    return (type && type.length > 0) ? type[0] : false;
};
exports.functionForGetEndpoints = (req, endPoints) => {
    const Url = url.parse(req.url, true);
    let pathname = Url.pathname; //req.url.replace(/((\/\w*)*)(\?)?(((\w*=\w*)(&)?)*)/,'$1');
    let params = Url.query;
    let results = endPoints.filter(e => (typeof (e.endpoint) == 'string') ? e.endpoint == pathname : pathname.match(e.endpoint)).map(e => e.fn);
    console.log('params are ', params, pathname);
    return results;
};
