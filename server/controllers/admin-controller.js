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

const pendingApprovelData =expressAsyncHandler(async (req , res)=>{

    const pendingStatus = await AttendenceModel.find({status : 'Pending'})

    // Extract u_id
    const u_ids = pendingStatus.map(item => item.u_id);

    // Fetch user names based on u_ids
    const users = await UserModel.find({ _id: { $in: u_ids } });

    // Create a map for user names
    const userMap = {};
    users.forEach(user => {
        userMap[user._id] = user.username; // Assuming 'name' is the field for user names
    });

    // Extract u_id, status, and corresponding user name
    const extractedData = pendingStatus.map(item => ({
        u_id: item.u_id,
        status: item.status,
        userName: userMap[item.u_id] || null // Handle cases where user is not found
    }));

    return res.status(200).json({success: true, data: extractedData})

})


// Approve attendance
const approveAttendence = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.params.u_id;
        const attendance = await AttendenceModel.findOne({ u_id: userId, status: 'Pending' });

        if (!attendance) {
            return res.status(404).json({ success: false, message: "No pending attendance found for this user" });
        }

        // Update the attendance status to 'Approved'
        attendance.status = 'Present';
        await attendance.save();

        return res.status(200).json({ success: true, message: "Attendance approved successfully" });
    } catch (error) {
        console.error("Error approving attendance:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Reject attendance controller
const rejectAttendance = expressAsyncHandler(async (req, res) => {
    const { u_id } = req.params; // Get user ID from the request parameters

    try {
        // Update the attendance record to set status as "Rejected"
        const updatedAttendance = await AttendenceModel.findOneAndUpdate(
            { u_id: u_id, status: 'Pending' }, // Find the attendance record with the given user ID and pending status
            { status: 'Rejected' }, // Update the status to "Rejected"
            { new: true } // Return the updated document
        );

        // Check if the attendance record was found and updated
        if (!updatedAttendance) {
            return res.status(404).json({ success: false, message: "Attendance record not found or already processed" });
        }

        return res.status(200).json({ success: true, message: "Attendance rejected successfully", data: updatedAttendance });
    } catch (error) {
        console.error("Error rejecting attendance:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = { pendingAttendence , pendingApprovelData ,approveAttendence ,rejectAttendance };
