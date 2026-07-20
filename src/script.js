import { getForms, causativeFormsKey, conversionsToOldSpelling, verbsStartingWith, } from "../dist/ilakkanam.min.js";
import { transliterate, } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@v0.5.0/src/saulabhya.min.js";
import { hashParams, getText, refreshUI, addTable, verbClassPageHref, } from "./shared.js";

const TAMIL_NUMBER_UNICODE_OFFSET = 0x0BE7;

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

const updateHash = (verbClass, setHistory,) => {
    const entries = [
        ["verb", verbInTamilOldStyle,],
        ["spellingStyle", spellingRadioElement(":checked",).value,],
        ["displayScript", displayScriptSelectElement.value,],
    ];

    if (verbClass) {
        entries.push(["verbClass", verbClass,],);
    }

    setHistory(null, "", `#${new URLSearchParams(entries,).toString()}`,);
};

const verbPatternByScript = () => {
    const allTamilVowelsMarkersConsonants = spellingRadioElement(":checked",).value === "modn" ? "அஆஇஈஉஊஎஏஒஓஐஔகிஙீசுஞூடெணேறொனோதைநௌப்மாயரலவழளஃ" : "அஆஇஈஉஊஎஏஒஓகிஙீசுஞூடெணேறொனோதநப்மாயரலவழளஃ";
    return {
        Taml: `[${allTamilVowelsMarkersConsonants.normalize("NFC",)}]*`,
        Mlym: `[${transliterate("Taml", "Mlym", allTamilVowelsMarkersConsonants,).normalize("NFC",)}]*`,
        Knda: `[${transliterate("Taml", "Knda", allTamilVowelsMarkersConsonants,).normalize("NFC",)}]*`,
        Telu: `[${transliterate("Taml", "Telu", allTamilVowelsMarkersConsonants,).normalize("NFC",)}]*`,
        Latn: `[${transliterate("Taml", "Latn", "அஆஇஈஉஊஎஏஒஓக்ங்ச்ஞ்ட்ண்ற்ன்த்ந்ப்ம்ய்ர்ல்வ்ழ்ள்",).normalize("NFC",)}]*`,
    };
};

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

const refreshContent = (setHistory = history.replaceState.bind(history,),) => {
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
                updateHash(className, history.pushState.bind(history,),);
                refreshContent();
            },);
            actions.appendChild(button,);
        },);

        errorElement.appendChild(actions,);
        showError();
        errorElement.querySelector(".verb-class-choice",)?.focus();
        updateHash("", setHistory,);

        return;
    }

    try {
        const buildVerbFormsCaption = (material, supplementalCaptionText,) => {
            const இனத்துப்பெயர் = material.children.get("இனத்துப்பெயர்",);
            const வினய் = material.children.get("வினய்",);
            const caption = document.createDocumentFragment();
            caption.appendChild(document.createTextNode(getText(`${supplementalCaptionText}“`,),),);
            const இனம்Link = document.createElement("a",);
            இனம்Link.href = verbClassPageHref(இனத்துப்பெயர்.வடிவு,);
            இனம்Link.textContent = getText(இனத்துப்பெயர்.வடிவு,);
            caption.appendChild(இனம்Link,);
            caption.appendChild(document.createTextNode(getText(`” இனத்தில் உள்ள “${வினய்.வடிவு}” எனும் வினயிற்கான வடிவு`,),),);
            return caption;
        };

        addTable(main, "forms", forms, buildVerbFormsCaption(forms, "",),);
        updateHash(verbClass, setHistory,);

        const causativeForms = forms.children?.get(causativeFormsKey,);
        if (! causativeForms) {
            return;
        }

        Array.from(causativeForms,).forEach((causativeFormTree, index,) => {
            addTable(main, `causativeForms${index}`, causativeFormTree, buildVerbFormsCaption(causativeFormTree, `அவ்வினய்க்கேற்ற ${String.fromCharCode(index + TAMIL_NUMBER_UNICODE_OFFSET,)}ம் பிறவினயான `,),);
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

    verbElement.pattern = verbPatternByScript()[displayScriptSelectElement.value];
    verbInTamilOldStyle = params.get("verb",) ?? "";
    verbElement.value = getText(verbInTamilOldStyle,);

    refreshUI();
    refreshContent();
};

displayScriptSelectElement.addEventListener("change", () => {
    verbElement.pattern = verbPatternByScript()[displayScriptSelectElement.value];
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
        verbElement.pattern = verbPatternByScript()[displayScriptSelectElement.value];
        const params = hashParams();
        params.set("spellingStyle", spellingRadioElement(":checked",).value,);
        params.set("verb", verbInTamilOldStyle,);
        history.replaceState(null, "", `#${params.toString()}`,);
        refreshUI();
        verbElement.value = getText(verbInTamilOldStyle,);
        updateVerbSuggestions();
    },);
},);

document.getElementById("controls-form",).addEventListener("submit", submitEvent => {
    submitEvent.preventDefault();
    if (! verbElement.reportValidity()) {
        return;
    }
    refreshContent(history.pushState.bind(history,),);
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
