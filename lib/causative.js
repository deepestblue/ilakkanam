import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";

export function getCausativeவினய்(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    const வினயினத்துData = வினய்Data.get(வினய்ப்பெயர்,);

    const flattenedவினயினத்துData = Array.isArray(வினயினத்துData) ? வினயினத்துData.find(item => item.இனம்.இனத்துப்பெயர் === இனத்துப்பெயர்) : வினயினத்துData;
    const causativeவினய் = flattenedவினயினத்துData && flattenedவினயினத்துData.causative;

    if (! causativeவினய்) {
        return;
    }

    return new வினய்(causativeவினய்.generator(வினய்ப்பெயர்,), causativeவினய்.இனம்,);
}
