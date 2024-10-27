import { anyOfArray, anyOfIterable, } from "./utils.js";
import { vowelsToMarks, consonants, stopsToNasals, புள்ளி, ஆLetter, ஆMarker, ஈLetterஇஈMarkers, உLetter, உMarker, ஊLetter, எMarker, ஏMarker, ஐMarker, ஒLetter, ஒMarker, ஓLetter, ஓMarker, குறில், கசதப, த, ற, ட, ந, ன, ண, ப, ய, ல, வ, ள, } from "./ezuttu.js";

export const liquidToStop = liquid => (new Map([[ல, ற,], [ள, ட,],],)).get(liquid,);
const liquidToNasal = liquid => (new Map([[ல, ன,], [ள, ண,],],)).get(liquid,);
const nasalToStop = nasal => (new Map([[ன, ற,], [ண, ட,],],)).get(nasal,);
const longToShortVowelMarker = vowelMarker => (new Map([[ஏMarker, எMarker,], [ஓMarker, ஒMarker,],],)).get(vowelMarker,);

export const monosyllabicShortTerminalDoubler = வினய் => வினய்.replace(
    RegExp(`^(${anyOfArray(consonants,)}?${anyOfArray(குறில்,)}?)(.)${புள்ளி}$`, "v",),
    `$1$2${புள்ளி}$2${புள்ளி}`,
);

export const terminalஏஓShortener = வினய் => வினய்.replace(
    RegExp(`(${ஏMarker}|${ஓMarker})$`, "v",),
    (_unused, p1,) => longToShortVowelMarker(p1,),
);

export const lastஆShortener = வினய் => வினய்.replace(
    RegExp(`${ஆMarker}([^${ஆMarker}]*)$`, "v",),
    `$1`,
);

export const initialஉLengthener = வினய் => வினய்.replace(
    RegExp(`^${உLetter}`, "v",),
    `${ஊLetter}`,
);

export const terminalல்Stopper = வினய் => வினய்.replace(
    RegExp(`(${ல})${புள்ளி}$`, "v",),
    (_unused, p1,) => liquidToStop(p1,) + புள்ளி,
);

export const terminalவுRemover = வினய் => வினய்.replace(
    RegExp(`${வ}${உMarker}$`, "v",),
    () => "",
);

export const terminalஉRemover = வினய் => வினய்.replace(
    RegExp(`${உMarker}$`, "v",),
    () => "",
);

export const terminalதNasaliser = வினய் => வினய்.replace(
    RegExp(`(${த})$`, "v",),
    (_unused, p1,) => stopsToNasals.get(p1,),
);

export const lastStopDoubler = (வினய்,) => {
    const regexp = RegExp(`(?:(${anyOfArray(Array.from(stopsToNasals.values(),),)})${புள்ளி})?(${anyOfArray(Array.from(stopsToNasals.keys(),),)})${உMarker}$`, "v",);
    const match = வினய்.match(regexp,);
    if (! match) {
        throw new Error(`Expected வினய் to end in stop followed by உ.`,);
    }

    return வினய்.replace(regexp,
        (_unused, _p1, p2,) => p2 + புள்ளி + p2 + உMarker,
    );
};

