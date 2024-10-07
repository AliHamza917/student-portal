const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/user-model");
const AttendenceModel = require("../models/attendance-model");

const pendingAttendence =  expressAsyncHandler(async (req, res) => {
    const userId = req.param.u_id
    const isAdmin = await UserModel.findOne({u_id: userId,})

    console.log(isAdmin)
})

module.exports = {pendingAttendence}