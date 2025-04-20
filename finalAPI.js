const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");
const {getAllFactory, createFactory, getByIdFactory, deleteByIdFactory} = require("./utility/crudFactory");
const mongoose = require("mongoose");
const {PORT, DB_USER, DB_PASSWORD} = process.env;
const app = express();
app.use(express.json());




// connection from our express server to mongoose driver
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.co7bnal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// connection from mongoose driver to MongoDB
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Successful");
}).catch(e => console.log(e))

/*
const getUserById = function (id) {
    const user = userDataStore.find((user) => {
        return user.id == id;
    })
    if (user === undefined) {
        return "No user found";
    }else {
        return user;
    }
}
    */

// Handler functions for user APIs
const createUserHandler = createFactory(UserModel);
const getUserByGivenId = getByIdFactory(UserModel);
const getAllUsers = getAllFactory(UserModel);
const deleteById = deleteByIdFactory(UserModel);

// handler functions for products APIs
const createProductHandler = createFactory(ProductModel);
const getAllProductsHandler = getAllFactory(ProductModel);
const getProductByGivenId = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);



// checklist if we are sending empty data or not to the post method 
const checkInput = function(request, response, next) {
    if(request.method == "POST"){
        const userDetails = request.body;
        const isEmpty = !userDetails || Object.keys(userDetails).length === 0;
        if(isEmpty) {
            response.status(404).json({
                status: "Failure",
                message: "User details are empty"
            })
        }else {
            next()
        }
    }else {
        next()
    }
}
// APIs for users
// GET API 1
app.get("/api/user", getAllUsers);

// POST API 2
// we are chaining the controller functions
app.post("/api/user", checkInput, createUserHandler);
// GET API 3
app.get("/api/user/:userId/:currentDate", function(request, response){
    const userDetails = request.params;
    console.log(userDetails);
    response.status(200).json({
        status: "Success",
        message: "getById Worked"
    })
})
// GET API TO GET A SPECIFIC USER BASED ON USERID -> the following get API is called "TEMPLATE ROUTE"
app.get("/api/user/:userId", getUserByGivenId);

// delete a user based on specific id 
app.delete("/api/user/:userId", deleteById);


// APIs for products
app.post("/api/product", createProductHandler);
app.get("/api/product", getAllProductsHandler);
app.get("/api/product/:productId", getProductByGivenId);
app.delete("/api/product/:productId", deleteProductById);



// Helper functions
app.use(function(request, response) {
    response.status(200).json({
        status: "Success",
        message: "I'm from app.user method"
    })
})
app.use(function(request, response){
    response.status(404).json({
        status: "failure",
        message: "404 page not found"
    })
   
})







app.listen(PORT, function(){
    console.log(`Server is running at ${PORT} port`);
});

/*
 at code level -> as we can see we are copy pasting and repeting the same code -> to prevent repetition of code -> We use factory design
 at file level ->Having the entire code in one file eg: finalApI.js is a bad way of writing -> we need to follow a structure to segregate the code -> so we use Model View Controller(MVC) Architecture  
*/ 