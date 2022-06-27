import { Request, Response, NextFunction } from 'express'

import ProductOrder from '../models/ProductOrder'
import { BadRequestError } from '../helpers/apiError'
import ProductOrderService from '../services/productOrder'

// POST /productOrders
export const createProductOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, products, userId, dateAdded } = req.body

    const productOrder = new ProductOrder({
      orderId,
      products,
      userId,
      dateAdded,
    })

    await ProductOrderService.create(productOrder)
    res.json(productOrder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /productOrders/:productOrderId
export const updateProductOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productOrderId = req.params.productOrderId
    const updatedProductOrder = await ProductOrderService.updateById(
      productOrderId,
      update
    )
    res.json(updatedProductOrder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /productOrders/:productOrderId
export const deleteProductOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductOrderService.deleteById(req.params.productOrderId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /productOrders/:productOrderId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductOrderService.find(req.params.productOrderId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /productOrders
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductOrderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
