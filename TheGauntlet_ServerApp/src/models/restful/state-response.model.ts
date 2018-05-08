import {StateBaseInterface, StateInterface} from "../../interfaces";

export class StateResponseModel implements StateBaseInterface {
    _id: string;
    name: string;
    wikipediaUrl: string;

    constructor(state?: StateInterface) {
        if (!!state)
            this.fromDocument(state)
    }

    public fromDocument(state: StateInterface) {
        this._id = state._id.toString();
        this.name = state.name;
        this.wikipediaUrl = state.wikipediaUrl;
    }
}