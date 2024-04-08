import { throwingGet, } from "./utils.js";
import { schema, getForms, } from "./main.js";
import { vinayinattuppeyargal, validVinayinattuppeyargal, } from "./vinayinam.js";

function refreshContent() {
    const verbElement = document.getElementById('verb',);
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

    let formsTable = document.getElementById("forms",);
    formsTable.deleteTHead();
    Array.from(formsTable.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove(),);

    let headRow = formsTable.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("இனம்",),);
    Array.from(schema.keys(),).forEach(schemaItem => {
        headRow.insertCell().appendChild(document.createTextNode(schema.get(schemaItem,),),);
    });

    let verbClass;
    if (document.getElementById("verbClass",).selectedIndex != 0) {
        verbClass = document.getElementById("verbClass",).value;
    }

    try {
        const forms = getForms(verb, verbClass,);
        if (! forms.size) {
            return;
        }

        let bodyRow = formsTable.createTBody().insertRow();
        bodyRow.insertCell().appendChild(document.createTextNode(
            throwingGet(forms, "இனம்",),
        ),);
        Array.from(schema.keys(),).forEach(schemaItem => {
            bodyRow.insertCell().appendChild(document.createTextNode(
                throwingGet(forms, schemaItem,),
            ),);
        },);
    } catch (e) {
        window.alert(e.message);
    };
}

(select => Array.from(vinayinattuppeyargal,).sort().forEach(inattuppeyar => {
    const option = document.createElement("option");
    option.text = inattuppeyar;
    select.appendChild(option);
},))(document.getElementById("verbClass",),);

document.getElementById("submit",).addEventListener("click", refreshContent,);
document.getElementById("verb",).addEventListener("focus", (_unused) => {
    Array.from(document.getElementById("verbClass").options).forEach((option) => {
        option.disabled = false;
    });
});
document.getElementById("verb",).addEventListener("blur", (event) => {
    if (! event.target.checkValidity()) {
        return;
    }

    const verbClassSelect = document.getElementById("verbClass",);
    const validVerbClassNames = validVinayinattuppeyargal(event.target.value);
    Array.from(verbClassSelect.options).forEach((option) => {
        if (option.index == 0) {
            // தேர்ந்த வினயது இனம் label
            return;
        }
        if (! validVerbClassNames.includes(option.value)) {
            option.disabled = true;
        }
    });

    if (verbClassSelect.options[verbClassSelect.selectedIndex].disabled) {
        verbClassSelect.selectedIndex = 0;
    }
});

document.getElementById("submit",).click();
