import mongoose from "mongoose"
const Schema = mongoose.Schema

const ReviewSchema = {
    title: String,
    rating: Number
}

export default mongoose.model('Review', ReviewSchema)