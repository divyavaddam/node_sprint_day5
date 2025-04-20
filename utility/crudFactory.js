// closure in js

const getAllFactory = function(ElementModel){
    return async function(request, response){
    try{
        console.log("I'm from get method");
        // response.status(200).json({
        //    status: "Success",
        //    message: "Sending message from get method"
        //}) 
       const elementDetails = await ElementModel.find();
       if(elementDetails.length == 0){
        throw new Error("No Products Found");
       }
       response.status(200).json({
        status: "Success",
        message: elementDetails
    })
        } catch (e) {
            response.status(404).json({
                status: "failure",
                message: e.message
            })
            
        }
    }
}
const createFactory = function(ElementModel) {
    return async function(request, response){
    try{
        const elementDetails = request.body;
        // adding user to db
        const element = await ElementModel.create(elementDetails);
        response.status(200).json({
          status: "Success",
          message: "added the element",
          user: element
        })
      }catch(e){
          response.status(500).json({
              status: "Failure",
              message:e.message
          })
      }
    }
}
const getByIdFactory = (ElementModel) => {
    return async function(request, response) {
        try {
            const elementId = request.params.elementId;
            const elementDetails = await UserModel.findById(elementId)
            if (elementDetails === "No user found"){
                throw new Error(`Element with ${elementId} not found`);
            }else{
                response.status(200).json({
                    status: "Success",
                    message: elementDetails
                })
    
            }
        }catch (e) {
            response.status(404).json({
                status: "Failure",
                message: e.message
            })
        }
        
        
    }
    
}
const deleteByIdFactory = (ElementModel) => {
   return  async function(request, response) {
        const {elementId} = request.params;
        try {
            
            let element = await ElementModel.findByIdAndDelete(elementId)
            
                response.status(200).json({
                    status: "Successful Deletion",
                    message: element
                })
    
            
        }catch (e) {
            response.status(404).json({
                status: "Failure",
                message: `Product with productId ${productId} is not found to delete`
            })
        }
    }
}
module.exports = {getAllFactory, createFactory, getByIdFactory, deleteByIdFactory};