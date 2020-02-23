export namespace TypeUtils
{
    export function isNumber(x: any): x is number 
    {
        return typeof x === "number";
    }
    
    export function isString(x: any): x is string 
    {
        return typeof x === "string";
    }

    export function isObject(x: any): x is object 
    {
        return typeof x === "object";
    }
}

export function tableRowSort(table : JQuery<HTMLTableElement>, sortFunc : (a : HTMLTableElement, b : HTMLTableElement) => number)
{
    const rows : HTMLTableElement[] = table.find('tbody tr').detach().toArray();

    rows.sort(sortFunc);

    table.find('tbody').append(rows);
}

export function closeOnOutsideClick(event : JQuery.MouseUpEvent, element : JQuery<HTMLElement>)
{
    if ( ! element.is(event.target) && element.has(event.target).length == 0 )
        element.hide();
}