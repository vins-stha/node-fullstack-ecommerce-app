import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import User from '../models/User'

import ProductOrder from '../models/ProductOrder'

import OrderService, {findByUser} from '../services/order'
import { BadRequestError } from '../helpers/apiError'
import ProductOrderService from '../services/productOrder'

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId, items} = req.body;

    let results;

    const order = new Order({userId, items});
    results = await OrderService.create(order);

    if (results._id) {
      let updateUserOrder = await User.updateOne(
          {_id: userId},
          {$push: {orders: results._id}}
      )
    }

    res.json(results)

  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await OrderService.find(req.params.id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderService.deleteById(req.params.id)

    res.json({ "message": "Order deleted successfully!", status:204})
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id

    const order = await OrderService.updateById(id, req.body)

    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
