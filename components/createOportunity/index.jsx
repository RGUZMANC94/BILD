import React, { useEffect, useState } from "react";
import styles from "./create-oportunity.module.css";
import CreateContact from "../createContact";
import AddContact from "../addContact";
import CreateStep from "./create";
import OportunityCreated from "./created";
import { useDispatch } from "react-redux";
import { closePopUp } from "../../redux/popUpOportunity";

const CreateOportunity = ({ created }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpCreateContact, setShowPopUpCreateContact] = useState(false);
  const [showPopUpAddContact, setShowPopUpAddContact] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isCreated, setIsCreated] = useState(created);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowPopUp(true);
  }, []);

  return (
    <>
      <div
        className={`${styles["main-container"]} ${
          showPopUp ? styles.openCreateOportunity : ""
        }`}
      >
        <header>
          <div className={styles["banner"]}>
            <div className={styles["banner-oportunidad"]}>
              <div className={styles["creacion-oportunidad"]}>
                {isCreated
                  ? `Oportunidades de John Lennon`
                  : "Crear Oportunidad"}
              </div>
              <div
                className={`${styles.closePopUp} bg-ct`}
                onClick={() => {
                  setShowPopUp(false);
                  setTimeout(() => {
                    dispatch(closePopUp(false));
                  }, 500);
                }}
              ></div>
            </div>
          </div>
        </header>

        <section className={styles["main"]}>
          {isCreated ? (
            <OportunityCreated />
          ) : (
            <CreateStep
              setShowPopUp={setShowPopUp}
              setShowPopUpAddContact={setShowPopUpAddContact}
              setShowPopUpCreateContact={setShowPopUpCreateContact}
              isConnected={isConnected}
              setIsCreated={setIsCreated}
            />
          )}
        </section>

        <div className={styles["menu-footer"]}></div>
      </div>

      {showPopUpCreateContact && (
        <CreateContact
          setIsConnected={setIsConnected}
          setShowPopUpCreateContact={setShowPopUpCreateContact}
        />
      )}

      {showPopUpAddContact && (
        <AddContact
          setIsConnected={setIsConnected}
          setShowPopUpAddContact={setShowPopUpAddContact}
        />
      )}
    </>
  );
};

export default CreateOportunity;
