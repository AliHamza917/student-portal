const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/user-model");
const AttendenceModel = require("../models/attendance-model");

const pendingAttendence = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.params.u_id; // Ensure this matches your route definition
        const user = await UserModel.findOne({ _id: userId }); // Find user by ID

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isAdmin = user.isAdmin; // Directly use the boolean value
        

        if (isAdmin) { // If the user is not an admin
            const pending = await AttendenceModel.find();
            return res.status(200).json({ success: true, pending }); // Return pending attendance with 200 status
        } else {
            return res.status(403).json({ success: false, message: "Does not have admin rights" }); // Use 403 for forbidden
        }
    } catch (error) {
        console.error("Error fetching pending attendance:", error); // More descriptive logging
        return res.status(500).json({ success: false, message: "Internal Server Error" }); // Return error response
    }
});

module.exports = { pendingAttendence };
