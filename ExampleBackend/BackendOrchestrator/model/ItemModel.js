'use strict'

class ItemModel{
    constructor(db){
        this.db = db;
    }

    saveItem(item, result){
        const sql =  `INSERT INTO item ( itemId,itemName,itemBrand,
            itemDesc,consumptionMeasureUnit,purchaseMeasureUnit,
            conversionFactor,hasIva,hasIeps,origin,maxStockOnInventory,
            minStockOnInventory,deliveryTime,priority,looseness,
            daysOfLooseness,expirationControl,exitRegistryType,
            internallyProduced,internalWaitTime,specialStorageConditions,
            costingType,averagePrice,standardPrice)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;
        const params = [item.codigoBarras,              
            item.nombreProducto,             
            item.marcaProducto,              
            item.descripcionProducto,        
            item.unidadDeMedida, 
            item.unidadDeCompra,             
            item.factorDeConversion,          
            item.iva,                        
            item.ieps,                       
            item.origen,                     
            item.maxCantidadInventarios,
            item.minCantidadInventarios,     
            item.tiempoEntrega,              
            item.prioridad,                  
            item.holgura,                    
            item.diasHolgura,                
            item.expiracion,                 
            item.tipoRegistroSalida,         
            item.prodInt,                    
            item.tiempoEsperaInterno,        
            item.condEspecAlma,              
            item.tipoCosto, 
            item.precioPromedio,                    
            item.precioEstandar];

        try {
            this.db.query(sql, params, function(err,res){
                if(err){
                    console.log("Error: ",err);
                    result(err,null);
                }else{
                    console.log(res.insertId);
                    result(null,res.insertId);
                }
            });
        } catch (error) {
            console.log(error);
            
        }
    }

    getAllItems(result){
        const sql = `SELECT * FROM item`;

        try{
            this.db.query(sql,function(err,rows){
                if(err){
                    console.log(err);
                    result(err,null);
                }else{
                    result(null,rows);
                }
            })
        }catch (error) {
            console.log(error)
        }
    }

    getItemsAndCategories(){
        const sql = `SELECT itemId,itemName,itemBrand,itemDesc,
                    consumptionMeasureUnit,purchaseMeasureUnit,
                    conversionFactor, category.itemLevel,category.alias,
                    category.categoryName
                    FROM item
                    JOIN itemcategory ON item.itemId=itemcategory.itemIdRef
                    JOIN category ON itemcategory.idCategory = category.idCategory
                    ORDER BY itemId,category.itemLevel`;
        
        return new Promise((resolve,reject)=>{
            this.db.query(sql,function(err,rows){
                if(err){
                    reject(err);
                }else{
                    let prev = "";
                    let obj = {};
                    let idx = 0;
                    const props= ['mainCategory','secondaryCategory','tertiaryCategory','quarternaryCategory'];

                    let grouped = [];
                    obj = rows[0];
                    prev = obj.itemId;
                    for(const item of rows){
                        if(prev !== item.itemId){
                            prev = item.itemId;
                            grouped.push(obj);
                            obj = item;
                            idx = 0;
                        }

                        obj[props[idx]] = item.categoryName;
                        idx++;
                    }

                    grouped.push(obj);
                    console.log(grouped);
                    console.log(rows);
                    
                    resolve(grouped);
                }
            });
        })
    }
}

module.exports = ItemModel;