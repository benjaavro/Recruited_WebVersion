const ItemCardexController = require('../controller/ItemCardexController')
const PurchaseOrderController= require('../controller/PurchaseOrderController')

const viewUtils = require('../util/ViewControlUtils')
const dateAndNumber = require('../util/DateAndNumber')

var rowsInserted = 0;
var purchaseOrderReceived= {};

function getPurchaseOrder(purchaseOrderCode,tableRowManipulator){
    const purchaseOrderController = new PurchaseOrderController();

    viewUtils.clearMessageDialog("#feedback");

    purchaseOrderController.getPurchaseOrderForNumber(purchaseOrderCode).then(purchaseOrder=>{
        if(purchaseOrder.length > 0){
            console.log(purchaseOrder);
            
            purchaseOrder.forEach((element,index) => {
                purchaseOrderReceived[element.itemRequested] = element;
                
                tableRowManipulator.appendRow((index+1));
                
                $("#productName"+(index+1)).val(element.itemName);
                $("#itemCode"+(index+1)).val(element.itemRequested);
                $("#unitsInTransaction"+(index+1)).val(element.quantityRequested);
            });

            rowsInserted = purchaseOrder.length;
            
            $("#vendorRfc").val(purchaseOrder[0].vendorRfc);
            $("#invoiceBody").removeClass('d-none');
        }else{
            viewUtils.showMessageDialog("#feedback","No se encontraron artículos bajo esta orden de compra");    
        }
    }).catch(err=>{
        console.log(err);
        viewUtils.showMessageDialog("#feedback","Hubo un error al ejecutar la consulta.");
    })
}

function createHeader(){
    let header = {};

    header.costCenterCode = $("#costCenterCode").val(); //req
    header.vendorRfc = $("#vendorRfc").val(); //req
    header.documentId= $("#documentId").val();
    header.documentDate= $("#documentDate").val();
    
    header.transactionClass=1;
    header.transactionType=$("#transactionType").val(); //req
    header.transactionDesc=$("#transactionDesc").val();
    header.transactionDate= dateAndNumber.getDateAndTime();
    
    header.uuidCFDI = $("#uuidCFDI").val();
    header.invoiceTotal = $("#invoiceTotal").val(); //req
    header.subTotal = $("#subTotal").val();  //req
    header.vat = $("#vat").val(); //req
    

    if(!header.documentDate){
        header.documentDate = null;
    }
    if(!header.documentId){
        header.documentId = null;
    }

    //Check for required properties
    if(!header.costCenterCode){
        $("#costCenterCode").addClass('border-danger');
        $("#costCenterCodeFeedback").addClass('bg-danger');
        $("#costCenterCodeFeedback").html("<p>Por favor seleccione un centro de costos</p>");
        
        return null;
    }else{
        $("#costCenterCode").removeClass('border-danger');
        $("#costCenterCodeFeedback").removeClass('bg-danger');
        $("#costCenterCodeFeedback").html("");
    }

    if(!header.vendorRfc){
        $("#vendorRfc").addClass('border-danger');
        $("#vendorRfcFeedback").addClass('bg-danger');
        $("#vendorRfcFeedback").html("<p>Por favor digite el RFC del proveedor.</p>");
        
        return null;
    }else{
        $("#vendorRfc").removeClass('border-danger');
        $("#vendorRfcFeedback").removeClass('bg-danger');
        $("#vendorRfcFeedback").html("");
    }

    if(!header.transactionType){
        $("#transactionType").addClass('border-danger');
        $("#transactionTypeFeedback").addClass('bg-danger');
        $("#transactionTypeFeedback").html("<p>Por favor seleccione el tipo de transacción</p>");
        
        return null;
    }else{
        $("#transactionType").removeClass('border-danger');
        $("#transactionTypeFeedback").removeClass('bg-danger');
        $("#transactionTypeFeedback").html("");
    }

    if(!header.invoiceTotal){
        $("#invoiceTotal").addClass('border-danger');
        $("#invoiceTotalFeedback").addClass('bg-danger');
        $("#invoiceTotalFeedback").html("<p>Por favor introduzca el total de la transacción</p>");
        
        return null;
    }else{
        $("#invoiceTotal").removeClass('border-danger');
        $("#invoiceTotalFeedback").removeClass('bg-danger');
        $("#invoiceTotalFeedback").html("");
    }

    if(!header.subTotal){
        $("#subTotal").addClass('border-danger');
        $("#subTotalFeedback").addClass('bg-danger');
        $("#subTotalFeedback").html("<p>Por favor introduzca el subtotal de la transacción</p>");
        
        return null;
    }else{
        $("#subTotal").removeClass('border-danger');
        $("#subTotalFeedback").removeClass('bg-danger');
        $("#subTotalFeedback").html("");
    }

    if(!header.vat){
        $("#vat").addClass('border-danger');
        $("#vatFeedback").addClass('bg-danger');
        $("#vatFeedback").html("<p>Por favor introduzca el I.V.A de la transacción</p>");
        
        return null;
    }else{
        $("#vat").removeClass('border-danger');
        $("#vatFeedback").removeClass('bg-danger');
        $("#vatFeedback").html("");
    }

    //If transaction has purchase order, check it
    if(header.transactionType == 9 || header.transactionType == 10){
        let po = $("#exitNumber").val();

        if(!po){
            $("#exitNumber").addClass('border-danger');
            $("#exitNumberFeedback").addClass('bg-danger');
            $("#exitNumberFeedback").html("<p>El tipo de transacción que usted seleccionó implica una orden de compra.<br> Por favor introduzca el número de orden de compra.</p>");
          
            return null;
        }else{
            $("#exitNumber").removeClass('border-danger');
            $("#exitNumberFeedback").removeClass('bg-danger');
            $("#exitNumberFeedback").html("");

            header.referencePurchaseOrder = po;
        }
    }

    return header;
}

