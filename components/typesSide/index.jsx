import AllTypes from '../allTypes';
import Units from '../units';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { changeTypeSelected } from '../../redux/typeSelectedSlice';
import { changeTypeSelectedName } from '../../redux/typeSelectedSlice';
import { useDispatch } from 'react-redux';

const TypesSide = ({
  viewEstate,
  setShowPopUpType,
  setShowPopUpUnit,
  types,
  units,
  setCreateOportunity,
}) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState([]);
  const [flagType, setFlagType] = useState(false);
  const { typeSelected } = useSelector((state) => state.typeState);

  useEffect(() => {
    if (!flagType) {
      setFlagType(true);
      dispatch(changeTypeSelected(-1));
      dispatch(changeTypeSelectedName(-1));
    } else if (types[typeSelected]) {
      setSelectedType(
        units.filter((unit) => unit.type === types[typeSelected].idType)
      );
      dispatch(changeTypeSelectedName(types[typeSelected].idType));
    }
  }, [typeSelected, types, units]);
  return (
    <div className={`unidadesSide ${viewEstate === 'units' ? 'active' : ''}`}>
      <AllTypes
        types={types}
        setShowPopUpType={setShowPopUpType}
        setShowPopUpUnit={setShowPopUpUnit}
        setCreateOportunity={setCreateOportunity}
        units={units}
      />
      <div className="outerUnits">
        {typeSelected !== -1 && (
          <Units
            setCreateOportunity={setCreateOportunity}
            setShowPopUpUnit={setShowPopUpUnit}
            units={selectedType}
          />
        )}
      </div>
    </div>
  );
};

export default TypesSide;
