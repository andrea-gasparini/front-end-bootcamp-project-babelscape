import DropdownConfiguration from "./dropdown-configuration";
import { DropdownType } from "../dropdown-type";
import { closeOnOutsideClick } from "../utils";
import KeyValue from "../key-value";
import "./dropdown.scss";

export default class Dropdown
{
    private _element : HTMLElement;
    private _configuration : DropdownConfiguration;
    private _values : Array<KeyValue> = new Array();
    private _selectedValues : Array<KeyValue> = new Array();
    private _dropdownElement : JQuery<HTMLElement> = $('<div />');
    private _dropdownLabelElement : JQuery<HTMLButtonElement> = $('<button />');
    private _dropdownBodyElement : JQuery<HTMLUListElement> = $('<ul />');
    private readonly _dropdownIcon : JQuery<HTMLElement> = $('<i class="fas fa-sort-down"></i>');

    constructor(element: HTMLElement, config: DropdownConfiguration)
    {
        this._element = element;
        this._configuration = config;

        for (let element of config.data)
            this._values.push(config.dataMapper(element));

        for (let selectedValue of config.selected)
            this._selectedValues.push(this._values.find((elem) => elem.value == selectedValue));

        this.render();
    }

    private render() : void
    {
        this._dropdownElement
            .addClass('dropdown')
            .addClass(DropdownType.toCssClass(this._configuration.type))
            .append(this._dropdownLabelElement)
            .append(this._dropdownBodyElement);
        
        this._dropdownLabelElement
            .addClass('dropdown-label')
            .append(this._dropdownIcon)
            .append($('<span />')
                .text(this._selectedValues.length == 0 ? this._configuration.placeholder : this._configuration.labelMapper(this._selectedValues)))
            .click(() => 
                {
                    this._dropdownBodyElement.toggle();
                    this._dropdownBodyElement.find('input[type=text]').focus()
                });

        this._dropdownBodyElement
            .addClass('dropdown-body')
            .append($('<input />')
                .prop('type', 'text')
                .prop('placeholder', 'Cerca..')
                .on('input', () => this.filterSearch()));

        $(document).on('mouseup', (event : JQuery.MouseUpEvent) => closeOnOutsideClick(event, this._dropdownBodyElement));

        for (let value of this._values)
        {
            let listElement : JQuery<HTMLElement> = $('<li />')
                .prop('name', value.value)
                .text(value.value)
                .on('click', (e : JQuery.ClickEvent) => this.updateSelection(listElement, e));

            let isSelected = this._configuration.selected.find(el => el.toLowerCase() == value.value.toLowerCase());

            if (isSelected) listElement.addClass('selected');

            if (this._configuration.type == DropdownType.MULTI)
                listElement
                    .prepend($('<input />')
                        .prop('type', 'checkbox')
                        .prop('checked', isSelected));

            this._dropdownBodyElement.append(listElement);
        }

        if (this._configuration.width !== undefined)
            this._dropdownElement.css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            this._dropdownElement.css('height', this._configuration.height + 'px');

        $(this._element).append(this._dropdownElement);
    }

    private filterSearch() : void
    {
        let liElements : JQuery<HTMLUListElement> = this._dropdownBodyElement.find('li');

        let input : string = this._dropdownBodyElement.find('input[type=text]').val() as string;

        for (let i = 0; i < liElements.length; i++)
            if ($(liElements[i]).prop('name').toLowerCase().includes(input.toLowerCase()))
                $(liElements[i]).show();
            else
                $(liElements[i]).hide();
    }

    private updateSelection(listElement : JQuery<HTMLElement>, e : JQuery.ClickEvent) : void
    {  
        if (this._configuration.type == DropdownType.MULTI)
        {
            let checkBox = listElement.find('input');

            if (checkBox.prop('checked'))
            {
                this._selectedValues = this._selectedValues.filter(el => el.value.toLowerCase() != listElement.prop('name').toLowerCase());
                this._dropdownLabelElement.find('span').text(this._selectedValues.length == 0 ? this._configuration.placeholder : this._configuration.labelMapper(this._selectedValues));
            }
            else
            {
                this._selectedValues.push(this._values.find(el => el.value.toLowerCase() == listElement.prop('name').toLowerCase()));
                this._dropdownLabelElement.find('span').text(this._configuration.labelMapper(this._selectedValues));
            }

            if (e.target.tagName != 'input')
                checkBox.prop('checked', ! checkBox.prop('checked'));
        }
        else
        {
            this._dropdownBodyElement.find('li').removeClass('selected');
            this._selectedValues[0] = this._values.find(el => el.value.toLowerCase() == listElement.prop('name').toLowerCase());
            this._dropdownLabelElement.find('span').text(this._configuration.labelMapper(this._selectedValues));
            this._dropdownBodyElement.hide();
        }

        listElement.toggleClass('selected');

        this._configuration.onChange(this._selectedValues);
    }
}
