require("dotenv").config();
const express = require("express")
const app = express();
const DBconnection = require("../server/utills/db")
const authRouter = require("./router/auth-router")
const dashboardRouter = require("./router/dashboard-router")
const adminRouter = require("./router/admin-router")
const cors = require("cors")

const Port = process.env.PORT || 8000

var corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://student-portal-khaki.vercel.app"
    ],
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use("*",cors(corsOptions));
app.use(express.json());
app.use("/api/auth/", authRouter);
app.use("/api/dashboard/", dashboardRouter);
app.use("/api/dashboard/admin/", adminRouter);

DBconnection().then(()=>{
    app.listen(Port , ()=>{
        console.log(`Server is Running on Port ${Port}`)
    })
})
