const db = require('../util/db')
const ApplicationUserModel = require('../model/ApplicationUserModel')

exports.createUser = function(req,res){
    const applicationUserModel = new ApplicationUserModel(db);
    const user = req.body;

    applicationUserModel.createUser(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
}

exports.userLogin = function(req,res){
    const applicationUserModel = new ApplicationUserModel(db);
    const user = req.body;

    console.log(user);
    
    applicationUserModel.userLogin(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
}