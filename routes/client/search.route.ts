// instance Router of express
import { Router } from "express";

// create Router
const router: Router = Router();

// controller
import * as controller from "../../controllers/client/search.controller";

// use
router.get('/result', controller.result);

// export 
export const searchRouter: Router = router;
