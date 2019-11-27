const axios = require('axios');

class PurchaseOrderController{
    savePurchaseOrderHead(head){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/purchaseorder/master',head)
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

    savePurchaseOrderDetail(detail){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/purchaseorder/detail',detail)
            .then(function(success){
                console.log(success);
                resolve(success);
            })
            .catch(function(err){
                console.log(err.response);
                reject(err);
            })
        })
    }

    getPurchaseOrderForNumber(pon){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/purchaseorder/'+pon).then(
                function(success){
                    console.log(success);
                    resolve(success.data);
                }
            ).catch(function(err){
                reject(err);
            })
        });
    }

    getUnauthorizedPurchaseOrders(){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/purchaseorder/authorization/getunauthorized').then(
                function(success){
                    console.log(success);
                    resolve(success.data);
                }
            ).catch(function(err){
                reject(err);
            })
        });
    }

    authorizePurchaseOrder(purchaseOrderId){
        return new Promise((resolve,reject)=>{
            axios.put('http://localhost:3000/purchaseorder/authorize/'+purchaseOrderId)
            .then(success=>resolve(success)).catch(err=> reject(err))
        })
    }
}

module.exports = PurchaseOrderController;