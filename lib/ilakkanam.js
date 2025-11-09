import { புணர்ச்சி, } from "./punarcci.js";
import { வினய், } from "./vinay.js";
import { getபிறவினய், } from "./pitavinay.js";
import { objToMap, } from "./utils.js";
export { வினயினத்துப்பெயர்கள் as verbClasses, validவினயினத்துப்பெயர்கள் as validVerbClasses, } from "./vinayinam.js";

const schemaObj = {
    இனத்துப்பெயர்: { label: "இனம்", },
    ஏவல்வினய்முற்று: {
        label: "ஏவல் வினய்முற்று",
        children: {
            ஒருமய்: { label: "ஒருமய்", },
            பன்மய்: { label: "பன்மய்", },
        },
    },
    போனகாலத்துவினயெச்சம்: { label: "போனகாலத்து வினயெச்சம்", },
    போனகாலத்துப்பெயரெச்சம்: { label: "போனகாலத்துப் பெயரெச்சம்", },
    போனகாலத்துவினய்முற்று: {
        label: "போனகாலத்து வினய்முற்று",
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
    எதிர்மறய்வினயெச்சம்: { label: "எதிர்மறய் வினயெச்சம்", },
    எதிர்மறய்ப்பெயரெச்சம்: { label: "எதிர்மறய்ப் பெயரெச்சம்", },
    எதிர்மறய்வினய்முற்று: {
        label: "எதிர்மறய் வினய்முற்று",
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
    வருங்காலத்துவினயெச்சம்: { label: "வருங்காலத்து வினயெச்சம்", },
    வருங்காலத்துப்பெயரெச்சம்: { label: "வருங்காலத்துப் பெயரெச்சம்", },
    வருங்காலத்துவினய்முற்று: {
        label: "வருங்காலத்து வினய்முற்று",
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
    வியங்கோள்வினய்முற்று: { label: "வியங்கோள் வினய்முற்று", },
    தொழிற்பெயர்: { label: "தொழிற்பெயர்", },
    நிகழ்காலத்துப்பெயரெச்சம்: { label: "நிகழ்காலத்துப் பெயரெச்சம்", },
    நிகழ்காலத்துவினய்முற்று: {
        label: "நிகழ்காலத்து வினய்முற்று",
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

export const schema = {
    label: "வினய் வடிவங்கள்",
    children: objToMap(schemaObj,),
};

export const causativeFormsKey = "பிறவினய்வடிவு";

export const getForms = (வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,) => {
    const treeDFS = (node, callback, pathParams = [],) => {
        if (! node.children?.size) {
            callback(node, pathParams,);
            return;
        }

        node.children.forEach((childNode, childKey,) => {
            treeDFS(childNode, callback, [...pathParams, childKey,],);
        },);
    };

    const வினய்toவடிவு = வினய்_ => {
        const வினய்வடிவு = structuredClone(schema,);
        treeDFS(வினய்வடிவு, (node, pathParams,) => {
            const புணர்ச்சிவிதிகள் = புணர்ச்சி(புத்தெழுத்துமுறயோ,);
            const [methodName, ...rest] = pathParams;
            if (methodName === "இனத்துப்பெயர்") {
                node.வடிவு = வினய்_.வினயினம்[methodName];
                return;
            }
            node.வடிவு = புணர்ச்சிவிதிகள்.reduce(
                (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                வினய்_[methodName](...rest,),
            );
        },);
        return வினய்வடிவு;
    };

    const தன்வினய் = new வினய்(வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,);
    const allForms = வினய்toவடிவு(தன்வினய்,);
    allForms.children.set("பிறவினய்வடிவு", new Set(getபிறவினய்(தன்வினய்,).map(e => வினய்toவடிவு(e,),),),);
    return allForms;
};
