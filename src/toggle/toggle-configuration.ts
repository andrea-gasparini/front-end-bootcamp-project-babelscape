import KeyValue from "../key-value";

export default class ToggleConfiguration<T>
{
    private _value1 : T;
    private _value2 : T;
    private _height : number = 25;
    private _color1 : string = 'lightgreen';
    private _color2 : string = 'grey';
    private _dataMapper : (value : T) => KeyValue;
    private _onChange : (keyValue : KeyValue) => void;

    constructor(config: {value1 : T, value2 : T, height? : number, color1? : string, color2? : string, dataMapper : (value : T) => KeyValue, onChange})
    {
        if (config.value1 !== undefined) this._value1 = config.value1;
        if (config.value2 !== undefined) this._value2 = config.value2;

        if (config.height !== undefined) this._height = config.height;

        if (config.color1 !== undefined) this._color1 = config.color1;
        if (config.color2 !== undefined) this._color2 = config.color2;

        if (config.dataMapper !== undefined) this._dataMapper = config.dataMapper;

        if (config.onChange != undefined) this._onChange = config.onChange;
        else this._onChange = (v : KeyValue) => console.log("Valore selezionato: " + v.value);
    }

    get value1() : T { return this._value1; }

    get value2() : T { return this._value2; }

    get height() : number { return this._height; }

    get color1() : string { return this._color1; }

    get color2() : string { return this._color2; }

    get dataMapper() : (value : T) => KeyValue { return this._dataMapper; }

    get onChange() : (keyValue : KeyValue) => void { return this._onChange; }
}
