import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.listen(5000, (req, res) => {
    console.log('server listen on port 5000')
})

app.get('/api',  (req, res) => {
    res.send('testing port')
})