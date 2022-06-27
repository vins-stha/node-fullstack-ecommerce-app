import ProductOrder, { ProductOrderDocument } from '../models/ProductOrder'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<ProductOrderDocument[]> => {
  return ProductOrder.find().sort({ dateCreated: 1 })
}

const find = async (id: string): Promise<ProductOrderDocument> => {
  const productOrder = await ProductOrder.findOne({ _id: id }).exec()
  if (!productOrder) throw new NotFoundError(`ProductOrder "${id}" not found`)

  return productOrder
}

const findByUser = async (
  userId: string
): Promise<ProductOrderDocument | any> => {}

const create = async (
  productOrder: ProductOrderDocument
): Promise<ProductOrderDocument> => {
  return productOrder.save()
}

const deleteById = async (id: string): Promise<ProductOrderDocument> => {
  const productOrder = await ProductOrder.findByIdAndDelete(id)
  if (!productOrder) throw new NotFoundError(`ProductOrder "${id}" not found`)
  return productOrder
}

const updateById = async (
  id: string,
  updatedData: Partial<ProductOrderDocument>
): Promise<ProductOrderDocument> => {
  const productOrder = await ProductOrder.findByIdAndUpdate(id, updatedData, {
    new: true,
  })
  if (!productOrder) throw new NotFoundError(`ProductOrder "${id}" not found`)

  return productOrder
}

export default { findAll, create, find, deleteById, updateById }
