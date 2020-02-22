import { State } from "../state";
import Dimension from "../dimension";
import { TypeUtils } from "../utils";

export default class ButtonConfiguration
{
    private _text : string;
    private _icon : JQuery;
    private _dimensions : Dimension = new Dimension();
    private _initialState : State = State.READY;
    private _onClick : (event : JQuery.Event) => void;

    constructor(config : {text : string, icon? : JQuery, width?: number, height? : number, initialState? : State | string, onClick? : (param : JQuery.Event) => void})
    {
        if (config.text !== undefined) this._text = config.text;

        if (config.icon !== undefined) this._icon = config.icon;

        if (config.width !== undefined) this._dimensions.width = config.width;
        if (config.height !== undefined) this._dimensions.height = config.height;

        if (config.initialState !== undefined) 
            this._initialState = TypeUtils.isString(config.initialState) ? State.fromValue(config.initialState) : config.initialState;

        if (config.onClick !== undefined) this._onClick = config.onClick;
    }

    get text() { return this._text; }

    get icon() { return this._icon; }

    get width() { return this._dimensions.width; }
    
    get height() { return this._dimensions.height; }

    get initialState() { return this._initialState; }

    get onClick() { return this._onClick; }
}
