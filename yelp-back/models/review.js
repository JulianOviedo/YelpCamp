import mongoose from "mongoose"
const Schema = mongoose.Schema

const ReviewSchema = {
    body: String,
    rating: Number
}

export default mongoose.model('Review', ReviewSchema)