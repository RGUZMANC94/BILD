import PropertyConnected from '../propertyConnected';
import ConectProperty from '../conectProperty';
import styles from './create.module.css';
import { useDispatch } from 'react-redux';
import { closePopUp } from '../../../redux/popUpOportunity';
import { useSelector } from 'react-redux';
import Image from 'next/image';

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

  console.log('contactos en creacion de oportunidada', recentContacts);
  return (
    <div className={styles.crear}>
      <div className={styles['crear-tipo']}>
        <div className={styles['creacion-title']}>
          <span className={styles['tipo-title']}>
            {
              projectsList.find((objeto) => objeto.projectId === unit.projectId)
                .projectName
            }
          </span>
        </div>
        <div className={styles['tipo-unit']}>
          <div className={styles['img-tipo']}>
            <img src="/images/crear-tipo.png" />
            <div className={styles['img-tipo-glass']}></div>
          </div>
          <div className={styles['tipo-info']}>
            <div className={styles.tipos}>
              <span>{`TIPO ${unit.type} - ${unit.idProperty}`}</span>
            </div>
            <span className={styles.valor}>{`$ ${parseInt(
              unit.propertyPrice
            ).toLocaleString('es-ES')}`}</span>
            <div className={styles.detalles}>
              <div className={styles['details-group']}>
                <Image
                  alt=""
                  src="/images/cards/bed.png"
                  width="15"
                  height="15"
                />
                <span>{`${unit.bedrooms}`}</span>
              </div>
              -
              <div className={styles['details-group']}>
                <Image
                  alt=""
                  src="/images/cards/bath.png"
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
