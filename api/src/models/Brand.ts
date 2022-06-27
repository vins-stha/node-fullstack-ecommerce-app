import mongoose, {Document} from 'mongoose'

export type BrandDocument = Document & {
    name: string,
    country:String
}

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true,
        unique:true
    },
    country: {
        type:String,
    }
});

export default mongoose.model<BrandDocument>('Brand', brandSchema)
