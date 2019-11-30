const MeasuresModel = require('../model/MeasuresModel')
const db = require('../util/db')

exports.createMeasure = function(req, res){
    const measuresModel = new MeasuresModel(db);
    const measure = req.body;

    measuresModel.newMeasure(measure).then(
        success=>{
            res.json(success);
        }
    ).catch(err=>{
        console.log(err);
        
        res.status(500).send(err);
    })

}


exports.getMeasure = function(req, res){
    const measuresModel = new MeasuresModel(db);
    const animal = req.params.animalEarringId;

    measuresModel.fetchMeasures(animal).then(
        success=>{
            res.json(success);
        }
    ).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}






