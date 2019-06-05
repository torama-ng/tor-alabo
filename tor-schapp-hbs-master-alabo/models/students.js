const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defining a data representation
var studData = new Schema({
    firstname: {
        type: String,

        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    middlename: {
        type: String,

        trim: true
    },
    studentid: { type: mongoose.Schema.Types.ObjectId },
    dob: {
        type: String

    },
    gender: {
        type: String

    },
    student_class: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    lga: {
        type: String,

        trim: true
    },
    street: {
        type: String,

    },
    city: {
        type: String,

    },
    regdate: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,

    },
    surname: {
        type: String,
        trim: true
    },
    othername: {
        type: String,
        reqiured: true,
        trim: true
    },
    phone1: {
        type: String,
        required: true,
        trim: true
    },
    phone2: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },

    student_interests: {
        int1: String,
        int2: String,
        int3: String,
        int4: String,



    },
    student_dp: {
        type: String,
        trim: true,
        default: ''
    },


});

// Creating a collection
var studentData = mongoose.model("student", studData);
//console.log(userData);
module.exports = studentData;