export enum Align
{
    LEFT = 'LEFT', CENTER = 'CENTER', RIGHT = 'RIGHT'
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