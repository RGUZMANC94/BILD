import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';

const InfoProject = ({ viewEstate, info, setLightboxImage, projectId }) => {
  const [imagesGallery, setImagesGallery] = useState([]);
  const images = [
    '/images/galeria-tipo/galeria-tipo-01.jpg',
    '/images/galeria-tipo/galeria-tipo-02.jpg',
    '/images/galeria-tipo/galeria-tipo-03.jpg',
    '/images/galeria-tipo/galeria-tipo-04.jpg',
    '/images/galeria-tipo/galeria-tipo-05.jpg',
    '/images/galeria-tipo/galeria-tipo-06.jpg',
  ];

  console.log('Proyecto en info:', info);

  const getGalleryImages = async () => {
    const response = await fetch('/api/multimediaRequest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idobject: `${info.projectId}`,
        type: 'PRY',
        subtype: 'IMGRF',
      }),
    });
    const galleryResponse = await response.json();
    // console.log('dentro de opotunidades id:', galleryResponse);
    setImagesGallery(galleryResponse);
  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  console.log('imagesGallery:', imagesGallery);

  return (
    <>
      <div className={`infoContainer ${viewEstate === 'info' ? 'active' : ''}`}>
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
                  <span className="valor">{`$${info.maxPrice}`}</span>
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
              pathname: '/create-project',
              query: { project: projectId },
            }}
            className={'bg-ct editProject'}></Link>
        </div>
        <div className="galeria-tipo">
          <div className="gallery-image">
            {imagesGallery.length > 0 &&
              imagesGallery.map((img) => (
                <div
                  key={img}
                  className="img-box"
                  onClick={() => setLightboxImage(img.url)}>
                  <img src={img.url} alt="" />
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
