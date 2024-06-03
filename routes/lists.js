const express = require('express');
const router = express.Router();
listController = require('../controllers/listController');
const { ensureAuthenticated } = require('../middleware/auth');


router.post('/create', ensureAuthenticated, listController.createList);
router.post('/add', ensureAuthenticated, listController.addToList);
router.post('/:listId/delete', ensureAuthenticated, listController.deleteList);
router.get('/:listId', listController.viewList);
router.post('/:listId/:id/delete', ensureAuthenticated, listController.deletefromList);

module.exports = router;
