const db = require('../util/db')
const RegisterModel = require('../model/registerModel')

exports.athleteRegister = function(req,res){
    console.log("Entro en el register");
    const registerModel = new RegisterModel(db);
    const user = req.body;

    console.log(user);

    registerModel.athleteRegister(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.coachRegister = function(req,res){
    const registerModel = new RegisterModel(db);
    const user = req.body;

    console.log(user);

    registerModel.coachRegister(user).then(usrCr=>{
        registerModel.coachList(user).then(usrCr=>{
            res.json(usrCr);
        }).catch(err=>{
            console.log(err);
            res.status(500).send(err);
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}