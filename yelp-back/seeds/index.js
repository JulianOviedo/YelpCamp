import {places, description} from './seedHelpers.js'
import cities from './cities.js'

import mongoose from 'mongoose'
import Campground from '../models/campground.js';

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('SEEDER HAS BEEN EXECUTED'))
  .catch(error => console.error('ERROR TRYING TO CONNECT MONGOOSE TO DATABASE', error));

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]


const seeder = async () => {
    await Campground.deleteMany()
    for (let i=0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 30 + 10)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(description)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus quisquam adipisci qui doloribus quo quos eaque cumque asperiores laudantium illum! Placeat quis animi rem facilis deserunt obcaecati eos quisquam excepturi?',
            price
        })
        await camp.save()
    }
}

seeder();
