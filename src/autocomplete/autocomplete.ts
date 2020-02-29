import AutocompleteConfiguration from "./autocomplete-configuration";
import AutocompleteBody from "./autocomplete-body";
import "./autocomplete.scss";
import { closeOnOutsideClick } from "../utils";

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
        this._autocompleteBody = new AutocompleteBody(this._inputBoxElement);
        
        this.render();
    }

    private render() : void
    {
        $(document).on('click', (event : JQuery.ClickEvent) => closeOnOutsideClick(event, this._element, this._autocompleteBody.element));

        this._inputBoxElement
            .addClass('autocomplete-input-box')
            .prop('type', 'text')
            .prop('placeholder', this._configuration.placeholder)
            .on('input', () => this.checkInput())
            .on('click', () => 
                {
                    let input = this.getInputValue();

                    if (input != '' && this.shouldShowBody(input)) 
                        this._autocompleteBody.show() 
                });

        this._autocompleteElement
            .addClass('autocomplete')
            .append(this._inputBoxElement)
            .append(this._autocompleteBody.element);

        
        if (this._configuration.width !== undefined)
            this._autocompleteElement.css('width', this._configuration.width + 'px');

        $(this._element).append(this._autocompleteElement);
    }

    private getInputValue() : string { return this._inputBoxElement.val().toString().toLowerCase(); }

    private shouldShowBody(input : string = this.getInputValue()) : boolean { return input.length >= this._configuration.minTextLength; }

    private checkInput() : void
    {
        let input = this.getInputValue();

        if ( this.shouldShowBody(input) )
        {
            this._autocompleteBody.empty();

            $.ajax({
                url: this._configuration.restURL + input,
                type: 'GET',
                dataType: 'json',
                success: (data) => this._autocompleteBody.createliElements(data),
                error: (error) => console.log(`Errore chiamata RestURL: ${error}`)                
            })
            this._autocompleteBody.show();
        }
        else
            this._autocompleteBody.hide();
    }
}
