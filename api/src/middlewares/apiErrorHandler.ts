import {Request, Response, NextFunction} from 'express'

import ApiError from '../helpers/apiError'
import CustomMongoError from '../helpers/mongoError'

import logger from '../util/logger'

export default function (
    error: ApiError | CustomMongoError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.source) {
        console.log('errour source ', error.source)
        logger.error(error.source)
    } else {
        console.log('errour source  UNKNOWN', error.source)
    }

    console.log('error dtailed', error)
    res.status(error.statusCode).json({
        status: 'error',
        statusCode: error.statusCode || 500,
        message: error.message ||"Something went seriously wrong",
    })
}
