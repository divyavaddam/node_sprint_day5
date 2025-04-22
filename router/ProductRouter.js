const express = require("express");
const ProductModel = require("../model/ProductModel");
const ProductRouter = express.Router();
const {
  createProductHandler,
  getProductByGivenId,
  deleteProductById,
} = require("../controller/ProductController");

const getAllProductsHandler = async function (request, response) {
  try {
    // all are done on the level of db
    // -> find all the date
    // -> Sort the data
    // -> select the data
    let query = request.query;
    let selectQuery = request.select;
    let sortQuery = request.sort;
    let queryResponsePromise = ProductModel.find();
    if (sortQuery) {
      let order = sortQuery.split(" ")[1];
      let sortParam = sortQuery.split(" ")[0];
      if (order == "inc") {
        queryResponsePromise = queryResponsePromise.sort(sortParam);
      } else {
        queryResponsePromise = queryResponsePromise.sort(-sortParam);
      }
    }
    if (selectQuery) {
      queryResponsePromise = queryResponsePromise.select(selectQuery);
    }
    const result = await queryResponsePromise;
    response.status(200).json({
      message: result,
      status: "Success",
    });
  } catch (err) {
    response.status(500).json({
      status: "Failure",
      message: err.message,
    });
  }
};

// Routes
// APIs for products
ProductRouter.post("/", createProductHandler);
ProductRouter.get("/", getAllProductsHandler);
ProductRouter.get("/:productId", getProductByGivenId);
ProductRouter.delete("/:productId", deleteProductById);

module.exports = ProductRouter;
