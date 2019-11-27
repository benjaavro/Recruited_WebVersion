'use strict'
const ItemCardexController = require('../controller/ItemCardexController.js');
const dateAndNumber = require('../util/DateAndNumber.js');

const itemCardexController = new ItemCardexController();

var items = {};

function displayReceivedItems(receivedItems) {
    let accrued = 0;

    receivedItems.forEach((element,index)=>{
        tableRows.appendRow((index+1));

        accrued+=parseInt(element.unitsInTransaction);

        $("#productName"+(index+1)).val(element.itemName);
        $("#itemCode"+(index+1)).val(element.itemCode);
        $("#lotNumber"+(index+1)).val(element.lotNumber);
        $("#unitsInTransaction"+(index+1)).val(element.unitsInTransaction);
        
        items[element.itemCode] = element;
    });

    items.count = receivedItems.length;

    $("#itemTotal").val(accrued);
    $("#optionalCostCenter").val(receivedItems[0].optionalCostCenterCode);
}

function getCardexEntriesForExitNumber(){
    const documentId = $("#exitNumber").val();
    const costCenterCode= $("#costCenterCode").val();

    if(documentId == "" || !documentId){
        $("#exitNumber").addClass('border-danger');
        $("#exitNumberfeedback").addClass('bg-danger');
        $("#exitNumberfeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return;
    }
    $("#exitNumber").removeClass('border-danger');
    $("#exitNumberfeedback").removeClass('bg-danger');
    $("#exitNumberfeedback").html("");

    if(!costCenterCode)
    {
        $("#costCenterCode").addClass('border-danger');
        $("#costCenterCodefeedback").addClass('bg-danger');
        $("#costCenterCodefeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return;
    }
    $("#costCenterCode").removeClass('border-danger');
    $("#costCenterCodefeedback").removeClass('bg-danger');
    $("#costCenterCodefeedback").html("");

    itemCardexController.getCardexEntriesPerExitNumber(documentId,costCenterCode)
    .then(itemEntries=>{
        console.log(itemEntries);
        displayReceivedItems(itemEntries);
    })
    .catch(err=>{
        console.log(err);
        alert("Hubo un error al realizar la búsqueda");
    })
}

function saveReception(tableRows,ids){
    const costCenterCode = $("#optionalCostCenter").val();
    const transactionType= $("#transactionType").val();
    const transactionDate = dateAndNumber.getDateAndTime();
    const optionalCostCenter= $("#costCenterCode").val();

    if(!costCenterCode){
        $("#optionalCostCenter").addClass('border-danger');
        $("#optionalCostCenterfeedback").addClass('bg-danger');
        $("#optionalCostCenterfeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return;
    }
    $("#optionalCostCenter").removeClass('border-danger');
    $("#optionalCostCenterfeedback").removeClass('bg-danger');
    $("#optionalCostCenterfeedback").html("");

    if(!transactionType){
        $("#transactionType").addClass('border-danger');
        $("#transactionTypefeedback").addClass('bg-danger');
        $("#transactionTypefeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return;
    }
    $("#transactionType").removeClass('border-danger');
    $("#transactionTypefeedback").removeClass('bg-danger');
    $("#transactionTypefeedback").html("");
    
    const optGroupCode   = 'IN-'+costCenterCode+'-'+(transactionDate.replace(' ',''));

    //Extract table contents
    const userModifiedInput = tableRows.extractTableContents(items.count+1,ids);

    console.log(userModifiedInput);
    
    userModifiedInput.forEach(item=>{
        item.costCenterCode = costCenterCode;
        item.optionalCostCenterCode = optionalCostCenter;
        item.transactionDate = transactionDate;
        item.transactionClass= 1;
        item.transactionType = transactionType;
        item.optionalGroupingCode = optGroupCode;

        //Calculate value in transaction if there was a reduction
        item.valuePerUnit = items[item.itemCode].currentUnitAverage;
        item.valueInTransaction = item.valuePerUnit*item.unitsInTransaction;

        item.lotNumber = items[item.itemCode].lotNumber;

        item.payload = items[item.itemCode].childCardexId;  //This value is to be used by backend for another transaction dance
    })

    //Only items whose units in transaction where greater than zero are to be saved
    const receptionItems = userModifiedInput.filter(item=>{
        return (item.unitsInTransaction > 0);
    });

    itemCardexController.saveReceivedItems(receptionItems)
    .then(success=>{
        alert("Se ha guardado exitosamente la transacción");
        $("#saveBtn").attr('disabled',true);
    })
    .catch(err=>{
        console.log(err);
        alert("Hubo un error al guardar la recepción");
    })
}

module.exports = {
    getCardexEntriesForExitNumber: getCardexEntriesForExitNumber,
    save:saveReception
}