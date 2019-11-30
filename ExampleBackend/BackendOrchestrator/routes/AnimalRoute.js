const AnimalController = require('../controller/AnimalController')

module.exports = function(app){
    app.route('/animal')
        .post(AnimalController.createAnAnimal);
    app.route('/animal/eid/:earringId')
        .put(AnimalController.updateSectionOfCow)
        .get(AnimalController.getCowById)
    app.route('/animal/sid/:section')
        .get(AnimalController.getAnimalsAtSection)
}