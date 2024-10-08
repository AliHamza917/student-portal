const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username:{
        type: String,

    },

    email :{
        type: String,

    },
    password:{
        type: String,

    },

    isAdmin:{
        type: Boolean,
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