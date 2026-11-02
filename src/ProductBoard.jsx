import { useEffect, useState } from "react";
import "./ProductBoard.css";

const PROPERTIES_URL = "http://localhost:3344/api/v1/properties?limit=14";
const BUDGET = 1600;

/** Load properties, then choose tokens under the budget. See README.md. */
export default function ProductBoard() {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    // TODO: GET PROPERTIES_URL, choose tokens within BUDGET, store their ids
    void PROPERTIES_URL;
    void BUDGET;
    void setSelectedIds;
  }, []);

  return (
    <div className="board">
      <h1>Selected tokens</h1>
      <ul aria-label="Selected tokens">
        {selectedIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
}
