class ItemLotModel{
    constructor(db){
        this.db = db;
    }

    getPreviousItemLots(lstItems){
        var queryCompliment = "(";
        for (let index = 0; index < lstItems.length; index++) {
            queryCompliment+="?,";
        }
        queryCompliment = queryCompliment.substr(0,queryCompliment.length-1);
        queryCompliment+=")";

        const query = `SELECT * FROM itemlot WHERE unitsInExistance > 0 AND itemCode IN`+queryCompliment;
        const params = lstItems;
        
        return new Promise((resolve,reject)=>{
            this.db.query(query,params,function(err,rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    console.log(rows);
                    resolve(rows);
                }
            });
        })
    }

    insertOrUpdateItemLots(processedLots,connection){
        var conn;
        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `INSERT INTO itemlot(itemlot.seq_no, itemlot.itemCode, itemlot.lotNumber, itemlot.expirationDate, itemlot.unitsInExistance) 
                        VALUES ?
                        ON DUPLICATE KEY 
                        UPDATE itemlot.unitsInExistance = VALUES(itemlot.unitsInExistance);`;
        const params = [processedLots];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,rows){
                if(err){
                    console.log(err);
                    reject(err,null);
                }else{
                    resolve(rows);
                }
            });
        })
    }
    
    updateItemLotByItemCodeAndLotNumber(addOrSubstractQty,itemCode,lotNumber,connection){
        if(!connection)
            connection = this.db;
        
        const sql = `UPDATE itemlot SET unitsInExistance = unitsInExistance + ? 
                    WHERE itemCode=? AND lotNumber=?`;
        const params = [addOrSubstractQty,itemCode,lotNumber];

        return new Promise((resolve,reject)=>{
            connection.query(sql,params,function(err,updateRes){
                if(err){
                    reject(err);
                }else{
                    resolve(updateRes);
                }
            });
        })
    } 
}

module.exports = ItemLotModel;