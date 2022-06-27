import {Request, Response, NextFunction} from 'express'

import Category from '../models/Category'
import CategoryService from '../services/category'
import {BadRequestError, NotFoundError} from '../helpers/apiError'

export const getAllCategories =
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await CategoryService.findAll())
        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Invalid Request', error))
            } else {
                next(error)
            }
        }
    };

export const createCategory =
    async (req: Request,
           res: Response,
           next: NextFunction) => {
        try {
            const {name} = req.body;
            const cat = new Category({name});

            await CategoryService.create(cat);

            res.json(cat);

        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Empty or invalid category name.', error))
            } else {
                next(error)
            }
        }
    };

export const findByName = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.status(200).json(await CategoryService.find(req.params.name));

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Empty or invalid category name.', error))
        } else {
            next(error)
        }
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const cat = await CategoryService.deleteById(req.params.id);

        res.json({"item": cat, "message": "Deleted successfully!", status:200})

    } catch (error) {

        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Empty or invalid category name.', error))
        } else {
            next(error)
        }
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {catData} = req.body;
        const id = req.params.id;

        const cat = await CategoryService.updateByName(id, req.body);

        res.json(cat)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Empty or invalid category .', error))
        } else {
            next(error)
        }

    }
};