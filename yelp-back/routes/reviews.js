import express from 'express'
import { reviewSchema } from '../schemas.js'
import catchAsync from '../utils/catchAsync.js'
import Campground from '../models/campground.js';
import Review from '../models/review.js';
import ExpressError from '../utils/ExpressError.js'

const router = express.Router({mergeParams: true})
const BASE_URL = 'http://localhost:3000'

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join('.')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.post('/', validateReview, async (req, res) => {
    const { _id } = req.params
    const campground = await Campground.findById(_id)
    const newReview = new Review(req.body.review)
    campground.review.push(newReview)
    await newReview.save()
    await campground.save()
    res.redirect(`${BASE_URL}/campgrounds/${_id}`)
})

router.delete('/:reviewId', catchAsync(async (req, res, next) => {
    const { _id, reviewId } = req.params
    await Campground.findByIdAndUpdate(_id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`${BASE_URL}/campgrounds/${_id}`)
}))

export default router