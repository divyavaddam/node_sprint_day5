const mongoose = require("mongoose");
/*
const productSchemaRules = {
  name: {
    type: String,
    required: [true, "Kindly pass the name"],
    unique: [true, "Product name should be unique"],
    maxLength: [40, "Your product name length is more than 40 characters"]
  },
  price: {
    type: String,
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
  discount:{
    type: String,
    validate: {
        validator: function(){
            return this.discount < this.price;
        },
        message: "Discount must be less than actual price"
    }
  },
  description: {
    type: String,
    required: [true, "Kindly add description"],
    maxLength: [2000, "description can't be bigger than 2000 characters"]
  },
  stock_quantity: {
    type:String,
    required: [true, "You should enter stock of the product should atleast be 0"],
    validate: function(){
      return this.stock_quantity >= 0;
    },
    message: "Stock quantity can't be negative"
  },
  brand: {
    type: String,
    required: [true, "Please enter the brand"]
  }
}
  */

const newProductSchemaRules = {
  name: {
    type: String,
    required: [true, "Kindly pass the name"],
    unique: [true, "Product name should be unique"],
    maxLength: [40, "Your product name length is more than 40 characters"],
  },
  price: {
    type: Number,
    required: [true, "Kindly pass the price"],
    validate: {
      validator: function () {
        return this.price > 0;
      },
    },
    message: "Price can't be negative",
  },
  categories: {
    type: [String],
    required: true,
  },
  productImages: {
    type: [String],
  },
  averageRating: Number,
  discount: {
    type: Number,
    validate: {
      validator: function () {
        return this.discount < this.price;
      },
      message: "Discount must be less than actual price",
    },
  },
  description: {
    type: String,
    required: [true, "Kindly add description"],
    maxLength: [2000, "description can't be bigger than 2000 characters"],
  },
  stock_quantity: {
    type: Number,
    required: [
      true,
      "You should enter stock of the product should atleast be 0",
    ],
    validate: function () {
      return this.stock_quantity >= 0;
    },
    message: "Stock quantity can't be negative",
  },
  brand: {
    type: String,
    required: [true, "Please enter the brand"],
  },
};

const productSchema = new mongoose.Schema(newProductSchemaRules);

// Pre and Post Hooks
let validCategories = ["Electronics", "Audio", "Accessories", "Clothing"];
productSchema.pre("save", function (next) {
  const product = this;

  const invalidCategoriesArr = product.categories.filter((category) => {
    return !validCategories.includes(category);
  });

  if (invalidCategoriesArr.length > 0) {
    const err = new Error("Products from these categories are not allowed");
    return next(err);
  } else {
    next();
  }
});

// this model will have queries or syntaxes
const ProductModel = mongoose.model("newProductModel", productSchema); // changed from ProductModel to newProductModel

module.exports = ProductModel;
