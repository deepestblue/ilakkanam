import { getForms, causativeFormsKey, conversionsToNewSpelling, conversionsToOldSpelling, verbsStartingWith, } from "../dist/ilakkanam.min.js";
import { transliterate, } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@v0.5.0/src/saulabhya.min.js";

const TAMIL_NUMBER_UNICODE_OFFSET = 0x0BE7;

const flattenSet = form => {
    if (! (form instanceof Set)) {
        return form;
    };
    return Array.from(form,).join(", ",);
};

const verbElement = document.getElementById("verb",);
const errorElement = document.getElementById("error",);
const displayScriptSelectElement = document.getElementById("displayScript",);
const spellingRadioElement = filter => document.querySelector(`input[name="spelling"]${filter}`,);

let verbInTamilOldStyle = "";

const hideError = () => {
    errorElement.hidden = true;
    errorElement.classList.remove("disambiguation",);
    errorElement.removeAttribute("aria-labelledby",);
    errorElement.replaceChildren();
};

const showError = () => {
    errorElement.hidden = false;
};

const hashParams = () => new URLSearchParams(location.hash.slice(1,),);

const replaceHash = verbClass => {
    const entries = [
        ["verb", verbInTamilOldStyle,],
        ["spellingStyle", spellingRadioElement(":checked",).value,],
        ["displayScript", displayScriptSelectElement.value,],
    ];

    if (verbClass) {
        entries.push(["verbClass", verbClass,],);
    }

    history.replaceState(null, "", `#${new URLSearchParams(entries,).toString()}`,);
};

const verbPatternByScript = {
    Taml: String.raw`\p{Script=Tamil}*`,
    Latn: `[${transliterate("Taml", "Latn", "ஃஅஆஇஈஉஊஎஏஒஓக்ங்ச்ஞ்ட்ண்ற்ன்த்ந்ப்ம்ய்ர்ல்வ்ழ்ள்",).normalize("NFC",)}]*`,
    Mlym: String.raw`\p{Script=Malayalam}*`,
    Knda: String.raw`\p{Script=Kannada}*`,
    Telu: String.raw`\p{Script=Telugu}*`,
};

const getText = text => transliterate(
    "Taml", displayScriptSelectElement.value, (spellingRadioElement(":checked",).value === "modn" ? conversionsToNewSpelling : []).reduce((form, conversionRule,) => conversionRule(form,), text,),).normalize("NFC",);

const refreshUI = () => document.querySelectorAll("[data-original-text]",).forEach(e => {
    e.textContent = getText(e.dataset.originalText,);
},);

const getVerb = () => (spellingRadioElement(":checked",).value === "modn" ? conversionsToOldSpelling : []).reduce((form, conversionRule,) => conversionRule(form,), transliterate(displayScriptSelectElement.value, "Taml", verbElement.value,),);

const updateVerbSuggestions = () => {
    const verbListElement = document.getElementById("verb-list",);
    verbListElement.innerHTML = "";

    const prefix = getVerb();

    if (! prefix.length) {
        return;
    }

    const AUTOCOMPLETE_MAX = 15;

    verbsStartingWith(prefix,).slice(0, AUTOCOMPLETE_MAX,).forEach(verb => {
        const option = document.createElement("option",);
        option.value = getText(verb,);
        verbListElement.appendChild(option,);
    },);
};

