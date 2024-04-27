import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";

export function getபிறவினய்(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    const வினயினத்துData = வினய்Data.get(வினய்ப்பெயர்,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === இனத்துப்பெயர்) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return;
    }

    if (! Array.isArray(பிறவினய்)) {
        return new வினய்(பிறவினய்.generator(வினய்ப்பெயர்,), பிறவினய்.இனம்,);
    }

    return பிறவினய்.map(e => new வினய்(e.generator(வினய்ப்பெயர்,), e.இனம்,),);
}

import { வாங்கு, பார், } from "./vinayinam.js";

export const rule10 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "த்து", இனம்: வாங்கு,};
export const rule11 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "க்கு", இனம்: வாங்கு,};
export const rule20 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "வி", இனம்: பார்,};
export const rule22 = { generator: (வினய்ப்பெயர்,) => வினய்ப்பெயர் + "பி", இனம்: பார்,};
