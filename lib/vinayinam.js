import { புள்ளி, இஈLettersOrMarkers, ஆLetter, ஆMarker, உMarker, ஏLetter, ஏMarker, ஓLetter, ஓMarker, ண்ன்ள்ல்ழ், இடயினம், உLetter, } from "./ezuttu.js";
import { monosyllabicShortTerminalDoubler, terminalஏஓShortener, lastஆShortener, terminalஉRemover, terminalதNasaliser, } from "./punarcci.js";

const TWO_CHAR_RE = /..$/v;
const THREE_CHAR_RE = /...$/v;

/* eslint-disable class-methods-use-this -- We override these methods in instance வினயினம்s in creative ways that making these static disallows us from doing */

class வினயினம் {
    constructor(இனத்துப்பெயர்,) {
        this.இனத்துப்பெயர் = இனத்துப்பெயர்;
    }

    பகுதி(பகுதி,) {
        return பகுதி;
    }

    valid() {
        return true;
    }

    ஏவல்வினய்முற்று(பகுதி, எண்,) {
        if (எண் === "ஒருமய்") {
            return new Set([பகுதி,],);
        }
        if (எண் === "பன்மய்") {
            return new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}உம்`,],);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    போனகாலத்துவினயெச்சம்(பகுதி,) {
        return new Set([`${பகுதி}து`,],);
    }

    போனகாலத்துப்பெயரெச்சம்(பகுதி,) {
        return new Set(this.போனகாலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}அ`,),);
    }

    போனகாலத்துவினய்முற்று(பகுதி, இடம், எண்,) {
        const போனகாலத்துப்பெயரெச்சம் = this.போனகாலத்துப்பெயரெச்சம்(பகுதி,);
        if (இடம் === "தன்மய்") {
            if (எண் === "ஒருமய்") {
                return new Set([...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஏன்`,), ...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அன்`,),],);
            }
            if (எண் === "பன்மய்") {
                return new Set([...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஓம்`,), ...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனம்`,),],);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "முன்னிலய்") {
            if (எண் === "ஒருமய்") {
                return new Set(போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆய்`,),);
            }
            if (எண் === "பன்மய்") {
                return new Set(போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஈர்`,),);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "படர்க்கய்") {
            if (எண் === "ஆண்பால்") {
                return new Set([...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆன்`,), ...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனன்`,),],);
            }
            if (எண் === "பெண்பால்") {
                return new Set([...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆள்`,), ...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனள்`,),],);
            }
            if (எண் === "பலர்பால்") {
                return new Set([...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆர்`,), ...போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனர்`,),],);
            }
            if (எண் === "ஒன்றன்பால்") {
                return new Set(போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அது`,),);
            }
            if (எண் === "பலவின்பால்") {
                return new Set(போனகாலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அன`,),);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        throw new Error(`Invalid இடம்: ${இடம்}`,);
    }

    எதிர்மறய்வினயெச்சம்() {
        return new Set();
    }

    எதிர்மறய்ப்பெயரெச்சம்() {
        return new Set();
    }

    எதிர்மறய்வினய்முற்று(பகுதி, இடம், எண்,) {
        const terminalDoubledForm = monosyllabicShortTerminalDoubler(பகுதி,);

        if (இடம் === "தன்மய்") {
            if (எண் === "ஒருமய்") {
                return new Set([`${terminalDoubledForm}ஏன்`, `${terminalDoubledForm}அன்`,],);
            }
            if (எண் === "பன்மய்") {
                return new Set([`${terminalDoubledForm}ஓம்`, `${terminalDoubledForm}அனம்`,],);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "முன்னிலய்") {
            if (எண் === "ஒருமய்") {
                return new Set([`${terminalDoubledForm}ஆய்`,],);
            }
            if (எண் === "பன்மய்") {
                return new Set([`${terminalDoubledForm}ஈர்`,],);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "படர்க்கய்") {
            if (எண் === "ஆண்பால்") {
                return new Set([`${terminalDoubledForm}ஆன்`, `${terminalDoubledForm}அனன்`,],);
            }
            if (எண் === "பெண்பால்") {
                return new Set([`${terminalDoubledForm}ஆள்`, `${terminalDoubledForm}அனள்`,],);
            }
            if (எண் === "பலர்பால்") {
                return new Set([`${terminalDoubledForm}ஆர்`, `${terminalDoubledForm}அனர்`,],);
            }
            if (எண் === "ஒன்றன்பால்") {
                return new Set([`${terminalDoubledForm}ஆது`,],);
            }
            if (எண் === "பலவின்பால்") {
                return new Set([`${terminalDoubledForm}ஆ`,],);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        throw new Error(`Invalid இடம்: ${இடம்}`,);
    }

    வருங்காலத்துவினயெச்சம்(பகுதி,) {
        return new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}அ`,],);
    }

    வருங்காலத்துப்பெயரெச்சம்(பகுதி,) {
        return new Set(this.வருங்காலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}உம்`,),);
    }

    வருங்காலத்துவினய்முற்று(பகுதி, இடம், எண்,) {
        const intermediateForms = (() => {
            if (! ண்ன்ள்ல்ழ்.includes(பகுதி.match(TWO_CHAR_RE,)?.[0],)) {
                return new Set([பகுதி,],);
            }
            return new Set([
                பகுதி,
                `${monosyllabicShortTerminalDoubler(பகுதி,)}உ`,
            ],);
        })();

        if (இடம் === "தன்மய்") {
            if (எண் === "ஒருமய்") {
                return new Set(intermediateForms.values().map(val => `${val}வேன்`,),);
            }
            if (எண் === "பன்மய்") {
                return new Set([...intermediateForms.values().map(val => `${val}வோம்`,), ...intermediateForms.values().map(val => `${val}வம்`,),],);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "முன்னிலய்") {
            if (எண் === "ஒருமய்") {
                return new Set(intermediateForms.values().map(val => `${val}வாய்`,),);
            }
            if (எண் === "பன்மய்") {
                return new Set(intermediateForms.values().map(val => `${val}வீர்`,),);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "படர்க்கய்") {
            if (எண் === "ஆண்பால்") {
                return new Set([...intermediateForms.values().map(val => `${val}வான்`,), ...intermediateForms.values().map(val => `${val}வன்`,),],);
            }
            if (எண் === "பெண்பால்") {
                return new Set([...intermediateForms.values().map(val => `${val}வாள்`,), ...intermediateForms.values().map(val => `${val}வள்`,),],);
            }
            if (எண் === "பலர்பால்") {
                return new Set([...intermediateForms.values().map(val => `${val}வார்`,), ...intermediateForms.values().map(val => `${val}வர்`,),],);
            }
            if (எண் === "ஒன்றன்பால்") {
                return new Set(intermediateForms.values().map(val => `${val}வது`,),).union(this.வருங்காலத்துப்பெயரெச்சம்(பகுதி,),);
            }
            if (எண் === "பலவின்பால்") {
                return new Set(intermediateForms.values().map(val => `${val}வன`,),);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        throw new Error(`Invalid இடம்: ${இடம்}`,);
    }

    வியங்கோள்வினய்முற்று(பகுதி,) {
        if (! ண்ன்ள்ல்ழ்.includes(பகுதி.match(TWO_CHAR_RE,)?.[0],)) {
            return new Set([`${பகுதி}க`,],);
        }

        return new Set([
            `${பகுதி}க`,
            `${monosyllabicShortTerminalDoubler(பகுதி,)}உக`,
        ],);
    }

    தொழிற்பெயர்(பகுதி,) {
        const match = பகுதி.match(TWO_CHAR_RE,);

        if (! ண்ன்ள்ல்ழ்.includes(match?.[0],)) {
            return new Set([`${பகுதி}தல்`,],);
        }

        if (["ண்", "ன்", "ழ்",].includes(match[0],)) {
            return new Set([
                `${பகுதி}தல்`,
                `${monosyllabicShortTerminalDoubler(பகுதி,)}உதல்`,
            ],);
        }

        return new Set([
            `${பகுதி}த்தல்`,
            `${monosyllabicShortTerminalDoubler(பகுதி,)}உதல்`,
        ],);
    }

    நிகழ்காலத்துப்பெயரெச்சம்(பகுதி,) {
        if (! ண்ன்ள்ல்ழ்.includes(பகுதி.match(TWO_CHAR_RE,)?.[0],)) {
            return new Set([`${பகுதி}கின்ற`,],);
        }

        return new Set([
            `${பகுதி}கின்ற`,
            `${monosyllabicShortTerminalDoubler(பகுதி,)}உகின்ற`,
        ],);
    }

    நிகழ்காலத்துவினய்முற்று(பகுதி, இடம், எண்,) {
        const நிகழ்காலத்துப்பெயரெச்சம் = this.நிகழ்காலத்துப்பெயரெச்சம்(பகுதி,);

        if (இடம் === "தன்மய்") {
            if (எண் === "ஒருமய்") {
                return new Set(நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஏன்`,),);
            }
            if (எண் === "பன்மய்") {
                return new Set([...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஓம்`,), ...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனம்`,),],);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "முன்னிலய்") {
            if (எண் === "ஒருமய்") {
                return new Set(நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆய்`,),);
            }
            if (எண் === "பன்மய்") {
                return new Set(நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஈர்`,),);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        if (இடம் === "படர்க்கய்") {
            if (எண் === "ஆண்பால்") {
                return new Set([...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆன்`,), ...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனன்`,),],);
            }
            if (எண் === "பெண்பால்") {
                return new Set([...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆள்`,), ...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனள்`,),],);
            }
            if (எண் === "பலர்பால்") {
                return new Set([...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}ஆர்`,), ...நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அனர்`,),],);
            }
            if (எண் === "ஒன்றன்பால்") {
                return new Set(நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அது`,),);
            }
            if (எண் === "பலவின்பால்") {
                return new Set(நிகழ்காலத்துப்பெயரெச்சம்.values().map(val => `${val}${புள்ளி}அன`,),);
            }
            throw new Error(`Invalid எண்: ${எண்}`,);
        }

        throw new Error(`Invalid இடம்: ${இடம்}`,);
    }
}

