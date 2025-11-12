import { anyOfArray, anyOfIterable, } from "./utils.js";
import { vowelsToMarks, மெய், stopsToNasals, புள்ளி, அLetter, ஆLetter, ஆMarker, இLetter, இMarker, ஈLetter, ஈMarker, உLetter, உMarker, ஊLetter, ஊMarker, எLetter, எMarker, ஏLetter, ஏMarker, ஐLetter, ஐMarker, ஒLetter, ஒMarker, ஓLetter, ஓMarker, குறில்Letters, குறில்Markers, கசதப, த, ற, ட, ந, ன, ண, ப, ய, ல, வ, ள, } from "./ezuttu.js";

const LIQUID_TO_STOP = new Map([[ல, ற,], [ள, ட,],],);
const LIQUID_TO_NASAL = new Map([[ல, ன,], [ள, ண,],],);
const NASAL_TO_STOP = new Map([[ன, ற,], [ண, ட,],],);
const LONG_TO_SHORT_ஏ_ஓ = new Map([[ஏMarker, எMarker,], [ஓMarker, ஒMarker,], [ஏLetter, எLetter,], [ஓLetter, ஒLetter,],],);
const SHORT_TO_LONG_I_II_U_UU_VOWELS_AND_MARKERS = new Map([[இLetter, ஈLetter,], [இMarker, ஈMarker,], [உLetter, ஊLetter,], [உMarker, ஊMarker,],],);

const மெய்_FRAG = anyOfArray(மெய்,);
const கசதப_FRAG = anyOfArray(கசதப,);
const VOWEL_KEYS = anyOfIterable(vowelsToMarks.keys(),);
const STOPS_VALUES = anyOfIterable(stopsToNasals.values(),);
const STOPS_KEYS = anyOfIterable(stopsToNasals.keys(),);
const AA_LETTER_OR_MARKER = anyOfArray([ஆLetter, ஆMarker,],);

const RE_MONOSYLLABIC_SHORT_TERMINAL = RegExp(`^((?:${மெய்_FRAG}(?:${anyOfArray(குறில்Markers,)}))|(?:${மெய்_FRAG})|(?:${anyOfArray(குறில்Letters,)}))(${மெய்_FRAG})${புள்ளி}(${VOWEL_KEYS})`, "v",);
const RE_TERMINAL_EE_OO = RegExp(`(${ஏMarker}|${ஓMarker}|${ஏLetter}|${ஓLetter})$`, "v",);
const RE_LAST_AA = RegExp(`(${AA_LETTER_OR_MARKER})([^${AA_LETTER_OR_MARKER}]*)$`, "v",);
const RE_TERMINAL_AA = RegExp(`(${AA_LETTER_OR_MARKER})$`, "v",);
const RE_PENULTIMATE_I_U_IMARKER_UMARKER = RegExp(`(${இLetter}|${இMarker}|${உLetter}|${உMarker})(.)${புள்ளி}`, "v",);
const RE_TERMINAL_L_STOPPER = RegExp(`(${ல})${புள்ளி}$`, "v",);
const RE_TERMINAL_V_U = RegExp(`${வ}${உMarker}$`, "v",);
const RE_TERMINAL_U = RegExp(`(${உLetter}|${உMarker})$`, "v",);
const RE_TERMINAL_THA = RegExp(`(${த})$`, "v",);
const RE_LAST_STOP_DOUBLER = RegExp(`(?:(${STOPS_VALUES})${புள்ளி})?(${STOPS_KEYS})${உMarker}$`, "v",);

export const liquidToStop = liquid => LIQUID_TO_STOP.get(liquid,);
const liquidToNasal = liquid => LIQUID_TO_NASAL.get(liquid,);
const nasalToStop = nasal => NASAL_TO_STOP.get(nasal,);
const longToShortஏஓ = vowelMarker => LONG_TO_SHORT_ஏ_ஓ.get(vowelMarker,);
const shortToLongஇஈஉஊVowelsAndMarkers = vowelOrMarker => SHORT_TO_LONG_I_II_U_UU_VOWELS_AND_MARKERS.get(vowelOrMarker,);

export const monosyllabicShortTerminalDoubler = பகுதி => பகுதி.replace(
    RE_MONOSYLLABIC_SHORT_TERMINAL,
    (_unused, p1, p2, p3,) => p1 + p2 + புள்ளி + p2 + புள்ளி + p3,
);

export const terminalஏஓShortener = பகுதி => பகுதி.replace(
    RE_TERMINAL_EE_OO,
    (_unused, p1,) => longToShortஏஓ(p1,),
);

export const lastஆShortener = பகுதி => பகுதி.replace(
    RE_LAST_AA,
    (_unused, p1, p2,) => (p1 === ஆMarker) ? p2 : `${அLetter}${p2}`,
);

