/**
 * This test will see if the service actually starts
 */

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {suite, test} from "mocha-typescript";
import {Response} from "../models";
import {GauntletService} from "../service";
import {Config} from "../shared";
import chaiHttp = require('chai-http');

chai.use(chaiAsPromised);
chai.use(chaiHttp);


@suite('Service Main Class')
class MainAppTest {
    private static templateService: GauntletService;

    static before() {
        this.templateService = new GauntletService(true, !!process.env.TEST_HAS_DB);
        this.templateService.start();
    }

    @test('mainAppHealthCheckRoute - try hit the hc route')
    public mainAppHealthCheckRoute(done) {
        setTimeout(() => {
            chai.request('http://localhost:' + Config.apiSettings.port).get(Config.apiSettings.healthCheck)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.deep.equal(new Response(200, 'Healthy', {
                        healthy: true
                    }));
                    done();
                });
        }, 200);
    }

    //example : hit an unauthorized route
    // @test('mainAppUnauthorizedRoute - try hit a route that will be unauthorized')
    // public mainAppUnauthorizedRoute(done) {
    //     chai.request('http://localhost:4895').get(Config.apiSettings.baseApiUri)
    //         .end((err, res) => {
    //             chai.expect(res).to.have.status(403);
    //             chai.expect(res.body).to.deep.equal(new Response(403, 'No access token provided', null));
    //             done();
    //         });
    // }

}