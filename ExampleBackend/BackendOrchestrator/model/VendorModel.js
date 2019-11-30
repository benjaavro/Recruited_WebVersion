'use strict';

class VendorModel{
    constructor(db){
        this.db = db;
    }

    getVendors(){
        const sql = `SELECT * FROM vendor`;

        return new Promise((resolve,reject)=>{
            this.db.query(sql,function(err,rows){
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        });
    }
}

module.exports = VendorModel;