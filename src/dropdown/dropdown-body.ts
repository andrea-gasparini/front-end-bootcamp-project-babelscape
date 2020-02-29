import DropdownLabel from "./dropdown-label";
import { DropdownType } from "../dropdown-type";
import KeyValue, { keyValueToLowerCase } from "../key-value";
import HiddenBody from "../hidden-body";

export default class DropdownBody<T> extends HiddenBody
{
    private _selectedValues : Array<KeyValue> = new Array();
    private _dropdownType : DropdownType;
    private _searchElement : JQuery<HTMLInputElement> = $('<input />');
    private _dataMapper : (elem: T) => KeyValue;
    private _onChange : (selectedList: Array<KeyValue>) => void;
    private readonly _dropdownLabel : DropdownLabel<T>;

    constructor(dropdownLabel : DropdownLabel<T>, dropdownType : DropdownType, inputData : Array<T>, inputSelected : Array<string>, dataMapper : (elem: T) => KeyValue, onChange : (selectedList: Array<KeyValue>) => void)
    {
        super();

        for (let val of inputData)
            this._values.push(dataMapper(val));

        for (let selectedValue of inputSelected)
            this._selectedValues.push(this._values.find((el) => el.key == selectedValue));

        this._dropdownType = dropdownType;

        this._dataMapper = dataMapper;
        this._onChange = onChange;
        this._dropdownLabel = dropdownLabel;
        dropdownLabel.setDropdownBody(this);

        this._searchElement
            .prop('type', 'text')
            .prop('placeholder', 'Cerca..')
            .on('input', () => this.filterSearch());

        this._element
            .append(this._searchElement);

        for (let val of this._values)
            this.addLiElement(this.createliElement(val));
    }

    protected createliElement(val : KeyValue) : HTMLLIElement
    {
        let liElement = $(super.createliElement(val))
            .on('click', (event : JQuery.ClickEvent) => this.updateSelection(liElement, event));

        let isSelected = this._selectedValues.length == 0 ? false :
            (this._dropdownType == DropdownType.MULTI) ?
                this._selectedValues.find(el => el.key.toLowerCase() == val.key.toLowerCase()) :
                this._selectedValues[0].key.toLowerCase() == val.key.toLowerCase();

        if (isSelected) liElement.addClass('selected');

        if (this._dropdownType == DropdownType.MULTI)
            liElement
                .prepend($('<input />')
                    .prop('type', 'checkbox')
                    .prop('checked', isSelected));

        return liElement.get(0) as HTMLLIElement;
    }

    private filterSearch() : void
    {
        let input : string = this._searchElement.val().toString();

        for (let i = 0; i < this._liElements.length; i++)
            if ($(this._liElements[i]).data('KeyValue').value.includes(input.toLowerCase()))
                $(this._liElements[i]).show();
            else
                $(this._liElements[i]).hide();
    }

    private updateSelection(liElement : JQuery<HTMLLIElement>, event : JQuery.ClickEvent) : void
    {  
        if (this._dropdownType == DropdownType.MULTI)
        {
            let checkBox = liElement.find('input');

            if (checkBox.prop('checked'))
            {
                this._selectedValues = this._selectedValues.filter(el => el.value.toLowerCase() != liElement.data('KeyValue').value);
                this._dropdownLabel.labelText = this._selectedValues.length == 0 ? this._dropdownLabel.placeholder : this._dropdownLabel.labelMapper(this._selectedValues);
            }
            else
            {
                this._selectedValues.push(this._values.find(el => el.value.toLowerCase() == liElement.data('KeyValue').value));
                this._dropdownLabel.labelText = this._dropdownLabel.labelMapper(this._selectedValues);
            }

            if (event.target.tagName != 'INPUT')
                checkBox.prop('checked', ! checkBox.prop('checked'));
        }
        else
        {
            $(this._liElements).removeClass('selected');
            this._selectedValues = new Array(this._values.find(el => el.value.toLowerCase() == liElement.data('KeyValue').value));
            this._dropdownLabel.labelText = this._dropdownLabel.labelMapper(this._selectedValues);
            this.hide();
        }

        liElement.toggleClass('selected');

        this._onChange(this._selectedValues);
    }

    public setValues(values : Array<string>) : void
    {
        $(this._liElements).removeClass('selected');

        if (this._dropdownType == DropdownType.MULTI)
        {
            $(this._liElements).find('input').prop('checked', false);

            this._selectedValues = new Array();
            let liElementsToSelect : HTMLLIElement[] = new Array();

            for (let newValue of values)
            {
                this._selectedValues.push(this._values.find(el => el.key.toLowerCase() == newValue.toLowerCase()));
                liElementsToSelect.push(this._liElements.filter(liElement => $(liElement).data('KeyValue').key == newValue.toLowerCase())[0]);
            }

            for (let liElement of liElementsToSelect)
            {
                let checkBox = $(liElement).find('input');
                checkBox.prop('checked', true);
                $(liElement).addClass('selected');
            }

            this._dropdownLabel.labelText = this._selectedValues.length == 0 ? this._dropdownLabel.placeholder : this._dropdownLabel.labelMapper(this._selectedValues);
        }
        else
        {
            this._selectedValues = new Array(this._values.find(el => el.key.toLowerCase() == values[0].toLowerCase()));
            let liElementToSelect = this._liElements.filter(liElement => $(liElement).data('KeyValue').key == values[0].toLowerCase());;
            $(liElementToSelect).addClass('selected');
            this._dropdownLabel.labelText = this._dropdownLabel.labelMapper(this._selectedValues);
        }        

        this._onChange(this._selectedValues);
    }

    public show() : void 
    {
        super.show();
        this._searchElement.focus();
    }

    get selectedValues() : Array<KeyValue> { return this._selectedValues; }

    get type() : DropdownType { return this._dropdownType; }

    get dataMapper() : (elem: T) => KeyValue { return this._dataMapper; }

    get onChange() : (selectedList: Array<KeyValue>) => void { return this._onChange; }

    get searchElement() : JQuery<HTMLInputElement> { return this._searchElement; }
}