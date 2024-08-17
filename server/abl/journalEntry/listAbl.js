const journalEntryDao = require("../../dao/journalEntry-dao.js");

async function ListAbl(req, res) {
  try {
    const journalList = journalEntryDao.list();
    res.json(journalList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
