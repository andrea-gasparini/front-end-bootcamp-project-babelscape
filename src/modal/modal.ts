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
        if ( this._configuration.header !== undefined )
            this._modalHeaderElement
                .addClass('modal-header')
                .append(this._configuration.header);

        if ( this._configuration.body !== undefined )
            this._modalBodyElement
                .addClass('modal-body')
                .append(this._configuration.body);

        this._modalFooterElement
            .addClass('modal-footer');
            
        let closeButton = $('<button />');

        this._modalFooterElement
            .append(closeButton)
            .on('click', () =>
            {
                this.dispose();
            });
        
        if ( this._configuration.type == ModalType.CONFIRM )
        {
            let confirmButton = $('<button />')
                .addClass('confirm-button')
                .text('Conferma')
                .on('click', () =>
                    {
                        this._configuration.onConfirm();
                        this.dispose();
                    });

            closeButton
                .text('Annulla');

            this._modalFooterElement
                .prepend(confirmButton);
        }
        else
            closeButton
                .text('Chiudi'); 

        this._modalElement
            .addClass('modal-content')
            .append(this._modalHeaderElement)
            .append(this._modalBodyElement)
            .append(this._modalFooterElement);

        $(this._element)
            .addClass('modal')
            .append(this._modalElement);
    }

    public dispose() : void { $(this._element).remove(); }
}
