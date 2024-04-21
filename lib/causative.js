import { வினய்Data, } from "./vinayData.js";
import { வினய், } from "./vinay.js";

export function getCausativeவினய்(வினய்ப்பெயர்,) {
    const causativeவினய் = வினய்Data.get(வினய்ப்பெயர்,).causative;

    if (! causativeவினய்) {
        return;
    }

    return new வினய்(causativeவினய்.generator(வினய்ப்பெயர்,), causativeவினய்.இனம்.இனத்துப்பெயர்,);
}
