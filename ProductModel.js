const mongoose = require("mongoose");
const productSchemaRules = {
  name: {
    type: String,
    required: [true, "Kindly pass the name"],
    unique: [true, "Product name should be unique"],
    maxLength: [40, "Your product name length is more than 40 characters"]
  },
  price: {
    type: Number,
    required: [true, "Kindly pass the price"],
    validate: {
        validator: function() {
        return this.price > 0
    }
 },
    message: "Price can't be negative"
  },
  categories: {
    type: String,
    required: true
  },
  productImages: {
    type: [String]
  },
  averageRating: Number,
  discountedPrice:{
    type: Number,
    validate: {
        validator: function(){
            return this.discountedPrice < this.price;
        },
        message: "Discount must be less than actual price"
    }
  }
}

const productSchema = new mongoose.Schema(productSchemaRules);
// this model will have queries or syntaxes
const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports = ProductModel;