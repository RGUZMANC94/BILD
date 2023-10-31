import AllTypes from "../allTypes";
import Units from "../units";
import { useSelector } from "react-redux";

const TypesSide = ({
  viewEstate,
  setShowPopUpType,
  types,
  setCreateOportunity,
}) => {
  const { typeSelected } = useSelector((state) => state.typesSelected);

  return (
    <div className={`unidadesSide ${viewEstate === "units" ? "active" : ""}`}>
      <AllTypes
        types={types}
        setShowPopUpType={setShowPopUpType}
        setCreateOportunity={setCreateOportunity}
      />
      <Units
        setCreateOportunity={setCreateOportunity}
        units={types[typeSelected].units}
      />
    </div>
  );
};

export default TypesSide;
