'use stric'

class SicknessCowsModel{
    constructor(db){
        this.db = db;
    }

    saveSickness(sickness){
        var conn = this.db;

        const sql = `INSERT INTO sicknesscows(
                                animalEarringId,
                                sectionId,
                                sicknessId,
                                tipoReporte,
                                sicknessDate,
                                systemDate,
                                sicknessDescription) 
                            VALUES (?,?,?,?,?,?,?);`;

        const params = [
            sickness.animalEarringId,
            sickness.sectionId,
            sickness.sicknessId,
            sickness.tipoReporte,
            sickness.sicknessDate,
            sickness.systemDate,
            sickness.sicknessDescription,
        ];

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

    getLatestDiseases(diseaseId,earring){
        const sql = `SELECT * FROM sicknesscows
            WHERE numIncidente IN(
            SELECT MAX(numIncidente) FROM sicknesscows
            WHERE sicknessId=? AND animalEarringId=?)`;

        const params = [diseaseId,earring];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        });
    }
}

module.exports = SicknessCowsModel;