import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  title: string
  description?:string
  availableColors: string[]
  price: number
  category?: string
  brand?: string
  barcode: number
  dateAdded: Date,
  inStock?: number,
  imageURL?:string,
  image?:any
}

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
  },
  description: {
    type:String,
  },
  price: {
    type: Number,
    required:true
  },
  barcode: {
    type: Number,
    unique: true,
  },
  availableColors: {
    type: [String],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  inStock:Number,
  imageURL:String,

});

export default mongoose.model<ProductDocument>('Product', productSchema)
