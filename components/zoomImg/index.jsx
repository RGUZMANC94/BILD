import { useDispatch, useSelector } from 'react-redux';
import styles from './zoomImg.module.css';
import { closeZoomImg } from '../../redux/zoomImg';
import { useEffect, useState } from 'react';

const ZoomImg = ({ imgToZoom }) => {
  const { isOnZoomImg } = useSelector((state) => state.zoomImgState);
  const dispatch = useDispatch();

  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopUp((prevState) => true);
    }, 100);
  }, []);
  return (
    <div
      className={`${styles.wrapperZoomImg} bg-backg-popup ${
        showPopUp ? styles.active : ''
      }`}>
      <header className={`${styles.headerMainContainer} `}>
        <div
          className={`${styles.closePopUp}`}
          onClick={() => {
            setShowPopUp((prevState) => false);
            setTimeout(() => {
              dispatch(closeZoomImg());
            }, 500);
          }}></div>
      </header>
      <div
        className={`${styles.closeZoomImgBg} bg-ct`}
        onClick={() => {
          setShowPopUp((prevState) => false);
          setTimeout(() => {
            dispatch(closeZoomImg());
          }, 500);
        }}></div>
      <div
        className={`bg-ct ${styles.zoomImg}`}
        style={{ backgroundImage: `url(${imgToZoom})` }}></div>
    </div>
  );
};

export default ZoomImg;
