import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import { BadRequestError } from '../helpers/apiError'

// POST /products
export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, availableColors, description,
            price, category, brand, barcode,
            product_image,
            imageURL,
            dateAdded} = req.body

        const product = new Product({
            title,
            description,
            availableColors,
            price,
            category,
            brand,
            barcode,
            product_image,
            imageURL,
            dateAdded,
        });

        await ProductService.create(product)
        res.json(product)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}

// PUT /products/:productId
export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const update = req.body;
        const productId = req.params.productId;
        // console.log(req.payload)
        const updatedProduct = await ProductService.update(productId, update);

        res.json(updatedProduct)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}

// DELETE /products/:productId
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await ProductService.deleteProduct(req.params.productId);
        res.json({ "message": "Product deleted successfully!", status:204})

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
};

// GET /products/:productId
export const findById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await ProductService.findById(req.params.productId))
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
};

// GET /products
export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await ProductService.findAll())
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
};

export const detailedProduct = async (req: Request,
                                 res: Response,
                                 next: NextFunction) => {
    const details = await Product
        .find()
        .populate("category brand");
    res.status(200).json(details);






};