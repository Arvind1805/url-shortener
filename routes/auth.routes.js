import Router from 'express';
import * as authControllers from '../controllers/auth.controller.js' 

const router = Router();

// router.get('/auth/login',authControllers.loginController);

// router.get('/auth/register',authControllers.registerController);
router.route('/auth/register').get(authControllers.registerController).post(authControllers.postRegisterController);

//router helps us to use in this way instead of writing two diff statement.
router.route('/auth/login').get(authControllers.loginController).post(authControllers.postLoginController);

router.route('/auth/logout').get(authControllers.logoutController);

export const authRoutes = router;
