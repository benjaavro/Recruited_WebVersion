'use strict'

var CowController = require('../controller/CowController.js');
var dateAndNumber = require('../util/DateAndNumber.js');

var cowController = new CowController();

function getCow(){
    const cow = {};

    cow.earringId = $("#earringId").val();
    cow.animalName= $("#animalName").val();
    cow.species = "Bovino";
    cow.race = $("#race").val();
    cow.gender = $("#gender").val();
    cow.birthplace = $("#birthplace").val();
    cow.birthday = $("#birthday").val();
    cow.systemRegisterDate = dateAndNumber.getDateAndTime();
    cow.destiny = $("#destiny").val();
    cow.currentStatus = $("#currentStatus").val();
    cow.animalSectionId = $("#animalSectionId").val();
    cow.fatherId = $("#fatherId").val();
    cow.motherId = $("#motherId").val();


    if(!cow.earringId){
        $("#earringId").addClass('border-danger');
        $("#earringIdFeedback").addClass('bg-danger');
        $("#earringIdFeedback").html("<p>Por favor digite el n.o de arete</p>");

        return null;
    }
    else{
        $("#earringId").removeClass('border-danger');
        $("#earringIdFeedback").removeClass('bg-danger');
        $("#earringIdFeedback").html("");
    }

    if(!cow.race){
        $("#race").addClass('border-danger');
        $("#raceFeedback").addClass('bg-danger');
        $("#raceFeedback").html("<p>Por favor escriba la raza de la vaca</p>");

        return null;
    }
    else{
        $("#race").removeClass('border-danger');
        $("#raceFeedback").removeClass('bg-danger');
        $("#raceFeedback").html("");
    }

    if(!cow.gender){
        $("#gender").addClass('border-danger');
        $("#genderFeedback").addClass('bg-danger');
        $("#genderFeedback").html("<p>Por favor seleccione un genero</p>");

        return null;
    }
    else{
        $("#gender").removeClass('border-danger');
        $("#genderFeedback").removeClass('bg-danger');
        $("#genderFeedback").html("");
    }

    if(!cow.destiny){
        $("#destiny").addClass('border-danger');
        $("#destinyFeedback").addClass('bg-danger');
        $("#destinyFeedback").html("<p>Por favor escriba un uso</p>");

        return null;
    }
    else{
        $("#destiny").removeClass('border-danger');
        $("#destinyFeedback").removeClass('bg-danger');
        $("#destinyFeedback").html("");
    }

    if(!cow.currentStatus){
        $("#currentStatus").addClass('border-danger');
        $("#currentStatusFeedback").addClass('bg-danger');
        $("#currentStatusFeedback").html("<p>Por favor escoja un status</p>");

        return null;
    }
    else{
        $("#currentStatus").removeClass('border-danger');
        $("#currentStatusFeedback").removeClass('bg-danger');
        $("#currentStatusFeedback").html("");
    }

    if(!cow.animalSectionId){
        $("#animalSectionId").addClass('border-danger');
        $("#animalSectionIdFeedback").addClass('bg-danger');
        $("#animalSectionIdFeedback").html("<p>Por favor escoja una sección</p>");

        return null;
    }
    else{
        $("#animalSectionId").removeClass('border-danger');
        $("#animalSectionIdFeedback").removeClass('bg-danger');
        $("#animalSectionIdFeedback").html("");
    }

    if(!cow.birthday || cow.birthday == ''){
        cow.birthday = null;
    }

    if(!cow.fatherId || cow.fatherId == '')
        cow.fatherId = null;
    if(!cow.motherId == cow.motherId == '')
        cow.motherId = null;

    return cow;
}

function saveCow(){
    const cow = getCow();

    if(!cow){
        alert("Revise los datos");
        return;
    }

    cowController.createCow(cow).then(
        success=>{
            alert("Se ha guardado el animal correctamente!");
        },err=>{
            console.log(err);
            alert("Hubo un problema al guardar");
        }
    )
}

module.exports = {
    saveCow: saveCow
}