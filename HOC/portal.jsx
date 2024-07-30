import { useEffect, useState , useContext } from 'react';
import { createPortal } from 'react-dom';
import BildContext from '../components/context';

const Portal = ({ children }) => {
  const [moutend, setMounted] = useState(false);
  const { isDark } = useContext(BildContext);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return moutend
    ? createPortal(
      <div className={`${isDark && 'dark'}`}>
        <div className={'text-dark-4 dark:text-light-1'}>
          {children}
        </div>
      </div>
      , document.getElementById('portal'))
    : null;
};

export default Portal;
