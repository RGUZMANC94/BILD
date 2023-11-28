import Link from "next/link";
import React from "react";

const InfoProject = ({ viewEstate, info, setLightboxImage, projectId }) => {
  const images = [
    "/images/galeria-tipo/galeria-tipo-01.jpg",
    "/images/galeria-tipo/galeria-tipo-02.jpg",
    "/images/galeria-tipo/galeria-tipo-03.jpg",
    "/images/galeria-tipo/galeria-tipo-04.jpg",
    "/images/galeria-tipo/galeria-tipo-05.jpg",
    "/images/galeria-tipo/galeria-tipo-06.jpg",
  ];

  return (
    <>
      <div className={`infoContainer ${viewEstate === "info" ? "active" : ""}`}>
        <div className="unidades">
          <div className="tipo">
            <div className="tipo-unit informacion">
              <div className="outerInfoProject flex j-s a-s">
                <div className="img-tipo relative">
                  <img src="/images/tipo-1.png" />
                  <div className="zoom-img bg-ct"></div>
                </div>
                <div className="tipo-info">
                  <span className="tipo-title">{info.projectName}</span>
                  <span className="valor">
                    {info.price && "$ 120 millones - $ 160 millones"}
                  </span>
                  <div className="detalles">
                    <img src="/images/cards/bed.svg" />
                    <span>
                      {info.minBed}-{info.maxBed}
                    </span>
                    <img src="/images/cards/bath.svg" />
                    <span>
                      {info.minBath}-{info.maxBath}
                    </span>
                  </div>
                </div>
              </div>
              <div className="fecha-estimada">
                Fecha estimada de entrega: 12-2025
              </div>
            </div>
          </div>
          <Link
            href={{
              pathname: `/create-project`,
              query: { project: projectId },
            }}
            className={`bg-ct editProject`}
          ></Link>
        </div>
        <div className="galeria-tipo">
          <div className="gallery-image">
            {images.map((img) => (
              <div
                key={img}
                className="img-box"
                onClick={() => setLightboxImage(img)}
              >
                <img src={img} alt="" />
                <div className="transparent-box"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoProject;
