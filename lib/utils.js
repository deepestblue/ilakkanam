// Regex pattern that matches any of the elements of the passed‐in array.
export const anyOfArray = arr => `[${arr.join("")}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
export const anyOfIterable = it => anyOfArray(Array.from(it));
