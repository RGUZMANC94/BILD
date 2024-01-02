import AllTypes from '../allTypes';
import Units from '../units';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { changeTypeSelected } from '../../redux/typeSelectedSlice';
import { useDispatch } from 'react-redux';

const TypesSide = ({
  viewEstate,
  setShowPopUpType,
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
    } else if (types[typeSelected]) {
      setSelectedType(
        units.filter((unit) => unit.type === types[typeSelected].Type)
      );
    }
  }, [typeSelected, types]);
  return (
    <div className={`unidadesSide ${viewEstate === 'units' ? 'active' : ''}`}>
      <AllTypes
        types={types}
        setShowPopUpType={setShowPopUpType}
        setCreateOportunity={setCreateOportunity}
        units={units}
      />
      <div className="outerUnits">
        {typeSelected !== -1 && (
          <Units
            setCreateOportunity={setCreateOportunity}
            units={selectedType}
          />
        )}
      </div>
    </div>
  );
};

export default TypesSide;
