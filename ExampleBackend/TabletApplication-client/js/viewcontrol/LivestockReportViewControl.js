'use strict'

const ItemCardexController = require('../controller/CowCardexController.js')
const ViewControlUtils = require('../util/ViewControlUtils.js')
const DateAndNumber = require('../util/DateAndNumber')
const numeral = require('numeral')


require('datatables.net')( window, $ );

const itemCardexController = new ItemCardexController();

function consultItemCardex(id){
    ViewControlUtils.clearMessageDialog('#feedback');

    const response = itemCardexController.getCowForId(id).then(
        success=>{
            if(success.length>0){
                let filter = {};
                let mainCategories = {};

                success.sort((a,b)=>{
                    if(a.animalCardexId > b.animalCardexId) return -1;
                    if(a.animalCardexId < b.animalCardexId) return 1;

                    return 0;
                });

                $("#name").html(success[0].animalName);
                $("#race").html(success[0].race);
                $("#gender").html(success[0].gender);
                $("#status").html(success[0].currentStatus);

                success.forEach(element => {
                    if(element.itemLevel == 0){
                        $("#tableBody").append(
                            "<tr>"+
                            "<td>"+DateAndNumber.formatDate(new Date(element.transactionDate))+"</td>"+
                            "<td>"+element.itemCardexItemCode+"</td>"+
                            "<td>"+element.itemName+"</td>"+
                            "<td class='text-right'>"+numeral(element.totalOfCashEnteringOrExitingPerUnit).format('$0,0.00')+"</td>"+
                            "<td class='text-right'>"+numeral(element.currentAnimalValue).format('$0,0.00')+"</td>"+
                            "</tr>"
                        )

                        if(!mainCategories[element.categoryName]){
                            mainCategories[element.categoryName] = {}
                            mainCategories[element.categoryName].catVal = 0;
                        }

                        mainCategories[element.categoryName].catVal+=parseFloat(element.totalOfCashEnteringOrExitingPerUnit);
                    }
                });

                Object.keys(mainCategories).forEach(key=>{
                    $("#tblbody").append(
                        "<tr>"+
                            "<td>"+key+"</td>"+
                            "<td>"+numeral(mainCategories[key].catVal).format('$0,0.00')+"</td>"+
                        "</tr>"
                    )
                })

                $("#table").removeClass('d-none');
                $("#table1").removeClass('d-none');
                $("#table").DataTable({"order": [[ 0, "desc" ]]});
                $("#cowData").removeClass('d-none');
                $("#cowData2").removeClass('d-none');

            }else{  
                alert("La vaca no ha tenido movimientos");
            }
        },err=>{
            console.log(err);
            alert("Hubo un error...");
        }
    )
}

module.exports={
    getAnimalCardex : consultItemCardex
}