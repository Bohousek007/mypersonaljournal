const Ajv = require("ajv");
const ajv = new Ajv();

const journalEntryDao = require("../../dao/journalEntry-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 5 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    // get request query or body
    const id = req.params.id;

    // Call deleteEntry asynchronously
    const result = await journalEntryDao.deleteEntry(id);
    res.json({ "msg": result });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
