import { useEffect, useRef, useState } from "react";

import CreateOportunity from "../../components/createOportunity";
import TypesSide from "../../components/typesSide";
import InfoProject from "../../components/infoProject";
import AddTypePop from "../../components/addTypePop";
import { getSessionToken } from "../../utils/getSessionToken";
import { useRouter } from "next/router";
import { getLocalData } from "../api/detailProject";
import { useSelector } from "react-redux";


const DetailState = ({ projectSelected }) => {
  const [viewEstate, setViewEstate] = useState("units");
  const [showPopUpType, setShowPopUpType] = useState(false);
  const [createOportunity, setCreateOportunity] = useState(false);
  // const [detailProject, setDetailProject] = useState();
  const router = useRouter();
  const containerEstate = useRef(null);

  const { openPopUpOportunity } = useSelector((state) => state.popUpOportunity);

  // const getDetailProject = async () => {
  //   const response = await fetch("/api/detailProject.js", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       identificator: 1,
  //     }),
  //   });

  //   const projectDetail = await response.json();
  //   setDetailProject(projectDetail);
  // };

  useEffect(() => {
    if (!getSessionToken()) {
      router.push("/login");
      return;
    }
    // getDetailProject();
  }, []);

  return (
    <>
      <section className="main">
        <div className="container">
          <div className="top-content">
            <ul>
              <li>
                <a href="#">
                  <i className="fa-solid fa-angle-left"></i>
                </a>
              </li>
              <li
                className={`itemTopContent ${
                  viewEstate === "units" ? "active" : ""
                }`}
                onClick={() => {
                  setViewEstate("units");
                }}
              >
                <button className="buttonTopDetailState">Unidades</button>
              </li>
              <li
                className={`itemTopContent ${
                  viewEstate === "info" ? "active" : ""
                }`}
                onClick={() => {
                  setViewEstate("info");
                }}
              >
                <button className="buttonTopDetailState">Información</button>
              </li>
            </ul>
          </div>

          <div className={`containerEstate`} ref={containerEstate}>
            <TypesSide
              types={projectSelected.types}
              viewEstate={viewEstate}
              setShowPopUpType={setShowPopUpType}
              setCreateOportunity={setCreateOportunity}
            />
            <InfoProject viewEstate={viewEstate} />
          </div>
        </div>
      </section>

      <AddTypePop
        setShowPopUpType={setShowPopUpType}
        showPopUpType={showPopUpType}
      />

      {openPopUpOportunity && (
        <CreateOportunity
          created={false}
        />
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const responseDetailProject = await getLocalData();

  const projectSelected = responseDetailProject.find(
    (project) => project.id === Number(context.params.id)
  );

  return {
    props: {
      projectSelected,
    },
  };
};

export default DetailState;
