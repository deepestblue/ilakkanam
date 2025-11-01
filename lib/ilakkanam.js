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
            ஒருமய்: { label: "ஒருமய்", },
            பன்மய்: { label: "பன்மய்", },
        },
    },
    போனகாலத்துவினயெச்சம்: { label: "போனகாலத்து வினையெச்சம்", },
    போனகாலத்துப்பெயரெச்சம்: { label: "போனகாலத்துப் பெயரெச்சம்", },
    போனகாலத்துவினய்முற்று: {
        label: "போனகாலத்து வினைமுற்று",
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
    எதிர்மறய்வினயெச்சம்: { label: "எதிர்மறை வினையெச்சம்", },
    எதிர்மறய்ப்பெயரெச்சம்: { label: "எதிர்மறைப் பெயரெச்சம்", },
    எதிர்மறய்வினய்முற்று: {
        label: "எதிர்மறை வினைமுற்று",
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
    வருங்காலத்துவினயெச்சம்: { label: "வருங்காலத்து வினையெச்சம்", },
    வருங்காலத்துப்பெயரெச்சம்: { label: "வருங்காலத்துப் பெயரெச்சம்", },
    வருங்காலத்துவினய்முற்று: {
        label: "வருங்காலத்து வினைமுற்று",
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
        label: "நிகழ்காலத்து வினைமுற்று",
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
    label: "வினை வடிவங்கள்",
    children: objToMap(schemaObj,),
};

export const causativeFormsKey = "பிறவினய்வடிவு";

export const getForms = (வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,) => {
    const தன்வினய் = new வினய்(வினய்ப்பெயர், இனத்துப்பெயர், புத்தெழுத்துமுறயோ,);

    const புணர்ச்சிவிதிகள் = புணர்ச்சி(புத்தெழுத்துமுறயோ,);

    /*
    Generate calls like

    தன்வினய்.தொழிற்பெயர்()
    Set(1) {'செய்தல்'}

    and
    தன்வினய்.எதிர்மறய்வினய்முற்று("தன்மய்", "ஒருமய்")
    Set(1) {'செய்ய்ஏன்'}

    let rawForms, processedForms, label;

    label = "ஏவல்வினய்முற்று";
    rawForms = தன்வினய்[label]();
    processedForms = புணர்ச்சிவிதிகள்.reduce(
        (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
        rawForms,
    );
    allForms.set(label, processedForms,);

    label = "தொழிற்பெயர்";
    rawForms = தன்வினய்[label]();
    processedForms = புணர்ச்சிவிதிகள்.reduce(
        (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
        rawForms,
    );
    allForms.set(label, processedForms,);

    */

    // Recursive function to process schema depth-first
    const treeDFS = (node, pathParams = [],) => {
        if (! node.children || node.children.size === 0) {
            const [methodName, ...rest] = pathParams;
            const rawForms = தன்வினய்[methodName](...rest,);
            const processedForms = புணர்ச்சிவிதிகள்.reduce(
                (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                rawForms,
            );
            node.forms = processedForms;
            return;
        }

        for (const [childKey, childNode,] of node.children) {
            const newPathParams = [...pathParams, childKey,];
            treeDFS(childNode, newPathParams,);
        }
    };

    const allForms = structuredClone(schema,);
    treeDFS(allForms,);

    /*
    // Handle பிறவினய்வடிவு (causative forms)
    const பிறவினய்வடிவு = (தன்வினய்_ => {
        const பிறவினய் = getபிறவினய்(தன்வினய்_,);

        if (! பிறவினய்) {
            return null;
        }

        if (! Array.isArray(பிறவினய்,)) {
            // Recursively process causative forms
            const causativeForms = new Map([["இனம்", பிறவினய்.வினயினம்.இனத்துப்பெயர்,],],);

            for (const [schemaKey, schemaItem,] of schema.children) {
                const combinations = flattenSchema(schemaItem,);

                combinations.forEach(([label, person, number,],) => {
                    const methodName = schemaKey;
                    const rawForms = பிறவினய்[methodName](person, number,);
                    const processedForms = புணர்ச்சிவிதிகள்.reduce(
                        (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                        rawForms,
                    );
                    causativeForms.set(label, processedForms,);
                },);
            }

            return causativeForms;
        }

        return பிறவினய்.map(e => {
            const causativeForms = new Map([["இனம்", e.வினயினம்.இனத்துப்பெயர்,],],);

            for (const [schemaKey, schemaItem,] of schema.children) {
                const combinations = flattenSchema(schemaItem,);

                combinations.forEach(([label, person, number,],) => {
                    const methodName = schemaKey;
                    const rawForms = e[methodName](person, number,);
                    const processedForms = புணர்ச்சிவிதிகள்.reduce(
                        (intermediateForms, புணர்ச்சிவிதி,) => new Set(Array.from(intermediateForms,).map(புணர்ச்சிவிதி,),),
                        rawForms,
                    );
                    causativeForms.set(label, processedForms,);
                },);
            }

            return causativeForms;
        },);
    })(தன்வினய்,);

    if (பிறவினய்வடிவு) {
        allForms.set("பிறவினய்வடிவு", பிறவினய்வடிவு,);
    }*/

    return allForms;
};
