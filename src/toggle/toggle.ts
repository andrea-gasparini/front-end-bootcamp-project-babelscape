import ToggleConfiguration from "./toggle-configuration";
import "./toggle.scss";
import KeyValue from "../key-value";

export default class Toggle<T>
{
    private _element : HTMLElement;
    private _configuration : ToggleConfiguration<T>;
    private _mainDimension : number;
    private _value1 : KeyValue;
    private _value2 : KeyValue;
    private _selected : KeyValue;

    private _toggleElement : JQuery<HTMLDivElement> = $('<div />');
    private _toggleButtonElement : JQuery<HTMLButtonElement> = $('<button />');
    private _toggleIconElement : JQuery<HTMLDivElement> = $('<div />');
    private _toggleFirstValueElement : JQuery<HTMLSpanElement> = $('<span />');
    private _toggleSecondValueElement : JQuery<HTMLSpanElement> = $('<span />');

    constructor(element: HTMLElement, config : ToggleConfiguration<T>)
    {
        this._element = element;
        this._configuration = config;
        this._mainDimension = config.height;
        this._value1 = config.dataMapper(config.value1);
        this._value2 = config.dataMapper(config.value2);
        this._selected = this._value1;

        this.render();
    }

    private render() : void
    {
        this.setDimensions();

        this._toggleIconElement
            .addClass('toggle-icon');

        this._toggleButtonElement
            .addClass('toggle-button')
            .addClass('left')
            .css('background-color', this._configuration.color1)
            .append(this._toggleIconElement)
            .click(() => this.toggle());

        this._toggleFirstValueElement
            .addClass('toggle-label')
            .addClass('selected')
            .text(this._value1.value);

        this._toggleSecondValueElement
            .addClass('toggle-label')
            .text(this._value2.value);
        
        this._toggleElement
            .addClass('toggle')
            .append(this._toggleFirstValueElement)
            .append(this._toggleButtonElement)
            .append(this._toggleSecondValueElement);

        $(this._element).append(this._toggleElement);
    }

    private setDimensions() : void
    {
        this._toggleButtonElement
            .css('width', this._mainDimension * 2 + 'px')
            .css('height', this._mainDimension + 'px')
            .css('border-radius', this._mainDimension / 2 + 'px');

        this._toggleIconElement
            .css('width', this._mainDimension - 4 + 'px')
            .css('height', this._mainDimension - 4 + 'px');

        if ( this._mainDimension > 25 ) // sotto a 25px come mainDimension il testo diventa troppo poco visibile
        {
            this._toggleFirstValueElement.css('font-size', this._mainDimension / 2.5 + 'px')
            this._toggleSecondValueElement.css('font-size', this._mainDimension / 2.5 + 'px')
        }
        else
        {
            this._toggleFirstValueElement.css('font-size', 12 + 'px')
            this._toggleSecondValueElement.css('font-size', 12 + 'px')
        }
    }

    private toggle() : void
    {
        this._selected = this._selected == this._value1 ? this._value2 : this._value1;
        this._toggleFirstValueElement.toggleClass('selected');
        this._toggleSecondValueElement.toggleClass('selected');
        this._toggleButtonElement.toggleClass('left');
        this._toggleButtonElement.toggleClass('right');

        if ( this._selected == this._value2 )
        {
            this._toggleIconElement
                .css('left', this._mainDimension + 2 + 'px');
            this._toggleButtonElement
                .css('background-color', this._configuration.color2);
        }
        else
        {
            this._toggleIconElement
                .css('left', 2 + 'px');
            this._toggleButtonElement
                .css('background-color', this._configuration.color1);  
        }

        this._configuration.onChange(this._selected);
    }

    public setFirstValue() : void { if ( this._selected != this._value1 ) this.toggle(); }

    public setSecondValue() : void { if ( this._selected != this._value2 ) this.toggle(); }

    public getValue() : T { return this._toggleButtonElement.hasClass('left') ? this._configuration.value1 : this._configuration.value2; }
}
