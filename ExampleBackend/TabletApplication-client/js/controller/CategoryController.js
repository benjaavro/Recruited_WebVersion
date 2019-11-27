const axios = require('axios');

class CategoryController{
    getCategories(parentId){
        if(!parentId){
            parentId = '';
        }

        return new Promise((resolve,reject)=>{
            axios.get('http://localhost:3000/categories/'+parentId)
            .then(function(response){
                console.log(response);
                resolve(response.data);
            }).catch(function(err){
                console.log(err);
                reject(response);
            })
        });
        
    }
}

module.exports = CategoryController;