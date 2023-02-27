import express from 'express'
import cors from 'cors'

import mongoose from 'mongoose'
import Campground from './models/campground.js';

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE IS CONNECTED'))
  .catch(error => console.error('ERROR TRYING TO CONNECT MONGOOSE TO DATABASE', error));



///------****  EXPRESS  ***--------------////

const app = express()

app.use(cors())

app.listen(5000, (req, res) => {
    console.log('server listen on port 5000')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title:'my first campground'})
    await camp.save()
    res.send(camp)
})