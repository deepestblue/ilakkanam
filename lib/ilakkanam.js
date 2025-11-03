import { புணர்ச்சி, } from "./punarcci.js";
import { வினய், } from "./vinay.js";
import { getபிறவினய், } from "./pitavinay.js";

export { வினயினத்துப்பெயர்கள் as verbClasses, validவினயினத்துப்பெயர்கள் as validVerbClasses, } from "./vinayinam.js";

// Helper function to recursively convert children objects to Maps
const objToMap = obj => {
    if (! obj) {
        return null;
    }
    const map = new Map();
    for (const [key, value,] of Object.entries(obj,)) {
        const convertedValue = { ...value, };
        if (value.children) {
            convertedValue.children = objToMap(value.children,);
        }
        map.set(key, convertedValue,);
    }
    return map;
};

const schemaObj = {
    இனத்துப்பெயர்: { label: "இனம்", },
    ஏவல்வினய்முற்று: {
        label: "ஏவல் வினைமுற்று",
        children: {
            ஒருமய்: { label: "ஒருமை", },
            பன்மய்: { label: "பன்மை", },
        },
    },
    போனகாலத்துவினயெச்சம்: { label: "போனகாலத்து வினையெச்சம்", },
    போனகாலத்துப்பெயரெச்சம்: { label: "போனகாலத்துப் பெயரெச்சம்", },
    போனகாலத்துவினய்முற்று: {
        label: "போனகாலத்து வினைமுற்று",
        children: {
            தன்மய்: {
                label: "தன்மை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கை",
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
    எதிர்மறய்வினயெச்சம்: { label: "எதிர்மறை வினையெச்சம்", },
    எதிர்மறய்ப்பெயரெச்சம்: { label: "எதிர்மறைப் பெயரெச்சம்", },
    எதிர்மறய்வினய்முற்று: {
        label: "எதிர்மறை வினைமுற்று",
        children: {
            தன்மய்: {
                label: "தன்மை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கை",
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
    வருங்காலத்துவினயெச்சம்: { label: "வருங்காலத்து வினையெச்சம்", },
    வருங்காலத்துப்பெயரெச்சம்: { label: "வருங்காலத்துப் பெயரெச்சம்", },
    வருங்காலத்துவினய்முற்று: {
        label: "வருங்காலத்து வினைமுற்று",
        children: {
            தன்மய்: {
                label: "தன்மை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கை",
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
    வியங்கோள்வினய்முற்று: { label: "வியங்கோள் வினைமுற்று", },
    தொழிற்பெயர்: { label: "தொழிற்பெயர்", },
    நிகழ்காலத்துப்பெயரெச்சம்: { label: "நிகழ்காலத்துப் பெயரெச்சம்", },
    நிகழ்காலத்துவினய்முற்று: {
        label: "நிகழ்காலத்து வினைமுற்று",
        children: {
            தன்மய்: {
                label: "தன்மை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            முன்னிலய்: {
                label: "முன்னிலை",
                children: {
                    ஒருமய்: { label: "ஒருமை", },
                    பன்மய்: { label: "பன்மை", },
                },
            },
            படர்க்கய்: {
                label: "படர்க்கை",
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
    label: "வினை வடிவங்கள்",
    children: objToMap(schemaObj,),
};

export const causativeFormsKey = "பிறவினய்வடிவு";

export const getForms = (வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,) => {
    const புணர்ச்சிவிதிகள் = புணர்ச்சி(புத்தெழுத்துமுறயோ,);

    const treeDFS = (node, callback, pathParams = [],) => {
        if (! node.children?.size) {
            callback(node, pathParams,);
            return;
        }

        node.children.forEach((childNode, childKey,) => {
            treeDFS(childNode, callback, [...pathParams, childKey,],);
        },);
    };

    const தன்வினய் = new வினய்(வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,);

    const allForms = structuredClone(schema,);
    treeDFS(allForms, (node, pathParams,) => {
        const [methodName, ...rest] = pathParams;
        if (methodName === "இனத்துப்பெயர்") {
            node.வடிவு = தன்வினய்.வினயினம்[methodName];
            return;
        }
        node.வடிவு = புணர்ச்சிவிதிகள்.reduce(
            (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
            தன்வினய்[methodName](...rest,),
        );
    },);

    allForms.children.set("பிறவினய்வடிவு", (பிறவினய் => {
        if (! பிறவினய்) {
            return null;
        }

        const causativeForms = structuredClone(schema,);
        treeDFS(causativeForms, (node, pathParams,) => {
            const [methodName, ...rest] = pathParams;
            if (methodName === "இனத்துப்பெயர்") {
                node.வடிவு = பிறவினய்.வினயினம்[methodName];
                return;
            }
            node.வடிவு = புணர்ச்சிவிதிகள்.reduce(
                (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                பிறவினய்[methodName](...rest,),
            );
        },);

        return causativeForms;
    })(getபிறவினய்(தன்வினய்,),),);

    return allForms;
};
