const mongoose = require("mongoose")

const attendenceSchema = mongoose.Schema({
    u_id:{
        type : String
    },
    date : {
        type: String
    },
    status : {
        type: String,
        default: 'absent'
    }
})

module.exports = mongoose.model('Attendence' ,attendenceSchema)