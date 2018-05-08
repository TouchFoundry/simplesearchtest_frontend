import {Winston} from "winston";
import * as Bull from "bull";
import {Job, JobOptions} from "bull";
import {Config, Constants} from "../shared";
import {SettingSchema} from "../schemas";
import {model} from "mongoose";
import {ProductDataClientRpcModule} from "./product-data-client-rpc.module";
import {ISetting, ISettingsSyncRpcResponse} from "../interfaces";
import {SettingRpcResponse} from "../models/rpc";
import * as _ from "lodash";
import moment = require("moment");

export class SettingSeedModule {
    private SettingModel = model('Setting', SettingSchema);

    private settingSeedQueueOptions: Bull.QueueOptions = {
        redis: {
            host: Config.bull.redis.host,
            port: Number.parseInt(Config.bull.redis.port)
        }
    };

    private settingSeedQueue: Bull.Queue;

    constructor(private winston: Winston, private testMode: boolean = false, private productDataClientRpcModule: ProductDataClientRpcModule) {
        if (process.env.DO_SEED_SETTINGS && !testMode) {
            this.settingSeedQueue = new Bull(Config.bull.queues.settingSeed.name, this.settingSeedQueueOptions);
            this.settingSeedQueue.process((job) => this.doSeedProcess(job));
            this.settingSeedQueue.resume().then(() => this.winston.info('Settings seed queue started'));

            this.addSeedJob();
        }
    }

    private doSeedProcess(job: Job) {
        return new Promise<ISettingsSyncRpcResponse>((resolve, reject) => {
            let time = moment().format('X');

            this.SettingModel.findOneAndUpdate({key: Constants.settingNames.storeOpening}, {
                key: Constants.settingNames.storeOpening,
                value: Config.serviceSettings.settingsDefaultValues.storeOpening,
                lastUpdated: time,
                updatedBy: "SEEDED",
                active: true
            }, {upsert: true}).then(() => job.progress(5).then(() => this.SettingModel.findOneAndUpdate({key: Constants.settingNames.storeClosing}, {
                key: Constants.settingNames.storeClosing,
                value: Config.serviceSettings.settingsDefaultValues.storeClosing,
                lastUpdated: time,
                updatedBy: "SEEDED",
                active: true
            }, {upsert: true}).then(() => job.progress(10).then(() => this.SettingModel.findOneAndUpdate({key: Constants.settingNames.alcoholOpening}, {
                key: Constants.settingNames.alcoholOpening,
                value: Config.serviceSettings.settingsDefaultValues.alcoholOpening,
                lastUpdated: time,
                updatedBy: "SEEDED",
                active: true
            }, {upsert: true}).then(() => job.progress(15).then(() => this.SettingModel.findOneAndUpdate({key: Constants.settingNames.alcoholClosing}, {
                key: Constants.settingNames.alcoholClosing,
                value: Config.serviceSettings.settingsDefaultValues.alcoholClosing,
                lastUpdated: time,
                updatedBy: "SEEDED",
                active: true
            }, {upsert: true}).then(() => job.progress(40).then(() => {
                this.winston.info("Successfully seeded settings");
                this.SettingModel.find({
                    active: true,
                    updatedBy: "SEEDED",
                    lastUpdated: time
                }).then((settings: ISetting[]) => job.progress(75).then(() => {
                    this.winston.info("updating user product service");
                    this.productDataClientRpcModule.doSyncSettings({
                        settings: _.map(settings, setting => new SettingRpcResponse(setting))
                    }).then(() => job.progress(100).then(() => resolve({
                        success: true
                    }))).catch(error => reject(error));
                })).catch(error => reject(error));
            })).catch(error => reject(error)))).catch(error => reject(error)))).catch(error => reject(error)))).catch(error => reject(error));
        });
    }

    private addSeedJob() {
        let jobOpts: JobOptions = {
            attempts: Config.bull.queues.settingSeed.maxRetries,
            backoff: Config.bull.queues.settingSeed.backoffPeriod,
            delay: Config.bull.queues.settingSeed.initDelay,
            timeout: Config.bull.queues.settingSeed.timeout
        };

        this.settingSeedQueue.add({}, jobOpts)
            .then((job) => this.winston.info('Added setting seed job', {
                job: job.id
            }))
            .catch(error => this.winston.error('Unable to add setting seed job', {
                error: error
            }));
    }
}