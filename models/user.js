/**
 * Created by Mauro-pc on 27/11/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var user_schema = new Schema({
    name: String,
    username: String,
    password: String,
    age: Number,
    date_of_birth: Date
});


var User = mongoose.model("User", user_schema);


module.exports.User = User;