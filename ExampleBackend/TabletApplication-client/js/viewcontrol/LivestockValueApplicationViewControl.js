const dates = require('../util/DateAndNumber.js')

const CowCardexController = require('../controller/CowCardexController.js')
const CowController = require('../controller/CowController.js')
const ItemCardexController = require('../controller/ItemCardexController.js')
const SicknessCowsController = require('../controller/SicknessCowsController.js')

const itemCardexController = new ItemCardexController()
const cowCardexController  = new CowCardexController()
const cowController        = new CowController()
const sicknessCowController= new SicknessCowsController()

var inv = [];
var itemCardexReduceable = {};
var animalsAvailable = [];

function createReducedItemCardex(prevCardex,transactionTypeId,quantityInTransaction){
    let storable = {};

    Object.keys(prevCardex).forEach(key=>{
        storable[key] = prevCardex[key];
    })

    storable.transactionClass = 2; //Transaction class 2 means that a product
                                   //leaves its cost center
    storable.transactionType = transactionTypeId;

    storable.unitsInTransaction = quantityInTransaction;
    storable.valuePerUnit = prevCardex.currentUnitAverage;
    storable.valueInTransaction = prevCardex.currentUnitAverage*quantityInTransaction;

    storable.transactionDate = dates.getDateAndTime();

    storable.currentUnitAverage = prevCardex.currentUnitAverage;
    storable.accruedAverageAmount = prevCardex.accruedAverageAmount - storable.unitsInTransaction;
    storable.accruedAverageValue = storable.accruedAverageAmount*storable.currentUnitAverage;

    return storable;
}

function vaccineAnimal(){
    const earring = $("#earringId").val();

    var lotReduce = null;

    const dose = 1; //Just one dose of vaccine

    if(!earring){
        alert("Debe introducir un número de arete");
        return;
    }

    if(itemCardexReduceable[$("#vaccineId").val()].accruedAverageAmount == 0){
        alert("Ya no tiene vacunas en existencia!");
        return;
    }

    const treatmentCardex = {}; 

    treatmentCardex.animalEarringId = earring;
    treatmentCardex.transactionDate = dates.getDateAndTime();
    treatmentCardex.movementClass   = 1; //Movement type 1 means that 
                                         //the cardex is receiving
    treatmentCardex.transactionTypeId=6; //@ DB, transaction code n.o 6 is 
                                         //for vaccination
    treatmentCardex.cashPerUnit = itemCardexReduceable[$("#vaccineId").val()].currentUnitAverage; 
                                    //Cost at which the item was applied
    treatmentCardex.unitsEnteringOrExiting = dose;
    treatmentCardex.totalOfCashEnteringOrExitingPerUnit = parseFloat(itemCardexReduceable[$("#vaccineId").val()].currentUnitAverage)*dose;
    
    //This id is reference to the item cardex detail from where the product was selected
    treatmentCardex.itemCardexChildId = itemCardexReduceable[$("#vaccineId").val()].childCardexId;
    treatmentCardex.itemCardexItemCode= $("#vaccineId").val();

    //Accrued average for the item cardex
    treatmentCardex.currentValueOfUnitsAtAnimal = treatmentCardex.cashPerUnit;
    treatmentCardex.transactionDetail = "Vacunación de animal n.o "+earring+" con producto: "+$("#vaccineId").val();
    treatmentCardex.isVaccineOfCardex = $('input[name=isVaccineOfCardex]:checked').val();
    treatmentCardex.sicknessRefId = null;

    const calculatedUserCardex = createReducedItemCardex(itemCardexReduceable[$("#vaccineId").val()],treatmentCardex.movementClass,treatmentCardex.unitsEnteringOrExiting);

    //Create lot object
    if(calculatedUserCardex.expirationControl == 1){
        lotReduce = {};
        
        lotReduce.qty      = dose;
        lotReduce.itemCode = $("#vaccineId").val();
        lotReduce.lotNumber= calculatedUserCardex.lotNumber; 
    }

    //Store
    const payload = [[treatmentCardex],calculatedUserCardex,lotReduce];

    cowCardexController.createCowCardex(payload).then(success=>{
        //Update values with the remaining quantity;
        itemCardexReduceable[$("#vaccineId").val()].accruedAverageAmount = calculatedUserCardex.accruedAverageAmount;
        console.log(itemCardexReduceable);
                
        $("#itemqt"+itemCardexReduceable[$("#vaccineId").val()].itemCode).html(itemCardexReduceable[$("#vaccineId").val()].accruedAverageAmount);


        alert("Se ha registrado correctamente la vacunación");
    }).catch(errn=>{
        console.log(errn);
        alert("Hubo un error al registrar la vacunación");
    })
}

