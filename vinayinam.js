import { pulli, I_letter_i_I_markers, A_letter, A_marker, u_marker, U_marker, o_marker, O_marker, ya_ra_zha, kutTil, consonants, } from "./ezuttu.js";
import { anyOfArray, } from "./utils.js";

class Vinayinam {
    constructor(இனத்துப்பெயர்) {
        this.இனத்துப்பெயர் = இனத்துப்பெயர்;
    }
    vinay(vinay) {
        return vinay;
    }
    valid(_unused) {
        return true;
    }
    ஏவல்வினய்முற்று(vinay) {
        return vinay;
    }
    அல்வினய்முற்று(vinay) {
        return this.எதிர்காலத்துவினயெச்சம்(vinay) + "ார்";
    }
    இறந்தகாலத்துவினயெச்சம்(_unused) {
        throw new Error("Abstract method!");
    }
    இறந்தகாலத்துப்பெயரெச்சம்(vinay) {
        return this.இறந்தகாலத்துவினயெச்சம்(vinay) + "அ";
    }
    இறந்தகாலத்துவினய்முற்று(vinay) {
        return this.இறந்தகாலத்துப்பெயரெச்சம்(vinay) + "ார்";
    }
    நிகழ்காலத்துப்பெயரெச்சம்(vinay) {
        return vinay + "கின்ற";
    }
    நிகழ்காலத்துவினய்முற்று(vinay) {
        return this.நிகழ்காலத்துப்பெயரெச்சம்(vinay) + "ார்";
    }
    எதிர்காலத்துவினயெச்சம்(vinay) {
        return monosyllabicShortTerminalDoubler(vinay) + "அ";
    }
    எதிர்காலத்துப்பெயரெச்சம்(vinay) {
        return this.எதிர்காலத்துவினயெச்சம்(vinay) + "ும்";
    }
    எதிர்காலத்துவினய்முற்று(vinay) {
        return vinay + "வார்";
    }
    தொழிற்பெயர்(vinay) {
        return vinay + "தல்";
    }
}

const வாங்கு = new Vinayinam("வாங்கு");
வாங்கு.valid = (vinay) => vinay.endsWith(u_marker);
வாங்கு.இறந்தகாலத்துவினயெச்சம் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "இ";
வாங்கு.இறந்தகாலத்துவினய்முற்று = (vinay) => vinay + "இனார்";

const பார் = new Vinayinam("பார்");
பார்.அல்வினய்முற்று = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "ஆர்";
பார்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "த்து";
பார்.நிகழ்காலத்துப்பெயரெச்சம் = (vinay) => vinay + "க்கின்ற";
பார்.எதிர்காலத்துவினயெச்சம் = (vinay) => vinay + "க்க";
பார்.எதிர்காலத்துவினய்முற்று = (vinay) => vinay + "ப்பார்";
பார்.தொழிற்பெயர் = (vinay) => vinay + "த்தல்";

const உயர் = new Vinayinam("உயர்");
உயர்.valid = function(vinay) {
    const lastCharacter = vinay[vinay.length - 1];
    if (I_letter_i_I_markers.includes(lastCharacter)) {
        return true;
    }
    if (u_marker === lastCharacter) {
        return true;
    }
    if (pulli !== lastCharacter) {
        return false;
    }
    if (! ya_ra_zha.includes(vinay[vinay.length - 2])) {
        return false;
    }
    return true;
};
உயர்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "ந்து";

const இயல் = { __proto__: உயர், இனத்துப்பெயர்: "இயல்", };
இயல்.valid = function(vinay) {
    const match = vinay.match(/..$/);
    if (! match) {
        return false;
    }
    return ['ள்','ல்',].includes(match[0]);
};
இயல்.தொழிற்பெயர் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "உதல்";

const இரு = { __proto__: பார், இனத்துப்பெயர்: "இரு", };
இரு.இறந்தகாலத்துவினயெச்சம் = உயர்.இறந்தகாலத்துவினயெச்சம்;

const இடு = new Vinayinam("இடு");
இடு.valid = function(vinay) {
    const match = vinay.match(/..$/);
    if (! match) {
        return false;
    }
    return ['டு','று',].includes(match[0]);
};
இடு.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay.replace(
    RegExp(`(.)${u_marker}$`, "v",),
    `$1${pulli}$1${u_marker}`,
);

const செய் = new Vinayinam("செய்");
செய்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "து";

const தின் =  { __proto__: செய், இனத்துப்பெயர்: "தின்", };
தின்.valid = function(vinay) {
    const match = vinay.match(/..$/);
    if (! match) {
        return false;
    }
    return ['ண்','ன்',].includes(match[0]);
};
தின்.தொழிற்பெயர் = இயல்.தொழிற்பெயர்;

