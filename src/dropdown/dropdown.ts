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
    private _dropdownElement : JQuery<HTMLElement> = $('<div />');
    private _dropdownLabel : DropdownLabel<T>;
    private _dropdownBody : DropdownBody<T>;

    constructor(element: HTMLElement, config: DropdownConfiguration<T>)
    {
        this._element = element;
        this._configuration = config;
        this._dropdownLabel = new DropdownLabel(this._configuration.placeholder, this._configuration.labelMapper); 
        this._dropdownBody = new DropdownBody<T>(this._dropdownLabel, this._configuration.type, this._configuration.data, this._configuration.selected, this._configuration.dataMapper, this._configuration.onChange);

        this.render();
    }

    private render() : void
    {     
        $(document).on('click', (event : JQuery.ClickEvent) => closeOnOutsideClick(event, this._dropdownElement.get(0), this._dropdownBody.element));

        if (this._configuration.width !== undefined)
            this._dropdownElement.css('width', this._configuration.width + 'px');

        this._dropdownElement
            .addClass('dropdown')
            .addClass(DropdownType.toCssClass(this._configuration.type))
            .append(this._dropdownLabel.element)
            .append(this._dropdownBody.element);

        $(this._element).append(this._dropdownElement);
    }

    public setValues(values : Array<string>) : void { this._dropdownBody.setValues(values); }

    public getValues() : Array<KeyValue> { return this._dropdownBody.selectedValues; }

    public show() : void { this._dropdownBody.show(); }

    public hide() : void { this._dropdownBody.hide(); }

    public toggle() : void { this._dropdownBody.toggle(); }
}
