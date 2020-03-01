import { ModalType } from "../modal-type";

export default class ModalFooter
{
    private _modalFooterElement : JQuery<HTMLDivElement> = $('<div />');
    private _closeButton : JQuery<HTMLButtonElement> = $('<button />');

    constructor(modalElement : HTMLElement, modalType : ModalType, onConfirm : () => void)
    {
        this._modalFooterElement
            .addClass('modal-footer')
            .append(this._closeButton)
            .on('click', () => modalElement.remove());
        
        if ( modalType == ModalType.CONFIRM )
        {
            let confirmButton = $('<button />')
                .addClass('confirm-button')
                .text('Conferma')
                .on('click', () =>
                    {
                        onConfirm();
                        modalElement.remove();
                    });

            this._closeButton
                .text('Annulla');

            this._modalFooterElement
                .prepend(confirmButton);
        }
        else
            this._closeButton
                .text('Chiudi'); 
    }

    get element() : JQuery<HTMLDivElement> { return this._modalFooterElement; }
}