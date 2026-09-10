import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import tradeInRouter from "./trade-in";
import leadsRouter from "./leads";
import orderRouter from "./order";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(tradeInRouter);
router.use(orderRouter);
router.use(leadsRouter);

export default router;
