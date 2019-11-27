const ItemLot = require('../model/ItemLotModel')
const PurchaseOrder = require('../model/PurchaseOrderModel')

process.on('unhandledRejection', console.log.bind(console)) 

class ItemCardexModel{
    constructor(db){
        this.db = db;
    }

    /**
     * Functions to get table contents
     */
    getPreviousItemCardexDetailEntries(costCenterCode){
        const sql = `SELECT childCardexId,itemName, itemCode, lotNumber, transactionClass, 
            transactionType,parentItemCardex, valuePerUnit, unitsInTransaction,
            valueInTransaction, accruedAverageAmount, accruedAverageValue, currentUnitAverage,
            costCenterCode, optionalCostCenterCode 
            FROM itemcardexdetail 
            JOIN item 
            ON itemcardexdetail.itemCode = item.itemId
            WHERE childCardexId IN(SELECT MAX(childCardexId) FROM itemcardexdetail WHERE costCenterCode=? GROUP BY itemCode)
            AND costCenterCode=? AND accruedAverageAmount>0`;

        const params = [costCenterCode,costCenterCode];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    let rows = {};

                    res.forEach(element=>{
                        rows[element.itemCode] = element;
                    })
                    resolve(rows);
                }
            })
        });
    }

    getItemCardexEntriesPerCostCenter(costCenterId,dateFrom,dateTo){
        var dateCond = `AND DATE(transactionDate) >= ?
                        ORDER BY transactionDate DESC`;
        var params = [costCenterId,costCenterId,dateFrom];

        if(dateTo){
            dateCond = `AND DATE(transactionDate) BETWEEN ? AND ?
                        ORDER BY transactionDate DESC`;
                        params.push(dateTo);
        }

        let getSql = `SELECT childCardexId, itemcardexdetail.costCenterCode,itemCode, itemName, 
        lotNumber, itemcardexdetail.transactionClass, itemcardexdetail.transactionType, transactionName,
        itemcardexdetail.transactionDate, valuePerUnit, unitsInTransaction, valueInTransaction, 
        accruedAverageAmount, accruedAverageValue, currentUnitAverage, itemcardexdetail.optionalCostCenterCode
        FROM itemcardexdetail
        JOIN item 
        ON itemcardexdetail.itemCode = item.itemId
        JOIN transactiontypes
        ON itemcardexdetail.transactionType = transactiontypes.transactionId
        WHERE childCardexId IN(SELECT MAX(childCardexId) FROM itemcardexdetail WHERE costCenterCode=? GROUP BY itemCode)
        AND itemcardexdetail.costCenterCode=? ` + dateCond;

        return new Promise((resolve,reject)=>{
            this.db.query(getSql,params,function(err,rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }

    getCurrentExistanceForCostCenter(costCenterCode){
        const sql = `SELECT childCardexId,itemName, itemCode, lotNumber, transactionClass, 
            transactionType,parentItemCardex, valuePerUnit, unitsInTransaction,
            valueInTransaction, accruedAverageAmount, accruedAverageValue, currentUnitAverage,
            costCenterCode, optionalCostCenterCode 
            FROM itemcardexdetail 
            JOIN item 
            ON itemcardexdetail.itemCode = item.itemId
            WHERE childCardexId IN(SELECT MAX(childCardexId) FROM itemcardexdetail WHERE costCenterCode=? GROUP BY itemCode)
            AND costCenterCode=? AND accruedAverageAmount>0`;

        const params = [costCenterCode,costCenterCode];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }

    getCurrentExistanceForCostCenterWithItemCategory(costCenterCode){
        const sql = `SELECT childCardexId,itemName,expirationControl, itemCode, lotNumber, transactionClass, 
            transactionType,parentItemCardex, valuePerUnit, unitsInTransaction,
            valueInTransaction, accruedAverageAmount, accruedAverageValue, currentUnitAverage,
            costCenterCode, optionalCostCenterCode, category.categoryName,itemcategory.idCategory,category.alias
            FROM itemcardexdetail 
            JOIN item 
            ON itemcardexdetail.itemCode = item.itemId
            JOIN itemcategory
            ON itemcategory.itemIdRef = itemcardexdetail.itemcode
            JOIN category
            ON itemcategory.idCategory = category.idCategory
            WHERE childCardexId IN(SELECT MAX(childCardexId) FROM itemcardexdetail WHERE costCenterCode=? GROUP BY itemCode)
            AND costCenterCode=? AND accruedAverageAmount>0
            ORDER BY childCardexId,category.itemLevel`;

        const params = [costCenterCode,costCenterCode];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }

    getItemCardexEntriesPerExitDocument(costCenterCode,exitDocument){
        const sql = `SELECT childCardexId,itemName, itemCode, lotNumber, transactionClass, 
        transactionType,parentItemCardex, valuePerUnit, unitsInTransaction,
        valueInTransaction, accruedAverageAmount, accruedAverageValue, currentUnitAverage,
        costCenterCode, optionalCostCenterCode 
        FROM itemcardexdetail 
        JOIN item 
        ON itemcardexdetail.itemCode = item.itemId
        WHERE costCenterCode = ? AND optionalGroupingCode = ?
        AND transactable=1`;

        const params = [costCenterCode,exitDocument];

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

    /**
     * Business logic functions
     */
    calculateCardexEntries(indexedPrevCardexEntries,itemsInTransaction,itemCardexHeadCode){
        itemsInTransaction.forEach(cardexEntry=>{

            if(cardexEntry.unitsInTransaction != 0)
                cardexEntry.valuePerUnit = parseFloat(cardexEntry.valueInTransaction)/parseFloat(cardexEntry.unitsInTransaction);
            else
                cardexEntry.valuePerUnit = 0;
                
            //New element or first time
            if(!indexedPrevCardexEntries[cardexEntry.itemCode]){                
                cardexEntry.accruedAverageAmount = parseFloat(cardexEntry.unitsInTransaction);
                cardexEntry.accruedAverageValue  = parseFloat(cardexEntry.valueInTransaction);
    
                cardexEntry.currentUnitAverage = parseFloat(cardexEntry.valuePerUnit);
            }
            //Item already on inventory
            else{
                const prevEntry = indexedPrevCardexEntries[cardexEntry.itemCode];

                if(cardexEntry.transactionClass == 1){
                    cardexEntry.accruedAverageAmount = parseFloat(prevEntry.accruedAverageAmount) + parseFloat(cardexEntry.unitsInTransaction);
                    cardexEntry.accruedAverageValue = parseFloat(prevEntry.accruedAverageValue) + parseFloat(cardexEntry.valueInTransaction);
                }else{
                    cardexEntry.accruedAverageAmount = parseFloat(prevEntry.accruedAverageAmount) -parseFloat(cardexEntry.unitsInTransaction);
                    cardexEntry.accruedAverageValue =  parseFloat(prevEntry.accruedAverageValue)- parseFloat(cardexEntry.valueInTransaction);
                }
    
                if(cardexEntry.accruedAverageValue != 0)
                    cardexEntry.currentUnitAverage = parseFloat(cardexEntry.accruedAverageValue)/parseFloat(cardexEntry.accruedAverageAmount);
                else
                    cardexEntry.currentUnitAverage = 0;                
            }
        })

        const itemsSaveAble = itemsInTransaction.map((item)=>{
            return [
                item.itemCode, 
                item.lotNumber, 
                item.transactionClass, 
                item.transactionType, 
                item.transactionDate,
                itemCardexHeadCode, 
                item.valuePerUnit, 
                item.unitsInTransaction, 
                item.valueInTransaction, 
                item.accruedAverageAmount, 
                item.accruedAverageValue, 
                item.currentUnitAverage, 
                item.costCenterCode, 
                item.optionalCostCenterCode,
                item.optionalGroupingCode
            ];
        });
        
        return itemsSaveAble;
    }

    /** 
     * Functions to save item cardex data
    */
    storeItemCardexDetail(lstCardexDetail,connection){
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;


        const sql = `INSERT INTO itemcardexdetail(itemCode, lotNumber, transactionClass, transactionType, 
            transactionDate,parentItemCardex, valuePerUnit, unitsInTransaction, 
            valueInTransaction, accruedAverageAmount, accruedAverageValue, 
            currentUnitAverage, costCenterCode, optionalCostCenterCode,optionalGroupingCode) VALUES ?`;

        const params = [lstCardexDetail];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }

    storeItemCardexHeader(itemCardexHeader, connection){
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `INSERT INTO itemcardexmaster(costCenterCode, vendorRfc, documentId, 
            documentDate, transactionType, transactionDesc, transactionDate, optionalCostCenterCode, 
            uuidCFDI, invoiceTotal, subTotal, vat,referencePurchaseOrder) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            itemCardexHeader.costCenterCode, 
            itemCardexHeader.vendorRfc, 
            itemCardexHeader.documentId, 
            itemCardexHeader.documentDate, 
            itemCardexHeader.transactionType, 
            itemCardexHeader.transactionDesc, 
            itemCardexHeader.transactionDate, 
            itemCardexHeader.optionalCostCenterCode, 
            itemCardexHeader.uuidCFDI, 
            itemCardexHeader.invoiceTotal, 
            itemCardexHeader.subTotal, 
            itemCardexHeader.vat,
            itemCardexHeader.referencePurchaseOrder
        ];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        });
    }

    storeSingleItemCardexDetail(cardexDetail,connection){
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `INSERT INTO itemcardexdetail(itemCode, lotNumber, transactionClass, transactionType, 
            transactionDate,parentItemCardex, valuePerUnit, unitsInTransaction, 
            valueInTransaction, accruedAverageAmount, accruedAverageValue, 
            currentUnitAverage, costCenterCode, optionalCostCenterCode,optionalGroupingCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const params = [
            cardexDetail.itemCode, 
            cardexDetail.lotNumber, 
            cardexDetail.transactionClass, 
            cardexDetail.transactionType, 
            cardexDetail.transactionDate,
            null, 
            cardexDetail.valuePerUnit, 
            cardexDetail.unitsInTransaction, 
            cardexDetail.valueInTransaction, 
            cardexDetail.accruedAverageAmount, 
            cardexDetail.accruedAverageValue, 
            cardexDetail.currentUnitAverage, 
            cardexDetail.costCenterCode, 
            cardexDetail.optionalCostCenterCode,
            cardexDetail.optionalGroupingCode
        ];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }

    /**
     * Functions to alter the information at the item cardex tables
     */
    invalidateItemCardexDetail(invalidateIds,connection){
        var conn;

        if(!connection)
            conn = this.db;
        else
            conn = connection;

        const sql = `UPDATE itemcardexdetail SET transactable=0 WHERE childCardexId IN (?)`;
        const params = [invalidateIds];

        return new Promise((resolve,reject)=>{
            conn.query(sql,params,function(err,res){
                if(err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }

    //Transactions to affect multiple tables
    /**
     * fullItemCardexTransaction: This function saves an item cardex head (invoice header)
     *                             and its body, as well as depleting the corresponding purchase
     *                             order and creating the item lots needed
     * 
     * @param {*} itemCardexHead 
     * @param {*} itemCardexDetail 
     * @param {*} prevEntries 
     * @param {*} itemLots 
     */
    fullItemCardexTransaction(itemCardexHead,itemCardexDetail,prevEntries,itemLots){
        return new Promise((resolve,reject)=>{
            this.db.getConnection((error,connection)=>{
                if(error){
                    console.log(error);
                    reject(error);
                }

                const purchaseOrderModel = new PurchaseOrder(this.db);

                connection.beginTransaction(transactionError=>{
                    if(transactionError){
                        reject(transactionError);
                    }
                    //Promise chain
                    this.storeItemCardexHeader(itemCardexHead,connection)
                    .then(resICH=>{
                        let disposable = this.calculateCardexEntries(prevEntries,itemCardexDetail,resICH.insertId);
                                                
                        return this.storeItemCardexDetail(disposable,connection);
                    }).then(resICD=>{
                        if(itemLots.length > 0){
                            const itemLot = new ItemLot(this.db);
                            
                            return itemLot.insertOrUpdateItemLots(itemLots,connection);
                        }else{
                            return resICD;
                        }
                    }).then(resItemLots=>{
                        if(itemCardexHead.depleteOrder){
                            if(itemCardexHead.depleteOrder == 'FULL'){
                                return purchaseOrderModel.depletePurchaseOrderHeader(itemCardexHead.referencePurchaseOrder,connection);
                            }else{
                                return purchaseOrderModel.partialDepletePurchaseOrderDetail(itemCardexHead.ids,connection);
                            }
                        }else{
                            return resItemLots;
                        }
                    }).then(resPurchaseOrder=>{
                        if(itemCardexHead.depleteOrder){
                            if(itemCardexHead.depleteOrder == 'FULL')
                                return purchaseOrderModel.partialDepletePurchaseOrderDetail(itemCardexHead.ids,connection);
                            else{
                                return resPurchaseOrder;
                            }
                        }
                        else{
                            return resPurchaseOrder;
                        } 
                    }).then(resFinal=>{
                        connection.commit((commitErr)=>{
                            if(commitErr){
                                return commitErr;
                            }

                            connection.end();
                            resolve(resFinal);
                        })

                    }).catch(err=>{
                        console.log(err);
                        connection.rollback(()=>{
                            connection.end();
                            reject(err);
                        })
                    })
                })
            })
        });  
    }

    itemCardexReceivalTranslationTransaction(itemCardexDetailEntries,originalInput){
        //Extract just the payload to invalidate

        console.log(originalInput);
        
        const itemsToInvalidate = originalInput.map(item=>{return item.payload});

        return new Promise((resolve,reject)=>{
            this.db.getConnection((errorC,connection)=>{
                if(errorC){
                    console.log(errorC);
                    reject(errorC);
                }

                connection.beginTransaction(transactionError=>{
                    if(transactionError){
                        console.log(transactionError);
                        
                        reject(transactionError);
                    }
                        
                    
                    this.storeItemCardexDetail(itemCardexDetailEntries,connection)
                    .then(successMainStg=>{
                        return this.invalidateItemCardexDetail(itemsToInvalidate,connection)
                    })
                    .then(successInval=>{
                        connection.commit(commitErr=>{
                            if(commitErr){
                                console.log(commitErr);
                                
                                connection.release();
                                reject(commitErr);
                            }

                            connection.release();

                            resolve(successInval);
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        connection.rollback(()=>{
                            connection.release();
                            reject(err);
                        })
                    })

                    
                })
            })
        })        
    }
}

module.exports = ItemCardexModel;