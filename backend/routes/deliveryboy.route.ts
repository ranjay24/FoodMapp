// routes/deliveryboy.route.ts
import express from "express";
import {
    addDeliveryBoy,
    getAllDeliveryBoys,
    assignDeliveryBoyToOrder,
} from "../controller/deliveryboy.controller";

const router = express.Router();

router.post("/add", addDeliveryBoy);
router.get("/", getAllDeliveryBoys);
router.post("/assign/:orderId", assignDeliveryBoyToOrder);

export default router;
