'use strict';

const AnimalModel = require('../model/AnimalModel')
const db = require('../util/db')

exports.createAnAnimal = function(req,res){
    const animalModel = new AnimalModel(db);
    const newAnimal   = req.body;
    
    if(!newAnimal){
        res.status(400).send({error:true,message:"Please provide an animal to create"});
    }else{
        animalModel.createAnimal(newAnimal,function(err,cow){
            if(err){
                res.status(500).send(err);
            }
            res.json(cow);
        })
    }
}

exports.getAnimalsAtSection = function(req,res){
    const animalModel = new AnimalModel(db);
    const section = req.params.section;
    
    console.log(req.params);
    
    animalModel.getAnimalsInSection(section,function(err,animals){
        if(err)
            res.status(500).send(err);
        
        res.json(animals);
    });
}

exports.updateSectionOfCow = function(req,res){
    const animalModel = new AnimalModel(db);

    const section = req.body.section;
    const earringId=req.params.earringId;
    
    animalModel.updateCowSection(section,earringId,function(err,reslt){
        if(err)
            res.status(500).send(err);
    
        res.json(reslt);
    })
}

exports.getCowById = function(req,res){
    const animalModel = new AnimalModel(db);
    const section = req.params.earringId;
        
    animalModel.getCowForId(section,function(err,animals){
        if(err)
            res.status(500).send(err);
        
        res.json(animals);
    });
}