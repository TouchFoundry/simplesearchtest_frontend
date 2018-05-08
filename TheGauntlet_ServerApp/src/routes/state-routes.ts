import * as express from "express";
import {model} from "mongoose";

import {StateInterface} from "../interfaces";
import {Response, StateResponseModel} from "../models";
import {StateSchema} from "../schemas";
import {BaseRoutes} from "../classes";
import {Schema, UtilityHelpers} from "../shared";
import * as _ from "lodash";


/**
 * Created by lukejohnstone on 2017/05/24.
 */

export class StateRoutes extends BaseRoutes {
    protected initRoutes() {
        this.baseUri = '/state';

        this.router.route(this.baseUri).get((req, res) => this.getStates(req, res));
        this.router.route(this.baseUri + "/:stateId").get((req, res) => this.getStateById(req, res));
    }

    private getStates(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            Schema.StateModel.find().then((states: StateInterface[]) => {
                resolve(new Response(200, "Successful retrieved all the states", {
                    success: true,
                    states: _.map(states, state => new StateResponseModel(state)),
                    count: states.length
                }));
            });
        });

        this.completeRequest(promise, res);
    }

    private getStateById(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            UtilityHelpers.getObjectId(req.params.stateId).then(stateId => {
                Schema.StateModel.findById(stateId).then((state: StateInterface) => {
                    resolve(new Response(200, "Successful retrieved specified state", {
                        success: true,
                        state: new StateResponseModel(state)
                    }));
                });

            }).catch(error => reject(new Response(400, "Error, state id is malformed", {
                error: error.toString()
            })));
        });

        this.completeRequest(promise, res);
    }
}