'use strict';

const AdministrativeUnitModel = require('../model/AdministrativeUnitModel')
const db = require('../util/db')

exports.getAllRanches = function(req,res){
    const adminUnit = new AdministrativeUnitModel(db);

    adminUnit.getRanches(function(err,ranches){
        if(err)
            res.status(500).send(err);
        else
            res.json(ranches);
    })
}

exports.getSectionsOfRanch = function(req,res){
    const adminUnit = new AdministrativeUnitModel(db);
    console.log(req.params);
    
    const ranch = req.params.ranch;

    adminUnit.getSections(ranch,function(err,sections){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else
            res.json(sections);
    })
}

exports.getCostCentersOfRanch = function(req,res){
    const adminUnit = new AdministrativeUnitModel(db);
    const ranch = req.params.ranch;

    adminUnit.getCostCenters(ranch,function(err,sections){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else
            res.json(sections);
    })
}

exports.getUserCostCentersOfRanch = function(req,res){
    const adminUnit = new AdministrativeUnitModel(db);
    const ranch = req.params.ranch;

    adminUnit.getUserTypeCostCenters(ranch,function(err,sections){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else
            res.json(sections);
    })
}