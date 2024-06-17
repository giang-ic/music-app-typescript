import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/client/user.controller";

// validate
import * as validate from "../../validate/client/user.validate";

// middlware
import * as middleware from "../../middleware/client/user.middleware";

// use
router.get(
    '/register',
    controller.registerUI
);

router.post(
    '/register',
    validate.register,
    controller.register
);

router.get(
    '/login',
    controller.loginUI
);

router.post(
    '/login',
    validate.login,
    controller.login
);

router.get(
    '/logout',
    controller.logout
);

router.get(
    '/password/forgot',
    controller.forgotPasswordUI
);

router.post(
    '/password/forgot',
    validate.forgotPassword,
    controller.forgotPassword
);

router.get(
    '/password/otp',
    controller.otpUI
);

router.post(
    '/password/otp',
    validate.otp,
    controller.otp
);

router.get(
    '/password/reset',
    middleware.accessResetPassword,
    controller.resetPasswordUI
);

router.post(
    '/password/reset',
    middleware.accessResetPassword,
    validate.resetPassword,
    controller.forgotPassword
);

// export
export const userRouter: Router = router;