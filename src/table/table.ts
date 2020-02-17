import TableConfiguration from './table-configuration';
import { TypeUtils } from '../utils';
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

        let rowCount : number = this._configuration.data.length;
        let colCount : number = this._configuration.data[0].length;
        let sums : Array<number> = new Array();

        for ( let row = 0; row < rowCount; row++ )
        {
            let tableRow = $('<tr />');

            for ( let col = 0; col < colCount; col++ )
            {
                let matrixElement = this._configuration.data[row][col];
                let tableElement : JQuery<HTMLElement>;

                if ( row === 0 && this._configuration.firstRowHeader )
                    tableElement = $('<th />');
                else
                {
                    tableElement = $('<td />');

                    if ( TypeUtils.isNumber(matrixElement) )
                        sums[col] = sums[col] == undefined ? matrixElement : (sums[col] + matrixElement);
                }

                tableElement.append(matrixElement);
                tableRow.append(tableElement);
                table.append(tableRow);
            }
        }

        this.createLastRow(table, sums)

        $(this._element).append(table)
    }

    private createLastRow(table : JQuery<HTMLElement>, sums : Array<number>) : void 
    {
        let lastRow : JQuery<HTMLElement> = $('<tr / >').appendTo(table);
        lastRow.append($('<td> Totale righe ' + this._configuration.data.length + '</td>'))

        for ( let i = 1; i < sums.length; i++ )
        {
            let tableElement : JQuery<HTMLElement> = $('<td />');

            if ( TypeUtils.isNumber(sums[i]) )
                tableElement.append(String(sums[i]));

            lastRow.append(tableElement);
        }
    }
}
