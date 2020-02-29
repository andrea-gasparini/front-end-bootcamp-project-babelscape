export default class AutocompleteConfiguration
{
    private _placeholder : string = 'Inserisci del testo..';
    private _width : number;
    private _restURL : URL;
    private _minTextLength : number = 1;

    constructor(config: {placeholder : string, width? : number, restURL : URL, minTextLength? : number}) 
    {
        if (config.placeholder !== undefined) this._placeholder = config.placeholder;

        if (config.width !== undefined) this._width = config.width;

        if (config.restURL !== undefined) this._restURL = config.restURL;

        if (config.minTextLength !== undefined) this._minTextLength = config.minTextLength;
    }
    
    get placeholder() : string { return this._placeholder; }

    get width() : number { return this._width; }

    get restURL() : URL { return this._restURL; }

    get minTextLength() : number { return this._minTextLength; }
}
