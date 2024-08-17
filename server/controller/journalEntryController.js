const express = require('express');
const router = express.Router();

const ListAbl = require('../abl/journalEntry/listAbl');
const CreateAbl = require('../abl/journalEntry/createAbl');
const DeleteAbl = require('../abl/journalEntry/deleteAbl');
const UpdateAbl = require('../abl/journalEntry/updateAbl');

router.get('/', ListAbl);     // GET /journalEntry
router.post('/', CreateAbl);  // POST /journalEntry
router.delete('/:id', DeleteAbl); // DELETE /journalEntry/:id
router.put('/:id', UpdateAbl);   // PUT /journalEntry/:id

module.exports = router;
