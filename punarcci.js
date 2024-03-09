import { vowelsToMarks, consonants, pulli, aa_letter, aa_marker, i_ii_markers_ii_letter, u_marker, ya, va, } from "./ezuttu.js";

const regex = s => new RegExp(s, 'gu',);

// Regex pattern that matches any of the elements of the passed‐in array.
const anyOfArray = arr => `[${arr.join('')}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
const anyOfIterable = it => anyOfArray(Array.from(it));

const throwingGet = (map, key,) => {
    const val = map.get(key,);
    if (val === undefined) {
        throw new Error(`No key ${key}`,)
    }
    return val;
};
export const punarcciRules = [
    // க் + இ = கி, etc.
    (s) => s.replace(
        regex(`${pulli}(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // அழிய, அழியும், etc.
    (s) => s.replace(
        regex(`(${anyOfArray(i_ii_markers_ii_letter)})(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1, p2,) => p1 + ya + throwingGet(vowelsToMarks, p2,)
    ),
    // பாடி, பாட, etc.
    (s) => s.replace(
        regex(`${u_marker}(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // யாவார், கடவார், etc.
    (s) => s.replace(
        regex(`(${anyOfArray(consonants)}|${aa_marker}|${aa_letter})(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1, p2,) => p1 + va + throwingGet(vowelsToMarks, p2,)
    ),
];
