const axios = require('axios');

class AppUserController{
    loginUsr(usr){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/usr/login',usr)
                .then(function(success){
                    console.log(success);
                    resolve(success.data);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }
}

module.exports = AppUserController