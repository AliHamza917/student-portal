const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/user-model")


const loginController = expressAsyncHandler (async (req ,res) =>{
    const {email, password} = req.body;
    await UserModel.findOne({email: email})
    const user = await UserModel.findOne({ email: email });
    if (user) {
        if (user.password === password) {
            const token = user.generateAuthToken();
            res.cookie('Token', token , {httpOnly: true})


            return res.status(200).json({message : "Login Successful", token} );
        } else {
            res.status(401);
            throw new Error("Wrong Password");
        }
    } else {
        return res.status(400).json("No records found!");
    }

});

const registerController = expressAsyncHandler ( async (req , res)=>{
    const {username , email , password , confirm_password} = req.body

    if (!username || !email || !password || !confirm_password){
        res.status(400);
        throw new Error("All Fileds Are Required")

    }else {
        const userExist = await UserModel.findOne({ email });
        if(userExist){
            return  res.status(401).json({message : 'User Already Exist '})

        }else{
            if (password === confirm_password){
                const CreateUser = await UserModel.create({
                    username , email , password
                })
                return  res.status(201).json({message : 'User Register : '+email + 'and password is ' +password})

            }else{
                res.status(400);
                throw new Error("Password And Confirm Password Does Not Match")
            }
        }
    }

});

module.exports = {loginController , registerController }