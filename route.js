'use strict';
var cors = require('cors');
var mongoose = require('mongoose');

var Promises = require('promise');
var ipfsAPI = require('ipfs-api');
var output;
var ipfs = ipfsAPI('localhost', 5001)

const login = require('./functions/login');
const registerUser = require('./functions/registerUser');
const register = require('./models/register');


module.exports = router => {


    routeost('/registerUser', cors(), (req, res) => { 

        const firstname = req.body.firstname;
        console.log(firstname);
        const lastname = req.body.lastname;
        console.log(lastname);
        const phonenumber = parseInt(req.body.phonenumber);
        console.log(phonenumber);
        const dateofbirth = req.body.dateofbirth;
        console.log(dateofbirth);
        const email = req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);
        const retypepassword = req.body.retypepassword;
        console.log(retypepassword);
        const usertype = req.body.usertype;
        console.log(usertype);
        var  userId = "";
        var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
        for (var i = 0; i < 3; i++)
            userId += (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
        console.log("userId" + userId)


        if (!firstname || !lastname || !phonenumber|| !dateofbirth || !email || !password || !retypepassword || !usertype || !userId) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            registerUser
                .registerUser(firstname, lastname, phonenumber,dateofbirth,email,password, retypepassword,usertype,userId)
                .then(result => {

                    res.send({
                        "message": "user has been registered successfully",
                        "status": true,


                    });


                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        }
    });

    router.post('/login', cors(), (req, res) => {
        console.log("entering login function in functions ");
        const emailid = req.body.email;
        console.log(emailid);
        const passwordid = req.body.password;
        console.log(passwordid);
       
       
        login
            .loginUser(emailid, passwordid)
            .then(result => {   
                console.log("result ===>>>",result.users.usertype)


                res.send({
                    "message": "Login Successful",
                    "status": true,
                    "usertype":result.users.usertype,
                    "userId":result.users.userId

                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });

}