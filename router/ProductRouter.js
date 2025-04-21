const express = require("express");
const ProductRouter = express.Router();
const {createProductHandler, getAllProductsHandler, getProductByGivenId, deleteProductById} = require("../controller/ProductController");


// Routes
// APIs for products
ProductRouter.post("/", createProductHandler);
ProductRouter.get("/", getAllProductsHandler);
ProductRouter.get("/:productId", getProductByGivenId);
ProductRouter.delete("/:productId", deleteProductById);

module.exports = ProductRouter;
