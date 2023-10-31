import styles from "../styles/Create-Contact.module.css";

const CreateContact = () => {
  return (
    <div className={styles["wrap-datos"]}>
      <div className={styles["datos-left"]}>
        <div className={styles["top-name"]}>
          <span>Datos de Contacto</span>{" "}
        </div>
        <form className={styles["msform"]}>
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
            <div className={styles["foto"]}>
              <img src="images/tomar-foto.png" />
              Tomar Foto
            </div>
            <button className={styles["crear-contacto"]}>
              <i className="fa-solid fa-plus"></i>Crear oportunidad
            </button>
            <button className={styles["contacto-existente"]}>Guardar</button>
          </fieldset>
        </form>
      </div>
      <div className={styles["datos-right"]}>
        <div className={styles["top-name"]}>
          <span>Información Adicional</span>{" "}
        </div>
        <div className={styles["informacion-datos"]}>
          <span className={styles["sub-title"]}>FAMILIAR:</span>
          <div className={styles["datos"]}>
            <button
              type="button"
              onclick="cambiarColor(this.parentNode)"
              className={styles["campo"]}
            >
              Casado
            </button>
            <button
              type="button"
              onclick="cambiarColor(this.parentNode)"
              className={styles["campo"]}
            >
              Soltero
            </button>
            <button
              type="button"
              onclick="cambiarColor(this.parentNode)"
              className={styles["campo"]}
            >
              Con Hijos
            </button>
            <button
              type="button"
              onclick="cambiarColor(this.parentNode)"
              className={styles["campo"]}
            >
              Sin Hijos
            </button>
            <button
              type="button"
              onclick="cambiarColor(this.parentNode)"
              className={styles["campo"]}
            >
              Separado
            </button>
          </div>
        </div>
        <div className={styles["informacion-perfil"]}>
          <div className={styles["informacion-datos"]}>
            <span className={styles["sub-title"]}>TIPO DE COMPRADOR:</span>
            <div className={styles["datos"]}>
              <button
                type="button"
                onclick="cambiarColor(this.parentNode)"
                className={styles["campo"]}
              >
                Inversionista
              </button>
              <button
                type="button"
                onclick="cambiarColor(this.parentNode)"
                className={styles["campo"]}
              >
                Familiar
              </button>
            </div>
            <button className={styles["crear-contacto"]}>
              <i className="fa-solid fa-plus"></i>Crear oportunidad
            </button>
            <button className={styles["contacto-existente"]}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
