import {Request, Response, NextFunction} from 'express'

import Brand from '../models/Brand'
import BrandService from '../services/brand'
import {BadRequestError} from '../helpers/apiError'


export const getAllBrands =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await BrandService.findAll())
        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Invalid Request', error))
            } else {
                next(error)
            }
        }
    };

export const createBrand =
    async (req: Request,
           res: Response,
           next: NextFunction) => {

        try {
            const {name, country} = req.body;
            const brand = new Brand({name, country});

            await BrandService.create(brand);

            res.json(brand);

        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {

                next(new BadRequestError(error.message, error))

            } else {
                next(error)
            }
        }
    };

export const findByName =async (req: Request, res: Response, next: NextFunction) =>{
    try {
        res.status(200).json(await BrandService.find(req.params.name))

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        }
        else
        {
            next(error)
        }
    }
};

export const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const brand = await BrandService.deleteById(req.params.id);

        res.json({"item": brand, "message": "Deleted successfully!", status:200})

    } catch (error) {

        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
};

export const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {brand_data} = req.body;
        const id = req.params.id;

        const brand = await BrandService.updateByName(id, req.body);

        res.json(brand)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
};