const refreshContent = () => {
    if (! verbElement.checkValidity()) {
        return;
    }

    verbInTamilOldStyle = getVerb();
    hideError();

    if (! verbInTamilOldStyle.length) {
        return;
    }

    const main = document.querySelector("main",);
    main.querySelector("table[id='forms']",)?.remove();
    Array.from(main.querySelectorAll("table[id^='causativeForms']",),).forEach(tbl => tbl.remove(),);

    const verbClass = hashParams().get("verbClass",) ?? "";

    // eslint-disable-next-line init-declarations
    let forms;
    try {
        forms = getForms(verbInTamilOldStyle, verbClass,);
    } catch (e) {
        if (e.cause?.code !== "ambiguousVerbClass") {
            errorElement.textContent = getText(e.message,);
            showError();
            return;
        }

        errorElement.classList.add("disambiguation",);
        const message = document.createElement("span",);
        message.id = "error-message";
        message.appendChild(document.createTextNode(getText(e.message,),),);
        errorElement.setAttribute("aria-labelledby", "error-message",);
        errorElement.appendChild(message,);
        const actions = document.createElement("div",);
        actions.className = "disambiguation-actions";
        actions.setAttribute("role", "group",);
        actions.setAttribute("aria-label", getText("வினயினம் தேர்வு",),);
        e.cause.classes.forEach(className => {
            const button = document.createElement("button",);
            button.type = "button";
            button.className = "verb-class-choice";
            button.textContent = getText(className,);
            button.addEventListener("click", () => {
                const params = hashParams();
                params.set("verb", verbInTamilOldStyle,);
                params.set("verbClass", className,);
                params.set("spellingStyle", spellingRadioElement(":checked",).value,);
                params.set("displayScript", displayScriptSelectElement.value,);
                history.replaceState(null, "", `#${params.toString()}`,);
                refreshContent();
            },);
            actions.appendChild(button,);
        },);

        errorElement.appendChild(actions,);
        showError();
        errorElement.querySelector(".verb-class-choice",)?.focus();
        replaceHash("",);

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
            caption.appendChild(document.createTextNode(captionText,),);
            table.appendChild(caption,);
            main.appendChild(table,);
            const headRow = table.createTHead().insertRow();
            [
                { label: "வினய் நிலய்", tooltip: "Verb Tense/Mood", },
                { label: "உண்ணிலய்", tooltip: "Sub‐type", },
                { label: "இடம்", tooltip: "Person", },
                { label: "எண்ணோ பாலோ", tooltip: "Number/Gender", },
                { label: "வடிவு", tooltip: "Form", },
            ].forEach(({ label, tooltip, },) => {
                const th = document.createElement("th",);
                th.scope = "col";
                th.appendChild(document.createTextNode(getText(label,),),);
                th.title = tooltip;
                headRow.appendChild(th,);
            },);

            const tbody = table.createTBody();
            const insertFormIntoNewCell = (cell, obj,) => {
                cell.classList.add("data-cell",);
                cell.appendChild(document.createTextNode(getText(flattenSet(obj.வடிவு,),),),);
            };
            const insertLabelCell = (row, label, title, { rowSpan = 1, colSpan = 1, } = {},) => {
                const cell = row.insertCell();
                cell.rowSpan = rowSpan;
                cell.colSpan = colSpan;
                cell.appendChild(document.createTextNode(getText(label,),),);
                cell.title = title;
                return cell;
            };
            const fillOneVariant = (key, tooltip,) => {
                const child = material.children.get(key,);
                const row = tbody.insertRow();
                insertLabelCell(row, child.label, tooltip, { colSpan: 3, },);
                insertFormIntoNewCell(row.insertCell(), child,);
            };
            const fillTwoVariants = (key, tooltip,) => {
                const child = material.children.get(key,);
                const ஒருமய் = child.children.get("ஒருமய்",);
                const பன்மய் = child.children.get("பன்மய்",);
                let row = tbody.insertRow();
                insertLabelCell(row, child.label, tooltip, { colSpan: 2, rowSpan: 2, },);
                insertLabelCell(row, ஒருமய்.label, "Singular",);
                insertFormIntoNewCell(row.insertCell(), ஒருமய்,);
                row = tbody.insertRow();
                insertLabelCell(row, பன்மய்.label, "Plural",);
                insertFormIntoNewCell(row.insertCell(), பன்மய்,);
            };
            const fillFiveVariants = (key, tooltip,) => {
                const child = material.children.get(key,);
                const ஆண்பால் = child.children.get("ஆண்பால்",);
                const பெண்பால் = child.children.get("பெண்பால்",);
                const பலர்பால் = child.children.get("பலர்பால்",);
                const ஒன்றன்பால் = child.children.get("ஒன்றன்பால்",);
                const பலவின்பால் = child.children.get("பலவின்பால்",);
                let row = tbody.insertRow();
                insertLabelCell(row, child.label, tooltip, { colSpan: 2, rowSpan: 5, },);
                insertLabelCell(row, ஆண்பால்.label, "Masculine singular",);
                insertFormIntoNewCell(row.insertCell(), ஆண்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, பெண்பால்.label, "Feminine singular",);
                insertFormIntoNewCell(row.insertCell(), பெண்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, பலர்பால்.label, "Human plural",);
                insertFormIntoNewCell(row.insertCell(), பலர்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, ஒன்றன்பால்.label, "Neuter singular",);
                insertFormIntoNewCell(row.insertCell(), ஒன்றன்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, பலவின்பால்.label, "Neuter plural",);
                insertFormIntoNewCell(row.insertCell(), பலவின்பால்,);
            };
            const fillNineVariants = (key, tooltip,) => {
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
                insertLabelCell(row, child.label, tooltip, { rowSpan: 9, },);
                insertLabelCell(row, தன்மய்.label, "1ˢᵗ person", { rowSpan: 2, },);
                insertLabelCell(row, தன்மயிலொருமய்.label, "Singular",);
                insertFormIntoNewCell(row.insertCell(), தன்மயிலொருமய்,);
                row = tbody.insertRow();
                insertLabelCell(row, தன்மயிற்பன்மய்.label, "Plural",);
                insertFormIntoNewCell(row.insertCell(), தன்மயிற்பன்மய்,);
                row = tbody.insertRow();
                insertLabelCell(row, முன்னிலய்.label, "2ⁿᵈ person", { rowSpan: 2, },);
                insertLabelCell(row, முன்னிலயிலொருமய்.label, "Singular",);
                insertFormIntoNewCell(row.insertCell(), முன்னிலயிலொருமய்,);
                row = tbody.insertRow();
                insertLabelCell(row, முன்னிலயிற்பன்மய்.label, "Plural",);
                insertFormIntoNewCell(row.insertCell(), முன்னிலயிற்பன்மய்,);
                row = tbody.insertRow();
                insertLabelCell(row, படர்க்கய்.label, "3ʳᵈ person", { rowSpan: 5, },);
                insertLabelCell(row, ஆண்பால்.label, "Masculine singular",);
                insertFormIntoNewCell(row.insertCell(), ஆண்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, பெண்பால்.label, "Feminine singular",);
                insertFormIntoNewCell(row.insertCell(), பெண்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, பலர்பால்.label, "Human plural",);
                insertFormIntoNewCell(row.insertCell(), பலர்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, ஒன்றன்பால்.label, "Neuter singular",);
                insertFormIntoNewCell(row.insertCell(), ஒன்றன்பால்,);
                row = tbody.insertRow();
                insertLabelCell(row, பலவின்பால்.label, "Neuter plural",);
                insertFormIntoNewCell(row.insertCell(), பலவின்பால்,);
            };

            const fillFns = { 1: fillOneVariant, 2: fillTwoVariants, 5: fillFiveVariants, 9: fillNineVariants, };
            const TABLE_LAYOUT = [
                { label: "ஏவல்", tooltip: "Directive moods", items: [
                    { key: "ஏவல்வினய்முற்று", variantCount: 2, tooltip: "Imperative", },
                    { key: "எதிர்மறயேவல்வினய்முற்று", variantCount: 2, tooltip: "Prohibitive", },
                ], },
                { label: "வியங்கோள்", tooltip: "Optative mood", items: [
                    { key: "வியங்கோள்வினய்முற்று", variantCount: 1, tooltip: "Optative", },
                ], },
                { label: "தொழிற்பெயர்", tooltip: "Verbal nouns", items: [
                    { key: "தொழிற்பெயர்", variantCount: 1, tooltip: "Affirmative verbal noun", },
                    { key: "எதிர்மறய்த்தொழிற்பெயர்", variantCount: 1, tooltip: "Negative verbal noun", },
                ], },
                { label: "எதிர்மறய்", tooltip: "Negative conjugations", items: [
                    { key: "எதிர்மறய்வினயெச்சம்", variantCount: 1, tooltip: "Negative adverbial participle", },
                    { key: "எதிர்மறய்ப்பெயரெச்சம்", variantCount: 1, tooltip: "Negative relative participle", },
                    { key: "எதிர்மறய்ப்பெயரெச்சத்துப்பெயர்", variantCount: 5, tooltip: "Negative relative participial noun", },
                    { key: "எதிர்மறய்வினய்முற்று", variantCount: 9, tooltip: "Negative finite verb", },
                ], },
                { label: "வருங்காலம்", tooltip: "Future tense forms", items: [
                    { key: "வருங்காலத்துவினயெச்சம்", variantCount: 1, tooltip: "Non-past adverbial participle", },
                    { key: "வருங்காலத்துநிபந்தனய்வினயெச்சம்", variantCount: 1, tooltip: "Non-past conditional", },
                    { key: "வருங்காலத்துப்பெயரெச்சம்", variantCount: 1, tooltip: "Non-past relative participle", },
                    { key: "வருங்காலத்துப்பெயரெச்சத்துப்பெயர்", variantCount: 5, tooltip: "Non-past relative participial noun", },
                    { key: "வருங்காலத்துவினய்முற்று", variantCount: 9, tooltip: "Future finite verb", },
                ], },
                { label: "நிகழ்காலம்", tooltip: "Present tense forms", items: [
                    { key: "நிகழ்காலத்துப்பெயரெச்சம்", variantCount: 1, tooltip: "Present relative participle", },
                    { key: "நிகழ்காலத்துப்பெயரெச்சத்துப்பெயர்", variantCount: 5, tooltip: "Present relative participial noun", },
                    { key: "நிகழ்காலத்துவினய்முற்று", variantCount: 9, tooltip: "Present finite verb", },
                ], },
                { label: "போனகாலம்", tooltip: "Past tense forms", items: [
                    { key: "போனகாலத்துவினயெச்சம்", variantCount: 1, tooltip: "Past adverbial participle", },
                    { key: "போனகாலத்துநிபந்தனய்வினயெச்சம்", variantCount: 1, tooltip: "Past conditional", },
                    { key: "போனகாலத்துப்பெயரெச்சம்", variantCount: 1, tooltip: "Past relative participle", },
                    { key: "போனகாலத்துப்பெயரெச்சத்துப்பெயர்", variantCount: 5, tooltip: "Past relative participial noun", },
                    { key: "போனகாலத்துவினய்முற்று", variantCount: 9, tooltip: "Past finite verb", },
                ], },
            ];
            TABLE_LAYOUT.forEach(section => {
                const row = tbody.insertRow();
                const th = document.createElement("th",);
                th.scope = "rowgroup";
                th.rowSpan = 1 + section.items.reduce((n, item,) => n + item.variantCount, 0,);
                th.appendChild(document.createTextNode(getText(section.label,),),);
                th.title = section.tooltip;
                row.appendChild(th,);
                section.items.forEach(item => fillFns[item.variantCount](item.key, item.tooltip,),);
            },);
            table.style.display = "table";
        };

        addTable("forms", forms, "",);
        replaceHash(verbClass,);

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

const applyStateFromFragment = () => {
    const params = hashParams();

    const spelling = params.get("spellingStyle",) ?? "modn";
    spellingRadioElement(`[value="${spelling}"]`,).checked = true;

    displayScriptSelectElement.value = (script => {
        if (! ["Taml", "Latn", "Mlym", "Knda", "Telu",].includes(script,)) {
            return "Taml";
        }
        return script;
    })(params.get("displayScript",),);

    verbElement.pattern = verbPatternByScript[displayScriptSelectElement.value];
    verbInTamilOldStyle = params.get("verb",) ?? "";
    verbElement.value = getText(verbInTamilOldStyle,);
    refreshUI();
    refreshContent();
};

displayScriptSelectElement.addEventListener("change", () => {
    verbElement.pattern = verbPatternByScript[displayScriptSelectElement.value];
    const params = hashParams();
    params.set("displayScript", displayScriptSelectElement.value,);
    params.set("verb", verbInTamilOldStyle,);
    history.replaceState(null, "", `#${params.toString()}`,);
    verbElement.value = getText(verbInTamilOldStyle,);
    refreshUI();
    updateVerbSuggestions();
},);

window.addEventListener("hashchange", applyStateFromFragment,);

document.querySelectorAll("input[name=\"spelling\"]",).forEach(radio => {
    radio.addEventListener("change", () => {
        const params = hashParams();
        params.set("spellingStyle", spellingRadioElement(":checked",).value,);
        params.set("verb", verbInTamilOldStyle,);
        history.replaceState(null, "", `#${params.toString()}`,);
        refreshUI();
        verbElement.value = getText(verbInTamilOldStyle,);
    },);
},);

document.getElementById("controls-form",).addEventListener("submit", submitEvent => {
    submitEvent.preventDefault();
    if (! verbElement.reportValidity()) {
        return;
    }
    refreshContent();
},);

verbElement.addEventListener("input", () => {
    const normalized = verbElement.value.normalize("NFC",);
    if (normalized !== verbElement.value) {
        verbElement.value = normalized;
    }

    if (! verbElement.checkValidity()) {
        return;
    }

    const newVerb = getVerb();

    if (newVerb !== verbInTamilOldStyle) {
        const params = hashParams();

        if (params.has("verbClass",)) {
            params.delete("verbClass",);
            history.replaceState(null, "", params.toString() ? `#${params.toString()}` : `${location.pathname}${location.search}`,);
        }
    }

    verbInTamilOldStyle = newVerb;
    updateVerbSuggestions();
},);
verbElement.addEventListener("focus", updateVerbSuggestions,);

// Simulates the event on page load to avoid code duplication
window.dispatchEvent(new HashChangeEvent("hashchange",),);
