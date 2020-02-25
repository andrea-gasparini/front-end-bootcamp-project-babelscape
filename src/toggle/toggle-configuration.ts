import KeyValue from "../key-value";

export default class ToggleConfiguration
{
    private _value1 : any;
    private _value2 : any;
    private _dataMapper : (value : any) => KeyValue;
    private _onChange : (keyValue : KeyValue) => void;

    constructor(config: {value1 : any, value2 : any, width? : number, height? : number, dataMapper : (value : any) => KeyValue, onChange})
    {
        
    }
}
