import React from 'react';
import { useState } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-contact.module.css';
import OportunitiesCard from '../../components/oportunitiesCard';
import OportunitiesHistory from '../../components/oportunitiesHistory';

const OportunitiesContact = ({ oppList }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    selectedItem === index ? setSelectedItem(-1) : setSelectedItem(index);
  };

  const oportunities = [
    {
      state: false,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'cold',
      progress: 0.4,
    },
    {
      state: false,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'warm',
      progress: 0.6,
    },
    {
      state: true,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'hot',
      progress: 0.8,
    },

    {
      closed: true,
      estimatedProgress: 0.85,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'hot',
      progress: 0.35,
    },
  ];

  return (
    <>
      <div className={styles.oportunidades}>
        <div className={styles['card-container']}>
          {oppList.map((oportunity, i) => (
            <div
              className={styles['card-unit-list']}
              key={i}
              onClick={() => handleItemClick(i)}>
              <OportunitiesCard
                closed={oportunity.image}
                estimatedProgress={oportunity.estimatedProgress}
                state={selectedItem === i}
                image={'/images/perfil-img.jpeg'}
                name={oportunity.nameCustomer}
                location={oportunity.nameProject}
                type={`Tipo ${oportunity.propertyType} - ${oportunity.idProperty}`}
                followingDate={oportunity.createdDate}
                historyComponent={OportunitiesHistory}
                progress={0.25}
                temperature={'cold'} // hot warm cold
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['wrap-right']}>
        <OportunitiesHistory></OportunitiesHistory>
      </div>
    </>
  );
};

export default OportunitiesContact;
