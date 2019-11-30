const express           = require('express')
const methodOverride    = require('method-override')
const bodyParser        = require('body-parser')
const http              = require('http')

const itemRoute = require('./routes/ItemRoute')
const itemCategoryRoute = require('./routes/ItemCategoryRoute')
const animalRoute = require('./routes/AnimalRoute')
const adminUnitRoute = require('./routes/AdministrativeUnitRoutes')
const categoryRoute = require('./routes/CategoryRoutes')
const purchaseOrderRoutes = require('./routes/PurchaseOrderRoutes')
const itemCardexRoutes = require('./routes/ItemCardexRoutes')
const vendorRoutes = require('./routes/VendorRoutes')
const sectionAnimalHistoryRoute = require('./routes/SectionAnimalHistoryRoute')
const sicknessCowsRoute = require('./routes/SicknessCowsRoute')
const sicknessTypeRoute = require('./routes/SicknessTypeRoute')
const measuresRoute = require('./routes/MeasuresRoute')
const animalCardexRoute = require('./routes/AnimalCardexRoutes')
const appUserRoutes = require('./routes/AppUserRoutes')

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

itemRoute(app);
itemCategoryRoute(app);
animalRoute(app);
adminUnitRoute(app);
categoryRoute(app);
purchaseOrderRoutes(app);
itemCardexRoutes(app);
vendorRoutes(app);
sectionAnimalHistoryRoute(app);
sicknessCowsRoute(app);
sicknessTypeRoute(app);
measuresRoute(app);
animalCardexRoute(app);
appUserRoutes(app);

//Listen @ port 3000
app.listen(3000,()=>{
    console.log('Server listening at port 3000');
})