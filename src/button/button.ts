import ButtonConfiguration from "./button-configuration";
import { State } from "../state";
import "./button.scss";
import { TypeUtils } from "../utils";

export default class Button
{
    private _element : HTMLElement;
    private _configuration : ButtonConfiguration;
    private _actualState : State;
    private _buttonElement : JQuery<HTMLButtonElement> = $('<button />');
    private readonly _loadingIcon : JQuery<HTMLElement> = $('<i class="fa fa-spinner fa-spin"></i>');

    constructor(element: HTMLElement, config : ButtonConfiguration)
    {
        this._element = element;
        this._configuration = config;
        this._actualState = config.initialState;

        this.render();
    }

    private render() : void
    {
        this._buttonElement
            .addClass('button')
            .addClass(State.toCssClass(this._actualState))
            .append(this._configuration.icon)
            .append(' ')
            .append(this._configuration.text)
            .append(' ')
            .append(this._loadingIcon);

    
        if (  this._configuration.onClick != undefined )
            this._buttonElement.click((e : JQuery.Event) => this._configuration.onClick(e))
        
        if ( this._configuration.initialState == State.DISABLED || this._configuration.initialState == State.PENDING )
            this._buttonElement.css('pointer-events', 'none');
        else if ( this._configuration.initialState == State.ERROR )
            this._buttonElement.off('click');

        if ( this._configuration.initialState != State.PENDING )
            this._loadingIcon.hide();

        if (this._configuration.width !== undefined)
            this._buttonElement.css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            this._buttonElement.css('height', this._configuration.height + 'px');

        $(this._element).append(this._buttonElement);
    }

    public setState(state : State) : void
    {
        if ( this._actualState == State.PENDING )
            this._loadingIcon.hide();

        this._buttonElement.removeClass(State.toCssClass(this._actualState));
        this._actualState = TypeUtils.isString(state) ? State.fromValue(state) : state;
        this._buttonElement.addClass(State.toCssClass(this._actualState));

        if ( this._actualState == State.PENDING || this._actualState == State.DISABLED )
        {
            this._buttonElement.css('pointer-events', 'none');
            
            if ( this._actualState == State.PENDING )
                this._loadingIcon.show();
        }
        else if ( this._actualState == State.ERROR )
            this._buttonElement.off('click');
    }

    public getState() : State
    {
        return this._actualState;
    }
}
