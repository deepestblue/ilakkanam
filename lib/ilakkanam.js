import { புணர்ச்சிவிதிகள், அய்காரத்துப்புதுவிதிகள், monosyllabicShortTerminalDoubler, } from "./punarcci.js";
import { வினய் as வினய்Class, எழுத்துக்கூட்டுமுறய்கள், } from "./vinay.js";
import { வினயினம்Byபெயர், } from "./vinayinam.js";
import { getபிறவினய், } from "./pitavinay.js";
import { objToMap, treeTraverseAllLeaves, } from "./utils.js";
export { வினய்கள்StartingWith as verbsStartingWith, இனத்தில்வினய்கள் as verbsInClass, எழுத்துக்கூட்டுமுறய்கள் as spellingStyle, } from "./vinay.js";
export { அய்காரத்துப்புதுவிதிகள் as conversionsToNewSpelling, அய்காரத்துப்பழயவிதிகள் as conversionsToOldSpelling, } from "./punarcci.js";

const schemaObj = {
    இனத்துப்பெயர்: { label: "இனம்", },
    வினய்: { label: "வினய்", },
    ஏவல்வினய்முற்று: {
        label: "ஏவல் வினய்முற்று", // Imperative
        children: {
            ஒருமய்: { label: "ஒருமய்", },
            பன்மய்: { label: "பன்மய்", },
        },
    },
    எதிர்மறயேவல்வினய்முற்று: {
        label: "எதிர்மறயேவல் வினய்முற்று", // Prohibitive
        children: {
            ஒருமய்: { label: "ஒருமய்", },
            பன்மய்: { label: "பன்மய்", },
        },
    },
    வியங்கோள்வினய்முற்று: { label: "வியங்கோள் வினய்முற்று", }, // Optative
    தொழிற்பெயர்: { label: "தொழிற்பெயர்", }, // Verbal noun
    எதிர்மறய்த்தொழிற்பெயர்: { label: "எதிர்மறய்த் தொழிற்பெயர்", }, // Negative verbal noun
    எதிர்மறய்வினயெச்சம்: { label: "எதிர்மறய் வினயெச்சம்", }, // Negative adverbial participle
    எதிர்மறய்ப்பெயரெச்சம்: { label: "எதிர்மறய்ப் பெயரெச்சம்", }, // Negative relative participle
    எதிர்மறய்ப்பெயரெச்சத்துப்பெயர்: {
        label: "எதிர்மறய்ப் பெயரெச்சத்துப் பெயர்", // Negative relative participial noun
        children: {
            ஆண்பால்: { label: "ஆண்பால்", },
            பெண்பால்: { label: "பெண்பால்", },
            பலர்பால்: { label: "பலர்பால்", },
            ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
            பலவின்பால்: { label: "பலவின்பால்", },
        },
    },
    எதிர்மறய்வினய்முற்று: {
        label: "எதிர்மறய் வினய்முற்று", // Negative finite
        children: {
            தன்மய்: {
                label: "தன்மய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கய்",
                children: {
                    ஆண்பால்: { label: "ஆண்பால்", },
                    பெண்பால்: { label: "பெண்பால்", },
                    பலர்பால்: { label: "பலர்பால்", },
                    ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
                    பலவின்பால்: { label: "பலவின்பால்", },
                },
            },
        },
    },
    வருங்காலத்துவினயெச்சம்: { label: "வருங்காலத்து வினயெச்சம்", }, // Non‐past adverbial participle
    வருங்காலத்துநிபந்தனய்வினயெச்சம்: { label: "வருங்காலத்து நிபந்தனய் வினயெச்சம்", }, // Non‐past Conditional
    வருங்காலத்துப்பெயரெச்சம்: { label: "வருங்காலத்துப் பெயரெச்சம்", }, // Non‐past relative participle
    வருங்காலத்துப்பெயரெச்சத்துப்பெயர்: {
        label: "வருங்காலத்துப் பெயரெச்சத்துப் பெயர்", // Non‐past relative participial noun
        children: {
            ஆண்பால்: { label: "ஆண்பால்", },
            பெண்பால்: { label: "பெண்பால்", },
            பலர்பால்: { label: "பலர்பால்", },
            ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
            பலவின்பால்: { label: "பலவின்பால்", },
        },
    },
    வருங்காலத்துவினய்முற்று: {
        label: "வருங்காலத்து வினய்முற்று", // Future finite
        children: {
            தன்மய்: {
                label: "தன்மய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கய்",
                children: {
                    ஆண்பால்: { label: "ஆண்பால்", },
                    பெண்பால்: { label: "பெண்பால்", },
                    பலர்பால்: { label: "பலர்பால்", },
                    ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
                    பலவின்பால்: { label: "பலவின்பால்", },
                },
            },
        },
    },
    நிகழ்காலத்துப்பெயரெச்சம்: { label: "நிகழ்காலத்துப் பெயரெச்சம்", }, // Present relative participle
    நிகழ்காலத்துப்பெயரெச்சத்துப்பெயர்: {
        label: "நிகழ்காலத்துப் பெயரெச்சத்துப் பெயர்", // Present relative participial noun
        children: {
            ஆண்பால்: { label: "ஆண்பால்", },
            பெண்பால்: { label: "பெண்பால்", },
            பலர்பால்: { label: "பலர்பால்", },
            ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
            பலவின்பால்: { label: "பலவின்பால்", },
        },
    },
    நிகழ்காலத்துவினய்முற்று: {
        label: "நிகழ்காலத்து வினய்முற்று", // Present finite
        children: {
            தன்மய்: {
                label: "தன்மய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கய்",
                children: {
                    ஆண்பால்: { label: "ஆண்பால்", },
                    பெண்பால்: { label: "பெண்பால்", },
                    பலர்பால்: { label: "பலர்பால்", },
                    ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
                    பலவின்பால்: { label: "பலவின்பால்", },
                },
            },
        },
    },
    போனகாலத்துவினயெச்சம்: { label: "போனகாலத்து வினயெச்சம்", }, // Past adverbial participle
    போனகாலத்துநிபந்தனய்வினயெச்சம்: { label: "போனகாலத்து நிபந்தனய் வினயெச்சம்", }, // Past Conditional
    போனகாலத்துப்பெயரெச்சம்: { label: "போனகாலத்துப் பெயரெச்சம்", }, // Past relative participle
    போனகாலத்துப்பெயரெச்சத்துப்பெயர்: {
        label: "போனகாலத்துப் பெயரெச்சத்துப் பெயர்", // Past relative participial noun
        children: {
            ஆண்பால்: { label: "ஆண்பால்", },
            பெண்பால்: { label: "பெண்பால்", },
            பலர்பால்: { label: "பலர்பால்", },
            ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
            பலவின்பால்: { label: "பலவின்பால்", },
        },
    },
    போனகாலத்துவினய்முற்று: {
        label: "போனகாலத்து வினய்முற்று", // Past finite
        children: {
            தன்மய்: {
                label: "தன்மய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலய்",
                children: {
                    ஒருமய்: { label: "ஒருமய்", },
                    பன்மய்: { label: "பன்மய்", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கய்",
                children: {
                    ஆண்பால்: { label: "ஆண்பால்", },
                    பெண்பால்: { label: "பெண்பால்", },
                    பலர்பால்: { label: "பலர்பால்", },
                    ஒன்றன்பால்: { label: "ஒன்றன்பால்", },
                    பலவின்பால்: { label: "பலவின்பால்", },
                },
            },
        },
    },
};

const schema = {
    label: "வினய் வடிவு",
    children: objToMap(schemaObj,),
};

export const causativeFormsKey = "பிறவினய்வடிவு";

export const getForms = (வினய்ப்பெயர், இனத்துப்பெயர், எழுத்துக்கூட்டுமுறய் = எழுத்துக்கூட்டுமுறய்கள்.பழயது,) => {
    const வினய்toவடிவு = வினய் => {
        const வினய்வடிவு = structuredClone(schema,);
        treeTraverseAllLeaves(வினய்வடிவு, (node, pathParams,) => {
            const [first, ...rest] = pathParams;
            if (first === "இனத்துப்பெயர்") {
                node.வடிவு = வினய்[first];
                return;
            }

            if (first === "வினய்") {
                node.வடிவு = வினய்.originalபகுதி;
                return;
            }

            const initialForms = வினய்[first](...rest,);
            node.வடிவு = (எழுத்துக்கூட்டுமுறய் === எழுத்துக்கூட்டுமுறய்கள்.புதியது ? புணர்ச்சிவிதிகள்.concat(அய்காரத்துப்புதுவிதிகள்,) : புணர்ச்சிவிதிகள்).reduce(
                (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                new Set(Array.from(initialForms,).map(monosyllabicShortTerminalDoubler,),),
            );
        },);
        return வினய்வடிவு;
    };

    const தன்வினய் = new வினய்Class(வினய்ப்பெயர், இனத்துப்பெயர் && வினயினம்Byபெயர்(இனத்துப்பெயர்,), எழுத்துக்கூட்டுமுறய்,);
    const allForms = வினய்toவடிவு(தன்வினய்,);
    allForms.children.set(causativeFormsKey, new Set(getபிறவினய்(தன்வினய், எழுத்துக்கூட்டுமுறய்,).map(வினய்toவடிவு,),),);
    return allForms;
};
