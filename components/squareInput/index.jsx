import React, { useEffect } from 'react';
import styles from './SquareInput.module.css';

const SquareInput = ({ onChangeFunct, selectCheckboxes }) => {
  // const [isChecked, setIsChecked] = useState(selectCheckboxes);
  // console.log(isChecked);

  useEffect(() => {
    console.log(selectCheckboxes);
  }, [selectCheckboxes]);

  const handleCheckboxChange = () => {
    // setIsChecked(!isChecked);
    onChangeFunct();
  };

  return (
    <label>
      <input
        type="checkbox"
        className={`checkboxInputQuotes ${styles.checkboxInput}`}
        // onClick={() => {
        //   onChangeFunct();
        // }}
      />
      <div
        className={`${styles.checkboxWrapper} border-input /*
        isChecked ? styles.checkboxChecked : ''*/
      `}
        onClick={handleCheckboxChange}></div>
    </label>
  );
};

export default SquareInput;
