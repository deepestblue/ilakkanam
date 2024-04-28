import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";

export function getபிறவினய்(தன்வினய்,) {
    const வினயினத்துData = வினய்Data.get(தன்வினய்.originalவினய்ப்பெயர்,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === தன்வினய்.வினயினம்.இனத்துப்பெயர்) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return;
    }

    if (! Array.isArray(பிறவினய்)) {
        return new வினய்(பிறவினய்.generator(தன்வினய்.originalவினய்ப்பெயர்,), பிறவினய்.இனம்(தன்வினய்.வினயினம்),);
    }

    return பிறவினய்.map(e => new வினய்(e.generator(தன்வினய்.originalவினய்ப்பெயர்,), e.இனம்(தன்வினய்.வினயினம்),),);
}

import { வாங்கு, பார், } from "./vinayinam.js";

export const rule0 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர், இனம்: (வினயினம்) => வினயினம், };
export const rule10 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "த்து", இனம்: () => வாங்கு, };
export const rule11 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "க்கு", இனம்: () => வாங்கு, };
export const rule20 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "வி", இனம்: () => பார், };
export const rule22 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "பி", இனம்: () => பார், };