/* eslint-enable class-methods-use-this */

// செய் is the baseline
const செய் = new வினயினம்("செய்",);

const வா = new வினயினம்("வா",);
வா.பகுதி = பகுதி => `${lastஆShortener(பகுதி,)}ரு`;
வா.valid = பகுதி => [ஆLetter, ஆMarker,].includes(பகுதி[பகுதி.length - 1],);
வா.ஏவல்வினய்முற்று = (பகுதி, இடம், எண்,) => {
    // TODO: Implement correct Tamil imperative forms for வா class
    const baseForm = பகுதி.replace("ரு", "",);
    if (எண் === "பன்மய்") {
        return new Set([`${baseForm}_வா_plural_imperative`,],);
    }
    return new Set([`${baseForm}${புள்ளி}ஆ`,],); // Singular (default)
};
வா.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி.replace("ரு", "",)}ந்து`,],);

const காண் = new வினயினம்("காண்",);
காண்.valid = பகுதி => ["ாண்", "ான்", "ஆண்", "ஆன்",].includes(பகுதி.match(THREE_CHAR_RE,)?.[0],);
காண்.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${lastஆShortener(பகுதி,)}து`,],);

const கடயுயிரோரசய் = new வினயினம்("கடயுயிரோரசய்",);
கடயுயிரோரசய்.வருங்காலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}க`,],);
கடயுயிரோரசய்.எதிர்மறய்வினய்முற்று = (பகுதி, இடம், எண்,) => {
    // TODO: Implement correct Tamil negative forms for கடயுயிரோரசய் class
    const baseForm = கடயுயிரோரசய்.வருங்காலத்துவினயெச்சம்(பகுதி,).values().next().value;
    return new Set([`${baseForm}_கடயுயிரோரசய்_negative_${இடம்}_${எண்}`,],);
};
கடயுயிரோரசய்.வருங்காலத்துவினய்முற்று = (பகுதி, இடம், எண்,) =>
    // TODO: Implement correct Tamil future tense forms for கடயுயிரோரசய் class
    new Set([`${பகுதி}_கடயுயிரோரசய்_future_${இடம்}_${எண்}`,],);
கடயுயிரோரசய்.தொழிற்பெயர் = பகுதி => new Set([`${பகுதி}தல்`, `${பகுதி}குதல்`,],);
கடயுயிரோரசய்.வியங்கோள்வினய்முற்று = பகுதி =>
    new Set([`${பகுதி}க`, `${பகுதி}குக`,],);

const போ = Object.create(கடயுயிரோரசய்,);
போ.இனத்துப்பெயர் = "போ";
போ.valid = பகுதி => [ஆLetter, ஆMarker, ஓLetter, ஓMarker,].includes(பகுதி[பகுதி.length - 1],);
போ.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}ய்`,],);
போ.போனகாலத்துப்பெயரெச்சம் = பகுதி => new Set([`${பகுதி}ன`, `${பகுதி}யின`,],);

