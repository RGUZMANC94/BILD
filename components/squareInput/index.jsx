import React, { useEffect } from 'react';
import styles from './SquareInput.module.css';

const SquareInput = ({ onChangeFunct, selectCheckboxes, isDisable }) => {
  useEffect(() => {
    console.log('selectCheckboxes',selectCheckboxes);
  }, [selectCheckboxes]);

  const handleCheckboxChange = () => {
    if (!isDisable) {
      onChangeFunct();
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        className={`checkboxInputQuotes ${styles.checkboxInput}`}
        checked={selectCheckboxes}
        disabled={isDisable}
      />
      <div
        className={`${styles.checkboxWrapper} border-input ${
          selectCheckboxes ? styles.checkboxChecked : ''
        } ${isDisable ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => handleCheckboxChange()}></div>
    </label>
  );
};

export default SquareInput;
