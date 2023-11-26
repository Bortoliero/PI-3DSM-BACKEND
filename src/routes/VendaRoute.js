const { Router } = require( "express")
const router = Router();

const { findAll, findById, create, update, destroy } = require('../controllers/VendaController.js')

router.route('/').get(findAll)
router.route('/:id').get(findById)
router.route('/').post(create)
router.route('/:id').put(update)
router.route('/:id').delete(destroy)

module.exports = router;