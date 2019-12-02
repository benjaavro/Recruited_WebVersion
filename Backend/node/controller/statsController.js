const db = require('../util/db')
const StatsModel = require('../model/statsModel')

exports.insert = function(req,res){
    console.log("Entro en el register");
    const statsModel = new StatsModel(db);
    const user = req.body;

    console.log(user);

    statsModel.insert(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.get = function(req,res){
    console.log("Entro en el register");
    const statsModel = new StatsModel(db);
    const user = req.body;

    console.log(user);

    statsModel.get(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.update = function(req,res){
    console.log("Entro en el register");
    const statsModel = new StatsModel(db);
    const user = req.body;

    console.log(user);

    statsModel.update(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}