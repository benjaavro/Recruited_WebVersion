const db = require('../util/db')
const MobileModel = require('../model/MobileModel')

exports.login = function(req,res){
    const mobileModel = new MobileModel(db);
    console.log(req);
    const user = JSON.parse(JSON.stringify(req.body));
    console.log("USER CONTROLLER:")
    console.log(user);

    mobileModel.login(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.insert = function(req,res){
    const mobileModel = new MobileModel(db);
    const user = req.body;

    console.log(user);

    mobileModel.insert(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}