import { Align } from '../align';
import { Alert } from '../alert';
import { TypeUtils } from '../utils';

export default class MessageConfiguration
{
    private _message : string;
    private _width: number;
    private _height: number;
    private _type : Alert = Alert.INFO;
    private _alignText : Align = Align.LEFT;
    private _centered: boolean = true;

    constructor(config: {message : string, width? : number, height? : number, type? : Alert | string, alignText? : Align | string, centered? : boolean})
    {
        if (config.message !== undefined) this._message = config.message;

        if (config.width !== undefined) this._width = config.width;
        if (config.height !== undefined) this._height = config.height;

        if (config.type !== undefined)
            this._type = TypeUtils.isString(config.type) ?
                Alert.fromValue(config.type.toUpperCase()) : config.type;

        if (config.alignText !== undefined)
            this._alignText = TypeUtils.isString(config.alignText) ? 
                Align.fromValue(config.alignText.toUpperCase()) : config.alignText;
        
        if (config.centered !== undefined)
            this._centered = config.centered;
    }

    get message() : string { return this._message; }

    get width(): number { return this._width; }

    get height(): number { return this._height; }

    get type() : Alert { return this._type; }

    get alignText() : Align { return this._alignText; }

    get centered() : boolean { return this._centered; }
}
