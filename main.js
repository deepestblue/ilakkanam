import { punarcci, } from "./punarcci.js";
import { vinaygal, } from "./vinay.js";

const schema = new Map([
    ["வினய்", "வினய்",],
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

const vinayinangal = new Set(Array.from(vinaygal.values(),).flat(),) ;

function getForms(vinay, இனத்துப்பெயர்,) {
    const vinayinam = ((vinay, இனத்துப்பெயர்) => {
        if (இனத்துப்பெயர்) {
            return Array.from(vinaygal.values(),).flat().find(e => e.இனத்துப்பெயர் === இனத்துப்பெயர்)
        }

        const vinayinam = vinaygal.get(vinay,);

        if (Array.isArray(vinayinam)) {
            const peyargal = vinayinam.map((inam) => inam.இனத்துப்பெயர்);
            throw new Error(`Multiple vinay classes possible for ${vinay}: ${peyargal}. Select one.`);
        }

        return vinayinam;
    })(vinay, இனத்துப்பெயர்);

    if (vinayinam === undefined) {
        return new Map();
    }

    return Array.from(schema.keys(),).reduce(
        (forms, item,) => forms.set(
            item,
            punarcci.reduce(
                function(acc, val,) {
                    if (! Array.isArray(acc,)) {
                        return val(acc,);
                    }
                    return acc.map(val);
                },
                vinayinam[item](vinay),
            ),
        ),
        new Map([["இனம்", vinayinam.இனத்துப்பெயர்,],]),
    );
}

export { schema, getForms, vinayinangal, };
