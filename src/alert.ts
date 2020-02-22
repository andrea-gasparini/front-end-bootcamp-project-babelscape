export enum Alert
{
    SUCCESS = 'SUCCESS', WARNING = 'WARNING', DANGER = 'DANGER', INFO = 'INFO'
}

export namespace Alert
{
    export function fromValue(value: string) : Alert
    {
        if (value === undefined) return undefined;

        return Alert[value.toUpperCase()];
    }

    export function toCssClass(alert: Alert) : string
    {
        if (alert === undefined) return undefined;

        return Alert[alert].toLowerCase();
    }
}