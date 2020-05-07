const router = require('express').Router()
const usersController = require('../controller/users')

router.get('/', usersController.getAllUsers)
router.post('/', usersController.createUser)
router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router
