const axios = require('axios')
class ItemCardexController{
    getCardexEntriesPerCostCenter(costCenterId,dateFrom,dateTo){
        if(!dateTo || dateTo == '')
            dateTo = 'null';

        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/itemcardex/consult/'+costCenterId+'/'+dateFrom+'/'+dateTo)
                .then(success=> resolve(success.data)).catch(err=> reject(err))
        })
    }

    getCurrentExistancePerCostCenter(costCenterId){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/itemcardex/inventory/existances/'+costCenterId)
                .then(response=> resolve(response.data)).catch(err=> reject(err))
        })
    }

    getCurrentExistancePerCostCenterWithCategories(costCenterId){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/itemcardex/inventory/existances/categories/'+costCenterId)
                .then(response=> resolve(response.data)).catch(err=> reject(err))
        })
    }

    getCardexEntriesPerExitNumber(exitNumber,costCenterId){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/itemcardex/translateresult/'+costCenterId+'/'+exitNumber)
            .then(response=> resolve(response.data))
            .catch(err => reject(err))
        })
    }

    fullItemTransaction(itemCardexEntries){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/itemcardex/fulltransaction',itemCardexEntries)
            .then(function(success){
                console.log(success);
                resolve(success);
            })
            .catch(function(err){
                console.log(err);
                reject(err);
            })
        })
    }

    saveCardexEntries(cardexEntries){
        return axios.post('http://localhost:3000/itemcardex/saveentries',cardexEntries);
    }

    saveReceivedItems(receivedItemCardexEntries){
        return axios.post('http://localhost:3000/itemcardex/receivetransaction',receivedItemCardexEntries);
    }

    groupCardexEntries(itemCardexEntries){
        let prev = "";
        let obj = {};
        let idx = 0;
        let props= ['mainCategory','secondaryCategory','tertiaryCategory','quarternaryCategory'];
        let grouped = [];

        prev = itemCardexEntries[0].itemCode;
        obj = itemCardexEntries[0];
        for (const itemCardex of itemCardexEntries) {
            if(prev !== itemCardex.itemCode){
                prev = itemCardex.itemCode;
                grouped.push(obj);
                obj = itemCardex;
                idx = 0;
            }

            obj[props[idx]] = itemCardex.categoryName;
            idx++;
        }
        grouped.push(obj);
        
        return grouped;
    }

    groupReceivedCardexEntries(itemCardexEntries){
        let prev = "";
        let obj = {};
        let idx = 0;
        const props= ['mainCategory','secondaryCategory','tertiaryCategory','quarternaryCategory'];
        let grouped = [];

        prev = itemCardexEntries[0].itemCode;
        obj = itemCardexEntries[0];
        for (const itemCardex of itemCardexEntries) {
            if(prev !== itemCardex.itemCode){
                prev = itemCardex.itemCode;
                grouped.push(obj);
                obj = itemCardex;
                idx = 0;
            }

            obj[props[idx]] = itemCardex.categoryName;
            idx++;
        }
        grouped.push(obj);

        return grouped;
    }
}

module.exports = ItemCardexController;