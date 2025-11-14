import { verbClasses, validVerbClasses, getForms, causativeFormsKey, அய்காரத்துப்புதுவிதிகள், } from "../dist/ilakkanam.min.js";

const TAMIL_NUMBER_UNICODE_OFFSET = 0x0BE7;

const fillTable = (table, material, isModernSpelling,) => {
    const flattenSet = form => {
        if (! (form instanceof Set)) {
            return form;
        };
        return Array.from(form,).join(", ",);
    };

    const getText = node => {
        if (! isModernSpelling) {
            return node.label;
        }
        return அய்காரத்துப்புதுவிதிகள்.reduce(
            (வடிவு, புணர்ச்சிவிதி,) => புணர்ச்சிவிதி(வடிவு,),
            node.label,
        );
    };

    const headRow = table.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("எச்சம்‌‌‌‌‌‌‌‌‌/முற்று",),);
    headRow.insertCell().appendChild(document.createTextNode("இடம்",),);
    headRow.insertCell().appendChild(document.createTextNode("எண்‌/பால்",),);
    headRow.insertCell().appendChild(document.createTextNode("வடிவு",),);

    const tbody = table.createTBody();
    const oneVariant = key => {
        const child = material.children.get(key,);
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.appendChild(document.createTextNode(getText(child,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(child.வடிவு,),),);
    };
    const twoVariants = key => {
        const child = material.children.get(key,);
        const ஒருமய் = child.children.get("ஒருமய்",);
        const பன்மய் = child.children.get("பன்மய்",);
        let row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 2;
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(getText(child,),),);
        row.insertCell().appendChild(document.createTextNode(getText(ஒருமய்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஒருமய்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பன்மய்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பன்மய்.வடிவு,),),);
    };
    const nineVariants = key => {
        const child = material.children.get(key,);
        const தன்மய் = child.children.get("தன்மய்",);
        const முன்னிலய் = child.children.get("முன்னிலய்",);
        const படர்க்கய் = child.children.get("படர்க்கய்",);
        const தன்மயிலொருமய் = தன்மய்.children.get("ஒருமய்",);
        const தன்மயிற்பன்மய் = தன்மய்.children.get("பன்மய்",);
        const முன்னிலயிலொருமய் = முன்னிலய்.children.get("ஒருமய்",);
        const முன்னிலயிற்பன்மய் = முன்னிலய்.children.get("பன்மய்",);
        const ஆண்பால் = படர்க்கய்.children.get("ஆண்பால்",);
        const பெண்பால் = படர்க்கய்.children.get("பெண்பால்",);
        const பலர்பால் = படர்க்கய்.children.get("பலர்பால்",);
        const ஒன்றன்பால் = படர்க்கய்.children.get("ஒன்றன்பால்",);
        const பலவின்பால் = படர்க்கய்.children.get("பலவின்பால்",);

        let row = tbody.insertRow();
        let cell = row.insertCell();
        cell.rowSpan = 9;
        cell.appendChild(document.createTextNode(getText(child,),),);
        cell = row.insertCell();
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(getText(தன்மய்,),),);
        row.insertCell().appendChild(document.createTextNode(getText(தன்மயிலொருமய்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(தன்மயிலொருமய்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(தன்மயிற்பன்மய்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(தன்மயிற்பன்மய்.வடிவு,),),);
        row = tbody.insertRow();
        cell = row.insertCell();
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(getText(முன்னிலய்,),),);
        row.insertCell().appendChild(document.createTextNode(getText(முன்னிலயிலொருமய்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(முன்னிலயிலொருமய்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(முன்னிலயிற்பன்மய்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(முன்னிலயிற்பன்மய்.வடிவு,),),);
        row = tbody.insertRow();
        cell = row.insertCell();
        cell.rowSpan = 5;
        cell.appendChild(document.createTextNode(getText(படர்க்கய்,),),);
        row.insertCell().appendChild(document.createTextNode(getText(ஆண்பால்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஆண்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பெண்பால்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பெண்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பலர்பால்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பலர்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(ஒன்றன்பால்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஒன்றன்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பலவின்பால்,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பலவின்பால்.வடிவு,),),);
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

const verbElement = document.getElementById("verb",);
const errorElement = document.getElementById("error",);
const verbClassSelect = document.getElementById("verbClass",);
const spellingElement = document.getElementById("spelling",);
const button = document.getElementById("submit",);

const refreshContent = () => {
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

    errorElement.style.display = "none";

    if (! verb.length) {
        // For the initial pageload case, …
        return;
    }

    const isModernSpelling = spellingElement.value === "modn";

    const verbClass = (verbClassSelect.selectedIndex === 0) ? null : verbClassSelect.value;

    const main = document.querySelector("main",);
    main.querySelector("table[id='forms']",)?.remove();
    Array.from(main.querySelectorAll("table[id^='causativeForms']",),).forEach(tbl => tbl.remove(),);

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
        const addTable = (id, captionText, material,) => {
            const table = document.createElement("table",);
            table.id = id;
            const caption = document.createElement("caption",);
            caption.appendChild(document.createTextNode(captionText,),);
            table.appendChild(caption,);
            main.appendChild(table,);
            fillTable(table, material, isModernSpelling,);
            table.style.display = "table";
        };

        addTable("forms", "தன்வினை வடிவு", forms,);

        const causativeForms = forms.children?.get(causativeFormsKey,);
        if (! causativeForms) {
            return;
        }

        Array.from(causativeForms,).forEach((causativeFormTree, index,) => {
            addTable(`causativeForms${index}`, `${String.fromCharCode(index + TAMIL_NUMBER_UNICODE_OFFSET,)}ம் வகய்ப் பிறவினை வடிவு`, causativeFormTree,);
        },);
    } catch (e) {
        window.alert(e.message,);
    }
};

(select => verbClasses.sort().forEach(வினயினத்துப்பெயர் => {
    const option = document.createElement("option",);
    option.text = வினயினத்துப்பெயர்;
    select.appendChild(option,);
},))(verbClassSelect,);

button.addEventListener("click", refreshContent,);

verbElement.addEventListener("focus", () => {
    Array.from(verbClassSelect.options,).forEach(option => {
        option.disabled = false;
    },);
},);

verbElement.addEventListener("blur", blurEvent => {
    if (! blurEvent.target.checkValidity()) {
        return;
    }

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
