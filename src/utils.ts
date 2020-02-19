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

export function tableRowSortFn()
{
    
}