export enum Align
{
    LEFT, CENTER, RIGHT
}

export namespace Align
{
    export function fromValue(value: string)
    {
        if (value === undefined) return undefined;

        return Align[value.toUpperCase()];
    }

    export function toCssValue(align: Align)
    {
        if (align === undefined) return undefined;

        return Align[align].toLowerCase();
    }
}