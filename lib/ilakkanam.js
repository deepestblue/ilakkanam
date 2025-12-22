import { புணர்ச்சிவிதிகள், அய்காரத்துப்புதுவிதிகள், monosyllabicShortTerminalDoubler, } from "./punarcci.js";
import { வினய், } from "./vinay.js";
import { getபிறவினய், } from "./pitavinay.js";
import { objToMap, treeTraverseAllLeaves, } from "./utils.js";
export { வினயினத்துப்பெயர்கள் as verbClasses, validவினயினத்துப்பெயர்கள் as validVerbClasses, } from "./vinayinam.js";
export { அய்காரத்துப்புதுவிதிகள் as conversionsToNewSpelling, } from "./punarcci.js";

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
    வியங்கோள்வினய்முற்று: { label: "வியங்கோள் வினய்முற்று", }, // Optative
    தொழிற்பெயர்: { label: "தொழிற்பெயர்", }, // Verbal noun
    எதிர்மறயேவல்வினய்முற்று: {
        label: "எதிர்மறயேவல் வினய்முற்று", // Negative imperative
        children: {
            ஒருமய்: { label: "ஒருமய்", },
            பன்மய்: { label: "பன்மய்", },
        },
    },
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
    நிபந்தனய்வினயெச்சம்: { label: "நிபந்தனய் வினயெச்சம்", }, // Conditional
    எதிர்மறய்நிபந்தனய்வினயெச்சம்: { label: "எதிர்மறய் நிபந்தனய் வினயெச்சம்", }, // Negative conditional
};

const schema = {
    label: "வினய் வடிவு",
    children: objToMap(schemaObj,),
};

export const causativeFormsKey = "பிறவினய்வடிவு";

export const getForms = (வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,) => {
    const வினய்toவடிவு = வினய்_ => {
        const வினய்வடிவு = structuredClone(schema,);
        treeTraverseAllLeaves(வினய்வடிவு, (node, pathParams,) => {
            const [first, ...rest] = pathParams;
            if (first === "இனத்துப்பெயர்") {
                node.வடிவு = வினய்_[first];
                return;
            }

            if (first === "வினய்") {
                node.வடிவு = வினய்_.originalபகுதி;
                return;
            }

            const initialForms = வினய்_[first](...rest,);
            node.வடிவு = (புத்தெழுத்துமுறயோ ? புணர்ச்சிவிதிகள்.concat(அய்காரத்துப்புதுவிதிகள்,) : புணர்ச்சிவிதிகள்).reduce(
                (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                new Set(Array.from(initialForms,).map(monosyllabicShortTerminalDoubler,),),
            );
        },);
        return வினய்வடிவு;
    };

    const தன்வினய் = new வினய்(வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,);
    const allForms = வினய்toவடிவு(தன்வினய்,);
    allForms.children.set(causativeFormsKey, new Set(getபிறவினய்(தன்வினய்,).map(e => வினய்toவடிவு(e,),),),);
    return allForms;
};
