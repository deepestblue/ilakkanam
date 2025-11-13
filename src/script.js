import { verbClasses, validVerbClasses, getForms, causativeFormsKey, } from "../lib/ilakkanam.js";

const fillTable = (table, material,) => {
    const tbody = table.createTBody();

    let maxDepth = 0;
    // First pass: find maximum depth of the tree
    const findMaxDepth = (node, currentDepth = 0,) => {
        if ("வடிவு" in node) {
            maxDepth = Math.max(maxDepth, currentDepth,);
            return;
        }
        if (node.children && node.children instanceof Map) {
            node.children.forEach((childNode, childKey,) => {
                if (childKey !== causativeFormsKey) {
                    findMaxDepth(childNode, currentDepth + 1,);
                }
            },);
        }
    };

    // Second pass: collect all leaf nodes with their paths
    const collectLeaves = (node, path = [],) => {
        const leaves = [];
        if ("வடிவு" in node) {
            leaves.push({ path, வடிவு: node.வடிவு, },);
            return leaves;
        }
        if (node.children && node.children instanceof Map) {
            node.children.forEach((childNode, childKey,) => {
                if (childKey !== causativeFormsKey) {
                    leaves.push(...collectLeaves(childNode, [...path, childNode.label,],),);
                }
            },);
        }
        return leaves;
    };

    // Process material to find max depth and collect leaves
    let allLeaves = [];
    if (material instanceof Set) {
        // Causative forms: Set of tree structures
        material.forEach(tree => {
            findMaxDepth(tree, 0,);
            allLeaves.push(...collectLeaves(tree, [],),);
        },);
    } else {
        // Base forms: tree structure
        findMaxDepth(material, 0,);
        allLeaves = collectLeaves(material, [],);
    }

    // Create header row with empty labels for hierarchy columns
    const headRow = table.createTHead().insertRow();
    for (let i = 0; i < maxDepth; i++) {
        headRow.insertCell();
    }
    headRow.insertCell().appendChild(document.createTextNode("வடிவுகள்",),);

    // Create data rows
    allLeaves.forEach(({ path, வடிவு, },) => {
        const row = tbody.insertRow();
        // Fill in path cells
        for (let i = 0; i < path.length; i++) {
            const cell = row.insertCell();
            if (i === path.length - 1) {
                cell.colSpan = maxDepth - path.length + 1;
            }
            if (i < path.length) {
                cell.appendChild(document.createTextNode(path[i],),);
            }
        }
        // Add forms cell
        const formsCell = row.insertCell();
        if (typeof வடிவு === "string") {
            formsCell.appendChild(document.createTextNode(வடிவு,),);
        } else if (வடிவு instanceof Set) {
            formsCell.appendChild(document.createTextNode(
                Array.from(வடிவு,).join(", ",),
            ),);
        }
    },);
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
            addTable(`causativeForms${index}`, `${String.fromCharCode(index + unicodeOffset,)}வது பிறவினை வடிவுகள்`, causativeFormTree,);
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
