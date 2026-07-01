import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";
import { புணர்ச்சிவிதிகள், penultimateஇஉlengthener, lastStopDoubler, monosyllabicShortTerminalDoubler, terminalல்Stopper, terminalவுRemover, terminalவுtoபுconverter, } from "./punarcci.js";
import { வாங்கு, பார், } from "./vinayinam.js";

export const getபிறவினய் = (தன்வினய், எழுத்துக்கூட்டுமுறய்,) => {
    const வினயினத்துData = வினய்Data.get(தன்வினய்.originalபகுதி,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData,) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === தன்வினய்.வினயினம்.இனத்துப்பெயர்,) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return [];
    }

    const byPassCheckForஇனம்MatchingInவினய்Data = true;
    const ruleToவினய் = பிறவினய்Rule => new வினய்(
        // We need to apply புணர்ச்சி here independently and prior to the புணர்ச்சி application in the treeTraverseAllLeaves call in getForms. This is because monosyllabicShortTerminalDoubler, called inside treeTraverseAllLeaves doubles the *first* consonant after a short vowel, but needs to not apply inside the பிறவினய் form. This is so that we generate செலுத்து and not செல்லுத்து from செல்.
        புணர்ச்சிவிதிகள்.reduce(
            (வடிவு, புணர்ச்சிவிதி,) => புணர்ச்சிவிதி(வடிவு,),
            பிறவினய்Rule.generator(தன்வினய்.பகுதி,),
        ),
        பிறவினய்Rule.இனம்(தன்வினய்.வினயினம்,),
        எழுத்துக்கூட்டுமுறய்,
        byPassCheckForஇனம்MatchingInவினய்Data,
    );

    if (! Array.isArray(பிறவினய்,)) {
        return [ruleToவினய்(பிறவினய்,),];
    }

    return பிறவினய்.map(ruleToவினய்,);
};

const identity = arg => arg;
const appender = suffix => prefix => `${prefix}${suffix}`;
const compose = (...fns) => arg => fns.reduceRight((acc, fn,) => fn(acc,), arg,);

export const rule0 = { generator: identity, இனம்: வினயினம் => வினயினம், };
export const rule1 = { generator: identity, இனம்: () => பார், };

export const rule10 = { generator: appender("த்து",), இனம்: () => வாங்கு, };
export const rule10a = { ...rule10, generator: compose(rule10.generator, appender("உ",),), };
export const rule10b = { ...rule10, generator: compose(rule10.generator, penultimateஇஉlengthener,), };
export const rule10c = { ...rule10, generator: compose(rule10.generator, appender("உ",), terminalல்Stopper,), };
export const rule10d = { ...rule10, generator: compose(rule10.generator, terminalவுRemover,), };
export const rule11 = { ...rule10, generator: appender("க்கு",), };
export const rule12 = { ...rule10, generator: appender("ச்சு",), };
export const rule13 = { ...rule10, generator: appender("ப்பு",), };

export const rule20 = { generator: appender("வி",), இனம்: () => பார், };
export const rule20a = { ...rule20, generator: compose(rule20.generator, monosyllabicShortTerminalDoubler, appender("உ",),), };
export const rule21 = { ...rule20, generator: appender("ப்பி",), };

export const rule30 = { generator: lastStopDoubler, இனம்: () => வாங்கு, };
export const rule30a = { ...rule30, generator: compose(rule30.generator, terminalவுtoபுconverter,), };
