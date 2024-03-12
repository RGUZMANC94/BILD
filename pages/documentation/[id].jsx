import Link from 'next/link';
import Button from '../../components/button';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';

const Documentation = () => {
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );

  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link
            href={`/buyer/${contactListSelected.idCli}`}
            className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>
            Documentación de {contactListSelected.name}{' '}
            {contactListSelected.lastname}
          </div>
        </div>
      </div>
      <div className={styles['doc-perfil']}>
        <div className={styles['editar-perfil']}>
          <div className={styles['perfil-img']}>
            <img
              src={
                contactListSelected.image[0] !== '' &&
                contactListSelected.image[0]
                  ? `${contactListSelected.image[0].url}`
                  : '/images/tipo-1.png'
              }
            />
          </div>
          <span className={styles['name-perfil']}>
            {contactListSelected.name} {contactListSelected.lastname}
          </span>
          <div className={styles['id-perfil']}>
            <img src="/images/id.png" />
            {contactListSelected.documentNumber} .
          </div>
          <div className={styles['perfil-icons']}>
            <div className={styles['perfil-icon']}>
              <img src="/images/phone-profile.png" />
            </div>
            <div className={styles['perfil-icon']}>
              <img src="/images/mail-profile.png" />
            </div>
            <div className={styles['perfil-icon']}>
              <img src="/images/whats-profile.png" />
            </div>
          </div>
        </div>

        <div className={styles['documentacion-requerida']}>
          <div className={styles['doc-top']}>
            <span className={styles['doc-title-movil']}>Henry Cavill</span>
            <span className={styles['doc-title']}>DOCUMENTACIÓN REQUERIDA</span>
          </div>
          <div className={styles['doc-wrap']}>
            <div className={styles.archivo}>
              <div className={styles.load}>
                <img src="/images/upload-icon.png" />
                <span>
                  Haga click para subir o arrastra acá el archivo a compartir
                </span>
              </div>
              <Button
                buttonType={'secondary'}
                label={'Subir Archivo'}
                classNameInherit={'align-center'}
              />
            </div>
            <div className={styles['doc-list']}>
              <div className={styles['top-cedula']}>
                <span className={styles['ced-text']}>Fotocopia Cédula</span>
                <div className={styles['ced-icon']}>
                  <img src="/images/paper-clip-b.png" />
                </div>
              </div>

              <div className={styles.certificado}>
                <div className={styles['certificado-top']}>
                  <span className={styles['title-cert']}>
                    Certificado Laboral
                  </span>
                </div>
                <div className={styles['cert-pdf']}>
                  <span className={styles['title-pdf']}>
                    Certificado Laboral.pdf
                  </span>
                  <div className={styles['icons-pdf']}>
                    <img
                      src="/images/paper-clip-b.png"
                      width="20"
                      height="20"
                    />
                    <img src="/images/delete.png" />
                  </div>
                </div>
                <div className={styles['cert-pdf']}>
                  <span className={styles['title-pdf']}>
                    Certificado Laboral.pdf
                  </span>
                  <div className={styles['icons-pdf']}>
                    <img
                      src="/images/paper-clip-b.png"
                      width="20"
                      height="20"
                    />
                    <img src="/images/delete.png" />
                  </div>
                </div>
              </div>
              <div className={styles.certificado}>
                <div className={styles['certificado-top']}>
                  <span className={styles['title-cert']}>
                    Extractos Bancarios
                  </span>
                </div>
                <div className={styles['cert-pdf']}>
                  <span className={styles['title-pdf']}>
                    Extractos Bancarios.pdf
                  </span>
                  <div className={styles['icons-pdf']}>
                    <img
                      src="/images/paper-clip-b.png"
                      width="20"
                      height="20"
                    />
                    <img src="/images/delete.png" />
                  </div>
                </div>
                <div className={styles['cert-pdf']}>
                  <span className={styles['title-pdf']}>
                    Extractos Bancarios.pdf
                  </span>
                  <div className={styles['icons-pdf']}>
                    <img
                      src="/images/paper-clip-b.png"
                      width="20"
                      height="20"
                    />
                    <img src="/images/delete.png" />
                  </div>
                </div>
              </div>

              <div className={styles['top-cedula']}>
                <span className={styles['ced-text']}>
                  Certificado de ingresos y retenciones
                </span>
                <div className={styles['ced-icon']}>
                  <img src="/images/paper-clip-b.png" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <Button
              buttonType={'secondary'}
              label={'Cancelar'}
              classNameInherit={'align-center'}
              className={styles['filter-buttons-bottom']}
            />
            <Button
              buttonType={'primary'}
              label={'Guardar'}
              classNameInherit={'align-center'}
              className={styles['filter-buttons-bottom']}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Documentation;