function treatAnimal(){
    const earring = $("#earringIdT").val();
    const dose    = $("#leaveDosis").val();
    const diseaseId=$("#diseases").val();

    var lotReduce = null;

    if(!earring){
        alert("Debe introducir un número de arete");
        return;
    }

    const treatmentCardex = {}; 

    treatmentCardex.animalEarringId = earring;
    treatmentCardex.transactionDate = dates.getDateAndTime();
    treatmentCardex.movementClass   = 1; //Movement type 1 means that 
                                         //the cardex is receiving
    treatmentCardex.transactionTypeId=8; //@ DB, transaction code n.o 8 is 
                                         //for treatments
    treatmentCardex.cashPerUnit = itemCardexReduceable[$("#treatId").val()].currentUnitAverage; 
                                    //Cost at which the item was applied
    treatmentCardex.unitsEnteringOrExiting = dose;
    treatmentCardex.totalOfCashEnteringOrExitingPerUnit = parseFloat(itemCardexReduceable[$("#treatId").val()].currentUnitAverage)*dose;
    
    //This id is reference to the item cardex detail from where the product was selected
    treatmentCardex.itemCardexChildId = itemCardexReduceable[$("#treatId").val()].childCardexId;
    treatmentCardex.itemCardexItemCode= $("#treatId").val();

    //Accrued average for the item cardex
    treatmentCardex.currentValueOfUnitsAtAnimal = itemCardexReduceable[$("#treatId").val()].currentUnitAverage;
    treatmentCardex.transactionDetail = "Tratamiento de animal n.o "+earring+" con producto: "+$("#treatId").val();
    treatmentCardex.isVaccineOfCardex = null;
    treatmentCardex.sicknessRefId = null;

    
    if(itemCardexReduceable[$("#treatId").val()].accruedAverageAmount < dose){
        alert("La existencia no es suficiente para la dosis que usted introdujo!");
        return;
    }

    const calculatedUserCardex = createReducedItemCardex(itemCardexReduceable[$("#treatId").val()],treatmentCardex.movementClass,treatmentCardex.unitsEnteringOrExiting);

    if(calculatedUserCardex.expirationControl == 1){
        lotReduce = {};
        
        lotReduce.qty      = dose;
        lotReduce.itemCode = $("#treatId").val();
        lotReduce.lotNumber= calculatedUserCardex.lotNumber; 
    }

    //Lookup for the latest disease 
    sicknessCowController.getLatestSicknes(diseaseId,earring)
    .then(disease=>{
        //Once looked up, assign to the cardex the disease case id
        //that was found
        if(disease.length > 0)
            treatmentCardex.sicknessRefId = disease[0].numIncidente;

        //Store
        const payload = [[treatmentCardex],calculatedUserCardex,lotReduce];

        cowCardexController.createCowCardex(payload).then(success=>{
            //Update values with the remaining quantity;
            itemCardexReduceable[$("#treatId").val()].accruedAverageAmount = calculatedUserCardex.accruedAverageAmount;
            //    itemCardexReduceable[$("#treatId").val()].accruedAverageAmount - calculatedUserCardex.accruedAverageAmount;

            console.log(itemCardexReduceable);
            
            $("#leaveDosis").val(itemCardexReduceable[$("#treatId").val()].accruedAverageAmount);
            $("#itemqt"+itemCardexReduceable[$("#treatId").val()].itemCode).html(itemCardexReduceable[$("#treatId").val()].accruedAverageAmount);

            
            alert("Se ha registrado el tratamiento correctamente");
        }).catch(errn=>{
            console.log(errn);
            alert("Hubo un error al registrar el tratamiento");
        })

    })
    .catch(err=>{
        console.log(err);
        alert("Hubo un error en el sistema");
    })
}

