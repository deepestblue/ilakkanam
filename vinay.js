import { punarcci, } from "./punarcci.js";
import { vinaygal, } from "./vinayClasses.js";

export { schema, getForms, vinayClassValues, };

const schema = [
    "வினய்",
    "அல்வினய்முற்று",
    "இறந்தகாலத்துவினய்முற்று",
    "நிகழ்காலத்துவினய்முற்று",
    "எதிர்காலத்துவினய்முற்று",
    "எதிர்காலத்துவினயெச்சம்",
    "இறந்தகாலத்துவினயெச்சம்",
    "இறந்தகாலத்துப்பெயரெச்சம்",
    "நிகழ்காலத்துப்பெயரெச்சம்",
    "எதிர்காலத்துப்பெயரெச்சம்",
    "தொழிற்பெயர்",
];

const vinayClassValues = new Set(Array.from(vinaygal.values(),).flat(),) ;

function getForms(vinay, vinayinam,) {
    if (vinayinam === undefined) {
        vinayinam = vinaygal.get(vinay,);

        if (Array.isArray(vinayinam)) {
            throw new Error(`Multiple vinay classes possible for ${vinay}: ${vinayinam}. Select one.`);
        }
    }

    if (vinayinam === undefined) {
        return new Map();
    }

    return schema.reduce(
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
