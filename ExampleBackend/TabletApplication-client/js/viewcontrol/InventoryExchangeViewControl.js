'use strict'


var ItemCardexController = require('../controller/ItemCardexController.js');
var dateAndNumber = require('../util/DateAndNumber.js');

var itemCardexController = new ItemCardexController();

function getInfoAtHeader(){
    const itemCardexHeader = {};

    //Getting properties
    itemCardexHeader.transactionType= $("#transactionType").val();

    if(itemCardexHeader.transactionType == 2)
        itemCardexHeader.transactionClass = 2;
    else if(itemCardexHeader.transactionType == 3)
        itemCardexHeader.transactionClass = 1;
    
    itemCardexHeader.transactionDate = dateAndNumber.getDateAndTime();
    itemCardexHeader.costCenterCode = $("#costCenterCode").val();
    
    itemCardexHeader.optionalCostCenterCode= $("#optionalCostCenter").val();

    if(!itemCardexHeader.costCenterCode){
        $("#costCenterCode").addClass('border-danger');
        $("#costCenterCodeFeedback").addClass('bg-danger');
        $("#costCenterCodeFeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return null;
    }
    else{
        $("#costCenterCode").removeClass('border-danger');
        $("#costCenterCodeFeedback").removeClass('bg-danger');
        $("#costCenterCodeFeedback").html("");
    }

    if(!itemCardexHeader.optionalCostCenterCode){
        $("#optionalCostCenter").addClass('border-danger');
        $("#optionalCostCenterFeedback").addClass('bg-danger');
        $("#optionalCostCenterFeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return null;
    }
    else{
        $("#optionalCostCenter").removeClass('border-danger');
        $("#optionalCostCenterFeedback").removeClass('bg-danger');
        $("#optionalCostCenterFeedback").html("");
    }

    if(!itemCardexHeader.transactionType){
        $("#transactionType").addClass('border-danger');
        $("#transactionTypeFeedback").addClass('bg-danger');
        $("#transactionTypeFeedback").html("<p>Por favor seleccione un tipo de transacción</p>");

        return null;
    }
    else{
        $("#transactionType").removeClass('border-danger');
        $("#transactionTypeFeedback").removeClass('bg-danger');
        $("#transactionTypeFeedback").html("");
    }

    itemCardexHeader.vendorRfc = "";
    itemCardexHeader.documentId= "";
    itemCardexHeader.documentDate="";
    itemCardexHeader.transactionDesc="";

    itemCardexHeader.totalAmt = $("#totalAmt").val();
    itemCardexHeader.totalCash= $("#totalCash").val();

    console.log(itemCardexHeader);

    return itemCardexHeader;
}

function performExchange(tableRowManipulator,rows,ids,inventory){
    const itemCardexHeader = getInfoAtHeader();
    let entryCount = 0;

    console.log(inventory);
    
    if(!itemCardexHeader){
        alert("Revise los datos introducidos");
        return;
    }

    if(itemCardexHeader.costCenterCode == itemCardexHeader.optionalCostCenterCode){
        alert("No puedes seleccionar el mismo centro de costos");
        return;
    }

    //Obtain the data at the rows using the table manipulator passed
    //as parameter
    const itemData = tableRowManipulator.extractTableContents(rows,ids);

    let pass = true;

    console.log(itemData);
    
    //This sequence is used to "group" the transference inside the database
    let docid = "EX-"+itemCardexHeader.costCenterCode+"-"+itemCardexHeader.transactionDate;

    //Indistinct total of items
    itemData.forEach((item,index)=> {
        item.valueInTransaction = inventory[item.productName].currentUnitAverage*item.unitsInTransaction;

        item.costCenterCode = itemCardexHeader.costCenterCode;
        item.optionalCostCenterCode= itemCardexHeader.optionalCostCenterCode;

        item.transactionType = itemCardexHeader.transactionType;
        item.transactionClass= itemCardexHeader.transactionClass;
        item.transactionDate = itemCardexHeader.transactionDate;
        item.optionalGroupingCode = docid;

        entryCount+=parseInt(item.unitsInTransaction);

        $("#transactionResult"+(index+1)).val(parseInt(item.currentExistance) - parseInt(item.unitsInTransaction));

        if(parseInt(item.currentExistance) < parseInt(item.unitsInTransaction)){
            $("#unitsInTransaction"+(index+1)).addClass('bg-danger');
            pass = false;
        }else{
            $("#unitsInTransaction"+(index+1)).removeClass('bg-danger');
        }
    }); 

    if (!pass) {
        alert("Revise las cantidades en transferencia");
        return;
    }

    $("#itemTotal").val(entryCount);
    
    itemCardexController.saveCardexEntries(itemData).then(
        success=>{
            alert("Se realizó la transferencia correctamente, guarde el n.o de transferencia");
            $("#exitNumber").val(docid);
        },err=>{
            alert("Hubo un error al realizar la transferencia");
            console.log(err);
            $("#transferenceDetailBody").addClass('d-none');
        }
    )
}

module.exports = {
    performExchange: performExchange,
    itemCardexController: itemCardexController
}