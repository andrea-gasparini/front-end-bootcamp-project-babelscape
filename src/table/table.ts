import TableConfiguration from './table-configuration';
import { TypeUtils } from '../utils';
import { tableRowSort } from '../utils';
import './table.scss';
import { Align } from '../align';

export default class Table
{
    private _element : HTMLElement;
    private _configuration : TableConfiguration;
    private _tableElement : JQuery<HTMLTableElement> = $('<table />');
    private readonly _sortIcon = '<i class="fas fa-sort"></i>';

    constructor(element: HTMLElement, config : TableConfiguration)
    {
        this._element = element;
        this._configuration = config;

        this.render();
    }

    private render() : void
    {
        this._tableElement
            .addClass('table')
            .css('text-align', Align.toCssValue(this._configuration.alignText))
            .find('thead th').css('text-align', Align.toCssValue(this._configuration.alignText));   
            
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
                        .click(() => this.sortTablePerCol(col))
                        .append(' ' + this._sortIcon);
                else
                {
                    tableCell = $('<td />');

                    if ( TypeUtils.isNumber(matrixCell) && sums[col] !== null )
                        sums[col] = sums[col] == undefined ? matrixCell : (sums[col] + matrixCell);
                    else
                        sums[col] = null;
                }

                tableCell.prepend(matrixCell);
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
        let totRows : number = this._configuration.firstRowHeader ? this._configuration.data.length - 1 : this._configuration.data.length;
        lastRow.append($('<td> Totale righe ' + totRows + '</td>'))

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

        if ( ! this._tableElement.find('thead th').eq(col).hasClass('asc-sorted') )
        {
            this._tableElement.find('thead th svg').addClass('fa-sort');
            this._tableElement.find('thead th svg').eq(col).addClass('fa-sort-down');
            
            this._tableElement.find('thead th').removeClass('asc-sorted desc-sorted');
            this._tableElement.find('thead th').eq(col).addClass('asc-sorted');

            tableRowSort(this._tableElement, (a, b) => getTableCellValue(a).localeCompare(getTableCellValue(b)));
        }
        else
        {
            this._tableElement.find('thead th svg').addClass('fa-sort');
            this._tableElement.find('thead th svg').eq(col).addClass('fa-sort-up');

            this._tableElement.find('thead th').removeClass('asc-sorted desc-sorted');
            this._tableElement.find('thead th').eq(col).addClass('desc-sorted');

            tableRowSort(this._tableElement, (a, b) => getTableCellValue(b).localeCompare(getTableCellValue(a)))
        }
    }
}
