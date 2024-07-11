import React from 'react';
import styles from './Tooltip.module.css';
import { useState, useRef, useEffect } from 'react';

const Tooltip = ({ contentId }) => {
  const idContent = [
    'Porcentaje que denomina el valor minimo que se peude pagar por cuota inicial',
    'Fecha en la que se espera se entregue el proyecto',
    'Contenido 4',
    'Contenido 5',
  ];
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('bottom');
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();
        const isAboveHalf = rect.top < window.innerHeight / 2;
        setPosition(isAboveHalf ? 'top' : 'bottom');
        setVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const buttonElement = tooltipRef.current;
    if (buttonElement) {
      buttonElement.addEventListener('mouseenter', handleMouseEnter);
      buttonElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener('mouseenter', handleMouseEnter);
        buttonElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={tooltipRef} className={styles.tooltipWrapper}>
      <div className={styles.tooltipButton}></div>
      {visible && (
        <div className={`${styles.tooltip} ${styles[position]}`}>
          <span className={styles.tooltipText}>
            {idContent[contentId]
              ? idContent[contentId]
              : 'No se ha encontrado el contenido'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
