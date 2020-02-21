import Dimension from "../dimension";
import { Align } from "../align";
import { TypeUtils } from "../utils";

export default class TableConfiguration
{
    private _data : Array<Array<string>>;
    private _dimensions : Dimension = new Dimension();
    private _firstRowHeader: boolean = true;
    private _alignText : Align = Align.CENTER;

    constructor(config: {data : Array<Array<string>>, width? : number, height? : number, firstRowHeader? : boolean, alignText? : Align | string})
    {
        if (config.data !== undefined) this._data = config.data;

        if (config.width !== undefined) this._dimensions.width = config.width;
        if (config.height !== undefined) this._dimensions.height = config.height;

        if (config.firstRowHeader !== undefined) this._firstRowHeader = config.firstRowHeader;

        if (config.alignText !== undefined)
        this._alignText = TypeUtils.isString(config.alignText) ? 
            Align.fromValue(config.alignText.toUpperCase()) : config.alignText;
    }

    get data() : Array<Array<string>> { return this._data; }

    get width(): number { return this._dimensions.width; }

    get height(): number { return this._dimensions.height; }

    get firstRowHeader() : boolean { return this._firstRowHeader; }

    get alignText() : Align { return this._alignText; }
}
