import PropTypes from "prop-types"; // Import knihovny pro typovou kontrolu props
import Tile from "./Tile"; // Import komponenty Tile, která slouží pro zobrazení obsahu

// Komponenta JournalItem představuje jeden deník v uživatelském rozhraní
const JournalItem = ({ journal, onDelete, onRename }) => {
  return (
    <Tile
      item={journal} // Předání dat deníku do komponenty Tile
      type="journals" // Určení typu obsahu, který Tile zobrazuje
      onDelete={onDelete} // Funkce pro smazání deníku
      onRename={onRename} // Funkce pro přejmenování deníku
    />
  );
};

// Definice typů props pro JournalItem pomocí prop-types
JournalItem.propTypes = {
  journal: PropTypes.shape({
    id: PropTypes.string, // Očekává se, že id deníku bude string
    name: PropTypes.string, // Očekává se, že name deníku bude string
  }),
  onDelete: PropTypes.func, // Očekává se, že onDelete bude funkce
  onRename: PropTypes.func, // Očekává se, že onRename bude funkce
};

export default JournalItem; // Export komponenty pro použití v dalších částech aplikace
