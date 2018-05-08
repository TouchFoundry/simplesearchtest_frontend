import * as express from "express";
import {Response} from "../models";
import {BaseRoutes} from "../classes";
import {Config} from "../shared";


/**
 * all micro services should have a health check.
 * Created by lukejohnstone on 2017/05/24.
 */

export class HealthCheckRoutes extends BaseRoutes {
    protected initRoutes() {
        this.baseUri = Config.apiSettings.healthCheck;

        this.router.route(this.baseUri).get((req, res) => this.doHealthCheck(req, res));
    }

    private doHealthCheck(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve) => {
            resolve(new Response(200, "Healthy", {
                healthy: true
            }));
        });

        this.completeRequest(promise, res);
    }
}