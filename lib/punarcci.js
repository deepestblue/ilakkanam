import { vowelsToMarks, liquidsToStops, liquidsToNasals, nasalsToStops, மெய்Withஅ, stopsToNasals, புள்ளி, அLetter, ஆLetter, ஆMarker, இLetter, இMarker, ஈLetter, ஈMarker, உLetter, உMarker, ஊLetter, ஊMarker, எLetter, எMarker, ஏLetter, ஏMarker, ஐLetter, ஐMarker, ஒLetter, ஒMarker, ஓLetter, ஓMarker, குறில்Letters, குறில்Markers, வல்லினம்Withஅ, letterOrMark, க, த, ற, ட, ப, ந, ன, ண, ம, ய, ல, வ, ள, } from "./ezuttu.js";

// Regex pattern that matches any of the elements of the passed‐in array.
const anyOfArray = arr => `[${arr.join("",)}]`;

// Regex pattern that matches any of the elements obtainable from the passed‐in iterable.
const anyOfIterable = it => anyOfArray(Array.from(it,),);

const anyமெய்Withஅ = anyOfArray(மெய்Withஅ,);
const anyவல்லினம்Withஅ = anyOfArray(வல்லினம்Withஅ,);
const VOWEL_KEYS = anyOfIterable(vowelsToMarks.keys(),);

export const monosyllabicShortTerminalDoubler = (பகுதி, விகுதி,) => {
    if (! RegExp(`^(${VOWEL_KEYS})`, "v",).exec(விகுதி,)) {
        return பகுதி + விகுதி;
    }
    const பகுதிMatches = RegExp(`^((?:${anyமெய்Withஅ}${anyOfArray(குறில்Markers,)})|(?:${anyமெய்Withஅ})|(?:${anyOfArray(குறில்Letters,)}))(${anyமெய்Withஅ}${புள்ளி})$`, "v",).exec(பகுதி,);
    if (! பகுதிMatches) {
        return பகுதி + விகுதி;
    }
    return `${பகுதிMatches[1]}${பகுதிMatches[2]}${பகுதிMatches[2]}${விகுதி}`;
};
const RE_MONOSYLLABIC_SHORT_TERMINAL = RegExp(`^((?:${anyமெய்Withஅ}${anyOfArray(குறில்Markers,)})|(?:${anyமெய்Withஅ})|(?:${anyOfArray(குறில்Letters,)}))(${anyமெய்Withஅ})${புள்ளி}(${VOWEL_KEYS})`, "v",);
export const monosyllabicShortTerminalDoubler0 = வடிவு => வடிவு.replace(
    RE_MONOSYLLABIC_SHORT_TERMINAL,
    (_unused, p1, p2, p3,) => p1 + p2 + புள்ளி + p2 + புள்ளி + p3,
);

const LONG_TO_SHORT_ஏ_ஓ = new Map([[ஏMarker, எMarker,], [ஓMarker, ஒMarker,], [ஏLetter, எLetter,], [ஓLetter, ஒLetter,],],);
const RE_TERMINAL_EE_OO = RegExp(`(${ஏMarker}|${ஓMarker}|${ஏLetter}|${ஓLetter})$`, "v",);
export const terminalஏஓShortenerWithExtraந் = வடிவு => வடிவு.replace(
    RE_TERMINAL_EE_OO,
    (_unused, p1,) => `${LONG_TO_SHORT_ஏ_ஓ.get(p1,)}${ந}${புள்ளி}`,
);

const RE_LAST_AA_MARKER = RegExp(`${ஆMarker}([^${ஆMarker}]*)$`, "v",);
export const lastஆMarkerShortener = வடிவு => வடிவு.replace(
    RE_LAST_AA_MARKER,
    (_unused, p2,) => p2,
);

const SHORT_TO_LONG_I_II_U_UU_VOWELS_AND_MARKERS = new Map([[இLetter, ஈLetter,], [இMarker, ஈMarker,], [உLetter, ஊLetter,], [உMarker, ஊMarker,],],);
const RE_PENULTIMATE_I_U_IMARKER_UMARKER = RegExp(`(${இLetter}|${இMarker}|${உLetter}|${உMarker})(.)${புள்ளி}`, "v",);
export const penultimateஇஉlengthener = வடிவு => வடிவு.replace(
    RE_PENULTIMATE_I_U_IMARKER_UMARKER,
    (_unused, p1, p2,) => SHORT_TO_LONG_I_II_U_UU_VOWELS_AND_MARKERS.get(p1,) + p2 + புள்ளி,
);

const RE_TERMINAL_AA = RegExp(`${ஆMarker}$`, "v",);
export const terminalஆtoஎconverterWithExtraத் = வடிவு => வடிவு.replace(
    RE_TERMINAL_AA,
    () => `${எMarker}${த}${புள்ளி}`,
);

const RE_TERMINAL_L_LL_STOPPER = RegExp(`(${ல}|${ள})${புள்ளி}$`, "v",);
export const terminalல்ள்Stopper = வடிவு => வடிவு.replace(
    RE_TERMINAL_L_LL_STOPPER,
    (_unused, p1,) => liquidsToStops.get(p1,) + புள்ளி,
);

