import { Router } from 'express'
import {register, login, getMe, uploadAvatar, getAll, getUserById} from '../controllers/auth.js'
import { checkAuth } from '../middlewares/checkAuth.js'
const router = new Router()

//registration
router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)

//getUsers
router.get('/getusers', checkAuth, getAll)

//avatar
router.post('/changeimg', checkAuth, uploadAvatar);

//getUserById
router.get('/getuser/:userId', checkAuth, getUserById);

export default router