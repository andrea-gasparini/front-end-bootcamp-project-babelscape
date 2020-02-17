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
            
        if (this._configuration.width !== undefined)
            $(table).css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            $(table).css('height', this._configuration.height + 'px');

        for ( let _row = 0; _row < this._configuration.data.length; _row++ )
        {
            let tableRow = $('<tr />').appendTo(table);

            for ( let _col = 0; _col < this._configuration.data[0].length; _col++ )
                if ( _row === 0 && this._configuration.firstRowHeader )
                    tableRow.append('<th>' + this._configuration.data[_row][_col] + '</th>');
                else
                    tableRow.append('<td>' + this._configuration.data[_row][_col] + '</td>');
        }

        $(this._element).append(table)
    }
}
