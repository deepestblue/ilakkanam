import { புள்ளி, ஈLetterஇஈMarkers, ஆLetter, ஆMarker, உMarker, ஊMarker, ஏMarker, ஓMarker, யரலழள, } from "./ezuttu.js";
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

    ஏவல்வினய்முற்று(பகுதி,) {
        return new Set([பகுதி,],);
    }

    எதிர்மறய்வினய்முற்று(பகுதி,) {
        return new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆர்`,],);
    }

    போனகாலத்துவினயெச்சம்(பகுதி,) {
        return new Set([`${பகுதி}து`,],);
    }

    போனகாலத்துப்பெயரெச்சம்(பகுதி,) {
        return new Set(this.போனகாலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}அ`,),);
    }

    போனகாலத்துவினய்முற்று(பகுதி,) {
        return new Set(this.போனகாலத்துப்பெயரெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}ஆர்`,),);
    }

    நிகழ்காலத்துப்பெயரெச்சம்(பகுதி,) {
        return new Set([`${பகுதி}கின்ற`,],);
    }

    நிகழ்காலத்துவினய்முற்று(பகுதி,) {
        return new Set(this.நிகழ்காலத்துப்பெயரெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}ஆர்`,),);
    }

    வருங்காலத்துவினயெச்சம்(பகுதி,) {
        return new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}அ`,],);
    }

    வருங்காலத்துப்பெயரெச்சம்(பகுதி,) {
        return new Set(this.வருங்காலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}உம்`,),);
    }

    வருங்காலத்துவினய்முற்று(பகுதி,) {
        return new Set([`${பகுதி}வார்`,],);
    }

    தொழிற்பெயர்(பகுதி,) {
        const match = பகுதி.match(TWO_CHAR_RE,);
        if (! match) {
            return new Set([`${பகுதி}தல்`,],);
        }

        if (! ["ண்", "ன்", "ள்", "ல்",].includes(match[0],)) {
            return new Set([`${பகுதி}தல்`,],);
        }

        if (["ண்", "ன்",].includes(match[0],)) {
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
}

/* eslint-enable class-methods-use-this */

const வாங்கு = new வினயினம்("வாங்கு",);
வாங்கு.valid = பகுதி => பகுதி.endsWith(உMarker,);
வாங்கு.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}இ`,],);
வாங்கு.போனகாலத்துவினய்முற்று = function (பகுதி,) { return new Set(this.போனகாலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}னார்`,),); };
வாங்கு.போனகாலத்துப்பெயரெச்சம் = function (பகுதி,) { return new Set(this.போனகாலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}ன`,),).union(வினயினம்.prototype.போனகாலத்துப்பெயரெச்சம்.call(this, பகுதி,),); };

const போது = Object.create(வாங்கு,);
போது.இனத்துப்பெயர் = "போது";
போது.valid = function (பகுதி,) {
    const match = பகுதி.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return match[0] === "து";
};
போது.சிறப்புப்பகுதி = பகுதி => `${terminalதNasaliser(terminalஉRemover(பகுதி,),)}${புள்ளி}`;
போது.போனகாலத்துவினயெச்சம் = function (பகுதி,) { return வினயினம்.prototype.போனகாலத்துவினயெச்சம்(this.சிறப்புப்பகுதி(பகுதி,),).union(வாங்கு.போனகாலத்துவினயெச்சம்(பகுதி,),); };
போது.போனகாலத்துப்பெயரெச்சம் = function (பகுதி,) { return new Set(this.போனகாலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}அ`,),); };
போது.போனகாலத்துவினய்முற்று = function (பகுதி,) { return வினயினம்.prototype.போனகாலத்துவினய்முற்று(this.சிறப்புப்பகுதி(பகுதி,),).union(வாங்கு.போனகாலத்துவினய்முற்று(பகுதி,),); };

const பார் = new வினயினம்("பார்",);
பார்.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}த்து`,],);
பார்.நிகழ்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${பகுதி}க்கின்ற`,],);
பார்.வருங்காலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}க்க`,],);
பார்.வருங்காலத்துவினய்முற்று = பகுதி => new Set([`${பகுதி}ப்பார்`,],);
பார்.தொழிற்பெயர் = பகுதி => new Set([`${பகுதி}த்தல்`,],);
பார்.எதிர்மறய்வினய்முற்று = function (பகுதி,) { return new Set(this.வருங்காலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}ஆர்`,),).union(வினயினம்.prototype.எதிர்மறய்வினய்முற்று.call(this, பகுதி,),); };

