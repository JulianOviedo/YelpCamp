const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.listen(5000, (req, res) => {
    console.log('server listen on port 5000')
})

app.get('/api',  (req, res) => {
    res.send('qonda')
})