export const penultimateஇஉlengthener = பகுதி => பகுதி.replace(
    RE_PENULTIMATE_I_U_IMARKER_UMARKER,
    (_unused, p1, p2,) => shortToLongஇஈஉஊVowelsAndMarkers(p1,) + p2 + புள்ளி,
);

export const terminalஆtoஎconverter = பகுதி => பகுதி.replace(
    RE_TERMINAL_AA,
    (_unused, p1,) => (p1 === ஆMarker) ? எMarker : எLetter,
);

export const terminalல்Stopper = பகுதி => பகுதி.replace(
    RE_TERMINAL_L_STOPPER,
    (_unused, p1,) => liquidToStop(p1,) + புள்ளி,
);

export const terminalவுRemover = பகுதி => பகுதி.replace(
    RE_TERMINAL_V_U,
    () => "",
);

export const terminalஉRemover = பகுதி => பகுதி.replace(
    RE_TERMINAL_U,
    () => "",
);

export const terminalதNasaliser = பகுதி => பகுதி.replace(
    RE_TERMINAL_THA,
    (_unused, p1,) => stopsToNasals.get(p1,),
);

export const lastStopDoubler = பகுதி => பகுதி.replace(
    RE_LAST_STOP_DOUBLER,
    (_unused, _p1, p2,) => p2 + புள்ளி + p2 + உMarker,
);

const RE_PUNARCCI1 = RegExp(`${புள்ளி}(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI2 = RegExp(`${உMarker}(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI3 = RegExp(`(${இLetter}|${இMarker}|${ஈLetter}|${ஈMarker}|${ஏLetter}|${ஏMarker})(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI4 = RegExp(`(${மெய்_FRAG}|${ஆMarker}|${ஆLetter}|${ஊMarker}|${ஊLetter}|${ஓMarker}|${ஓLetter})(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI5 = RegExp(`(^${ஒLetter})(${VOWEL_KEYS})`, "gv",);
const RE_PUNARCCI6 = RegExp(`(${ல}|${ள})${புள்ளி}${கசதப_FRAG}${புள்ளி}`, "gv",);
const RE_PUNARCCI7 = RegExp(`(${ன}|${ண})${புள்ளி}${த}${புள்ளி}`, "gv",);
const RE_PUNARCCI8 = RegExp(`(${ல}|${ள})${புள்ளி}${ந}`, "gv",);
const RE_PUNARCCI9 = RegExp(`(${ற}|${ட})${புள்ளி}${த}`, "gv",);
const RE_PUNARCCI10 = RegExp(`(${ன}|${ண})${புள்ளி}${ந}`, "gv",);
const RE_PUNARCCI11 = RegExp(`(${ன}|${ண})${புள்ளி}${த}`, "gv",);
const RE_PUNARCCI12 = RegExp(`(${ன}|${ண})${புள்ளி}${வ}`, "gv",);

const புணர்ச்சிவிதி = [
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
        (_unused, p1,) => liquidToStop(p1,) + புள்ளி,
    ),
    s => s.replace(
        RE_PUNARCCI7,
        (_unused, p1,) => nasalToStop(p1,) + புள்ளி,
    ),
    s => s.replace(
        RE_PUNARCCI8,
        (_unused, p1,) => liquidToNasal(p1,),
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
        (_unused, p1,) => p1 + புள்ளி + nasalToStop(p1,),
    ),
    s => s.replace(
        RE_PUNARCCI12,
        (_unused, p1,) => p1 + புள்ளி + ப,
    ),
];

// Conversion from modern spelling to traditional
const RE_OLD_AIKARAM1 = RegExp(`(${ஐLetter}|${ஐMarker})${ய}`, "gv",);
const RE_OLD_AIKARAM2 = RegExp(`(${ஐLetter}|${ஐMarker})`, "gv",);
export const அய்காரத்துப்பழயவிதி = [
    s => s.replace(
        RE_OLD_AIKARAM1,
        () => `${ய}`,
    ),
    s => s.replace(
        RE_OLD_AIKARAM2,
        () => `${ய}${புள்ளி}`,
    ),
];

// Conversion from traditional to modern spelling
const RE_AIKARAM1 = RegExp(`(${மெய்_FRAG})${ய}${புள்ளி}`, "gv",);
const RE_AIKARAM2 = RegExp(`(${மெய்_FRAG})${ய}`, "gv",);
const RE_AIKARAM3 = RegExp(`${அLetter}${ய}${புள்ளி}`, "gv",);
const RE_AIKARAM4 = RegExp(`${அLetter}${ய}`, "gv",);
const அய்காரத்துப்புதுவிதி = [
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
    s => s.replace(
        RE_AIKARAM4,
        () => `${ஐLetter}${ய}`,
    ),
];

export const புணர்ச்சி = புத்தெழுத்துமுறயோ => {
    if (! புத்தெழுத்துமுறயோ) {
        return புணர்ச்சிவிதி;
    }

    return புணர்ச்சிவிதி.concat(அய்காரத்துப்புதுவிதி,);
};
