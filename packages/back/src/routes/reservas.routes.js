import {Router} from "express";
import { ReservasController } from "../controllers/reservasController.js";

const router = Router();

router.get("/", ReservasController.getReservas)
router.post("/", ReservasController.createReservas );
router.delete('/:id', ReservasController.eliminarReserva);
// router.put('/:id', ReservasController.editarReserva);//por el momento no lo vamos a usar


export { router as reservasRouter };