import { throwingGet, } from "./utils.js";
import { schema, getForms, } from "./vinay.js";

function refreshContent() {
    const verbElement = document.getElementById('verb',);
    if (! verbElement.checkValidity()) {
        return;
    }

    const verb = verbElement.value;

    let formsTable = document.getElementById("forms",);
    formsTable.deleteTHead();
    Array.from(formsTable.getElementsByTagName("tbody",),).forEach(tbody => tbody.remove());

    let headRow = formsTable.createTHead().insertRow();
    headRow.insertCell().appendChild(document.createTextNode("வகய்",),);
    schema.forEach(schemaItem => {
        headRow.insertCell().appendChild(document.createTextNode(schemaItem,),);
    });

    const forms = getForms(verb,);
    if (! forms.size) {
        return;
    }

    let bodyRow = formsTable.createTBody().insertRow();
    bodyRow.insertCell().appendChild(document.createTextNode(
        throwingGet(forms, "வகய்",),
    ),);
    schema.forEach(schemaItem => {
        bodyRow.insertCell().appendChild(document.createTextNode(
            throwingGet(forms, schemaItem,),
        ),);
    });

    return;
}

document.getElementById('submit',).addEventListener("click", refreshContent,);
document.getElementById('submit',).click();
