/* eslint-disable no-constructor-return */

import { வினய்Data, } from "./vinayData.js";
import { வினயினம்Byபெயர், } from "./vinayinam.js";
import { அய்காரத்துப்பழயவிதிகள், } from "./punarcci.js";

export class வினய் {
    constructor(பகுதி, இனமோபெயரோ, புத்தெழுத்துமுறயோ,) {
        // Account for modern spelling first
        this.originalபகுதி = ((பகுதி_, புத்தெழுத்துமுறயோ_,) => {
            if (! புத்தெழுத்துமுறயோ_) {
                return பகுதி_;
            }

            return அய்காரத்துப்பழயவிதிகள்.reduce(
                (acc, val,) => val(acc,),
                பகுதி_,
            );
        })(பகுதி, புத்தெழுத்துமுறயோ,);

        this.வினயினம் = ((பகுதி_, இனமோபெயரோ_,) => {
            if (இனமோபெயரோ_) {
                // If just the name given, lookup by name, else use as‐is
                const வினயினம் = typeof இனமோபெயரோ_ === "string" ? வினயினம்Byபெயர்(இனமோபெயரோ_,) : இனமோபெயரோ_;

                if (! வினயினம்.valid(பகுதி_,)) {
                    throw new Error(`பகுதி ${பகுதி_} isn't valid for வினயினம் ${வினயினம்.இனத்துப்பெயர்}.`,);
                }

                return வினயினம்;
            }

            // Need to lookup in the data
            const வினயினத்துData = வினய்Data.get(பகுதி_,);

            if (Array.isArray(வினயினத்துData,)) {
                const பெயர்கள் = வினயினத்துData.map(இனத்துData => இனத்துData.இனம்.இனத்துப்பெயர்,);
                throw new Error(`Multiple வினய் classes possible for ${பகுதி_}: ${பெயர்கள்.join(", ",)}. Select one.`,);
            }

            if (! வினயினத்துData) {
                throw new Error(`Unknown பகுதி ${பகுதி_}.`,);
            }

            return வினயினத்துData.இனம்;
        })(this.originalபகுதி, இனமோபெயரோ,);

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
