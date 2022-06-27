import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import {GOOGLE_CLIENT_ID, JWT_SECRET} from '../util/secrets'
import UserService from '../services/user'
import JwtStrategy from 'passport-jwt'

const LocalStrategy = passportLocal.Strategy

// google id token
export const googleTokenStrategy = new GoogleTokenStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
    },
    // callback

    async (parsedToken: any, googleId: string, done: any) => {
        // console.log('parsedToken', parsedToken, "\n\ngoogleId", googleId);

        const user = await UserService.findOrCreate(parsedToken);
        done(null, user)
    }
);

export const jwtStrategy = new JwtStrategy.Strategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload: any, done: any) => {
        done(null, payload)
    }
)
