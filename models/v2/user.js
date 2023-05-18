'use strict';

const mongoose = require('mongoose');

 const Scheme = mongoose.Schema;


 const UserScheme = new Scheme({
    user_id: Number,
    username: String,
    password: String
 })

 const user = mongoose.model('users',UserScheme);

 module.exports = user;