import Order, { OrderDocument } from '../models/Order'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find().sort({ dateCreated: 1 })
}

const find = async (id: string): Promise<OrderDocument> => {
  const order = await Order
      .findOne({ _id: id })
      .populate({
        path:'userId',
        populate: {
          path:'items._id',
          model:'Product'
        }
      })

   if (!order) throw new NotFoundError(`Order "${id}" not found`)

  return order
}

export const findByUser = async (userId: string): Promise<OrderDocument | any> => {
  const order = await Order
      .find({userId:userId})
  // console.log('ORDERS',order)

  if (!order){
    return []
  }

  return order

}

const create = async (order: OrderDocument): Promise<OrderDocument> => {
  console.log('creating new order', order)
  return order.save()
}

const deleteById = async (id: string): Promise<OrderDocument> => {
  const order = await Order.findByIdAndDelete(id)
  if (!order) throw new NotFoundError(`Order "${id}" not found`)
  return order
}

const updateById = async (
    id: string,
    updatedData: any
): Promise<any> => {

  const order = await Order.updateMany(
      {_id: id},
      {items: updatedData}
  )

  if (!order) throw new NotFoundError(`Order "${id}" not found`)

  return order
}

export default { findAll, create, find, deleteById, updateById, findByUser }
