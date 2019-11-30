const ItemCardexModel = require('../model/ItemCardexModel')
const db = require('../util/db.js')
const ItemLotModel = require('../model/ItemLotModel')

exports.saveFullItemCardexTransaction = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const itemLotModel    = new ItemLotModel(db);

    const payload = req.body;   //Body's payload is assumed to be a 2 places array
    
    const itemCardexHeader = payload[0];
    const itemCardexDetail = payload[1];

    //Filters just the entries with expiration control
    let expirationControlItems = itemCardexDetail.filter(item=>{
        return (item.expirationControl == 1);
    });
    //Just item codes
    let filterItemLot = expirationControlItems.map(item=>{
        return item.itemCode;
    })

    
    //Obtains ItemLotModel's entries
    itemLotModel.getPreviousItemLots(filterItemLot).then(previousLots=>{
        let prevLots = {};
        if(previousLots.length > 0){
            previousLots.forEach(lot => {
                prevLots[lot.itemCode] = lot;
            });
        }
        
        let insertableLots = expirationControlItems.map(item=>{
            let newItem = {};
            if(prevLots[item.itemCode]){
                newItem = prevLots[item.itemCode];

                if(item.transactionClass == 1)
                    newItem.unitsInExistance+=item.unitsInTransaction;
                else
                    newItem.unitsInExistance-=item.unitsInTransaction;
            }else{
                newItem.unitsInExistance = item.unitsInTransaction;
                newItem.itemCode = item.itemCode;
                newItem.lotNumber = item.lotNumber;
                newItem.expirationDate=item.expirationDate;
                newItem.seq_no = null;
            }

            return newItem;
        });

        finalLots = insertableLots.map(item=>{
            return [
                item.seq_no, 
                item.itemCode, 
                item.lotNumber, 
                item.expirationDate, 
                item.unitsInExistance
            ];
        })
        let previousEntries = itemCardexModel.getPreviousItemCardexDetailEntries(itemCardexHeader.costCenterCode);

        return Promise.all([finalLots,previousEntries]);
    }).then(lotsAndPreviousEntries=>{   
        return itemCardexModel.fullItemCardexTransaction(itemCardexHeader,itemCardexDetail,lotsAndPreviousEntries[1],lotsAndPreviousEntries[0]);    
    }).then(cardexTransaction=>{
        res.json(cardexTransaction);
    }).catch(err=>{    
        console.log(err);    
        res.status(500).send(err);
    })
}

exports.getCurrentInventory = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const cc = req.params.costCenter;

    itemCardexModel.getPreviousItemCardexDetailEntries(cc).then(
        success=>{
            res.json(success);
        }
    ).catch(err=>{
        res.status(500).send(err);
    })
}

exports.getItemCardexPerCostCenter = function (req,res) {
    const itemCardexModel = new ItemCardexModel(db);
    const costCenterId = req.params.costCenterId;
    const dateFrom = req.params.dateFrom;
    let dateTo   = req.params.dateTo;

    if(dateTo == 'null'){
        dateTo = null;
    }

    console.log(req.params);
    
    
    itemCardexModel.getItemCardexEntriesPerCostCenter(costCenterId,dateFrom,dateTo).then(
        itemCardex=>{
            res.json(itemCardex);
        },err=>{
            res.status(500).send(err);
        }
    )
}

exports.saveItemCardexEntries = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const payload = req.body;

    const costCenter = payload[0].costCenterCode;

    itemCardexModel.getPreviousItemCardexDetailEntries(costCenter).then(prevEntries=>{
        itemCardexModel.storeItemCardexDetail(itemCardexModel.calculateCardexEntries(prevEntries,payload,null))
        .then(success=>{
            res.json(success);
        }).catch(err=>{
            console.log(err);
            res.status(500).send(err);
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    });
}

exports.getExistencesPerCostCenter = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const costCenterCode  = req.params.costCenter;

    itemCardexModel.getCurrentExistanceForCostCenter(costCenterCode)
        .then(success=>res.json(success))
        .catch(err=> {
            console.log(err);
            
            res.status(500).send(err)
        })
}

exports.getCurrentExistanceForCostCenterWithItemCategory = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const costCenterCode  = req.params.costCenter;

    itemCardexModel.getCurrentExistanceForCostCenterWithItemCategory(costCenterCode)
        .then(success=>res.json(success))
        .catch(err=> {
            console.log(err);
            
            res.status(500).send(err)
        })
}

exports.getItemCardexPerExitSequence = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const costCenterCode = req.params.costCenter;
    const exitSequence   = req.params.exitSequence;

    itemCardexModel.getItemCardexEntriesPerExitDocument(costCenterCode,exitSequence)
        .then(success=> res.json(success))
        .catch(err=> res.status(500).send(err))
}

exports.saveItemReceivalOfExchange = function(req,res){
    const itemCardexModel = new ItemCardexModel(db);
    const detailCardex = req.body;
    const costCenter = detailCardex[0].costCenterCode;

    console.log(detailCardex);
    
    itemCardexModel.getPreviousItemCardexDetailEntries(costCenter).then(prevEntries=>{
        itemCardexModel.itemCardexReceivalTranslationTransaction(itemCardexModel.calculateCardexEntries(prevEntries,detailCardex,null),detailCardex)
        .then(succ=>{
            res.json(succ);
        }).catch(err=>{
            console.log(err);
            res.status(500).send(err);
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    });
}