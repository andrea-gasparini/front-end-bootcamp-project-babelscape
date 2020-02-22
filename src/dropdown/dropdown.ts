import DropdownConfiguration from "./dropdown-configuration";
import { DropdownType } from "../dropdown-type";
import "./dropdown.scss";

export default class Dropdown
{
    private _element : HTMLElement;
    private _configuration : DropdownConfiguration;
    private _dropdownElement : JQuery<HTMLElement> = $('<div />');

    constructor(element: HTMLElement, config: DropdownConfiguration)
    {
        this._element = element;
        this._configuration = config;
        
        this.render();
    }

    private render() : void
    {
        this._dropdownElement
            .addClass('dropdown')
            .addClass(DropdownType.toCssClass(this._configuration.type))
            .text(this._configuration.placeholder)

        if (this._configuration.width !== undefined)
            this._dropdownElement.css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            this._dropdownElement.css('height', this._configuration.height + 'px');

        $(this._element).append(this._dropdownElement);
    }
}
