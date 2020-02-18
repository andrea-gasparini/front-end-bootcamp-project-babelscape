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

                    if ( TypeUtils.isNumber(matrixCell) && sums[col] !== null )
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

        //this.sortTable(0)
        //this.sortTable(0)
        //this.selectionSortTable(0)
        //this.selectionSortTable(0)
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
        let rows : HTMLCollectionOf<HTMLTableRowElement> = this._tableElement.get(0).rows;
        let firstTableCellValue : any, secondTableCellValue : any;
        let isSorted : boolean = false;
        let switchCount : number = 0;
        let getTableCellValue = (row: number) => rows[row].getElementsByTagName("td")[col].innerText;
        let sortFunc = (val1 : any, val2 : any) => val1 > val2;
        
        while ( ! isSorted )
        {
            for ( let row = 1; row < rows.length - 2; row++ ) 
            {
                
                firstTableCellValue = getTableCellValue(row);
                secondTableCellValue = getTableCellValue(row + 1);
                
                if ( sortFunc(firstTableCellValue.toLowerCase(), secondTableCellValue.toLowerCase()) ) 
                {
                    rows[row].parentNode.insertBefore(rows[row + 1], rows[row]);
                    switchCount++;
                    break;
                }

                if ( row + 1 == rows.length - 2 )
                    isSorted = true
            }
            
            if ( switchCount == 0 ) 
            {
                isSorted = false
                sortFunc = (val1 : any, val2 : any) => val1 < val2;
            }
        } 
    }

    private selectionSortTable(col : number)
    {
        let minIdx : number;
        let switchCount : number = 0;
        let rows : HTMLCollectionOf<HTMLTableRowElement> = this._tableElement.get(0).rows;
        let getTableCellValue = (row: number) => rows[row].getElementsByTagName("td")[col].innerText;
        let setTableCellValue = (row: number, newValue : any) => rows[row].getElementsByTagName("td")[col].innerText = newValue;
        let sortFunc = (val1 : any, val2 : any) => val1 < val2;

        function sort()
        {
            for ( let rowIdx = 1; rowIdx < rows.length - 2; rowIdx++ ) 
            {
                minIdx = rowIdx
                
                for ( let rowIdx2 = rowIdx; rowIdx2 < rows.length - 1; rowIdx2++ )
                    if ( sortFunc(getTableCellValue(rowIdx2), getTableCellValue(minIdx)) )
                        minIdx = rowIdx2;

                if ( minIdx != rowIdx )
                {
                    let tmp = getTableCellValue(minIdx);
                    setTableCellValue(minIdx, getTableCellValue(rowIdx))
                    setTableCellValue(rowIdx, tmp)
                    switchCount++;
                }
            }
        }

        sort()

        if ( switchCount == 0 )
            sortFunc = (val1 : any, val2 : any) => val1 > val2;
            sort()
    }
}
