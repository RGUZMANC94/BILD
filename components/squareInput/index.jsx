import React from 'react';
import styles from './SquareInput.module.css';
import { useState } from 'react';

const SquareInput = ({onChangeFunct}) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`${styles.checkboxWrapper} ${isChecked ? styles.checkboxChecked : ''}`}
      onClick={handleCheckboxChange}
    >
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={isChecked}
        onClick={() => {onChangeFunct()}}
      />
    </div>
  );
};

export default SquareInput;
