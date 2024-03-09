import { anyOfArray, anyOfIterable, throwingGet, } from "./utils.js";
import { vowelsToMarks, consonants, pulli, aa_letter, aa_marker, i_ii_markers_ii_letter, u_marker, ya, va, lLa, La, ka_ta_pa, ta, tTa, Ta, } from "./ezuttu.js";

// TODO: Double last consonant of verb if monosyllabic short vowel, like கல்லார், தய்யார்

export const punarcciRules = [
    // க் + இ = கி, etc.
    (s) => s.replace(
        RegExp(`${pulli}(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // அழிய, அழியும், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(i_ii_markers_ii_letter)})(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1, p2,) => p1 + ya + throwingGet(vowelsToMarks, p2,),
    ),
    // பாடி, பாட, etc.
    (s) => s.replace(
        RegExp(`${u_marker}(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,),
    ),
    // யாவார், கடவார், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(consonants)}|${aa_marker}|${aa_letter})(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1, p2,) => p1 + va + throwingGet(vowelsToMarks, p2,),
    ),
    // கேள்க்கும் to கேட்கும்; கேள்த்தார் to கேட்தார்
    (s) => s.replace(
        RegExp(`(${lLa}|${La})${pulli}${anyOfArray(ka_ta_pa)}`, "gv",),
        (_unused, p1) => liquidToStop(p1),
    ),
    // கேட்தார் to கேட்டார்
    (s) => s.replace(
        RegExp(`(${tTa}|${Ta})${pulli}${ta}`, "gv",),
        (_unused, p1) => p1 + pulli + p1,
    ),
];

const liquidToStop = (liquid) => throwingGet(new Map([[lLa, tTa], [La, Ta],]), liquid);
