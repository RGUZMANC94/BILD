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

  const { user_rol, id } = useSelector((state) => state.userState);
  const { projectsList } = useSelector((state) => state.projectState);
  const getProjects = async () => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const responseProjects = await response.json();
    dispatch(setProjects(responseProjects));
  };

  useEffect(() => {
    if (!getSessionToken()) {
      router.push("/login");
      getProjects();
      return;
    }
    // if (projectsList.length === 0) {
    // }
  }, []);

  return (
    <section className={styles["main"]}>
      <div className={styles["main-container"]}>
        {user_rol === "ADMIN" && (
          <Button
            className={"align-end"}
            buttonType={"primary"}
            label="Crear Proyecto"
            link={"/create-project"}
          />
        )}

        <div className={styles["containerEstates"]}>
          {projectsList.map((project) => (
            <div key={project.projectId} className={styles["proyectos"]}>
              <Link href={`/detail-estate/${project.projectId}`}>
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
                  <p className={styles["proyect-title"]}>
                    {project.projectName}
                  </p>
                  <p className={styles["valor"]}>
                    {project.minPrice &&
                      project.maxPrice &&
                      `${project.minPrice} millones - {project.maxPrice} millones`}
                  </p>

                  <div className={styles["detalles"]}>
                    {project.minBed && project.maxBed && (
                      <>
                        <img
                          alt=""
                          src="/images/cards/bed.png"
                          width="22"
                          height="20"
                        />
                        <p>
                          {project.minBed}-{project.maxBed}
                        </p>
                      </>
                    )}
                    {project.minBath && project.maxBath && (
                      <>
                        <img
                          alt=""
                          src="/images/cards/bath.png"
                          width="7"
                          height="11"
                        />
                        <p>
                          {project.minBath}-{project.maxBath}
                        </p>
                      </>
                    )}
                    {user_rol === "ADMIN" && (
                      <Link
                        href={{
                          pathname: `/create-project`,
                          query: { project: project.projectId },
                        }}
                        className={`bg-ct ${styles.editProject}`}
                      ></Link>
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
