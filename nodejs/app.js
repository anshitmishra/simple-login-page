var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// const ProfileData = require('./controller/profile')  
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deepanshi"
});



app.get('/',(req,res) => {
    res.send("hello")
})
app.post('/', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var date = new Date();
    if (email && name && password) {
        con.connect(function (err) {
            //Insert a record in the "customers" table:
            var sql = "INSERT INTO user (name, email,password,time) VALUES ('" + name + "', '" + email + "','" + password + "','" + date + "')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.status(200).json({msg:"1 record inserted"})
            });
        });
    } else {
        res.json({msg:"data not found"});
    }
})

app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        con.connect(function (err) {
            //Insert a record in the "customers" table:
            var sql = "SELECT * FROM user WHERE email = '"+email+"'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                if(result[0].password === password){

                    res.status(200).json(result)
                }else{
                    let data = Array({email:"password not match"})
                    res.status(200).json(data)
                }
            });
        });
    } else {
        res.json({msg:"data not found"});
    }
})


app.listen(5000, function () {
    console.log('Server is running..');
});  