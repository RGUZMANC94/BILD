import React from 'react';
import { useState } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-closed.module.css';
import OportunitiesCard from '../../components/oportunitiesCard';
import OportunitiesHistory from '../oportunitiesHistory';

const OportunitiesClosed = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const oportunities = [
    {
      closed: true,
      estimatedProgress: 0.55,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'cold',
      progress: 0.4,
    },
    {
      closed: true,
      estimatedProgress: 0.7,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'warm',
      progress: 0.6,
    },
    {
      closed: true,
      estimatedProgress: 0.9,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'hot',
      progress: 0.8,
    },
  ];
  return (
    <>
      <div className={styles.oportunidades}>
        <div className={styles['card-container']}>
          {oportunities.map((oportunity, i) => (
            <div
              className={styles['card-unit-list']}
              key={i}
              onClick={() => handleItemClick(i)}>
              <OportunitiesCard
                closed={oportunity.image}
                estimatedProgress={oportunity.estimatedProgress}
                state={selectedItem === i}
                image={oportunity.image}
                name={oportunity.name}
                location={oportunity.location}
                type={oportunity.type}
                followingDate={oportunity.followingDate}
                historyComponent={OportunitiesHistory}
                progress={oportunity.progress}
                temperature={oportunity.temperature}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OportunitiesClosed;
