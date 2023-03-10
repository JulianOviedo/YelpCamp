import mongoose from "mongoose";
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

})

export default mongoose.model('Campground', CampgroundSchema)