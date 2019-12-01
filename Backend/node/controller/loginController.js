const db = require('../util/db')
const LoginModel = require('../model/loginModel')

exports.athleteLogin = function(req,res){
    const loginModel = new LoginModel(db);
    const user = req.body;

    console.log(user);

    loginModel.athleteLogin(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.coachLogin = function(req,res){
    const loginModel = new LoginModel(db);
    const user = req.body;

    console.log(user);

    loginModel.coachLogin(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}