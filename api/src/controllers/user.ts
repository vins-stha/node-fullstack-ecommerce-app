import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import User, {UserDocument} from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    res.json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, address, email, phone } = req.body
    const user = new User({ username, address, email, phone })
    await UserService.create(user)
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await UserService.find(req.params.id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.deleteById(req.params.id)

    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await UserService.updateByName(id, req.body)

    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const getUserByEmail = async (  req: Request,
                                       res: Response,
                                       next: NextFunction)=>{
  try{
    const user = await UserService.findUserByEmail(req.params.email);
    res.json(user)
  }catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }

  }

}
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log('REQUEST from user=>', JWT_SECRET)
    const user = req.user as UserDocument
    const jwtToken = await jwt.sign(
      {
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET
    );

    res.json({ user: user, jwtToken: jwtToken })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
