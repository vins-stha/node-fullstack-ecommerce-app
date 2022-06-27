/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type CategoryDocument = Document & {
  name: string
  dateAdded: Date
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    required: [true, 'Category name can not be empty!'],
  },
  dateAdded: { type: Date, default: Date.now },
})

export default mongoose.model<CategoryDocument>('Category', categorySchema)
