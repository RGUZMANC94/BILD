import React, { useRef, useState } from 'react';
import styles from '../styles/Create-project.module.css';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../redux/projectSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CreateProject = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const mainImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const dragZone = useRef(null);
  const xlsxInput = useRef(null);
  const featuredProject = useRef(null);
  const inputXlsx = useRef(null);
  const inputProjectName = useRef(null);
  const inputProjectCity = useRef(null);
  const inputProjectLocation = useRef(null);
  const inputProjectType = useRef(null);
  const inputProjectStage = useRef(null);
  const inputProjectDescription = useRef(null);

  const [xlsxFileName, setXlsxFileName] = useState('');

  const searchContact = (e) => {
    console.log(e.target.value);
  };

  const changeXlsx = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      if (event.target.files[0].name.split('.')[1] !== 'xlsx') {
        return;
      }
      reader.onload = (e) => {
        setXlsxFileName(event.target.files[0].name);
        featuredProject.current.classList.add(styles.showXlsx);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const readURL = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (event.target.id === 'mainImgProject') {
          mainImage.current.style.backgroundImage = `url(${e.target.result})`;
          mainImage.current.parentNode.parentNode.classList.add(styles.active);
          return;
        }
        if (event.target.id === 'firstImgProject') {
          firstImage.current.style.backgroundImage = `url(${e.target.result})`;
          firstImage.current.parentNode.parentNode.classList.add(styles.active);
          return;
        }
        if (event.target.id === 'secondImgProject') {
          secondImage.current.style.backgroundImage = `url(${e.target.result})`;
          secondImage.current.parentNode.parentNode.classList.add(
            styles.active
          );
          return;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const deleteImage = (e) => {
    const deleteIconSelected = e.target;
    const parentDeleteIcon = deleteIconSelected.parentNode;
    const imageSelected = parentDeleteIcon.querySelector(
      `.${styles.imageSelected}`
    );
    const inputSelected = parentDeleteIcon.querySelector('input');

    if (parentDeleteIcon) {
      imageSelected.style.backgroundImage = 'none';
      parentDeleteIcon.classList.remove(styles.active);
      inputSelected.value = '';
    }
  };

  const dragHandler = (e) => {
    e.preventDefault();
    dragZone.current.classList.add(styles.activeZone);
  };
  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const { name } = file;
    const ext = name.split('.')[1];

    if (ext !== 'xlsx') {
      return;
    }

    const dT = new DataTransfer();
    dT.items.add(file);
    inputXlsx.current.files = dT.files;
    setXlsxFileName(name);
    dragZone.current.classList.remove(styles.activeZone);
    featuredProject.current.classList.add(styles.showXlsx);
  };

  const deleteXlsx = () => {
    featuredProject.current.classList.remove(styles.showXlsx);
    setTimeout(() => {
      setXlsxFileName('');
      inputXlsx.current.value = '';
    }, 300);
  };

  const createProject = async (e) => {
    e.preventDefault();

    const newProjectInfo = {
      id: Date.now(),
      name: inputProjectName.current.value,
      imgProject:
        mainImage.current.style.backgroundImage !== ''
          ? mainImage.current.style.backgroundImage
              .match(/url\(([^)]+)\)/i)[1]
              .replace(/['"]+/g, '')
          : '',
    };

    const form = new FormData(document.getElementById('IDForm'));

    const projectCreated = await fetch('/api/createProject', {
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: form,
    });

    console.log(projectCreated);

    dispatch(addNewProject(newProjectInfo));
    document
      .querySelector(`.${styles.popSuccessProjectCreated}`)
      .classList.add(styles.activePopUp);
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <>
      <section className={styles.main}>
        <form
          className={styles.createProjectForm}
          onSubmit={createProject}
          id="IDForm"
        >
          <div className={styles['proyect-left']}>
            <div className={styles['image-movil']}>
              <span className={styles.label}>Imagen del Proyecto:</span>
              <div className={styles['main-image']}></div>
            </div>
            <div className={styles['proyect-form']}>
              <fieldset>
                <div className={styles['name-field']}>
                  <span className={styles.label}>Nombre del Proyecto</span>
                  <input
                    type="text"
                    name="fname"
                    required
                    ref={inputProjectName}
                  />
                </div>
                <div className={styles['name-field']}>
                  <span className={styles.label}>Ciudad</span>
                  <input
                    type="text"
                    name="lname"
                    required
                    ref={inputProjectCity}
                  />
                </div>
                <div className={styles['name-field']}>
                  <span className={styles.label}>Ubicación</span>
                  <input
                    type="text"
                    name="document"
                    required
                    ref={inputProjectLocation}
                  />
                </div>
                <div className={styles['name-field']}>
                  <span className={styles.label}>Tipo de INmueble</span>
                  <label htmlFor="subject"></label>
                  <select
                    placeholder="Subject line"
                    name="subject"
                    className={styles.subject_input}
                    required
                    ref={inputProjectType}
                  >
                    <option disabled defaultValue={0} hidden selected></option>
                    <option>Opción 1</option>
                    <option>Opción 2</option>
                    <option>Opción 3</option>
                  </select>
                </div>
                <div className={styles['name-field']}>
                  <span className={styles.label}>Etapas</span>
                  <input
                    type="text"
                    name="phone"
                    required
                    ref={inputProjectStage}
                  />
                </div>
                <div className={styles['name-field']}>
                  <span className={styles.label}>
                    Descripción del Proyecto
                  </span>
                  <textarea
                    name="message"
                    placeholder=""
                    className={['message_input']}
                    cols="30"
                    rows="5"
                    required
                    ref={inputProjectDescription}
                  ></textarea>
                </div>
              </fieldset>
            </div>
          </div>
          <div className={styles['proyect-right']}>
            <div className={styles.file}>
              <a button className={styles.descargar} href="#">
                <img src="/images/download.svg" />
                Descargar Excel Base
              </a>
            </div>

            <div className={styles.image}>
              <span className={styles.label}>IMAGEN DEL PROYECTO:</span>
              <div className={styles['main-image']}>
                <div
                  className={`bg-ct ${styles.deleteIcon}`}
                  onClick={deleteImage}
                ></div>
                <label
                  htmlFor="mainImgProject"
                  className={styles.labelInputImage}
                >
                  <input
                    id="mainImgProject"
                    type="file"
                    hidden
                    onChange={readURL}
                    accept="image/*"
                    name="mainImage"
                  />

                  <div
                    className={`${styles.imageSelected}`}
                    ref={mainImage}
                  ></div>
                </label>
              </div>
            </div>
            <div className={styles['/images']}>
              <div className={styles['img-title']}>
                <span className={styles.label}>
                  Imágenes del Proyecto:{' '}
                  <i className={styles['fa-solid fa-plus']}></i>
                </span>
              </div>
              <div className={styles['more-images']}>
                <div className={styles['proyect-img']}>
                  <div
                    className={`bg-ct ${styles.deleteIcon}`}
                    onClick={deleteImage}
                  ></div>
                  <label
                    htmlFor="firstImgProject"
                    className={styles.labelInputImage}
                  >
                    <input
                      id="firstImgProject"
                      type="file"
                      hidden
                      onChange={readURL}
                      accept="image/*"
                      name="firstImage"
                    />
                    <div
                      className={`${styles.imageSelected}`}
                      ref={firstImage}
                    ></div>
                  </label>
                </div>
                <div className={styles['proyect-img']}>
                  <div
                    className={`bg-ct ${styles.deleteIcon}`}
                    onClick={deleteImage}
                  ></div>
                  <label
                    htmlFor="secondImgProject"
                    className={styles.labelInputImage}
                  >
                    <input
                      id="secondImgProject"
                      type="file"
                      hidden
                      onChange={readURL}
                      accept="image/*"
                      name="secondImage"
                    />
                    <div
                      className={`${styles.imageSelected}`}
                      ref={secondImage}
                    ></div>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles['file-movil']}>
              <a button className={styles.subir} href="#popup1">
                SUBIR EXCEL de INVENTARIO
              </a>
              <a button className={styles.descargar} href="#">
                <img src="/images/download.png" />
                Descargar Excel Base
              </a>
            </div>
            <div className={styles.upload}>
              <div
                ref={dragZone}
                className={styles['blue-border']}
                onDrop={dropHandler}
                onDragOver={dragHandler}
                onDragEnter={dragHandler}
              >
                <img src="/images/upload-icon.png" />
                <span>
                  Haga click para subir o arrastra acá el archivo a compartir
                </span>
                <input type="file" hidden ref={xlsxInput} />
              </div>
              <label className={styles.subir}>
                SUBIR EXCEL de INVENTARIO
                <input
                  type="file"
                  hidden
                  ref={inputXlsx}
                  onChange={changeXlsx}
                  accept=".xlsx, .xls, .csv"
                  name="excel"
                />
              </label>
            </div>

            <div className={`${styles.projectDocument}`} ref={featuredProject}>
              <p className={styles['text-origen']}>DOCUMENTO proyecto:</p>
              <div className={`${styles.projectUploaded} flex j-sb a-c`}>
                <div className={`${styles.backroundSide} flex j-s a-c`}>
                  <div className={`${styles.xlsxIcon} bg-ct`}></div>
                  <p className={`${styles.xlsxName}`}>{xlsxFileName}</p>
                </div>
                <div
                  className={`${styles.deleteXlsxUploaded} bg-ct`}
                  onClick={deleteXlsx}
                ></div>
              </div>
            </div>

            <div className={styles.origen}>
              <p className={styles['text-origen']}>Asignar proyecto:</p>
              <div className={styles['elegir-origen']}>
                <div className={styles.dropDownAssignProject}>
                  <input
                    type="text"
                    className={styles.inputAssignProject}
                    onInput={searchContact}
                  />

                  <div className={styles.contactsToAssign}>
                    <div className={`flex j-s a-c ${styles.optionContact}`}>
                      <div className={`${styles.contactImg} bg-ct`}></div>
                      <p className={styles.contactName}>John Legend</p>
                    </div>
                  </div>
                </div>
                <div className={styles.contacto}>
                  <div className={styles.botones}>
                    <Link href="/" className={styles.cancelar}>
                      <button className={styles['inner-cancelar']}>
                        cancelar
                      </button>
                    </Link>
                    <button className={styles.crear} href="#popproyecto">
                      Crear Proyecto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <div className={`${styles.overlay} ${styles.popup1}`}>
        <div className={styles.popup}>
          <hr />
          <a className={styles.close} href="#">
            &times;
          </a>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/upload-icon.png" />
              <span className={styles['pop-text']}>
                Haga click para subir o arrastra acá el archivo a compartir
              </span>
              <a className={styles.subir} href="#">
                SUBIR ARCHIVO
              </a>
              <div className={styles.contacto}>
                <div className={styles.popbutton}>
                  <button className={styles.crearpop}>GUARDAR</button>

                  <button className={styles.cancelarpop}>cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popSuccessProjectCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú proyecto ha sido creado con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
