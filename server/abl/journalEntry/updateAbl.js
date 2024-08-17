const Ajv = require("ajv");
const ajv = new Ajv();

const journalEntryDao = require("../../dao/journalEntry-dao.js");

async function UpdateAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.body;
        
        const result = journalEntryDao.updateEntry(reqParams)
        res.json({ "msg": result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateAbl;
