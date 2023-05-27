export const camelToSnake = (str: string) => str.replace(/[A-Z]/g, (c) => { return '_' + c.toLowerCase() });
export const snakeToCamel = (str: string) => str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const formatToDB = (data: Record<string, any>) => {
    let newData: Record<string, any>;
    Object.keys(data).forEach((key) => {
        newData = {...newData, [camelToSnake(key)]: data[key] }
    });
    return newData;
}

export const formatFromDB = (data: Record<string, any>) => {
    let newData: Record<string, any>;
    Object.keys(data).forEach((key) => {
        newData = {...newData, [snakeToCamel(key)]: data[key] }
    });
    return newData;
}