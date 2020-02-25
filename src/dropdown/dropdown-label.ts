export default class DropdownLabel
{
    private _element : JQuery<HTMLButtonElement> = $('<button />');
    private _placeholder : string;
    private _labelText : string;
    private _labelTextElement : JQuery<HTMLSpanElement> = $('<span />');
    private readonly _dropdownIcon : JQuery<HTMLElement> = $('<i class="fas fa-sort-down"></i>');

    constructor(labelText : string, dropdownBodyElement : JQuery<HTMLElement>) 
    {
        this.labelText = labelText;
        this._element
            .addClass('dropdown-label')
            .append(this._dropdownIcon)
            .append(this._labelTextElement)
            .click(() =>
                {
                    dropdownBodyElement.toggle();
                    if (dropdownBodyElement.is(':visible')) 
                        dropdownBodyElement.find('input[type=text]').focus();
                });
    }

    set labelText(labelText : string)
    {
        this._labelText = labelText;
        this._labelTextElement.text(labelText);
    }

    get element() : JQuery<HTMLButtonElement>
    {
        return this._element;
    }
}