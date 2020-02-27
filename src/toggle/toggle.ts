import ToggleConfiguration from "./toggle-configuration";
import "./toggle.scss";

export default class Toggle<T>
{
    private _element : HTMLElement;
    private _configuration : ToggleConfiguration<T>;
    private _toggleElement : JQuery<HTMLInputElement> = $('<input />', {type: 'checkbox'});

    constructor(element: HTMLElement, config : ToggleConfiguration<T>)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render() : void
    {
        this._toggleElement
            .addClass('toggle')
            .append($('<span />').append('test'));

        $(this._element).append(this._toggleElement);
    }
}
