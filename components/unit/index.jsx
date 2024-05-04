import { useState } from 'react';
import styles from './unit.module.css';
import { useDispatch } from 'react-redux';
import { openPopUp } from '../../redux/popUpOportunity';
import { changeUnitSelected } from '../../redux/unitSelectedSlice';
import { changeUnitEdit } from '../../redux/editObjectSlice';
const Unit = ({ unit, setCreateOportunity, setShowEditUnit }) => {
  const [isHidden, setIsHidden] = useState(true);
  const dispatch = useDispatch();

  function handleDispatch() {
    dispatch(openPopUp(true));
    dispatch(changeUnitSelected(unit));
  }

  return (
    <div className="info-tabla">
      <div
        className={`edit-unit ${styles.editUnit} bg-ct`}
        onClick={() => {
          dispatch(changeUnitEdit(unit));
          setShowEditUnit(true);
        }}></div>
      <div className="detalle-tabla">
        <input
          type="text"
          className={styles.inputToEditValue}
          value={unit.nuimb}
          disabled={isHidden}
        />
      </div>
      <div className="detalle-tabla">
        <input
          type="text"
          className={styles.inputToEditValue}
          value={unit.bedrooms}
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
          value={`$ ${unit.propertyPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
          disabled={isHidden}
        />
      </div>
      <div
        className={unit.status === 'R' ? 'llave-tabla-desabled' : 'llave-tabla'}
        onClick={() => handleDispatch()}></div>
    </div>
  );
};

export default Unit;
