import { verbClasses, validVerbClasses, getForms, causativeFormsKey, } from "../lib/ilakkanam.js";

const fillTable = (table, material,) => {
    table.deleteTHead();
    Array.from(table.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

    // Create header row with two columns: label and forms
    const headRow = table.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("வடிவம்",),);
    headRow.insertCell().appendChild(document.createTextNode("உருவங்கள்",),);

    const tbody = table.createTBody();

    // Recursive function to traverse tree and create rows
    const traverseTree = (node, labelPath = [],) => {
        // If this node has a வடிவு property, it's a leaf node - create a row
        if ("வடிவு" in node) {
            const row = tbody.insertRow();
            const labelCell = row.insertCell();
            labelCell.appendChild(document.createTextNode(labelPath.join(" > ",),),);

            const formsCell = row.insertCell();
            if (typeof node.வடிவு === "string") {
                formsCell.appendChild(document.createTextNode(node.வடிவு,),);
            } else if (node.வடிவு instanceof Set) {
                formsCell.appendChild(document.createTextNode(
                    Array.from(node.வடிவு,).join(", ",),
                ),);
            }
            return;
        }

        // If this node has children, recurse into them
        if (node.children && node.children instanceof Map) {
            node.children.forEach((childNode, childKey,) => {
                // Skip causativeFormsKey - it's handled separately
                if (childKey === causativeFormsKey) {
                    return;
                }
                const newLabelPath = [...labelPath, childNode.label,];
                traverseTree(childNode, newLabelPath,);
            },);
        }
    };

    // Handle different material types
    if (material instanceof Set) {
        // Causative forms: Set of tree structures
        material.forEach(tree => {
            traverseTree(tree, [],);
        },);
    } else if (material && typeof material === "object" && material.children) {
        // Base forms: tree structure
        traverseTree(material, [],);
    }
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
            return;
        }

        fillTable(causativeFormsTable, causativeForms,);
        causativeFormsTable.style.display = "table";
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
