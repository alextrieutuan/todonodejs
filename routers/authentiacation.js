import userController from './../controllers/users';

export default function(router) {
    router.post('/login', userController.login);

    router.post('/register', userController.register);
}