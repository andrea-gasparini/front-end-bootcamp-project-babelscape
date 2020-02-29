import HiddenBody from "../hidden-body";

export default class AutocompleteBody extends HiddenBody
{
    private _inputBoxElement : JQuery<HTMLInputElement>;

    constructor(inputBoxElement : JQuery<HTMLInputElement>) 
    {
        super();
        this._inputBoxElement = inputBoxElement;
    }

    public createliElements(values : Array<string>)
    {
        for ( let i = 0; i < values.length; i++ )
        {
            let liElement = $(super.createliElement({ key: i.toString(), value: values[i] }))
                .on('click', () => 
                    {
                        this._inputBoxElement.val(values[i]);
                        this.hide();
                        this.empty();
                    });

            this.addLiElement(liElement.get(0));
        }
    }

    public empty() : void
    {
        this._element.empty();
        this._values = new Array();
    }
}