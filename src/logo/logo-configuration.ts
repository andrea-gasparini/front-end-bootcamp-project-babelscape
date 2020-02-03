import { Align } from "../align";
import { TypeUtils } from "../utils";

export default class LogoConfiguration
{
    private _url: string;
    private _width: number;
    private _height: number;
    private _align: Align = Align.LEFT;

    constructor(config: { url: string, width: number, height: number, align: string | Align })
    {
        if (config.url !== undefined) this._url = config.url;
        if (config.width !== undefined) this._width = config.width;
        if (config.height !== undefined) this._height = config.height;
        if (config.align !== undefined)
        {
            this._align = (TypeUtils.isString(config.align))
                ? Align.fromValue(config.align)
                : config.align;
        }
    }

    get url(): string
    {
        return this._url;
    }

    get width(): number
    {
        return this._width;
    }

    get height(): number
    {
        return this._height;
    }

    get align(): Align
    {
        return this._align;
    }
}