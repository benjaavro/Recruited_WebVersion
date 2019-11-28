const express           = require('express')
const methodOverride    = require('method-override')
const bodyParser        = require('body-parser')
const http              = require('http')

const app = express();

//Parse urlencoded
app.use(bodyParser.urlencoded({extended: false}))
//Parse application/json
app.use(bodyParser.json())

//Allows Cross Origin requests
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.listen(3000,()=>{
    console.log('Server listening at port 3000');
})