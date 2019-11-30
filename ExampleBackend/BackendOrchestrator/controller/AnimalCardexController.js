'use strict';

const AnimalCardexModel = require('../model/AnimalCardexModel')
const db = require('../util/db.js')

exports.animalCardexCreateTransaction = function(req,res){
    const animalCardex = req.body[0];
    const itemCardex  = req.body[1];
    const itemLot      = req.body[2];

    const animalCardexModel = new AnimalCardexModel(db);    

    const animalEarrings = animalCardex.map(item=>{return item.animalEarringId});

    console.log(req.body);
    

    animalCardexModel.getPreviousAnimalCardexEntries(animalEarrings).then(prevEntries=>{
        var prevAnimalCardexEntries = {};

        prevEntries.forEach(item=>{
            prevAnimalCardexEntries[item.animalEarringId] = item;
        });
        
        const animalCardexs = animalCardexModel.calculateCardexEntries(prevAnimalCardexEntries,animalCardex);
        
        console.log(animalCardexs);
        
        animalCardexModel.animalCardexTransaction(itemCardex,animalCardexs,itemLot)
        .then(transactionResult=>{
            res.json(transactionResult);
        })
        .catch(errn=>{
            console.log(errn);
            res.status(500).send(errn);
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    });
}

exports.getAccruedMovementsOfAnimal = function(req,res){
    const earring = req.params.earring;
    const animalCardexModel = new AnimalCardexModel(db);    

    animalCardexModel.getAccruedMovementsOfAnimal(earring).then(animalMovements=>{
        res.json(animalMovements);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
}