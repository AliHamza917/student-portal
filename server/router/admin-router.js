const express = require("express")
const adminController = require("../controllers/admin-controller");
const router = express.Router()
// Controller


router.route("/pending-attendence/:u_id").post(adminController.pendingAttendence);
router.route("/pending-approvels/").get(adminController.pendingApprovelData);
router.route('/approve-attendance/:u_id').post(adminController.approveAttendence);
router.route('/reject-attendance/:u_id').post(adminController.rejectAttendance);


module.exports = router;
