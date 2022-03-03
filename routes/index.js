const BookmarkController = require('../controllers/bookmarks')
const router = require('express').Router()

router.post('/catch/:id', BookmarkController.catch)
router.delete('/release/:id', BookmarkController.release)
router.put('/rename/:id', BookmarkController.rename)
router.get('/', BookmarkController.all)
module.exports = router
