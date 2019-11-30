'use strict';

const Item = require('../model/ItemModel.js')
const db = require('../util/db')

exports.createAnItem = function(req,res){
    const item = new Item(db);
    const newItem = req.body;

    if(newItem.diasHolgura == '')
        newItem.diasHolgura = 0;
    if(newItem.tiempoEsperaInterno == '')
        newItem.tiempoEsperaInterno = 0;
    
    if(!newItem){
        res.status(400).send({error:true,message:"Please provide an item to create"});
    }else{
        item.saveItem(newItem,function(err,item){
            if(err){
                console.log("There was an error");
                
                res.status(500).send(err);
            }else{
                res.json(item);
            }
        })
        
    }
}

exports.getItems = function(req,res){
    const item = new Item(db);
    
    item.getAllItems(function(err,items){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.json(items);
        }
    })
}

exports.getItemsWithCategory = function(req,res){
    const item = new Item(db);

    item.getItemsAndCategories()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
}