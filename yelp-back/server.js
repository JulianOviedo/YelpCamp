import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import mongoose from 'mongoose'

import ExpressError from './utils/ExpressError.js'
import campgrounds from './routes/campgrounds.js'
import reviews from './routes/reviews.js'

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE IS CONNECTED'))
  .catch(error => console.error('ERROR TRYING TO CONNECT MONGOOSE TO DATABASE', error));

///------****  EXPRESS  ***--------////

const BASE_URL = 'http://localhost:3000'
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:_id/reviews', reviews)


app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.listen(5000, (req, res) => {
  console.log('server listen on port 5000')
})

app.use((err, req, res, next) => {
  console.error(err);
  res.redirect(`${BASE_URL}/error?statusCode=${err.statusCode}&message=${err.message}&stack=${err.stack}`);
}); 