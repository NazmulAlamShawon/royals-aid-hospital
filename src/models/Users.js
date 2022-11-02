const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,    
        unique:true     
    },
    companyid: {
        type:Number,
        require: true,    
        unique:true    
    },
    phone: {
        type:Number,
        require: true,    
        unique:true    
    },
    email: {
        type:String,
        require: true,    
        unique:true   
    },
    password: {
        type:String,
        require: true,    
        unique:true   
    },
})

const UserReg = mongoose.model('User', UserSchema);
module.exports = UserReg;