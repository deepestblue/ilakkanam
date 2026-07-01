/* eslint-disable no-constructor-return */

import { வினய்Data, } from "./vinayData.js";
import { அய்காரத்துப்பழயவிதிகள், } from "./punarcci.js";
import { புள்ளி, மெய்Withஅ, vowelMarkers, } from "./ezuttu.js";

export const எழுத்துக்கூட்டுமுறய்கள் = {
    trad: "பழயது",
    modn: "புதியது",
};

export class வினய் {
    constructor(பகுதி, இனம், எழுத்துக்கூட்டுமுறய், byPassCheckForஇனம்MatchingInவினய்Data,) {
        // Account for modern spelling first
        this.originalபகுதி = (எழுத்துக்கூட்டுமுறய் === "புதியது") ?
                அய்காரத்துப்பழயவிதிகள்.reduce((acc, val,) => val(acc,), பகுதி,)
            : பகுதி;

        this.வினயினம் = (() => {
            const வினயினத்துData = வினய்Data.get(this.originalபகுதி,);

            if (! இனம்) {
                if (! வினயினத்துData) {
                    throw new Error(`“${this.originalபகுதி}” எனும் பகுதி அறியாதது.`,);
                }

                if (Array.isArray(வினயினத்துData,)) {
                    const பெயர்கள் = வினயினத்துData.map(இனத்துData => இனத்துData.இனம்.இனத்துப்பெயர்,);
                    throw new Error(`“${this.originalபகுதி}” எனும் பகுதிக்கு பல வினயினங்கள் உள்ளன. ${பெயர்கள்.map(v => `“${v}”`,).join(", ",)} என்பவற்றுள் ஒன்றய்த் தேர்ந்தெடுக்க.`, {
                        cause: { code: "ambiguousVerbClass", classes: பெயர்கள், },
                    },);
                }

                return வினயினத்துData.இனம்;
            }

            // An இனம் is explicitly passed in. Let's make sure it matches what's in வினய்Data ...
            (() => {
                // ... unless it's an internal call where the client asks to bypass the check.
                if (byPassCheckForஇனம்MatchingInவினய்Data) {
                    return;
                }

                if (! Array.isArray(வினயினத்துData,)) {
                    if (வினயினத்துData.இனம் !== இனம்) {
                        throw new Error(`“${this.originalபகுதி}” எனும் பகுதி “${இனம்.இனத்துப்பெயர்}” எனும் வினயினத்திற்குச் செல்லாதது.`,);
                    }
                    return;
                }

                // If வினயினத்துData is an array, check if the passed‐in இனம் matches at least one of the entries in the array.
                if (! வினயினத்துData.some(இனத்துData => இனத்துData.இனம் === இனம்,)) {
                    throw new Error(`“${this.originalபகுதி}” எனும் பகுதி “${இனம்.இனத்துப்பெயர்}” எனும் வினயினத்திற்குச் செல்லாதது.`,);
                }
            })();

            return இனம்;
        })();

        this.பகுதி = this.வினயினம்.பகுதி(this.originalபகுதி,);

        // Create a proxy that automatically forwards method calls to வினயினம்
        return new Proxy(this, {
            get(target, prop,) {
                // If the property exists on the target itself, return it
                if (prop in target) {
                    return target[prop];
                }

                const value = target.வினயினம்[prop];

                // If it's not a function, return the property value directly (may be undefined)
                if (typeof value !== "function") {
                    return value;
                }

                // Otherwise, return a forwarding function that preserves 'this'
                return (...args) => value.call(target.வினயினம், target.பகுதி, ...args,);
            },
        },);
    }
}

const startsWith = prefix => வினய்ப்பெயர் => {
    // For the case where the prefix ends in a மெய், the Unicode encoding of the புள்ளி as a separate codepoint needs to be worked around, so that the மெய் matches all corresponding உயிர்மெய்s as well.
    if (prefix.at(-1,) === புள்ளி) {
        return வினய்ப்பெயர்.startsWith(prefix.slice(0, -1,),);
    }

    // This is the general case.
    if (! மெய்Withஅ.includes(prefix.at(-1,),)) {
        return வினய்ப்பெயர்.startsWith(prefix,);
    }

    // For the case where the prefix ends in a மெய், again the Unicode encoding of the மெய் alongwith an implicit vowel as a single codepoint needs to be worked around, so that the உயிர்மெய் codepoint only matches உயிர்மெய்s with the same implicit vowel and not other உயிர்மெய்s containing the same மெய்.
    return வினய்ப்பெயர்.startsWith(prefix,) && ! vowelMarkers.includes(வினய்ப்பெயர்.slice(prefix.length,).at(0,),);
};

export const வினய்கள்StartingWith = prefix => [...வினய்Data.keys(),].sort((a, b,) => a.localeCompare(b, "ta",),).filter(startsWith(prefix,),);

export const இனத்தில்வினய்கள் = இனத்துப்பெயர் => {
    const பெயர்கள் = [...வினய்Data.entries(),].filter(([, data,],) => (matcher => (Array.isArray(data,) ? data.some(matcher,) : matcher(data,)))(entry => entry.இனம்.இனத்துப்பெயர் === இனத்துப்பெயர்,),).map(([verb,],) => verb,).sort((a, b,) => a.localeCompare(b, "ta",),);
    if (பெயர்கள்.length === 0) {
        throw new Error(`“${இனத்துப்பெயர்}” எனும் வினயினம் செல்லாதது.`,);
    }
    return பெயர்கள்;
};