const RE_TERMINAL_VU = RegExp(`${வ}${உMarker}$`, "v",);
export const terminalவுRemover = வடிவு => வடிவு.replace(
    RE_TERMINAL_VU,
    () => "",
);

const RE_TERMINAL_U = RegExp(`(${உLetter}|${உMarker})$`, "v",);
export const terminalஉRemover = வடிவு => வடிவு.replace(
    RE_TERMINAL_U,
    () => "",
);

const RE_TERMINAL_THA = RegExp(`${த}$`, "v",);
export const terminalதNasaliser = வடிவு => வடிவு.replace(
    RE_TERMINAL_THA,
    () => stopsToNasals.get(த,),
);

const RE_LAST_STOP_DOUBLER = RegExp(`(?:(${anyOfIterable(stopsToNasals.values(),)})${புள்ளி})?(${anyOfIterable(stopsToNasals.keys(),)})${உMarker}$`, "v",);
export const lastStopDoubler = வடிவு => வடிவு.replace(
    RE_LAST_STOP_DOUBLER,
    (_unused, _p1, p2,) => p2 + புள்ளி + p2 + உMarker,
);

export const புணர்ச்சிவிதிகள் = [
    s => s.replace(
        RegExp(`(${இLetter}|${இMarker}|${ஈLetter}|${ஈMarker}|${ஏLetter}|${ஏMarker})(${VOWEL_KEYS})`, "gv",),
        (_unused, p1, p2,) => p1 + ய + புள்ளி + p2,
    ),
    s => s.replace(
        RegExp(`(${anyமெய்Withஅ}|${ஆMarker}|${ஆLetter}|${ஊMarker}|${ஊLetter}|${ஒMarker}|${ஒLetter}|${ஓMarker}|${ஓLetter})(${VOWEL_KEYS})`, "gv",),
        (_unused, p1, p2,) => p1 + வ + புள்ளி + p2,
    ),
    s => s.replace(
        RegExp(`${அLetter}${புள்ளி}`, "gv",),
        () => "",
    ),
    s => s.replace(
        RegExp(`(?:${புள்ளி}|${உMarker})(${VOWEL_KEYS})`, "gv",),
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    s => s.replace(
        RegExp(`(${ல}|${ள})${புள்ளி}${anyவல்லினம்Withஅ}${புள்ளி}`, "gv",),
        (_unused, p1,) => liquidsToStops.get(p1,) + புள்ளி,
    ),
    s => s.replace(
        RegExp(`(${ல}|${ள})${புள்ளி}${ந}`, "gv",),
        (_unused, p1,) => liquidsToNasals.get(p1,),
    ),
    s => s.replace(
        RegExp(`(${ல}|${ள})${புள்ளி}${ம}`, "gv",),
        (_unused, p1,) => liquidsToNasals.get(p1,) + புள்ளி + ம,
    ),
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${த}${புள்ளி}`, "gv",),
        (_unused, p1,) => nasalsToStops.get(p1,) + புள்ளி,
    ),
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + nasalsToStops.get(p1,),
    ),
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${ந}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + p1,
    ),
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${வ}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + ப,
    ),
    s => s.replace(
        RegExp(`(${ற}|${ட}|${க})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + p1,
    ),
    s => s.replace(
        RegExp(`${ம}${புள்ளி}(${anyவல்லினம்Withஅ})`, "gv",),
        (_unused, p1,) => stopsToNasals.get(p1,) + புள்ளி + p1,
    ),
    s => s.replace(
        RegExp(`${வ}${வ}(?!${புள்ளி})`, "gv",),
        () => ப + வ,
    ),
/* SKIP
    s => s.replace(
        RegExp(`^${ஒLetter}${வ}`, "gv",),
        () => ஒLetter + வ + புள்ளி + வ,
    ),
    */
];

// Conversion from modern spelling to traditional
export const அய்காரத்துப்பழயவிதிகள் = [
    s => s.replace(
        RegExp(`(${letterOrMark}${letterOrMark})${ஐMarker}${ய}`, "gv",),
        (_unused, p1,) => `${p1}${ய}`,
    ),
    s => s.replace(
        RegExp(`${ஐMarker}`, "gv",),
        () => `${ய}${புள்ளி}`,
    ),
    s => s.replace(
        RegExp(`${ஐLetter}`, "gv",),
        () => `${அLetter}${ய}${புள்ளி}`,
    ),
];

// Conversion from traditional to modern spelling
export const அய்காரத்துப்புதுவிதிகள் = [
    s => s.replace(
        RegExp(`(${anyமெய்Withஅ})${ய}${புள்ளி}`, "gv",),
        (_unused, p1,) => `${p1}${ஐMarker}`,
    ),
    s => s.replace(
        RegExp(`(${letterOrMark}${anyமெய்Withஅ})${ய}`, "gv",),
        (_unused, p1,) => `${p1}${ஐMarker}${ய}`,
    ),
    s => s.replace(
        RegExp(`${அLetter}${ய}${புள்ளி}`, "gv",),
        () => `${ஐLetter}`,
    ),
];
