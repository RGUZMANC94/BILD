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
  // const { initialState } = useContext(BildContext);
  // const { user } = initialState;
  // const { userid: id, rol: user_rol } = user;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userState);
  const userInfoEmpty = Object.values(userInfo).some((x) => x === '');

  const { projectsList, filteredList, isFiltered } = useSelector(
    (state) => state.projectState
  );
  const [pageProjects, setPageProjects] = useState(1);
  const [openFlag, setOpenFlag] = useState(true);
  const [displayProjects, setDisplayProjects] = useState(
    //projectsList.length ? projectsList : [] 
    [
      {
        projectId: 1,
        projectName: 'Proyecto 1',
        minPrice: 100000,
        maxPrice: 200000,
        minBed: 1,
        maxBed: 2,
        minBath: 1,
        maxBath: 2,
        image: [
          {
            url: '/images/defatult-2.jpg',
          },
        ],
      },
      {
        projectId: 2,
        projectName: 'Proyecto 2',
        minPrice: 200000,
        maxPrice: 300000,
        minBed: 2,
        maxBed: 3,
        minBath: 2,
        maxBath: 3,
        image: [
          {
            url: '/images/defatult-2.jpg',
          },
        ],
      },
      {
        projectId: 3,
        projectName: 'Proyecto 3',
        minPrice: 300000,
        maxPrice: 400000,
        minBed: 3,
        maxBed: 4,
        minBath: 3,
        maxBath: 4,
        image: [
          {
            url: '/images/defatult-2.jpg',
          },
        ],
      },
      {
        projectId: 4,
        projectName: 'Proyecto 4',
        minPrice: 400000,
        maxPrice: 500000,
        minBed: 4,
        maxBed: 5,
        minBath: 4,
        maxBath: 5,
        image: [
          {
            url: '/images/defatult-2.jpg',
          },
        ],
      },
      {
        projectId: 5,
        projectName: 'Proyecto 5',
        minPrice: 500000,
        maxPrice: 600000,
        minBed: 5,
        maxBed: 6,
        minBath: 5,
        maxBath: 6,
        image: [
          {
            url: '/images/defatult-2.jpg',
          },
        ],
      },
      {
        projectId: 6,
        projectName: 'Proyecto 6',
        minPrice: 600000,
        maxPrice: 700000,
        minBed: 6,
        maxBed: 7,
        minBath: 6,
        maxBath:
          7,
        image: [
          {
            url: '/images/defatult-2.jpg',
          },

        ],
      },
    ]
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
        rows: 100,
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

  /*useEffect(() => {
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
  // }, [filteredList]);*/

  return (
    <>
      <section className={styles.main}>
        <div className={styles['main-container']}>
          {true === 'ADMIN' && (
            <Button
              buttonType={'primary'}
              label="Crear Proyecto"
              inheritClass={styles.createProjectButton}
              clickFunction={() => setShowAddProject(true)}
            />
          )}

          <div
            className={`${styles.containerEstates} home_container_projects_cards`}>
            {displayProjects &&
              displayProjects.length &&
              displayProjects.map(
                (project, i) =>
                  Object.keys(project).length >= 3 && (
                    <div
                      key={project.projectId}
                      className={`${styles.proyectos} home_projects_cards`}>
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
                        <p className={styles['proyect-title']}>
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
                          {true === 'ADMIN' && (
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
