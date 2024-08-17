const Ajv = require("ajv");
const ajv = new Ajv();

const journalDao = require("../../dao/journal-dao.js");
const journalEntryDao = require("../../dao/journalEntry-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 5,  }, // Přizpůsobeno délce ID pro MongoDB ObjectId
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {

    const id = req.params.id;

    // Delete journal and its entries
    const result1 = await journalDao.deleteDiary(id);
    const result2 = await journalEntryDao.deleteAllEntries(id);

    // Check if both deletions were successful
    if (result1?.deletedCount > 0 || result2?.deletedCount > 0) {
      res.json({ msg: "Journal and entries deleted successfully" });
    } else {
      res.status(404).json({ msg: "Journal or entries not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
