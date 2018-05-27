// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        imageLink: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        ratings: {
            type: [],
            default: []
        },
        reviews: {
            type: [],
            default: []
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
        },
        tags: [],

        created: {
            type: Date,
            default: Date.now
        }, 

        lastModified: {
            type: Date,
            default: Date.now
        }
    }
)

mongoose.model('Product', productSchema);