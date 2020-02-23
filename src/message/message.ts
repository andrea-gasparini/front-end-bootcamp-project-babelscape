import MessageConfiguration from './message-configuration';
import { Alert } from '../alert';
import { Align } from '../align';
import './message.scss';

export default class Message
{
    private _element : HTMLElement;
    private _configuration : MessageConfiguration;
    private _messageElement : JQuery<HTMLElement> = $('<div />');

    constructor(element: HTMLElement, config: MessageConfiguration)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render() : void
    {
        this._messageElement
            .text(this._configuration.message)
            .css('text-align', Align.toCssValue(this._configuration.alignText))
            .addClass('message')
            .addClass(Alert.toCssClass(this._configuration.type));

        if (this._configuration.width !== undefined)
            this._messageElement.css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            this._messageElement.css('height', this._configuration.height + 'px');

        $(this._element).append(this._messageElement);
    }
}
