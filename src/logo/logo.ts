import LogoConfiguration from "./logo-configuration";
import { Align } from "../align";
import "./logo.scss";
import Dimension from "../dimension";

export default class Logo
{
    private _element: HTMLElement;
    private _configuration: LogoConfiguration;

    constructor(element: HTMLElement, configuration: LogoConfiguration)
    {
        this._element = element;
        this._configuration = configuration;

        this.render();
    }

    /**
     * la funzione serve a renderizzare il logo
     */
    private render()
    {
        let img = $("<img />")
            .addClass("logo")
            .prop("src", this._configuration.url);
        
            if (this._configuration.width !== undefined)
            {
                img.css("width", this._configuration.width + "px");
            }

            if (this._configuration.height !== undefined)
            {
                img.css("height", this._configuration.height + "px");
            }      

        $(this._element)
            .addClass("logo")
            .css("text-align", Align.toCssValue(this._configuration.align))
            .append(img);
    }

    /**
     * ritorna le dimensioni (in pixel) dell'immagine del logo renderizzata
     */
    public getDimension(): Dimension
    {
        const imgElement: JQuery = $(this._element).find("img");

        return new Dimension(imgElement.outerWidth(), imgElement.outerHeight());
    }
}