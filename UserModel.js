const mongoose = require("mongoose");
const userSchemaRules = {
    name: {
        type: String,
        required: true // specifies that if an user is created they should definitely have a name
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type:String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: String
}

const userSchema = new mongoose.Schema(userSchemaRules);
// this model will have queries or syntaxes
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;