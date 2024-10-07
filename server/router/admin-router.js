const express = require("express")
const adminController = require("../controllers/admin-controller");
const router = express.Router()
// Controller


router.route("/pending-attendence/:u_id").post(adminController.pen);


module.exports = router;
