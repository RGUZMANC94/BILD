import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Button from '../components/button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setProjects, setFilteredList } from '../redux/projectSlice';
import { changeTypeSelectedName } from '../redux/typeSelectedSlice';
import { changeProjectEdit } from '../redux/editObjectSlice';
import Link from 'next/link';
import Loader from '../components/lodaer';
import { useQuery } from 'react-query';
// import { parseCookies } from '../utils/parseCookies';
import Image from 'next/image';
import AddProjectPop from '../components/addProjectPop';
import EditProjectPop from '../components/editProjectPop';
import { setUser } from '../redux/userSlice';
import BildContext from '../components/context';

const Home = () => {
  const { initialState } = useContext(BildContext);
  const { user } = initialState;
  console.log(initialState);
  const { userid: id, rol: user_rol } = user;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userState);
  const userInfoEmpty = Object.values(userInfo).some((x) => x === '');

  const { projectsList, filteredList, isFiltered } = useSelector(
    (state) => state.projectState
  );
  const [pageProjects, setPageProjects] = useState(1);
  const [openFlag, setOpenFlag] = useState(true);
  const [displayProjects, setDisplayProjects] = useState(
    projectsList.length ? projectsList : []
  );
  const [showAddProject, setShowAddProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);

  const getProjects = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        page: pageProjects,
        rows: 10000,
      }),
    });
    const responseProjects = await response.json();
    dispatch(
      setProjects(
        responseProjects.filter((proj) => Object.keys(proj).length >= 3)
      )
    );

    setDisplayProjects(
      responseProjects.filter((proj) => Object.keys(proj).length >= 3)
    );
    console.log('respuesta Proyectos', responseProjects);
    return responseProjects;
  };

  useEffect(() => {
    if (openFlag) {
      dispatch(changeTypeSelectedName(-1));
      setOpenFlag(false);
    }
    dispatch(setFilteredList([]));
    if (userInfoEmpty) {
      dispatch(setUser(user));
    }
    // getProjects();
  }, []);

  useEffect(() => {
    getProjects();
  }, [refreshProjects]);

  useEffect(() => {
    if (isFiltered) {
      setDisplayProjects(filteredList);
    } else {
      setDisplayProjects(data);
    }
  }, [isFiltered]);

  const { data, status } = useQuery('projects', getProjects);

  if (status === 'loading') {
    return <Loader />;
  }

  // useEffect(() => {
  //   if (filteredList.length > 0) {
  //     console.log('Filtro');
  //     setDisplayProjects([]);
  //     setDisplayProjects(filteredList);
  //   } else {
  //     getProjects();
  //   }
  // }, [filteredList]);

  return (
    <>
      <section className={styles.main}>
        <div className={styles['main-container']}>
          {user_rol === 'ADMIN' && (
            <Button
              buttonType={'primary'}
              label="Crear Proyecto"
              inheritClass={styles.createProjectButton}
              clickFunction={() => setShowAddProject(true)}
            />
          )}

          <div
            className={`${
              styles.containerEstates
            } home_container_projects_cards ${
              displayProjects.length < 3 && styles.containerEstatesDual
            }`}>
            {displayProjects &&
              displayProjects.length &&
              displayProjects.map(
                (project, i) =>
                  Object.keys(project).length >= 3 && (
                    <div
                      key={project.projectId}
                      className={`${
                        styles.proyectos
                      } bg-card home_projects_cards ${
                        displayProjects.length < 3 && styles.proyectosDual
                      }`}>
                      <Link
                        className={styles.anchorCards}
                        href={`/detail-estate/${project.projectId}`}></Link>
                      <div className={styles['img-proyect']}>
                        <Image
                          src={
                            project.image[0] !== '' && project.image[0]
                              ? `${project.image[0].url}`
                              : '/images/defatult-2.jpg'
                          }
                          alt=""
                          fill
                        />
                      </div>
                      <div className={styles['proyect-info']}>
                        <p className={`${styles['proyect-title']} title-card`}>
                          {project.projectName}
                        </p>
                        <p className={styles.valor}>
                          {project.minPrice &&
                            project.maxPrice &&
                            `$${parseInt(project.minPrice).toLocaleString(
                              'es-ES'
                            )} - $${parseInt(project.maxPrice).toLocaleString(
                              'es-ES'
                            )} `}
                        </p>

                        <div className={styles.detalles}>
                          {project.minBed !== 0 && project.maxBed !== 0 && (
                            <span className={styles.detailsGroup}>
                              <Image
                                alt=""
                                src="/images/cards/bed.png"
                                width="15"
                                height="15"
                              />
                              <p>{`${project.minBed}-${project.maxBed}`}</p>
                            </span>
                          )}
                          {project.minBath !== 0 && project.maxBath !== 0 && (
                            <span className={styles.detailsGroup}>
                              <Image
                                alt=""
                                src="/images/cards/bath.png"
                                width="15"
                                height="15"
                              />
                              <p>{`${project.minBath}-${project.maxBath}`}</p>
                            </span>
                          )}
                          {user_rol === 'ADMIN' && (
                            <button
                              className={`bg-ct ${styles.editProject}`}
                              onClick={() => {
                                dispatch(changeProjectEdit(project));
                                setShowEditProject(true);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </section>
      <AddProjectPop
        showAddProject={showAddProject}
        setShowAddProject={setShowAddProject}
        setRefreshProjects={setRefreshProjects}
      />

      <EditProjectPop
        showEditProject={showEditProject}
        setShowEditProject={setShowEditProject}
        setRefreshProjects={setRefreshProjects}
      />
    </>
  );
  // );
};

export default Home;