const நோ = Object.create(கடயுயிரோரசய்,);
நோ.இனத்துப்பெயர் = "நோ";
நோ.valid = பகுதி => [ஏLetter, ஏMarker, ஓLetter, ஓMarker,].includes(பகுதி[பகுதி.length - 1],);
நோ.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${terminalஏஓShortener(பகுதி,)}ந்து`,],);

const சா = Object.create(கடயுயிரோரசய்,);
சா.இனத்துப்பெயர் = "சா";
சா.valid = பகுதி => [ஆLetter, ஆMarker,].includes(பகுதி[பகுதி.length - 1],);
சா.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${lastஆShortener(பகுதி,)}${புள்ளி}எத்து`,],);

// உயர் has different போனகாலத்து forms
const உயர் = new வினயினம்("உயர்",);
உயர்.valid = பகுதி => {
    const lastCharacter = பகுதி[பகுதி.length - 1];
    if (இஈLettersOrMarkers.includes(lastCharacter,)) {
        return true;
    }
    if ([உLetter, உMarker,].includes(lastCharacter,)) {
        return true;
    }
    if (புள்ளி !== lastCharacter) {
        return false;
    }
    if (! இடயினம்.includes(பகுதி[பகுதி.length - 2],)) {
        return false;
    }
    return true;
};
உயர்.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}ந்து`,],);

const பார் = new வினயினம்("பார்",);
பார்.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}த்து`,],);
பார்.எதிர்மறய்வினய்முற்று = function (பகுதி, இடம், எண்,) {
    const வருங்காலத்துவினயெச்சம் = பார்.வருங்காலத்துவினயெச்சம்(பகுதி,);
    const prototypeஎதிர்மறய்வினய்முற்று = வினயினம்.prototype.எதிர்மறய்வினய்முற்று.call(this, பகுதி, இடம், எண்,);
    if (இடம் === "தன்மய்") {
        if (எண் === "ஒருமய்") {
            return new Set([...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஏன்`,), ...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}அன்`,),],).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        if (எண் === "பன்மய்") {
            return new Set([...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஓம்`,), ...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}அனம்`,),],).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    if (இடம் === "முன்னிலய்") {
        if (எண் === "ஒருமய்") {
            return new Set(வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஆய்`,),).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        if (எண் === "பன்மய்") {
            return new Set(வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஈர்`,),).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    if (இடம் === "படர்க்கய்") {
        if (எண் === "ஆண்பால்") {
            return new Set([...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஆன்`,), ...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}அனன்`,),],).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        if (எண் === "பெண்பால்") {
            return new Set([...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஆள்`,), ...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}அனள்`,),],).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        if (எண் === "பலர்பால்") {
            return new Set([...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஆர்`,), ...வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}அனர்`,),],).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        if (எண் === "ஒன்றன்பால்") {
            return new Set(வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஆது`,),).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        if (எண் === "பலவின்பால்") {
            return new Set(வருங்காலத்துவினயெச்சம்.values().map(val => `${val}${புள்ளி}ஆ`,),).union(prototypeஎதிர்மறய்வினய்முற்று,);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    throw new Error(`Invalid இடம்: ${இடம்}`,);
};
பார்.வருங்காலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}க்க`,],);

பார்.வருங்காலத்துவினய்முற்று = function (பகுதி, இடம், எண்,) {
    if (இடம் === "தன்மய்") {
        if (எண் === "ஒருமய்") {
            return new Set([`${பகுதி}ப்பேன்`,],);
        }
        if (எண் === "பன்மய்") {
            return new Set([`${பகுதி}ப்போம்`, `${பகுதி}ப்பம்`,],);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    if (இடம் === "முன்னிலய்") {
        if (எண் === "ஒருமய்") {
            return new Set([`${பகுதி}ப்பாய்`,],);
        }
        if (எண் === "பன்மய்") {
            return new Set([`${பகுதி}ப்பீர்`,],);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    if (இடம் === "படர்க்கய்") {
        if (எண் === "ஆண்பால்") {
            return new Set([`${பகுதி}ப்பான்`, `${பகுதி}ப்பன்`,],);
        }
        if (எண் === "பெண்பால்") {
            return new Set([`${பகுதி}ப்பாள்`, `${பகுதி}ப்பள்`,],);
        }
        if (எண் === "பலர்பால்") {
            return new Set([`${பகுதி}ப்பார்`, `${பகுதி}ப்பர்`,],);
        }
        if (எண் === "ஒன்றன்பால்") {
            return new Set([`${பகுதி}ப்பது`,],).union(this.வருங்காலத்துப்பெயரெச்சம்(பகுதி,),);
        }
        if (எண் === "பலவின்பால்") {
            return new Set([`${பகுதி}ப்பன`,],);
        }
        throw new Error(`Invalid எண்: ${எண்}`,);
    }

    throw new Error(`Invalid இடம்: ${இடம்}`,);
};

பார்.வியங்கோள்வினய்முற்று = பகுதி => new Set([`${பகுதி}க்க`,],);
பார்.தொழிற்பெயர் = பகுதி => new Set([`${பகுதி}த்தல்`,],);
பார்.நிகழ்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${பகுதி}க்கின்ற`,],);

// இரு is a hybrid of பார் and உயர்
const இரு = Object.create(பார்,);
இரு.இனத்துப்பெயர் = "இரு";
இரு.போனகாலத்துவினயெச்சம் = உயர்.போனகாலத்துவினயெச்சம்;

const இடு = new வினயினம்("இடு",);
இடு.valid = பகுதி => ["கு", "டு", "று",].includes(பகுதி.match(TWO_CHAR_RE,)?.[0],);
இடு.போனகாலத்துவினயெச்சம் = பகுதி => new Set([
    பகுதி.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1${உMarker}`,
    ),
],);
இடு.தொழிற்பெயர் = பகுதி => new Set([
    பகுதி.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1ல்`,
    ),
    `${பகுதி}உதல்`,
],);

const தகு = new வினயினம்("தகு",);
தகு.valid = பகுதி => பகுதி.match(TWO_CHAR_RE,)?.[0] === "கு";
தகு.போனகாலத்துவினயெச்சம் = பகுதி => new Set([
    பகுதி.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1${உMarker}`,
    ),
    `${பகுதி}ந்து`,
],);
தகு.தொழிற்பெயர் = இடு.தொழிற்பெயர்;

const வாங்கு = new வினயினம்("வாங்கு",);
வாங்கு.valid = பகுதி => [உLetter, உMarker,].includes(பகுதி[பகுதி.length - 1],);
வாங்கு.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}இ`,],);
வாங்கு.போனகாலத்துப்பெயரெச்சம் = function (பகுதி,) { return new Set(வாங்கு.போனகாலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}ன`,),).union(வினயினம்.prototype.போனகாலத்துப்பெயரெச்சம்.call(this, பகுதி,),); };
வாங்கு.போனகாலத்துவினய்முற்று = (பகுதி, இடம், எண்,) =>
    // TODO: Implement correct Tamil past tense forms for வாங்கு class
    new Set([`${பகுதி}_வாங்கு_past_${இடம்}_${எண்}`,],);

