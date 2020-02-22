export enum DropdownType
{
    SINGLE = 'SINGLE', MULTI = 'MULTI'
}

export namespace DropdownType
{
    export function fromValue(value: string) : DropdownType
    {
        if (value === undefined) return undefined;

        return DropdownType[value.toUpperCase()];
    }

    export function toCssClass(alert: DropdownType) : string
    {
        if (alert === undefined) return undefined;

        return DropdownType[alert].toLowerCase();
    }
}