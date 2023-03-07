import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import Joi from 'joi'

import catchAsync from './utils/catchAsync.js'
import Campground from './models/campground.js';
import ExpressError from './utils/ExpressError.js'

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE IS CONNECTED'))
  .catch(error => console.error('ERROR TRYING TO CONNECT MONGOOSE TO DATABASE', error));



///------****  EXPRESS  ***--------////

const BASE_URL = 'http://localhost:3000'
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.listen(5000, (req, res) => {
    console.log('server listen on port 5000')
})

app.get('/campgrounds',catchAsync( async (req, res) => {
  const campgrounds = await Campground.find({})
  res.send(campgrounds)
}))

app.post('/campgrounds', catchAsync( async (req, res, next) => {
  const campgroundSchema = Joi.object({
    campground : Joi.object({
      title: Joi.string().required(),
      price : Joi.number().min(0).required(),
      description : Joi.string().required,
      location : Joi.string().required(),
      image : Joi.string().required()
    }).required()
  })
  const { error } = campgroundSchema.validate(req.body)
  if(error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  }
  const newCampground = new Campground(req.body.campground)
  await newCampground.save()
  res.redirect(`${BASE_URL}/campgrounds/${newCampground._id}`)
}))


app.get('/campgrounds/:_id',catchAsync( async (req, res ) => {
  const campground = await Campground.findById(req.params._id)
  res.send({campground})
}))

app.put('/campgrounds/:_id',catchAsync( async (req,res) => {
  const {_id} = req.params
  await Campground.findByIdAndUpdate(_id, {...req.body.campground})
  res.redirect(`${BASE_URL}/campgrounds/${_id}`)
}))

app.delete('/campgrounds/:_id',catchAsync( async (req,res) => {
  const {_id} = req.params
  await Campground.findByIdAndDelete(_id)
  res.redirect(`${BASE_URL}/`)
}))

// app.all('*', (req, res, next) => {
//   next(new ExpressError('Page not found', 404))
// })

app.use((err, req, res, next) => {
  console.error(err);
  res.redirect(`${BASE_URL}/error?statusCode=${err.statusCode}&message=${err.message}&stack=${err.stack}`);
}); 