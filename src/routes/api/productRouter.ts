import express from 'express';
import { Request, Response } from 'express';
import { Product, ProductStore } from '../../models/product';


import { 
    index,
    show,
    create,
    update,
    destroy
}  from '../../controllers/ProductController'

const store = new ProductStore();
const productRouter = express.Router();

productRouter.get('/', index)

productRouter.get('/:productID', show)

productRouter.post('/', create) 

productRouter.put('/:productID', update) 

productRouter.delete('/:productID', destroy)



export default productRouter;
