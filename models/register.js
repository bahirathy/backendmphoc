'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerpageSchema = mongoose.Schema({

    firstname: String,
    lastname: String, 
    phonenumber : Number,
    dateofbirth : String,
    email : {
        type: String,
        unique: true
    },
    password: String,
    retypepassword: String,
    usertype:  String,
    userId: String
     
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://bahirathy:Rbahirathy12@ds113826.mlab.com:13826/documentmanagement',{
    useMongoClient: true
});



module.exports = mongoose.model('register', registerpageSchema);