import DropdownConfiguration from "./dropdown-configuration";
import DropdownLabel from "./dropdown-label";
import DropdownBody from "./dropdown-body";
import { DropdownType } from "../dropdown-type";
import { closeOnOutsideClick } from "../utils";
import KeyValue, { keyValueToLowerCase } from "../key-value";
import "./dropdown.scss";

export default class Dropdown<T>
{
    private _element : HTMLElement;
    private _configuration : DropdownConfiguration<T>;
    private _values : Array<KeyValue> = new Array();
    private _selectedValues : Array<KeyValue> = new Array();
    private _dropdownElement : JQuery<HTMLElement> = $('<div />');
    private _dropdownLabel : DropdownLabel;
    private _dropdownBody : DropdownBody;

    constructor(element: HTMLElement, config: DropdownConfiguration<T>)
    {
        this._element = element;
        this._configuration = config;
        this._dropdownBody = new DropdownBody();

        let labelText : string = this._selectedValues.length == 0 ? this._configuration.placeholder : this._configuration.labelMapper(this._selectedValues);
        this._dropdownLabel = new DropdownLabel(labelText, this._dropdownBody.element); 

        for (let val of config.data)
            this._values.push(config.dataMapper(val));

        for (let selectedValue of config.selected)
            this._selectedValues.push(this._values.find((el) => el.key == selectedValue));

        this.render();
    }

    private render() : void
    {     
        $(document).on('click', (event : JQuery.ClickEvent) => closeOnOutsideClick(event, this._dropdownElement.get(0), this._dropdownBody.element));

        for (let val of this._values)
            {
                let liElement = $('<li />')
                    .data('KeyValue', keyValueToLowerCase(val))
                    .text(val.value)
                    .on('click', (event : JQuery.ClickEvent) => this.updateSelection(liElement, event));

                let isSelected = this._selectedValues.find(el => el.key.toLowerCase() == val.key.toLowerCase());

                if (isSelected) liElement.addClass('selected');

                if (this._configuration.type == DropdownType.MULTI)
                    liElement
                        .prepend($('<input />')
                            .prop('type', 'checkbox')
                            .prop('checked', isSelected));

                this._dropdownBody.addLiElement(liElement.get(0) as HTMLLIElement);
        }

        if (this._configuration.width !== undefined)
            this._dropdownElement.css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            this._dropdownElement.css('height', this._configuration.height + 'px');

        this._dropdownElement
            .addClass('dropdown')
            .addClass(DropdownType.toCssClass(this._configuration.type))
            .append(this._dropdownLabel.element)
            .append(this._dropdownBody.element);

        $(this._element).append(this._dropdownElement);
    }

    private updateSelection(liElement : JQuery<HTMLLIElement>, event : JQuery.ClickEvent) : void
    {  
        if (this._configuration.type == DropdownType.MULTI)
        {
            let checkBox = liElement.find('input');

            if (checkBox.prop('checked'))
            {
                this._selectedValues = this._selectedValues.filter(el => el.value.toLowerCase() != liElement.data('KeyValue').value);
                this._dropdownLabel.labelText = this._selectedValues.length == 0 ? this._configuration.placeholder : this._configuration.labelMapper(this._selectedValues);
            }
            else
            {
                this._selectedValues.push(this._values.find(el => el.value.toLowerCase() == liElement.data('KeyValue').value));
                this._dropdownLabel.labelText = this._configuration.labelMapper(this._selectedValues);
            }

            if (event.target.tagName != 'INPUT')
                checkBox.prop('checked', ! checkBox.prop('checked'));
        }
        else
        {
            $(this._dropdownBody.liElements).removeClass('selected');
            this._selectedValues[0] = this._values.find(el => el.value.toLowerCase() == liElement.data('KeyValue').value);
            this._dropdownLabel.labelText = this._configuration.labelMapper(this._selectedValues);
            this._dropdownBody.element.hide();
        }

        liElement.toggleClass('selected');

        this._configuration.onChange(this._selectedValues);
    }

    public setValues(values : Array<string>) : void
    {     
        $(this._dropdownBody.liElements).removeClass('selected');

        if (this._configuration.type == DropdownType.MULTI)
        {
            $(this._dropdownBody.liElements).find('input').prop('checked', false);

            this._selectedValues = new Array();
            let liElementsToSelect : HTMLLIElement[] = new Array();

            for (let newValue of values)
            {
                this._selectedValues.push(this._values.find(el => el.key.toLowerCase() == newValue.toLowerCase()));
                liElementsToSelect.push(this._dropdownBody.liElements.filter(liElement => $(liElement).data('KeyValue').key == newValue.toLowerCase())[0]);
            }

            for (let liElement of liElementsToSelect)
            {
                let checkBox = $(liElement).find('input');
                checkBox.prop('checked', true);
                $(liElement).addClass('selected');
            }

            this._dropdownLabel.labelText = this._selectedValues.length == 0 ? this._configuration.placeholder : this._configuration.labelMapper(this._selectedValues);
        }
        else
        {
            this._selectedValues[0] = this._values.find(el => el.key.toLowerCase() == values[0].toLowerCase());
            let liElementToSelect = this._dropdownBody.liElements.filter(liElement => $(liElement).data('KeyValue').key == values[0].toLowerCase());;
            $(liElementToSelect).addClass('selected');
            this._dropdownLabel.labelText = this._configuration.labelMapper(this._selectedValues);
        }        

        this._configuration.onChange(this._selectedValues);
    }

    public getValues() : Array<KeyValue> { return this._selectedValues; }

    public show() : void { this._dropdownBody.show(); }

    public hide() : void { this._dropdownBody.hide(); }

    public toggle() : void { this._dropdownBody.toggle(); }
}
