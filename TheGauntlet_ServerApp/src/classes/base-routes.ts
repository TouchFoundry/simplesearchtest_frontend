import * as express from "express";
import {Winston} from "winston";
import {Response} from "../models";

export class BaseRoutes {
    protected router: express.Router = express.Router();
    protected baseUri: string = '/base';

    public constructor(protected winston: Winston) {
        this.initRoutes();
    }

    protected initRoutes() {
        throw new Error('Not Implemented');
    }

    /**
     * Simple helper function that wraps the resolving of a route's promise, and passed the result into the express.Response object, triggering the completion of the client's request
     * @param {Promise} promise the promise to be resolved
     * @param {express.Response} res the Express response object that should be interacted with
     * @version 1.0.1
     */
    protected completeRequest(promise: Promise<Response>, res: express.Response): void {
        promise.then(response => {
            res.status(response.code).send(response);
        }).catch(errorResponse => {
            res.status(!Number.isNaN(errorResponse.code) ? errorResponse.code : 500).send(errorResponse);
        });
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}