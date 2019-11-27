'use strict'

class SicknessTypeModel{
    constructor(db){
        this.db = db;
    }

    getSickness(result){
        const sql = `SELECT * 
            FROM sicknesstypes`;

        try{
            this.db.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    result(err,null);
                }else{
                    result(null,rows);
                }
            })
        }catch(error){
            console.log(error);
        }
    }


}

module.exports = SicknessTypeModel;