require("dotenv").config()
var express = require('express');
var app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoDB = process.env.CNN; 

app.use(bodyParser.json());
app.use(
    express.json({
      type: ["application/json", "text/plain"],
    })
);

const userRoute = require("./src/presentation/routes/User");
app.use("/Api/Users", userRoute);

const topicRoute = require("./src/presentation/routes/Topic");
app.use("/Api/Topics", topicRoute);

const newsRoute = require("./src/presentation/routes/News");
app.use("/Api/News", newsRoute);

const authRoute = require("./src/presentation/routes/Auth");
app.use("/Api/Auth", authRoute);

//Polling Daemon
const newsWorker = require("../WEB SERVICE/src/domain/workers/NewsWorker");
async function daemonFunc() {
  await newsWorker.daemonWorker();
  console.log('Process daemon done!');
}
//setInterval(daemonFunc, 5000);

app.listen(port, async () => {
    await mongoose.connect(mongoDB)
    console.log("This application is running at port", port)
});




