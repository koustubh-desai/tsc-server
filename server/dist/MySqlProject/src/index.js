"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
/*createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));*/
/*createConnection().then(async connection => {
    let todo = new Todo();
    todo.description = "Wash Clothes";
    todo.status = "pending";

    await connection.manager.save(todo);
    console.log(" A todo has been saved");
}).catch(err=>console.log("Error in db connection ...",err));*/
/*let myconn = new Promise(res=>{
    createConnection().then(async connection => {
        let todo = new Todo();
        todo.description = "Wash Clothes";
        todo.status = "pending";
        
        await connection.manager.save(todo);
        
        console.log(" A todo has been saved");
        res(connection);
    }).catch(err=>console.log("Error in db connection ...",err));
})*/
async function myconn() {
    let k = new Promise((res, rej) => {
        typeorm_1.createConnection().then(async (connection) => {
            res(connection);
        });
    });
    let result = await k;
}
exports.myconn2 = () => new Promise((res, rej) => {
    typeorm_1.createConnection().then(async (connection) => {
        console.log("HEYA connection done");
        res(connection);
    }).catch(err => { console.log("JHAT ", err); });
});
/*export const init = async ()=>{
    await myconn2();
}*/ 
