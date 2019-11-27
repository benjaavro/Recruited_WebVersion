'use strict';

class AdministrativeUnitModel{
    constructor(db){
        this.db = db;
    }

    getRanches(result){
        const sql = `SELECT * 
            FROM ranch`;

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

    getSections(ranch,result){
        const sql = `SELECT * FROM section WHERE ranchRanchId=?`;
        const params = [ranch];

        try{
            this.db.query(sql, params, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    result(err,null);
                }else{
                    console.log(res);
                    result(null,res);
                }
            });
        }catch(err0r){
            console.log(err0r);
        }
    }

    getCostCenters(ranch,result){
        const sql = `SELECT * FROM costcenter WHERE ranchIdRef=?`;
        const params = [ranch];

        try{
            this.db.query(sql, params, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    result(err,null);
                }else{
                    console.log(res);
                    result(null,res);
                }
            });
        }catch(error){
            console.log(error);
        }
    }

    getUserTypeCostCenters(ranch,result){
        const sql = `SELECT * FROM costcenter WHERE costCenterDesc=? and ranchIdRef=?`;
        const params = ['User',ranch];

        try{
            this.db.query(sql, params, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    result(err,null);
                }else{
                    console.log(res);
                    result(null,res);
                }
            });
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = AdministrativeUnitModel;