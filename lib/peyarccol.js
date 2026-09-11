import { மெய்Withஅ, குறில்Markers, நெடில்Markers, shortToLong, ஆMarker, குறில்Letters, புள்ளி, } from "./ezuttu.js";
import { anyOfArray, lastStopDoubler, liftToArray, terminalஉRemover, புணர்ச்சிவிதிகள், } from "./punarcci.js";

const புணர் = தொடங்குவடிவு => புணர்ச்சிவிதிகள்.reduce((வடிவு, புணர்ச்சிவிதி,) => புணர்ச்சிவிதி(வடிவு,), தொடங்குவடிவு,);

const appender = suffix => prefix => `${prefix}${suffix}`;
const compose = (...fns) => arg => fns.reduceRight((acc, fn,) => fn(acc,), arg,);
const rule = g => ({
    generator: g,
    extend(...fns) { return rule(compose(this.generator, ...fns,),); },
    accrete(...fns) { return rule(compose(liftToArray, ...fns, this.generator,),); },
});

const rule0 = rule(liftToArray,);

const rule10 = rule0.extend(appender("ம்",),);
const rule11 = rule10.extend(appender("அ",),);

const rule20 = rule0.extend(appender("ய்",),);
const rule21 = rule20.extend(appender("அ",),);
const rule22 = rule21.extend(appender(புள்ளி,), terminalஉRemover,);

const rule30 = rule0.extend(appender("பு",),);
const rule31 = rule(பகுதி => {
    if (! ["ய்", "ர்", "ல்", "ழ்", "ள்",].some(suffix => பகுதி.endsWith(suffix,),)) {
        return liftToArray(`${பகுதி}வு`,);
    }
    return [`${பகுதி}வு`, `${பகுதி}பு`,];
},);
const rule31a = rule31.extend(புணர், appender("அ",),);
const rule31b = rule0.extend(appender("வம்",),);
const rule32 = rule0.extend(appender("ப்பு",),);
const rule32a = rule32.accrete(appender("அம்",),);

const rule40 = rule0.extend(appender("மய்",),);
const rule40a = rule40.extend(appender("உ",),);
const rule41 = rule0.extend(appender("வய்",),);

const rule50 = rule0.extend(appender("தி",),);
const rule51 = rule0.extend(appender("த்தி",),);
const rule52 = rule0.extend(appender("ச்சி",),);
const rule53 = rule0.extend(appender("வி",),);

const rule60 = rule0.extend(appender("க்கய்",),);
const rule60a = rule60.extend(appender("இ",),);
const rule61 = rule0.extend(appender("இகய்",),);

const rule70 = rule0.extend(lastStopDoubler,);
const rule71 = rule70.accrete(appender("அம்",),);
const rule72 = rule0.extend(பகுதி => பகுதி.replace(
    RegExp(`(${anyOfArray(மெய்Withஅ,)})${புள்ளி}\\1$`, "v",),
    (_unused, p1,) => `${p1}${புள்ளி}`,
), terminalஉRemover,);
const rule72a = rule72.accrete(புணர், appender("இ",),);

const rule80 = rule(பகுதி => {
    const பகுதிவிகாரம்1 = பகுதி.replace(
        RegExp(`^(${anyOfArray(குறில்Letters,)})`, "v",),
        (_unused, p1,) => shortToLong.get(p1,),
    );
    if (பகுதிவிகாரம்1 !== பகுதி) {
        // பகுதி starts with a குறில்
        return [பகுதிவிகாரம்1,];
    }

    const பகுதிவிகாரம்2 = பகுதி.replace(
        RegExp(`^(${anyOfArray(மெய்Withஅ,)})(${anyOfArray(குறில்Markers,)})`, "v",),
        (_unused, p1, p2,) => `${p1}${shortToLong.get(p2,)}`,
    );
    if (பகுதிவிகாரம்2 !== பகுதி) {
        // பகுதி's first உயிர் is a குறில் (that is not an அ)
        return [பகுதிவிகாரம்2,];
    }

    const பகுதிவிகாரம்3 = பகுதி.replace(
        RegExp(`^(${anyOfArray(மெய்Withஅ,)})(?!${anyOfArray(நெடில்Markers,)})`, "v",),
        (_unused, p1,) => `${p1}${ஆMarker}`,
    );
    if (பகுதிவிகாரம்3 !== பகுதி) {
        // பகுதி's first உயிர் is a குறில் (that is not an அ)
        return [பகுதிவிகாரம்3,];
    }

    throw new Error(`${பகுதி} இப்பெயர்ச்சொல் முறய்க்குச் செல்லாதது.`,);
},);
const rule80a = rule80.extend(appender(புள்ளி,), terminalஉRemover,);

export const பெயர்ச்சொல் = { rule0, rule10, rule11, rule20, rule21, rule22, rule30, rule31, rule31a, rule31b, rule32, rule32a, rule40, rule40a, rule41, rule50, rule51, rule52, rule53, rule60, rule60a, rule61, rule70, rule71, rule72, rule72a, rule80, rule80a, };
