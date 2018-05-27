const mongoose = require("mongoose")
const Schema = mongoose.Schema

let cartSchema = new Schema(
    {
        productsIds :  {
            type : String
        }
    }
)

mongoose.model('Cart', cartSchema);