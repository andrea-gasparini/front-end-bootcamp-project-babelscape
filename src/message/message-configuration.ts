import { Align } from "../align";
import { Alert } from "../alert";
import { TypeUtils } from "../utils";

export default class MessageConfiguration
{
    private _message : string;
    private _type : Alert = Alert.INFO;
    private _align : Align = Align.LEFT;

    constructor(config: {message : string, type? : Alert | string, align? : Align | string})
    {
        if (config.message !== undefined) this._message = config.message;

        if (config.type !== undefined)
            this._type = TypeUtils.isString(config.type) ?
                Alert.fromValue(config.type.toUpperCase()) : config.type;

        if (config.align !== undefined)
            this._align = TypeUtils.isString(config.align) ? 
                Align.fromValue(config.align.toUpperCase()) : config.align;
    }

    get message() : string { return this._message; }

    get type() : Alert { return this._type; }

    get align() : Align { return this._align; }
}
