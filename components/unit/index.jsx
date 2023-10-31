import { useState } from "react";
import styles from "./unit.module.css";
const Unit = ({ unit, setCreateOportunity }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="info-tabla">
      <div
        className="edit-unit bg-ct"
        onClick={(e) => {
          const parentNode = e.target.parentNode;
          if (isHidden) {
            parentNode.classList.add("editValues");
            setIsHidden(false);
            return;
          }

          parentNode.classList.remove("editValues");
          setIsHidden(true);
        }}
      ></div>
      <div className="detalle-tabla">
        <input
          type="text"
          className={styles.inputToEditValue}
          value={unit.unitId}
          disabled={isHidden}
        />
      </div>
      <div className="detalle-tabla">
        <input
          type="text"
          className={styles.inputToEditValue}
          value={unit.beds}
          disabled={isHidden}
        />
      </div>
      <div className="detalle-tabla">
        <input
          type="text"
          className={styles.inputToEditValue}
          value={unit.baths}
          disabled={isHidden}
        />
      </div>
      <div className="detalle-tabla">
        <input
          type="text"
          className={styles.inputToEditValue}
          value={`$ ${unit.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          disabled={isHidden}
        />
      </div>
      <div
        className="llave-tabla"
        onClick={() => setCreateOportunity(true)}
      ></div>
    </div>
  );
};

export default Unit;
