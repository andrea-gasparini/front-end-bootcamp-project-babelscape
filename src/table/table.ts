import TableConfiguration from './table-configuration';
import './table.scss';

export default class Table
{
    private _element : HTMLElement;
    private _configuration : TableConfiguration;

    constructor(element: HTMLElement, config : TableConfiguration)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render() : void
    {
        let table = $('<table />')
            .addClass('table');

        

        for ( let _row = 0; _row < this._configuration.data.length; _row++ )
        {
            for ( let _col = 0; _col < this._configuration.data[0].length; _col++ )
            {
                console.log(this._configuration.data[_row][_col])
            }
        }
    }
}