const போது = new வினயினம்("போது",);
போது.valid = பகுதி => பகுதி.match(TWO_CHAR_RE,)?.[0] === "து";
போது.சிறப்புப்பகுதி = பகுதி => `${terminalதNasaliser(terminalஉRemover(பகுதி,),)}${புள்ளி}`;
போது.போனகாலத்துவினயெச்சம் = பகுதி => வினயினம்.prototype.போனகாலத்துவினயெச்சம்(போது.சிறப்புப்பகுதி(பகுதி,),).union(வாங்கு.போனகாலத்துவினயெச்சம்(பகுதி,),);
போது.போனகாலத்துவினய்முற்று = (பகுதி, இடம், எண்,) =>
    // TODO: Implement correct Tamil past tense forms for போது class
    new Set([`${பகுதி}_போது_past_${இடம்}_${எண்}`,],);

const சொல் = new வினயினம்("சொல்",);
சொல்.valid = பகுதி => ["ள்", "ல்",].includes(பகுதி.match(TWO_CHAR_RE,)?.[0],);
சொல்.போனகாலத்துவினயெச்சம் = வாங்கு.போனகாலத்துவினயெச்சம்;
சொல்.சிறப்புப்போனகாலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ந`,],);
சொல்.போனகாலத்துப்பெயரெச்சம் = பகுதி => வாங்கு.போனகாலத்துப்பெயரெச்சம்(பகுதி,).union(சொல்.சிறப்புப்போனகாலத்துப்பெயரெச்சம்(பகுதி,),);
சொல்.போனகாலத்துவினய்முற்று = (பகுதி, இடம், எண்,) =>
    // TODO: Implement correct Tamil past tense forms for சொல் class
    new Set([`${பகுதி}_சொல்_past_${இடம்}_${எண்}`,],);

const emptySetGenerator = () => new Set([],);

const அடிப்படய் = new வினயினம்("அடிப்படய்",);
அடிப்படய்.ஏவல்வினய்முற்று = (பகுதி, இடம், எண்,) => emptySetGenerator();
அடிப்படய்.எதிர்மறய்வினய்முற்று = (பகுதி, இடம், எண்,) => emptySetGenerator();
அடிப்படய்.வருங்காலத்துவினயெச்சம் = பகுதி => emptySetGenerator();
அடிப்படய்.போனகாலத்துவினயெச்சம் = பகுதி => emptySetGenerator();
அடிப்படய்.போனகாலத்துவினய்முற்று = (பகுதி, இடம், எண்,) => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆர்`,],);
அடிப்படய்.நிகழ்காலத்துவினய்முற்று = (பகுதி, இடம், எண்,) => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆர்`,],);
அடிப்படய்.வருங்காலத்துவினய்முற்று = (பகுதி, இடம், எண்,) => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆர்`,],);

