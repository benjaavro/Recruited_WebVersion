const db = require('../util/db')
const PostModel = require('../model/postModel')


exports.post = function(req,res){
    console.log("Entro en el register");
    const postModel = new PostModel(db);
    const user = req.body;

    console.log(user);

    postModel.post(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.getPost = function(req,res){
    console.log("Entro en el register");
    const postModel = new PostModel(db);

    postModel.getPost().then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log("ENtro en el error")
        console.log(err);
        res.status(500).send(err);
    })

}

exports.postC = function(req,res){
    console.log("Entro en el register");
    const postModel = new PostModel(db);
    const user = req.body;

    console.log(user);

    postModel.postC(user).then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })

}

exports.getPostC = function(req,res){
    console.log("Entro en el register");
    const postModel = new PostModel(db);

    postModel.getPostC().then(usrCr=>{
        res.json(usrCr);
    }).catch(err=>{
        console.log("ENtro en el error")
        console.log(err);
        res.status(500).send(err);
    })

}