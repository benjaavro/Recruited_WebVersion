const postController = require('../controller/postController')

module.exports = function(app){
    app.route('/post/insert').post(postController.post)
    app.route('/post/get').post(postController.getPost)
    app.route('/post/insertC').post(postController.postC)
    app.route('/post/getC').post(postController.getPostC)
}