'use strict';

const SectionAnimalHistoryModel = require('../model/SectionAnimalHistoryModel')
const db = require('../util/db')

exports.saveTranslate  = function(req,res){
    const sectionAnimalHistory = new SectionAnimalHistoryModel(db);
    const item = req.body;
    console.log(req)

    if(!item){
        res.status(400).send({error:true, message:"Please provide an item to create"});
    }
    else{
        sectionAnimalHistory.saveTranslate(item).then(function(rest){
                res.json(rest);
        }).catch(err=>{
            console.log(err);
            res.status(500).send({error: true, message:"Chinga tu pito pendejo, este pedo no se guardo!"});
        })
    }
}