const express = require("express");
const dashboardController = require("../controllers/dashboard-controller");
const router = express.Router();

// Routes
router.route("/get-data/:u_id").get(dashboardController.getdataController);
router.route("/mark-attendance/:u_id").post(dashboardController.attendenceController);

module.exports = router;
