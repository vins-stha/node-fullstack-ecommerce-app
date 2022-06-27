import {MongoError} from "mongodb";
import ApiError from "./apiError";

export default class CustomMongoError extends MongoError {
    readonly statusCode: number ;
    readonly message: string;
    readonly source?: Error;

    constructor(statusCode: number, message: string, source: Error|any)
    {
       super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class ItemAlreadyExist extends CustomMongoError {
    constructor(statusCode: number, message: string,source: Error|any)
    {
        super( 400, "Items exits yaar", message);

    }
}

export class DuplicateEntryError extends CustomMongoError {
    constructor(readonly message: string ="Duplicate index", source?: Error | any) {
        super(400, message, message)

    }
}

