export default class DropdownBody
{
    private _element : JQuery<HTMLUListElement> = $('<ul />');
    private _bodyFilterElement : JQuery<HTMLInputElement> = $('<input />');
    private _liElements : Array<HTMLLIElement> = new Array();

    constructor()
    {
        this._bodyFilterElement
            .prop('type', 'text')
            .prop('placeholder', 'Cerca..')
            .on('input', () => this.filterSearch());

        this._element
            .addClass('dropdown-body')
            .append(this._bodyFilterElement);
    }

    addLiElement(liElement : HTMLLIElement) : void
    {
        this._liElements.push(liElement);
        this._element.append(liElement);
    }

    filterSearch() : void
    {
        let input : string = this._bodyFilterElement.val() as string;

        for (let i = 0; i < this._liElements.length; i++)
            if ($(this._liElements[i]).data('KeyValue').value.includes(input.toLowerCase()))
                $(this._liElements[i]).show();
            else
                $(this._liElements[i]).hide();
    }

    show() : void { this._element.show(); }

    hide() : void { this._element.hide(); }

    toggle() : void { this._element.toggle(); }

    get liElements() : Array<HTMLLIElement>
    {
        return this._liElements;
    }

    get filterElement() : JQuery<HTMLInputElement>
    {
        return this._bodyFilterElement;
    }

    get element() : JQuery<HTMLUListElement>
    {
        return this._element;
    }
}