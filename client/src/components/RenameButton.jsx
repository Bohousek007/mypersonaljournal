import PropTypes from "prop-types";

const RenameButton = ({ id, onRename }) => {
  return (
    <button
      onClick={() => onRename(id)}
      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-decoration-none"
    >
      Změnit
    </button>
  );
};

RenameButton.propTypes = {
  id: PropTypes.string,
  onRename: PropTypes.func,
};

export default RenameButton;
