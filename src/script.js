import { schema, verbClasses, validVerbClasses, getForms, causativeFormsKey, } from "../lib/ilakkanam.js";

const serialise = (map, key,) => {
    const val = map.get(key,);
    if (val === null) {
        throw new Error(`No key ${key}`,);
    }
    if (! (val instanceof Set)) {
        return val;
    }

    return [...val,].join(", ",);
};

const fillTable = (table, material,) => {
    table.deleteTHead();
    Array.from(table.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

    const headRow = table.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("இனம்",),);
    Array.from(schema.keys(),).forEach(schemaItem => {
        headRow.insertCell().appendChild(document.createTextNode(schema.get(schemaItem,),),);
    },);

    const fillRow = material_ => {
        const bodyRow = table.createTBody().insertRow();
        bodyRow.insertCell().appendChild(document.createTextNode(
            serialise(material_, "இனம்",),
        ),);
        Array.from(schema.keys(),).forEach(schemaItem => {
            bodyRow.insertCell().appendChild(document.createTextNode(
                serialise(material_, schemaItem,),
            ),);
        },);
    };

    if (! Array.isArray(material,)) {
        fillRow(material,);
        return;
    }

    material.map(e => fillRow(e,),);
};

const refreshContent = () => {
    const verbElement = document.getElementById("verb",);
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

    const formsTable = document.getElementById("forms",);
    formsTable.style.display = "none";

    const causativeFormsTable = document.getElementById("causativeForms",);
    causativeFormsTable.style.display = "none";

    const errorElement = document.getElementById("error",);
    errorElement.style.display = "none";

    if (! verb.length) {
        // For the initial pageload case, …
        return;
    }

    const isModernSpelling = document.getElementById("spelling",).value === "modn";

    const verbClass = (document.getElementById("verbClass",).selectedIndex === 0) ? null : document.getElementById("verbClass",).value;

    // eslint-disable-next-line init-declarations
    let forms;
    try {
        forms = getForms(verb, verbClass, isModernSpelling,);
    } catch (e) {
        errorElement.textContent = e.message;
        errorElement.style.display = "block";
        return;
    }

    try {
        fillTable(formsTable, forms,);
        formsTable.style.display = "table";

        const causativeForms = forms.get(causativeFormsKey,);
        if (! causativeForms) {
            return;
        }

        fillTable(causativeFormsTable, causativeForms,);
        causativeFormsTable.style.display = "table";
    } catch (e) {
        window.alert(e.message,);
    }
};

(select => verbClasses.sort().forEach(வினயினத்துப்பெயர் => {
    const option = document.createElement("option",);
    option.text = வினயினத்துப்பெயர்;
    select.appendChild(option,);
},))(document.getElementById("verbClass",),);

const verbElement = document.getElementById("verb",);
const button = document.getElementById("submit",);

button.addEventListener("click", refreshContent,);

verbElement.addEventListener("focus", () => {
    Array.from(document.getElementById("verbClass",).options,).forEach(option => {
        option.disabled = false;
    },);
},);

verbElement.addEventListener("blur", blurEvent => {
    if (! blurEvent.target.checkValidity()) {
        return;
    }

    const verbClassSelect = document.getElementById("verbClass",);
    const validVerbClassNames = validVerbClasses(blurEvent.target.value,);
    Array.from(verbClassSelect.options,).forEach(option => {
        if (option.index === 0) {
            // தேர்ந்த வினயது இனத்து label
            return;
        }
        if (! validVerbClassNames.includes(option.value,)) {
            option.disabled = true;
        }
    },);

    if (verbClassSelect.options[verbClassSelect.selectedIndex].disabled) {
        verbClassSelect.selectedIndex = 0;
    }
},);

verbElement.addEventListener("keydown", e => {
    if (e.key !== "Enter") {
        return;
    }
    e.preventDefault();
    button.click();
},);

button.click();
