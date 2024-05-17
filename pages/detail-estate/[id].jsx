import { useEffect, useRef, useState } from 'react';
import CreateOportunity from '../../components/createOportunity';
import TypesSide from '../../components/typesSide';
import InfoProject from '../../components/infoProject';
import AddTypePop from '../../components/addTypePop';
import AddUnitPop from '../../components/addUnitPop';
import { getSessionToken } from '../../utils/getSessionToken';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LightBox from '../../components/lightbox';
import Link from 'next/link';
import { closePopUp } from '../../redux/popUpOportunity';
import EditTypePop from '../../components/editTypePop';
import EditUnitPop from '../../components/editUnitPop';
import { changeProjectEdit } from '../../redux/editObjectSlice';

const DetailState = ({ unitsInit, typesInit }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userState);
  const [lightboxImage, setLightboxImage] = useState('');
  const [viewEstate, setViewEstate] = useState('units');
  const [showPopUpType, setShowPopUpType] = useState(false);
  const [showPopUpUnit, setShowPopUpUnit] = useState(false);
  const [createOportunity, setCreateOportunity] = useState(false);
  const [recentContacts, setRecentsContacts] = useState({});
  const router = useRouter();
  const containerEstate = useRef(null);
  const [closeFlag, setCloseFlag] = useState(true);
  const [typeFlag, setTypeFlag] = useState(false);
  const [unitFlag, setUnitFlag] = useState(false);
  const [types, setTypes] = useState(typesInit);
  const [units, setUnits] = useState(unitsInit);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showEditType, setShowEditType] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState(false);
  const [xlsxTemplate, setXlsxTemplate] = useState(null);

  const getXlsxTemplate = async () => {
    const response = await fetch('/api/multimediaRequest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idobject: '1',
        type: 'GL',
        subtype: 'PIM',
      }),
    });
    const templateResponse = await response.json();
    setXlsxTemplate(templateResponse);
  };

  useEffect(() => {
    getXlsxTemplate();
  }, []);

  const getTypes = async () => {
    const response = await fetch('/api/types', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        projectId: `${router.query.id}`,
        page: '1',
        rows: '50',
      }),
    });

    const typesResponse = await response.json();
    console.log('Otros tipos:', typesResponse);
    setTypes(typesResponse.length ? typesResponse : []);
  };

  const getUnits = async () => {
    const response = await fetch('/api/units', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        projectId: `${router.query.id}`,
        page: '1',
        rows: '50',
      }),
    });

    const unitsResponse = await response.json();
    console.log('Otros unidades:', unitsResponse);
    setUnits(unitsResponse.length ? unitsResponse : []);
  };

  useEffect(() => {
    if (typeFlag) {
      setTypeFlag(false);
      getTypes();
    }
    if (unitFlag) {
      setUnitFlag(false);
      getUnits();
    }
    getUnits();
  }, [typeFlag, unitFlag]);

  useEffect(() => {
    getTypes();
    getUnits();
  }, []);

  if (closeFlag) {
    dispatch(closePopUp());
    setCloseFlag(false);
  }

  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );
  const { projectsList } = useSelector((state) => state.projectState);
  const projectSelected = projectsList.filter(
    (project) => router.query.id === project.projectId
  )[0];

  const conectContact = router.query.contactId;

  console.log('Unidades: ', units);
  console.log('Tipos: ', types);
  console.log('Proyecto: ', projectSelected);
  useEffect(() => {
    getRecentsContacts();
  }, []);

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, idclient: '' }),
    });

    const recentsContacts = await response.json();
    setRecentsContacts(recentsContacts);
  };

  const [windowWidth, setWindowWidth] = useState(null);
  const [infoText, setinfoText] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth && windowWidth < 768) {
      setinfoText('Info');
    } else {
      setinfoText('Información');
    }
  }, [windowWidth]);

  const sendXlsx = async (data) => {
    const formData = new FormData();
    formData.append('properties', data);

    console.log('formData: ', formData);

    try {
      const response = await fetch(
        'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadProperties',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }
      );

      if (response.ok) {
        console.log('Batch de unidades subido correctamente');
      } else {
        const errorText = await response.text();
        const errorDta = await response;
        console.log('Error: ', errorText);
        console.log('Error: ', errorDta);
      }
      setTimeout(() => {
        setUnitFlag(true);
      }, 2000);
    } catch (error) {
      console.error(error.message);
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const handleXlsxData = (e) => {
    sendXlsx(e.target.files[0]);
  };

  return (
    <>
      <div className="top-content">
        {conectContact && (
          <li className="selectFilterFlex j-s a-c">
            <p>CONECTA EL CONTACTO CON UN TIPO O UNIDAD:</p>{' '}
            <select className={'selectFilterProject'}>
              {projectsList.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </li>
        )}
        <div className="topInfo-container">
          {!conectContact && (
            <>
              <div className="top-infoContainer">
                <Link href="/" className="back-arrow bg-ct"></Link>

                <h1 className="topProjectName">
                  {projectSelected && projectSelected.projectName}
                </h1>

                <Link
                  href={{
                    pathname: '/edit-project',
                    query: {
                      project: projectSelected ? projectSelected.projectId : '',
                    },
                  }}
                  className={'editProjectDetailState'}
                  onClick={() => dispatch(changeProjectEdit(projectSelected))}
                />
              </div>

              <div className={'top-buttons-container'}>
                <a
                  className={'top-donwload'}
                  href={xlsxTemplate ? xlsxTemplate[0].url : '#'}>
                  <div className={'top-download-icon'} />
                  Descargar
                </a>

                <a
                  className={'top-upload'}
                  clickFunction={(e) => {
                    handleXlsxData(e);
                  }}>
                  <div className={'top-upload-icon'} />
                  Subir
                </a>
              </div>

              {/*
              <li>
                <a href="#">
                  <i className="fa-solid fa-angle-left"></i>
                </a>
              </li>
              <li
                className={`itemTopContent ${
                  viewEstate === 'units' ? 'active' : ''
                }`}
                onClick={() => {
                  setViewEstate('units');
                }}>
                <button className="buttonTopDetailState">Unidades</button>
              </li>
              <li
                className={`itemTopContent ${
                  viewEstate === 'info' ? 'active' : ''
                }`}
                onClick={() => {
                  setViewEstate('info');
                }}>
                <button className="buttonTopDetailState">{infoText}</button>
              </li>
              */}
            </>
          )}
        </div>
      </div>
      <section className="main">
        <div className="container">
          <div className={'containerEstate'} ref={containerEstate}>
            <TypesSide
              types={types}
              units={units}
              viewEstate={viewEstate}
              setShowPopUpType={setShowPopUpType}
              setShowPopUpUnit={setShowPopUpUnit}
              setCreateOportunity={setCreateOportunity}
              setUnitFlag={setUnitFlag}
              setShowEditType={setShowEditType}
              setShowEditUnit={setShowEditUnit}
            />

            {/*
            <InfoProject
              viewEstate={viewEstate}
              info={projectSelected}
              setLightboxImage={setLightboxImage}
              projectId={router.query.id}
            />
            */}
          </div>
        </div>
      </section>

      {lightboxImage !== '' && (
        <LightBox image={lightboxImage} setLightboxImage={setLightboxImage} />
      )}

      <AddTypePop
        setShowPopUpType={setShowPopUpType}
        showPopUpType={showPopUpType}
        setTypeFlag={setTypeFlag}
        projectSelected={projectSelected}
      />

      <AddUnitPop
        setShowPopUpUnit={setShowPopUpUnit}
        showPopUpUnit={showPopUpUnit}
        types={types}
        setUnitFlag={setUnitFlag}
        projectSelected={projectSelected}
      />

      <EditTypePop
        showEditType={showEditType}
        setShowEditType={setShowEditType}
        setTypeFlag={setTypeFlag}
        types={types}
        projectSelected={projectSelected}
      />

      <EditUnitPop
        showEditUnit={showEditUnit}
        setShowEditUnit={setShowEditUnit}
        setUnitFlag={setUnitFlag}
        types={types}
        projectSelected={projectSelected}
      />

      {openPopUpOportunity && (
        <CreateOportunity created={false} recentContacts={recentContacts} />
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/projectDetails?projectId=${context.params.id}&username=FDBILD&type=&page=1&rows=50`
  );

  const units = await response.json();

  const resp = await fetch(
    `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetPropertyTypes?username=FDBILD&projectId=${context.params.id}`
  );

  const types = await resp.json();

  return {
    props: {
      unitsInit: units.length ? units : [],
      typesInit: types.length ? types : [],
    },
  };
};

export default DetailState;
