import TableConfiguration from './table-configuration';
import { TypeUtils } from '../utils';
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

                if ( row === 0 && this._configuration.firstRowHeader )
                    tableCell = $('<th />');
                else
                {
                    tableCell = $('<td />');

                    if ( TypeUtils.isNumber(matrixCell) )
                        sums[col] = sums[col] == undefined ? matrixCell : (sums[col] + matrixCell);
                    else if ( TypeUtils.isNumber(sums[col]) )
                        sums[col] = null;
                }

                tableCell.append(matrixCell);
                tableRow.append(tableCell);
                this._tableElement.append(tableRow);
            }
        }

        this.createLastRow(sums);

        $(this._element).append(this._tableElement);

        this.sortTable(0)
    }

    private createLastRow(sums : Array<number>) : void 
    {
        let lastRow : JQuery<HTMLElement> = $('<tr / >').appendTo(this._tableElement);
        lastRow.append($('<td> Totale righe ' + this._configuration.data.length + '</td>'))

        for ( let i = 1; i < sums.length; i++ )
        {
            let tableCell : JQuery<HTMLElement> = $('<td />');

            if ( TypeUtils.isNumber(sums[i]) )
                tableCell.append(String(sums[i]));

            lastRow.append(tableCell);
        }
    }

    private sortTable(col : number)
    {
        enum Direction { ASC, DISC }

        let rows : HTMLCollectionOf<HTMLTableRowElement> = this._tableElement.get(0).rows;
        let firstElement : any, secondElement : any;
        let isSorted : boolean = false;
        let direction : Direction = Direction.ASC;
        let switchCount : number = 0;

        while ( ! isSorted )
        {
            for ( let row = 1; row < rows.length - 2; row++ ) {
                
                firstElement = rows[row].getElementsByTagName("td")[col];
                secondElement = rows[row + 1].getElementsByTagName("td")[col];
                
                if ( direction == Direction.ASC && firstElement.innerHTML.toLowerCase() > secondElement.innerHTML.toLowerCase() 
                || direction == Direction.DISC && firstElement.innerHTML.toLowerCase() < secondElement.innerHTML.toLowerCase()) 
                {
                    rows[row].parentNode.insertBefore(rows[row + 1], rows[row]);
                    switchCount++;
                    break;
                }

                if ( row + 1 == rows.length - 2 )
                    isSorted = true
            }

            if (switchCount == 0 && direction == Direction.ASC) 
                direction = Direction.DISC;
        } 
    }
}
