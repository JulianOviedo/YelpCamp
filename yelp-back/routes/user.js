import express from 'express'
import User from '../models/user.js'

const router = express.Router()
const BASE_URL = 'http://localhost:3000'

router.post('/signUp', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        res.json({ isRegistered: true })
    } catch (error) {
        res.status(401).json({ err: error })
    }
})


export default router