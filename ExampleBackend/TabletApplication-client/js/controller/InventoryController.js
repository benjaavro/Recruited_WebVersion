const axios = require('axios');

class InventoryController{
    storeItem(item){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/item',item)
                .then(function(success){
                    console.log(success);
                    resolve(success);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }

    getItems(){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/item')
                .then(function(success){
                    console.log(success);
                    resolve(success.data);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }

    getItemsAndCategories(){
        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/item/categories')
                .then(function(success){
                    console.log(success);
                    resolve(success.data);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }
}

module.exports = InventoryController;