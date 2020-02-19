import Dimension from "../dimension";

export default class TableConfiguration
{
    private _data : Array<Array<string>>;
    private _dimensions : Dimension = new Dimension();
    private _firstRowHeader: boolean = true;

    constructor(config: {data : any, width? : number, height? : number, firstRowHeader? : boolean})
    {
        if (config.data !== undefined) this._data = config.data;

        if (config.width !== undefined) this._dimensions.width = config.width;
        if (config.height !== undefined) this._dimensions.height = config.height;

        if (config.firstRowHeader !== undefined) this._firstRowHeader = config.firstRowHeader;
    }

    get data() : Array<Array<any>> { return this._data; }

    get width(): number { return this._dimensions.width; }

    get height(): number { return this._dimensions.height; }

    get firstRowHeader() : boolean { return this._firstRowHeader; }
}
