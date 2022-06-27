import mongoose, { Document } from 'mongoose';
import {dateCreated} from "../helpers/date";
import Product from "./Product";

export type OrderDocument = Document & {
  userId?: string
  items : any
  total?: number
  dateCreated: Date
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  total: {
    type: Number,
    required: false
  },
  items:[],
  dateCreated: {
    type: String,
    default: dateCreated(),
  },
});

export default mongoose.model<OrderDocument>('Order', orderSchema)
