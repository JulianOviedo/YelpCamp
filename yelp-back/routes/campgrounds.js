import express from 'express'
import { campgroundSchema } from '../schemas.js'
import catchAsync from '../utils/catchAsync.js'
import Campground from '../models/campground.js';
import ExpressError from '../utils/ExpressError.js'

const router = express.Router()
const BASE_URL = 'http://localhost:3000'



const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.send(campgrounds)
}))

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const newCampground = new Campground(req.body.campground)
    await newCampground.save()
    res.json({ newCampgroundId: newCampground._id });
}))

router.get('/:_id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params._id).populate('review')
    res.send({ campground })
}))

router.put('/:_id', catchAsync(async (req, res) => {
    const { _id } = req.params
    console.log(req.body)
    await Campground.findByIdAndUpdate(_id,  {...req.body})
    res.json({ updatedCampgroundId: _id });
}))

router.delete('/:_id', catchAsync(async (req, res) => {
    const { _id } = req.params
    await Campground.findByIdAndDelete(_id)
    res.redirect(`${BASE_URL}/home`)
}))

export default router