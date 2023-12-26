import AllTypes from '../allTypes';
import Units from '../units';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const TypesSide = ({
  viewEstate,
  setShowPopUpType,
  types,
  units,
  setCreateOportunity,
}) => {
  // const unitsFiltered = units;
  const [selectedType, setSelectedType] = useState([]);
  const { typeSelected } = useSelector((state) => state.typeState);

  useEffect(() => {
    if (types[typeSelected]) {
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
      />
      <div className="outerUnits">
        <Units setCreateOportunity={setCreateOportunity} units={selectedType} />
      </div>
    </div>
  );
};

export default TypesSide;
