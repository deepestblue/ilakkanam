import { மெய்Withஅ, } from "./ezuttu.js";
import { lastStopDoubler, lastStopDoublerWithoutNasal, } from "./punarcci.js";

const compose = (...fns) => arg => fns.reduceRight((acc, fn,) => fn(acc,), arg,);
const rule = generator => ({ generator, extend(...fns) { return rule(compose(this.generator, ...fns,),); }, });

const rule1 = rule(பகுதி => {
    if (மெய்Withஅ.some(எழுத்து => பகுதி.endsWith(எழுத்து,),)) {
        return new Set([`${பகுதி}ம்`,],);
    }
    return new Set([`${பகுதி}அம்`,],);
},);

const rule10 = rule(பகுதி => {
    if (! ["ய்", "ர்", "ல்", "ழ்", "ள்",].some(suffix => பகுதி.endsWith(suffix,),)) {
        return new Set([`${பகுதி}வு`,],);
    }
    return new Set([`${பகுதி}வு`, `${பகுதி}பு`,],);
},);
const rule11 = rule(பகுதி => new Set([`${பகுதி}ப்பு`,],),);
const rule12 = rule(பகுதி => new Set([`${பகுதி}பு`,],),);

const rule20 = rule(பகுதி => new Set([`${lastStopDoublerWithoutNasal(பகுதி,)}`,],),);
const rule21 = rule(பகுதி => new Set([`${lastStopDoubler(பகுதி,)}அம்`,],),);

export const தொழிற்பெயர் = { rule1, rule10, rule11, rule12, rule20, rule21, };
