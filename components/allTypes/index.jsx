import { useEffect, useState } from "react";
import Button from "../button";
import TypeCard from "../type";
import { useSelector } from "react-redux";
import Sortable from "sortablejs";

const AllTypes = ({ setShowPopUpType, types, setCreateOportunity }) => {
  const { user_rol } = useSelector((state) => state.userState);
  const [getTypes, setGetTypes] = useState([]);
  console.log(types);
  useEffect(() => {
    const sortable = new Sortable(document.getElementById("sortable"), {
      handle: ".draggable",
      draggable: ".itemDrag",
      onChange: (e) => {
        console.log(e);
      },
      // onMove: (e) => {
      //   console.log(e);
      // },
      onEnd: (e) => {
        console.log(e.oldIndex);
      },
      onSort: (e) => {
        console.log(e);
      },
    });
  }, []);

  return (
    <div className="outerTypes">
      <ul className="tipo" id="sortable">
        {types.map((type, index) => (
          <TypeCard
            id={type}
            setCreateOportunity={setCreateOportunity}
            key={type.nuimb}
            index={index}
            type={type}
          />
        ))}
      </ul>
      {user_rol === "ADMIN" && (
        <Button
          className={"align-center"}
          buttonType={"primary"}
          label="Agregar Tipo"
          iconImage={"/images/plus.svg"}
          clickFunction={() => setShowPopUpType(true)}
        />
      )}
    </div>
  );
};

export default AllTypes;
