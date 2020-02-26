import { timingSafeEqual } from "crypto";
import DropdownBody from "./dropdown-body";
import KeyValue from "../key-value";
import { DropdownType } from "../dropdown-type";

export default class DropdownLabel<T>
{
    private _element : JQuery<HTMLButtonElement> = $('<button />');
    private _placeholder : string;
    private _labelText : string;
    private _labelTextElement : JQuery<HTMLSpanElement> = $('<span />');
    private _labelMapper : (selectedList: Array<KeyValue>) => string;
    private readonly _dropdownIcon : JQuery<HTMLElement> = $('<i class="fas fa-sort-down"></i>');

    constructor(placeholder : string, labelMapper : (selectedList: Array<KeyValue>) => string) 
    {
        this._placeholder = placeholder;
        this._labelMapper = labelMapper;

        this.render();
    }

    private render() : void
    {
        this._element
        .addClass('dropdown-label')
        .append(this._dropdownIcon)
        .append(this._labelTextElement);
    }

    setDropdownBody(dropdownBody : DropdownBody<T>)
    {
        this.labelText = dropdownBody.selectedValues.length == 0 ? 
            this._placeholder :
            dropdownBody.type == DropdownType.MULTI ?
                this._labelMapper(dropdownBody.selectedValues) :
                this._labelMapper(new Array(dropdownBody.selectedValues[0]));

        this._element.click(() =>
            {
                dropdownBody.toggle();
                if (dropdownBody.isVisible())
                    dropdownBody.filterElement.focus();
            });
    }

    set labelText(labelText : string)
    {
        this._labelText = labelText;
        this._labelTextElement.text(labelText);
    }

    get placeholder() : string { return this._placeholder; }

    get labelText() : string { return this._labelText; }

    get labelTextElement() : JQuery<HTMLSpanElement> { return this._labelTextElement; }

    get labelMapper() : (selectedList: Array<KeyValue>) => string { return this._labelMapper; }

    get element() : JQuery<HTMLButtonElement> { return this._element; }
}