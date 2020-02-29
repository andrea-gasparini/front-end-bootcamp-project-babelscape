export enum ModalType
{
    DIALOG = 'DIALOG', CONFIRM = 'CONFIRM'
}

export namespace ModalType
{
    export function fromValue(value: string) : ModalType
    {
        if (value === undefined) return undefined;

        return ModalType[value.toUpperCase()];
    }

    export function toCssClass(type: ModalType) : string
    {
        if (type === undefined) return undefined;

        return ModalType[type].toLowerCase();
    }
}