const mailController = require('../controller/mailController')

module.exports = function(app){
    app.route('/mail').post(mailController);
}