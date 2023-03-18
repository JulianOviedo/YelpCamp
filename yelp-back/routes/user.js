import express from 'express'
import passport from 'passport'
import User from '../models/user.js'

const router = express.Router()
const BASE_URL = 'http://localhost:3000'

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

router.post('/logIn', passport.authenticate('local', { failWithError: true }), async (req, res) => {
    res.json({ qonda: 'qonda' })
})
export default router
