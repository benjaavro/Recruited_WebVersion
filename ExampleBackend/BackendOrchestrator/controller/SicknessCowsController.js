'use strict'

const SicknessCowsModel = require('../model/SicknessCowsModel')
const db = require('../util/db')

exports.saveSickness = function(req,res){
    const sicknessCows = new SicknessCowsModel(db);
    const item = req.body;
    console.log(req);

    if(!item){
        res.status(400).send({error:true, message:"Please provide item to create"});
    }else{
        sicknessCows.saveSickness(item).then(function(rest){
            res.json(rest);
        }).catch(err=>{
            console.log(err);
            res.status(500).send({error: true, message:"Chinga tu pito pendejo, este pedo no se guardo!"});
        })
    }
}

exports.getLatestDiseaseCases = function(req,res){
    const sicknessCows = new SicknessCowsModel(db);
    const disease = req.params.disease;
    const earring = req.params.earring;

    sicknessCows.getLatestDiseases(disease,earring).then(diseases=>{
        res.json(diseases);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
}