function feedAnimals(cows){
    var lotReduce = null;
    //Obtain product selected from cache
    const productSelected = itemCardexReduceable[$("#productFeederId").val()];
    //Obtain quantity selected
    const qtySelected = parseFloat($("#productFeederExtEditable").val());
    //Obtain total cost of feeding
    const totalCostOfFeeding = qtySelected*productSelected.currentUnitAverage;

    //Create animal cardexes
    const disperseAmount = totalCostOfFeeding/cows.length;
    const disperseQty    = qtySelected/cows.length;

    const cowCardexLst = cows.map(cow=>{
        let treatmentCardex = {};

        treatmentCardex.animalEarringId = cow.earringId;
        treatmentCardex.transactionDate = dates.getDateAndTime();
        treatmentCardex.movementClass   = 1; //Movement type 1 means that 
                                             //the cardex is receiving
        treatmentCardex.transactionTypeId=4; //@ DB, transaction code n.o 4 is 
                                             //for groupal prorrated feeding
        treatmentCardex.cashPerUnit = productSelected.currentUnitAverage; 
                                        //Cost at which the item was applied
        treatmentCardex.unitsEnteringOrExiting = disperseQty;
        treatmentCardex.totalOfCashEnteringOrExitingPerUnit = disperseAmount;
        
        //This id is reference to the item cardex detail from where the product was selected
        treatmentCardex.itemCardexChildId = productSelected.childCardexId;
        treatmentCardex.itemCardexItemCode= productSelected.itemCode;
    
        //Accrued average for the item cardex
        treatmentCardex.currentValueOfUnitsAtAnimal = productSelected.currentUnitAverage;
        treatmentCardex.transactionDetail = "Alimentación de animal n.o "+cow.earringId+" con producto: "+productSelected.itemCode;
        
        treatmentCardex.isVaccineOfCardex = null;
        treatmentCardex.sicknessRefId = null;

        return treatmentCardex;
    });

    //Create after movement item cardex
    const itemCardexDisposed = createReducedItemCardex(productSelected,4,qtySelected);

    if(itemCardexDisposed.expirationControl == 1){
        lotReduce = {};

        lotReduce.qty = qtySelected;
        lotReduce.itemCode = itemCardexDisposed.itemCode;
        lotReduce.lotNumber= itemCardexDisposed.lotNumber;
    }

    let payload = [cowCardexLst,itemCardexDisposed,lotReduce];

    cowCardexController.createCowCardex(payload).then(success=>{
        //Update values with the remaining quantity;
        itemCardexReduceable[$("#productFeederId").val()].accruedAverageAmount = itemCardexDisposed.accruedAverageAmount;
            
        console.log(itemCardexReduceable);

        $("#productFeederExtNonEditable").val(itemCardexReduceable[$("#productFeederId").val()].accruedAverageAmount);
        $("#itemqt"+itemCardexReduceable[$("#productFeederId").val()].itemCode).html(itemCardexReduceable[$("#productFeederId").val()].accruedAverageAmount);
                
        alert("Se ha registrado correctamente la alimentación.");
    }).catch(errn=>{
        console.log(errn);
        alert("Hubo un error al registrar la alimentación.");
    })
}

/**
 * assignBtnFn: Function to decide if an item must be processed as a feeding item,
 *              a vaccine item or a treatment item.
 * 
 * @param {*} item - a JS object with at least the following properties:
 *                  itemCode: Barcode or internally generated unique id
 *                            for the item selected by the user
 * 
 *                  itemName: Common or commercial name of the item
 * 
 *                  accruedAverageAmount: Units in existance for said item,
 *                  it represents up to how many units can be disbursed
 * 
 *                  mainCategory: The highest level category the item belongs to
 *                  (Like foods, medicines, computer equipment, etc...) 
 * 
 *                  secondaryCategory: The second highest level category an item
 *                  can belong to, representing a subset inside the main category, one 
 *                  example would be vaccines and antibiotics for the medicines main 
 *                  category.
 * 
 *                  tertiaryCategory: A subset of the tertiary category, like nati                  
 */
