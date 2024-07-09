import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/auth.controller";

// use
router.get(
    '/login',
    controller.loginUI
);

router.post(
    '/login',
    // validate 
    controller.login
);
// export
export const AuthRouter: Router = router;