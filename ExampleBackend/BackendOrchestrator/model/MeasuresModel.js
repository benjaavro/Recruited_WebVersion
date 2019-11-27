const ItemLot = require('../model/ItemLotModel')
const PurchaseOrder = require('../model/PurchaseOrderModel')

process.on('unhandledRejection', console.log.bind(console)) 

class MeasuresModel{
    constructor(db){
        this.db = db;
    }

    newMeasure(measure, connection) {
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `INSERT INTO animalweights( weight, weightDate, animalEarringId, crossHeight, toraxDiameter) VALUES (?,?,?,?,?)`;
            
        const params = [
            measure.weight,
            measure.weightDate,
            measure.animalEarringId,
            measure.crossHeight,
            measure.toraxDiameter,
        ];

        return new Promise((resolve, reject)=>{
            conn.query(sql,params, function(err,res){
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        }); 
    }

    fetchMeasures(animalEarringId, connection) {
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `SELECT * FROM animalweights WHERE animalEarringId=?`;
            
        const params = [animalEarringId];

        return new Promise((resolve,reject)=>{
           conn.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    let weightData = {};
                    let weightTagsPush = [];
                    res.forEach(element=>{
                        weightData[element.animalEarringId] = element;
                        weightTagsPush.push(element.weight);
                    })
                    resolve(weightTagsPush);
                }
            })
        });

    }



    
}

module.exports = MeasuresModel;