import { vowelsToMarks, marksToVowels, vowelMarkers, liquidsToStops, liquidsToNasals, nasalsToStops, மெய்Withஅ, stopsToNasals, புள்ளி, அLetter, ஆLetter, ஆMarker, இLetter, இMarker, ஈLetter, ஈMarker, உLetter, உMarker, ஊLetter, ஊMarker, எLetter, எMarker, ஏLetter, ஏMarker, ஐLetter, ஐMarker, ஒLetter, ஒMarker, ஓLetter, ஓMarker, குறில்Letters, குறில்Markers, வல்லினம்Withஅ, letterOrMark, க, த, ற, ட, ப, ங, ந, ன, ண, ம, ய, ல, வ, ள, } from "./ezuttu.js";

// Regex pattern that matches any of the elements of the passed‐in array.
const anyOfArray = arr => `[${arr.join("",)}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
const anyOfIterable = it => anyOfArray(Array.from(it,),);

const anyமெய்Withஅ = anyOfArray(மெய்Withஅ,);
const VOWEL_KEYS = anyOfIterable(vowelsToMarks.keys(),);

const RE_MONOSYLLABIC_SHORT_TERMINAL = RegExp(`^((?:${anyமெய்Withஅ}${anyOfArray(குறில்Markers,)})|(?:${anyமெய்Withஅ})|(?:${anyOfArray(குறில்Letters,)}))(${anyமெய்Withஅ})${புள்ளி}(${VOWEL_KEYS})`, "v",);
export const monosyllabicShortTerminalDoubler = பகுதி => பகுதி.replace(
    RE_MONOSYLLABIC_SHORT_TERMINAL,
    (_unused, p1, p2, p3,) => p1 + p2 + புள்ளி + p2 + புள்ளி + p3,
);

const LONG_TO_SHORT_ஏ_ஓ = new Map([[ஏMarker, எMarker,], [ஓMarker, ஒMarker,], [ஏLetter, எLetter,], [ஓLetter, ஒLetter,],],);
const RE_TERMINAL_EE_OO = RegExp(`(${ஏMarker}|${ஓMarker}|${ஏLetter}|${ஓLetter})$`, "v",);
export const terminalஏஓShortenerWithExtraந் = பகுதி => பகுதி.replace(
    RE_TERMINAL_EE_OO,
    (_unused, p1,) => `${LONG_TO_SHORT_ஏ_ஓ.get(p1,)}${ந}${புள்ளி}`,
);

const AA_LETTER_OR_MARKER = anyOfArray([ஆLetter, ஆMarker,],);
const RE_LAST_AA = RegExp(`(${AA_LETTER_OR_MARKER})([^${AA_LETTER_OR_MARKER}]*)$`, "v",);
export const lastஆShortener = பகுதி => பகுதி.replace(
    RE_LAST_AA,
    (_unused, p1, p2,) => (p1 === ஆMarker) ? p2 : `${அLetter}${p2}`,
);

const SHORT_TO_LONG_I_II_U_UU_VOWELS_AND_MARKERS = new Map([[இLetter, ஈLetter,], [இMarker, ஈMarker,], [உLetter, ஊLetter,], [உMarker, ஊMarker,],],);
const RE_PENULTIMATE_I_U_IMARKER_UMARKER = RegExp(`(${இLetter}|${இMarker}|${உLetter}|${உMarker})(.)${புள்ளி}`, "v",);
export const penultimateஇஉlengthener = பகுதி => பகுதி.replace(
    RE_PENULTIMATE_I_U_IMARKER_UMARKER,
    (_unused, p1, p2,) => SHORT_TO_LONG_I_II_U_UU_VOWELS_AND_MARKERS.get(p1,) + p2 + புள்ளி,
);

const RE_TERMINAL_AA = RegExp(`${ஆMarker}$`, "v",);
export const terminalஆtoஎconverterWithExtraத் = பகுதி => பகுதி.replace(
    RE_TERMINAL_AA,
    () => `${எMarker}${த}${புள்ளி}`,
);

const RE_TERMINAL_L_STOPPER = RegExp(`(${ல})${புள்ளி}$`, "v",);
export const terminalல்Stopper = பகுதி => பகுதி.replace(
    RE_TERMINAL_L_STOPPER,
    (_unused, p1,) => liquidsToStops.get(p1,) + புள்ளி,
);

const RE_TERMINAL_VU = RegExp(`${வ}${உMarker}$`, "v",);
export const terminalவுRemover = பகுதி => பகுதி.replace(
    RE_TERMINAL_VU,
    () => "",
);

const RE_TERMINAL_U = RegExp(`(${உLetter}|${உMarker})$`, "v",);
export const terminalஉRemover = பகுதி => பகுதி.replace(
    RE_TERMINAL_U,
    () => "",
);

const RE_TERMINAL_THA = RegExp(`(${த})$`, "v",);
export const terminalதNasaliser = பகுதி => பகுதி.replace(
    RE_TERMINAL_THA,
    (_unused, p1,) => stopsToNasals.get(p1,),
);

const RE_LAST_STOP_DOUBLER = RegExp(`(?:(${anyOfIterable(stopsToNasals.values(),)})${புள்ளி})?(${anyOfIterable(stopsToNasals.keys(),)})${உMarker}$`, "v",);
export const lastStopDoubler = பகுதி => பகுதி.replace(
    RE_LAST_STOP_DOUBLER,
    (_unused, _p1, p2,) => p2 + புள்ளி + p2 + உMarker,
);

const RE_PUNARCCI1 = RegExp(`${புள்ளி}(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI2 = RegExp(`${உMarker}(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI3 = RegExp(`(${இLetter}|${இMarker}|${ஈLetter}|${ஈMarker}|${ஏLetter}|${ஏMarker})(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI4 = RegExp(`(${anyமெய்Withஅ}|${ஆMarker}|${ஆLetter}|${ஊMarker}|${ஊLetter}|${ஓMarker}|${ஓLetter})(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI5 = RegExp(`(^${ஒLetter})(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI6 = RegExp(`(${ல}|${ள})${புள்ளி}${anyOfArray(வல்லினம்Withஅ,)}${புள்ளி}`, "gv",);
const RE_PUNARCCI7 = RegExp(`(${ன}|${ண})${புள்ளி}${த}${புள்ளி}`, "gv",);
const RE_PUNARCCI8 = RegExp(`(${ல}|${ள})${புள்ளி}${ந}`, "gv",);
const RE_PUNARCCI9 = RegExp(`(${ற}|${ட})${புள்ளி}${த}`, "gv",);
const RE_PUNARCCI10 = RegExp(`(${ன}|${ண})${புள்ளி}${ந}`, "gv",);
const RE_PUNARCCI11 = RegExp(`(${ன}|${ண})${புள்ளி}${த}`, "gv",);
const RE_PUNARCCI12 = RegExp(`(${ன}|${ண})${புள்ளி}${வ}`, "gv",);
const RE_PUNARCCI13 = RegExp(`${ம}${புள்ளி}${க}`, "gv",);
const RE_PUNARCCI14 = RegExp(`${வ}(${வ}${anyமெய்Withஅ}${புள்ளி})`, "gv",);
const RE_PUNARCCI15 = RegExp(`(${ல}|${ள})${புள்ளி}${ம}`, "gv",);
const RE_PUNARCCI16 = RegExp(`${அLetter}${புள்ளி}`, "gv",);
const RE_PUNARCCI17 = RegExp(`${அLetter}(${anyOfIterable(vowelMarkers,)})`, "gv",);

export const புணர்ச்சிவிதிகள் = [
    s => s.replace(
        RE_PUNARCCI1,
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    s => s.replace(
        RE_PUNARCCI2,
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    s => s.replace(
        RE_PUNARCCI3,
        (_unused, p1, p2,) => p1 + ய + vowelsToMarks.get(p2,),
    ),
    s => s.replace(
        RE_PUNARCCI4,
        (_unused, p1, p2,) => p1 + வ + vowelsToMarks.get(p2,),
    ),
    s => s.replace(
        RE_PUNARCCI5,
        (_unused, p1, p2,) => p1 + வ + புள்ளி + வ + vowelsToMarks.get(p2,),
    ),
    s => s.replace(
        RE_PUNARCCI6,
        (_unused, p1,) => liquidsToStops.get(p1,) + புள்ளி,
    ),
    s => s.replace(
        RE_PUNARCCI7,
        (_unused, p1,) => nasalsToStops.get(p1,) + புள்ளி,
    ),
    s => s.replace(
        RE_PUNARCCI8,
        (_unused, p1,) => liquidsToNasals.get(p1,),
    ),
    s => s.replace(
        RE_PUNARCCI9,
        (_unused, p1,) => p1 + புள்ளி + p1,
    ),
    s => s.replace(
        RE_PUNARCCI10,
        (_unused, p1,) => p1 + புள்ளி + p1,
    ),
    s => s.replace(
        RE_PUNARCCI11,
        (_unused, p1,) => p1 + புள்ளி + nasalsToStops.get(p1,),
    ),
    s => s.replace(
        RE_PUNARCCI12,
        (_unused, p1,) => p1 + புள்ளி + ப,
    ),
    s => s.replace(
        RE_PUNARCCI13,
        () => ங + புள்ளி + க,
    ),
    s => s.replace(
        RE_PUNARCCI14,
        (_unused, p1,) => ப + p1,
    ),
    s => s.replace(
        RE_PUNARCCI15,
        (_unused, p1,) => liquidsToNasals.get(p1,) + புள்ளி + ம,
    ),
    s => s.replace(
        RE_PUNARCCI16,
        () => "",
    ),
    s => s.replace(
        RE_PUNARCCI17,
        (_unused, p1,) => marksToVowels.get(p1,),
    ),
];

// Conversion from modern spelling to traditional
const RE_OLD_AIKARAM1 = RegExp(`(${letterOrMark}${letterOrMark})${ஐMarker}${ய}`, "gv",);
const RE_OLD_AIKARAM2 = RegExp(`${ஐMarker}`, "gv",);
const RE_OLD_AIKARAM3 = RegExp(`${ஐLetter}`, "gv",);
export const அய்காரத்துப்பழயவிதிகள் = [
    s => s.replace(
        RE_OLD_AIKARAM1,
        (_unused, p1,) => `${p1}${ய}`,
    ),
    s => s.replace(
        RE_OLD_AIKARAM2,
        () => `${ய}${புள்ளி}`,
    ),
    s => s.replace(
        RE_OLD_AIKARAM3,
        () => `${அLetter}${ய}${புள்ளி}`,
    ),
];

// Conversion from traditional to modern spelling
const RE_AIKARAM1 = RegExp(`(${anyமெய்Withஅ})${ய}${புள்ளி}`, "gv",);
const RE_AIKARAM2 = RegExp(`(${letterOrMark}${anyமெய்Withஅ})${ய}`, "gv",);
const RE_AIKARAM3 = RegExp(`${அLetter}${ய}${புள்ளி}`, "gv",);
export const அய்காரத்துப்புதுவிதிகள் = [
    s => s.replace(
        RE_AIKARAM1,
        (_unused, p1,) => `${p1}${ஐMarker}`,
    ),
    s => s.replace(
        RE_AIKARAM2,
        (_unused, p1,) => `${p1}${ஐMarker}${ய}`,
    ),
    s => s.replace(
        RE_AIKARAM3,
        () => `${ஐLetter}`,
    ),
];
