import { anyOfArray, anyOfIterable, } from "./utils.js";
import { vowelsToMarks, consonants, புள்ளி, ஆ_letter, ஆ_marker, ஈ_letter_இ_ஈ_markers, உ_marker, க_ச_த_ப, த, ற, ட, ந, ன, ண, ப, ய, ல, வ, ள, } from "./ezuttu.js";

export const புணர்ச்சி = [
    // க் + இ = கி, etc.
    (s) => s.replace(
        RegExp(`${புள்ளி}(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    // பாடி, பாட, etc.
    (s) => s.replace(
        RegExp(`${உ_marker}(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    // அழிய, அழியும், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(ஈ_letter_இ_ஈ_markers)})(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1, p2,) => p1 + ய + vowelsToMarks.get(p2,),
    ),
    // யாவார், கடவார், etc.
    (s) => s.replace(
        RegExp(`(${anyOfArray(consonants)}|${ஆ_marker}|${ஆ_letter})(${anyOfIterable(vowelsToMarks.keys())})`, "gv",),
        (_unused, p1, p2,) => p1 + வ + vowelsToMarks.get(p2,),
    ),
    // கேள்க்கும் to கேட்கும்; கேள்த்தார் to கேட்தார்
    (s) => s.replace(
        RegExp(`(${ள}|${ள})${புள்ளி}${anyOfArray(க_ச_த_ப)}${புள்ளி}`, "gv",),
        (_unused, p1,) => liquidToStop(p1,) + புள்ளி,
    ),
    // ஆள்ந்தார் to ஆண்தார்; வெல்ந்தார் to வென்தார்
    (s) => s.replace(
        RegExp(`(${ள}|${ள})${புள்ளி}${ந}`, "gv",),
        (_unused, p1,) => liquidToNasal(p1,),
    ),
    // கேட்தார் to கேட்டார்; தோற்தார் to தோற்றார்
    (s) => s.replace(
        RegExp(`(${ற}|${ட})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + p1,
    ),
    // ஆண்தார் to ஆண்டார்; வென்தார் to வென்றார்
    (s) => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + nasalToStop(p1),
    ),
    // சொல்ன to சொன்ன
    (s) => s.replace(
        RegExp(`${ல}${புள்ளி}${ன}`, "gv",),
        (_unused) => ன + புள்ளி + ன,
    ),
    (s) => s.replace(
        RegExp(`${ள}${புள்ளி}${ண}`, "gv",),
        (_unused) => ண + புள்ளி + ண,
    ),
    (s) => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${வ}`, "gv",),
        (_unused, p1) => p1 + புள்ளி + ப,
    ),
];

const liquidToStop = (liquid) => (new Map([[ல, ற], [ள, ட],])).get(liquid,);
const liquidToNasal = (liquid) => (new Map([[ல, ன], [ள, ண],])).get(liquid,);
const nasalToStop = (nasal) => (new Map([[ன, ற], [ண, ட],])).get(nasal,);
