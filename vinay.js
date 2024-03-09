// TODO: all .gets should be throwing?
// TODO: What are different cases when verb forms would be undefined, and what should the UI do differently for those?

export { schema, getForms, };

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

import { punarcciRules, } from "./punarcci.js";
import { vinayClasses, } from "./vinayClasses.js";
import { vinayClassRules, } from "./vinayClassRules.js";

function getForms(vinay,) {
    const vinayClass = vinayClasses.get(vinay,);
    if (vinayClass === undefined) {
        return new Map();
    }

    const rules = vinayClassRules[vinayClass];

    let ret = new Map([["வகய்", vinayClass,],]);

    // TODO: use reduce
    schema.forEach(item => {
        if (! rules) {
            ret.set(item, "TBD",);
            return;
        }
        ret.set(item,
            punarcciRules.reduce(
                (acc, val) => val(acc),
                rules.get(item,)(vinay,),
            ),
        );
    },);

    return ret;
}
