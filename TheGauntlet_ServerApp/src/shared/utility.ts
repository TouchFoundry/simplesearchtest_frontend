/**
 * Created by lukejohnstone on 2017/06/27.
 */

import _ = require('lodash');
import {Types} from "mongoose";

export class UtilityHelpers {

    /**
     * Validate that an object against the specified properties array. Values in the object, per key, must be truthy
     * @param targetObj Object to be validated
     * @param {string[]} requiredProperties list of properties that should appear in the target object
     * @returns {boolean} the result of the checks, TRUE means the properties have truthy values
     * @version 1.0.2
     */
    public static hasProperties(targetObj: {}, requiredProperties: string[]): boolean {
        let requiredValues = _.pick(targetObj, requiredProperties);

        if (Object.keys(requiredValues).length < requiredProperties.length)
            return false;

        for (let property of requiredProperties)
            if (!targetObj[property])
                return false;

        return true;
    }

    /**
     * Casts a string to a Mongoose ObjectId. This wrapper allows us to manage incorrect id strings neatly
     * @param {string} _id the string received from a request
     * @returns {Promise<"mongoose".Types.ObjectId>} returns a mongoose ObjectId
     * @version 1.0.1
     */
    public static getObjectId(_id: string): Promise<Types.ObjectId> {
        return new Promise<Types.ObjectId>((resolve, reject) => {
            try {
                resolve(Types.ObjectId(_id));
            } catch (e) {
                reject(e);
            }
        });
    }
}