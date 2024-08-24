const express = require("express");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();

const homeRoute = require("./routes/home-route");
const coursesRoute = require("./routes/courses-route");
const usersRoute=require("./routes/users-route");
const winstonLogger=require("./routes/winstonLogger-route")
const errorHandler = require("./middlewares/error_Handler");
app.use(express.json());
app.use(cookieParser())
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", homeRoute);
app.use("/api/courses",coursesRoute)
app.use("/api/users",usersRoute)
app.use("/api/winstonLogger",winstonLogger)
app.use(errorHandler)

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`app lesinig on port ${port}`);
});
