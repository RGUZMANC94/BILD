import React, { useEffect, useState } from 'react';
import styles from './create-oportunity.module.css';
import CreateContact from '../createContact';
import AddContact from '../addContact';
import CreateStep from './create';
import OportunityCreated from './created';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUp } from '../../redux/popUpOportunity';
import AddEvents from './addEvents';
import recentsContacts from '../../pages/api/recentsContacts';

const CreateOportunity = ({ created, recentContacts }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpCreateContact, setShowPopUpCreateContact] = useState(false);
  const [showPopUpAddContact, setShowPopUpAddContact] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isCreated, setIsCreated] = useState(created);
  const [showPopEvents, setShowPopEvents] = useState(false);
  const [generateQuote, setGenerateQuote] = useState(false);
  const [contactSelected, setContactSelected] = useState({});
  const { unitSelected } = useSelector((state) => state.unitState);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const dispatch = useDispatch();
  const { imgTypeSelected } = useSelector((state) => state.typeState);

  console.log('---showPopUp', showPopUp);
  console.log('isConnected', isConnected);
  console.log('isCreated', isCreated);
  console.log('showPopEvents', showPopEvents);
  console.log('generateQuote', generateQuote);

  useEffect(() => {
    setShowPopUp(true);
  }, []);

  const returnPrevStep = () => {
    if (generateQuote) {
      setGenerateQuote(false);
      return;
    }
    if (isCreated) {
      setIsCreated(false);
      return;
    }
    if (isConnected) {
      setIsConnected(false);
      return;
    }
  };

  return (
    <>
      <div
        className={`${styles['main-container']} ${
          showPopUp ? styles.openCreateOportunity : ''
        }`}>
        <header className={styles.headerMainContainer}>
          <div className={styles.banner}>
            <div className={styles['banner-oportunidad']}>
              {(isConnected || isCreated) && (
                <div
                  className={styles.prevStep}
                  onClick={() => {
                    returnPrevStep();
                  }}></div>
              )}

              <div className={styles['creacion-oportunidad']}>
                {isCreated
                  ? 'Oportunidades de John Lennon'
                  : 'Crear Oportunidad'}
              </div>
              <div
                className={`${styles.closePopUp} bg-ct`}
                onClick={() => {
                  setShowPopUp(false);
                  setTimeout(() => {
                    dispatch(closePopUp(false));
                  }, 500);
                }}></div>
            </div>
          </div>
        </header>

        <section
          className={styles.main}
          style={{ backgroundImage: `url(${imgTypeSelected})` }}>
          {isCreated ? (
            <OportunityCreated
              setShowPopUp={setShowPopUp}
              setShowPopUpAddContact={setShowPopUpAddContact}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              showPopEvents={showPopEvents}
              setShowPopEvents={setShowPopEvents}
              generateQuote={generateQuote}
              setGenerateQuote={setGenerateQuote}
              setIsCreated={setIsCreated}
              unit={unitSelected}
              refreshFlag={refreshFlag}
              setRefreshFlag={setRefreshFlag}
            />
          ) : (
            <CreateStep
              setShowPopUp={setShowPopUp}
              setShowPopUpAddContact={setShowPopUpAddContact}
              setShowPopUpCreateContact={setShowPopUpCreateContact}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              setIsCreated={setIsCreated}
              recentContacts={recentContacts}
              unit={unitSelected}
            />
          )}
        </section>

        <div className={styles['menu-footer']}></div>
      </div>

      {/* showPopUpCreateContact && (
        <CreateContact
          setIsConnected={setIsConnected}
          setShowPopUpCreateContact={setShowPopUpCreateContact}
          recentContacts={recentContacts}
        />
      )*/}

      {showPopUpAddContact && (
        <AddContact
          setIsConnected={setIsConnected}
          setShowPopUpAddContact={setShowPopUpAddContact}
          recentContacts={recentContacts}
        />
      )}

      {showPopEvents && (
        <AddEvents
          setShowPopEvents={setShowPopEvents}
          setRefreshFlag={setRefreshFlag}
        />
      )}
    </>
  );
};

export default CreateOportunity;
