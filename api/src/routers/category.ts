import express from 'express'

import {
    getAllCategories,
    createCategory, findByName, deleteCategory, updateCategory

} from '../controllers/category'
import passport from "passport";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router()

// Every path we define here will get /api/v1/category prefix

router.get('/', getAllCategories);
router.post('/',
    passport.authenticate('jwt',
        {session: false}),
    isAdmin,
    createCategory);
router.get('/:name', findByName);
router.delete('/:id',
    passport.authenticate('jwt',
        {session: false}),
    isAdmin,
    deleteCategory);
router.put('/:id',
    passport.authenticate('jwt',
        {session: false}),
    isAdmin,
    updateCategory);


export default router
