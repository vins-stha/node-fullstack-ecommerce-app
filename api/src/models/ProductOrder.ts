import mongoose, { Document } from 'mongoose'

export type ProductOrderDocument = Document & {
  orderId: string
  products: [
    {
      productId: string[]
      count: number
      subTotal: number
    }
  ]
  userId: string
  dateCreated: Date
}

const productOrderSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      count: Number,
      subTotal: Number,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  dateCreated: {
    type: Date,
  },
})

export default mongoose.model<ProductOrderDocument>('ProductOrder', productOrderSchema)