const அல் = Object.create(அடிப்படய்,);
அல்.இனத்துப்பெயர் = "அல்";
அல்.valid = பகுதி => பகுதி === "அல்";
அல்.போனகாலத்துப்பெயரெச்சம் = அல்.நிகழ்காலத்துப்பெயரெச்சம் = அல்.வருங்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆத`, `${பகுதி}த்த`,],);
அல்.தொழிற்பெயர் = அல்.வியங்கோள்வினய்முற்று = emptySetGenerator;

const உள் = Object.create(அடிப்படய்,);
உள்.இனத்துப்பெயர் = "உள்";
உள்.valid = பகுதி => பகுதி === "உள்";
உள்.போனகாலத்துப்பெயரெச்சம் = உள்.நிகழ்காலத்துப்பெயரெச்சம் = உள்.வருங்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}அ`,],);
உள்.தொழிற்பெயர் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}உதல்`,],);

const இல் = Object.create(அடிப்படய்,);
இல்.இனத்துப்பெயர் = "இல்";
இல்.valid = பகுதி => பகுதி === "இல்";
இல்.போனகாலத்துப்பெயரெச்சம் = இல்.நிகழ்காலத்துப்பெயரெச்சம் = இல்.வருங்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆத`,],);
இல்.தொழிற்பெயர் = இல்.வியங்கோள்வினய்முற்று = emptySetGenerator;

