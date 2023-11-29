import React from "react";
import styles from "./styles.module.css";

const Documentation = () => {
  return (
    <div className={styles["doc-perfil"]}>
      <div className={styles["editar-perfil"]}>
        <div className={styles["perfil-img"]}>
          <img src="/images/henry.png" />
        </div>
        <span className={styles["name-perfil"]}>Henry Cavill</span>
        <div className={styles["id-perfil"]}>
          <img src="/images/id.png" />
          13.932.102. Bogotá D.C
        </div>
        <div className={styles["perfil-icons"]}>
          <div className={styles["perfil-icon"]}>
            <img src="/images/phone-profile.png" />
          </div>
          <div className={styles["perfil-icon"]}>
            <img src="/images/mail-profile.png" />
          </div>
          <div className={styles["perfil-icon"]}>
            <img src="/images/whats-profile.png" />
          </div>
        </div>
      </div>

      <div className={styles["documentacion-requerida"]}>
        <div className={styles["doc-top"]}>
          <span className={styles["doc-title"]}>DOCUMENTACIÓN REQUERIDA</span>
        </div>
        <div className={styles["doc-wrap"]}>
          <div className={styles["archivo"]}>
            <div className={styles["load"]}>
              <img src="/images/upload-icon.png" />
              <span>
                Haga click para subir o arrastra acá el archivo a compartir
              </span>
            </div>
            <button className={styles["upload-file"]}>Subir archivo</button>
          </div>
          <div className={styles["doc-list"]}>
            <div className={styles["top-cedula"]}>
              <span className={styles["ced-text"]}>Fotocopia Cédula</span>
              <div className={styles["ced-icon"]}>
                <img src="/images/paper-clip.png" />
              </div>
            </div>

            <div className={styles["certificado"]}>
              <div className={styles["certificado-top"]}>
                <span className={styles["title-cert"]}>
                  Certificado Laboral
                </span>
              </div>
              <div className={styles["cert-pdf"]}>
                <span className={styles["title-pdf"]}>
                  Certificado Laboral.pdf
                </span>
                <div className={styles["icons-pdf"]}>
                  <img src="/images/paper-clip-b.png" width="20" height="20" />
                  <img src="/images/delete.png" />
                </div>
              </div>
              <div className={styles["cert-pdf"]}>
                <span className={styles["title-pdf"]}>
                  Certificado Laboral.pdf
                </span>
                <div className={styles["icons-pdf"]}>
                  <img src="/images/paper-clip-b.png" width="20" height="20" />
                  <img src="/images/delete.png" />
                </div>
              </div>
            </div>
            <div className={styles["certificado"]}>
              <div className={styles["certificado-top"]}>
                <span className={styles["title-cert"]}>
                  Extractos Bancarios
                </span>
              </div>
              <div className={styles["cert-pdf"]}>
                <span className={styles["title-pdf"]}>
                  Extractos Bancarios.pdf
                </span>
                <div className={styles["icons-pdf"]}>
                  <img src="/images/paper-clip-b.png" width="20" height="20" />
                  <img src="/images/delete.png" />
                </div>
              </div>
              <div className={styles["cert-pdf"]}>
                <span className={styles["title-pdf"]}>
                  Extractos Bancarios.pdf
                </span>
                <div className={styles["icons-pdf"]}>
                  <img src="/images/paper-clip-b.png" width="20" height="20" />
                  <img src="/images/delete.png" />
                </div>
              </div>
            </div>

            <div className={styles["top-cedula"]}>
              <span className={styles["ced-text"]}>
                Certificado de ingresos y retenciones
              </span>
              <div className={styles["ced-icon"]}>
                <img src="/images/paper-clip.png" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles["buttons"]}>
          <button className={styles["cancelar"]}>cancelar</button>
          <button className={styles["guardar"]}>GUARDAR</button>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
