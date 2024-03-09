// Regex pattern that matches any of the elements of the passed‐in array.
export const anyOfArray = arr => `[${arr.join('')}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
export const anyOfIterable = it => anyOfArray(Array.from(it));

export const throwingGet = (map, key,) => {
    const val = map.get(key,);
    if (val === undefined) {
        throw new Error(`No key ${key}`,)
    }
    return val;
};
