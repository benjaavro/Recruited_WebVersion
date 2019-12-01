const express           = require('express')
const methodOverride    = require('method-override')
const bodyParser        = require('body-parser')
const http              = require('http')

const profileRoute = require('./routes/profileRoute')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const postRoute = require('./routes/postRoute')
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

postRoute(app);
profileRoute(app);
loginRoute(app);
registerRoute(app);

app.listen(3000,()=>{
    console.log('Server listening at port 3000');
})