import AllTypes from '../allTypes';
import Units from '../units';
import { useSelector } from 'react-redux';

const TypesSide = ({
  viewEstate,
  setShowPopUpType,
  types,
  setCreateOportunity,
}) => {
  // const { typeSelected } = useSelector((state) => state.typeState);
  const units = [
    {
      id: 0,
      beds: 3,
      baths: 2,
      price: 135000000,
    },
    {
      id: 1,
      beds: '3 + Studio',
      baths: 3,
      price: 140000000,
    },
    {
      id: 2,
      beds: 3,
      baths: 3,
      price: 140000000,
    },
    {
      id: 3,
      beds: 4,
      baths: 2,
      price: 120000000,
    },
    {
      id: 4,
      beds: 3,
      baths: 2,
      price: 220000000,
    },
    {
      id: 5,
      beds: 3,
      baths: 2,
      price: 135000000,
    },
  ];
  return (
    <div className={`unidadesSide ${viewEstate === 'units' ? 'active' : ''}`}>
      <AllTypes
        types={types}
        setShowPopUpType={setShowPopUpType}
        setCreateOportunity={setCreateOportunity}
      />
      <Units setCreateOportunity={setCreateOportunity} units={units} />
    </div>
  );
};

export default TypesSide;
