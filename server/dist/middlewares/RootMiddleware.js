"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../express/app"));
const init = () => {
    return new Promise(resolve => {
        // all middlewares here
        app_1.default.use((req, resp, next) => {
            // do whatever...
            console.log("In jojo");
            next();
        });
        app_1.default.use((req, resp, next) => {
            // do whatever...
            console.log("In koko");
            next();
        });
        app_1.default.static("//path_to_html_css_js");
        resolve('donesa');
    });
};
exports.default = init;
