import AutocompleteConfiguration from "./autocomplete-configuration";
import AutocompleteBody from "./autocomplete-body";
import "./autocomplete.scss";

export default class Autocomplete
{
    private _element : HTMLElement;
    private _configuration : AutocompleteConfiguration;
    private _autocompleteElement : JQuery<HTMLDivElement> = $('<div />');

    private _inputBoxElement : JQuery<HTMLInputElement> = $('<input />');
    private _autocompleteBody : AutocompleteBody;

    constructor(element: HTMLElement, config: AutocompleteConfiguration)
    {
        this._element = element;
        this._configuration = config;
        this._autocompleteBody = new AutocompleteBody();
        
        this.render();
    }

    private render() : void
    {
        this._inputBoxElement
            .addClass('autocomplete-input-box')
            .prop('type', 'text')
            .prop('placeholder', this._configuration.placeholder)
            .on('input', () => this.checkInput());

        this._autocompleteElement
            .addClass('autocomplete')
            .append(this._inputBoxElement);

        $(this._element).append(this._autocompleteElement);
    }

    private checkInput() : void
    {
        let input : string = this._inputBoxElement.val() as string;

        if ( input.length >= this._configuration.minTextLength )
        {
            // autocompleteBody.set(this.getWords())
        }
        else
        {
            // autocompleteBody.empty()
        }
    }
}
