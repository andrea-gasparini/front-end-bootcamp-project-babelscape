import ModalConfiguration from "./modal-configuration";
import "./modal.scss"
import { ModalType } from "../modal-type";

export default class Modal
{
    private _element : HTMLElement;
    private _configuration : ModalConfiguration;
    private _modalElement : JQuery<HTMLDivElement> = $('<div />');
    private _modalHeaderElement : JQuery<HTMLDivElement> = $('<div />');
    private _modalBodyElement : JQuery<HTMLDivElement> = $('<div />');
    private _modalFooterElement : JQuery<HTMLDivElement> = $('<div />');

    constructor(element: HTMLElement, config: ModalConfiguration)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render() : void
    {
        this._modalHeaderElement
            .addClass('modal-header')
           .append(this._configuration.header);

        this._modalBodyElement
            .addClass('modal-body')
            .append(this._configuration.body);

        this._modalFooterElement
            .addClass('modal-footer')
            .append($('<button />')
                .text('Chiudi'));

        this._modalElement
            .addClass('modal-content')
            .append(this._modalHeaderElement)
            .append(this._modalBodyElement)
            .append(this._modalFooterElement);
            
        if ( this._configuration.type == ModalType.CONFIRM )


        $(this._element)
            .addClass('modal')
            .append(this._modalElement);
    }
}
