import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Quotes.module.css';
import SquareInput from '../components/squareInput';

const Quotes = () => {
  const [fileIndex, setFileIndex] = useState([]);

  const addCheckboxChange = (index) => {
    if (fileIndex.includes(index)) {
      const fileIndexActualizados = fileIndex.filter((num) => num !== index);
      setFileIndex(fileIndexActualizados);
    } else {
      setFileIndex([...fileIndex, index]);
    }
  };

  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link href={'/buyer/1'} className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>Cotizaciones de John Lennon </div>
          <div className={styles['title-movil']}>Cotizaciones</div>
        </div>
      </div>
      <div className={styles['wrap-cotizaciones']}>
        <div className={styles['buscador-contactos']}>
          <input
            className={styles.buscar}
            type="search"
            placeholder="Buscar por nombre"
          />
        </div>
        <div className={styles['top-cotizaciones']}>
          <div className={styles.nombre}>Nombre</div>
          <div className={styles.fecha}>Fecha de modificación</div>
          <div className={styles['tamaño']}>Tamaño</div>
        </div>
        <div className={styles['listas-cotizaciones']}>
          <div className={styles['nombre-lista']}>
            <details className={styles.accordion}>
              <summary className={styles['accordion-btn']}>
                FONTANA CAMPESTRE TIPO 1
              </summary>
              <div className={styles['accordion-content']}>
                <div className={styles.file}>
                  <div className={styles['name-field']}>
                    <div
                      onClick={() => addCheckboxChange(1)}
                      className={styles['checkbox-container']}>
                      <SquareInput />
                    </div>

                    <img src="images/pdf-icon-white.svg" />
                    <span>John Lennon. TIPO 1.pdf</span>
                  </div>
                  <div className={styles['fecha-field']}>25/03/2023 5:35pm</div>
                  <div className={styles['size-field']}>169.74KB</div>
                  <div className={styles['movil-info']}>
                    <div className={styles['size-field-movil']}>169.74KB</div>
                    <span className={styles['separator-movil']}>|</span>
                    <div className={styles['fecha-field-movil']}>
                      25/03/2023
                    </div>
                  </div>
                  <div className={styles.icons}>
                    <div className={styles.upload}>
                      <img src="images/upload-documentation-white.svg" />
                    </div>
                    <div className={styles.delete}>
                      <img src="images/delete-quote-white.svg" />
                    </div>
                  </div>
                </div>

                <div className={styles.file}>
                  <div className={styles['name-field']}>
                    <div
                      onClick={() => addCheckboxChange(2)}
                      className={styles['checkbox-container']}>
                      <SquareInput />
                    </div>

                    <img src="images/pdf-icon-white.svg" />
                    <span>John Lennon. TIPO 1.pdf</span>
                  </div>
                  <div className={styles['fecha-field']}>25/03/2023 5:35pm</div>
                  <div className={styles['size-field']}>169.74KB</div>
                  <div className={styles['movil-info']}>
                    <div className={styles['size-field-movil']}>169.74KB</div>
                    <span className={styles['separator-movil']}>|</span>
                    <div className={styles['fecha-field-movil']}>
                      25/03/2023
                    </div>
                  </div>
                  <div className={styles.icons}>
                    <div className={styles.upload}>
                      <img src="images/upload-documentation-white.svg" />
                    </div>
                    <div className={styles.delete}>
                      <img src="images/delete-quote-white.svg" />
                    </div>
                  </div>
                </div>

                <div className={styles.file}>
                  <div className={styles['name-field']}>
                    <div
                      onClick={() => addCheckboxChange(3)}
                      className={styles['checkbox-container']}>
                      <SquareInput />
                    </div>

                    <img src="images/pdf-icon-white.svg" />
                    <span>John Lennon. TIPO 1.pdf</span>
                  </div>
                  <div className={styles['fecha-field']}>25/03/2023 5:35pm</div>
                  <div className={styles['size-field']}>169.74KB</div>
                  <div className={styles['movil-info']}>
                    <div className={styles['size-field-movil']}>169.74KB</div>
                    <span className={styles['separator-movil']}>|</span>
                    <div className={styles['fecha-field-movil']}>
                      25/03/2023
                    </div>
                  </div>
                  <div className={styles.icons}>
                    <div className={styles.upload}>
                      <img src="images/upload-documentation-white.svg" />
                    </div>
                    <div className={styles.delete}>
                      <img src="images/delete-quote-white.svg" />
                    </div>
                  </div>
                </div>

                <div className={styles.file}>
                  <div className={styles['name-field']}>
                    <div
                      onClick={() => addCheckboxChange(4)}
                      className={styles['checkbox-container']}>
                      <SquareInput />
                    </div>

                    <img src="images/pdf-icon-white.svg" />
                    <span>John Lennon. TIPO 1.pdf</span>
                  </div>
                  <div className={styles['fecha-field']}>25/03/2023 5:35pm</div>
                  <div className={styles['size-field']}>169.74KB</div>
                  <div className={styles['movil-info']}>
                    <div className={styles['size-field-movil']}>169.74KB</div>
                    <span className={styles['separator-movil']}>|</span>
                    <div className={styles['fecha-field-movil']}>
                      25/03/2023
                    </div>
                  </div>
                  <div className={styles.icons}>
                    <div className={styles.upload}>
                      <img src="images/upload-documentation-white.svg" />
                    </div>
                    <div className={styles.delete}>
                      <img src="images/delete-quote-white.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles['accordion-btn']}>
                FONTANA CAMPESTRE TIPO 2
              </summary>
              <div className={styles['accordion-content']}>
                <div className={styles.file}>
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 1.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 2.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 3.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 4.pdf
                </div>
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles['accordion-btn']}>
                FONTANA CAMPESTRE TIPO 3
              </summary>
              <div className={styles['accordion-content']}>
                <div className={styles.file}>
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 1.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 2.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 3.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 4.pdf
                </div>
              </div>
            </details>

            <details className={styles.accordion}>
              <summary className={styles['accordion-btn']}>
                FONTANA CAMPESTRE TIPO 4
              </summary>
              <div className={styles['accordion-content']}>
                <div className={styles.file}>
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 1.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 2.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 3.pdf
                </div>
                <div className={styles.file}>
                  {' '}
                  <input
                    type="radio"
                    className={styles.fold}
                    name="nickname-enabled"
                  />{' '}
                  John Lennon. TIPO 4.pdf
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {fileIndex.length > 0 && (
        <div className={styles.submenu}>
          <div className={styles['sub-close']} />
          <div className={styles['sub-text']}>
            {fileIndex.length} elemento seleccionado
          </div>
          <div className={styles['sub-icons']}>
            <div className={styles['sub-upload']}>
              <img src="images/upload-documentation-white.svg" />
            </div>
            <div className={styles['sub-delete']}>
              <img src="images/delete-quote-white.svg" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quotes;
