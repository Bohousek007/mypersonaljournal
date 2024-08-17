import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import RenameButton from "./RenameButton";
import { useState } from "react";

const Tile = ({ item, type, onDelete, onRename }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-md transition-shadow duration-300 tile
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Optional Image or Icon */}
      <div className="mb-3 flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <span className="text-3xl">🗂️</span>
        </div>
      </div>

      {/* Title with Link */}
      <h2 className="text-l font-bold mb-4 overflow-wrap break-word max-w-full">
        <Link to={`/${type}/${item.id}`} className="no-underline">
          {item.name}
        </Link>
      </h2>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2 mt-auto">
        <RenameButton id={item.id} onRename={onRename} />
        <DeleteButton id={item.id} name={item.name} onDelete={onDelete} />
      </div>
    </div>
  );
};

Tile.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default Tile;
