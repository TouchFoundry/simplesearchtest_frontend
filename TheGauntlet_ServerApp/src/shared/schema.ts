import {model} from "mongoose";
import {StateSchema} from "../schemas";

export class Schema {
    static StateModel = model("State", StateSchema);
}