import ModalConfiguration from "./modal-configuration";
import ModalFooter from "./modal-footer";
import "./modal.scss"

export default class Modal
{
    private _element : HTMLElement;
    private _configuration : ModalConfiguration;
    private _modalElement : JQuery<HTMLDivElement> = $('<div />');
    private _modalHeaderElement : JQuery<HTMLDivElement> = $('<div />');
    private _modalBodyElement : JQuery<HTMLDivElement> = $('<div />');
    private _modalFooter : ModalFooter;

    constructor(element: HTMLElement, config: ModalConfiguration)
    {
        this._element = element;
        this._configuration = config;
        this._modalFooter = new ModalFooter(this._element, this._configuration.type, this._configuration.onConfirm)

        this.render();
    }

    private render() : void
    {
        if ( this._configuration.header !== undefined )
            this._modalHeaderElement
                .addClass('modal-header')
                .append(this._configuration.header)
                .appendTo(this._modalElement);

        this._modalBodyElement
            .addClass('modal-body')
            .append(this._configuration.body)
            .appendTo(this._modalElement);

        this._modalElement
            .addClass('modal-content')
            .append(this._modalFooter.element);

        $(this._element)
            .addClass('modal')
            .append(this._modalElement);
    }

    public dispose() : void { $(this._element).remove(); }
}
