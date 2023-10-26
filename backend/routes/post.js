import { Router } from 'express'
import {register, login, getMe} from '../controllers/auth.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import { createPost, getAll, getById, 
    likePost, getUserPostById, removePost, getPostComment } from '../controllers/posts.js'
const router = new Router()

//create Post
router.post('/', checkAuth, createPost)

//all
router.get('/', checkAuth, getAll)

//byId
router.get('/:id', getById)

//like
router.post('/:id/like', checkAuth, likePost);

//myPosts
router.get('/user/me', checkAuth, getUserPostById)

//removePost
router.delete('/:id', checkAuth, removePost);

//getPostComment
router.get('/comments/:id', getPostComment);




export default router