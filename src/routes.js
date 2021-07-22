const { Router } = require('express');
const routes = new Router();

const authMiddleware = require('./app/middlewares/authMiddleware');
const UserController = require('./app/controllers/UserController');
const LoginController = require('./app/controllers/loginController');

routes.post("/user", UserController.store);
routes.get("/user", authMiddleware, UserController.show);

routes.post("/login", LoginController.index);


module.exports = routes;