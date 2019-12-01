const postController = require('../controller/postController')

module.exports = function(app){
    app.route('/post/insert').post(postController.post)
    app.route('/post/get').post(postController.getPost)
}