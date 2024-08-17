const journalDao = require("../../dao/journal-dao.js");

async function ListAbl(req, res) {
  try {
    const journalList = await journalDao.list();
    res.json(journalList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
