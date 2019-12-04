const express           = require('express')
const methodOverride    = require('method-override')
const bodyParser        = require('body-parser')
const http              = require('http')

const profileRoute = require('./routes/profileRoute')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const postRoute = require('./routes/postRoute')
const statsRoute = require('./routes/statsRoute')
const listRoute = require('./routes/listRoute')
const mailRoute = require('./routes/mailRoute')
const mobileRoute = require('./routes/mobileRoute')
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
mobileRoute(app);
mailRoute(app)
listRoute(app);
statsRoute(app);
postRoute(app);
profileRoute(app);
loginRoute(app);
registerRoute(app);

app.listen(3000,()=>{
    console.log('Server listening at port 3000');
})