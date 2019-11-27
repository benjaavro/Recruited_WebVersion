'use strict'

class PurchaseOrderModel{
    constructor(db){
        this.db = db;
    }

    createPurchaseOrderHead(head, resulthandle){
        console.log(head);
        
        const sql = `INSERT INTO purchaseorder(purchaseOrderId,purchaseOrdercol,costCenterId,
            vendorRfc,creationDate,currency,unitsAcquired,total)
            VALUES(?,?,?,?,?,?,?,?)`;

        const params = [head.purchaseOrderId,head.purchaseOrderCol,head.costCenterId,head.vendorRfc,
            head.creationDate,head.currency,head.unitsAcquired,head.total];
    
        try {
            this.db.query(sql, params, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    resulthandle(err,null);
                }else{
                    console.log(res.insertId);
                    resulthandle(null,res.insertId);
                }
            });
        } catch (error) {
         console.log(error);
        }
    }

    createPurchaseOrderDetail(detail, resulthandle){
        const sql = `INSERT INTO purchaseorderdetail(parentPurchaseOrder,
            purchaseOrderCostCenter,purchaseOrderDetailcol,
            itemRequested,unitValueExpected,quantityRequested,
            total) VALUES ?`;

        try {
            this.db.query(sql, detail, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    resulthandle(err,null);
                }else{
                    console.log(res.insertId);
                    resulthandle(null,res);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    getPurchaseOrderForNumber(pon){
        const sql = `SELECT podId,parentPurchaseOrder,costCenterId,vendorRfc,DATE(creationDate),currency,unitsAcquired,purchaseorderdetail.total,
        itemRequested, unitValueExpected,quantityRequested,purchaseorder.total as itemTotals,itemName
        FROM purchaseorderdetail
        JOIN purchaseorder ON purchaseorderdetail.parentPurchaseOrder=purchaseorder.purchaseOrderId
        JOIN item ON purchaseorderdetail.itemRequested = item.itemId
        WHERE parentPurchaseOrder = ?
        AND purchaseorder.purchaseOrderCol = 'AUTHORIZED' 
        AND purchaseorderdetail.depleted = 'NO'`;

        const params = [pon];


        return new Promise((resolve,reject)=>{
            this.db.query(sql, params, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }

    depletePurchaseOrderHeader(poid,connection){
        var conn;
        if(connection)
            conn = connection;
        else
            conn = this.db;

        const sql = `UPDATE purchaseorder SET purchaseOrderCol='SUPPLIED' WHERE purchaseOrderId=?`;
        const params = [poid];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        })
    }

    partialDepletePurchaseOrderDetail(idSet,connection){
        var conn;
        if(connection)
            conn = connection;
        else
            conn = this.db;

        const sql = `UPDATE purchaseorderdetail SET depleted='YES' WHERE podId IN (?)`;
        const params = [idSet];

        console.log(idSet);
        
        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        })
    }

    getUnAuthorizedPurchaseOrders(){
        const sql = `SELECT podId,parentPurchaseOrder,purchaseorder.costCenterId,vendorRfc,DATE(creationDate),currency,unitsAcquired,
                    purchaseorderdetail.total, costCenterName,
                    itemRequested, unitValueExpected,quantityRequested,purchaseorder.total as itemTotals,itemName
                    FROM purchaseorderdetail
                    JOIN purchaseorder ON purchaseorderdetail.parentPurchaseOrder=purchaseorder.purchaseOrderId
                    JOIN item ON purchaseorderdetail.itemRequested = item.itemId
                    JOIN costcenter ON purchaseorder.costCenterId=costcenter.costCenterId
                    WHERE purchaseorder.purchaseOrderCol IS NULL
                    AND purchaseorderdetail.depleted = 'NO'
                    ORDER BY purchaseorderdetail.parentPurchaseOrder;`;
        
        return new Promise((resolve,reject)=>{
            this.db.query(sql, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    reject(err);
                }else{
                    //Select only full orders
                    const filterForItemOrders = res.reduce((accumulator,currentPurchaseOrder)=>{
                        if(!accumulator[currentPurchaseOrder.parentPurchaseOrder]){
                            accumulator[currentPurchaseOrder.parentPurchaseOrder] = {};
                            accumulator[currentPurchaseOrder.parentPurchaseOrder].unitsAcquired = currentPurchaseOrder.unitsAcquired;
                            accumulator[currentPurchaseOrder.parentPurchaseOrder].unitsDetected = currentPurchaseOrder.quantityRequested;
                             
                            return accumulator;
                        }else{
                            accumulator[currentPurchaseOrder.parentPurchaseOrder].unitsDetected+=currentPurchaseOrder.quantityRequested;
                            return accumulator;
                        }
                    },{});

                    const entriesSolved = res.filter(item=>{
                        return (filterForItemOrders[item.parentPurchaseOrder].unitsAcquired == filterForItemOrders[item.parentPurchaseOrder].unitsDetected);
                    })

                    resolve(entriesSolved);
                }
            });
        });
    }

    authorizePurchaseOrder(poid){
        const sql = `UPDATE purchaseorder SET purchaseOrderCol='AUTHORIZED' WHERE purchaseOrderId=?`;
        const params = [poid];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        })
    }
}

module.exports = PurchaseOrderModel;