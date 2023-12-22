import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Create-Contact.module.css';
import { useSelector } from 'react-redux';

const CreateContact = () => {
  const { projectsList } = useSelector((state) => state.projectState);
  const [selectedPage, setSelectedItem] = useState('contact');

  return (
    <section className={styles['wrap-datos']}>
      <div className="container flex j-sb a-s wrap relative">
        <Link href={'/contacts'} className={`${styles.close} bg-ct`}></Link>
        <div className={styles['top-content']}>
          <div className={styles['top-content-buttonsBar']}>
            <div className="container flex j-s a-c">
              <div className={styles['top-buttons-container']}>
                <div className={styles['top-content-container']}>
                  <button
                    className={styles['top-content-buttons']}
                    onClick={() => setSelectedItem('contact')}>
                    Datos de Contacto
                  </button>
                  <div
                    className={`${styles['top-content-bar']} ${
                      selectedPage === 'contact' && styles.active
                    }`}></div>
                </div>
                <div className={styles['top-content-container']}>
                  <button
                    className={styles['top-content-buttons']}
                    onClick={() => setSelectedItem('additional')}>
                    Información Adicional
                  </button>
                  <div
                    className={`${styles['top-content-bar']} ${
                      selectedPage === 'additional' && styles.active
                    }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles['datos-left']} ${
            styles[
              `${selectedPage === 'contact' ? 'page-active' : 'page-disabled'}`
            ]
          }`}>
          <div className={styles['top-name']}>
            <span>Datos de Contacto</span>{' '}
          </div>
          <form className={styles.msform}>
            <fieldset>
              <input type="text" name="fname" placeholder="Nombre" />
              <input type="text" name="lname" placeholder="Apellidos" />
              <input
                type="text"
                name="document"
                placeholder="Número de Documentos"
              />
              <input type="text" name="email" placeholder="Email" />
              <input type="text" name="phone" placeholder="Celular" />
              <div className={styles.foto}>
                <div className={styles.outerImg}>
                  <img src="images/cam.svg" />
                </div>
                Tomar Foto
              </div>
              <Link
                href={`/detail-estate/${projectsList[0].projectId}?contactId=${77}`}
                className={styles['crear-contacto']}>
                <i className="fa-solid fa-plus"></i>Crear oportunidad
              </Link>
              <button className={styles['contacto-existente']}>Guardar</button>
            </fieldset>
          </form>
        </div>
        <div
          className={`${styles['datos-right']} 
            ${
              styles[
                `${
                  selectedPage === 'additional'
                    ? 'page-active'
                    : 'page-disabled'
                }`
              ]
            }`}>
          <div className={`relative ${styles['top-name']}`}>
            <span>Información Adicional</span>{' '}
          </div>
          <div className={styles['informacion-datos']}>
            <span className={styles['sub-title']}>FAMILIAR:</span>
            <div className={styles.datos}>
              <button
                type="button"
                onClick="cambiarColor(this.parentNode)"
                className={styles.campo}>
                Casado
              </button>
              <button
                type="button"
                onClick="cambiarColor(this.parentNode)"
                className={styles.campo}>
                Soltero
              </button>
              <button
                type="button"
                onClick="cambiarColor(this.parentNode)"
                className={styles.campo}>
                Con Hijos
              </button>
              <button
                type="button"
                onClick="cambiarColor(this.parentNode)"
                className={styles.campo}>
                Sin Hijos
              </button>
              <button
                type="button"
                onClick="cambiarColor(this.parentNode)"
                className={styles.campo}>
                Separado
              </button>
            </div>
          </div>
          <div className={styles['informacion-perfil']}>
            <div className={styles['informacion-datos']}>
              <span className={styles['sub-title']}>TIPO DE COMPRADOR:</span>
              <div className={styles.datos}>
                <button
                  type="button"
                  onClick="cambiarColor(this.parentNode)"
                  className={styles.campo}>
                  Inversionista
                </button>
                <button
                  type="button"
                  onClick="cambiarColor(this.parentNode)"
                  className={styles.campo}>
                  Familiar
                </button>
              </div>
              {/* <button className={styles["crear-contacto"]}>
                <i className="fa-solid fa-plus"></i>Crear oportunidad
                </button>
              <button className={styles["contacto-existente"]}>Guardar</button> */}
              <div className={styles['buttons-right']}>
                <Link
                  href={`/detail-estate/${projectsList[0].projectId}?contactId=${77}`}
                  className={styles['crear-contacto']}>
                  <i className="fa-solid fa-plus"></i>Crear oportunidad
                </Link>
                <button className={styles['contacto-existente']}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateContact;
