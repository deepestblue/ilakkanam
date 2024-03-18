import { throwingGet, } from "./utils.js";
import { schema, getForms, vinayinangal, } from "./main.js";

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

(select => Array.from(vinayinangal,).sort().forEach(vinayinam => {
    const option = document.createElement("option");
    option.text = vinayinam.inattuppeyar;
    select.appendChild(option);
},))(document.getElementById("verbClass",),);

document.getElementById("submit",).addEventListener("click", refreshContent,);
document.getElementById("submit",).click();
