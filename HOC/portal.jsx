import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const [moutend, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return moutend
    ? createPortal(children, document.getElementById('portal'))
    : null;
};

export default Portal;
