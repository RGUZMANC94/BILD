import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Button from '../components/button';
import { useSelector } from 'react-redux';
import { getSessionToken } from '../utils/getSessionToken';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setProjects, setFilteredList } from '../redux/projectSlice';
import { changeTypeSelectedName } from '../redux/typeSelectedSlice';
import { changeProjectEdit } from '../redux/editObjectSlice';
import Link from 'next/link';
import { get } from 'sortablejs';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const USDollar = new Intl.NumberFormat('en-US');
  const { user_rol, id } = useSelector((state) => state.userState);
  const { projectsList, filteredList } = useSelector(
    (state) => state.projectState
  );
  const [pageProjects, setPageProjects] = useState(1);
  const [openFlag, setOpenFlag] = useState(true);
  const [displayProjects, setDisplayProjects] = useState([]);

  const getProjects = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        page: pageProjects,
      }),
    });
    const responseProjects = await response.json();
    dispatch(
      setProjects(
        responseProjects.filter((proj) => Object.keys(proj).length >= 3)
      )
    );
    setDisplayProjects([]);
    setDisplayProjects(
      responseProjects.filter((proj) => Object.keys(proj).length >= 3)
    );
    console.log('respuesta Proyectos', responseProjects);
  };

  useEffect(() => {
    if (!getSessionToken()) {
      router.push('/login');
      return;
    }
    if (openFlag) {
      dispatch(changeTypeSelectedName(-1));
      setOpenFlag(false);
    }
    dispatch(setFilteredList([]));
    getProjects();
  }, []);

  useEffect(() => {
    if (!getSessionToken()) {
      router.push('/login');
      return;
    }
    if (filteredList.length > 0) {
      console.log('Filtro');
      setDisplayProjects([]);
      setDisplayProjects(filteredList);
    } else {
      getProjects();
    }
  }, [filteredList]);

  /* useEffect(() => {
    console.log('display', displayProjects);
  }, [displayProjects]);*/

  return (
    getSessionToken() && (
      <>
        <section className={styles.main}>
          <div className={styles['main-container']}>
            {user_rol === 'ADMIN' && (
              <Button
                classNameInherit={'align-end'}
                buttonType={'primary'}
                label="Crear Proyecto"
                link={'/create-project'}
              />
            )}

            <div className={styles.containerEstates}>
              {console.log('proyectos', displayProjects)}
              {displayProjects.length &&
                displayProjects.map(
                  (project, i) =>
                    Object.keys(project).length >= 3 && (
                      <Link
                        key={project.projectId}
                        className={styles.proyectos}
                        href={`/detail-estate/${project.projectId}`}>
                        <div className={styles['img-proyect']}>
                          <img
                            alt=""
                            src={
                              project.image[0] !== '' && project.image[0]
                                ? `${project.image[0].url}`
                                : '/images/defatult-2.jpg'
                            }
                          />
                        </div>
                        {console.log('proyecto: ', i)}
                        <div className={styles['proyect-info']}>
                          <p className={styles['proyect-title']}>
                            {project.projectName}
                          </p>
                          <p className={styles.valor}>
                            {project.minPrice &&
                              project.maxPrice &&
                              `${USDollar.format(
                                project.minPrice
                              )}  - ${USDollar.format(project.maxPrice)} `}
                          </p>

                          <div className={styles.detalles}>
                            {project.minBed !== 0 && project.maxBed !== 0 && (
                              <>
                                <img
                                  alt=""
                                  src="/images/cards/bed.png"
                                  width="22"
                                  height="20"
                                />
                                <p>{`${project.minBed}-${project.maxBed}`}</p>
                              </>
                            )}
                            {project.minBath !== 0 && project.maxBath !== 0 && (
                              <>
                                <img
                                  alt=""
                                  src="/images/cards/bath.png"
                                  width="7"
                                  height="11"
                                />
                                <p>{`${project.minBath}-${project.maxBath}`}</p>
                              </>
                            )}
                            {user_rol === 'ADMIN' && (
                              <Link
                                href={{
                                  pathname: '/create-project',
                                  query: { project: project.projectId },
                                }}
                                className={`bg-ct ${styles.editProject}`}
                                onClick={() =>
                                  dispatch(changeProjectEdit(project))
                                }></Link>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                )}
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default Home;
