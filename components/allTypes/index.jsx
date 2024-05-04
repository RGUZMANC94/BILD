import { useEffect, useState } from 'react';
import Button from '../button';
import TypeCard from '../type';
import { useSelector } from 'react-redux';
import Sortable from 'sortablejs';

const AllTypes = ({
  units,
  setShowPopUpType,
  setShowPopUpUnit,
  types,
  setCreateOportunity,
  setShowEditType
}) => {
  const { user_rol } = useSelector((state) => state.userState);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (types && types.length && flag) {
      const sortable = new Sortable(document.getElementById('sortable'), {
        handle: '.draggable',
        draggable: '.itemDrag',
        onChange: (e) => {
          console.log(e);
        },
        onEnd: (e) => {
          console.log(e.oldIndex);
        },
        onSort: (e) => {
          console.log(e);
        },
      });
    }
  }, []);
  console.log('Tipos Dentro de tipo', types);
  console.log('unidaees Dentro de tipo', units);

  return (
    <div className="outerTypes">
      {types && types.length > 0 && (
        <ul className="tipo" id="sortable">
          {!flag && setFlag(true)}
          {types.map((type, index) => (
            <TypeCard
              id={type}
              setCreateOportunity={setCreateOportunity}
              setShowPopUpUnit={setShowPopUpUnit}
              key={type.nuimb}
              index={index}
              type={type}
              units={units.filter((unit) => unit.type === type.idType)}
              setShowEditType={setShowEditType}
            />
          ))}
        </ul>
      )}
      {user_rol === 'ADMIN' && (
        <div className="addTypeButton">
          <Button
            classNameInherit={'align-center'}
            buttonType={'primary'}
            label="Agregar Tipo"
            iconImage={'/images/plus.svg'}
            clickFunction={() => setShowPopUpType(true)}
          />
        </div>
      )}
    </div>
  );
};

export default AllTypes;
