import MessageConfiguration from "./message-configuration";
import { Alert } from "../alert";
import { Align } from "../align";

export default class Message
{
    private _element : HTMLElement;
    private _configuration : MessageConfiguration;

    constructor(element: HTMLElement, config: MessageConfiguration)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render()
    {
        $(this._element)
            .text(this._configuration.message)
            .addClass('message')
            .addClass(Alert.toCssClass(this._configuration.type))
            .css('text-align', Align.toCssValue(this._configuration.align));             
    }
}
