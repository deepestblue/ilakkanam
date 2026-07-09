import { verbsInClass, getவடிவுEndings, } from "../lib/ilakkanam.js";
import { transliterate, } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@v0.5.0/src/saulabhya.min.js";
import { hashParams, getText, refreshUI, addTable, } from "./shared.js";

const mainElement = document.getElementById("verb-class-main",);
const displayScriptSelectElement = document.getElementById("displayScript",);
const spellingRadioElement = filter => document.querySelector(`input[name="spelling"]${filter}`,);

const refresh = () => {
    mainElement.replaceChildren();

    const verbClass = hashParams().get("verbClass",);

    const heading = document.createElement("h2",);
    heading.className = "verb-class-heading";
    heading.appendChild(document.createTextNode(getText(`“${verbClass}” இனம்`,),),);
    mainElement.appendChild(heading,);

    const descriptionTemplate = document.getElementById(`verb-class-${verbClass}`,);
    mainElement.appendChild(descriptionTemplate.content.cloneNode(true,),);

    const verbs = verbsInClass(verbClass,);

    const countLine = document.createElement("p",);
    countLine.className = "verb-class-count";
    countLine.appendChild(document.createTextNode(getText(`இவ்வினயினத்தில் உள்ள வினய் ${transliterate("Latn", "Taml", String(verbs.length,),)} மேலே.`,),),);
    mainElement.appendChild(countLine,);

    const list = document.createElement("ul",);
    list.className = "verb-class-verbs";
    verbs.forEach(verb => {
        const item = document.createElement("li",);
        const link = document.createElement("a",);
        link.href = `index.html#${new URLSearchParams({ verb, verbClass, spellingStyle: spellingRadioElement(":checked",).value, displayScript: displayScriptSelectElement.value, },).toString()}`;
        link.textContent = getText(verb,);
        item.appendChild(link,);
        list.appendChild(item,);
    },);
    mainElement.appendChild(list,);

    if (["செய்", "உயர்", "பார்", "வாங்கு", "திற",].includes(verbClass,)) {
        addTable(mainElement, "formEndings", getவடிவுEndings(verbClass,), document.createTextNode(getText(`“${verbClass}” இனத்து வடிவுகளின் முடிவுகள்`,),),);
    }

    refreshUI();
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

    refresh();
};

displayScriptSelectElement.addEventListener("change", () => {
    const params = hashParams();
    params.set("displayScript", displayScriptSelectElement.value,);
    history.replaceState(null, "", params.toString() ? `#${params.toString()}` : `${location.pathname}${location.search}`,);
    refresh();
},);

document.querySelectorAll("input[name=\"spelling\"]",).forEach(radio => {
    radio.addEventListener("change", () => {
        const params = hashParams();
        params.set("spellingStyle", spellingRadioElement(":checked",).value,);
        history.replaceState(null, "", params.toString() ? `#${params.toString()}` : `${location.pathname}${location.search}`,);
        refresh();
    },);
},);

window.addEventListener("hashchange", applyStateFromFragment,);

window.dispatchEvent(new HashChangeEvent("hashchange",),);
