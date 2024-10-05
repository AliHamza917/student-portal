const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username:{
        type: String,

    },

    email :{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

    isAdmin:{
        type: String,
        default: false
    }

})

userSchema.methods.generateAuthToken = function (){
    try{
        return jwt.sign({
                userid : this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },'Ali Hamza',
            {
                expiresIn: "1d"
            }
        )
    }catch (error){
        console.log(error)
    }
}

module.exports = mongoose.model('User' ,userSchema)