const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/user-model")
const bcrypt = require('bcrypt');


const loginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = user.generateAuthToken();
            res.cookie('Token', token, { httpOnly: true });

            return res.status(200).json({
                message: "Login Successful",
                token,
                id: user._id,
                username: user.username,
                isAdmin :user.isAdmin
            });
        } else {
            res.status(401);
            throw new Error("Wrong Password");
        }
    } else {
        return res.status(400).json({ message: "No records found!" });
    }
});

const registerController = expressAsyncHandler(async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirm_password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        return res.status(401).json({ message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirm_password) {
        res.status(400);
        throw new Error("Password and confirm password do not match");
    }

    // Hash the password
    const saltRounds = 10; // You can adjust this number
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const createUser = await UserModel.create({
        username,
        email,
        password: hashedPassword // Save the hashed password
    });



    return res.status(201).json({
        message: `User registered: ${email}`
    });
});

const createAttendence =expressAsyncHandler((req ,res)=>{

})


module.exports = {loginController , registerController }