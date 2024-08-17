const express = require('express');
const router = express.Router();

const ListAbl = require('../abl/journal/listAbl');
const CreateAbl = require('../abl/journal/createAbl');
const GetAbl = require('../abl/journal/getAbl');
const UpdateAbl = require('../abl/journal/updateAbl');
const DeleteAbl = require('../abl/journal/deleteAbl');

router.get('/', ListAbl);                 // GET /journals
router.get('/:id', GetAbl);               // GET /journals/:id
router.post('/', CreateAbl);              // POST /journals
router.put('/:id', UpdateAbl);            // PUT /journals/:id
router.delete('/:id', DeleteAbl);         // DELETE /journals/:id

module.exports = router;
