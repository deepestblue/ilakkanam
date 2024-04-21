import { புணர்ச்சி, } from "./punarcci.js";
import { வினய், } from "./vinay.js";
import { getCausativeவினய், } from "./causative.js";

const schema = new Map([
    ["ஏவல்வினய்முற்று", "ஏவல் வினய்முற்று (ஒருமய்)",],
    ["அல்வினய்முற்று", "அல் வினய்முற்று (பலர்பாலில்)",],
    ["இறந்தகாலத்துவினய்முற்று", "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",],
    ["நிகழ்காலத்துவினய்முற்று", "நிகழ்காலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினய்முற்று", "எதிர்காலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினயெச்சம்", "எதிர்காலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துவினயெச்சம்", "இறந்தகாலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துப்பெயரெச்சம்", "இறந்தகாலத்துப் பெயரெச்சம்",],
    ["நிகழ்காலத்துப்பெயரெச்சம்", "நிகழ்காலத்துப் பெயரெச்சம்",],
    ["எதிர்காலத்துப்பெயரெச்சம்", "எதிர்காலத்துப் பெயரெச்சம்",],
    ["தொழிற்பெயர்", "தொழிற்பெயர்",],
],);

function getBaseForms(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    if (! வினய்ப்பெயர்) {
        return new Map();
    }

    return (function(வினய்) {
        return Array.from(schema.keys(),).reduce(
            (forms, item,) => forms.set(
                item,
                புணர்ச்சி.reduce(
                    function(acc, val,) {
                        if (! (acc instanceof Set)) {
                            return val(acc,);
                        }
                        return new Set([...acc,].map(val,),);
                    },
                    வினய்[item](),
                ),
            ),
            new Map([["இனம்", வினய்.வினயினம்.இனத்துப்பெயர்,],]),
        );
    })(new வினய்(வினய்ப்பெயர், இனத்துப்பெயர்,),);
}

function getCausativeForms(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    if (! வினய்ப்பெயர்) {
        return new Map();
    }

    const causativeவினய் = getCausativeவினய்(வினய்ப்பெயர், இனத்துப்பெயர்,);

    if (! causativeவினய்) {
        return;
    }

    return (function(வினய்) {
        return Array.from(schema.keys(),).reduce(
            (forms, item,) => forms.set(
                item,
                புணர்ச்சி.reduce(
                    function(acc, val,) {
                        if (! (acc instanceof Set)) {
                            return val(acc,);
                        }
                        return new Set([...acc,].map(val,),);
                    },
                    வினய்[item](),
                ),
            ),
            new Map([["இனம்", வினய்.வினயினம்.இனத்துப்பெயர்,],]),
        );
    })(causativeவினய்,);
}

function getForms(வினய்ப்பெயர், இனத்துப்பெயர்,) {
    let allForms = getBaseForms(வினய்ப்பெயர், இனத்துப்பெயர்,);

    const causativeForms = getCausativeForms(வினய்ப்பெயர், இனத்துப்பெயர்,);
    if (causativeForms) {
        allForms.set("Causative Forms", causativeForms,);
    }

    return allForms;
}

export { schema, getForms, };
