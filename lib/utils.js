// Regex pattern that matches any of the elements of the passed‐in array.
export const anyOfArray = arr => `[${arr.join("",)}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
export const anyOfIterable = it => anyOfArray(Array.from(it,),);

export const objToMap = obj =>
    Object.entries(obj,).reduce((map, [key, value,],) => {
        const convertedValue = { ...value, };
        if (value.children) {
            convertedValue.children = objToMap(value.children,);
        }
        return map.set(key, convertedValue,);
    },
    new Map(),);
