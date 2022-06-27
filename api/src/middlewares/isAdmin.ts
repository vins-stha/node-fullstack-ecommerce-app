import {Request,Response,NextFunction} from "express";
import {ForbiddenError} from "../helpers/apiError";
import  {UserDocument} from "../models/User";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;
    if (user?.isAdmin) {
        next()
    } else {
        throw new ForbiddenError()
    }
};

export default isAdmin
