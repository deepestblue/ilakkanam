import { pulli, i_ii_markers_ii_letter, u_marker, ya_ra_zha, } from "./ezuttu.js";

export const vinayClassRules = {
    வாங்கு: new Map([
        ["வினய்", (verb) => {
            if (! verb.endsWith(u_marker)) {
                throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
            }
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "இனார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "இ"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "இய"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "உம்"],
        ["தொழிற்பெயர்", (verb) => verb + "தல்"],
    ]),
    பார்: new Map([
        ["வினய்", (verb) => verb],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "த்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "க்கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "ப்பார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "க்க"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "த்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "த்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கும்"],
        ["தொழிற்பெயர்", (verb) => verb + "த்தல்"],
    ]),
    இரு: new Map([
        ["வினய்", (verb) => {
            if (verb.endsWith(pulli)) {
                throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
            }
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "ந்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "க்கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "ப்பார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "க்க"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "ந்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "ந்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "க்கும்"],
        ["தொழிற்பெயர்", (verb) => verb + "த்தல்"],
    ]),
    உயர்: new Map([
        ["வினய்", (verb) => {
            (function() {
                const lastCharacter = verb[verb.length - 1];
                if (i_ii_markers_ii_letter.includes(lastCharacter)) {
                    return;
                }
                if (u_marker === lastCharacter) {
                    return;
                }
                if (pulli !== lastCharacter) {
                    throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
                }
                if (! ya_ra_zha.includes(verb[verb.length - 2])) {
                    throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
                }
            })();
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => verb + "ந்தார்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => verb + "ந்து"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => verb + "ந்த"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "உம்"],
        ["தொழிற்பெயர்", (verb) => verb + "தல்"],
    ]),
    இடு: new Map([
        ["வினய்", (verb) => {
            if (! ['டு','று',].includes(verb.match(/..$/)[0])) {
                throw new Error(`Verb form ${verb} isn't valid for verb class.`,);
            }
            return verb;
        }],
        ["அல் வினய்முற்று", (verb) => verb + "ஆர்"],
        ["இறந்தகாலத்து வினய்முற்று", (verb) => terminalDoubler(verb) + "ஆர்"],
        ["நிகழ்காலத்து வினய்முற்று", (verb) => verb + "கின்றார்"],
        ["எதிர்காலத்து வினய்முற்று", (verb) => verb + "வார்"],
        ["எதிர்காலத்து வினயெச்சம்", (verb) => verb + "அ"],
        ["இறந்தகாலத்து வினயெச்சம்", (verb) => terminalDoubler(verb) + "உ"],
        ["இறந்தகாலத்துப் பெயரெச்சம்", (verb) => terminalDoubler(verb) + "அ"],
        ["நிகழ்காலத்துப் பெயரெச்சம்", (verb) => verb + "கின்ற"],
        ["எதிர்காலத்துப் பெயரெச்சம்", (verb) => verb + "உம்"],
        ["தொழிற்பெயர்", (verb) => verb + "தல்"],
    ]),
};

const terminalDoubler = (verb) => verb.replace(
    RegExp(`(.)${u_marker}$`),
    `$1${pulli}$1${u_marker}`,
);
