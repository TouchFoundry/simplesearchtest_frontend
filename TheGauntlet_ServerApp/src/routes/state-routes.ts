import * as express from "express";
import {model} from "mongoose";

import {IExample} from "../interfaces";
import {Response} from "../models";
import {StateSchema} from "../schemas";
import {BaseRoutes} from "../classes";
import {UtilityHelpers} from "../shared";


/**
 * Created by lukejohnstone on 2017/05/24.
 */

export class StateRoutes extends BaseRoutes {
    private StateModel = model('State', StateSchema);

    protected initRoutes() {
        this.baseUri = '/state';

        this.router.route(this.baseUri).get((req, res) => this.getStates(req, res));
        this.router.route(this.baseUri + "/:interestId").get((req, res) => this.getStateById(req, res));
    }

    private getStates(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            this.StateModel.find().then(states => {
                resolve(new Response(200, "Successful response", {
                    success: true,
                    states: states,
                    count: states.length
                }));
            });
        });

        this.completeRequest(promise, res);
    }

    private getStateById(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            UtilityHelpers.getObjectId(req.params.interestId).then(stateId => {
                this.StateModel.findById(stateId).then(state => {
                    resolve(new Response(200, "Successful response", {
                        success: true,
                        state: state
                    }));
                });

            }).catch(error => reject(new Response(400, "Error, state id is malformed", {
                error: error.toString()
            })));
        });

        this.completeRequest(promise, res);
    }
}