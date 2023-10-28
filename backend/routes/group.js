import { Router } from 'express'
import { checkAuth } from '../middlewares/checkAuth.js'
import { createGroup, removeGroup, getGroupById, joinGroup, getAllGroups, uploadGroupAvatar, removeUserFromGroup } from '../controllers/group.js'

const router = new Router()

//create
router.post('/create', checkAuth, createGroup)

//get by ID
router.get('/getgroup/:groupId', getGroupById)

//join
router.post('/:id/join', checkAuth, joinGroup);

//get all
router.get('/getgroups', checkAuth, getAllGroups)

//avatar
router.post('/groupimg', checkAuth, uploadGroupAvatar);

//leave
router.post('/:id/leave', checkAuth, removeUserFromGroup);

//removePost
router.delete('/:id', checkAuth, removeGroup);

export default router