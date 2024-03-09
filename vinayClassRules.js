import { pulli, i_ii_markers_ii_letter, u_marker, ya_ra_zha, } from "./ezuttu.js";

export const vinayClassRules = {
    வாங்கு: new Map([
        ["வினய்", (vinay) => {
            if (! vinay.endsWith(u_marker)) {
                throw new Error(`vinay form ${vinay} isn't valid for vinay class.`,);
            }
            return vinay;
        }],
        ["அல் வினய்முற்று", (vinay) => vinay + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (vinay) => vinay + "இனார்"],
        ["நிகழ்காலத்து வினய்முற்று", (vinay) => vinay + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (vinay) => vinay + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (vinay) => vinay + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (vinay) => vinay + "இ"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (vinay) => vinay + "இய"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "உம்"],
        ["தொழிற்பெயர்", (vinay) => vinay + "தல்"],
    ]),
    பார்: new Map([
        ["வினய்", (vinay) => vinay],
        ["அல் வினய்முற்று", (vinay) => vinay + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (vinay) => vinay + "த்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (vinay) => vinay + "க்கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (vinay) => vinay + "ப்பார்"],
        ["எதிர்காலத்து வினயெச்சம்", (vinay) => vinay + "க்க"],
        ["இறந்தகாலத்து வினயெச்சம்", (vinay) => vinay + "த்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (vinay) => vinay + "த்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "க்கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "க்கும்"],
        ["தொழிற்பெயர்", (vinay) => vinay + "த்தல்"],
    ]),
    இரு: new Map([
        ["வினய்", (vinay) => {
            if (vinay.endsWith(pulli)) {
                throw new Error(`vinay form ${vinay} isn't valid for vinay class.`,);
            }
            return vinay;
        }],
        ["அல் வினய்முற்று", (vinay) => vinay + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (vinay) => vinay + "ந்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (vinay) => vinay + "க்கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (vinay) => vinay + "ப்பார்"],
        ["எதிர்காலத்து வினயெச்சம்", (vinay) => vinay + "க்க"],
        ["இறந்தகாலத்து வினயெச்சம்", (vinay) => vinay + "ந்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (vinay) => vinay + "ந்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "க்கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "க்கும்"],
        ["தொழிற்பெயர்", (vinay) => vinay + "த்தல்"],
    ]),
    உயர்: new Map([
        ["வினய்", (vinay) => {
            (function() {
                const lastCharacter = vinay[vinay.length - 1];
                if (i_ii_markers_ii_letter.includes(lastCharacter)) {
                    return;
                }
                if (u_marker === lastCharacter) {
                    return;
                }
                if (pulli !== lastCharacter) {
                    throw new Error(`vinay form ${vinay} isn't valid for vinay class.`,);
                }
                if (! ya_ra_zha.includes(vinay[vinay.length - 2])) {
                    throw new Error(`vinay form ${vinay} isn't valid for vinay class.`,);
                }
            })();
            return vinay;
        }],
        ["அல் வினய்முற்று", (vinay) => vinay + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (vinay) => vinay + "ந்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (vinay) => vinay + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (vinay) => vinay + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (vinay) => vinay + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (vinay) => vinay + "ந்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (vinay) => vinay + "ந்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "உம்"],
        ["தொழிற்பெயர்", (vinay) => vinay + "தல்"],
    ]),
    இடு: new Map([
        ["வினய்", (vinay) => {
            if (! ['டு','று',].includes(vinay.match(/..$/)[0])) {
                throw new Error(`vinay form ${vinay} isn't valid for vinay class.`,);
            }
            return vinay;
        }],
        ["அல் வினய்முற்று", (vinay) => vinay + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (vinay) => terminalDoubler(vinay) + "ஆர்"],
        ["நிகழ்காலத்து வினய்முற்று", (vinay) => vinay + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (vinay) => vinay + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (vinay) => vinay + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (vinay) => terminalDoubler(vinay) + "உ"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (vinay) => terminalDoubler(vinay) + "அ"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (vinay) => vinay + "உம்"],
        ["தொழிற்பெயர்", (vinay) => vinay + "தல்"],
    ]),
};

const terminalDoubler = (vinay) => vinay.replace(
    RegExp(`(.)${u_marker}$`),
    `$1${pulli}$1${u_marker}`,
);
