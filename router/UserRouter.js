const express = require("express");
const UserRouter = express.Router();
const {createUserHandler, getUserByGivenId, getAllUsers, deleteById} = require("../controller/UserController");
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


// Routes
// APIs for users
// GET API 1
UserRouter.get("/", getAllUsers);
// POST API 2
// we are chaining the controller functions
UserRouter.post("/", checkInput, createUserHandler);
// GET API 3
UserRouter.get("/:userId/:currentDate", function(request, response){
    const userDetails = request.params;
    console.log(userDetails);
    response.status(200).json({
        status: "Success",
        message: "getById Worked"
    })
})
// GET API TO GET A SPECIFIC USER BASED ON USERID -> the following get API is called "TEMPLATE ROUTE"
UserRouter.get("/:userId", getUserByGivenId);

// delete a user based on specific id 
UserRouter.delete("/:userId", deleteById);


module.exports = UserRouter;