const express = require('express');
const router = express.Router();
const { createContact, updateContact, getContact} = require('../controller/contactController');

router.post('/add', createContact);
router.put('/update/:id', updateContact);
router.get('/get', getContact);

module.exports = router;
