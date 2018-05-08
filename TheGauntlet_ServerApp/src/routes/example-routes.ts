import * as express from "express";
import {model} from "mongoose";

import {IExample} from "../interfaces";
import {Response} from "../models";
import {ExampleSchema} from "../schemas";
import {BaseRoutes} from "../classes";


/**
 * Created by lukejohnstone on 2017/05/24.
 */

export class ExampleRoutes extends BaseRoutes {
    private ExampleModel = model('Example', ExampleSchema);
    //common responses
    private exampleRes: Response = new Response(400, 'Example response', {
        error: 'Example'
    });

    protected initRoutes() {
        this.baseUri = '/example';

        this.router.route(this.baseUri).get((req, res) => this.getExample(req, res));
        this.router.route(this.baseUri).post((req, res) => this.postExample(req, res));
        this.router.route(this.baseUri).put((req, res) => this.putExample(req, res));
    }

    private getExample(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            this.ExampleModel.find().then(exampleItems => {
                resolve(new Response(200, "Successful response", {
                    success: true,
                    items: exampleItems
                }));
            });
        });

        this.completeRequest(promise, res);
    }

    private postExample(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            let newExample = new this.ExampleModel({
                exampleAttr1: req.body.exampleAttr1,
                exampleAttr2: req.body.exampleAttr2,
                exampleAttr3: req.body.exampleAttr3
            });

            newExample.save().then((document: IExample) => {
                resolve(new Response(200, "Successfully added example item", {
                    newItem: document
                }));
            }).catch(error => reject(new Response(500, "Error saving example item", {
                error: error.toString()
            })));
        });

        this.completeRequest(promise, res);
    }

    private putExample(req: express.Request, res: express.Response) {
        let promise: Promise<Response> = new Promise<Response>((resolve, reject) => {
            this.ExampleModel.update({_id: req.body._id}, {}).then(() => {
                resolve(new Response(200, "Successfully updated example item", {
                    updated: true
                }));
            }).catch(error => reject(new Response(500, "Unable to update example item", {
                error: error.toString()
            })));
        });

        this.completeRequest(promise, res);
    }
}