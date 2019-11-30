'use strict'

class ItemCategoryModel{
    constructor(db){
        this.db = db;
    }

    saveAllItemCategories(lstCategories,result){
        const sql = `INSERT INTO itemcategory(idCategory,itemIdRef) 
            VALUES ?`;
        const data = lstCategories;

        
        this.db.query(sql,data,function(err,res){
            if(err){
                console.log("Error: ",err);
                result(err,null);
            }else{
                result(null, res);
            }
        })
    }
}

module.exports = ItemCategoryModel;