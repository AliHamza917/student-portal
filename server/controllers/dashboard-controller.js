const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/user-model");

const AttendenceModel = require("../models/attendance-model");

// Get logged-in user data
const getdataController = expressAsyncHandler(async (req, res) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const userid = req.params.u_id;

    try {
        const userdata = await UserModel.findById(userid);

        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }else{
            const attendencePendingData = await AttendenceModel.find(
                {
                        u_id:userid ,
                        status: 'Pending'
            })
            const todayAttendenceStatus = await AttendenceModel.find(
                {
                    u_id:userid,
                    date:formattedDate
                }
            )
            const status = todayAttendenceStatus.length > 0 ? todayAttendenceStatus[0].status : 'No status available';

            const countPending = await AttendenceModel.countDocuments({
                status: 'Pending',
            })
            const countPresents = await AttendenceModel.countDocuments({
                u_id: userid,
                status: 'Present',
            })
            res.status(200).json({userdata , todayAttendenceStatus: status , attendencePendingData , countPending , countPresents});

        }


    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Attendance controller
const attendenceController = expressAsyncHandler(async (req, res) => {
    const userId = req.params.u_id;

    // Gets current date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    try {
        // Check if attendance is already marked for today
        const checkAttendenceMarked = await AttendenceModel.findOne({
            u_id: userId,
            date: formattedDate,
        });

        if (checkAttendenceMarked) {

            return res.status(400).json({ success: false, message: 'Attendance already marked for today' , data:checkAttendenceMarked });
        }else{
            // If not marked, create a new attendance record
            const markAttendence = await AttendenceModel.create({
                u_id: userId,
                date: formattedDate,
                status: 'Pending'
            });

            console.log(markAttendence)
           return res.status(200).json({
                success: true,
                message: 'Attendance marked successfully',
                data: markAttendence,
                currentMonth: currentDate.getMonth() + 1
            });

        }




    } catch (error) {
        console.log('Error Updating', error);
        res.status(500).json({ success: false, message: 'Error marking attendance', error: error.message });
    }
});

module.exports = { attendenceController, getdataController };
