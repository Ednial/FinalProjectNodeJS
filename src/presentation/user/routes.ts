import { Router } from 'express';

import { UserController } from './controller';
import { EliminatorUserService } from './services/eliminator-user.service';
import { FinderUserService } from './services/finder-user.service';
import { FinderUsersService } from './services/finder-users.service';
import { LoginUserService } from './services/login-user.service';
import { RegisterUserService } from './services/register-user.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { Role } from '../../data';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUserService = new FinderUserService();
    const finderUsersService = new FinderUsersService();
    const registerUserService = new RegisterUserService();
    const loginUserService = new LoginUserService();
    const eliminatorUserService = new EliminatorUserService(finderUserService);

    const userController = new UserController(
      finderUserService,
      finderUsersService,
      registerUserService,
      loginUserService,
      eliminatorUserService
    );

    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.use(AuthMiddleware.protect);
    router.get(
      '/',
      AuthMiddleware.restrictTo(Role.SENDER),
      userController.findAllUsers
    );
    router.get('/:id', userController.findUserById);
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(Role.SENDER),
      userController.delete
    );

    return router;
  }
}