const இரு = Object.create(பார்,);
இரு.இனத்துப்பெயர் = "இரு";
இரு.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}ந்து`,],);

const உயர் = new வினயினம்("உயர்",);
உயர்.valid = function (பகுதி,) {
    const lastCharacter = பகுதி[பகுதி.length - 1];
    if (ஈLetterஇஈMarkers.includes(lastCharacter,)) {
        return true;
    }
    if (உMarker === lastCharacter) {
        return true;
    }
    if (புள்ளி !== lastCharacter) {
        return false;
    }
    if (! யரலழள.includes(பகுதி[பகுதி.length - 2],)) {
        return false;
    }
    return true;
};
உயர்.போனகாலத்துவினயெச்சம் = இரு.போனகாலத்துவினயெச்சம்;

const சொல் = Object.create(உயர்,);
சொல்.இனத்துப்பெயர் = "சொல்";
சொல்.valid = function (பகுதி,) {
    const match = பகுதி.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return ["ள்", "ல்",].includes(match[0],);
};
சொல்.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}இ`,],);
சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ந`,],);
சொல்.போனகாலத்துப்பெயரெச்சம் = function (பகுதி,) { return வினயினம்.prototype.போனகாலத்துப்பெயரெச்சம்.call(this, பகுதி,).union(சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(பகுதி,),); };
சொல்.போனகாலத்துவினய்முற்று = பகுதி => new Set(சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}ஆர்`,),);

const இடு = new வினயினம்("இடு",);
இடு.valid = function (பகுதி,) {
    const match = பகுதி.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return ["கு", "டு", "று",].includes(match[0],);
};
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
தகு.valid = function (பகுதி,) {
    const match = பகுதி.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return match[0] === "கு";
};
தகு.போனகாலத்துவினயெச்சம் = பகுதி => new Set([
    பகுதி.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1${உMarker}`,
    ),
    `${பகுதி}ந்து`,
],);
தகு.தொழிற்பெயர் = இடு.தொழிற்பெயர்;

const செய் = new வினயினம்("செய்",);

const வா = Object.create(செய்,);
வா.இனத்துப்பெயர் = "வா";
வா.பகுதி = பகுதி => `${lastஆShortener(பகுதி,)}ரு`;
வா.valid = பகுதி => பகுதி.endsWith(ஆMarker,);
வா.ஏவல்வினய்முற்று = பகுதி => new Set([`${பகுதி.replace("ரு", "",)}ா`,],);
வா.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி.replace("ரு", "",)}ந்து`,],);

const காண் = Object.create(செய்,);
காண்.இனத்துப்பெயர் = "காண்";
காண்.valid = function (பகுதி,) {
    const match = பகுதி.match(THREE_CHAR_RE,);
    if (! match) {
        return false;
    }
    return ["ாண்", "ான்",].includes(match[0],);
};
காண்.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${lastஆShortener(பகுதி,)}து`,],);

const கடயுயிர் = Object.create(செய்,);
கடயுயிர்.இனத்துப்பெயர் = "கடயுயிர்";
கடயுயிர்.வருங்காலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}க`,],);
கடயுயிர்.எதிர்மறய்வினய்முற்று = function (பகுதி,) { return new Set(this.வருங்காலத்துவினயெச்சம்(பகுதி,).values().map(val => `${val}${புள்ளி}ஆர்`,),); };

const போ = Object.create(கடயுயிர்,);
போ.இனத்துப்பெயர் = "போ";
போ.valid = பகுதி => [ஆLetter, ஆMarker, ஊMarker, ஓMarker,].includes(பகுதி[பகுதி.length - 1],);
போ.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${பகுதி}ய்`,],);
போ.போனகாலத்துப்பெயரெச்சம் = பகுதி => new Set([`${பகுதி}ன`,],);

const நோ = Object.create(கடயுயிர்,);
நோ.இனத்துப்பெயர் = "நோ";
நோ.valid = பகுதி => [ஏMarker, ஓMarker,].includes(பகுதி[பகுதி.length - 1],);
நோ.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${terminalஏஓShortener(பகுதி,)}ந்து`,],);

const சா = Object.create(கடயுயிர்,);
சா.இனத்துப்பெயர் = "சா";
சா.valid = பகுதி => பகுதி.endsWith(ஆMarker,);
சா.போனகாலத்துவினயெச்சம் = பகுதி => new Set([`${lastஆShortener(பகுதி,)}${புள்ளி}எத்து`,],);

