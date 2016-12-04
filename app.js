/**
 * Created by Mauro-pc on 26/11/2016.
 */
var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");

/**
 * iniciando los servicios de mongo db
 * C:\mongodb\bin\mongod.exe --dbpath D:\data_mongo\mongodb\data
 */

var app = express();

app.use("/statics",express.static("public"));//Archivos estaticos
app.use(bodyParser.json()); // para peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "jade");

app.get("/", function (req, res) {
    console.log(req.session.user_id);
    res.render("index");
    //res.send("hola Mundo");
});

app.get("/singup", function (req, res) {
    User.find(function (error, doc) {
        console.log(doc);

    });
    res.render("singup");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/users", function (req, res) {
    var user = new User({   email:req.body.email,
                            password: req.body.password,
                            password_confirmation: req.body.password_confirmation,
                            username: req.body.user_name
                    });

    user.save().then(function (us) {
        res.send("Datos Guardados");
    }, function (err) {
        if(err)
        {
            console.log(String(err));
            res.send("No se pudo guardar la información");
        }
    });

});

app.post("/sessions", function (req, res) {
    var datos = {
        email: req.body.email,
        password: req.body.password
    };
    User.findOne(datos, function (err, user) {
        req.session.user_id = user._id;
        res.redirect("/app")
    });
});

app.use(session_middleware);
app.use("/app", router_app);

app.listen(8080);