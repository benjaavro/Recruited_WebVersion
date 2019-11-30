'use strict';

const ItemCategoryModel = require('../model/ItemCategoryModel.js')
const db = require('../util/db')

exports.createItemCategories = function(req,res){
    const itemCategoryModel = new ItemCategoryModel(db); 
    const itemArr = [req.body];

    if(!itemArr){
        res.status(400).send({error:true,message:"Please provide an item to create"});
    }else{
        itemCategoryModel.saveAllItemCategories(itemArr,function(err,saved){
            if(err){
                res.status(500).send(err);
            }
            res.json(saved);
        });
    }
}