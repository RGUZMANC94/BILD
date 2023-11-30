import React from 'react';
import PendingCalendar from '../../components/pendingCalendar';
import PendingList from '../../components/pendingList';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-pending.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const OportunitiesPending = () => {
  const [showVisualization, setVisualization] = useState('calendar');
  return (
    <>
      <div className={styles['weekly-container']}>
        <div className={styles['weekly-title']}>ESTA SEMANA</div>
      </div>
      <PendingList />
    </>
  );
};

export default OportunitiesPending;
