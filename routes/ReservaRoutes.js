import express from 'express';
import multer from 'multer';
const router = express.Router();
//Busca o ReservaController
import ReservaController from '../controllers/ReservaController.js'
const controle = new ReservaController();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'reserva/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.edt)
export default router
