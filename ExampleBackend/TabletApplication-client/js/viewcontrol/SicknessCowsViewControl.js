'use strict'


var SicknessCowsController = require('../controller/SicknessCowsController');
var dateAndNumber = require('../util/DateAndNumber.js');


// var sectionAnimalHistoryController = new SectionAnimalHistoryController();
var sicknessCowsController = new SicknessCowsController();


function getSickness(){

    const sickness = {};

    sickness.animalEarringId = $("#earringId").val();
    sickness.sectionId = $("#zoneOrigin").val();
    sickness.sicknessId = $("#sickness").val();
    sickness.sicknessDate = $("#sickday").val();
    sickness.systemDate = dateAndNumber.getDate();
    sickness.sicknessDescription = $("#sickdesc").val();



    // TipoReporte
    //Del 1 al 29 MENSUAL
    if((sickness.sicknessId >=1)&&(sickness.sicknessId<=29)){
        sickness.tipoReporte = "MENSUAL";
    }else{
        //Del 30 al 59 INMEDIATO
        if((sickness.sicknessId >=30)&&(sickness.sicknessId<=59)){
            sickness.tipoReporte = "INMEDIATO";
        }else{
            //No es necesario un reporte a SAGARPA
            sickness.tipoReporte = "NO";
        }
    }

    console.log(sickness);

    if(!sickness.animalEarringId){
        $("#earringId").addClass('border-danger');
        $("#earringIdS").addClass('bg-danger');
        $("#earringIdS").html("<p>Por favor digite el n.o de arete</p>");

        return null;
    }
    else{
        $("#earringId").removeClass('border-danger');
        $("#earringIdS").removeClass('bg-danger');
        $("#earringIdS").html("");
    }


    if(!sickness.sectionId){
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

    if(!sickness.sicknessId){
        $("#sickness").addClass('border-danger');
        $("#sicknessTypeFeedback").addClass('bg-danger');
        $("#sicknessTypeFeedback").html("<p>Por favor seleccione una enfermedad </p>");

        return null;
    }
    else{
        $("#sickness").removeClass('border-danger');
        $("#sicknessTypeFeedback").removeClass('bg-danger');
        $("#sicknessTypeFeedback").html("");
    }

    if(!sickness.sicknessDate){
        $("#sickday").addClass('border-danger');
        $("#sDateFeedback").addClass('bg-danger');
        $("#sDateFeedback").html("<p>Por favor seleccione la fecha de inicio de la enfermedad</p>");

        return null;
    }
    else{
        $("#sickday").removeClass('border-danger');
        $("#sDateFeedback").removeClass('bg-danger');
        $("#sDateFeedback").html("");
    }


    if(!sickness.sicknessDescription){
        $("#sickdesc").addClass('border-danger');
        $("#sDescFeedback").addClass('bg-danger');
        $("#sDescFeedback").html("<p>Observaciones no puede ir en blanco</p>");

        return null;
    }else{
        $("#sickdesc").removeClass('border-danger');
        $("#sDescFeedback").removeClass('bg-danger');
        $("#sDescFeedback").html("");
    }

    // if(!sickness.systemDate){
    //     $("#sagarpa").addClass('border-danger');
    //     $("#sagarpaFeedback").addClass('bg-danger');
    //     $("#sagarpaFeedback").html("<p>Por favor seleccione si existe un aviso a SAGARPA</p>");
    //
    //     return null;
    // }
    // else{
    //     $("#sagarpa").removeClass('border-danger');
    //     $("#sagarpaFeedback").removeClass('bg-danger');
    //     $("#sagarpaFeedback").html("");
    // }

    return sickness;
}


function instantReport(data) {
    console.log("Entro a instant Report con datos: ");
    console.log(data);

    var enfermedades = ['ANTRAX','BRUCELOSIS','ENFERMEDAD DE AUJESZKY ','ESTOMATITIS VESICULAR',
                        'RABIA','RINOTRAQUEITIS INFECCIOSA','TUBERCULOSIS BOVINA','ANAPLASMOSIS',
                        'COWDRIOSIS','DERMATOFILOSIS','DERMATOSIS NODULAR CONTAGIOSA','ENFERMEDAD DE AINO',
                        'ENFERMEDAD DE AKABANE','ENFERMEDAD DE WESSELSBRON','ENCEFALOPATIA ESPONGIFORME',
                        'FIEBRE AFTOSA','FIEBRE CATARRAL MALIGNA','FIEBRE DEL VALLE DEL RIFT','FIEBRE EFIMERA',
                        'FIEBRE Q','HIPODERMOSIS','IBARAKI','IXODIDOSIS','LENGUA AZUL','MIASIS','PESTE BOVINA',
                        'PERINEUMONIA CONTAGIOSA','SEPTICEMIA HEMORRAGICA','TEILERIOSIS','TRIPANOSOMIASIS'];

    //Recommendation, generate a word template first it will be a very useful guide

    var sicknessNAME = enfermedades[data.sicknessId - 30];

    var officegen = require('officegen');

    var fs = require('fs');
    var path = require('path')

    var finalDir = path.join(__dirname, '../tmp/');

    var docx = officegen({
        'type': 'docx',
        'orientation':'portrait',
        'onend': function (written) {
            console.log('Finish to create a docx file.\nTotal bytes created: ' + written + '\n' );
        },
        'onerr': function (err) {
            console.log('Something happend: '+err);
        },
        'creator': 'Gpo. Ganadero Leon de Dios',
        'title': 'titlespec',
        'subject': 'subjectSpec',
        'keywords': 'keywordSpec',
        'description': 'descriptionSpec',
    });


    ///All data in a .docx are paragraphs

    var par1 = docx.createP();
    par1.options.align ='right'; //options.align -> center, right, justify
    par1.addText('Chiapas a '+ data.systemDate); // add text to that specific paragraph
    par1.addLineBreak();
    par1.addLineBreak(); //add line break.


    var par2 = docx.createP();
    par2.options.align='center';
    par2.addText('REPORTE DE ENFERMEDAD');
    par2.addLineBreak();

    var par3 = docx.createP();
    par3.options.align='left';
    par3.addText('A quien corresponda');
    par3.addLineBreak();

    var par4 = docx.createP();
    par4.options.align='justify';
    par4.addText('Informamos que hemos diagnosticado: '+ sicknessNAME +
                 ' dentro de nuestra vaca con No. De Arete: '+ data.animalEarringId+',' +
                 ' las observaciones medicas son: “'+data.sicknessDescription+'”.'
               );
    par4.addLineBreak();

    var par5 = docx.createP();
    par5.options.align='left';
    par5.addText('Esperamos de su respuesta.');
    par5.addLineBreak();


    var par6 = docx.createP();
    par6.options.align='left';
    par6.addText('Grupo Ganadero Leon de Dios.');
    par6.addLineBreak();
    par6.addText('Firma del responsable');



    var par7  = docx.createP();
    par7.options.align='center';
    par7.addText('"El texto puede modificarse de acuerdo a las  circunstancias y necesidades de la ganadería"');
    par7.addLineBreak();



    var out = fs.createWriteStream ( path.join(finalDir,data.animalEarringId+'_INMEDIATO_'+data.systemDate+'.docx' ));


    docx.generate ( out, {
        'finalize': function ( written ) {
            console.log ( 'Finish to create a docx file.\nTotal bytes created: ' + written + '\n' );
        },
        'error': function ( err ) {
            console.log ( err );
        }
    });



}


function saveSickness() {
    const sickness = getSickness();

    if(!sickness){
        alert("Revise los datos");
        return;
    }

    sicknessCowsController.createSickness(sickness).then( success=>{
        if(sickness.tipoReporte === "INMEDIATO"){
            console.log(" Generar REPORTE YA");
            instantReport(sickness);
            alert("Se ha generado un archivo de infrome a SAGARPA, RESVISAR CARPETA DE REPORTES");

        }else{
            alert("Se ha guardado el aviso de enfermedad del animal correctamente!");
        }
    }, err=>{
        console.log(err);
        alert("Hubo un problema al guardar los datos");
    })

}

module.exports= {
    saveSickness: saveSickness
}