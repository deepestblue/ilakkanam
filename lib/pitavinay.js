import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";

export const getபிறவினய் = (தன்வினய்,) => {
    const வினயினத்துData = வினய்Data.get(தன்வினய்.originalவினய்ப்பெயர்,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === தன்வினய்.வினயினம்.இனத்துப்பெயர்) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return;
    }

    if (! Array.isArray(பிறவினய்)) {
        return new வினய்(பிறவினய்.generator(தன்வினய்.வினய்ப்பெயர்,), பிறவினய்.இனம்(தன்வினய்.வினயினம்),);
    }

    return பிறவினய்.map(e => new வினய்(e.generator(தன்வினய்.வினய்ப்பெயர்,), e.இனம்(தன்வினய்.வினயினம்),),);
};

import { வாங்கு, பார், உயர்,} from "./vinayinam.js";
import { initialஉLengthener, monosyllabicShortTerminalDoubler, terminalல்Stopper, } from "./punarcci.js";

export const rule0 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர், இனம்: (வினயினம்) => வினயினம், };
export const rule1 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர், இனம்: (வினயினம்) => {
    if (வினயினம் !== உயர்) {
        throw new Error(`Expecting ${உயர்.இனத்துப்பெயர்} இனத்து வினய். Got ${வினயினம்.இனத்துப்பெயர்} instead.`);
    }
    return பார்;
}, };

export const rule10 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "த்து", இனம்: (வினயினம்) => {
    if (வினயினம் === வாங்கு) {
        throw new Error(`Expecting வினயினம் other than ${வாங்கு.இனத்துப்பெயர்}.`);
    }
    return வாங்கு;
}, };
export const rule10a = { generator: (வினய்ப்பெயர்,) => rule10.generator(வினய்ப்பெயர் + "உ",), இனம்: rule10.இனம், };
export const rule10b = { generator: (வினய்ப்பெயர்,) => rule10.generator(initialஉLengthener(வினய்ப்பெயர்,),), இனம்: rule10.இனம், };
export const rule10c = { generator: (வினய்ப்பெயர்,) => rule10.generator(terminalல்Stopper(வினய்ப்பெயர்,) + "உ",), இனம்: rule10.இனம், };
export const rule11 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "க்கு", இனம்: rule10.இனம், };
export const rule12 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "ச்சு", இனம்: rule10.இனம், };

export const rule20 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "வி", இனம்: () => பார், };
export const rule20a = { generator: (வினய்ப்பெயர்,) => rule20.generator(monosyllabicShortTerminalDoubler(வினய்ப்பெயர்,) + "உ"), இனம்: rule20.இனம், };
export const rule21 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "ப்பி", இனம்: () => பார், };
export const rule22 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "பி", இனம்: () => பார், };
