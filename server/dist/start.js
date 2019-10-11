"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opn_1 = __importDefault(require("opn"));
const Express_1 = __importDefault(require("./express/Express"));
const RootMiddleware_1 = __importDefault(require("./RootMiddleware"));
const OpenBrowser = () => opn_1.default('http://localhost:3000/index.html');
(async () => {
    const middle = await RootMiddleware_1.default();
    const server = await Express_1.default.listen(3000);
    const browser = await OpenBrowser();
})();
// NICE REFERENCE https://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response
