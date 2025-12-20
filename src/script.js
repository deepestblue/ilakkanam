import { verbClasses, validVerbClasses, getForms, causativeFormsKey, conversionsToNewSpelling, } from "../dist/ilakkanam.min.js";

const TAMIL_NUMBER_UNICODE_OFFSET = 0x0BE7;

let isModernSpelling = false;

const flattenSet = form => {
    if (! (form instanceof Set)) {
        return form;
    };
    return Array.from(form,).join(", ",);
};

const getText = text => {
    if (! isModernSpelling) {
        return text;
    }
    return conversionsToNewSpelling.reduce(
        (வடிவு, புணர்ச்சிவிதி,) => புணர்ச்சிவிதி(வடிவு,),
        text,
    );
};

const fillTable = (table, material,) => {
    const headRow = table.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("வினய் நிலய்",),);
    headRow.insertCell().appendChild(document.createTextNode("எச்சம்/முற்று/பெயர்",),);
    headRow.insertCell().appendChild(document.createTextNode("இடம்",),);
    headRow.insertCell().appendChild(document.createTextNode("எண்/பால்",),);
    headRow.insertCell().appendChild(document.createTextNode("வடிவு",),);

    const tbody = table.createTBody();
    const oneVariant = key => {
        const child = material.children.get(key,);
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.appendChild(document.createTextNode(getText(child.label,),),);
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
        cell.appendChild(document.createTextNode(getText(child.label,),),);
        row.insertCell().appendChild(document.createTextNode(getText(ஒருமய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஒருமய்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பன்மய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பன்மய்.வடிவு,),),);
    };
    const fiveVariants = key => {
        const child = material.children.get(key,);
        const ஆண்பால் = child.children.get("ஆண்பால்",);
        const பெண்பால் = child.children.get("பெண்பால்",);
        const பலர்பால் = child.children.get("பலர்பால்",);
        const ஒன்றன்பால் = child.children.get("ஒன்றன்பால்",);
        const பலவின்பால் = child.children.get("பலவின்பால்",);
        let row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 2;
        cell.rowSpan = 5;
        cell.appendChild(document.createTextNode(getText(child.label,),),);
        row.insertCell().appendChild(document.createTextNode(getText(ஆண்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஆண்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பெண்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பெண்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பலர்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பலர்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(ஒன்றன்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஒன்றன்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பலவின்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பலவின்பால்.வடிவு,),),);
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
        cell.appendChild(document.createTextNode(getText(child.label,),),);
        cell = row.insertCell();
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(getText(தன்மய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(getText(தன்மயிலொருமய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(தன்மயிலொருமய்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(தன்மயிற்பன்மய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(தன்மயிற்பன்மய்.வடிவு,),),);
        row = tbody.insertRow();
        cell = row.insertCell();
        cell.rowSpan = 2;
        cell.appendChild(document.createTextNode(getText(முன்னிலய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(getText(முன்னிலயிலொருமய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(முன்னிலயிலொருமய்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(முன்னிலயிற்பன்மய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(முன்னிலயிற்பன்மய்.வடிவு,),),);
        row = tbody.insertRow();
        cell = row.insertCell();
        cell.rowSpan = 5;
        cell.appendChild(document.createTextNode(getText(படர்க்கய்.label,),),);
        row.insertCell().appendChild(document.createTextNode(getText(ஆண்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஆண்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பெண்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பெண்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பலர்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பலர்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(ஒன்றன்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(ஒன்றன்பால்.வடிவு,),),);
        row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(getText(பலவின்பால்.label,),),);
        row.insertCell().appendChild(document.createTextNode(flattenSet(பலவின்பால்.வடிவு,),),);
    };

    const cell1 = tbody.insertRow().insertCell();
    cell1.rowSpan = 3;
    cell1.appendChild(document.createTextNode(getText("ஏவல்",),),);
    twoVariants("ஏவல்வினய்முற்று",);

    const cell2 = tbody.insertRow().insertCell();
    cell2.rowSpan = 17;
    cell2.appendChild(document.createTextNode(getText("வருங்காலம்",),),);
    oneVariant("வருங்காலத்துவினயெச்சம்",);
    oneVariant("வருங்காலத்துப்பெயரெச்சம்",);
    nineVariants("வருங்காலத்துவினய்முற்று",);
    fiveVariants("வருங்காலத்துப்பெயரெச்சத்துப்பெயர்",);

    const cell3 = tbody.insertRow().insertCell();
    cell3.rowSpan = 16;
    cell3.appendChild(document.createTextNode(getText("நிகழ்காலம்",),),);
    oneVariant("நிகழ்காலத்துப்பெயரெச்சம்",);
    nineVariants("நிகழ்காலத்துவினய்முற்று",);
    fiveVariants("நிகழ்காலத்துப்பெயரெச்சத்துப்பெயர்",);

    const cell4 = tbody.insertRow().insertCell();
    cell4.rowSpan = 10;
    cell4.appendChild(document.createTextNode(getText("எதிர்மறய்",),),);
    nineVariants("எதிர்மறய்வினய்முற்று",);

    const cell5 = tbody.insertRow().insertCell();
    cell5.rowSpan = 2;
    cell5.appendChild(document.createTextNode(getText("வியங்கோள்",),),);
    oneVariant("வியங்கோள்வினய்முற்று",);

    const cell6 = tbody.insertRow().insertCell();
    cell6.rowSpan = 2;
    cell6.appendChild(document.createTextNode(getText("தொழிற்பெயர்",),),);
    oneVariant("தொழிற்பெயர்",);

    const cell7 = tbody.insertRow().insertCell();
    cell7.rowSpan = 17;
    cell7.appendChild(document.createTextNode(getText("போனகாலம்",),),);
    oneVariant("போனகாலத்துவினயெச்சம்",);
    oneVariant("போனகாலத்துப்பெயரெச்சம்",);
    nineVariants("போனகாலத்துவினய்முற்று",);
    fiveVariants("போனகாலத்துப்பெயரெச்சத்துப்பெயர்",);

    const cell8 = tbody.insertRow().insertCell();
    cell8.rowSpan = 3;
    cell8.appendChild(document.createTextNode(getText("நிபந்தனய்",),),);
    oneVariant("நிபந்தனய்வினயெச்சம்",);
    oneVariant("எதிர்மறய்நிபந்தனய்வினயெச்சம்",);
};

const verbElement = document.getElementById("verb",);
const errorElement = document.getElementById("error",);
const verbClassSelect = document.getElementById("verbClass",);
const spellingElement = () => document.querySelector("input[name=\"spelling\"]:checked",);
const button = document.getElementById("submit",);

const refreshContent = () => {
    if (! verbElement.checkValidity()) {
        return;
    }

    errorElement.style.display = "none";

    isModernSpelling = spellingElement().value === "modn";
    document.querySelectorAll("[data-original-text]",).forEach(e => {
        e.textContent = getText(e.getAttribute("data-original-text",),);
    },);

    const verb = verbElement.value;
    if (! verb.length) {
        return;
    }

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
        const addTable = (id, material, supplementalCaptionText,) => {
            const இனத்துப்பெயர் = material.children.get("இனத்துப்பெயர்",);
            const வினய் = material.children.get("வினய்",);
            const table = document.createElement("table",);
            table.id = id;
            const captionText = getText(`${supplementalCaptionText}“${flattenSet(இனத்துப்பெயர்.வடிவு,)}” இனத்தில் உள்ள “${வினய்.வடிவு}” எனும் வினயிற்கான வடிவு`,);
            const caption = document.createElement("caption",);
            caption.appendChild(document.createTextNode(getText(captionText,),),);
            table.appendChild(caption,);
            main.appendChild(table,);
            fillTable(table, material,);
            table.style.display = "table";
        };

        addTable("forms", forms, "",);

        const causativeForms = forms.children?.get(causativeFormsKey,);
        if (! causativeForms) {
            return;
        }

        Array.from(causativeForms,).forEach((causativeFormTree, index,) => {
            addTable(`causativeForms${index}`, causativeFormTree, `அவ்வினய்க்கேற்ற ${String.fromCharCode(index + TAMIL_NUMBER_UNICODE_OFFSET,)}ம் பிறவினயான `,);
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
        if (validVerbClassNames.includes(option.value,)) {
            return;
        }
        option.disabled = true;
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
