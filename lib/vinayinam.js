import { புள்ளி, ஈLetterஇஈMarkers, ஆLetter, ஆMarker, உMarker, ஊMarker, ஏMarker, ஓMarker, யரலழள, } from "./ezuttu.js";
import { monosyllabicShortTerminalDoubler, terminalஏஓShortener, lastஆShortener, terminalஉRemover, terminalதNasaliser, } from "./punarcci.js";

const TWO_CHAR_RE = /..$/v;
const THREE_CHAR_RE = /...$/v;

/* eslint-disable class-methods-use-this -- We override these methods in instance வினயினம்s in creative ways that making these static disallows us from doing */

class வினயினம் {
    constructor(இனத்துப்பெயர்,) {
        this.இனத்துப்பெயர் = இனத்துப்பெயர்;
    }

    வினய்(வினய்,) {
        return வினய்;
    }

    valid() {
        return true;
    }

    ஏவல்வினய்முற்று(வினய்,) {
        return new Set([வினய்,],);
    }

    எதிர்மறய்வினய்முற்று(வினய்,) {
        return new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}ஆர்`,],);
    }

    இறந்தகாலத்துவினயெச்சம்(வினய்,) {
        return new Set([`${வினய்}து`,],);
    }

    இறந்தகாலத்துப்பெயரெச்சம்(வினய்,) {
        return new Set(this.இறந்தகாலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}அ`,),);
    }

    இறந்தகாலத்துவினய்முற்று(வினய்,) {
        return new Set(this.இறந்தகாலத்துப்பெயரெச்சம்(வினய்,).values().map(val => `${val}${புள்ளி}ஆர்`,),);
    }

    நிகழ்காலத்துப்பெயரெச்சம்(வினய்,) {
        return new Set([`${வினய்}கின்ற`,],);
    }

    நிகழ்காலத்துவினய்முற்று(வினய்,) {
        return new Set(this.நிகழ்காலத்துப்பெயரெச்சம்(வினய்,).values().map(val => `${val}${புள்ளி}ஆர்`,),);
    }

    எதிர்காலத்துவினயெச்சம்(வினய்,) {
        return new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}அ`,],);
    }

    எதிர்காலத்துப்பெயரெச்சம்(வினய்,) {
        return new Set(this.எதிர்காலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}${புள்ளி}உம்`,),);
    }

    எதிர்காலத்துவினய்முற்று(வினய்,) {
        return new Set([`${வினய்}வார்`,],);
    }

    தொழிற்பெயர்(வினய்,) {
        const match = வினய்.match(TWO_CHAR_RE,);
        if (! match) {
            return new Set([`${வினய்}தல்`,],);
        }

        if (! ["ண்", "ன்", "ள்", "ல்",].includes(match[0],)) {
            return new Set([`${வினய்}தல்`,],);
        }

        if (["ண்", "ன்",].includes(match[0],)) {
            return new Set([
                `${வினய்}தல்`,
                `${monosyllabicShortTerminalDoubler(வினய்,)}உதல்`,
            ],);
        }

        return new Set([
            `${வினய்}த்தல்`,
            `${monosyllabicShortTerminalDoubler(வினய்,)}உதல்`,
        ],);
    }
}

/* eslint-enable class-methods-use-this */

const வாங்கு = new வினயினம்("வாங்கு",);
வாங்கு.valid = வினய் => வினய்.endsWith(உMarker,);
வாங்கு.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${வினய்}இ`,],);
வாங்கு.இறந்தகாலத்துவினய்முற்று = function (வினய்,) { return new Set(this.இறந்தகாலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}னார்`,),); };
வாங்கு.இறந்தகாலத்துப்பெயரெச்சம் = function (வினய்,) { return new Set(this.இறந்தகாலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}ன`,),).union(வினயினம்.prototype.இறந்தகாலத்துப்பெயரெச்சம்.call(this, வினய்,),); };

const போது = Object.create(வாங்கு,);
போது.இனத்துப்பெயர் = "போது";
போது.valid = function (வினய்,) {
    const match = வினய்.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return match[0] === "து";
};
போது.சிறப்புவினய் = வினய் => `${terminalதNasaliser(terminalஉRemover(வினய்,),)}${புள்ளி}`;
போது.இறந்தகாலத்துவினயெச்சம் = function (வினய்,) { return வினயினம்.prototype.இறந்தகாலத்துவினயெச்சம்(this.சிறப்புவினய்(வினய்,),).union(வாங்கு.இறந்தகாலத்துவினயெச்சம்(வினய்,),); };
போது.இறந்தகாலத்துப்பெயரெச்சம் = function (வினய்,) { return new Set(this.இறந்தகாலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}அ`,),); };
போது.இறந்தகாலத்துவினய்முற்று = function (வினய்,) { return வினயினம்.prototype.இறந்தகாலத்துவினய்முற்று(this.சிறப்புவினய்(வினய்,),).union(வாங்கு.இறந்தகாலத்துவினய்முற்று(வினய்,),); };

