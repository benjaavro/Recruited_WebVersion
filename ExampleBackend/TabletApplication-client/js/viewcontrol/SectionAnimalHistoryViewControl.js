'use strict'


var SectionAnimalHistoryController = require('../controller/SectionAnimalHistoryController.js');
var dateAndNumber = require('../util/DateAndNumber.js');

var sectionAnimalHistoryController = new SectionAnimalHistoryController();

function getTranslate(){
    const translate = {};
    translate.animalEarringIdS = $("#earringId").val();
    translate.originSectionId = $("#zoneOrigin").val();
    translate.sectionTransferenceDate = dateAndNumber.getDate();
    translate.destinySectionId = $("#zoneDestiny").val();
    translate.organicConvert = $("#organicConvert").val();
    translate.originRanch = $("#ranch").val();
    translate.destinyRanch = $("#ranchDestiny").val();
    translate.authorizedTransference = "SI";


    if(!translate.animalEarringIdS){
        $("#earringId").addClass('border-danger');
        $("#earringIdTranslate").addClass('bg-danger');
        $("#earringIdTranslate").html("<p>Por favor digite el n.o de arete</p>");

        return null;
    }
    else{
        $("#earringId").removeClass('border-danger');
        $("#earringIdTranslate").removeClass('bg-danger');
        $("#earringIdTranslate").html("");
    }


    if(!translate.originSectionId){
        $("#zoneOrigin").addClass('border-danger');
        $("#animalSectionIdFeedback").addClass('bg-danger');
        $("#animalSectionIdFeedback").html("<p>Por favor seleccione una zona</p>");

        return null;
    }
    else{
        $("#zoneOrigin").removeClass('border-danger');
        $("#animalSectionIdFeedback").removeClass('bg-danger');
        $("#animalSectionIdFeedback").html("");
    }

    if(!translate.destinySectionId){
        $("#zoneDestiny").addClass('border-danger');
        $("#animalSectionIdFeedback2").addClass('bg-danger');
        $("#animalSectionIdFeedback2").html("<p>Por favor seleccione una zona</p>");

        return null;
    }
    else{
        $("#zoneDestiny").removeClass('border-danger');
        $("#animalSectionIdFeedback2").removeClass('bg-danger');
        $("#animalSectionIdFeedback2").html("");
    }

    if((translate.organicConvert == "SI")|| (translate.originRanch != translate.destinyRanch)){
        translate.authorizedTransference = "NO";
    }

    return translate;
}


function saveTranslate() {
    const translate = getTranslate();

    if(!translate){
        alert("Revise los datos");
        return;
    }



    sectionAnimalHistoryController.createTranslate(translate).then( success=>{
        if(translate.authorizedTransference == "NO"){
            alert("Se ha guardado el Translado del animal, recuerda que necesita autorizacion!");
        }else{
            alert("Se ha guardado el Translado del animal correctamente!");
        }

    }, err=>{
        console.log(err);
        alert("Hubo un problema al guardar los datos");
    })

}

module.exports= {
    saveTranslate: saveTranslate
}