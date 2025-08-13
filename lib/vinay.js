import { வினய்Data, } from "./vinayData.js";
import { வினயினம்Byபெயர், } from "./vinayinam.js";
import { அய்காரத்துப்பழயவிதி, } from "./punarcci.js";

export class வினய் {
    constructor(வினய்ப்பெயர், இனமோபெயரோ, புத்தெழுத்துமுறயோ,) {
        // Account for modern spelling first
        this.originalவினய்ப்பெயர் = ((வினய்ப்பெயர்_, புத்தெழுத்துமுறயோ_,) => {
            if (! புத்தெழுத்துமுறயோ_) {
                return வினய்ப்பெயர்_;
            }

            return அய்காரத்துப்பழயவிதி.reduce(
                (acc, val,) => val(acc,),
                வினய்ப்பெயர்_,
            );
        })(வினய்ப்பெயர், புத்தெழுத்துமுறயோ,);

        this.வினயினம் = ((வினய்ப்பெயர்_, இனமோபெயரோ_,) => {
            if (இனமோபெயரோ_) {
                // If just the name given, lookup by name, else use as‐is
                const வினயினம் = typeof இனமோபெயரோ_ === "string" ? வினயினம்Byபெயர்(இனமோபெயரோ_,) : இனமோபெயரோ_;

                if (! வினயினம்.valid(வினய்ப்பெயர்_,)) {
                    throw new Error(`வினய் ${வினய்ப்பெயர்_} isn't valid for வினயினம் ${வினயினம்.இனத்துப்பெயர்}.`,);
                }

                return வினயினம்;
            }

            // Need to lookup in the data
            const வினயினத்துData = வினய்Data.get(வினய்ப்பெயர்_,);

            if (Array.isArray(வினயினத்துData,)) {
                const பெயர்கள் = வினயினத்துData.map(இனத்துData => இனத்துData.இனம்.இனத்துப்பெயர்,);
                throw new Error(`Multiple வினய் classes possible for ${வினய்ப்பெயர்_}: ${பெயர்கள்.join(", ",)}. Select one.`,);
            }

            if (! வினயினத்துData) {
                throw new Error(`Unknown வினய் ${வினய்ப்பெயர்_}.`,);
            }

            return வினயினத்துData.இனம்;
        })(this.originalவினய்ப்பெயர், இனமோபெயரோ,);

        this.வினய்ப்பெயர் = this.வினயினம்.வினய்(this.originalவினய்ப்பெயர்,);

        // Create a proxy that automatically forwards method calls to வினயினம்
        return new Proxy(this, {
            get(target, prop,) {
                // If the property exists on the target itself, return it
                if (prop in target) {
                    return target[prop];
                }

                // Otherwise, create a forwarding function to the வினயினம்
                return (...args) => target.வினயினம்[prop](target.வினய்ப்பெயர், ...args,);
            },
        },);
    }
}
