export default interface KeyValue
{
    key: string,
    value: string
}

export function keyValueToLowerCase(keyValue : KeyValue) 
{
    return { key: keyValue.key.toLowerCase(), value: keyValue.value.toLowerCase() }
}
