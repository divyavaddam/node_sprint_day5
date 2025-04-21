const {getAllFactory, createFactory, getByIdFactory, deleteByIdFactory} = require("../utility/crudFactory");
const UserModel = require("../model/UserModel");


// Handler functions for user APIs
const createUserHandler = createFactory(UserModel);
const getUserByGivenId = getByIdFactory(UserModel);
const getAllUsers = getAllFactory(UserModel);
const deleteById = deleteByIdFactory(UserModel);


module.exports = {createUserHandler, getUserByGivenId, getAllUsers, deleteById};