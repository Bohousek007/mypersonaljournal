const journalDao = require("../../dao/journal-dao.js");
const journalEntryDao = require("../../dao/journalEntry-dao.js");

async function GetAbl(req, res) {
  try {
    const id = req.params.id;

    // Získání deníku a jeho všech zápisů
    const diary = await journalDao.getDiary(id);
    if (!diary || diary.msg) {
      res.status(404).json({ message: "Diary not found" });
      return;
    }

    const entries = await journalEntryDao.getAllEntries(id);

    // Připojení všech zápisů k deníku
    diary.children = entries || [];

    res.json({...diary, children: entries});

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
