import { Router } from 'express'
import { colaboradoresController } from '../controllers/colaboradoresController.js'

const router = Router()

router.get('/', colaboradoresController.getColaboradores)
router.post('/', colaboradoresController.createColaborador)
router.get('/:id', colaboradoresController.getcolaboradorById)
router.put('/:id', colaboradoresController.updateColaborador)
router.delete('/:id', colaboradoresController.deleteColaborador)

export { router as colaboradoresRouter }