const emptyStringSingletonGenerator = () => new Set(["",],);

const அடிப்படய் = Object.create(உயர்,);
அடிப்படய்.இனத்துப்பெயர் = "அடிப்படய்";
அடிப்படய்.ஏவல்வினய்முற்று = அடிப்படய்.எதிர்மறய்வினய்முற்று = அடிப்படய்.வருங்காலத்துவினயெச்சம் = அடிப்படய்.போனகாலத்துவினயெச்சம் = emptyStringSingletonGenerator;
அடிப்படய்.போனகாலத்துவினய்முற்று = அடிப்படய்.நிகழ்காலத்துவினய்முற்று = அடிப்படய்.வருங்காலத்துவினய்முற்று = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}அார்`,],);

const அல் = Object.create(அடிப்படய்,);
அல்.இனத்துப்பெயர் = "அல்";
அல்.valid = பகுதி => பகுதி === "அல்";
அல்.போனகாலத்துப்பெயரெச்சம் = அல்.நிகழ்காலத்துப்பெயரெச்சம் = அல்.வருங்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${பகுதி}த்த`,],);
அல்.தொழிற்பெயர் = emptyStringSingletonGenerator;

const உள் = Object.create(அடிப்படய்,);
உள்.இனத்துப்பெயர் = "உள்";
உள்.valid = பகுதி => பகுதி === "உள்";
உள்.போனகாலத்துப்பெயரெச்சம் = உள்.நிகழ்காலத்துப்பெயரெச்சம் = உள்.வருங்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}அ`,],);
உள்.தொழிற்பெயர் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}உதல்`,],);

const இல் = Object.create(அடிப்படய்,);
இல்.இனத்துப்பெயர் = "இல்";
இல்.valid = பகுதி => பகுதி === "இல்";
இல்.போனகாலத்துப்பெயரெச்சம் = இல்.நிகழ்காலத்துப்பெயரெச்சம் = இல்.வருங்காலத்துப்பெயரெச்சம் = பகுதி => new Set([`${monosyllabicShortTerminalDoubler(பகுதி,)}ஆத`,],);
இல்.தொழிற்பெயர் = emptyStringSingletonGenerator;

const மாட்டு = Object.create(அடிப்படய்,);
மாட்டு.இனத்துப்பெயர் = "மாட்டு";
மாட்டு.valid = பகுதி => பகுதி === "மாட்டு";
மாட்டு.போனகாலத்துப்பெயரெச்சம் = மாட்டு.நிகழ்காலத்துப்பெயரெச்சம் = மாட்டு.வருங்காலத்துப்பெயரெச்சம் = மாட்டு.தொழிற்பெயர் = emptyStringSingletonGenerator;

export { வாங்கு, பார், இரு, உயர், சொல், இடு, தகு, செய், வா, காண், போ, போது, நோ, சா, அல், உள், இல், மாட்டு, };

/*
வாங்குவும் போதுவும் ஒரு வகய்
பார் இரு இவய் ஒரு வகய்
சொல் உயர் போலவே
இடுவும் வாவும் காணும் செய் போல்
தகு இடுபோலும் உயர்போலும்
கடயுயிர்கள் ஒரு வகய்
அடிப்படய்கள் ஒரு வகய்
*/

const வினயினங்கள் = [வாங்கு, பார், இரு, உயர், சொல், இடு, தகு, செய், வா, காண், போ, போது, நோ, சா, அல், உள், இல், மாட்டு,];

export const வினயினத்துப்பெயர்கள் = வினயினங்கள்.map(வினயினம்_ => வினயினம்_.இனத்துப்பெயர்,);

export const validவினயினத்துப்பெயர்கள் = பகுதி => வினயினங்கள்.filter(வினயினம்_ => வினயினம்_.valid(பகுதி,),).map(வினயினம்_ => வினயினம்_.இனத்துப்பெயர்,);

export const வினயினம்Byபெயர் = இனத்துப்பெயர் => {
    const வினயினம்Option = வினயினங்கள்.find(e => e.இனத்துப்பெயர் === இனத்துப்பெயர்,);

    if (! வினயினம்Option) {
        throw new Error(`Unknown வினயினம் ${இனத்துப்பெயர்}.`,);
    }

    return வினயினம்Option;
};
