const AnimalCardexController = require('../controller/AnimalCardexController')

module.exports = function(app){
    app.route('/animalcardex/create')
    .post(AnimalCardexController.animalCardexCreateTransaction)
    app.route('/animalcardex/forearringid/:earring')
    .get(AnimalCardexController.getAccruedMovementsOfAnimal)
}