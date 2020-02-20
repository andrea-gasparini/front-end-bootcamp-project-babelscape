import { Align } from '../align';
import { Alert } from '../alert';
import { TypeUtils } from '../utils';
import Dimension from '../dimension';

export default class MessageConfiguration
{
    private _message : string;
    private _dimensions : Dimension = new Dimension();
    private _type : Alert = Alert.INFO;
    private _alignText : Align = Align.LEFT;

    constructor(config: {message : string, width? : number, height? : number, type? : Alert | string, alignText? : Align | string})
    {
        if (config.message !== undefined) this._message = config.message;

        if (config.width !== undefined) this._dimensions.width = config.width;
        if (config.height !== undefined) this._dimensions.height = config.height;

        if (config.type !== undefined)
            this._type = TypeUtils.isString(config.type) ?
                Alert.fromValue(config.type.toUpperCase()) : config.type;

        if (config.alignText !== undefined)
            this._alignText = TypeUtils.isString(config.alignText) ? 
                Align.fromValue(config.alignText.toUpperCase()) : config.alignText;
    }

    get message() : string { return this._message; }

    get width(): number { return this._dimensions.width; }

    get height(): number { return this._dimensions.height; }

    get type() : Alert { return this._type; }

    get alignText() : Align { return this._alignText; }
}
