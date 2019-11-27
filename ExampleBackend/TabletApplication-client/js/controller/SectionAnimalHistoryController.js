const axios = require('axios');

class SectionAnimalHistoryController{
    createTranslate(translate){
            // OLD WAY
        //
        // const insertSQL = `INSERT INTO SectionAnimalHistory (animalEarringIdS,originSectionId,sectionTransferenceDate,
        //                     destinySectionId, organicConvert, authorizedTransference)
        //                     VALUES (?,?,?,?,?,?);`;
        //
        // const params = [
        //     translate.animalEarringIdS,
        //     translate.originSectionId,
        //     translate.sectionTransferenceDate,
        //     translate.destinySectionId,
        //     translate.organicConvert,
        //     translate.authorizedTransference,
        //    ];
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/sectionanimalhistory/save',translate)
            .then(function(success){
                console.log(success);
                resolve(success);
            }).catch(function(err){
                console.log(err);
                reject(err);
            })
        })
    }

}
module.exports = SectionAnimalHistoryController;