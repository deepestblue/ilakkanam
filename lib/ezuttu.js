export const vowelsToMarks = new Map([
    ["அ", "",], ["ஆ", "ா",], ["இ", "ி",], ["ஈ", "ீ",], ["உ", "ு",], ["ஊ", "ூ",],
    ["எ", "ெ",], ["ஏ", "ே",], ["ஒ", "ொ",], ["ஓ", "ோ",],
],);

export const புள்ளி = "்";

export const அLetter = "அ";
export const ஆLetter = "ஆ";
export const ஆMarker = "ா";
export const இLetter = "இ";
export const இMarker = "ி";
export const ஈLetter = "ஈ";
export const ஈMarker = "ீ";
export const உLetter = "உ";
export const உMarker = "ு";
export const ஊLetter = "ஊ";
export const ஊMarker = "ூ";
export const எLetter = "எ";
export const எMarker = "ெ";
export const ஏLetter = "ஏ";
export const ஏMarker = "ே";
export const ஒLetter = "ஒ";
export const ஒMarker = "ொ";
export const ஓLetter = "ஓ";
export const ஓMarker = "ோ";
export const குறில்Letters = Object.freeze(["அ", "இ", "உ", "எ", "ஒ",],);
export const குறில்Markers = Object.freeze(["ி", "ு", "ெ", "ொ",],);

const க = "க";
const ச = "ச";
export const த = "த";
export const ற = "ற";
export const ட = "ட";
export const ப = "ப";
const ங = "ங";
const ஞ = "ஞ";
export const ந = "ந";
export const ன = "ன";
export const ண = "ண";
export const ம = "ம";
export const ல = "ல";
export const ள = "ள";
export const ய = "ய";
export const வ = "வ";
const ர = "ர";
const ழ = "ழ";

export const மெய்Withஅ = Object.freeze([க, ங, ச, ஞ, ட, ண, ற, ன, த, ந, ப, ம, ய, வ, ர, ல, ள, ழ,],);

export const வல்லினம்Withஅ = Object.freeze([க, ச, த, ப, ட, ற,],);

export const stopsToNasals = Object.freeze(new Map([[க, ங,], [ச, ஞ,], [ட, ண,], [ற, ன,], [த, ந,], [ப, ம,],],),);
export const liquidsToStops = Object.freeze(new Map([[ல, ற,], [ள, ட,],],),);
export const liquidsToNasals = Object.freeze(new Map([[ல, ன,], [ள, ண,],],),);
export const nasalsToStops = Object.freeze(new Map(Array.from(stopsToNasals,).map(([key, value,],) => [value, key,],),),);

export const ஐLetter = "ஐ";
export const ஐMarker = "ை";
export const letterOrMark = "(?=\\p{Script=Tamil})[\\p{Letter}\\p{Mark}]"; // Instead of [\p{Script=Tamil}&&[\p{Letter}\p{Mark}]], which JavaScript apparently doesn't support.
