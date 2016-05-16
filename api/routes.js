var controllers = require('./controllers');

module.exports = {
    '/' : {
        method : 'get',
        controller : controllers.IndexController.get
    } ,
    '/user' : {
        method : 'post',
        controller : controllers.IndexController.addUser
    },
    '/logout' : {
        method : 'get',
        controller : controllers.IndexController.logout
    }

}