function getDataAtRows(tableRowManipulator,header,rowsInserted,idSet,inventory){
    const itemData = tableRowManipulator.extractTableContents(rowsInserted,idSet);
    
    console.log(inventory);
    
    itemData.forEach(function(element){
        console.log(element);
        
        const _inventory = inventory[element.productName];

        console.log(_inventory);
        

        element.expirationControl = _inventory.expirationControl;
        element.unitsInTransaction = _inventory.conversionFactor*element.unitsInTransaction;

        element.valueInTransaction = element.subtotal;
        element.costCenterCode = header.costCenterCode;
        element.transactionClass = header.transactionClass;
        element.transactionType = header.transactionType;
        element.transactionDate = header.transactionDate;
    })

    return itemData;
}

function checkPurchaseOrderIsCorrect(captureData){
    let valuesCoinceded = true;

    captureData.forEach(element => {
        const poItem = purchaseOrderReceived[element.itemCode];

        if(poItem > element.unitsInTransaction){
            $("#exitNumber").addClass('border-danger');
            valuesCoinceded = false;
        }else{
            $("#exitNumber").removeClass('border-danger');
        }
    });

    return valuesCoinceded;
}

function saveReception(tableRowManipulator,rowsN,idSet,itemInventory){
    const header = createHeader();
    var rows = 0;

    if(rowsInserted == 0){
        rows = rowsN;
    }else{
        rows = rowsInserted+1;
    }

    if(!header){
        alert("Revise los datos introducidos!");
        return;
    }

    const rowData = getDataAtRows(tableRowManipulator,header,rows,idSet,itemInventory);
    
    console.log(header);
    console.log(rowData);
    
    //Purchase Order transaction type?
    if(header.transactionType == 9 || header.transactionType == 10){
        //Create purchase Order ids list to update
        let poidSet = rowData.filter(item=>{
            //Item on user input is present at purchase order and item has more than zero units in transaction?
            return (purchaseOrderReceived[item.itemCode] && item.unitsInTransaction > 0);
        }).map(filteredItem=>{
            return purchaseOrderReceived[filteredItem.itemCode].podId;
        });

        //All items at purchase order where present at items captured by user
        if(poidSet.length == Object.keys(purchaseOrderReceived).length)
            header.depleteOrder = 'FULL';
        else
            header.depleteOrder = 'PART';
        
        header.ids = poidSet;

        //Check this was worth

        if(!checkPurchaseOrderIsCorrect(rowData)){
            alert("No puede introducir más elementos que los establecidos en la órden de compra");
            return;
        }
    }

    //Prepare payload
    const payload = [header,rowData];

    //Send payload
    const itemCardexController = new ItemCardexController();

    console.log(itemInventory);
    
    itemCardexController.fullItemTransaction(payload).then(
        success=>{
            console.log(success);
            alert("Se ha guardado la transacción exitosamente!");
        },err=>{
            console.log(err);
            alert("Hubo un error al procesar la petición");
        }
    )
}

module.exports = {
    saveItemReception: saveReception,
    getReceptionHeader: createHeader,
    getPurchaseOrder: getPurchaseOrder
}