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
            .text(this._configuration.text);

        $(this._element)
            .append(button);
    }

    public setState(state : State) : void
    {
        this._actualState = state;
    }

    public getState() : State
    {
        return this._actualState;
    }
}
