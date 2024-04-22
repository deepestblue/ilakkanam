import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";

export function getபிறவினய்(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    const வினயினத்துData = வினய்Data.get(வினய்ப்பெயர்,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === இனத்துப்பெயர்) : வினயினத்துData;
    const பிறவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.பிறவினய்;

    if (! பிறவினய்) {
        return;
    }

    return new வினய்(பிறவினய்.generator(வினய்ப்பெயர்,), பிறவினய்.இனம்,);
}
