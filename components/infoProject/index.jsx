import React from "react";

const InfoProject = ({ viewEstate }) => {
  return (
    <div className={`infoContainer ${viewEstate === "info" ? "active" : ""}`}>
      <div className="unidades">
        <div className="tipo">
          <div className="tipo-unit informacion">
            <div className="img-tipo">
              <img src="/images/tipo-1.png" />
            </div>
            <div className="zoom-img"></div>
            <div className="tipo-info">
              <span className="tipo-title">Fontana Campestre</span>
              <span className="valor">$120 millones - 160 millones</span>
              <div className="detalles">
                <img src="/images/cama.png" width="22" height="20" />
                <span>3-4</span>
                <img src="/images/ducha.png" width="7" height="11" />
                <span>2-3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="galeria-tipo">
        <div className="fecha-estimada">Fecha estimada de entrega: 12-2025</div>
        <div className="gallery-image">
          <div className="img-box">
            <img src="/images/galeria-tipo/galeria-tipo-01.jpg" alt="" />
            <div className="transparent-box"></div>
          </div>
          <div className="img-box">
            <img src="/images/galeria-tipo/galeria-tipo-02.jpg" alt="" />
            <div className="transparent-box"></div>
          </div>
          <div className="img-box">
            <img src="/images/galeria-tipo/galeria-tipo-03.jpg" alt="" />
            <div className="transparent-box"></div>
          </div>
          <div className="img-box">
            <img src="/images/galeria-tipo/galeria-tipo-04.jpg" alt="" />
            <div className="transparent-box"></div>
          </div>
          <div className="img-box">
            <img src="/images/galeria-tipo/galeria-tipo-05.jpg" alt="" />
            <div className="transparent-box"></div>
          </div>
          <div className="img-box">
            <img src="/images/galeria-tipo/galeria-tipo-06.jpg" alt="" />
            <div className="transparent-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProject;
