function refreshContent() {
    const verbElement = document.getElementById('verb',);
    if (! verbElement.checkValidity()) {
        return false;
    }

    const verb = verbElement.value;

    var formsTable = document.getElementById("forms",);

    const formsCount = formsTable.rows[0].cells.length;
    if (formsTable.rows.length > 2) {
        throw new Error(`Unexpected state with more than one data row in the table.`,);
    }

    if (formsTable.rows.length === 2) {
        formsTable.deleteRow(1,);
    }

    let newRow = formsTable.insertRow();

    const newForms = getForms(verb,);

    if (newForms.length !== formsCount) {
        throw new Error(`Algorithm generated an unexpected number of forms for verb: ${verb}.`,);
    }

    newForms.forEach(form => {
        let newCell = newRow.insertCell();
        newCell.appendChild(document.createTextNode(form,),);
    });
}

function getForms(verb,) {
    const formsCount = document.getElementById("forms"),.rows[0].cells.length;

    return new Array(formsCount,).fill(verb,);
}