const பார் = new வினயினம்("பார்",);
பார்.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${வினய்}த்து`,],);
பார்.நிகழ்காலத்துப்பெயரெச்சம் = வினய் => new Set([`${வினய்}க்கின்ற`,],);
பார்.எதிர்காலத்துவினயெச்சம் = வினய் => new Set([`${வினய்}க்க`,],);
பார்.எதிர்காலத்துவினய்முற்று = வினய் => new Set([`${வினய்}ப்பார்`,],);
பார்.தொழிற்பெயர் = வினய் => new Set([`${வினய்}த்தல்`,],);
பார்.எதிர்மறய்வினய்முற்று = function (வினய்,) { return new Set(this.எதிர்காலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}${புள்ளி}ஆர்`,),).union(வினயினம்.prototype.எதிர்மறய்வினய்முற்று.call(this, வினய்,),); };

const இரு = Object.create(பார்,);
இரு.இனத்துப்பெயர் = "இரு";
இரு.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${வினய்}ந்து`,],);

const உயர் = new வினயினம்("உயர்",);
உயர்.valid = function (வினய்,) {
    const lastCharacter = வினய்[வினய்.length - 1];
    if (ஈLetterஇஈMarkers.includes(lastCharacter,)) {
        return true;
    }
    if (உMarker === lastCharacter) {
        return true;
    }
    if (புள்ளி !== lastCharacter) {
        return false;
    }
    if (! யரலழள.includes(வினய்[வினய்.length - 2],)) {
        return false;
    }
    return true;
};
உயர்.இறந்தகாலத்துவினயெச்சம் = இரு.இறந்தகாலத்துவினயெச்சம்;

const சொல் = Object.create(உயர்,);
சொல்.இனத்துப்பெயர் = "சொல்";
சொல்.valid = function (வினய்,) {
    const match = வினய்.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return ["ள்", "ல்",].includes(match[0],);
};
சொல்.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}இ`,],);
சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம் = வினய் => new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}ந`,],);
சொல்.இறந்தகாலத்துப்பெயரெச்சம் = function (வினய்,) { return வினயினம்.prototype.இறந்தகாலத்துப்பெயரெச்சம்.call(this, வினய்,).union(சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(வினய்,),); };
சொல்.இறந்தகாலத்துவினய்முற்று = வினய் => new Set(சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(வினய்,).values().map(val => `${val}${புள்ளி}ஆர்`,),);

const இடு = new வினயினம்("இடு",);
இடு.valid = function (வினய்,) {
    const match = வினய்.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return ["கு", "டு", "று",].includes(match[0],);
};
இடு.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([
    வினய்.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1${உMarker}`,
    ),
],);
இடு.தொழிற்பெயர் = வினய் => new Set([
    வினய்.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1ல்`,
    ),
    `${வினய்}உதல்`,
],);

const தகு = new வினயினம்("தகு",);
தகு.valid = function (வினய்,) {
    const match = வினய்.match(TWO_CHAR_RE,);
    if (! match) {
        return false;
    }
    return match[0] === "கு";
};
தகு.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([
    வினய்.replace(
        RegExp(`(.)${உMarker}$`, "v",),
        `$1${புள்ளி}$1${உMarker}`,
    ),
    `${வினய்}ந்து`,
],);
தகு.தொழிற்பெயர் = இடு.தொழிற்பெயர்;

const செய் = new வினயினம்("செய்",);

const வா = Object.create(செய்,);
வா.இனத்துப்பெயர் = "வா";
வா.வினய் = வினய் => `${lastஆShortener(வினய்,)}ரு`;
வா.valid = வினய் => வினய்.endsWith(ஆMarker,);
வா.ஏவல்வினய்முற்று = வினய் => new Set([`${வினய்.replace("ரு", "",)}ா`,],);
வா.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${வினய்.replace("ரு", "",)}ந்து`,],);

const காண் = Object.create(செய்,);
காண்.இனத்துப்பெயர் = "காண்";
காண்.valid = function (வினய்,) {
    const match = வினய்.match(THREE_CHAR_RE,);
    if (! match) {
        return false;
    }
    return ["ாண்", "ான்",].includes(match[0],);
};
காண்.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${lastஆShortener(வினய்,)}து`,],);

const கடயுயிர் = Object.create(செய்,);
கடயுயிர்.இனத்துப்பெயர் = "கடயுயிர்";
கடயுயிர்.எதிர்காலத்துவினயெச்சம் = வினய் => new Set([`${வினய்}க`,],);
கடயுயிர்.எதிர்மறய்வினய்முற்று = function (வினய்,) { return new Set(this.எதிர்காலத்துவினயெச்சம்(வினய்,).values().map(val => `${val}${புள்ளி}ஆர்`,),); };

const போ = Object.create(கடயுயிர்,);
போ.இனத்துப்பெயர் = "போ";
போ.valid = வினய் => [ஆLetter, ஆMarker, ஊMarker, ஓMarker,].includes(வினய்[வினய்.length - 1],);
போ.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${வினய்}ய்`,],);
போ.இறந்தகாலத்துப்பெயரெச்சம் = வினய் => new Set([`${வினய்}ன`,],);

