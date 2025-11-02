import { schema, verbClasses, validVerbClasses, getForms, causativeFormsKey, } from "../lib/ilakkanam.js";

// Helper function to build hierarchical table structure recursively
const buildTableStructure = (schemaItems = schema.children, parentKey = "",) => {
    const result = [];
    for (const [key, item,] of schemaItems) {
        const fullKey = parentKey ? `${parentKey}_${key}` : key;

        if (item.children) {
            result.push({
                label: item.label,
                key: fullKey,
                children: buildTableStructure(item.children, fullKey,),
            },);
        } else {
            result.push({
                label: item.label,
                key: fullKey,
            },);
        }
    }
    return result;
};

// Helper to find the depth of the deepest leaf descendant starting from currentDepth
const getDeepestLeafDepth = (item, currentDepth,) => {
    if (! item.children || item.children.length === 0) {
        return currentDepth;
    }
    return Math.max(...item.children.map(child => getDeepestLeafDepth(child, currentDepth + 1,),),);
};

// Helper function to count total nodes in structure (for row count)
const countNodes = structure => {
    let count = 0;
    structure.forEach(item => {
        count += 1;
        if (item.children) {
            count += countNodes(item.children,);
        }
    },);
    return count;
};

const fillTable = (table, material,) => {
    table.deleteTHead();
    Array.from(table.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

    const structure = buildTableStructure();

    // Determine if we have single or multiple materials
    const materialsArray = Array.isArray(material,) ? material : [material,];

    // Create header row with "இனம்" labels
    const thead = table.createTHead();
    const headerRow = thead.insertRow();

    // First cell is empty (or could be a label for the form column)
    headerRow.insertCell();

    // Add header cells for each material's "இனம்"
    materialsArray.forEach(mat => {
        const headerCell = headerRow.insertCell();
        headerCell.appendChild(document.createTextNode(mat.get("இனம்",) || "",),);
    },);

    // Create tbody and build rows
    const tbody = table.createTBody();

    // Count total nodes to determine row count
    const totalRows = countNodes(structure,);
    const rows = [];
    for (let i = 0; i < totalRows; i++) {
        rows.push(tbody.insertRow(),);
    }

    // Build table by traversing structure once, building labels and data together
    let currentRowIndex = 0;
    const buildRows = (items, depth,) => {
        items.forEach(item => {
            const row = rows[currentRowIndex];

            if (item.children) {
                // Parent node: add label cell with rowSpan
                const labelCell = row.insertCell();
                labelCell.appendChild(document.createTextNode(item.label,),);
                const deepestLeafDepth = getDeepestLeafDepth(item, depth,);
                const rowsToSpan = deepestLeafDepth - depth;
                if (rowsToSpan > 0) {
                    labelCell.rowSpan = rowsToSpan + 1;
                }
                // Move to next row and process children
                currentRowIndex += 1;
                // Process children
                buildRows(item.children, depth + 1,);
            } else {
                // Leaf node: add label cell and data cells
                const labelCell = row.insertCell();
                labelCell.appendChild(document.createTextNode(item.label,),);

                // Add data cells for each material
                materialsArray.forEach(mat => {
                    const forms = mat.get(item.label,);
                    const cell = row.insertCell();
                    if (forms) {
                        cell.appendChild(document.createTextNode(
                            [...forms,].join(", ",),
                        ),);
                    } else {
                        cell.appendChild(document.createTextNode("",),);
                    }
                },);
                currentRowIndex += 1;
            }
        },);
    };

    buildRows(structure, 0,);
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

        const causativeForms = forms.get(causativeFormsKey,);
        if (! causativeForms) {
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
