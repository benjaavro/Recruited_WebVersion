const AppUsrController = require('../controller/AppUserController')
const remote = require('electron').remote;     

module.exports = function(usr,pswd){
    const payload = {};

    payload.employeeId = usr;
    payload.password = pswd;

    if(!usr || !pswd)
        $("#no-log").modal();

    console.log(payload);

    (new AppUsrController()).loginUsr(payload).then(fulfill=>{
        if(fulfill.length > 0){
            remote.getGlobal('sharedObj').user = fulfill[0];
            
            window.location.replace('main-screen.html')
        }else{
            $("#no-cred").modal();
        }
    }).catch(err=>{
        console.log(err);
        $("#no-server").modal();
    })
}