export { செய், வா, காண், போ, நோ, சா, உயர், சொல், பார், இரு, இடு, தகு, வாங்கு, போது, அல், உள், இல், };

/*
வாங்குவும் போதுவும் ஒரு வகய்
பார் இரு இவய் ஒரு வகய்
சொல் உயர் போலவே
இடுவும் வாவும் காணும் செய் போல்
தகு இடுபோலும் உயர்போலும்
கடயுயிரோரசய்கள் ஒரு வகய்
அடிப்படய்கள் ஒரு வகய்
*/

const வினயினங்கள் = [செய், வா, காண், போ, நோ, சா, உயர், சொல், பார், இரு, இடு, தகு, வாங்கு, போது, அல், உள், இல்,];

export const வினயினத்துப்பெயர்கள் = வினயினங்கள்.map(வினயினம்_ => வினயினம்_.இனத்துப்பெயர்,);

export const validவினயினத்துப்பெயர்கள் = பகுதி => வினயினங்கள்.filter(வினயினம்_ => வினயினம்_.valid(பகுதி,),).map(வினயினம்_ => வினயினம்_.இனத்துப்பெயர்,);

export const வினயினம்Byபெயர் = இனத்துப்பெயர் => {
    const வினயினம்Option = வினயினங்கள்.find(e => e.இனத்துப்பெயர் === இனத்துப்பெயர்,);

    if (! வினயினம்Option) {
        throw new Error(`Unknown வினயினம் ${இனத்துப்பெயர்}.`,);
    }

    return வினயினம்Option;
};
