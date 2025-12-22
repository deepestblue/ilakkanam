import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";
import { புணர்ச்சிவிதிகள், } from "./punarcci.js";

export const getபிறவினய் = தன்வினய் => {
    const வினயினத்துData = வினய்Data.get(தன்வினய்.originalபகுதி,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData,) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === தன்வினய்.வினயினம்.இனத்துப்பெயர்,) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return [];
    }

    const stringToவினய் = வினய்AsString => new வினய்(
        புணர்ச்சிவிதிகள்.reduce(
            (வடிவு, புணர்ச்சிவிதி,) => புணர்ச்சிவிதி(வடிவு,),
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
export const rule10a = { ...rule10, generator: பகுதி => rule10.generator(`${பகுதி}உ`,), };
export const rule10b = { ...rule10, generator: பகுதி => rule10.generator(penultimateஇஉlengthener(பகுதி,),), };
export const rule10c = { ...rule10, generator: பகுதி => rule10.generator(`${terminalல்Stopper(பகுதி,)}உ`,), };
export const rule10d = { ...rule10, generator: பகுதி => rule10.generator(terminalவுRemover(பகுதி,),), };
export const rule11 = { ...rule10, generator: பகுதி => `${பகுதி}க்கு`, };
export const rule12 = { ...rule10, generator: பகுதி => `${பகுதி}ச்சு`, };
export const rule13 = { ...rule10, generator: பகுதி => `${பகுதி}ப்பு`, };

export const rule20 = { generator: பகுதி => `${பகுதி}வி`, இனம்: () => பார், };
export const rule20a = { ...rule20, generator: பகுதி => rule20.generator(monosyllabicShortTerminalDoubler(`${பகுதி}உ`,),), };
export const rule21 = { ...rule20, generator: பகுதி => `${பகுதி}ப்பி`, };

export const rule30 = { generator: பகுதி => lastStopDoubler(பகுதி,), இனம்: () => வாங்கு, };
