import ButtonConfiguration from "./button-configuration";
import { State } from "../state";
import "./button.scss";

export default class Button
{
    private _element : HTMLElement;
    private _configuration : ButtonConfiguration;
    private _actualState : State;

    constructor(element: HTMLElement, config : ButtonConfiguration)
    {
        this._element = element;
        this._configuration = config;
        this._actualState = config.initialState;

        this.render();
    }

    private render() : void
    {
        let button = $('<button />')
            .addClass('button')
            .addClass(State.toCssClass(this._actualState))
            .append(this._configuration.icon)
            .append(' ')
            .append(this._configuration.text);

        if ( this._configuration.initialState == State.PENDING )
            button.append(' <i class="fa fa-spinner fa-spin"></i>')

        if (this._configuration.width !== undefined)
            button.css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            button.css('height', this._configuration.height + 'px');

        $(this._element).append(button);
    }

    public setState(state : State) : void
    {
        this._actualState = state;
        if ( this._actualState == State.PENDING )
            $(this._element).append(' <i class="fa fa-spinner fa-spin"></i>')
    }

    public getState() : State
    {
        return this._actualState;
    }
}
