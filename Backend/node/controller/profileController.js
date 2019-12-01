const db = require('../util/db')
const ProfileModel = require('../model/profileModel')

exports.athleteProfile = function(req,res){
    console.log("Entro en el register");
    const profileModel = new ProfileModel(db);
    const user = req.body;

    console.log(user);

    profileModel.getAthleteProfile(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.athleteProfileEdit = function(req,res){
    console.log("Entro en el register");
    const profileModel = new ProfileModel(db);
    const user = req.body;

    console.log(user);

    profileModel.editAthleteProfile(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}


exports.coachProfile = function(req,res){
    const profileModel = new ProfileModel(db);
    const user = req.body;

    console.log(user);

    profileModel.getCoachProfile(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.coachProfileEdit = function(req,res){
    const profileModel = new ProfileModel(db);
    const user = req.body;

    console.log(user);

    profileModel.editCoachProfile(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}