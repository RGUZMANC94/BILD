// import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { changeTypeSelected } from '../../redux/typeSelectedSlice';
import { changeTypeEdit } from '../../redux/editObjectSlice';
import { openPopUp } from '../../redux/popUpOportunity';
import Button from '../button';

const TypeCard = ({
  units,
  type,
  setCreateOportunity,
  setShowPopUpUnit,
  setShowEditType,
  index,
}) => {
  const dispatch = useDispatch();
  const USDollar = new Intl.NumberFormat('en-US');
  return (
    <li
      id={type.nuimb}
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      className={`itemDrag ${index === -1 ? 'active' : ''}`}
      onPointerUp={(e) => {
        const itemsDrag = document.querySelectorAll('.itemDrag');
        itemsDrag.forEach((item) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });
        itemsDrag[index].classList.add('active');
        dispatch(changeTypeSelected(index));
        console.log('Tipo seleccionado: ', type.Tipo);
        console.log('Index: ', index);
      }}>
      {/* console.log(type.image[0])*/}
      <div className="draggable bg-ct" draggable={true}></div>
      <div className="maskDraggable"></div>
      <div className="tipo-unit">
        <div className="img-tipo">
          <img
            src={
              type.image[0] !== '' && type.image[0]
                ? `${type.image[0].url}`
                : '/images/tipo-1.png'
            }
          />
          <div className="img-tipo-glass"></div>
        </div>
        <div className="tipo-info">
          <span className="tipo-title">Tipo {type.type}</span>
          <span className="valor">
            {`$ ${parseInt(type.minPrice).toLocaleString('es-ES')} - ${parseInt(
              type.maxPrice
            ).toLocaleString('es-ES')} `}
          </span>
          <div className="detalles">
            <div className="detailsGroup">
              <img src="/images/cards/bed.png" />
              <span>
                {type.minBed}-{type.maxBed}
              </span>
            </div>
            <div className="detailsGroup">
              <img src="/images/cards/bath.png" />
              <span>
                {type.minBath}-{type.maxBath}
              </span>
            </div>
          </div>
        </div>
        <div className="tipo-icons">
          <div
            className="edit-type"
            onClick={() => {
              dispatch(changeTypeEdit(type));
              setShowEditType(true);
            }}></div>
          <div className="tipo-arrow"></div>
        </div>

        <div className="caracteristicas-top-movil">
          <div className="caracteristicas-top">
            <div className="top-tabla">ID</div>
            <div className="top-tabla">Alcobas</div>
            <div className="top-tabla">Baños</div>
            <div className="top-tabla">Precio</div>
            {/* <div className="top-tabla"></div> */}
          </div>

          {units.map((unit, i) => (
            <div className="info-tabla" key={i}>
              <div className="detalle-tabla">{unit.idProperty}</div>
              <div className="detalle-tabla">{unit.bedrooms}</div>
              <div className="detalle-tabla">{unit.baths}</div>
              <div className="detalle-tabla price-table">{`$${unit.propertyPrice}`}</div>
              <div
                className="llave-tabla"
                onClick={() => setCreateOportunity(true)}></div>
            </div>
          ))}

          <Button
            inheritClass="add-unit-movil"
            buttonType={'primary'}
            label="Agregar Unidad"
            iconImage={'/images/plus.svg'}
            clickFunction={() => {
              setShowPopUpUnit(true);
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default TypeCard;
