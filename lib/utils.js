// Regex pattern that matches any of the elements of the passed‐in array.
export const anyOfArray = arr => `[${arr.join("",)}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
export const anyOfIterable = it => anyOfArray(Array.from(it,),);

export const objToMap = obj => {
    if (! obj) {
        return null;
    }
    const map = new Map();
    for (const [key, value,] of Object.entries(obj,)) {
        const convertedValue = { ...value, };
        if (value.children) {
            convertedValue.children = objToMap(value.children,);
        }
        map.set(key, convertedValue,);
    }
    return map;
};
