/**
 * Created by Luke on 2017/06/01.
 */
import {Document} from "mongoose";
import {StateBaseInterface} from "./state-base.interface";

export interface StateInterface extends Document, StateBaseInterface {
    name: string;
    wikipediaUrl: string;
}