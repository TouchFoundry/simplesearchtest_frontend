import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {suite, test} from "mocha-typescript";
import {BaseRoutesTestHelper} from "./base-routes-test-helper";
import * as sinon from "sinon";
import {Response} from "../../models";
import chaiHttp = require('chai-http');
import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");

chai.use(chaiAsPromised);
chai.use(chaiHttp);

@suite('Base Route Class Suite')
class BaseRoutesTest {
    private static express: any;

    //setup express and the routes
    static before() {
        let winston: any = sinon.mock({});

        this.express = express();
        this.express.use(cors());
        this.express.use(bodyParser.json({}));

        let baseRoutesTestHelper = new BaseRoutesTestHelper(winston);
        this.express.use(baseRoutesTestHelper.getRoutes());
        this.express.listen(2525);
    }

    constructor() {
    }

    @test('baseRouterValidTest - try a valid route')
    public baseRouterValidTest(done) {
        chai.request(BaseRoutesTest.express).get('/test')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.deep.equal(new Response(200, 'test good', null));
                done();
            });
    }

    @test('baseRouterInvalidTest - try an invalid route')
    public baseRouterInvalidTest(done) {
        chai.request(BaseRoutesTest.express).get('/doesNotExist')
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
                done();
            });
    }
}

