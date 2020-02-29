import { ModalType } from "../modal-type";
import { TypeUtils } from "../utils";

export default class ModalConfiguration
{
    private _type : ModalType = ModalType.DIALOG;
    private _header : string | JQuery;
    private _body : string | JQuery;
    private _onConfirm : () => void;

    constructor(config: {type : ModalType | string, header : string | JQuery, body : string | JQuery, onConfirm? : () => void}) 
    {
        if (config.type !== undefined)
            this._type = TypeUtils.isString(config.type) ? ModalType.fromValue(config.type) : config.type;

        if (config.header !== undefined) this._header = config.header;

        if (config.body !== undefined) this._body = config.body;

        if (this._type == ModalType.CONFIRM)
            if (config.onConfirm !== undefined) this._onConfirm = config.onConfirm;
            else this._onConfirm = () => console.log('conferma!');
    }
    
    get type() : ModalType { return this._type; }

    get header() : string | JQuery { return this._header; }

    get body() : string | JQuery { return this._body; }

    get onConfirm() : () => void { return this._onConfirm; }
}
