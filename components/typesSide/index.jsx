import AllTypes from '../allTypes';
import Units from '../units';
import { useSelector } from 'react-redux';

const TypesSide = ({
  viewEstate,
  setShowPopUpType,
  types,
  units,
  setCreateOportunity,
}) => {
  // const unitsFiltered = units;
  const { typeSelected } = useSelector((state) => state.typeState);
  console.log('Tipos dentro de typeSide:', types);
  const unitsFiltered = units.filter(
    (unit) => unit.type === types[typeSelected].Tipo
  );
  return (
    <div className={`unidadesSide ${viewEstate === 'units' ? 'active' : ''}`}>
      <AllTypes
        types={types}
        setShowPopUpType={setShowPopUpType}
        setCreateOportunity={setCreateOportunity}
      />
      <div className="outerUnits">
        <Units
          setCreateOportunity={setCreateOportunity}
          units={unitsFiltered}
        />
      </div>
    </div>
  );
};

export default TypesSide;
