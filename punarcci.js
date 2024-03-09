import { anyOfArray, anyOfIterable, throwingGet, } from "./utils.js";
import { vowelsToMarks, consonants, pulli, A_letter, A_marker, I_letter_i_I_markers, u_marker, ya, va, lLa, La, ka_ca_ta_pa, ta, tTa, Ta, na, nNa, Na, } from "./ezuttu.js";

// TODO: Double last consonant of verb if monosyllabic short vowel, like கல்லார், தய்யார், விள்ள, கொல்ல, செல்ல, கொள்ள, வெல்ல, ...

export const punarcciRules = [
    // க் + இ = கி, etc.
    (s) => s.replace(
        RegExp(`${pulli}(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,)
    ),
    // அழிய, அழியும், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(I_letter_i_I_markers)})(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1, p2,) => p1 + ya + throwingGet(vowelsToMarks, p2,),
    ),
    // பாடி, பாட, etc.
    (s) => s.replace(
        RegExp(`${u_marker}(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1,) => throwingGet(vowelsToMarks, p1,),
    ),
    // யாவார், கடவார், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(consonants)}|${A_marker}|${A_letter})(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1, p2,) => p1 + va + throwingGet(vowelsToMarks, p2,),
    ),
    // கேள்க்கும் to கேட்கும்; கேள்த்தார் to கேட்தார்
    (s) => s.replace(
        RegExp(`(${lLa}|${La})${pulli}${anyOfArray(ka_ca_ta_pa)}${pulli}`, "gv",),
        (_unused, p1) => liquidToStop(p1) + pulli,
    ),
    // ஆள்ந்தார் to ஆண்தார்; வெல்ந்தார் to வென்தார்
    (s) => s.replace(
        RegExp(`(${lLa}|${La})${pulli}${na}${pulli}`, "gv",),
        (_unused, p1) => liquidToNasal(p1) + pulli,
    ),
    // ஆள்தல் to ஆளுதல்; முயல்தல் to முயலுதல்
    (s) => s.replace(
        RegExp(`(${lLa}|${La})${pulli}${ta}`, "gv",),
        (_unused, p1) => p1 + u_marker + ta,
    ),
    // கேட்தார் to கேட்டார்; தோற்தார் to தோற்றார்
    (s) => s.replace(
        RegExp(`(${tTa}|${Ta})${pulli}${ta}`, "gv",),
        (_unused, p1) => p1 + pulli + p1,
    ),
    // ஆண்தார் to ஆண்டார்; வென்தார் to வென்றார்
    (s) => s.replace(
        RegExp(`(${nNa}|${Na})${pulli}${ta}`, "gv",),
        (_unused, p1) => p1 + pulli + nasalToStop(p1),
    ),
];

const liquidToStop = (liquid) => throwingGet(new Map([[lLa, tTa], [La, Ta],]), liquid);
const liquidToNasal = (liquid) => throwingGet(new Map([[lLa, nNa], [La, Na],]), liquid);
const nasalToStop = (nasal) => throwingGet(new Map([[nNa, tTa], [Na, Ta],]), nasal);
