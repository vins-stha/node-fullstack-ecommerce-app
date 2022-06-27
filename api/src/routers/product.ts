import express from 'express'
import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
  detailedProduct,
} from '../controllers/product'
import passport from 'passport'
import isAdmin from '../middlewares/isAdmin'

const productRoutes = express.Router()
productRoutes.get('/', findAll)
productRoutes.get('/:productId', findById)

productRoutes.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  updateProduct
)

productRoutes.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  deleteProduct
)

productRoutes.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  createProduct
)

productRoutes.get('/detail', detailedProduct)

export default productRoutes
