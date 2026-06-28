import { conversionsToNewSpelling, } from "../dist/ilakkanam.min.js";
import { transliterate, } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@v0.5.0/src/saulabhya.min.js";

export const hashParams = () => new URLSearchParams(location.hash.slice(1,),);

export const getText = text => transliterate(
    "Taml", document.getElementById("displayScript",).value, (document.querySelector("input[name='spelling']:checked",).value === "modn" ? conversionsToNewSpelling : []).reduce((form, conversionRule,) => conversionRule(form,), text,),).normalize("NFC",);

export const verbClassPageHref = இனத்துப்பெயர் => `verbClass.html#${new URLSearchParams({ verbClass: இனத்துப்பெயர், spellingStyle: document.querySelector("input[name='spelling']:checked",).value, displayScript: document.getElementById("displayScript",).value, },).toString()}`;

export const refreshUI = () => {
    document.querySelectorAll("[data-original-text]",).forEach(e => e.textContent = getText(e.dataset.originalText,),);
    document.querySelectorAll("a.vinayinam-class",).forEach(link => link.href = verbClassPageHref(new URLSearchParams(new URL(link.href, location.href,).hash.slice(1,),).get("verbClass",),),);
};
