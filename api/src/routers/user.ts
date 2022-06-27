import express from 'express'
import passport from 'passport'

import {
  getAllUsers,
  createUser,
  findById,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserByEmail
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/user prefix

router.get('/:id', findById);
router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post(
  '/authenticate-user',
  passport.authenticate('google-id-token', { session: false }),
  authenticateUser
)

export default router
