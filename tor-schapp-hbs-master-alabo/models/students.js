const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defining a data representation
var studData = new Schema({
    surname: { type: String, required: true },
    othername: { type: String, required: true },
    studentid: { type: mongoose.Schema.Types.ObjectId },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    class: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    address: { type: String, required: true },
    profilepic: { type: String, required: false },
    regdate: { type: Date, default: Date.now }


});

// Creating a collection
var studentData = mongoose.model("student", studData);
//console.log(userData);
module.exports = studentData;