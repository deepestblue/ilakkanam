import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";
import { புணர்ச்சிவிதிகள், penultimateஇஉlengthener, lastStopDoubler, monosyllabicShortTerminalDoubler, terminalல்Stopper, terminalவுRemover, terminalவுtoபுconverter, lastஆShortener, } from "./punarcci.js";
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
const rule = (generator, இனம்,) => ({ generator, இனம், extend(...fns) { return rule(compose(this.generator, ...fns,), this.இனம்,); }, });

const rule0 = rule(identity, வினயினம் => வினயினம்,);
const rule1 = rule(identity, () => பார்,);

const rule10 = rule(appender("த்து",), () => வாங்கு,);
const rule10a = rule10.extend(appender("உ",),);
const rule10b = rule10.extend(penultimateஇஉlengthener,);
const rule10c = rule10.extend(appender("உ",), terminalல்Stopper,);
const rule10d = rule10.extend(terminalவுRemover,);
const rule11 = { ...rule10, generator: appender("க்கு",), };
const rule12 = { ...rule10, generator: appender("ச்சு",), };
const rule13 = { ...rule10, generator: appender("ப்பு",), };

const rule20 = rule(appender("வி",), () => பார்,);
const rule20a = rule20.extend(monosyllabicShortTerminalDoubler, appender("உ",),);
const rule20b = rule20.extend(appender("ரு",), lastஆShortener,);
const rule21 = { ...rule20, generator: appender("ப்பி",), };

const rule30 = rule(lastStopDoubler, () => வாங்கு,);
const rule30a = rule30.extend(terminalவுtoபுconverter,);

export const பிறவினய் = { rule0, rule1, rule10, rule10a, rule10b, rule10c, rule10d, rule11, rule12, rule13, rule20, rule20a, rule20b, rule21, rule30, rule30a, };
