import { DropdownType } from "../dropdown-type";
import Dimension from "../dimension";
import KeyValue from "../key-value";
import { TypeUtils } from "../utils";

export default class DropdownConfiguration<T>
{
    private _type: DropdownType = DropdownType.SINGLE;
    private _placeholder: string;
    private _data: Array<T> = new Array();
    private _selected: Array<string> = new Array();
    private _dimensions: Dimension = new Dimension();
    private _dataMapper: (elem: T) => KeyValue;
    private _labelMapper: (selectedList: Array<KeyValue>) => string;
    private _onChange: (selectedList: Array<KeyValue>) => void;
    
    constructor(config: {type? : DropdownType | string, placeholder: string, data : Array<T>, selected? : Array<string>, width? : number, height? : number, dataMapper : (elem : T) => KeyValue, labelMapper? : (selectedList : Array<KeyValue>) => string, onChange? : (selectedList : Array<KeyValue>) => void})
    {
        if (config.type !== undefined) 
            this._type = TypeUtils.isString(config.type) ? DropdownType.fromValue(config.type) : config.type;

        if (config.placeholder !== undefined) this._placeholder = config.placeholder;

        if (config.data !== undefined) this._data = config.data;

        if (config.selected !== undefined) this._selected = config.selected;

        if (config.width !== undefined) this._dimensions.width = config.width;
        if (config.height !== undefined) this._dimensions.height = config.height;

        if (config.dataMapper !== undefined) this._dataMapper = config.dataMapper;

        if (config.labelMapper !== undefined) this._labelMapper = config.labelMapper;
        else this._labelMapper = (values : Array<KeyValue>) => values.map((el) => el.value).join(", ");

        if (config.onChange !== undefined) this._onChange = config.onChange;
        else if (this._type == DropdownType.SINGLE) this._onChange = (values : Array<KeyValue>) => console.log("Valore selezionato: " + values.map((el) => el.value).join(", "));
        else if (this._type == DropdownType.MULTI) this._onChange = (values : Array<KeyValue>) => console.log("Valori selezionati: " + values.map((el) => el.value).join(", "));
    }

    get type() : DropdownType { return this._type; }
    
    get placeholder() : string { return this._placeholder; }

    get data() : Array<any> { return this._data; }

    get selected() : Array<string> { return this._selected; }

    get width() : number { return this._dimensions.width; }

    get height() : number { return this._dimensions.height; }

    get dataMapper() : (elem: any) => KeyValue { return this._dataMapper; }

    get labelMapper() : (selectedList: Array<KeyValue>) => string { return this._labelMapper; }

    get onChange() : (selectedList: Array<KeyValue>) => void { return this._onChange; }
}
