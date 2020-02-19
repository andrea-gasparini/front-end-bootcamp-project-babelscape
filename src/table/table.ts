import TableConfiguration from './table-configuration';
import { TypeUtils } from '../utils';
import { tableRowSort } from '../utils';
import './table.scss';

export default class Table
{
    private _element : HTMLElement;
    private _configuration : TableConfiguration;
    private _tableElement : JQuery<HTMLTableElement> = $('<table />');

    constructor(element: HTMLElement, config : TableConfiguration)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render() : void
    {
        this._tableElement
            .addClass('table');   
            
        if (this._configuration.width !== undefined)
            $(this._tableElement).css('width', this._configuration.width + 'px');

        if (this._configuration.height !== undefined)
            $(this._tableElement).css('height', this._configuration.height + 'px');

        if ( this._configuration.firstRowHeader )
            this._tableElement.append('<thead />');    

        this._tableElement.append('<tbody />');

        let rowCount : number = this._configuration.data.length;
        let colCount : number = this._configuration.data[0].length;
        let sums : Array<number> = new Array();

        for ( let row = 0; row < rowCount; row++ )
        {
            let tableRow = $('<tr />');

            for ( let col = 0; col < colCount; col++ )
            {
                let matrixCell = this._configuration.data[row][col];
                let tableCell : JQuery<HTMLElement>;

                if ( row == 0 && this._configuration.firstRowHeader )
                    tableCell = $('<th />')
                        .click(() => this.sortTablePerCol(col));
                else
                {
                    tableCell = $('<td />');

                    if ( TypeUtils.isNumber(matrixCell) && sums[col] !== null )
                        sums[col] = sums[col] == undefined ? matrixCell : (sums[col] + matrixCell);
                    else
                        sums[col] = null;
                }

                tableCell.append(matrixCell);
                tableRow.append(tableCell);
            }

            if ( row == 0 && this._configuration.firstRowHeader )
                this._tableElement.find('thead').append(tableRow);
            else
                this._tableElement.find('tbody').append(tableRow);
        }

        this.createLastRow(sums);

        $(this._element).append(this._tableElement);
    }

    private createLastRow(sums : Array<number>) : void 
    {
        let tFoot = $('<tfoot />').appendTo(this._tableElement); 
        let lastRow : JQuery<HTMLElement> = $('<tr />').appendTo(tFoot);
        lastRow.append($('<td> Totale righe ' + this._configuration.data.length + '</td>'))

        for ( let i = 1; i < sums.length; i++ )
        {
            let tableCell : JQuery<HTMLElement> = $('<td />');

            if ( TypeUtils.isNumber(sums[i]) )
                tableCell.append(String(sums[i]));

            lastRow.append(tableCell);
        }
    }

    private sortTablePerCol(col : number)
    {
        let getTableCellValue = (row: HTMLTableElement) => row.children[col].textContent;

        if ( this._tableElement.find('thead th.asc-sorted').length == 0 )
        {
            this._tableElement.find('thead th').eq(col).addClass('asc-sorted');
            this._tableElement.find('thead th').removeClass('desc-sorted');
            tableRowSort(this._tableElement, (a, b) => getTableCellValue(a).localeCompare(getTableCellValue(b)));
        }
        else
        {
            this._tableElement.find('thead th').eq(col).addClass('desc-sorted');
            this._tableElement.find('thead th').removeClass('asc-sorted');
            tableRowSort(this._tableElement, (a, b) => getTableCellValue(b).localeCompare(getTableCellValue(a)))
        }
    }
}