const நோ = Object.create(கடயுயிர்,);
நோ.இனத்துப்பெயர் = "நோ";
நோ.valid = வினய் => [ஏMarker, ஓMarker,].includes(வினய்[வினய்.length - 1],);
நோ.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${terminalஏஓShortener(வினய்,)}ந்து`,],);

const சா = Object.create(கடயுயிர்,);
சா.இனத்துப்பெயர் = "சா";
சா.valid = வினய் => வினய்.endsWith(ஆMarker,);
சா.இறந்தகாலத்துவினயெச்சம் = வினய் => new Set([`${lastஆShortener(வினய்,)}${புள்ளி}எத்து`,],);

const emptyStringSingletonGenerator = () => new Set(["",],);

const அடிப்படய் = Object.create(உயர்,);
அடிப்படய்.இனத்துப்பெயர் = "அடிப்படய்";
அடிப்படய்.ஏவல்வினய்முற்று = அடிப்படய்.எதிர்மறய்வினய்முற்று = அடிப்படய்.எதிர்காலத்துவினயெச்சம் = அடிப்படய்.இறந்தகாலத்துவினயெச்சம் = emptyStringSingletonGenerator;
அடிப்படய்.இறந்தகாலத்துவினய்முற்று = அடிப்படய்.நிகழ்காலத்துவினய்முற்று = அடிப்படய்.எதிர்காலத்துவினய்முற்று = வினய் => new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}அார்`,],);

const அல் = Object.create(அடிப்படய்,);
அல்.இனத்துப்பெயர் = "அல்";
அல்.valid = வினய் => வினய் === "அல்";
அல்.இறந்தகாலத்துப்பெயரெச்சம் = அல்.நிகழ்காலத்துப்பெயரெச்சம் = அல்.எதிர்காலத்துப்பெயரெச்சம் = வினய் => new Set([`${வினய்}த்த`,],);
அல்.தொழிற்பெயர் = emptyStringSingletonGenerator;

const உள் = Object.create(அடிப்படய்,);
உள்.இனத்துப்பெயர் = "உள்";
உள்.valid = வினய் => வினய் === "உள்";
உள்.இறந்தகாலத்துப்பெயரெச்சம் = உள்.நிகழ்காலத்துப்பெயரெச்சம் = உள்.எதிர்காலத்துப்பெயரெச்சம் = வினய் => new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}அ`,],);
உள்.தொழிற்பெயர் = வினய் => new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}உதல்`,],);

const இல் = Object.create(அடிப்படய்,);
இல்.இனத்துப்பெயர் = "இல்";
இல்.valid = வினய் => வினய் === "இல்";
இல்.இறந்தகாலத்துப்பெயரெச்சம் = இல்.நிகழ்காலத்துப்பெயரெச்சம் = இல்.எதிர்காலத்துப்பெயரெச்சம் = வினய் => new Set([`${monosyllabicShortTerminalDoubler(வினய்,)}ஆத`,],);
இல்.தொழிற்பெயர் = emptyStringSingletonGenerator;

const மாட்டு = Object.create(அடிப்படய்,);
மாட்டு.இனத்துப்பெயர் = "மாட்டு";
மாட்டு.valid = வினய் => வினய் === "மாட்டு";
மாட்டு.இறந்தகாலத்துப்பெயரெச்சம் = மாட்டு.நிகழ்காலத்துப்பெயரெச்சம் = மாட்டு.எதிர்காலத்துப்பெயரெச்சம் = மாட்டு.தொழிற்பெயர் = emptyStringSingletonGenerator;

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

export const validவினயினத்துப்பெயர்கள் = வினய் => வினயினங்கள்.filter(வினயினம்_ => வினயினம்_.valid(வினய்,),).map(வினயினம்_ => வினயினம்_.இனத்துப்பெயர்,);

export const வினயினம்Byபெயர் = இனத்துப்பெயர் => {
    const வினயினம்Option = வினயினங்கள்.find(e => e.இனத்துப்பெயர் === இனத்துப்பெயர்,);

    if (! வினயினம்Option) {
        throw new Error(`Unknown வினயினம் ${இனத்துப்பெயர்}.`,);
    }

    return வினயினம்Option;
};
