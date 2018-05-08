import {Winston} from "winston";
import * as express from "express";
import {Response} from "../../models";
import {BaseRoutes} from "../../classes/base-routes";

global.Promise = require('bluebird');

export class BaseRoutesTestHelper extends BaseRoutes {
    public constructor(winston: Winston) {
        super(winston);
    }

    protected initRoutes() {
        this.baseUri = '/test';
        this.router.route(this.baseUri).get((req, res) => this.getTest(req, res));
    }

    private getTest(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            resolve(new Response(200, "test good", null));
        });

        this.completeRequest(promise, res);
    }
}