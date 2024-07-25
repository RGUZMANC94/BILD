// import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeTypeSelected,
  updateImgTypeSelected,
} from '../../redux/typeSelectedSlice';
import { changeTypeEdit } from '../../redux/editObjectSlice';
import { openPopUp } from '../../redux/popUpOportunity';
import Button from '../button';
import Image from 'next/image';
import { openZoomImg } from '../../redux/zoomImg';
import BildContext from '../../components/context';
import { changeUnitEdit } from '../../redux/editObjectSlice';

const TypeCard = ({
  units,
  type,
  setCreateOportunity,
  setShowPopUpUnit,
  setShowEditType,
  setShowEditUnit,
  index,
}) => {
  const { initialState, isDark } = useContext(BildContext);
  const { user } = initialState;
  const { userid: id, rol: user_rol } = user;
  const dispatch = useDispatch();
  const USDollar = new Intl.NumberFormat('en-US');
  const activeZoomImg = (e, imgToZoom) => {
    e.stopPropagation();
    dispatch(openZoomImg(imgToZoom));
  };
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
        dispatch(
          updateImgTypeSelected(
            type.image[0] !== '' && type.image[0]
              ? `${type.image[0].url}`
              : '/images/tipo-1.png'
          )
        );
        console.log('Tipo seleccionado: ', type.Tipo);
        console.log('Index: ', index);
      }}>
      {/* console.log(type.image[0])*/}
      <div className="draggable bg-ct" draggable={true}></div>
      <div className="maskDraggable"></div>
      <div className="tipo-unit bg-card">
        <div className="img-tipo">
          <img
            src={
              type.image[0] !== '' && type.image[0]
                ? `${type.image[0].url}`
                : '/images/tipo-1.png'
            }
          />
          <div
            className="img-tipo-glass"
            onClick={(e) => {
              activeZoomImg(
                e,
                type.image[0] !== '' && type.image[0]
                  ? `${type.image[0].url}`
                  : '/images/tipo-1.png'
              );
            }}></div>
        </div>
        <div className="tipo-info">
          <span className="tipo-title title-card">Tipo {type.type}</span>
          <span className="valor">
            {`$ ${parseInt(type.minPrice).toLocaleString('es-ES')} - ${parseInt(
              type.maxPrice
            ).toLocaleString('es-ES')} `}
          </span>
          <div className="detalles">
            <div className="detailsGroup font-bold">
              <Image
                alt=""
                src={isDark ? '/images/cards/bed.png' : '/images/light/bed.png'}
                width="15"
                height="15"
              />
              <span>
                {type.minBed}-{type.maxBed}
              </span>
            </div>
            <div className="detailsGroup font-bold">
              <Image
                alt=""
                src={
                  isDark ? '/images/cards/bath.png' : '/images/light/bath.png'
                }
                width="15"
                height="15"
              />
              <span>
                {type.minBath}-{type.maxBath}
              </span>
            </div>
          </div>
        </div>
        <div className="tipo-icons">
          {user_rol === 'ADMIN' && (
            <div
              className="edit-type"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(changeTypeEdit(type));
                setShowEditType(true);
              }}></div>
          )}

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
              <div
                className={'edit-unit-mobile bg-ct'}
                onClick={() => {
                  dispatch(changeUnitEdit(unit));
                  setShowEditUnit(true);
                }}></div>
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
