//
import express from 'express'
import passport from 'passport'
import {
  createProductOrder,
  findById,
  deleteProductOrder,
  findAll,
  updateProductOrder,
} from '../controllers/productOrder'
import { jwtStrategy } from '../config/passport'

const productOrderRoutes = express.Router()

productOrderRoutes.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  findAll
)
productOrderRoutes.get('/:productOrderId', findById)
productOrderRoutes.put('/:productOrderId', updateProductOrder)
productOrderRoutes.delete('/:productOrderId', deleteProductOrder)
productOrderRoutes.post('/', createProductOrder)
// productOrderRoutes.get('/detail', detailedProductOrder);

export default productOrderRoutes
