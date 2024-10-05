const mongoose = require("mongoose")
const URL = process.env.MONGO_URL || "mongodb+srv://AliHamza:Abb5785@apiexpress.zmmdfkh.mongodb.net/student-portal?retryWrites=true&w=majority&appName=ApiExpress"

const conDb = async ()=>{
    try {
        await mongoose.connect(URL)
        console.log("DB Connection Successfully")
    }catch (error){
        console.log("DB Error is : " + error.message)

    }
}

module.exports = conDb;