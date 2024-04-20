import { schema, getForms, } from "./lib/main.js";
import { வினயினத்துப்பெயர்கள், validவினயினத்துப்பெயர்கள், } from "./lib/vinayinam.js";

const serialise = (map, key,) => {
    // TODO: Once https://github.com/tc39/proposal-throw-expressions is in, replace with ?? throw
    const val = map.get(key,);
    if (val === undefined) {
        throw new Error(`No key ${key}`,);
    }
    if (! (val instanceof Set)) {
        return val;
    }

    return [...val,].join(", ");
};

function refreshContent() {
    const verbElement = document.getElementById('verb',);
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

    let formsTable = document.getElementById("forms",);
    formsTable.deleteTHead();
    Array.from(formsTable.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

    let headRow = formsTable.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("இனம்",),);
    Array.from(schema.keys(),).forEach(schemaItem => {
        headRow.insertCell().appendChild(document.createTextNode(schema.get(schemaItem,),),);
    });

    let verbClass;
    if (document.getElementById("verbClass",).selectedIndex !== 0) {
        verbClass = document.getElementById("verbClass",).value;
    }

    try {
        if (! verb.length) {
            // For the initial pageload case, …
            return;
        }

        const forms = getForms(verb, verbClass,);

        let bodyRow = formsTable.createTBody().insertRow();
        bodyRow.insertCell().appendChild(document.createTextNode(
            serialise(forms, "இனம்",),
        ),);
        Array.from(schema.keys(),).forEach(schemaItem => {
            bodyRow.insertCell().appendChild(document.createTextNode(
                serialise(forms, schemaItem,),
            ),);
        },);
    } catch (e) {
        window.alert(e.message);
    }
}

(select => வினயினத்துப்பெயர்கள்.sort().forEach(வினயினத்துப்பெயர் => {
    const option = document.createElement("option");
    option.text = வினயினத்துப்பெயர்;
    select.appendChild(option);
},))(document.getElementById("verbClass",),);

document.getElementById("submit",).addEventListener("click", refreshContent,);
document.getElementById("verb",).addEventListener("focus", () => {
    Array.from(document.getElementById("verbClass").options).forEach((option) => {
        option.disabled = false;
    });
});
document.getElementById("verb",).addEventListener("blur", (event) => {
    if (! event.target.checkValidity()) {
        return;
    }

    const verbClassSelect = document.getElementById("verbClass",);
    const validVerbClassNames = validவினயினத்துப்பெயர்கள்(event.target.value);
    Array.from(verbClassSelect.options).forEach((option) => {
        if (option.index === 0) {
            // தேர்ந்த வினயது இனத்து label
            return;
        }
        if (! validVerbClassNames.includes(option.value)) {
            option.disabled = true;
        }
    });

    if (verbClassSelect.options[verbClassSelect.selectedIndex].disabled) {
        verbClassSelect.selectedIndex = 0;
    }
});

document.getElementById("submit",).click();
