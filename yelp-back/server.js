import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import { campgroundSchema, reviewSchema } from './schemas.js'

import catchAsync from './utils/catchAsync.js'
import Campground from './models/campground.js';
import Review from './models/review.js'
import ExpressError from './utils/ExpressError.js'

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE IS CONNECTED'))
  .catch(error => console.error('ERROR TRYING TO CONNECT MONGOOSE TO DATABASE', error));


const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body)
  if (error) {
    const msg = error.details.map(el => el.message).join('.')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

///------****  EXPRESS  ***--------////

const BASE_URL = 'http://localhost:3000'
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.listen(5000, (req, res) => {
  console.log('server listen on port 5000')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({})
  res.send(campgrounds)
}))

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
  const newCampground = new Campground(req.body.campground)
  await newCampground.save()
  res.redirect(`${BASE_URL}/campgrounds/${newCampground._id}`)
}))

app.post('/campgrounds/:_id/reviews', validateReview, async (req, res) => {
  const { _id } = req.params
  const campground = await Campground.findById(_id)
  const newReview = new Review(req.body.review)

  console.log(newReview)
  campground.review.push(newReview)
  await newReview.save()
  await campground.save()
  res.redirect(`${BASE_URL}/campgrounds/${_id}`)
})


app.get('/campgrounds/:_id', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params._id).populate('review')
  res.send({ campground })
}))

app.put('/campgrounds/:_id', catchAsync(async (req, res) => {
  const { _id } = req.params
  await Campground.findByIdAndUpdate(_id, { ...req.body.campground })
  res.redirect(`${BASE_URL}/campgrounds/${_id}`)
}))

app.delete('/campgrounds/:_id', catchAsync(async (req, res) => {
  const { _id } = req.params
  await Campground.findByIdAndDelete(_id)
  res.redirect(`${BASE_URL}/`)
}))

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
  console.error(err);
  res.redirect(`${BASE_URL}/error?statusCode=${err.statusCode}&message=${err.message}&stack=${err.stack}`);
}); 