const வா = { __proto__: செய், இனத்துப்பெயர்: "வா", };
வா.vinay = function(vinay) { return lastAShortener(vinay) + "ரு"; };
வா.valid = (vinay) => vinay.endsWith(A_marker);
வா.ஏவல்வினய்முற்று = (vinay) => vinay.replace("ரு","") + "ா";
வா.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay.replace("ரு","") + "ந்து";

const சொல் = { __proto__: இயல், இனத்துப்பெயர்: "சொல்", };
சொல்.இறந்தகாலத்துவினயெச்சம் = வாங்கு.இறந்தகாலத்துவினயெச்சம்;
சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "ந";
சொல்.இறந்தகாலத்துப்பெயரெச்சம் = function(vinay) { return [Vinayinam.prototype.இறந்தகாலத்துப்பெயரெச்சம்.call(this, vinay,), சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(vinay),];
};
சொல்.இறந்தகாலத்துவினய்முற்று = (vinay) => சொல்.சிறப்பிறந்தகாலத்துப்பெயரெச்சம்(vinay) + "ார்";

const காண் = { __proto__: தின், இனத்துப்பெயர்: "காண்", };
காண்.valid = function(vinay) {
    const match = vinay.match(/...$/);
    if (! match) {
        return false;
    }
    return ['ாண்', 'ான்',].includes(match[0]);
};
காண்.இறந்தகாலத்துவினயெச்சம் = (vinay) => lastAShortener(vinay) + "து";

const கடயுயிர் = { __proto__: செய், இனத்துப்பெயர்: "கடயுயிர்", };
கடயுயிர்.எதிர்காலத்துவினயெச்சம் = (vinay) => vinay + "க";

const போ = { __proto__: கடயுயிர், இனத்துப்பெயர்: "போ", };
போ.valid = (vinay) => [A_letter, A_marker, U_marker, O_marker,].includes(vinay[vinay.length - 1]);
போ.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "ய்";
போ.இறந்தகாலத்துப்பெயரெச்சம் = (vinay) => vinay + "ன";

const ஆ = { __proto__: போ, இனத்துப்பெயர்: "ஆ", };
ஆ.சிறப்பிறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "கி";
ஆ.இறந்தகாலத்துவினயெச்சம் = (vinay) => [போ.இறந்தகாலத்துவினயெச்சம்(vinay), ஆ.சிறப்பிறந்தகாலத்துவினயெச்சம்(vinay),];
ஆ.இறந்தகாலத்துப்பெயரெச்சம் = (vinay) => [போ.இறந்தகாலத்துப்பெயரெச்சம்(vinay), ஆ.சிறப்பிறந்தகாலத்துவினயெச்சம்(vinay) + "அ",];
ஆ.இறந்தகாலத்துவினய்முற்று = (vinay) => போ.இறந்தகாலத்துப்பெயரெச்சம்(vinay) + "ார்";

const நோ = { __proto__: கடயுயிர், இனத்துப்பெயர்: "நோ", };
நோ.valid = (vinay) => vinay.endsWith(O_marker);
நோ.இறந்தகாலத்துவினயெச்சம் = (vinay) => terminalOShortener(vinay) + "ந்து";

const சா = { __proto__: கடயுயிர், இனத்துப்பெயர்: "சா", };
சா.valid = (vinay) => vinay.endsWith(A_marker);
சா.இறந்தகாலத்துவினயெச்சம் = (vinay) => lastAShortener(vinay) + "ெத்து";

const TBD = new Proxy(new Vinayinam("TBD"), {
    get(_unused, prop) {
        if (prop === "இனத்துப்பெயர்") {
            return "TBD";
        }
        return () => "TBD";
    },
});

const monosyllabicShortTerminalDoubler = (vinay) => vinay.replace(
    RegExp(`^(${anyOfArray(consonants)}?${anyOfArray(kutTil)}?)(.)${pulli}$`, "v",),
    `$1$2${pulli}$2${pulli}`,
);

const terminalOShortener = (vinay) => vinay.replace(
    RegExp(`${O_marker}$`, "v",),
    `${o_marker}`,
);

const lastAShortener = (vinay) => vinay.replace(
    RegExp(`${A_marker}([^${A_marker}]*)$`, "v",),
    `$1`,
);

export {வாங்கு, பார், உயர், இயல், இரு, இடு, செய், தின், வா, சொல், போ, ஆ, நோ, சா, காண், TBD, };
const vinayinangal = [வாங்கு, பார், உயர், இயல், இரு, இடு, செய், தின், வா, சொல், போ, ஆ, நோ, சா, காண், TBD,];

export const vinayinattuppeyargal = vinayinangal.map((vinayinam,) => vinayinam.இனத்துப்பெயர்,);

export function validVinayinattuppeyargal(vinay,) {
    return vinayinangal.filter((vinayinam,) => vinayinam.valid(vinay,)).map((vinayinam) => vinayinam.இனத்துப்பெயர்,);
}
