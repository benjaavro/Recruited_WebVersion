const db = require('../util/db')
const loginModel = require('../model/loginModel')

exports.userLogin = function(req,res){
    const loginModel = new loginModel(db);
    const user = req.body;

    console.log(user);

    loginModel.userLogin(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
}