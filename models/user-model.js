const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
    ,
    todo:{
        type:Array
    }
});

const User = mongoose.model('todouser',UserSchema);
module.exports = User;