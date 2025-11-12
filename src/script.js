import { verbClasses, validVerbClasses, getForms, causativeFormsKey, } from "../lib/ilakkanam.js";

const fillTable = (table, material,) => {
    table.deleteTHead();
    Array.from(table.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

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
    } else if (material && typeof material === "object" && material.children) {
        // Base forms: tree structure
        findMaxDepth(material, 0,);
        allLeaves = collectLeaves(material, [],);
    }

    // Create header row with empty labels for hierarchy columns
    const headRow = table.createTHead().insertRow();
    for (let i = 0; i < maxDepth; i++) {
        headRow.insertCell();
    }
    headRow.insertCell().appendChild(document.createTextNode("உருவங்கள்",),);

    // Create data rows
    allLeaves.forEach(({ path, வடிவு, },) => {
        const row = tbody.insertRow();
        // Fill in path cells
        for (let i = 0; i < maxDepth; i++) {
            const cell = row.insertCell();
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

        const causativeForms = forms.children?.get(causativeFormsKey,);
        if (! causativeForms || ! (causativeForms instanceof Set) || causativeForms.size === 0) {
            // Hide and remove any extra causative forms tables from previous runs
            const main = document.querySelector("main",);
            const allCausativeTables = Array.from(main.querySelectorAll("table[id^='causativeForms']",),);
            allCausativeTables.forEach(table => {
                table.style.display = "none";
                if (table.id !== "causativeForms") {
                    table.remove();
                }
            },);
            return;
        }

        const main = document.querySelector("main",);
        const causativeFormsArray = Array.from(causativeForms,);

        // Remove any extra tables from previous runs (keep only the first one)
        const allCausativeTables = Array.from(main.querySelectorAll("table[id^='causativeForms']",),);
        for (let i = 1; i < allCausativeTables.length; i++) {
            allCausativeTables[i].remove();
        }

        // Create or reuse tables for each causative form
        causativeFormsArray.forEach((causativeFormTree, index,) => {
            const table = index === 0 ?
                causativeFormsTable
                : (() => {
                        const newTable = document.createElement("table",);
                        newTable.id = `causativeForms${index}`;
                        const caption = document.createElement("caption",);
                        caption.appendChild(document.createTextNode("பிறவினை உருவங்கள்",),);
                        newTable.appendChild(caption,);
                        main.appendChild(newTable,);
                        return newTable;
                    })();
            fillTable(table, causativeFormTree,);
            table.style.display = "table";
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
