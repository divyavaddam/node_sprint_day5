const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const UserRouter = require("./router/UserRouter");
const ProductRouter = require("./router/ProductRouter");
const mongoose = require("mongoose");
const { PORT, DB_USER, DB_PASSWORD } = process.env;
const app = express();
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

//app.get("/search", function(request, response) {
//  console.log(request.query);
//response.status(200).json({
//  message: request.query,
//status: "Success"
//})
//})

// connection from our express server to mongoose driver
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.co7bnal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// connection from mongoose driver to MongoDB
mongoose
  .connect(dbURL)
  .then(function () {
    console.log("Connection Successful");
  })
  .catch((e) => console.log(e));

// Helper functions
app.use(function (request, response) {
  response.status(200).json({
    status: "Success",
    message: "I'm from app.user method",
  });
});
app.use(function (request, response) {
  response.status(404).json({
    status: "failure",
    message: "404 page not found",
  });
});

app.listen(PORT, function () {
  console.log(`Server is running at ${PORT} port`);
});

/*
 at code level -> as we can see we are copy pasting and repeting the same code -> to prevent repetition of code -> We use factory design
 at file level ->Having the entire code in one file eg: finalApI.js is a bad way of writing -> we need to follow a structure to segregate the code -> so we use Model View Controller(MVC) Architecture  
*/
