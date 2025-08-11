import { Router } from 'express'
import { ServiciosController } from '../controllers/serviciosController.js'


const router = Router()

router.get('/', ServiciosController.getServicios)
router.post('/', ServiciosController.createServicios)
router.get('/:id', ServiciosController.getServicioId)
router.put('/:id', ServiciosController.updateServicio)
router.delete('/:id', ServiciosController.deleteServicio)

export { router as serviciosRouter }

