import { useContext, useEffect, useState } from 'react';
import styles from './Redirect.module.css';
import { useDispatch } from 'react-redux';
import { changeContactSelected } from '../../redux/contactSelectedSlice';
import BildContext from '../context';
import Portal from '../../HOC/portal';
import Link from 'next/link';

const Redirect = ({
  clickFuntion,
  href,
  redirecState,
  message,
  anchorText,
}) => {
  const { isDark } = useContext(BildContext);
  const [visibility, setVisibility] = useState(true);

  const handleClick = () => {
    clickFuntion(true);
    setVisibility(false);
  };

  return (
    <div className={` ${styles.redirectOverlay}`}>
      <div
        className={`bg-light-2 shadow-lg lg:dark:bg-dark-3 ${
          !visibility && `${styles.activeRedirect}`
        }  ${styles.redirectContaine}`}>
        <p className={`${styles.redirectText}`}>{message}</p>

        {clickFuntion && (
          <button
            onClick={handleClick}
            className={`${styles.anchorText} text-bild-1`}>
            {anchorText}
          </button>
        )}

        {href && (
          <Link
            className={`${styles.anchorText}  text-bild-1`}
            href={`/${href}`}>
            {anchorText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Redirect;
