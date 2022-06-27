import express, { Request, Response } from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import categoryRouter from './routers/category'
import brandRouter from './routers/brand'
import userRouter from './routers/user'
import productRouter from './routers/product'
import orderRouter from './routers/order'
import productOrderRouter from './routers/productOrder'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import passport from 'passport'
import cors from 'cors'
import { googleTokenStrategy, jwtStrategy } from './config/passport'
dotenv.config({ path: '.env' })
const app = express()
const router = express.Router()

// Express configuration
app.set('port', process.env.PORT || 3010)

// Global middleware
app.use(apiContentType)
app.use(express.json());

// CORS handler
const corsOptions = {
    "origin":"*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true
};

app.use(cors(corsOptions))

// authentication strategy for user with google
app.use(passport.initialize())
passport.use(googleTokenStrategy)
passport.use(jwtStrategy)

// Set up routers

app.use(
  '/api/v1/movies',
  passport.authenticate('jwt', { session: false }),
  movieRouter
);

app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/productOrders', productOrderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
