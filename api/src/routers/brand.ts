import express from 'express'

import {
    getAllBrands,
    createBrand, findByName, deleteBrand, updateBrand

} from '../controllers/brand'
import passport from "passport";
import isAdmin from '../middlewares/isAdmin'


const router = express.Router()

// Every path we define here will get /api/v1/brand prefix
router.get('/', getAllBrands);
router.get('/:name', findByName);

router.post('/',
    passport.authenticate('jwt',
        {session: false}),
    isAdmin,
    createBrand);

router.delete('/:id',
    passport.authenticate('jwt',
        {session: false}),
    isAdmin,
    deleteBrand);

router.put('/:id',
    passport.authenticate('jwt',
        {session: false}),
    isAdmin,
    updateBrand);


export default router
