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
                    else if ( TypeUtils.isNumber(sums[col]) )
                        sums[col] = null;
                }

                tableElement.append(matrixElement);
                tableRow.append(tableElement);
                table.append(tableRow);
            }
        }

        this.createLastRow(table, sums);

        $(this._element).append(table);
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

    private sortTable(table : HTMLTableElement, col : number)
    {
        enum Direction { ASC, DISC }

        let rows : HTMLCollectionOf<HTMLTableRowElement> = table.rows;
        let firstElement : any, secondElement : any;
        let isSorted : boolean = false;
        let direction : Direction = Direction.ASC;
        let switchCount : number = 0;

        while ( ! isSorted )
        {
            /* Loop through all table rows (except the
            first and the last one: */
            for ( let row = 1; row < rows.length - 2; row++ ) {
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                firstElement = rows[row].getElementsByTagName("td")[col];
                secondElement = rows[row + 1].getElementsByTagName("td")[col];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if ( direction == Direction.ASC && firstElement.innerHTML.toLowerCase() > secondElement.innerHTML.toLowerCase() 
                || direction == Direction.DISC && firstElement.innerHTML.toLowerCase() < secondElement.innerHTML.toLowerCase()) 
                {
                    rows[row].parentNode.insertBefore(rows[row + 1], rows[row]);
                    // Each time a switch is done, increase this count by 1:
                    switchCount++;
                    break;
                }

                if ( row + 1 == rows.length - 2 )
                    isSorted = true
            }

            /* If no switching has been done AND the direction is Direction.ASC,
            set the direction to Direction.DISC and run the while loop again. */
            if (switchCount == 0 && direction == Direction.ASC) 
                direction = Direction.DISC;
        } 
      }
}
