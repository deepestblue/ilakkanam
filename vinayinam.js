import { pulli, I_letter_i_I_markers, u_marker, ya_ra_zha, kutTil, consonants, } from "./ezuttu.js";
import { anyOfArray, } from "./utils.js";

class Vinayinam {
    constructor(inattuppeyar) {
        this.inattuppeyar = inattuppeyar;
    }
}

const vinayinamPrototype = {
    வினய்(vinay) {
        return vinay;
    },
    அல்வினய்முற்று(vinay) {
        return monosyllabicShortTerminalDoubler(vinay) + "ஆர்";
    },
    இறந்தகாலத்துவினயெச்சம்(_unused) {
        throw new Error("Abstract method!");
    },
    இறந்தகாலத்துப்பெயரெச்சம்(vinay) {
        return this.இறந்தகாலத்துவினயெச்சம்(vinay) + "அ";
    },
    இறந்தகாலத்துவினய்முற்று(vinay) {
        return this.இறந்தகாலத்துப்பெயரெச்சம்(vinay) + "ார்";
    },
    நிகழ்காலத்துப்பெயரெச்சம்(vinay) {
        return vinay + "கின்ற";
    },
    நிகழ்காலத்துவினய்முற்று(vinay) {
        return this.நிகழ்காலத்துப்பெயரெச்சம்(vinay) + "ார்";
    },
    எதிர்காலத்துவினயெச்சம்(vinay) {
        return monosyllabicShortTerminalDoubler(vinay) + "அ";
    },
    எதிர்காலத்துப்பெயரெச்சம்(vinay) {
        return this.எதிர்காலத்துவினயெச்சம்(vinay) + "ும்";
    },
    எதிர்காலத்துவினய்முற்று(vinay) {
        return vinay + "வார்";
    },
    தொழிற்பெயர்(vinay) {
        return vinay + "தல்";
    },
    invalid(vinay) {
        throw new Error(`vinay ${vinay} isn't valid for vinayinam ${this.inattuppeyar}.`,);
    }
};

Object.assign(Vinayinam.prototype, vinayinamPrototype);

// TODO: use delegation more to other objects

const வாங்கு = new Vinayinam("வாங்கு");
வாங்கு.வினய் = function(vinay) {
    if (! vinay.endsWith(u_marker)) {
        this.invalid(vinay);
    }
    return vinay;
};
வாங்கு.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "இ";
வாங்கு.இறந்தகாலத்துவினய்முற்று = (vinay) => vinay + "இனார்";

const பார் = new Vinayinam("பார்");
பார்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "த்து";
பார்.நிகழ்காலத்துப்பெயரெச்சம் = (vinay) => vinay + "க்கின்ற";
பார்.எதிர்காலத்துவினயெச்சம் = (vinay) => vinay + "க்க";
பார்.எதிர்காலத்துவினய்முற்று = (vinay) => vinay + "ப்பார்";
பார்.தொழிற்பெயர் = (vinay) => vinay + "த்தல்";

const உயர் = new Vinayinam("உயர்");
உயர்.வினய் = function(vinay) {
    (function() {
        const lastCharacter = vinay[vinay.length - 1];
        if (I_letter_i_I_markers.includes(lastCharacter)) {
            return;
        }
        if (u_marker === lastCharacter) {
            return;
        }
        if (pulli !== lastCharacter) {
            this.invalid(vinay);
        }
        if (! ya_ra_zha.includes(vinay[vinay.length - 2])) {
            this.invalid(vinay);
        }
    })();
    return vinay;
};
உயர்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "ந்து";

const இயல் = new Vinayinam("இயல்");
இயல்.வினய் = function(vinay) {
    if (! ['ள்','ல்',].includes(vinay.match(/..$/)[0])) {
        this.invalid(vinay);
    }
    return vinay;
};
இயல்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "ந்து";
இயல்.தொழிற்பெயர் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "உதல்";

const இரு = new Vinayinam("இரு");
இரு.வினய் = function(vinay) {
    if (vinay.endsWith(pulli)) {
        this.invalid(vinay);
    }
    return vinay;
};
இரு.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "ந்து";
இரு.நிகழ்காலத்துப்பெயரெச்சம் = (vinay) => vinay + "க்கின்ற";
இரு.எதிர்காலத்துவினயெச்சம் = (vinay) => vinay + "க்க";
இரு.எதிர்காலத்துவினய்முற்று = (vinay) => vinay + "ப்பார்";
இரு.தொழிற்பெயர் = (vinay) => vinay + "த்தல்";

const இடு = new Vinayinam("இடு");
இடு.வினய் = function(vinay) {
    if (! ['டு','று',].includes(vinay.match(/..$/)[0])) {
        this.invalid(vinay);
    }
    return vinay;
};
இடு.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay.replace(
    RegExp(`(.)${u_marker}$`, "v",),
    `$1${pulli}$1${u_marker}`,
);

const செய் = new Vinayinam("செய்");
செய்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "து";

const தின் = new Vinayinam("தின்")
தின்.வினய் = function(vinay) {
    if (! ['ண்','ன்',].includes(vinay.match(/..$/)[0])) {
        this.invalid(vinay);
    }
    return vinay;
}
தின்.இறந்தகாலத்துவினயெச்சம் = (vinay) => vinay + "து";
தின்.எதிர்காலத்துவினய்முற்று = (vinay) => vinay + "பார்";
தின்.தொழிற்பெயர் = (vinay) => monosyllabicShortTerminalDoubler(vinay) + "உதல்";

const TBD = new Proxy(new Vinayinam("TBD"), {
    get(_unused, prop) {
        if (prop === "inattuppeyar") {
            return "TBD";
        }
        return () => "TBD";
    },
});

const monosyllabicShortTerminalDoubler = (vinay) => vinay.replace(
    RegExp(`^(${anyOfArray(consonants)}?${anyOfArray(kutTil)}?)(.)${pulli}$`, "v",),
    `$1$2${pulli}$2${pulli}`,
);

export {வாங்கு, பார், உயர், இயல், இரு, இடு, செய், தின், TBD, };
