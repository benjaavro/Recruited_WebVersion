'use strict'

const SicknessTypeModel = require('../model/SicknessTypeModel')
const db = require('../util/db')

exports.getAllSickness = function(req,res){
    const sicknessType = new SicknessTypeModel(db);

    sicknessType.getSickness(function (err,sickness){
        if(err)
            res.status(500).send(err);
        else
            res.json(sickness);
    })
}