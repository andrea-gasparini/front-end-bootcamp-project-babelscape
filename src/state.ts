export enum State
{
    READY = 'READY', DISABLED = 'DISABLED', ERROR = 'ERROR', PENDING = 'PENDING'
}

export namespace State
{
    export function fromValue(value: string) : State
    {
        if (value === undefined) return undefined;

        return State[value.toUpperCase()];
    }

    export function toCssClass(state: State) : string
    {
        if (state === undefined) return undefined;

        return State[state].toLowerCase();
    }
}