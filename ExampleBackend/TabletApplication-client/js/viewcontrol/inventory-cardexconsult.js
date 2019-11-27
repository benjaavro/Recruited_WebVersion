'use strict'

const ItemCardexController = require('../controller/ItemCardexController')
const ViewControlUtils = require('../util/ViewControlUtils.js')
const numeral = require('numeral')

require('datatables.net')( window, $ );

const itemCardexController = new ItemCardexController();

const transactionCls = ['Entrada','Salida'];

function createTable(resultSet){
    //Destroy previous datatable
    if ($.fn.DataTable.isDataTable('#table')){
        var table = $('#table').DataTable();
        table.destroy();
    }

    $("#tableBody").html("");
    resultSet.forEach(element => {
        let transactionClass = transactionCls[element.transactionClass-1];
        $("#tableBody").append(
            "<tr>"+
                "<td>"+element.itemCode+"</td>"+
                "<td>"+element.itemName+"</td>"+
                "<td>"+transactionClass+"</td>"+
                "<td>"+element.transactionName+"</td>"+
                "<td>"+element.transactionDate+"</td>"+
                "<td class='text-right'>"+numeral(element.accruedAverageAmount).format('0,0')+"</td>"+
                "<td class='text-right'>"+numeral(element.accruedAverageValue).format('$0,0.00')+"</td>"+
                "<td class='text-right'>"+numeral(element.currentUnitAverage).format('$0,0.00')+"</td>"+
            "</tr>"
        )
        console.log(numeral(element.currentUnitAverage));
    });

    $("#table").removeClass('d-none');
    $("#table").DataTable();
}

//TODO ADD LOGIC TO SHOW ONLY LATEST FOR ITEM
function createResultsTable(resultSet){

}

function getCardexPerCostCenter(costCenter,dateFrom,dateTo){
    ViewControlUtils.clearMessageDialog('#feedback');

    if(dateFrom){
        itemCardexController.getCardexEntriesPerCostCenter(costCenter,dateFrom,dateTo).then(
            success=>{
                console.log(success);
                if(success || success.length > 0){
                    createTable(success);
                }else{
                    ViewControlUtils.showMessageDialog('#feedback','No se encontraron resultados.');
                }
            },err=>{
                console.log(err);
                ViewControlUtils.showMessageDialog('#feedback','Hubo un error con la base de datos. Favor de reportar.');
            }
        )
    }else{
        itemCardexController.getInventoryPerSe(costCenter,dateTo).then(
            success=>{
                console.log(success);
                if(success || success.length > 0){
                    createTable(success);
                }else{
                    ViewControlUtils.showMessageDialog('#feedback','No se encontraron resultados.');
                }
            },err=>{
                console.log(err);
                ViewControlUtils.showMessageDialog('#feedback','Hubo un error con la base de datos. Favor de reportar.');
            }
        )
    }
}

module.exports = {
    getCardexPerCostCenter:getCardexPerCostCenter
}
