import PropertyConnected from '../propertyConnected';
import ConectProperty from '../conectProperty';
import styles from './create.module.css';
import { useDispatch } from 'react-redux';
import { closePopUp } from '../../../redux/popUpOportunity';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { openZoomImg } from '../../../redux/zoomImg';
import { useContext } from 'react';
import BildContext from '../../context';

const CreateStep = ({
  setShowPopUpAddContact,
  setShowPopUpCreateContact,
  isConnected,
  setIsCreated,
  recentContacts,
  setIsConnected,
  setShowPopUp,
  unit,
}) => {
  const dispatch = useDispatch();
  const { projectsList } = useSelector((state) => state.projectState);
  const activeZoomImg = (e, imgToZoom) => {
    e.stopPropagation();
    dispatch(openZoomImg(imgToZoom));
  };
  const { isDark } = useContext(BildContext);
  console.log('contactos en creacion de oportunidada', recentContacts);
  console.log('unidad en creacion de oportunidad', unit);
  return (
    <div className={`${styles.crear} bg-blur`}>
      <div className={styles['crear-tipo']}>
        <div className={styles['creacion-title']}>
          <span className={`${styles['tipo-title']} font-black`}>
            {
              projectsList.find((objeto) => objeto.projectId === unit.projectId)
                .projectName
            }
          </span>
        </div>
        <div className={styles['tipo-unit']}>
          <div className={styles['img-tipo']}>
            <img src="/images/crear-tipo.png" />
            <div
              className={styles['img-tipo-glass']}
              onClick={(e) => {
                activeZoomImg(e, '/images/crear-tipo.png');
              }}></div>
          </div>
          <div className={styles['tipo-info']}>
            <div className={`${styles.tipos} font-black`}>
              <span>{`TIPO ${unit.type} - Unidad ${unit.nuimb}`}</span>
            </div>
            <span className={styles.valor}>{`$ ${parseInt(
              unit.propertyPrice
            ).toLocaleString('es-ES')}`}</span>
            <div className={styles.detalles}>
              <div className={`${styles['details-group']} font-bold`}>
                <Image
                  alt=""
                  src={
                    isDark ? '/images/cards/bed.png' : '/images/light/bed.png'
                  }
                  width="15"
                  height="15"
                />
                <span>{`${unit.bedrooms}`}</span>
              </div>
              -
              <div className={`${styles['details-group']} font-bold`}>
                <Image
                  alt=""
                  src={
                    isDark ? '/images/cards/bath.png' : '/images/light/bath.png'
                  }
                  width="15"
                  height="15"
                />
                <span>{`${unit.baths}`}</span>
              </div>
            </div>
          </div>
          <div
            className={styles.add}
            onClick={() => {
              setShowPopUp(false);
              setTimeout(() => {
                dispatch(closePopUp());
              }, 500);
            }}></div>
        </div>
      </div>
      {isConnected ? (
        <PropertyConnected setIsCreated={setIsCreated} />
      ) : (
        <ConectProperty
          recentContacts={recentContacts}
          setShowPopUpAddContact={setShowPopUpAddContact}
          setShowPopUpCreateContact={setShowPopUpCreateContact}
          setIsCreated={setIsCreated}
          setIsConnected={setIsConnected}
        />
      )}
    </div>
  );
};

export default CreateStep;
