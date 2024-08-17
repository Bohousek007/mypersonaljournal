import PropTypes from "prop-types"; // Import knihovny pro typovou kontrolu props
import DeleteButton from "./DeleteButton"; // Import komponenty pro mazání
import RenameButton from "./RenameButton"; // Import komponenty pro přejmenování

// Komponenta JournalEntryItem zobrazuje jednotlivý záznam deníku
const JournalEntryItem = ({ journalEntry, onDelete, onRename }) => {
  return (
    // Kontejner pro zobrazení záznamu s příslušným stylem
    <div className="flex flex-col justify-between min-h-48 w-full p-4 bg-white border border-gray-200 rounded-lg shadow transition-shadow overflow-wrap break-word max-w-full">
      {/* Nadpis záznamu */}
      <h1 className="text-sm font-semibold mb-2 text-black-700">
        {journalEntry.title} {/* Zobrazí název záznamu */}
      </h1>
      {/* Kontejner pro ovládací prvky */}
      <div className="flex justify-center space-x-2 mt-auto">
        {/* Tlačítko pro přejmenování */}
        <RenameButton id={journalEntry.id} onRename={onRename} />
        {/* Tlačítko pro smazání */}
        <DeleteButton
          id={journalEntry.id}
          name={journalEntry.title}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

// Definice typů props pro JournalEntryItem pomocí prop-types
JournalEntryItem.propTypes = {
  journalEntry: PropTypes.shape({
    id: PropTypes.string.isRequired, // Očekává se, že id bude string a je povinné
    title: PropTypes.string.isRequired, // Očekává se, že title bude string a je povinné
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Očekává se, že onDelete bude funkce a je povinná
  onRename: PropTypes.func.isRequired, // Očekává se, že onRename bude funkce a je povinná
};

export default JournalEntryItem; // Export komponenty pro použití v dalších částech aplikace
