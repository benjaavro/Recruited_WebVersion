const dates = require('../util/DateAndNumber.js')
const CardexController = require('../controller/ItemCardexController.js')
const CowCardexController = require('../controller/CowCardexController.js')
const CowController = require('../controller/CowController.js')

function cowCardexNew(cows,distFactor,incrementValueFactor,refCdxObj){
    let res = cows.map((item)=>{
        item.animalEarringId = item.earringId;
        item.transactionDate = dates.getDateAndTime();
        item.movementClass = 1;
        item.transactionTypeId = 4; //HARDCODED, ID reps @ DB "Bulk feeding action"
        item.cashPerUnit = refCdxObj.currentUnitAverage;
        item.unitsEnteringOrExiting = distFactor;
        item.totalOfCashEnteringOrExitingPerUnit = incrementValueFactor,
        item.itemCardexId = refCdxObj.cardexId;
        item.itemCardexItemCode = refCdxObj.itemCode;
        item.currentValueOfUnitsAtAnimal = incrementValueFactor;
        item.transactionDetail = "Alimentación prorrateable en: "
                                +item.animalSectionId+" con producto: "
                                +refCdxObj.itemCode;

        return item;
    });
    return res;
}

function reduceUserInventory(reduceableUserInventory,msgToPass,disablerId,reductionFactor){
    const cardexController = new CardexController();
    const fieldId = "#amtfn_"+disablerId.split("_")[1];

    let red = {};

    console.log(reductionFactor);
    
    Object.keys(reduceableUserInventory).forEach(prop=>{
        red[prop] = reduceableUserInventory[prop];
    });

    red.unitsInTransaction = reductionFactor;
    red.valueInTransaction = parseFloat(reductionFactor)*parseFloat(reduceableUserInventory.currentUnitAverage);
    red.valuePerUnit       = parseFloat(reduceableUserInventory.currentUnitAverage);
    red.currentUnitAverage = parseFloat(reduceableUserInventory.currentUnitAverage);
    red.transactionClass   = 2;
    red.transactionType    = 4;
    red.transactionDate    = dates.getDateAndTime();
    red.transactionDesc    = "Alimentacion";

    console.log("CURR:");
    console.log(red);
    console.log("PREV:");
    console.log(reduceableUserInventory);
    
   // aaa.eee
    cardexController.createCardexEntry(red,reduceableUserInventory).then(
        success=>{
            $("#"+disablerId).attr("disabled", true);
            $(fieldId).html(reduceableUserInventory.unitsInTransaction-red.unitsInTransaction);
            $("#feedback").append("<span class='alert alert-success white'>"+msgToPass+"</span><br><br>");
        },err=>{
            console.log(err);
            $("#feedback").append("<span class='alert alert-danger'>Se registró la alimentación, pero hubo un error en cancelar sus movimientos.</span><br>");
        }
    )
}

function saveCowCardexes(cowCardexController,toSaveCowCardex,reduceableInv,disablerId,reductionFactor){
    const response = cowCardexController.createCowCardexes(toSaveCowCardex);
    console.log(response);
    if(response.status === 1){
        reduceUserInventory(reduceableInv,response.message,disablerId,reductionFactor);
    }else{
        $("#feedback").append("<span class='alert alert-danger white'>Hubo un error, favor de reportar</span><br><br>");
    }
}

function feedCow(lookedObj,id,section){
    const cowCardexController = new CowCardexController();
    const cowController       = new CowController();

    console.log(id);
    
    const fieldId = "#amt_"+id.split("_")[1];
    //1. Get cows at section
    cowController.getCowsForSection(section).then(
        succCowsSect=>{
            if(succCowsSect.length > 0){
                //Start calculations
                //Get data @ screen
                let unitsInTransaction = parseInt($(fieldId).val());
                let distributionFactor   = unitsInTransaction/succCowsSect.length; //This gets the amt to mult the unit val to get how much was applied to animal
                let incrementValueFactor = distributionFactor*lookedObj.currentUnitAverage;

                let saveable = cowCardexNew(succCowsSect,distributionFactor,incrementValueFactor,lookedObj);
            
                //TODO SAVE
                saveCowCardexes(cowCardexController,saveable,lookedObj,id,unitsInTransaction);
            }else{
                $("#feedback").append("<span class='alert alert-warning'>No hay vacas en la sección.</span><br>");
            }
        },errCowsSect=>{
            console.log(errCowsSect);
        }
    )
}

module.exports = {
    applyItemAtAnimal : feedCow
}