import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CreateOportunity from '../../components/createOportunity';
import TypesSide from '../../components/typesSide';
// import InfoProject from '../../components/infoProject';
import AddTypePop from '../../components/addTypePop';
import AddUnitPop from '../../components/addUnitPop';
// import { getSessionToken } from '../../utils/getSessionToken';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LightBox from '../../components/lightbox';
import Link from 'next/link';
import { closePopUp } from '../../redux/popUpOportunity';
import EditTypePop from '../../components/editTypePop';
import EditUnitPop from '../../components/editUnitPop';
import { changeProjectEdit } from '../../redux/editObjectSlice';
import ZoomImg from '../../components/zoomImg';
import EditProjectPop from '../../components/editProjectPop';
// import AddProjectPop from '../../components/addProjectPop';
import { parseCookies } from '../../utils/parseCookies';
import { setUser } from '../../redux/userSlice';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../../components/lodaer';

const DetailState = ({ unitsInit, typesInit, user }) => {
  const { userid: id } = user;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userState);
  const userInfoEmpty = Object.values(userInfo).some((x) => x === '');

  // useMemo(() => {
  //   if (userInfoEmpty) {
  //     dispatch(setUser(user));
  //   }
  // }, []);

  const { isOnZoomImg, imgToZoom } = useSelector((state) => state.zoomImgState);
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
  // const [firstLoad, setFirstLoad] = useState(true);
  const [showEditType, setShowEditType] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState(false);
  const [xlsxTemplate, setXlsxTemplate] = useState(null);
  const [xlsxData, setXlsxData] = useState(null);
  const inputXlsx = useRef(null);
  const [showEditProject, setShowEditProject] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  // const [infoProject, setInfoProject] = useState(null);

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
    if (userInfoEmpty) {
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    if (refreshProjects) {
      setRefreshProjects(false);
      getProject();
    }
  }, [refreshProjects]);

  const getTypes = useCallback(async () => {
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
    // console.log('Otros tipos:', typesResponse);
    setTypes(typesResponse.length ? typesResponse : []);
  }, []);

  const getUnits = useCallback(async () => {
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
    // console.log('Otros unidades:', unitsResponse);
    setUnits(unitsResponse.length ? unitsResponse : []);
  }, []);

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

  // useEffect(() => {
  //   getTypes();
  //   getUnits();
  // }, []);

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

  // console.log('Unidades: ', units);
  // console.log('Tipos: ', types);
  // console.log('Proyecto: ', infoProject);
  useEffect(() => {
    getRecentsContacts();
  }, []);

  useEffect(() => {}, [refreshProjects]);

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

  function handleXlsxClick(e) {
    setXlsxData(e.target.files[0]);
  }

  useEffect(() => {
    sendXlsx(xlsxData);
  }, [xlsxData]);

  const {
    data: dataProject,
    isPending,
    error,
  } = useFetch({
    url: '/api/getProjectInfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      projectId: router.query.id,
    }),
  });
  console.log(dataProject);
  const [infoProject, setInfoProject] = useState(dataProject);

  useEffect(() => {
    if (dataProject[0]) {
      setInfoProject((prevState) => dataProject[0]);
    }
  }, [dataProject]);

  if (isPending || dataProject.length === 0) {
    return <Loader />;
  }

  console.log(infoProject);

  const getProject = async () => {
    const response = await fetch('/api/getProjectInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        projectId: router.query.id,
      }),
    });
    const responseProject = await response.json();

    setInfoProject((prevState) => responseProject[0]);

    console.log('Project actual: ', responseProject[0]);
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
                  {(infoProject && infoProject.projectName) ??
                    dataProject[0].projectName}
                </h1>

                <button
                  className={'editProjectDetailState'}
                  onClick={() => {
                    dispatch(changeProjectEdit(infoProject ?? dataProject[0]));
                    setShowEditProject(true);
                  }}
                />
              </div>

              <div className={'top-buttons-container'}>
                <a
                  className={'top-donwload'}
                  href={xlsxTemplate ? xlsxTemplate[0].url : '#'}>
                  <div className={'top-download-icon'} />
                  Descargar
                </a>
                <label className={'top-upload'}>
                  <input
                    type="file"
                    hidden
                    ref={inputXlsx}
                    onChange={handleXlsxClick}
                    accept=".xlsx, .xls, .csv"
                    name="excel"
                  />
                  <div className={'top-upload-icon'} />
                  Subir
                </label>
              </div>
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
          </div>
        </div>
      </section>
      {lightboxImage !== '' && (
        <LightBox image={lightboxImage} setLightboxImage={setLightboxImage} />
      )}
      <EditProjectPop
        showEditProject={showEditProject}
        setShowEditProject={setShowEditProject}
        setRefreshProjects={setRefreshProjects}
      />
      <AddTypePop
        setShowPopUpType={setShowPopUpType}
        showPopUpType={showPopUpType}
        setTypeFlag={setTypeFlag}
        projectSelected={infoProject ?? dataProject[0]}
      />
      <AddUnitPop
        setShowPopUpUnit={setShowPopUpUnit}
        showPopUpUnit={showPopUpUnit}
        types={types}
        setUnitFlag={setUnitFlag}
        projectSelected={infoProject ?? dataProject[0]}
      />
      <EditTypePop
        showEditType={showEditType}
        setShowEditType={setShowEditType}
        setTypeFlag={setTypeFlag}
        types={types}
        projectSelected={infoProject ?? dataProject[0]}
      />
      <EditUnitPop
        showEditUnit={showEditUnit}
        setShowEditUnit={setShowEditUnit}
        setUnitFlag={setUnitFlag}
        types={types}
        projectSelected={infoProject ?? dataProject[0]}
      />
      {openPopUpOportunity && (
        <CreateOportunity created={false} recentContacts={recentContacts} />
      )}
      {isOnZoomImg && <ZoomImg imgToZoom={imgToZoom} />}
    </>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  query: { id },
}) => {
  console.time('All Get Server Side Props');

  // const { API_URL } = process.env;

  console.time('Get Cookie');

  const { user_tk } = parseCookies(cookie);

  console.timeEnd('Get Cookie');

  const { user } = JSON.parse(user_tk);

  console.time('Get Units');

  const response = await fetch(
    `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/projectDetails?projectId=${id}&username=${user.userid}&type=&page=1&rows=50`
  );

  const units = await response.json();

  console.timeEnd('Get Units');

  console.time('Get Types');

  const resp = await fetch(
    `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetPropertyTypes?username=${user.userid}&projectId=${id}`
  );

  const types = await resp.json();

  console.timeEnd('Get Types');

  console.timeEnd('All Get Server Side Props');

  return {
    props: {
      unitsInit: units.length ? units : [],
      typesInit: types.length ? types : [],
      user,
    },
  };
};

export default DetailState;
