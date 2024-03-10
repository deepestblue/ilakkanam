import { punarcciRules, } from "./punarcci.js";
import { vinayClasses, } from "./vinayClasses.js";
import { vinayClassRules, } from "./vinayClassRules.js";

export { schema, getForms, vinayClassValues, };

const schema = [
    "வினய்",
    "அல் வினய்முற்று (பலர்பாலில்)",
    "இறந்தகாலத்து வினய்முற்று (பலர்பாலில்)",
    "நிகழ்காலத்து வினய்முற்று (பலர்பாலில்)",
    "எதிர்காலத்து வினய்முற்று (பலர்பாலில்)",
    "எதிர்காலத்து வினயெச்சம்",
    "இறந்தகாலத்து வினயெச்சம்",
    "இறந்தகாலத்துப் பெயரெச்சம்",
    "நிகழ்காலத்துப் பெயரெச்சம்",
    "எதிர்காலத்துப் பெயரெச்சம்",
    "தொழிற்பெயர்",
];

const vinayClassValues = new Set(Array.from(vinayClasses.values(),).flat(),) ;

function getForms(vinay, vinayClass,) {
    if (vinayClass === undefined) {
        vinayClass = vinayClasses.get(vinay,);

        if (Array.isArray(vinayClass)) {
            throw new Error(`Multiple vinay classes possible for ${vinay}: ${vinayClass}. Select one.`);
        }
    }

    if (vinayClass === undefined) {
        return new Map();
    }

    return schema.reduce(
        (forms, item,) => forms.set(
            item,
            punarcciRules.reduce(
                (acc, val,) => val(acc,),
                vinayClassRules[vinayClass].get(item,)(vinay,),
            ),
        ),
        new Map([["வகய்", vinayClass,],]),
    );
}