function assignBtnFn(item){
    //Food items
    if(item.mainCategory === "Alimentos"){
        //The modal is configured with the data on the item passed as
        //parameter to display
        $("#productFeederId").val(item.itemCode);
        $("#productFeederName").val(item.itemName);
        $("#productFeederExtNonEditable").val(item.accruedAverageAmount);
        $("#productFeederExtEditable").val(item.accruedAverageAmount);

        $("#productFeederExtEditable").attr({
            "max" : item.accruedAverageAmount,   
            "min" : 1 
        })

        $("#foodModal").modal({"focus":true,"show":true}); 
    }
    //Medicines
    else if(item.mainCategory === "Farmacos"){
        //Vaccines
        if(item.secondaryCategory === "Vacunas"){
            //The modal is configured with the data on the item passed as
            //parameter to display
            $("#vaccineId").val(item.itemCode);
            $("#vaccineName").val(item.itemName);
    
            $("#vaccineModal").modal({"focus":true,"show":true}); 
        }
        //Antibiotics, vitamins and other
        else{
            //The modal is configured with the data on the item passed as
            //parameter to display
            $("#treatId").val(item.itemCode);
            $("#treatName").val(item.itemName);
            $("#leaveDosis").val(item.accruedAverageAmount);
    
            $("#leaveDosis").attr({
                "max" : item.accruedAverageAmount,   
                "min" : 1 
            })
    
            $("#diseaseModal").modal({"focus":true,"show":true}); 
        }
    }
}

function applyValueAtAnimals(callerContext){
    let idx = $(callerContext).prop('id').split("_")[1];
    let reduceableObject = inv[idx];

    console.log(reduceableObject);
    assignBtnFn(reduceableObject);
}

function getUserInventory(userId){
    itemCardexController.getCurrentExistancePerCostCenterWithCategories(userId)
    .then(userAssignedItems=>{
        if(userAssignedItems.length > 0){
            $("#feedback").html("");

            $("#prodtbl").removeClass("d-none").addClass('table table-striped table-bordered'); 
            
            inv = itemCardexController.groupReceivedCardexEntries(userAssignedItems);    //Globally store the result for afterwards use

            $("#prodtbl").removeClass("d-none").addClass('table table-striped table-bordered');
            $("#prodtblbdy").html("");

            console.log(inv); 
                
            inv.forEach((item,index)=>{
                $("#prodtblbdy").append(
                    "<tr id='tr"+index+"'>"+
                        "<td>"+item.itemCode+"</td>"+
                        "<td>"+item.itemName+"</td>"+
                        "<td>"+item.mainCategory+"</td>"+
                        "<td>"+item.secondaryCategory+"</td>"+
                        "<td>"+item.tertiaryCategory+"</td>"+
                        "<td id='"+"itemqt"+item.itemCode+"'>"+item.accruedAverageAmount+"</td>"
                        +"<td><button class='btn btn-primary saverow' id='btn_"+index+"'>Aplicar</button></td>"+
                    "</tr>"
                )

                itemCardexReduceable[item.itemCode] = item;
                itemCardexReduceable[item.itemCode].pos = index;
            })      
            
            console.log(itemCardexReduceable);
        }else{
            $("#feedback").html("<span class='alert alert-warning'>Usted no tiene artículos en su inventario</span>");
        }
    })
    .catch(err=>{
        console.log(err);
        $("#feedback").html("<span class='alert alert-danger'>Ocurrió un error, favor de reportarlo.</span>");
    })
}

module.exports = {
    getUserInventory: getUserInventory,
    applyValueAtAnimals: applyValueAtAnimals,
    treat: treatAnimal,
    vaccine: vaccineAnimal,
    feed: feedAnimals
}