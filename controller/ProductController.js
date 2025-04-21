const {getAllFactory, createFactory, getByIdFactory, deleteByIdFactory} = require("../utility/crudFactory");
const ProductModel = require("../model/ProductModel");


// handler functions for products APIs
const createProductHandler = createFactory(ProductModel);
const getAllProductsHandler = getAllFactory(ProductModel);
const getProductByGivenId = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

module.exports = {createProductHandler, getAllProductsHandler, getProductByGivenId, deleteProductById};