function refreshContent() {
    const verbElement = document.getElementById('verb');
    if (! verbElement.checkValidity()) {
        return false;
    }

    const verb = verbElement.value;

    var formsTable = document.getElementById("forms");

    if (formsTable.rows.length > 1) {
        formsTable.deleteRow(1);
    }

    let newRow = formsTable.insertRow();
    let newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode(verb));
}
