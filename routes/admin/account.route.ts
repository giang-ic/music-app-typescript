import { Router } from "express";
import { format } from "path";

// create instance Router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/account.controller";

// use
router.get(
    '/',
    controller.index
);

router.get(
    '/create',
    controller.createUI
);

// export 
export const AccountRouter: Router = router;