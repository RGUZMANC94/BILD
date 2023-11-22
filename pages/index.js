import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Button from "../components/button";
import { useSelector } from "react-redux";
import { getSessionToken } from "../utils/getSessionToken";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setProjects } from "../redux/projectSlice";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user_rol } = useSelector((state) => state.user);
  const { projectsList } = useSelector((state) => state.projects);
  const getProjects = async () => {
    const response = await fetch("/api/projects");
    const responseProjects = await response.json();
    dispatch(setProjects(responseProjects));
  };

  useEffect(() => {
    if (!getSessionToken()) {
      router.push("/login");
      return;
    }
    if (projectsList.length === 0) {
      getProjects();
    }
  }, []);

  return (
    <section className={styles["main"]}>
      <div className={styles["main-container"]}>
        {user_rol === "admin" && (
          <Button
            className={"align-end"}
            buttonType={"primary"}
            label="Crear Proyecto"
            link={"/create-project"}
          />
        )}

        <div className={styles["containerEstates"]}>
          {projectsList.map((project) => (
            <div key={project.id} className={styles["proyectos"]}>
              <Link href={`/detail-estate/${project.id}`}>
                <div className={styles["img-proyect"]}>
                  <img
                    alt=""
                    src={
                      project.imgProject !== "" && project.imgProject
                        ? project.imgProject
                        : "/images/default-1.jpg"
                    }
                  />
                </div>
                <div className={styles["proyect-info"]}>
                  <p className={styles["proyect-title"]}>{project.name}</p>
                  {project.minPrice && project.maxPrice && (
                    <p className={styles["valor"]}>
                      ${project.minPrice} millones - {project.maxPrice} millones
                    </p>
                  )}

                  <div className={styles["detalles"]}>
                    {project.minBeds && project.maxBeds && (
                      <>
                        <img
                          alt=""
                          src="/images/cards/bed.png"
                          width="22"
                          height="20"
                        />
                        <p>
                          {project.minBeds}-{project.maxBeds}
                        </p>
                      </>
                    )}
                    {project.minBaths && project.maxBaths && (
                      <>
                        <img
                          alt=""
                          src="/images/cards/bath.png"
                          width="7"
                          height="11"
                        />
                        <p>
                          {project.minBaths}-{project.maxBaths}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
