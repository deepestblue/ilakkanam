export { schema, getForms, };

const schema = [
    "வினய்",
    "அல் வினய்முற்று",
    "இறந்தகாலத்து வினய்முற்று",
    "நிகழ்காலத்து வினய்முற்று",
    "எதிர்காலத்து வினய்முற்று",
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

function getForms(verb,) {
    const formsCount = document.getElementById("forms",).rows[0].cells.length;

    let ret = new Array();
    const verbClass = vinayClasses.get(verb,);
    if (verbClass === undefined) {
        return new Array(formsCount,);
    }

    ret.push(verbClass,);

    const rules = vinayClassRules[verbClass];

    if (rules === undefined) {
        return new Array(formsCount,).fill("TBD",);
    }

    // TODO: use reduce
    Array.from(rules.values(),).forEach(rule => {
        ret.push(punarcciRules.reduce((acc, val) => val(acc), rule(verb,),),)
    },);

    return ret;
}
