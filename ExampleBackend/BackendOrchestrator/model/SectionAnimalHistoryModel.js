'use strict'

class SectionAnimalHistoryModel{
    constructor(db){
        this.db = db;
    }

    insertTranslate(translate, connection){
        var conn;
        console.log("Model, parameters: ");
        console.log(translate);
        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `INSERT INTO sectionanimalhistory(animalEarringIdS,originSectionId,sectionTransferenceDate,
        destinySectionId,organicConvert,authorizedTransference) VALUES(?,?,?,?,?,?)`;

        const params = [
            translate.animalEarringIdS,
            translate.originSectionId,
            translate.sectionTransferenceDate,
            translate.destinySectionId,
            translate.organicConvert,
            translate.authorizedTransference,
        ];

        console.log("MODEL PARAMETERS!!!!!!!!: ");
        console.log(params);

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        });
    }

    updateCow(section, animal, connection){
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `UPDATE animal set animalSectionId=? WHERE earringId=?`;

        const params = [section,animal];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params, function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    resolve(res);
                }
            })
        });
    }

    saveTranslate(translate){
        return new Promise((resolve,reject)=>{
            this.db.getConnection((error, connection)=>{
                if(error){
                    console.log(error);
                    reject(error);
                }

                connection.beginTransaction(transactionError=> {
                    if (transactionError) {
                        reject(transactionError);
                    }

                    // Promise Chain for Insert and Update
                    this.insertTranslate(translate, connection)
                        .then(resIT=>{
                            console.log(resIT);
                            let sectionId = translate.destinySectionId;
                            let animalEarring = translate.animalEarringIdS;
                            return this.updateCow(sectionId, animalEarring, connection);
                        })
                        .then(resFinal=>{
                            connection.commit((commitErr)=>{
                                if(commitErr){
                                    return commitErr;
                                }
                                connection.end();
                                resolve(resFinal);
                            })
                        })
                        .catch(err=>{
                            console.log(err);
                            connection.rollback(()=>{
                                reject(err);
                            })
                        })

                })
            })
        });
    }
}

module.exports = SectionAnimalHistoryModel;