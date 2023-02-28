import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'

import mongoose from 'mongoose'
import Campground from './models/campground.js';

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

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({})
  res.send(campgrounds)
})

app.post('/campgrounds', async (req, res) => {
  const newCampground = new Campground(req.body.campground)
  await newCampground.save()
  res.redirect(`${BASE_URL}/campgrounds/${newCampground._id}`)
})


app.get('/campgrounds/:_id', async (req, res ) => {
  const campground = await Campground.findById(req.params._id)
  res.send({campground})
})

app.put('/campgrounds/:_id', async (req,res) => {
  const {_id} = req.params
  console.log(_id)
  console.log(req.body.campground)
  await Campground.findByIdAndUpdate(_id, {...req.body.campground})
  res.redirect(`${BASE_URL}/campgrounds/${_id}`)
})