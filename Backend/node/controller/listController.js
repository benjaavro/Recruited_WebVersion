const db = require('../util/db')
const ListModel = require('../model/listModel')
const mailController = require('./mailController')

exports.list = function(req,res){
    console.log("Entro en el register");
    const listModel = new ListModel(db);
    const user = req.body;

    console.log(user);

    listModel.list(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.listCoach = function(req,res){
    console.log("Entro en el register");
    const listModel = new ListModel(db);
    const user = req.body;

    console.log(user);

    listModel.listCoach(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.insertList = function(req,res){
    console.log("Entro en el register");
    const listModel = new ListModel(db);
    const user = req.body;

    console.log(user);

    listModel.insertList(user).then(usrCr=>{
        listModel.getMail(user).then(usrCr=>{
            console.log("Mail:");
            console.log(usrCr);
            //mailController(usrCr);
            res.json(usrCr);
        }).catch(err=>{
            console.log(err);
            res.status(500).send(err);
        })
        //res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}