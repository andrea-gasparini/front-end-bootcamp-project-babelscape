import KeyValue from "../key-value";
import Dimension from "../dimension";

export default class ToggleConfiguration<T>
{
    private _value1 : T;
    private _value2 : T;
    private _dimensions : Dimension = new Dimension();
    private _dataMapper : (value : T) => KeyValue;
    private _onChange : (keyValue : KeyValue) => void;

    constructor(config: {value1 : T, value2 : T, width? : number, height? : number, dataMapper : (value : T) => KeyValue, onChange})
    {
        if (config.value1 !== undefined) this._value1 = config.value1;
        if (config.value2 !== undefined) this._value2 = config.value2;

        if (config.width !== undefined) this._dimensions.width = config.width;
        if (config.height !== undefined) this._dimensions.height = config.height;

        if (config.dataMapper !== undefined) this._dataMapper = config.dataMapper;

        if (config.onChange != undefined) this._onChange = config.onChange;
        else this._onChange = (v : KeyValue) => console.log("Valore selezionato " + v.value);
    }
}
