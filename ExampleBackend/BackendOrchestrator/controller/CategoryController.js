'use strict';

const CategoryModel = require('../model/CategoryModel.js')
const db = require('../util/db')

exports.getCategoriesFromParent = function(req,res){
    const categoryModel = new CategoryModel(db);
    let cat = req.params.category;

    if(!cat)
        cat = null;
        
    categoryModel.getCategories(cat,function(err,resp){
        if(err){
            res.status(500).send(err);
        }
        res.json(resp)
    })
}