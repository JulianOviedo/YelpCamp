import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import User from './models/user.js'

import ExpressError from './utils/ExpressError.js'
import campgroundsRoutes from './routes/campgrounds.js'
import reviewsRoutes from './routes/reviews.js'
import userRoutes from './routes/user.js'

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE IS CONNECTED'))
  .catch(error => console.error('ERROR TRYING TO CONNECT MONGOOSE TO DATABASE', error));

///------****  EXPRESS  ***--------////

const BASE_URL = 'http://localhost:3000/'
const app = express()

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/user', userRoutes)
app.use('/campgrounds', campgroundsRoutes)
app.use('/campgrounds/:_id/reviews', reviewsRoutes)


app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.listen(5000, (req, res) => {
  console.log('server listen on port 5000')
})

app.use((err, req, res, next) => {
  console.error('ERROR !', err);
  res.status(500).json({
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  });
}); 