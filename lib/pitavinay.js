import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";
import { புணர்ச்சி, } from "./punarcci.js";

export const getபிறவினய் = தன்வினய் => {
    const புணர்ச்சிவிதிகள் = புணர்ச்சி(false,);
    const வினயினத்துData = வினய்Data.get(தன்வினய்.originalபகுதி,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData,) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === தன்வினய்.வினயினம்.இனத்துப்பெயர்,) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return [];
    }

    const stringToவினய் = வினய்AsString => new வினய்(
        புணர்ச்சிவிதிகள்.reduce(
            (உருவு, புணர்ச்சிவிதி,) => புணர்ச்சிவிதி(உருவு,),
            வினய்AsString.generator(தன்வினய்.பகுதி,),
        ),
        வினய்AsString.இனம்(தன்வினய்.வினயினம்,),
    );

    if (! Array.isArray(பிறவினய்,)) {
        return [stringToவினய்(பிறவினய்,),];
    }

    return பிறவினய்.map(stringToவினய்,);
};

import { வாங்கு, பார், } from "./vinayinam.js";
import { penultimateஇஉlengthener, lastStopDoubler, monosyllabicShortTerminalDoubler, terminalல்Stopper, terminalவுRemover, } from "./punarcci.js";

export const rule0 = { generator: பகுதி => பகுதி, இனம்: வினயினம் => வினயினம், };
export const rule1 = { generator: பகுதி => பகுதி, இனம்: () => பார், };

export const rule10 = { generator: பகுதி => `${பகுதி}த்து`, இனம்: () => வாங்கு, };
export const rule10a = { generator: பகுதி => rule10.generator(`${பகுதி}உ`,), இனம்: rule10.இனம், };
export const rule10b = { generator: பகுதி => rule10.generator(penultimateஇஉlengthener(பகுதி,),), இனம்: rule10.இனம், };
export const rule10c = { generator: பகுதி => rule10.generator(`${terminalல்Stopper(பகுதி,)}உ`,), இனம்: rule10.இனம், };
export const rule10d = { generator: பகுதி => rule10.generator(terminalவுRemover(பகுதி,),), இனம்: () => வாங்கு, };
export const rule11 = { generator: பகுதி => `${பகுதி}க்கு`, இனம்: rule10.இனம், };
export const rule12 = { generator: பகுதி => `${பகுதி}ச்சு`, இனம்: rule10.இனம், };
export const rule13 = { generator: பகுதி => `${பகுதி}ப்பு`, இனம்: rule10.இனம், };

export const rule20 = { generator: பகுதி => `${பகுதி}வி`, இனம்: () => பார், };
export const rule20a = { generator: பகுதி => rule20.generator(monosyllabicShortTerminalDoubler(`${பகுதி}உ`,),), இனம்: rule20.இனம், };
export const rule21 = { generator: பகுதி => `${பகுதி}ப்பி`, இனம்: () => பார், };

export const rule30 = { generator: பகுதி => lastStopDoubler(பகுதி,), இனம்: () => வாங்கு, };
