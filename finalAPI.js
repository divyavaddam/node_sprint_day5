const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");
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



//const getAllUsers = createFactory(UserModel);
//const getAllProductsHandler = createFactory(ProductModel);



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



// Handler functions for user APIs
const createUserHandler = async function(request, response) {
    try{
      const userDetails = request.body;
      // adding user to db
      const user = await UserModel.create(userDetails);
      response.status(200).json({
        status: "Success",
        message: "added user",
        user: user
      })
    }catch(e){
        response.status(500).json({
            status: "Failure",
            message:e.message
        })
    }
    
    
    
    
    
}
const getUserByGivenId = async function(request, response) {
    try {
        const userId = request.params.userId;
        const userDetails = await UserModel.findById(userId)
        if (userDetails === "No user found"){
            throw new Error(`User with ${userId} not found`);
        }else{
            response.status(200).json({
                status: "Success",
                message: userDetails
            })

        }
    }catch (e) {
        response.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
    
    
}

const getAllUsers = async function(request, response) {
    try{
        console.log("I'm from get method");
        // response.status(200).json({
        //    status: "Success",
        //    message: "Sending message from get method"
        //}) 
        const userDataStore = await UserModel.find();
       if(userDataStore.length == 0){
        throw new Error("No Users Found");
       }
       response.status(200).json({
        status: "Success",
        message: userDataStore
    })
        } catch (e) {
            response.status(404).json({
                status: "failure",
                message: e.message
            })
            
        }
}
const deleteById = async function(request, response) {
    const {userId} = request.params;
    try {
        
        let user = await UserModel.findByIdAndDelete(userId)
        
            response.status(200).json({
                status: "Successful Deletion",
                message: user
            })

        
    }catch (e) {
        response.status(404).json({
            status: "Failure",
            message: `User with userId ${userId} is not found to delete`
        })
    }
}


// handler functions for products APIs
const createProductHandler =  async function(request, response) {
    try{
      const productDetails = request.body;
      // adding product to db
      const product = await ProductModel.create(productDetails);
      response.status(200).json({
        status: "Success",
        message: "added product",
        product: product
      })
    }catch(e){
        response.status(500).json({
            status: "Failure",
            message:e.message
        })
    }
    
}
const getAllProductsHandler = async function(request, response) {
    try{
        console.log("I'm from get method");
        // response.status(200).json({
        //    status: "Success",
        //    message: "Sending message from get method"
        //}) 
       const productDataStore = await ProductModel.find();
       if(productDataStore.length == 0){
        throw new Error("No Products Found");
       }
       response.status(200).json({
        status: "Success",
        message: productDataStore
    })
        } catch (e) {
            response.status(404).json({
                status: "failure",
                message: e.message
            })
            
        }
}
const getProductByGivenId = async function(request, response) {
    try {
        const productId = request.params.productId;
        const productDetails = await ProductModel.findById(productId)
        if (productDetails === "No product found"){
            throw new Error(`Product with ${productId} not found`);
        }else{
            response.status(200).json({
                status: "Success",
                message: productDetails
            })

        }
    }catch (e) {
        response.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
    
    
}
const deleteProductById = async function(request, response) {
    const {productId} = request.params;
    try {
        
        let product = await ProductModel.findByIdAndDelete(productId)
        
            response.status(200).json({
                status: "Successful Deletion",
                message: product
            })

        
    }catch (e) {
        response.status(404).json({
            status: "Failure",
            message: `Product with productId ${productId} is not found to delete`
        })
    }
}




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

// closure in js
/*
function createFactory(ElementModel){
    return async function(request, response){
    try{
        console.log("I'm from get method");
        // response.status(200).json({
        //    status: "Success",
        //    message: "Sending message from get method"
        //}) 
       const productDataStore = await ElementModel.find();
       if(productDataStore.length == 0){
        throw new Error("No Products Found");
       }
       response.status(200).json({
        status: "Success",
        message: productDataStore
    })
        } catch (e) {
            response.status(404).json({
                status: "failure",
                message: e.message
            })
            
        }
    }
}
*/

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
 at code level -> as we can see we are copy pasting and repiting the same code -> to prevent repetition of code -> We use factory design
 at file level ->Having the entire code in one file eg: finalApI.js is a bad way of writing -> we need to follow a structure to segregate the code -> so we use Model View Controller(MVC) Architecture  
*/ 