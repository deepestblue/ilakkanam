const compose = (...fns) => arg => fns.reduceRight((acc, fn,) => fn(acc,), arg,);
const rule = generator => ({ generator, extend(...fns) { return rule(compose(this.generator, ...fns,),); }, });

const rule10 = rule(பகுதி => `${பகுதி}வு`,);
const rule11 = rule(பகுதி => `${பகுதி}ப்பு`,);

export const தொழிற்பெயர் = { rule10, rule11, };
