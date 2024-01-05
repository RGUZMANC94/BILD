import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/Create-project.module.css';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../redux/projectSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ImageDummy from '../public/images/tipo-1.png';

const CreateProject = () => {
  const d = new Date();
  console.log('Fecha: ', d);
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

  const changeXlsx = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      if (event.target.files[0].name.split('.')[1] !== 'xlsx') {
        return;
      }
      reader.onload = (e) => {
        setXlsxFileName(event.target.files[0].name);
        if (featuredProject.current) {
          featuredProject.current.classList.add(styles.showXlsx);
        }
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

  const createProjectForm = async (e) => {
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
    console.log(form);

    /* const projectCreated = await fetch('/api/createProject', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: form,
    });

    dispatch(addNewProject(newProjectInfo));
    document
      .querySelector(`.${styles.popSuccessProjectCreated}`)
      .classList.add(styles.activePopUp);
    setTimeout(() => {
      router.push('/');
    }, 2000);*/
  };

  const [datos, setDatos] = useState({
    projectName: '',
    projectType: 'E',
    location: '',
    neighborhoodId: '5',
    startDate: '',
    pool: '',
    TurkishBath: '',
    sauna: '',
    bbq: '',
  });

  const { id } = useSelector((state) => state.userState);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const searchContact = (e) => {
    console.log(e.target.value);
  };

  const sendFormInfo = async (e) => {
    e.preventDefault();

    setDatos((prevDatos) => ({
      ...prevDatos,
      startDate: Date().toString(),
    }));

    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      /* const projectCreated = await fetch('/api/createProject', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      console.log('projectCreated: ', projectCreated);
  
      if (!projectCreated.ok) {
        throw new Error('Failed to create project');
      }
  
      const responseData = await projectCreated.json();
      // Manejar la respuesta exitosa
      console.log('Proyecto creado:', responseData);

      if(projectCreated.ok) {*/

      const formData = new FormData();
      formData.append('type', 'PRY');
      formData.append('subType', 'IMGPR');
      formData.append('idObject', '85051');
      formData.append('file', selectedFile);

      try {
        const response = await fetch(
          'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadFile',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          console.log('Imagen subida correctamente');
        } else {
          console.error('Error al subir la imagen');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }

    /* document
      .querySelector(`.${styles.popSuccessProjectCreated}`)
      .classList.add(styles.activePopUp);
    setTimeout(() => {
      router.push('/');
    }, 2000);*/
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleBloth(e) {
    handleFileChange(e);
    readURL(e);
  }

  return (
    <>
      <section className={styles.main}>
        <form
          className={styles.createProjectForm}
          onSubmit={sendFormInfo}
          id="IDForm">
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
                    name="projectName"
                    value={datos.projectName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles['name-field']}>
                  <span className={styles.label}>Ciudad</span>
                  <input
                    type="text"
                    name="location"
                    value={datos.location}
                    onChange={handleChange}
                    required
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
                    ref={inputProjectType}>
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
                  <span className={styles.label}>Descripción del Proyecto</span>
                  <textarea
                    name="message"
                    placeholder=""
                    className={styles.message_input}
                    required
                    ref={inputProjectDescription}></textarea>
                </div>
              </fieldset>
            </div>
          </div>
          <div className={styles['proyect-right']}>
            <div className={styles.file}>
              <a className={styles.descargar} href="#">
                <img src="/images/download.svg" />
                Descargar Excel Base
              </a>
            </div>

            <div className={styles.image}>
              <span className={styles.label}>IMAGEN DEL PROYECTO:</span>
              <div className={styles['main-image']}>
                <div
                  className={`bg-ct ${styles.deleteIcon}`}
                  onClick={deleteImage}></div>
                <label
                  htmlFor="mainImgProject"
                  className={styles.labelInputImage}>
                  <input
                    id="mainImgProject"
                    type="file"
                    hidden
                    onChange={handleBloth}
                    accept="image/*"
                    name="mainImage"
                  />

                  <div
                    className={`${styles.imageSelected}`}
                    ref={mainImage}></div>
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
                    onClick={deleteImage}></div>
                  <label
                    htmlFor="firstImgProject"
                    className={styles.labelInputImage}>
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
                      ref={firstImage}></div>
                  </label>
                </div>
                <div className={styles['proyect-img']}>
                  <div
                    className={`bg-ct ${styles.deleteIcon}`}
                    onClick={deleteImage}></div>
                  <label
                    htmlFor="secondImgProject"
                    className={styles.labelInputImage}>
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
                      ref={secondImage}></div>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles['file-movil']}>
              <a className={styles.subir} href="#popup1">
                SUBIR EXCEL de INVENTARIO
              </a>
              <a className={styles.descargar} href="#">
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
                onDragEnter={dragHandler}>
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
                  onClick={deleteXlsx}></div>
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
                    <button className={styles.crear} /* href="#popproyecto"*/>
                      Crear Proyecto
                    </button>
                    {console.log('image: ', ImageDummy)}
                    <img src={ImageDummy.src} alt="" />
                    {}
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
