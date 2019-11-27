const ItemController = require('../controller/InventoryController')

require('datatables.net')( window, $ );

function getItemCatalog(){
    const itemController = new ItemController();

    itemController.getItemsAndCategories().then(items=>{
        if(items.length > 0){
            items.forEach(element => {
                

                $("#tbodyStr").append(
                    "<tr>"+
                        "<td>"+element.itemId+"</td>"+
                        "<td>"+element.itemName+"</td>"+
                        "<td>"+element.itemBrand+"</td>"+
                        "<td>"+element.purchaseMeasureUnit+"</td>"+
                        "<td>"+element.consumptionMeasureUnit+"</td>"+
                        "<td>Un(a) "+element.purchaseMeasureUnit+" contiene "+element.conversionFactor+" "+element.consumptionMeasureUnit+"(s)"+"</td>"+
                        "<td>"+element.mainCategory+"</td>"+
                        "<td>"+element.secondaryCategory+"</td>"+
                        "<td>"+(element.tertiaryCategory ? element.tertiaryCategory: "")+"</td>"+
                        "<td>"+(element.quarternaryCategory ? element.quarternaryCategory:"")+"</td>"+
                    "</tr>"
                )
            });

            $("#table").dataTable();
        }else{
            alert("No se encontró nada.");
        }
    }).catch(err=>{
        alert("Hubo un error al recuperar los productos, favor de reportar");
    })
}

module.exports = {
    getItemCatalog: getItemCatalog
}