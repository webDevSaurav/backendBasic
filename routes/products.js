const express = require('express');
const router = express.Router();
const productController = require("./../controllers/productController");
const appConfig = require("./../config/appConfig")
const auth = require("./../middlewares/auth")

module.exports.setRouter = function(app){

	let baseUrl = appConfig.apiVersion+'/products';
	
	

    app.get(baseUrl+'/all',auth.isAuthenticated,productController.getAllProducts);

	/**
	 * @api {get} /api/v1/products/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
						_id: "string",
	    			__v: number
					productId: "string",
					name: "string",
					price : "number",
					imageLink : "string",
					description: "string",
					ratings: object(type = array),
					reviews : object(type = array),
					views: number,
					isPublished: boolean,
					category: "string",
					owner: "string",
					tags: object(type = array),
					created: "date",
					lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(baseUrl+'/view/:productId',auth.isAuthenticated,productController.viewByProductId);

    /**
	 * @api {get} /api/v1/products/view/:productId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
	    			__v: number
					productId: "string",
					name: "string",
					price : "number",
					imageLink : "string",
					description: "string",
					ratings: object(type = array),
					reviews : object(type = array),
					views: number,
					isPublished: boolean,
					category: "string",
					owner: "string",
					tags: object(type = array),
					created: "date",
					lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/by/owner/:owner',auth.isAuthenticated,productController.viewByOwner);

    /**
	 * @api {get} /api/v1/products/view/by/owner/:owner Get products by owner
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} author author of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Found Successfully.",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						name: "string",
						price : "number",
						imageLink : "string",
						description: "string",
						ratings: object(type = array),
						reviews : object(type = array),
						views: number,
						isPublished: boolean,
						category: "string",
						owner: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/by/category/:category',auth.isAuthenticated,productController.viewByCategory);

    /**
	 * @api {get} /api/v1/productss/view/by/category/:category Get products by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} category category of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Found Successfully.",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						name: "string",
						price : "number",
						imageLink : "string",
						description: "string",
						ratings: object(type = array),
						reviews : object(type = array),
						views: number,
						isPublished: boolean,
						category: "string",
						owner: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/:productId/delete',auth.isAuthenticated,productController.deleteProduct);

    /**
	 * @api {post} /api/v1/products/:productId/delete Delete product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(baseUrl+'/:productId/edit',auth.isAuthenticated,productController.editProduct);

    /**
	 * @api {put} /api/v1/products/:productId/edit Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						name: "string",
						price : "number",
						imageLink : "string",
						description: "string",
						ratings: object(type = array),
						reviews : object(type = array),
						views: number,
						isPublished: boolean,
						category: "string",
						owner: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/create',auth.isAuthenticated,productController.addProduct);

    /**
	 * @api {post} /api/v1/products/create Create product
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} name name of the product passed as a body parameter
	 * @apiParam {String} description description of the product passed as a body parameter
	 * @apiParam {String} price price of the product passed as a body parameter
	 * @apiParam {String} imageLink imageLink of the product passed as a body parameter
	 * @apiParam {String} owner owner of the product passed as a body parameter	
	 * 
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Created successfully",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						name: "string",
						price : "number",
						imageLink : "string",
						description: "string",
						ratings: object(type = array),
						reviews : object(type = array),
						views: number,
						isPublished: boolean,
						category: "string",
						owner: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/:productId/count/view',auth.isAuthenticated,productController.increaseProductView);


    /**
	 * @api {get} /api/v1/products/:productId/count/view Increase Products View Count
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						name: "string",
						price : "number",
						imageLink : "string",
						description: "string",
						ratings: object(type = array),
						reviews : object(type = array),
						views: number,
						isPublished: boolean,
						category: "string",
						owner: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    

}


