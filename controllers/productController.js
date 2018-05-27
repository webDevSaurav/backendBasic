const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const ProductModel = mongoose.model('Product')

/**
 * function to read all products.
 */
let getAllProducts = (req, res) => {
    ProductModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Product Controller: getAllProducts', 10)
                let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'Product Controller: getAllProducts')
                let apiResponse = response.generate(true, 'No Product Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all blogs

/**
 * function to get single product.
 */
let viewByProductId = (req, res) => {

    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {

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
                logger.info("Product found successfully","ProductController:ViewProductById",5)
                let apiResponse = response.generate(false, 'Product Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to read products by category.
 */
let viewByCategory = (req, res) => {

    if (check.isEmpty(req.params.category)) {

        console.log('category should be passed')
        let apiResponse = response.generate(true, 'Category is missing', 403, null)
        res.send(apiResponse)
    } else {

        ProductModel.find({ 'category': req.params.category }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Products Not Found.')
                let apiResponse = response.generate(true, 'Products Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Products Found Successfully')
                let apiResponse = response.generate(false, 'Products Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to get products by particular owner.
 */
let viewByOwner = (req, res) => {

    if (check.isEmpty(req.params.owner)) {

        console.log('owner should be passed')
        let apiResponse = response.generate(true, 'owner is missing', 403, null)
        res.send(apiResponse)
    } else {

        ProductModel.find({ 'owner': req.params.owner }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Products Not Found.')
                let apiResponse = response.generate(true, 'Products Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Products Found Successfully')
                let apiResponse = response.generate(false, 'Products Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to edit blog by admin.
 */
let editProduct = (req, res) => {

    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        ProductModel.update({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {

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
                console.log('Product Edited Successfully')
                let apiResponse = response.generate(false, 'Product Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to find the assignment.
 */
// let findBlogToEdit = (blogId) => {

//     if (check.isEmpty(req.params.blogId)) {

//         console.log('blogId should be passed')
//         let apiResponse = response.generate(true, 'blogId is missing', 403, null)
//         reject(apiResponse)
//     } else {
//         return new Promise((resolve, reject) => {
//             BlogModel.findOne({ 'blogId': req.params.blogId }, (err, blog) => {
//                 if (err) {
//                     console.log('Error Occured.')
//                     logger.error(`Error Occured : ${err}`, 'Database', 10)
//                     let apiResponse = response.generate(true, 'Error Occured.', 500, null)
//                     reject(apiResponse)
//                 } else if (check.isEmpty(blog)) {
//                     console.log('Blog Not Found.')
//                     let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
//                     reject(apiResponse)
//                 } else {
//                     console.log('Blog Found.')
//                     resolve(blog)
//                 }
//             })
//         })
//     }
// }

/**
 * function to delete the assignment collection.
 */
let deleteProduct = (req, res) => {

    if (check.isEmpty(req.params.productId)) {

        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {

        ProductModel.remove({ 'productId': req.params.productId }, (err, result) => {
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
                console.log('Product Deletion Success')
                let apiResponse = response.generate(false, 'Product Deleted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to create the product.
 */
let addProduct = (req, res) => {
    let ProductCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.name) || check.isEmpty(req.body.price) || check.isEmpty(req.body.description) || check.isEmpty(req.body.category) || check.isEmpty(req.body.owner)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = Date.now()
                let productId = shortid.generate()

                let newProduct = new ProductModel({

                    productId: productId,
                    name: req.body.name,
                    price : req.body.price,
                    imageLink : req.body.imageLink,
                    description: req.body.description,
                    bodyHtml: req.body.blogBody,
                    isPublished: true,
                    category: req.body.category,
                    owner: req.body.owner,
                    created: today,
                    lastModified: today
                }) // end new blog model

                let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
                newProduct.tags = tags

                newProduct.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in product creation')
                        resolve(result)
                    }
                }) // end new blog save
            }
        }) // end new blog promise
    } // end create blog function

    // making promise call.
    ProductCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Product added successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/**
 * function to increase views of a blog.
 */
let increaseProductView = (req, res) => {
    
        if (check.isEmpty(req.params.productId)) {
    
            console.log('productId should be passed')
            let apiResponse = response.generate(true, 'productId is missing', 403, null)
            res.send(apiResponse)
        } else {
    
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
                    result.views += 1;
                    result.save(function(err,result){
                        if(err){
                            console.log('Error Occured.')
                            logger.error(`Error Occured : ${err}`, 'Database', 10)
                            let apiResponse = response.generate(true, 'Error Occured While saving product', 500, null)
                            res.send(apiResponse)
                        }
                        else{
                            console.log('Product Updated Successfully')
                            let apiResponse = response.generate(false, 'Product Updated Successfully.', 200, result)
                            res.send(apiResponse)
                        }
                    });// end result
                    
                }
            })
        }
    }

 
    



module.exports = {

    getAllProducts: getAllProducts,
    addProduct : addProduct,
    viewByProductId: viewByProductId,
    viewByCategory: viewByCategory,
    viewByOwner: viewByOwner,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    increaseProductView : increaseProductView
}// end exports