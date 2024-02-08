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
}) => {
  const { user_rol } = useSelector((state) => state.userState);
  useEffect(() => {
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
  }, []);
  console.log('Tipos Dentro de tipo', types);
  console.log('unidaees Dentro de tipo', units);

  return (
    <div className="outerTypes">
      <ul className="tipo" id="sortable">
        {types.map((type, index) => (
          <TypeCard
            id={type}
            setCreateOportunity={setCreateOportunity}
            setShowPopUpUnit={setShowPopUpUnit}
            key={type.nuimb}
            index={index}
            type={type}
            units={
              units.filter((unit) => unit.type === type.idType)
            }
          />
        ))}
      </ul>
      {user_rol === 'ADMIN' && (
        <Button
          classNameInherit={'align-center'}
          buttonType={'primary'}
          label="Agregar Tipo"
          iconImage={'/images/plus.svg'}
          clickFunction={() => setShowPopUpType(true)}
        />
      )}
    </div>
  );
};

export default AllTypes;
