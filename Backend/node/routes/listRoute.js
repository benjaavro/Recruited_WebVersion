const listController = require('../controller/listController')

module.exports = function(app){
    app.route('/list/getList').post(listController.list)
    app.route('/list/getCoach').post(listController.listCoach)
    app.route('/list/insertList').post(listController.insertList)
}