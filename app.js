/**
 * Created by Mauro-pc on 26/11/2016.
 */
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var userSchemaJson = {
    email:String,
    password:String
};

var user_schema = new Schema(userSchemaJson);

var User = mongoose.model("User", user_schema);

/**
 * iniciando los servicios de mongo db
 * C:\mongodb\bin\mongod.exe --dbpath D:\data_mongo\mongodb\data
 */

var app = express();

app.use("/statics",express.static("public"));//Archivos estaticos
app.use(bodyParser.json()); // para peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "jade");

app.get("/", function (req, res) {
    res.render("index");
    //res.send("hola Mundo");
});

app.get("/login", function (req, res) {
    User.find(function (error, doc) {
        console.log(doc);

    });
    res.render("login");
});

app.post("/users", function (req, res) {
    var user = new User({email:req.body.email, password: req.body.password});
    user.save(function () {
        res.send("Datos Guardados");
    });
})

app.listen(8080);