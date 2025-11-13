import { verbClasses, validVerbClasses, getForms, causativeFormsKey, } from "../lib/ilakkanam.js";

const fillTable = (table, material,) => {
    const getText = form => {
        if (! (form instanceof Set)) {
            return form;
        };
        return Array.from(form,).join(", ",);
    };

    const headRow = table.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("எச்சமோ முற்றோ",),);
    headRow.insertCell().appendChild(document.createTextNode("இடம்",),);
    headRow.insertCell().appendChild(document.createTextNode("எண்",),);
    headRow.insertCell().appendChild(document.createTextNode("வடிவு",),);

    const tbody = table.createTBody();
    const oneVariant = key => {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.appendChild(document.createTextNode(material.children.get(key,).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).வடிவு,),),);
    };
    const twoVariants = key => {
        let row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 2;
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(material.children.get(key,).label,),);
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("ஒருமய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("ஒருமய்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("பன்மய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("பன்மய்",).வடிவு,),),);
    };
    const nineVariants = key => {
        let row = tbody.insertRow();
        let cell = row.insertCell();
        cell.rowSpan = 9;
        cell.appendChild(document.createTextNode(material.children.get(key,).label,),);
        cell = row.insertCell();
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(material.children.get(key,).children.get("தன்மய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("தன்மய்",).children.get("ஒருமய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("தன்மய்",).children.get("ஒருமய்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("தன்மய்",).children.get("பன்மய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("தன்மய்",).children.get("பன்மய்",).வடிவு,),),);
        row = tbody.insertRow();
        cell = row.insertCell();
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(material.children.get(key,).children.get("முன்னிலய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("முன்னிலய்",).children.get("ஒருமய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("முன்னிலய்",).children.get("ஒருமய்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("முன்னிலய்",).children.get("பன்மய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("முன்னிலய்",).children.get("பன்மய்",).வடிவு,),),);
        row = tbody.insertRow();
        cell = row.insertCell();
        cell.rowSpan = 5;
        cell.appendChild(document.createTextNode(material.children.get(key,).children.get("படர்க்கய்",).label,),);
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("படர்க்கய்",).children.get("ஆண்பால்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("படர்க்கய்",).children.get("ஆண்பால்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("படர்க்கய்",).children.get("பெண்பால்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("படர்க்கய்",).children.get("பெண்பால்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("படர்க்கய்",).children.get("பலர்பால்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("படர்க்கய்",).children.get("பலர்பால்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("படர்க்கய்",).children.get("ஒன்றன்பால்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("படர்க்கய்",).children.get("ஒன்றன்பால்",).வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(material.children.get(key,).children.get("படர்க்கய்",).children.get("பலவின்பால்",).label,),);
        row.insertCell().appendChild(document.createTextNode(getText(material.children.get(key,).children.get("படர்க்கய்",).children.get("பலவின்பால்",).வடிவு,),),);
    };

    oneVariant("இனத்துப்பெயர்",);
    twoVariants("ஏவல்வினய்முற்று",);
    oneVariant("போனகாலத்துவினயெச்சம்",);
    oneVariant("போனகாலத்துப்பெயரெச்சம்",);
    nineVariants("போனகாலத்துவினய்முற்று",);
    oneVariant("எதிர்மறய்வினயெச்சம்",);
    oneVariant("எதிர்மறய்ப்பெயரெச்சம்",);
    nineVariants("எதிர்மறய்வினய்முற்று",);
    oneVariant("வருங்காலத்துவினயெச்சம்",);
    oneVariant("வருங்காலத்துப்பெயரெச்சம்",);
    nineVariants("வருங்காலத்துவினய்முற்று",);
    oneVariant("வியங்கோள்வினய்முற்று",);
    oneVariant("தொழிற்பெயர்",);
    oneVariant("நிகழ்காலத்துப்பெயரெச்சம்",);
    nineVariants("நிகழ்காலத்துவினய்முற்று",);
};

const refreshContent = () => {
    const verbElement = document.getElementById("verb",);
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

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
        const main = document.querySelector("main",);
        const addTable = (id, captionText, material,) => {
            const table = document.createElement("table",);
            table.id = id;
            const caption = document.createElement("caption",);
            caption.appendChild(document.createTextNode(captionText,),);
            table.appendChild(caption,);
            main.appendChild(table,);
            fillTable(table, material,);
            table.style.display = "table";
        };

        main.querySelector("table[id='forms']",)?.remove();
        addTable("forms", "தன்வினை வடிவுகள்", forms,);

        Array.from(main.querySelectorAll("table[id^='causativeForms']",),).forEach(tbl => tbl.remove(),);

        const causativeForms = forms.children?.get(causativeFormsKey,);
        if (! causativeForms) {
            return;
        }

        Array.from(causativeForms,).forEach((causativeFormTree, index,) => {
            const unicodeOffset = 0x0BE7; // Unicode offset for Tamil numbers
            addTable(`causativeForms${index}`, `${String.fromCharCode(index + unicodeOffset,)}ம் வகய்ப் பிறவினை வடிவுகள்`, causativeFormTree,);
        },);
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
