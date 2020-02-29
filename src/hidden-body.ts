import KeyValue, { keyValueToLowerCase } from "./key-value";

export default class HiddenBody
{
    protected _element : JQuery<HTMLUListElement> = $('<ul />');
    protected _values : Array<KeyValue> = new Array();
    protected _liElements : Array<HTMLLIElement> = new Array();

    constructor() { this._element.addClass('hidden-body'); }

    protected createliElement(val : KeyValue) : HTMLLIElement
    {
        let liElement = $('<li />')
            .data('KeyValue', keyValueToLowerCase(val))
            .text(val.value);

        return liElement.get(0) as HTMLLIElement;
    }

    protected addLiElement(liElement : HTMLLIElement) : void
    {
        this._liElements.push(liElement);
        this._element.append(liElement);
    }

    protected isVisible() : boolean { return this._element.is(':visible'); }

    public show() : void { this._element.show(); }

    public hide() : void { this._element.hide(); }

    public toggle() : void { this.isVisible() ? this.hide() : this.show(); }

    get values() : Array<KeyValue> { return this._values; }

    get liElements() : Array<HTMLLIElement> { return this._liElements; }

    get element() : JQuery<HTMLUListElement> { return this._element; }
}