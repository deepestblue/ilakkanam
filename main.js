import { punarcci, } from "./punarcci.js";
import { vinaygal, } from "./vinay.js";

export { schema, getForms, vinayinangal, };

const schema = new Map([
    ["வினய்", "வினய்",],
    ["அல்வினய்முற்று", "அல் வினய்முற்று (பலர்பாலில்)",],
    ["இறந்தகாலத்துவினய்முற்று", "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",],
    ["நிகழ்காலத்துவினய்முற்று", "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினய்முற்று", "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",],
    ["எதிர்காலத்துவினயெச்சம்", "எதிர்காலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துவினயெச்சம்", "இறந்தகாலத்து வினயெச்சம்",],
    ["இறந்தகாலத்துப்பெயரெச்சம்", "இறந்தகாலத்துப் பெயரெச்சம்",],
    ["நிகழ்காலத்துப்பெயரெச்சம்", "நிகழ்காலத்துப் பெயரெச்சம்",],
    ["எதிர்காலத்துப்பெயரெச்சம்", "எதிர்காலத்துப் பெயரெச்சம்",],
    ["தொழிற்பெயர்", "தொழிற்பெயர்",],
],);

const vinayinangal = new Set(Array.from(vinaygal.values(),).flat(),) ;

function getForms(vinay, inattuppeyar,) {
    let vinayinam;

    if (inattuppeyar) {
        vinayinam = Array.from(vinaygal.values(),).flat().find(e => e.inattuppeyar === inattuppeyar)
    } else {
        vinayinam = vinaygal.get(vinay,);

        if (Array.isArray(vinayinam)) {
            throw new Error(`Multiple vinay classes possible for ${vinay}: ${vinayinam}. Select one.`);
        }
    }

    if (vinayinam === undefined) {
        return new Map();
    }

    return Array.from(schema.keys(),).reduce(
        (forms, item,) => forms.set(
            item,
            punarcci.reduce(
                (acc, val,) => val(acc,),
                vinayinam[item](vinay),
            ),
        ),
        new Map([["இனம்", vinayinam.inattuppeyar,],]),
    );
}
