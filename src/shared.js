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

export const addTable = (container, id, material, caption,) => {
    const table = document.createElement("table",);
    table.id = id;

    const captionElement = document.createElement("caption",);
    captionElement.append(caption,);
    table.appendChild(captionElement,);

    container.appendChild(table,);
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
        cell.appendChild(document.createTextNode(Array.from(obj.வடிவு,).map(getText,).join(", ",),),);
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
