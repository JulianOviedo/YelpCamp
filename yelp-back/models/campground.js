import mongoose from "mongoose";
import Review from './review.js'
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

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        console.log(doc)
        await Review.deleteMany({
            _id: { 
                $in: doc.review
             }
        })
    }
})

export default mongoose.model('Campground', CampgroundSchema)