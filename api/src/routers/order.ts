import express from 'express'

import {
  getAllOrders,
  createOrder,
  findById,
  deleteOrder,
  updateOrder,
} from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1/order prefix
router.get('/', getAllOrders)
router.get('/:id', findById)
router.post('/', createOrder)
router.delete('/:id', deleteOrder)
router.put('/:id', updateOrder)

export default router
