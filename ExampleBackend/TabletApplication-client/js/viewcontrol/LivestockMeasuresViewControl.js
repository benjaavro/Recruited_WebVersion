const MeasuresController = require('../controller/MeasuresController.js')
const dateAndNumber = require('../util/DateAndNumber.js');


function getHead(){
    var measure = {};

    measure.weight = $("#weight").val();
    measure.weightDate = dateAndNumber.getDateAndTime();
    measure.animalEarringId = $("#animalEarringId").val();
    measure.crossHeight = $("#crossHeight").val();
    measure.toraxDiameter = $("#toraxDiameter").val();

    if(!measure.weight){
        $("#weight").addClass('border-danger');
        $("#weightFeedback").addClass('bg-danger');
        $("#weightFeedback").html("<p>Introduzca peso del animal en kilogramos </p>");
        return null;
    }
    else{
        $("#weight").removeClass('border-danger');
        $("#weightFeedback").removeClass('bg-danger');
        $("#weightFeedback").html("");
    }

    if(!measure.crossHeight){
        $("#crossHeight").addClass('border-danger');
        $("#crossHeightFeedback").addClass('bg-danger');
        $("#crossHeightFeedback").html("<p>Introduzca altura cruz del animal en centimetros</p>");
        return null;
    }
    else{
        $("#crossHeight").removeClass('border-danger');
        $("#crossHeightFeedback").removeClass('bg-danger');
        $("#crossHeightFeedback").html("");
    }

    if(!measure.toraxDiameter){
        $("#toraxDiameter").addClass('border-danger');
        $("#toraxDiameterFeedback").addClass('bg-danger');
        $("#toraxDiameterFeedback").html("<p></p>");
        return null;
    }
    else{
        $("#toraxDiameter").removeClass('border-danger');
        $("#toraxDiameterFeedback").removeClass('bg-danger');
        $("#toraxDiameterFeedback").html("");
    }

    return measure;
}

function save(){
    const head = getHead();
    const measuresController = new MeasuresController();

    console.log(head);

    if(!head){
        alert("Revise que no falte ningun dato");
        return;
    }

    measuresController.measureAnimal(head).then(
        success=>{
            console.log(success);
            alert("Se guardaron las medidas exitosamente");
            $("#save").attr("disabled", true);
        },err=>{
            console.log(err);
            alert("Hubo un error de guardado");
        }
    )
}


module.exports = {
    createMeasure: save
}