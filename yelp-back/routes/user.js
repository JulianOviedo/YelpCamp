import express from 'express'
import User from '../models/user.js'

const router = express.Router()

router.post('/signUp', async (req, res) => {
    try {
        const { email, username, password } = req.body
        console.log('llego')
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        console.log(registeredUser)
        res.json({ isRegistered: true })
    } catch (error) {
        res.json({ err: error })
    }

})


export default router
