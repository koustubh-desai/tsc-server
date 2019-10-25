var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "Koustubh",
    password: ""
});
con.connect(function (err) {
    if (err)
        throw err;
    else
        console.log("Connected!");
});