const புணர்ச்சிவிதி = [
    // க் + இ = கி, etc.
    s => s.replace(
        RegExp(`${புள்ளி}(${anyOfIterable(vowelsToMarks.keys(),)})`, "gv",),
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    // பாடி, பாட, etc.
    s => s.replace(
        RegExp(`${உMarker}(${anyOfIterable(vowelsToMarks.keys(),)})`, "gv",),
        (_unused, p1,) => vowelsToMarks.get(p1,),
    ),
    // அழிய, அழியும், etc.
    s => s.replace(
        RegExp(`(${anyOfArray(ஈLetterஇஈMarkers,)})(${anyOfIterable(vowelsToMarks.keys(),)})`, "gv",),
        (_unused, p1, p2,) => p1 + ய + vowelsToMarks.get(p2,),
    ),
    // யாவார், கடவார், ஓவார், etc.
    s => s.replace(
        RegExp(`(${anyOfArray(consonants,)}|${ஆMarker}|${ஆLetter}|${ஓMarker}|${ஓLetter})(${anyOfIterable(vowelsToMarks.keys(),)})`, "gv",),
        (_unused, p1, p2,) => p1 + வ + vowelsToMarks.get(p2,),
    ),
    // ஒவ்வார், etc.
    s => s.replace(
        RegExp(`(^${ஒLetter})(${anyOfIterable(vowelsToMarks.keys(),)})`, "gv",),
        (_unused, p1, p2,) => p1 + வ + புள்ளி + வ + vowelsToMarks.get(p2,),
    ),
    // கேள்க்கும் to கேட்கும்; கேள்த்தார் to கேட்தார்
    s => s.replace(
        RegExp(`(${ல}|${ள})${புள்ளி}${anyOfArray(கசதப,)}${புள்ளி}`, "gv",),
        (_unused, p1,) => liquidToStop(p1,) + புள்ளி,
    ),
    // செல்தல் to செல்ல்தல்; கொள்தல் to கொள்ள்தல்
    s => s.replace(
        RegExp(`^(${anyOfArray(consonants,)}?${anyOfArray(குறில்,)}?)(${ல}|${ள})${புள்ளி}${த}`, "v",),
        (_unused, p1, p2,) => p1 + p2 + புள்ளி + p2 + புள்ளி + த,
    ),
    // முயல்தல் to முயலுதல்; ஆள்தல் to ஆளுதல்; செல்ல்தல் to செல்லுதல்; கொள்ள்தல் to கொள்ளுதல்
    s => s.replace(
        RegExp(`(${ல}|${ள})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + உMarker + த,
    ),
    // ஊண்த்து to ஊட்து
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${த}${புள்ளி}`, "gv",),
        (_unused, p1,) => nasalToStop(p1,) + புள்ளி,
    ),
    // ஆள்ந்தார் to ஆண்தார்; வெல்ந்தார் to வென்தார்
    s => s.replace(
        RegExp(`(${ல}|${ள})${புள்ளி}${ந}`, "gv",),
        (_unused, p1,) => liquidToNasal(p1,),
    ),
    // கேட்தார் to கேட்டார்; தோற்தார் to தோற்றார்
    s => s.replace(
        RegExp(`(${ற}|${ட})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + p1,
    ),
    // ஆண்தார் to ஆண்டார்; வென்தார் to வென்றார்
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${த}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + nasalToStop(p1,),
    ),
    // சொல்ன to சொன்ன
    s => s.replace(
        RegExp(`${ல}${புள்ளி}${ன}`, "gv",),
        () => ன + புள்ளி + ன,
    ),
    s => s.replace(
        RegExp(`${ள}${புள்ளி}${ண}`, "gv",),
        () => ண + புள்ளி + ண,
    ),
    // தின்வார் and உண்வார் to தின்பார் and உண்பார் respectively
    s => s.replace(
        RegExp(`(${ன}|${ண})${புள்ளி}${வ}`, "gv",),
        (_unused, p1,) => p1 + புள்ளி + ப,
    ),
];

// Conversion from traditional to modern spelling
const அய்காரத்துப்புதுவிதி = [
    s => s.replace(
        RegExp(`(${anyOfArray(consonants,)})${ய}${புள்ளி}`, "gv",),
        (_unused, p1,) => `${p1}${ஐMarker}`,
    ),
    s => s.replace(
        RegExp(`(${anyOfArray(consonants,)})${ய}`, "gv",),
        (_unused, p1,) => `${p1}${ஐMarker}${ய}`,
    ),
];

export const புணர்ச்சி = (புத்தெழுத்துமுறயோ,) => {
    if (! புத்தெழுத்துமுறயோ) {
        return புணர்ச்சிவிதி;
    }

    return புணர்ச்சிவிதி.concat(அய்காரத்துப்புதுவிதி,);
};

// Conversion from modern spelling to traditional

export const அய்காரத்துப்பழயவிதி = [
    s => s.replace(
        RegExp(`${ஐMarker}${ய}`, "gv",),
        (_unused,) => `${ய}`,
    ),
    s => s.replace(
        RegExp(`${ஐMarker}`, "gv",),
        (_unused,) => `${ய}${புள்ளி}`,
    ),
];
