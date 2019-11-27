'use strict';

class CategoryModel{
    constructor(db){
        this.db = db;
    }

    getCategories(parentId,result){
        var sql = `SELECT * FROM category WHERE `;

        if(parentId == null){
            sql+=`parentCategory IS NULL`;
            
            this.db.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    result(err,null);
                }else{
                    result(null,rows);
                }
            })
        }else{
            sql+=`parentCategory=?`;
            
            this.db.query(sql,[parentId],function(err,rows){
                if(err){
                    console.log(err);
                    result(err,null);
                }else{
                    result(null,rows);
                }
            })
        }
    }
}

module.exports = CategoryModel;