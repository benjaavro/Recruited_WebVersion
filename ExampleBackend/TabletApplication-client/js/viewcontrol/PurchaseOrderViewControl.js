const PurchaseOrderController = require('../controller/PurchaseOrderController.js')
const dateAndNumber = require('../util/DateAndNumber.js');

function getHead(){
    var poh = {};
    poh.purchaseOrderId = Date.now();

    poh.costCenterId = $("#costCenterId").val();
    poh.vendorRfc = $("#vendorRfc").val();
    poh.creationDate = dateAndNumber.getDateAndTime();
    poh.currency = $("#currency").val();
    poh.unitsAcquired = orderCt;
    poh.total = orderTotal;

    if(!poh.costCenterId){
        $("#costCenterId").addClass('border-danger');
        $("#costCenterIdFeedback").addClass('bg-danger');
        $("#costCenterIdFeedback").html("<p>Por favor seleccione un centro de costos</p>");

        return null;
    }
    else{
        $("#costCenterId").removeClass('border-danger');
        $("#costCenterIdFeedback").removeClass('bg-danger');
        $("#costCenterIdFeedback").html("");
    }

    if(!poh.vendorRfc){
        $("#vendorRfc").addClass('border-danger');
        $("#vendorRfcFeedback").addClass('bg-danger');
        $("#vendorRfcFeedback").html("<p>Por favor digite el RFC</p>");

        return null;
    }
    else{
        $("#vendorRfc").removeClass('border-danger');
        $("#vendorRfcFeedback").removeClass('bg-danger');
        $("#vendorRfcFeedback").html("");
    }

    return poh;
}

function save(tableRows,rowsT){
    const head = getHead();
    const purchaseOrderController = new PurchaseOrderController();

    console.log(head);
    
    if(!head){
        alert("Revise los datos introducidos");
        return;
    }

    const items = tableRows.extractTableContents(rowsT,['itemRequested','productName','unitValueExpected','quantityRequested','total']);

    console.log(items);

    purchaseOrderController.savePurchaseOrderHead(head).then(
        success=>{
            console.log(success);

            let array = [];     //Data to accrue

            items.forEach(function(element){
                element.parentPurchaseOrder = head.purchaseOrderId;
                element.purchaseOrderCostCenter = head.costCenterId;

                let tmp = [element.parentPurchaseOrder,element.purchaseOrderCostCenter,
                            element.purchaseOrderDetailcol,element.itemRequested,
                            element.unitValueExpected,element.quantityRequested,element.total];
                array.push(tmp);
            });

            console.log(array);

            purchaseOrderController.savePurchaseOrderDetail(array).then(
                succ=>{
                    console.log(succ);
                    $("#transactId").val(head.purchaseOrderId);

                    items.forEach(function(ee,idx){
                        $("#tr"+(idx+1)).addClass('alert alert-success');
                    })
                    
                    alert("Se ha guardado la orden de compra correctamente, guarde el n.o de transacción");
                    accepting = false;
                },err=>{
                    console.log(err);
                    alert("Hubo un error de guardado");
              //      accepting = false;
                }
            )

        },err=>{
            console.log(err);
            alert("Hubo un error de guardado");
            //accepting = false;
        }
    )
}

module.exports = {
    createPurchaseOrder: save
}