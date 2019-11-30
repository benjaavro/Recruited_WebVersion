const PurchaseOrderController = require('../controller/PurchaseOrderController.js')
const SectionAnimalHistoriy   = require('../controller/SectionAnimalHistoryController.js')

const dateAndTime   = require('../util/DateAndNumber.js')
const purchaseOrderIndexed = {};

function getUnauthorizedPurchaseOrders(tHeaderId,tBodyId){
    const purchaseOrderController = new PurchaseOrderController();

    purchaseOrderController.getUnauthorizedPurchaseOrders().then(
        unauthorizedOrders=>{
            if(unauthorizedOrders.length > 0){
                $("#"+tHeaderId).append(
                    "<tr>"+
                        "<th>N.o de orden de compra</th>"+
                        "<th>Centro de costos</th>"+
                        "<th>Fecha de petición</th>"+
                        "<th># de elementos</th>"+
                        "<th>Total</th>"+
                        "<th></th>"+
                        "<th></th>"+
                    "</tr>"
                );

                unauthorizedOrders.forEach(element => {
                    if(!purchaseOrderIndexed[element.parentPurchaseOrder]){
                        purchaseOrderIndexed[element.parentPurchaseOrder] = [];
                        $("#"+tBodyId).append(
                            "<tr id='row"+element.parentPurchaseOrder+"'>"+
                                "<td>"+element.parentPurchaseOrder+"</td>"+
                                "<td>"+element.costCenterName+"</td>"+
                                "<td>"+element["DATE(creationDate)"]+"</td>"+
                                "<td>"+element.unitsAcquired+"</td>"+
                                "<td>"+element.itemTotals+"</td>"+
                                "<td><button id='btn_pov_"+element.parentPurchaseOrder+"'  class='tbl-btn'>Ver detalle</button></td>"+
                                "<td><button id='bth_auth_"+element.parentPurchaseOrder+"' class='tbl-btn'>Autorizar</button></td>"+
                            "</tr>"
                        );
                    }

                    purchaseOrderIndexed[element.parentPurchaseOrder].push(element);
                });
            }else
                alert("No hay órdenes de compra sin autorizar");
        },err=>{
            console.log(err);
            alert("Hubo un error al obtener las órdenes de compra sin autorizar");
        }
    )
}

function displayPurchaseOrderDetail(purchaseOrderIndex){
    const selectedOrder = purchaseOrderIndexed[purchaseOrderIndex];

    $("#purchOrderNumber").val(selectedOrder[0].parentPurchaseOrder)    
    $("#vendorRfc").val(selectedOrder[0].vendorRfc)
    $("#elementQty").val(selectedOrder[0].unitsAcquired)
    $("#costCenter").val(selectedOrder[0].costCenterName)
    $("#creationDate").val(selectedOrder[0]["DATE(creationDate)"])
    $("#elementTotal").val(selectedOrder[0].itemTotals)

    $("#pobody").html("");

    selectedOrder.forEach(element=>{
        $("#pobody").append(
            "<tr>"+
                "<td>"+element.itemName+"</td>"+
                "<td>"+element.itemRequested+"</td>"+
                "<td>"+element.unitValueExpected+"</td>"+
                "<td>"+element.quantityRequested+"</td>"+
                "<td>"+element.total+"</td>"+
            "</tr>"
        )
    });

    $("#purchaseOrderDetail").removeClass('d-none');
}

function authorizePurchaseOrder(purchaseOrderId){
    const purchaseOrderController = new PurchaseOrderController();

    purchaseOrderController.authorizePurchaseOrder(purchaseOrderId).then(
        success=>{
            console.log(success);
            alert("Se ha autorizado la orden de compra!");
            $("#row"+purchaseOrderId).remove();
            $("#purchaseOrderDetail").addClass('d-none');
        },err=>{
            console.log(err);
            alert("Hubo un error al intentar realizar la autorización");
        }
    )
}

module.exports = {
    getUnauthorizedPurchaseOrders: getUnauthorizedPurchaseOrders,
    displayPurchaseOrderDetail: displayPurchaseOrderDetail,
    authorizePurchaseOrder: authorizePurchaseOrder
}