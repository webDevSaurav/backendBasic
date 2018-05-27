const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')

const CartModel = mongoose.model('Cart')
const ProductModel = mongoose.model("Product")

let addToCart = (req,res) => {
    //first check if the product id entered exists or not
    //check productId is there or not
    if (check.isEmpty(req.params.productId)) {
        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        //Then find the product with given Id
        ProductModel.findOne({ 'productId': req.params.productId }, (err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Product Not Found.')
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                //Here the product with given ID is found
                //now check if the product is already in cart
                CartModel.findOne({productsIds : req.params.productId}, (err, resultofFind) => {
                    if(err){
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Cart cannot be saved', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        res.send(apiResponse)
                    } else if(resultofFind == null || resultofFind == undefined){
                        //here we see that the product is not in the cart
                        //then add it to cart
                        cart = new CartModel({
                            productsIds : req.params.productId
                        })
                        cart.save((err, result) => {
                            if(err){
                                console.log('Error Occured.')
                                logger.error(`Error Occured : ${err}`, 'Cart cannot be saved', 10)
                                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                                res.send(apiResponse)
                            } else {
                                let apiResponse = response.generate(false, 'Added in the cart', 200, result)
                                res.send(apiResponse)
                            }
                        })
                    } else {
                        //Product is already in cart
                        console.log('Product already in cart.')
                        logger.error(`Error Occured : ${err}`, 'Cart cannot be saved', 5)
                        let apiResponse = response.generate(true, 'Product already in cart', 500, null)
                        res.send(apiResponse)
                    }
                })
                
            }
    })
}
}

let viewCart = (req, res) => {
    CartModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Cart Controller: viewCart', 10)
                let apiResponse = response.generate(true, 'Failed To Find Cart Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Item in cart Found', 'cartController: viewCart')
                let apiResponse = response.generate(true, 'No Item in the cart', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All items in cart Found', 200, result)
                res.send(apiResponse)
            }
        })
}

let removeFromCart = (req, res) => {
    if (check.isEmpty(req.params.productId)){
        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        CartModel.remove({ 'productsIds': req.params.productId }, (err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Product Not Found.')
                let apiResponse = response.generate(true, 'Product Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Product Removed Successfully')
                let apiResponse = response.generate(false, 'Product Removed Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

module.exports = {
    viewCart : viewCart,
    addToCart : addToCart,
    removeFromCart : removeFromCart
}
