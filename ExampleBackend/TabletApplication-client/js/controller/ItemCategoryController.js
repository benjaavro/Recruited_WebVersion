const axios = require('axios');

class ItemCategoryController{
    saveCategoriesArr(lstCategories){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:3000/item/category',lstCategories)
                .then(function(success){
                    console.log(success);
                    resolve(success);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                })
        });
    }
}

module.exports = ItemCategoryController;