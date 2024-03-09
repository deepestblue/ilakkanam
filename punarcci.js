import { anyOfArray, anyOfIterable, throwingGet, } from "./utils.js";
import { vowelsToMarks, consonants, pulli, aa_letter, aa_marker, i_ii_markers_ii_letter, u_marker, ya, va, } from "./ezuttu.js";

export const punarcciRules = [
    // க் + இ = கி, etc.
    (s) => s.replace(
        RegExp(`${pulli}(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // அழிய, அழியும், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(i_ii_markers_ii_letter)})(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1, p2,) => p1 + ya + throwingGet(vowelsToMarks, p2,)
    ),
    // பாடி, பாட, etc.
    (s) => s.replace(
        RegExp(`${u_marker}(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // யாவார், கடவார், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(consonants)}|${aa_marker}|${aa_letter})(${anyOfIterable(vowelsToMarks.keys())})`),
        (_unused, p1, p2,) => p1 + va + throwingGet(vowelsToMarks, p2,)
    ),
];
