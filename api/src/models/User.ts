import mongoose, {Document} from 'mongoose'
import {file} from "@babel/types";

export type UserDocument = Document & {
    username?: string
    email: string
    orders?: string[] | []
    isAdmin?: boolean,
    profilePic?: any,
    personalDetails?: {
        fname?: string,
        lname?: string,
        address?: string,
        profilePicURL?: string,
        phone?: number
    }
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        lowercase: true,
        required: true,
    },
    personalDetail: {
        fname: {type: String, required: false},
        lname: {type: String, required: false},
        address: {type: String, required: false},
        phone: {
            type: Number,
        },
        profilePicURL: {type: String, required: false},
        // profilePic: {type:file, required:false},
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    isAdmin: {type: Boolean, default: false},


});

export default mongoose.model<UserDocument>('User', userSchema)
